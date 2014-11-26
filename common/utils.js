/**
 * 工具
 */

var fs = require( 'fs' );
var path = require( 'path' );
var urler = require( 'url' );
var colors = require( 'colors' );

var _ = require( 'underscore' );

var os = require( 'os' );
var mimetype = require( './mimetype' );

/**
 * 去掉查询字符串等
 *
 * @param  {string} url [description]
 * @return {boolean}     [description]
 */
var trimUrlQuery = function( url ) {

    // if ( ~url.indexOf( '?' ) ) {
    //     return url.substring( 0, url.lastIndexOf( '?' ) )
    // } else {
    //     return url;
    // }

    var parsed = urler.parse( url );
    var protocol = parsed.protocol ? ( parsed.protocol + '//' ) : '';
    var host = parsed.host ? parsed.host : '';
    var pathname = parsed.pathname ? parsed.pathname : 'about:blank;';

    return protocol + host + pathname;

};

/**
 * 简易地检查url类型
 *
 * @param  {string} url  '/a/b/c.xxx'
 * @param  {string} type 'html'/'less'
 * @return {boolean}
 */
var checkUrlTail = function( url, type ) {

    url = trimUrlQuery( url );

    return url.substring( url.lastIndexOf( '.' ) + 1 ) == type;

};

var isWin32 = function () {

    return ~os.platform().indexOf( 'win32' );

};

var errorMaps = {
    0: 'ok'
};

module.exports = {

    errorMaps: errorMaps,

    trimUrlQuery: trimUrlQuery,

    clog: {

        cmd: function( msg ) {
            msg = 'IDT -> cmd: ' + msg;
            console.log(
                msg.bgGreen.blue );
        },

        error: function( msg ) {
            msg = 'IDT -> error: ' + msg;
            console.log(
                msg.bgGreen.red.underline );
        },

        tip: function ( msg ) {
            msg = 'IDT -> tip: ' + msg;
            console.log(
                msg.bgYellow.magenta );
        },

        tell: function ( msg ) {
            msg = 'IDT -> tell: ' + msg;
            console.log(
                msg.bgWhite.green );
        },

        nor: function ( msg ) {
            msg = 'IDT -> nor: ' + msg;
            console.log(
                msg.yellow );
        }

    },

    isWin32: isWin32,

    judgeImage: function ( response ) {

        return mimetype.image[ response.headers[ 'content-type' ] ];

    },

    handleWinCp: function( comm ) {

        if ( ! isWin32() )
            return comm;
        
        return comm
            .replace( /([a-z])\:\\/g, "\\$1\\" )
            .replace( /\\/g, '/' );

    },

    matchRProxy: function ( req, reverseProxyMap ) {

        var match = false;

        _.each( reverseProxyMap, function ( value, key ) {
            if ( value.pattern.test( req.url ) ) {
                match = key;
                return false;
            }
        } );

        return match;

    },

    getPathDir: function( pathl ) {

        var targetPath;
        var stats = fs.statSync( pathl );
        stats.isDirectory() ? ( targetPath = pathl ) : ( targetPath = path.dirname( pathl ) );

        return targetPath;

    },

    handleMockFullname: function( url ) {

        return url.substring( 1 ).replace( /\//g, '_' ) + '.js';

    },

    handleMockJsTail: function( path ) {

        return path + '.js';

    },

    isHtml: function( req ) {

        var url = req.url;

        return checkUrlTail( url, 'html' );

    },

    isAjax: function( req ) {

        var url = req.url;

        if ( req.headers[ 'x-requested-with' ] && ( req.headers[ 'x-requested-with' ] == 'XMLHttpRequest' ) && ( !checkUrlTail( url, 'js' ) ) )
            return 1;

        return checkUrlTail( url, 'json' );

    },

    isLess: function( req ) {

        var url = req.url;

        return checkUrlTail( url, 'less' );

    },

    isAtpl: function( req ) {

        // *.atpl.js
        var url = trimUrlQuery( req.url ).split( '.js' )[ 0 ];

        return checkUrlTail( url, 'atpl' );

    }

};
