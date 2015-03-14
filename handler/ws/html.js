/**
 * html 中间层，处理velocity
 */

var fs = require( 'fs' );
var path = require( 'path' );
var mkdirp = require( 'mkdirp' );

var idtconfig = require( '../../config' );
var utils = require( '../../common/utils' );
var injects = require( '../../common/injects' );

var _ = require( 'underscore' );

var urlparser = require( 'urlparse' );
var shell = require( 'shelljs' );

var engines = require( '../../common/engines' );

var config;

var make = function( url2filename, fullpath, req, res ) {
    debugger;

    var engine = engines.getEngine(
        path.join( config.webContent, url2filename ), config );

    var dirname = path.dirname( fullpath );
    var commonPath = path.join(
        config.mockTemplate, config.mockCommon );

    // delete cache
    delete require.cache[ require.resolve( fullpath ) ];
    var fullpathRequired = require( fullpath );

    var commonPathRequired = {};
    fs.exists( commonPath, function( exists ) {
        if ( exists ) {
            commonAndAnswer();
        } else {
            createCommonMock( commonAndAnswer );
        }
    } );

    var commonAndAnswer = function() {

        delete require.cache[ require.resolve( commonPath ) ];
        commonPathRequired = require( commonPath );
        answer();

    };

    var answer = function() {

        // 判断是否为function
        if ( typeof( fullpathRequired ) == 'function' ) {
            // 带入请求对象，此function需要返回object
            fullpathRequired = fullpathRequired.call( req, urlparser( req.url ) );
        }
        var context = _.extend( commonPathRequired, fullpathRequired );
        res.setHeader( 'Content-Type', 'text/html;charset=UTF-8' );
        // 异步输出
        var output;
        engine.render( context, function ( o ) {
            output = o;
            if ( config.wsweinredebug != 'off' ) {
                // 需要注入script元素
                return injects.weinre( config, output, function ( result ) {
                    res.end( result );
                } );
            }

            res.end( output );
        } );

    };

};

var createCommonMock = function( callback ) {

    // 需要新建立velocity的commonmock/common.js
    var source = path.resolve(
        path.join( __dirname, '../../store', 'commonmock' ) );
    var target = path.resolve( config.mockTemplate );

    var comm = [

        'cp -rf "',
        source, 
        '" "',
        target,
        '"'

    ].join( '' );

    comm = utils.handleWinCp( comm );

    utils.clog.cmd( 'running ' + comm );

    shell.exec( comm, {
        async: false
    }, function( code, output ) {
        utils.clog.nor( 'Exit code: ' + utils.errorMaps[ code ] );
        // console.log( 'Program output:', output );

        callback();

    } );

};

var create = function( url2filename, fullpath, req, res ) {

    var args = arguments;

    // 在真正生成目录结构之前，检查是否真正有必要生成此目录结构，如果根本就不存在对应的html页面，就无需生成了
    if ( !fs.existsSync( path.join( config.webContent, url2filename ) ) ) {
        res.end( 'There is no need to create mock file, because this `*.html` file does not exist. :)' );
        return;
    }

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

    // 去掉 html 后面附加的参数: xxx.html?a=1 => /a/b/xxxx.html
    var url = utils.trimUrlQuery( req.url );
    // console.log( url ); // /tpl/custom/search.html
    // template_mycenter_myresume.html.js"
    // var url2filename = utils.handleMockFullname( url );
    var fullpath = path.join( config.mockTemplate, utils.handleMockJsTail( url ) );

    var arg = [ url, fullpath, req, res ];
    // 检查mock下面是否有对应的js文件存在，没有的话，自动生成
    fs.exists( fullpath, function( exists ) {
        exists
            ? make.apply( null, arg ) : create.apply( null, arg );
    } );

};
