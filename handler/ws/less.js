/**
 * html 中间层，处理less
 */

var fs = require( 'fs' );
var path = require( 'path' );

var idtconfig = require( '../../config' );
var utils = require( '../../common/utils' );
var _ = require( 'underscore' );
var less = require( 'less' );

var config;

var answerForLess = function( data, req, res ) {

    debugger;

    less.render( data.toString(), function( err, css ) {
        if ( err ) throw err;
        res.setHeader( 'Content-Type', 'text/css;charset=UTF-8' );
        res.end( css );
    } );

};

exports.run = function( req, res, next, importConfig ) {

    config = importConfig;

    // /less/resume.less?v=1.5.5.6_0825
    var url = utils.trimUrlQuery( req.url );
    var fullpath = path.join( config.webContent, url );

    fs.readFile( fullpath, function( err, data ) {
        if ( err ) throw err;
        answerForLess( data, req, res );
    } );

};
