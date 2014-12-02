/**
 * run ../shell/separate_static.sh
 */

var shell = require( 'shelljs' );
var utils = require( '../../common/utils' );
var path = require( 'path' );
var fs = require( 'fs' );
var idtconfig = require( '../../config' );

var dir = process.cwd();

module.exports = function( targetpath ) {

    var comm = [

        'find ', 
        targetpath,
        ' -type d -empty -delete'

    ].join( '' );

    utils.clog.cmd( 'running ' + comm );

    shell.exec( comm, {
        async: false
    } );

    return true;

};