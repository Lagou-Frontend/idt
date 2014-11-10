/**
 * idt配置文件
 */

var path = require( 'path' );

// 当前文件夹路径【无需修改】
var webContent = __dirname;
// 二级目录设置【可选】
var secondary = '';

var moduleEntries = 'html,htm,phtml,tpl,vm,js';
var pageEntries = 'html,htm,phtml,tpl,vm';

module.exports = {

    //---以下为idt相关配置---//
    // port
    webPort: '8001',

    // 项目中的webcontent
    webContent: webContent,

    // velocity的template模板根目录
    templates: path.join( webContent, secondary, 'tpl' ),

    // 【无需修改】
    mockCommon: 'commonmock/common.js',
    // mock数据目录，这个需要在自己的目录中自行建立，更新到项目的目录中去维护
    mockVelocity: path.join( webContent, secondary, 'mock/velocity' ),
    mockAjax: path.join( webContent, secondary, 'mock/ajax' ),

    //---以下为edp相关配置---//
    input: webContent,
    output: path.resolve( __dirname, 'output' ),

    getProcessors: function() {
        var lessProcessor = new LessCompiler();
        var cssProcessor = new CssCompressor();
        var moduleProcessor = new ModuleCompiler();
        var jsProcessor = new JsCompressor();
        var pathMapperProcessor = new PathMapper();
        var addCopyright = new AddCopyright();

        return {
            'default': [ lessProcessor, moduleProcessor, pathMapperProcessor ],
            'release': [
                lessProcessor, cssProcessor, moduleProcessor,
                jsProcessor, pathMapperProcessor, addCopyright
            ]
        };
    },

    exclude: [
        'tool',
        'doc',
        'test',
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
        '*.swp'
    ],

    // do not modify
    injectProcessor: function( processors ) {
        for ( var key in processors ) {
            global[ key ] = processors[ key ];
        }
    }

};
