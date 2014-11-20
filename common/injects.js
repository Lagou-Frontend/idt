/**
 * 响应注入
 */

var jsdom = require( 'jsdom' );
var serializeDocument = require( 'jsdom' ).serializeDocument;

module.exports = {

    weinre: function( config, output, callback ) {

        var script = 'http://' 
            + config.weinredebughost + ':' 
            + config.weinredebugport + '/target/target-script-min.js#' 
            + config.wsweinredebug;

        jsdom.env(
            output, [ script ],
            function( errors, window ) {
                var doc = window.document;
                callback( serializeDocument( doc ) );
            }
        );

    }

};
