/**
 * 主任务
 * @author pooky
 */
module.exports = function( grunt ) {

    // Project configuration.
    grunt.initConfig( {

        pkg: grunt.file.readJSON( 'package.json' )

    } );

    // 默认被执行的任务列表。
    grunt.registerTask( 'default', [] );

};
