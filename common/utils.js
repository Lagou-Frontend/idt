/**
 * 工具
 */

var fs = require( 'fs' );
var path = require( 'path' );
var colors = require( 'colors' );

var _ = require( 'underscore' );

var os = require( 'os' );

/**
 * 去掉查询字符串
 *
 * @param  {string} url [description]
 * @return {boolean}     [description]
 */
var trimUrlQuery = function( url ) {

    if ( ~url.indexOf( '?' ) ) {
        return url.substring( 0, url.lastIndexOf( '?' ) )
    } else {
        return url;
    }

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
            console.log(
                colors.bgGreen.blue.underline( msg ) );
        },

        error: function( msg ) {
            console.log(
                colors.bgGreen.red.underline( msg ) );
        },

        tip: function ( msg ) {
            console.log(
                colors.bgYellow.magenta( msg ) );
        }

    },

    isWin32: isWin32,

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

    }

};
