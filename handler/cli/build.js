/**
 * build
 */

var shell = require( 'shelljs' );
var utils = require( '../../common/utils' );
var path = require( 'path' );
var idtconfig = require( '../../config' );

var fs = require( 'fs' );
var mkdirp = require( 'mkdirp' );

// 当前操作路径
var currentDir = process.cwd();

// 用户配置
var userConfig;
// 用户传参
var userBuilds;
// 是否release
var isRelease;

// 针对子文件夹的build
var buildMulti = function() {

    userBuilds.forEach( function( item, index ) {

        var target = path.join( currentDir, item );
        if ( !fs.existsSync( target ) ) {
            utils.clog.error( 'do not exists: ' + target );
            return false;
        }
        buildItem( target, item );

    } );

    // 从.output中copy至目标路径
    copyAssets();

    isRelease && compressHtmlForItem();

    deleteAssets();

    deleteTemp();

};

var deleteTemp = function() {

    var comm = [

        'rm -f ',
        path.join( currentDir, idtconfig.tempConfig )

    ].join( '' );

    utils.clog.cmd( 'running ' + comm );

    shell.exec( comm, {
        async: false
    } );

    userBuilds.forEach( function( item, index ) {

        var targetPath = utils.getPathDir( path.join( currentDir, item ) );
        if ( !~targetPath.lastIndexOf( path.basename( item ) ) ) {
            item = path.dirname( item );
        }
        deleteSingleModuleConf( item );

    } );

};

var deleteSingleModuleConf = function( item ) {

    var comm = [

        'rm -f ',
        path.join( currentDir, item, idtconfig.moduleConfig )

    ].join( '' );

    utils.clog.cmd( 'running ' + comm );

    shell.exec( comm, {
        async: false
    } );

};

var runBuildItem = function( targetPath, item ) {

    var comm = [

        'edp build ',
        '--config=.idt-config ',
        '--stage=',
        isRelease ? 'release' : 'default',
        ' -f'

    ].join( '' );

    utils.clog.cmd( 'running ' + comm );

    shell.exec( comm, {
        async: false
    } );

    // if ( isRelease 
    //     && item.indexOf( path.basename( userConfig.templates ) ) == 0 ) {
    //     // 需要压缩html
    //     compressHtmlForItem( targetPath, item );
    // }

};

var compressHtmlForItem = function() {

    userBuilds.forEach( function( item, index ) {
        var targetPath = utils.getPathDir( path.join( currentDir, item ) );
        if ( !~targetPath.lastIndexOf( path.basename( item ) ) ) {
            item = path.dirname( item );
        }
        // var target = path.join( currentDir, item );

        var comm = [

            'java -jar ',
            path.join( __dirname, '../../', idtconfig.htmlMin ),
            ' ',
            '--type html --recursive -o ',
            path.join( userConfig.buildPath, item, '/' ),
            ' ',
            path.join( userConfig.output, item )

        ].join( '' );

        utils.clog.cmd( 'running ' + comm );

        shell.exec( comm, {
            async: false
        } );

    } );

};

var buildItem = function( target, item ) {

    var targetPath = utils.getPathDir( target );

    if ( !~targetPath.lastIndexOf( path.basename( item ) ) ) {
        item = path.dirname( item );
    }

    // 检查是否有`module.config`
    var module = path.join( targetPath, idtconfig.moduleConfig );
    if ( !fs.existsSync( module ) ) {
        fs.writeFileSync( module, JSON.stringify( idtconfig.moduleExample ) );
    }

    // 生成动态idt-config，修改现有路径
    fs.writeFileSync( path.join( currentDir, idtconfig.tempConfig ),
        fs.readFileSync( path.join( currentDir, idtconfig.configName ), {
            encoding: 'utf-8'
        } )
        .replace( /buildLevel = \'\'/, 'buildLevel = \'' + item + '\'' ) );

    // 命令要使用同步模式
    runBuildItem( targetPath, item );

};

var runCopy = function( fileName ) {

    var comm = [

        'cp -f ',
        path.join( currentDir, fileName ),
        ' ',
        path.join( userConfig.output, path.dirname( fileName ) )

    ].join( '' );

    comm = utils.handleWinCp( comm );

    utils.clog.cmd( 'running ' + comm );

    shell.exec( comm, {
        async: false
    } );

};

var copyAssets = function() {

    // 检查目标路径
    !fs.existsSync( userConfig.buildPath ) && mkdirp.sync( userConfig.buildPath );

    var comm = [

        'cp -rf ',
        path.join( userConfig.output, '/*' ),
        ' ',
        path.join( userConfig.buildPath )

    ].join( '' );

    comm = utils.handleWinCp( comm );

    utils.clog.cmd( 'running ' + comm );

    shell.exec( comm, {
        async: false
    } );

    // deleteAssets();

};

var deleteAssets = function() {

    var comm = [

        'rm -rf ',
        path.join( userConfig.output )

    ].join( '' );

    utils.clog.cmd( 'running ' + comm );

    shell.exec( comm, {
        async: false
    } );

};

var compressHtml = function() {

    var comm = [

        'java -jar ',
        path.join( __dirname, '../../', idtconfig.htmlMin ),
        ' ',
        '--type html --recursive -o ',
        path.join( userConfig.buildPath, path.basename( userConfig.templates ) ),
        ' ',
        path.join( userConfig.output, path.basename( userConfig.templates ) )

    ].join( '' );

    utils.clog.cmd( 'running ' + comm );

    shell.exec( comm, function( code, output ) {
        console.log( 'Exit code:', utils.errorMaps[ code ] );
        // console.log( 'Program output:', output );
        deleteAssets();
    } );

};

var buildRootCopy = function() {

    var targets = userConfig.idtCopyList;
    targets.forEach( function( item, index ) {
        runCopy( item );
    } );

    // 从.output中copy至目标路径
    copyAssets();

    // 压缩html
    if ( isRelease ) {
        compressHtml();
        return;
    }

    deleteAssets();

};

// 对根目录的build
var buildRoot = function() {

    // root的build需要自己先写好idt-config.js文件
    var comm = [

        'edp build ',
        '--config=idt-config.js ',
        '--stage=',
        isRelease ? 'release' : 'default',
        ' -f'

    ].join( '' );

    utils.clog.cmd( 'running ' + comm );

    shell.exec( comm, function( code, output ) {
        console.log( 'Exit code:', utils.errorMaps[ code ] );
        // console.log( 'Program output:', output );
        // copy something
        buildRootCopy();
    } );

};

module.exports = function( dirs, release ) {
    var program = this;
    utils.clog.cmd( 'running idt build, use ' + program.config );

    userConfig = require( path.resolve( currentDir, program.config ) );
    userBuilds = dirs;
    isRelease = release;

    // 如果没有附带参数，则从当前目录开始构建
    dirs.length ? buildMulti() : buildRoot();

};
