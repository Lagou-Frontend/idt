/**
 * bat
 */

var shell = require( 'shelljs' );
var path = require( 'path' );
var fs = require( 'fs' );
var dir = process.cwd();
var idtconfig = require( '../../config' );

var utils = require( '../../common/utils' );

var configFile;
var config;

module.exports = function( action, options ) {

    var program = this;
    configFile = program.config;
    utils.clog.cmd( 'running idt bat ' 
        + action + ', use ' + configFile );

    switch ( action ) {

        case 'html':
            require( '../bat/html' )( configFile, options );
            break;

        default:

            break;

    }

};
