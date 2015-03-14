/**
 * bat html
 */

var shell = require( 'shelljs' );
var path = require( 'path' );
var fs = require( 'fs' );
var mkdirp = require( 'mkdirp' );
var _ = require( 'underscore' );

var dir = process.cwd();
var Engine = require( 'velocity' ).Engine;

var idtconfig = require( '../../config' );
var utils = require( '../../common/utils' );
var engines = require( '../../common/engines' );

var configFile;
var config;
var velocityTpl;
var dataDir;
var outDir;
var batInfo;

var cmdOpts;

function goExport() {

    // 判断输出目录是否存在
    !fs.existsSync( outDir ) 
        ? mkdirp( outDir, function( err ) {
            if ( err ) throw ( err )
            doExport();
        } )
        : doExport();

}

function doExport() {

    utils.clog.tip( 'ready for data dir: ' + dataDir );
    utils.clog.tip( 'ready for out dir: ' + outDir );

    var datas = fs.readdirSync( dataDir );

    if ( !datas.length ) {
        utils.clog.tell( 'no mock data found in: ' + outDir + ', will do nothing.' );
        return;
    }

    _.each( datas, writeFile );

}

function writeFile( value, key, list ) {

    var engine = engines.getEngine( velocityTpl, config );

    var output;
    engine.render( require( path.resolve( dataDir, value ) ),
        function ( o ) {

            output = o;
            // write
            var ofilename = path.join( outDir, utils.trimExt( value ) + '.html' );
            fs.writeFile(
                ofilename,
                output );

            utils.clog.tell( 'write file success: ' + ofilename );

        } );

}

module.exports = function( cf, options ) {

    cmdOpts = options;

    // 配置文件名
    configFile = cf;
    // 配置文件信息
    config = require( path.resolve( dir, configFile ) );

    // 导出信息
    batInfo = config.batch2Html;
    // 模版路径
    velocityTpl = path.join( config.templates, batInfo.tpl );

    // 判断是否存在，不存在给出提示
    if ( !fs.existsSync( velocityTpl ) ) {
        utils.clog.error( batInfo.tpl + ' does not exists, will do nothing.' );
        return;
    }

    // 由模板名字推算出的数据文件夹
    var trimedTplDir;
    dataDir = utils.trimUrlQuery( batInfo.tpl );
    dataDir = trimedTplDir = utils.trimExt( dataDir );
    dataDir = path.join( batInfo.path, dataDir );
    
    utils.clog.tip( 'check for dir: ' + dataDir );

    outDir = path.join( batInfo.out, trimedTplDir );

    // 检查数据文件夹是否存在，不存在的话自动建立
    !fs.existsSync( dataDir ) 
        ? mkdirp( dataDir, function( err ) {
            if ( err ) throw ( err )
            goExport();
        } )
        : goExport();

};
