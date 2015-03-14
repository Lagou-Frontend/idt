/**
 * html 中间层，处理velocity
 */

var fs = require( 'fs' );
var path = require( 'path' );
var mkdirp = require( 'mkdirp' );
var colors = require( 'colors' );

var idtconfig = require( '../../config' );
var utils = require( '../../common/utils' );
var _ = require( 'underscore' );

var urlparser = require( 'urlparse' );

var Engine = require( 'velocity' ).Engine;

var config;

var make = function( url2filename, fullpath, req, res ) {
    debugger;

    var dirname = path.dirname( fullpath );
    var commonPath = path.join(
        config.mockAjax, config.mockCommon );

    // delete cache
    delete require.cache[ require.resolve( fullpath ) ];
    var fullpathRequired = require( fullpath );

    var commonPathRequired = {};
    fs.exists( commonPath, function( exists ) {
        if ( exists ) {
            delete require.cache[ require.resolve( commonPath ) ];
            commonPathRequired = require( commonPath );
        }
        answer();
    } );

    var answer = function() {

        // 判断是否为function
        if ( typeof( fullpathRequired ) == 'function' ) {
            // 带入请求对象，此function需要返回object
            fullpathRequired = fullpathRequired.call( req, urlparser( req.url ) );
        }
        var context = _.extend( commonPathRequired, fullpathRequired );

        // 输出ajax请求
        utils.clog.tip( 'ajax: ' + req.url );

        res.setHeader( 'Content-Type', 'text/html;charset=UTF-8' );

        if ( context.__sleep__ ) {
            
            setTimeout( function () {
                res.end( JSON.stringify( context ) );
            }, context.__sleep__ );

            return;
        }

        res.end( JSON.stringify( context ) );

    };

};

var create = function( url2filename, fullpath, req, res ) {

    var args = arguments;

    // 构建目录结构
    mkdirp( path.dirname( fullpath ), function( err ) {
        if ( err ) throw ( err )
        fs.writeFile( fullpath, idtconfig.mock, function( err ) {
            if ( err ) throw err;
            // res.end( 'Had create mock file for you, go to mock directory, write your mock data. :)' );
            make.apply( null, args );
        } );
    } );

};

exports.run = function( req, res, next, importConfig ) {

    debugger;

    config = importConfig;

    // 去掉 html 后面附加的参数: xxx.html?a=1
    var url = utils.trimUrlQuery( req.url );
    // /projectExperience/save.json to ...
    // projectExperience_save.json.js
    // var url2filename = utils.handleMockFullname( url );
    var fullpath = path.join( config.mockAjax, utils.handleMockJsTail( url ) );

    var arg = [ url, fullpath, req, res ];
    // 检查mock下面是否有对应的js文件存在，没有的话，自动生成
    fs.exists( fullpath, function( exists ) {
        exists
            ? make.apply( null, arg ) : create.apply( null, arg );
    } );

};
