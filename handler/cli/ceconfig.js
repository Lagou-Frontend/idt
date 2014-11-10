/**
 * ceconfig
 */

require( 'shelljs/global' );

var path = require( 'path' );
var idtconfig = require( '../../config' );

module.exports = function() {

    var program = this;
    var dir = process.cwd();

    console.log( 'create idt-config.js for your project, in dir: ' + dir );

    // copy config file
    cp( '-f', 
        path.join( __dirname, '../../store', idtconfig.configName ), 
        path.join( dir, idtconfig.configName ) );

};
