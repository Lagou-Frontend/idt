/**
 * 工具
 */

module.exports = {

    isHtml: function ( req ) {

        return req.url.substring( req.url.length - 4 ) == 'html';

    },

    isAjax: function ( req ) {

        return req.url.substring( req.url.length - 4 ) == 'json';

    }

};
