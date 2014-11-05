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
    templates: path.join( webContent, '/template' ),

    // 指定的build目录
    buildPath: '',

    // mock数据目录，这个需要在自己的目录中自行建立
    mockVelocity: path.join( __dirname, '/mock/velocity' ),

    mockAjax: path.join( __dirname, '/mock/ajax' )

};
