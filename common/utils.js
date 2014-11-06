/**
 * 工具
 */

/**
 * 去掉查询字符串
 * 
 * @param  {string} url [description]
 * @return {boolean}     [description]
 */
var trimUrlQuery = function ( url ) {

    if ( ~ url.indexOf( '?' ) ) {
        return url.substring( 0, url.lastIndexOf( '?' ) )
    }
    else {
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
var checkUrlTail = function ( url, type ) {

    url = trimUrlQuery( url );

    return url.substring( url.lastIndexOf( '.' ) + 1 ) == type;

};

module.exports = {

    trimUrlQuery: trimUrlQuery,

    handleMockFullname: function ( url ) {

        return url.substring( 1 ).replace( /\//g, '_' ) + '.js';

    },

    handleMockJsTail: function ( path ) {

        return path + '.js';

    },

    isHtml: function ( req ) {

        var url = req.url;

        return checkUrlTail( url, 'html' );

    },

    isAjax: function ( req ) {

        var url = req.url;

        if ( req.headers[ 'x-requested-with' ]
            && ( req.headers[ 'x-requested-with' ] == 'XMLHttpRequest' )
            && ( !checkUrlTail( url, 'js' ) ) )
            return 1;

        return checkUrlTail( url, 'json' );

    },

    isLess: function ( req ) {

        var url = req.url;

        return checkUrlTail( url, 'less' );

    }

};
