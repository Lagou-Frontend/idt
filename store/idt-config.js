/**
 * idt配置文件
 */

/**
 * module.conf 的样例示范，在根目录build，需要在根目录建立一个module.conf文件
 * 它是用来配置module模块，但是现在整体还没有用到，所以建立一个如下内容的文件即可
 */

// {
//     "baseUrl": "./",
//     "packages": [ ],
//     "combine": { }
// }

/**
 * 在根目录构建，可以新建一个`copyright.txt`文件，来给所有build出来的文件，添加统一的版权声明
 * 例如：
 */

/*! 2014 Lagou Inc. All Rights Reserved */

var path = require( 'path' );

// 当前文件夹路径【无需修改】
var webContent = __dirname;
// 二级目录设置【无需修改】
var secondary = '';
// build子目录时可能需要用到【无需修改】
var buildLevel = '';

// web inspector remote 的配置
var wsWeinreDebug = 'pooky' || 'off'; // debug username, 关闭调试: `off`
var weinreDebugPort = '' || '8080'; // default 8080
var weinreDebugHost = '' || 'localhost'; // default localhost 

// html中的字符串替换任务
var replaces = {
    exclude: [ '*' ],
    include: [ '*.html' ],
    replacements: [ { from: /\#parse\( \"/g, to: '#parse( "mobile/tpl/' } ]
};

module.exports = {

    //---以下为idt相关配置---//
    // port
    webPort: '8001',

    // 项目中的webcontent
    webContent: webContent,

    // velocity的template模板根目录
    templates: path.join( webContent, secondary, 'tpl' ),

    // mock数据支持【一般情况下无需修改】
    mockCommon: 'commonmock/common.js',
    // mock数据目录，这个需要在自己的目录中自行建立，更新到项目的目录中去维护【一般情况下无需修改】
    mockVelocity: path.join( webContent, secondary, 'mock/velocity' ),
    mockAjax: path.join( webContent, secondary, 'mock/ajax' ),

    // 反向代理配置
    reverseProxyMap: {

        // 键名可以随意
        mobile: {
            pattern: /^\/mobile\//,
            replace: '\/'
        },

        // 奇葩
        template2mobile: {
            pattern: /^\/template\/mobile\//,
            replace: '\/'
        }

    },

    /**
     * web server 中间层
     * requester 是一个请求器，可以用来做反向代理等等
     * 
     * @param  {[type]} connect     [description]
     * @param  {[type]} options     [description]
     * @param  {Array} middlewares 系统中间层
     * @param  {Object} rtool      { requester: 请求器, defaulthostp: '默认的本地域名' }
     * @return {[type]}             [description]
     */
    middlewares: function( connect, options, middlewares, rtool ) {

        // inject a custom middleware into the array of default middlewares
        // html example
        // middlewares.unshift( function( req, res, next ) {
        //     if ( utils.isHtml( req ) )
        //         return handlerHtml.run( req, res, next, config );
        //     return next();
        // } );

        middlewares.unshift( function( req, res, next ) {
            
            console.log( 'user middleware, request url: ' + req.url );

            return next();
        } );

        // console.log( rtool.requester, rtool.defaulthostp );

        return middlewares;

    },

    // web inspector remote 的配置
    wsWeinreDebug: wsWeinreDebug, // debug username, 关闭调试: `off`
    weinreDebugPort: weinreDebugPort, // default 8080
    weinreDebugHost: weinreDebugHost, // default localhost 

    // 是否对'*.atpl.js'这种请求进行判断
    // false: 读取'*.atpl'
    // true: 读取'*.atpl.js'
    wsNoNeed2TrimDotJs: false,

    // 以下三项最后的buildLevel不要修改
    // 需要build入的目录【需要手动配置】
    buildPath: path.resolve(
        '/WebContent/template/mobile' ),

    //---以下为edp相关配置---//
    // 【无需修改】
    input: path.resolve( webContent, buildLevel ),
    // 【无需修改】
    output: path.resolve( __dirname, '.output', buildLevel ),

    // 留出引用【无需修改】
    replaces: replaces,

    getProcessors: function() {
        var lessProcessor = new LessCompiler( {
            // // 在build的时候，没有必要对每一个less都进行编译，因为很可能有一些被import入的less文件
            // // 会编译出错【不会影响整体样式】，只需在include中写入每一个页面的入口main.less文件即可
            // exclude: [ '*.less' ],
            // include: [ 
            //     'src/center/mine/css/mine.less',
            //     'src/custom/search/css/search.less'
            //  ]
        } );
        var cssProcessor = new CssCompressor( {
            compressOptions: {
                keepBreaks: false
            }
        } );
        var html2JsCompilerProcessor = new Html2JsCompiler( {
            mode: 'compress',
            extnames: [ 'atpl' ],
            combine: true,
            exclude: [ '*' ],
            include: [ '*.atpl' ]
        } ); 
        var moduleProcessor = new ModuleCompiler();
        var jsProcessor = new JsCompressor();
        var pathMapperProcessor = new PathMapper();
        var addCopyright = new AddCopyright();

        // 字符串替换
        var stringReplace = new StringReplace( replaces );

        return {
            // 默认的build不需要压缩，以便开发（联调）的时候，利于调试
            'default': [ lessProcessor, html2JsCompilerProcessor,
                        moduleProcessor, pathMapperProcessor, 
                        stringReplace ],
            // 在最后联调成功以后，要进行release，会进行代码压缩等处理
            'release': [
                lessProcessor, cssProcessor, html2JsCompilerProcessor,
                moduleProcessor,jsProcessor, pathMapperProcessor, 
                addCopyright, stringReplace
            ]
        };
    },

    exclude: [
        'demo',
        'Gruntfile.js',
        'tests',
        'test',
        'examples',
        'vendor',
        'demo',
        'tool',
        'doc',
        'test',
        'make',
        'module.conf',
        'dep/packages.manifest',
        'dep/*/*/test',
        'dep/*/*/doc',
        'dep/*/*/demo',
        'dep/*/*/tool',
        'dep/*/*/*.md',
        'dep/*/*/package.json',
        'edp-*',
        '.edpproj',
        '.svn',
        '.git',
        '.gitignore',
        '.idea',
        '.project',
        'Desktop.ini',
        'Thumbs.db',
        '.DS_Store',
        '*.tmp',
        '*.bak',
        '*.swp',
        '*.psd',
        'copyright.txt',
        'package.json',
        'README.md',
        // 移动端的mobile现在还在WebContent中，要排除掉
        'mobile',
        'idt-config.js',
        // pagefooter.html为建立下载模板，build会出错，故排除，但是需要单独处理
        'pagefooter.html',
        'WEB-INF',
        'mock'
    ],

    // 和上面的保持一致就可以，idt单独对齐进行copy
    idtCopyList: [],

    // do not modify
    injectProcessor: function( processors ) {
        for ( var key in processors ) {
            global[ key ] = processors[ key ];
        }
    }

};
