/**
 * html 中间层，处理atpl
 */

var fs = require( 'fs' );
var path = require( 'path' );

var idtconfig = require( '../../config' );
var utils = require( '../../common/utils' );
var _ = require( 'underscore' );
var html2js = require( 'html2js' );

var config;

var answerForAtpl = function( data, req, res, fullpath ) {

    debugger;

    res.setHeader( 'Content-Type', 'application/javascript;charset=UTF-8' );
    // var modes = ['format', 'default', 'compress'];
    var out = config.wsNoNeed2TrimDotJs ? data : html2js( data, {
        mode: 'format',
        wrap: true
    } );
    res.end( out );

};

exports.run = function( req, res, next, importConfig ) {

    config = importConfig;

    // /*/**/*.atpl.js?v=1.5.5.6_0825
    var url = utils.trimUrlQuery( req.url );
    // 去掉最后的'.js'
    url = config.wsNoNeed2TrimDotJs ? url : url.split( '.js' )[ 0 ];
    var fullpath = path.join( config.webContent, url );

    fs.readFile( fullpath, 'utf-8', function( err, data ) {
        if ( err ) throw err;
        answerForAtpl( data, req, res, fullpath );
    } );

};
