/**
 * 获取模板渲染引擎
 */

/**
 * velocity的模板引擎
 * @type {exports.Engine|*}
 */
var velocityEngine = require( 'velocity' ).Engine;

/**
 * django的模板引擎
 */
var djangoEngine = require( 'django' );

module.exports = {

    /**
     * 获取渲染引擎
     * @param tplFile
     * @param config
     */
    getEngine : function ( tplFile, config ) {

        /**
         * 每一个engine必须要留有一个render方法
         * @type {{velocity: velocityEngine}}
         */
        var engines = {

            // velocity
            velocity: {
                /**
                 * 自定义的render方法
                 * @param context
                 */
                render: function ( context, callback ) {
                    var renderer = new velocityEngine( {
                        root: config.templates,
                        template: tplFile,
                        cache: false
                    } );
                    callback( renderer.render( context ) );
                }
            },

            // django
            django: {
                /**
                 * 自定义的render方法
                 * @param context
                 */
                render: function ( context, callback ) {

                    djangoEngine.configure( {
                        template_dirs: config.templates
                    } );
                    return djangoEngine
                        .renderFile( tplFile, context, function ( err, out ) {
                            if ( err )
                                throw err;
                            callback( out );
                        } );
                }
            }

        };

        return engines[ config.tplEngine || 'velocity' ];

    }

};
