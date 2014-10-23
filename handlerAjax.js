/**
 * html 中间层，处理velocity
 */

var fs = require( 'fs' );
var config = require( './config' );
var _ = require( 'underscore' );

var Engine = require( 'velocity' ).Engine;

var make = function( url2filename, fullpath, req, res ) {
    debugger;

    var commonPath = config.mockAjax + '/common';
    // delete cache
    delete require.cache[ require.resolve( fullpath ) ];
    delete require.cache[ require.resolve( commonPath ) ];

    var context = _.extend( require( fullpath ), require( commonPath ) );
    res.end( JSON.stringify( context ) );

};

var create = function( url2filename, fullpath, req, res ) {

    fs.writeFile( fullpath, '//mock your ajax data', function( err ) {
        if ( err ) throw err;
        res.end( '已经自动生成 ajax 对应的 mockdata 文件，请写入数据：）' );
    } );

};

exports.run = function( req, res, next ) {

    debugger;
    // /projectExperience/save.json to ...
    // projectExperience_save.json.js
    var url2filename = req.url.substring( 1 ).replace( /\//g, '_' ) + '.js';
    var fullpath = config.mockAjax + '/' + url2filename;

    var arg = [ url2filename, fullpath, req, res ];
    // 检查mock下面是否有对应的js文件存在，没有的话，自动生成
    fs.exists( fullpath, function( exists ) {
        exists
            ? make.apply( null, arg ) : create.apply( null, arg );
    } );

};
