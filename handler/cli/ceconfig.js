/**
 * ceconfig
 */

var shell = require( 'shelljs' );
var utils = require( '../../common/utils' );
var path = require( 'path' );
var fs = require( 'fs' );
var idtconfig = require( '../../config' );

var dir = process.cwd();

var scopyright;
var smoduleconf;

var tcopyright;
var tmoduleconf;

function cecopyright() {

    utils.clog.nor( 'create copyright for your project, in dir: ' + dir );

    var comm = [

        'cp -f "',
        scopyright,
        '" "',
        path.dirname( tcopyright ),
        '"'

    ].join( '' );

    comm = utils.handleWinCp( comm );

    utils.clog.cmd( 'running ' + comm );

    shell.exec( comm, function( code, output ) {
        utils.clog.nor( 'Exit code: ' + utils.errorMaps[ code ] );
    } );

}

function cemoduleconf () {

    utils.clog.nor( 'create moduleConfig for your project, in dir: ' + dir );

    var comm = [

        'cp -f "',
        smoduleconf,
        '" "',
        path.dirname( tmoduleconf ),
        '"'

    ].join( '' );

    comm = utils.handleWinCp( comm );

    utils.clog.cmd( 'running ' + comm );

    shell.exec( comm, function( code, output ) {
        utils.clog.nor( 'Exit code: ' + utils.errorMaps[ code ] );
    } );

}

function cemore () {

    scopyright = path.join( __dirname, '../../store', idtconfig.copyright );
    smoduleconf = path.join( __dirname, '../../store', idtconfig.moduleConfig );

    tcopyright = path.join( dir, idtconfig.copyright );
    tmoduleconf = path.join( dir, idtconfig.moduleConfig );

    !fs.existsSync( tcopyright ) && cecopyright();

    !fs.existsSync( tmoduleconf ) && cemoduleconf();

}

function cemain( callback ) {

    var configfile = path.join( dir, idtconfig.configName );

    if ( fs.existsSync( configfile ) ) {
        utils.clog.tip( 'idt-config.js exists in: ' + dir + '. Will do nothing.');
        return;
    }

    utils.clog.nor( 'create idt-config.js for your project, in dir: ' + dir );

    var comm = [

        'cp -f "',
        path.join( __dirname, '../../store', idtconfig.configName ),
        '" "',
        path.dirname( configfile ),
        '"'

    ].join( '' );

    comm = utils.handleWinCp( comm );

    utils.clog.cmd( 'running ' + comm );

    shell.exec( comm, function( code, output ) {
        utils.clog.nor( 'Exit code: ' + utils.errorMaps[ code ] );

        callback && callback();

        // 异步检查`module.conf`和`copyright.txt`文件是否存在，不存在的话自动建立
        cemore();
    } );

}

module.exports = function( type, callback ) {

    var program = this;

    switch ( type ) {

        case 'main':
            cemain( callback );
            break;

        case 'more':
            cemore();
            break;

        default:
            break;

    }

};
