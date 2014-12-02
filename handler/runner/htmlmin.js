/**
 * run java html min
 */

var shell = require( 'shelljs' );
var utils = require( '../../common/utils' );
var path = require( 'path' );
var fs = require( 'fs' );
var idtconfig = require( '../../config' );

var dir = process.cwd();

module.exports = function( output, source ) {

    var comm = [

        'java -jar ',
        path.join( __dirname, '../../', idtconfig.htmlMin ),
        ' ',

        '--remove-style-attr ',
        '--remove-link-attr ',
        '--remove-script-attr ',
        // '--compress-js ',
        '--compress-css ',
        // '--nomunge ',
        // '--js-compressor closure ',
        // '--closure-opt-level advanced ',

        '--type html --recursive -o ',
        output,
        ' ',
        source

    ].join( '' );

    utils.clog.cmd( 'running ' + comm );

    // shell.exec( comm, function( code, output ) {
    //     utils.clog.nor( 'Exit code: ' + utils.errorMaps[ code ] );
    //     // console.log( 'Program output:', output );
    //     afterBuild();
    // } );

    shell.exec( comm, { async: false } );

};