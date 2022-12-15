const {override, fixBabelImports} = require('customize-cra')
 
//按需打包
module.exports = override(
    //根据项目中的【import】语句打包，也就是说项目import了谁就打包谁，比如我只import Button组件，就可以只打包Button相关样式
    //这里的import使用的是babel-plugin-import依赖，将前缀省略去了，这个依赖需要手动安装，然后会在package.json文件中有体现
    fixBabelImports('import', {
        libraryName: 'antd',
        libraryDirectory: 'es',
        style: 'css',//自动打包相关样式
    }),
);