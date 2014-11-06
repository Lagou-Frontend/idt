/**
 * build 配置
 */

var path = require( 'path' );

var config = require( './config' );

module.exports = function( grunt ) {

    // Project configuration.
    grunt.initConfig( {

        pkg: grunt.file.readJSON( 'package.json' ),

        transport: {
            files: [ {
                src: config.sourcePath,
                dest: config.buildPath
            } ]
        }

    } );

    grunt.loadNpmTasks( 'grunt-cmd-transport' );
    grunt.loadNpmTasks( 'grunt-cmd-concat' );

    // 默认被执行的任务列表。
    grunt.registerTask( 'default', [ 'transport' ] );

};
