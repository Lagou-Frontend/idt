/**
 * run ../shell/delete_empty.sh
 */

var shell = require( 'shelljs' );
var utils = require( '../../common/utils' );
var path = require( 'path' );
var fs = require( 'fs' );
var idtconfig = require( '../../config' );

var dir = process.cwd();

module.exports = function( targetpath ) {

    var comm = [

        'sh "',
        path.resolve( __dirname, '../shell', idtconfig.shell.de ),
        '" "',
        targetpath,
        '"'

    ].join( '' );

    utils.clog.cmd( 'running ' + comm );

    shell.exec( comm, {
        async: false
    } );

    return true;

};