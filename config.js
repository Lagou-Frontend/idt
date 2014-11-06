/**
 * 配置文件
 */

var path = require( 'path' );

// 指定项目源代码根目录【建议是绝对路径】
var webContent = '/Users/mrguan/work/application/WebContent';
// windows
// var webContent = 'C:\\xxx\\xxx\\xxx';

module.exports = {

    // 项目中的webcontent--jason
    webContent: webContent,

    // velocity的template模板根目录
    templates: path.join( webContent, 'template' ),

    mockCommon: 'commonmock/common.js',
    // mock数据目录，这个需要在自己的目录中自行建立，更新到项目的目录中去维护
    mockVelocity: path.join( webContent, 'mobile/mock/velocity' ),
    mockAjax: path.join( webContent, 'mobile/mock/ajax' ),

    // 源文件目录
    sourcePath: path.join( webContent, 'idttest' ),

    // 指定的build目录
    buildPath: path.join( webContent, 'idttest/dist' )

};
