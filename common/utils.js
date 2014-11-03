/**
 * 工具
 */

module.exports = {

    isHtml: function ( req ) {

        return req.url.substring( req.url.length - 4 ) == 'html';

    },

    isAjax: function ( req ) {

        if ( req.headers[ 'x-requested-with' ]
            && ( req.headers[ 'x-requested-with' ] == 'XMLHttpRequest' )
            && ( req.url.substring( req.url.length - 3 ) != '.js' ) )
            return 1;

        return req.url.substring( req.url.length - 4 ) == 'json';

    }

};
