/**
 * build
 */

var utils = require( '../../common/utils' );

module.exports = function() {
    var program = this;
    utils.clog.cmd( 'running idt build, use ' + program.config );
};
