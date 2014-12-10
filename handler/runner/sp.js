/**
 * run ../shell/separate_static.sh
 */

var shell = require( 'shelljs' );
var utils = require( '../../common/utils' );
var path = require( 'path' );
var fs = require( 'fs' );
var idtconfig = require( '../../config' );

var dir = process.cwd();

module.exports = function( targetpath, key ) {

    var comm = [

        'sh "',
        path.resolve( __dirname, '../shell', idtconfig.shell.sp ),
        '" "',
        targetpath,
        '" "',
        key,
        '"'

    ].join( '' );

    utils.clog.cmd( 'running ' + comm );

    shell.exec( comm, {
        async: false
    } );

    return true;

};