/**
 * 配置文件
 */

module.exports = {

    // 分离静态资源的脚本
    shell: {
        sp: 'separate_static.sh'
    },

    configName: 'idt-config.js',

    tempConfig: '.idt-config',

    wsName: 'webserver.js',

    htmlMin: 'bin/htmlcompressor-1.5.3.jar',

    moduleConfig: 'module.conf',

    moduleExample: {
        baseUrl: './',
        packages: [ ],
        combine: { }
    },

    copyright: 'copyright.txt',

    mock: [
        '//mock your velocity/ajax data\n',
        'module.exports = {\n\n\t\n',
        '}'
    ].join( '\n' )

};
