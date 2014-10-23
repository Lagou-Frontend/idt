/**
 * 配置文件
 */

// 指定项目源代码根目录
var webContent = __dirname + '/' + '../WebContent';

module.exports = {

    webContent: webContent,

    templates: webContent + '/template',

    // 指定的build目录
    buildPath: '',

    // mock数据目录，这个需要在自己的目录中自行建立
    mockVelocity: __dirname + '/mock/velocity',

    mockAjax: __dirname + '/mock/ajax'

};
