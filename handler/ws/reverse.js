/**
 * reverse 中间层，反向代理
 */

var fs = require( 'fs' );
var path = require( 'path' );
var mkdirp = require( 'mkdirp' );

var colors = require( 'colors' );

var idtconfig = require( '../../config' );
var utils = require( '../../common/utils' );
var _ = require( 'underscore' );

var requester = require( 'request' );

var config;

exports.run = function( req, res, next, importConfig, matcherKey ) {

    debugger;

    config = importConfig;

    var targetUrl = req.url.replace(
        importConfig.reverseProxyMap[ matcherKey ].pattern,
        importConfig.reverseProxyMap[ matcherKey ].replace );

    var target = 'http://localhost:' + config.webPort + targetUrl;

    requester( target, function( error, response, body ) {

        var msg = 'reverse proxy: ' + req.url + ' to ' + targetUrl;

        utils.clog.tip( msg );
        
        debugger;

        if ( !error && response.statusCode == 200 ) {

            // 需要设置headers
            _.each( response.headers, function ( value, key ) {
                res.setHeader( key, value );
            } );
            var out = body;
            if ( utils.judgeImage( response ) ) {
                out = 
                    fs.readFileSync( path.join( config.webContent, targetUrl ) );
                utils.clog.tell( 'response is image type: ' + targetUrl
                    + ' use `readFileSync` to get image data' );
            }
            res.end( out );
            return;
        }

        // res.end( '' );
        utils.clog.error( 'reverse proxy about \'' + targetUrl + '\'' );

    } );

};
