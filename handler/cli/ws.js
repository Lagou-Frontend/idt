/**
 * webserver
 */

var shell = require( 'shelljs' );
var path = require( 'path' );
var fs = require( 'fs' );
var dir = process.cwd();
var idtconfig = require( '../../config' );

var utils = require( '../../common/utils' );

var configFile;
var config;

var enableWeinreDebug;
var weinreDebugPort;
var weinreDebugHost;

/**
 * 启动服务器
 * @return {[type]} [description]
 */
var startWs = function() {

    // config = require( path.join( dir, configFile ) );

    // start
    var comm = [

        'grunt --gruntfile ',
        path.join( __dirname, '../../', idtconfig.wsName ),
        ' --configpath ',
        path.join( dir, configFile ),
        ' --wsweinredebug ',
        enableWeinreDebug,
        ' --weinredebugport ',
        weinreDebugPort,
        ' --weinredebughost ',
        weinreDebugHost,

    ].join( '' );

    utils.clog.cmd( 'running ' + comm );

    shell.exec( comm, function( code, output ) {
        utils.clog.nor( 'Exit code: ' + utils.errorMaps[ code ] );
        // console.log( 'Program output:', output );
    } );

};

var ceIdtConfig = function () {

    require( './ceconfig' )( startWs );

};

module.exports = function( action, options ) {

    var program = this;
    configFile = program.config;
    utils.clog.cmd( 'running idt ws(webserver) %s, use ' + configFile, action );

    enableWeinreDebug = options.remote;
    weinreDebugPort = options.portfordebug;
    weinreDebugHost = options.hostfordebug;

    switch ( action ) {

        // start the webserver
        case 'start':
            fs.exists( path.join( dir, configFile ), function( exists ) {
                exists ? startWs() : ceIdtConfig();
            } );
            break;

        default:

            break;

    }

};
