/**
 * install
 */

var shell = require( 'shelljs' );
var path = require( 'path' );
var dir = process.cwd();
var idtconfig = require( '../../config' );
var utils = require( '../../common/utils' );

module.exports = function() {
    var program = this;
    utils.clog.cmd( 'running idt install, use ' + program.config );

    // 检查是否安装过
    var hasGruntInstalled = shell.exec( 'which grunt', { async: false } );
    var hasEdpInstalled = shell.exec( 'which edp', { async: false } );
    if ( !!hasGruntInstalled.output && !!hasEdpInstalled.output ) {
        console.log( 'you have installed `grunt` & `edp`.' );
        return;
    }

    // 全局安装这些依赖
    var comm = [

        'npm install -g grunt-cli', '\n',
        'npm install -g edp', '\n',
        'npm install -g edp-build', '\n'

    ].join( '' );

    utils.clog.cmd( 'running ' + comm );

    shell.exec( comm, function( code, output ) {
        console.log( 'Exit code:', utils.errorMaps[ code ] );
        // console.log( 'Program output:', output );
    } );

};
