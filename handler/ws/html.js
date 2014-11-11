/**
 * html 中间层，处理velocity
 */

var fs = require( 'fs' );
var path = require( 'path' );
var mkdirp = require( 'mkdirp' );

var idtconfig = require( '../../config' );
var utils = require( '../../common/utils' );
var _ = require( 'underscore' );

var shell = require( 'shelljs' );

var Engine = require( 'velocity' ).Engine;

var config;

var make = function( url2filename, fullpath, req, res ) {
    debugger;
    var engine = new Engine( {
        root: config.templates,
        template: config.webContent + req.url,
        cache: false
    } );

    var dirname = path.dirname( fullpath );
    var commonPath = path.join(
        config.mockVelocity, config.mockCommon );

    // delete cache
    delete require.cache[ require.resolve( fullpath ) ];
    var fullpathRequired = require( fullpath );

    var commonPathRequired = {};
    fs.exists( commonPath, function( exists ) {
        if ( exists ) {
            commonAndAnswer();
        }
        else {
            createCommonMock( commonAndAnswer );
        }
    } );

    var commonAndAnswer = function () {

        delete require.cache[ require.resolve( commonPath ) ];
        commonPathRequired = require( commonPath );
        answer();

    };

    var answer = function() {

        // 判断是否为function
        if ( typeof( fullpathRequired ) == 'function' ) {
            // 带入请求对象，此function需要返回object
            fullpathRequired = fullpathRequired.call( req );
        }
        var context = _.extend( fullpathRequired, commonPathRequired );
        res.setHeader( 'Content-Type', 'text/html;charset=UTF-8' );
        res.end( engine.render( context ) );

    };

};

var createCommonMock = function ( callback ) {

    // 需要新建立velocity的commonmock/common.js
    var source = path.resolve( 
        path.join( __dirname, '../../store', 'commonmock' ) );
    var target = path.resolve( config.mockVelocity );

    var comm = [

        'cp -rf ',
        source, ' ',
        target

    ].join( '' );

    utils.clog.cmd( 'running ' + comm );

    shell.exec( comm, { async: false }, function( code, output ) {
        console.log( 'Exit code:', utils.errorMaps[ code ] );
        // console.log( 'Program output:', output );

        callback();

    } );

};

var create = function( url2filename, fullpath, req, res ) {

    // 构建目录结构
    mkdirp( path.dirname( fullpath ), function( err ) {
        if ( err ) throw ( err )
        fs.writeFile( fullpath, '//mock your velocity data', function( err ) {
            if ( err ) throw err;
            res.end( 'Had create mock file for you, go to mock directory, write your mock data. :)' );
        } );
    } );

};

exports.run = function( req, res, next, importConfig ) {

    debugger;

    config = importConfig;

    // 去掉 html 后面附加的参数: xxx.html?a=1 => /a/b/xxxx.html
    var url = utils.trimUrlQuery( req.url );
    // template_mycenter_myresume.html.js"
    // var url2filename = utils.handleMockFullname( url );
    var fullpath = path.join( config.mockVelocity, utils.handleMockJsTail( url ) );

    var arg = [ url, fullpath, req, res ];
    // 检查mock下面是否有对应的js文件存在，没有的话，自动生成
    fs.exists( fullpath, function( exists ) {
        exists
            ? make.apply( null, arg ) : create.apply( null, arg );
    } );

};
