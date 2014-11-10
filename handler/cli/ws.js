/**
 * webserver
 */

var shell = require( 'shelljs' );
var path = require( 'path' );
var dir = process.cwd();
var idtconfig = require( '../../config' );

var configFile;
var config;
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

    ].join( '' );

    console.log( 'running \n' + comm );

    shell.exec( comm, function( code, output ) {
        console.log( 'Exit code:', code );
        console.log( 'Program output:', output );
    } );

};

module.exports = function( action ) {

    var program = this;
    configFile = program.config;
    console.log( 'running idt ws(webserver) %s, use ' + configFile, action );

    switch ( action ) {

        // start the webserver
        case 'start':
            startWs();
            break;

        default:

            break;

    }

};
