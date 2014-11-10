/**
 * ceconfig
 */

var shell = require( 'shelljs' );
var utils = require( '../../common/utils' );
var path = require( 'path' );
var idtconfig = require( '../../config' );

module.exports = function( callback ) {

    var program = this;
    var dir = process.cwd();

    console.log( 'create idt-config.js for your project, in dir: ' + dir );

    var comm = [

        'cp -f ',
        path.join( __dirname, '../../store', idtconfig.configName ),
        ' ',
        path.join( dir, idtconfig.configName )

    ].join( '' );

    utils.clog.cmd( 'running \n' + comm );

    shell.exec( comm, function( code, output ) {
        console.log( 'Exit code:', code );
        // console.log( 'Program output:', output );
        callback && callback();
    } );

};
