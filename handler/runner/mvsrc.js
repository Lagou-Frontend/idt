/**
 * mv src
 */

var shell = require( 'shelljs' );
var utils = require( '../../common/utils' );
var path = require( 'path' );
var fs = require( 'fs' );
var idtconfig = require( '../../config' );

var dir = process.cwd();

module.exports = function( targetpath ) {

    var comm = [

        'mv ', 
        path.join( targetpath, 'src' ),
        ' ',
        path.join( targetpath, 'asset' )

    ].join( '' );

    utils.clog.cmd( 'running ' + comm );

    shell.exec( comm, {
        async: false
    } );

    return true;

};