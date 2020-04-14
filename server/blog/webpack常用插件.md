---
title: webpack常用插件
date: 2019-04-11 15:07:20
tags:
    - webpack
---

[插件| webpack 中文网](https://www.webpackjs.com/plugins/)

***
webpack plugin：loader无法实现的其他事，压缩js、压缩图片、单独分离出css文件......


### 1. html-webpack-plugin
将src/index.html模板，删掉index.html里面的所有script和link标签，最终在dist/目录自动生成引用打包后的文件index.html

1. 安装插件：npm install html-webpack-plugin --save-dev 安装插件
2. 修改构建文件webpack.config.js
```js
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, './dist')
    },
    plugins: [
        // 加入 html 模板任务
        new HtmlWebpackPlugin({
            // 模板文件
            template: 'src/index.html',
            // 打包后文件名称，会自动放到 output 指定的 dist 目录
            filename: 'index.html'
        })
    ]
}
```
### 2. copy-webpack-plugin
将src/images下的所有图片复制到dist/images目录

[查看copy-webpack-plugin文档](https://github.com/webpack-contrib/copy-webpack-plugin)

1. 安装插件：npm install copy-webpack-plugin --save-dev 安装插件
2. 修改构建文件webpack.config.js，在 plugins 数组中加入该插件的任务
```js
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
    plugins: [
        new CopyPlugin([{
            from: 'src/images',
            to: 'images'
        }, ]),
    ],
};
```
### 3. extract-text-webpack-plugin
将CSS文件分离出来，构建后目录单独有一个style.css文件
1. 安装插件：npm install extract-text-webpack-plugin --save-dev 安装插件
2. 修改构建文件webpack.config.js，在 plugins 数组中加入该插件的任务
```js
const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",   //编译后用什么loader来提取css文件
          use: "css-loader"     //需要什么样的loader去编译文件
        })
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin("styles.css"),
  ]}
```
### 4. clean-webpack-plugin
每次构建之前删掉dist目录，避免上一次构建的影响
1. 安装插件：npm install clean-webpack-plugin --save-dev 安装插件
2. 修改构建文件webpack.config.js，在 plugins 数组中加入该插件的任务

[查看clean-webpack-plugin文档](https://github.com/johnagan/clean-webpack-plugin)
```js
const CleanWebpackPlugin = require("clean-webpack-plugin");

module.exports = {
  plugins: [
    new CleanWebpackPlugin()
  ]}
```

### 5. uglifyjs-webpack-plugin
1. 安装插件：npm install uglifyjs-webpack-plugin --save-dev 安装插件
2. 修改构建文件webpack.config.js，在 plugins 数组中加入该插件的任务
```js
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
  plugins: [
    new UglifyJsPlugin()
  ]}
```
ps：以前用webpack自带的webpack.optimize.UglifyJsPlugin，不用安装，webpack新版本已不支持

![Minification](https://img-blog.csdnimg.cn/20190328233141648.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzI1MTc0NzAx,size_16,color_FFFFFF,t_70)

***
### 6. 打包报错

##### 1. Tapable.plugin is deprecated. Use new API on `.hooks` instead
在使用extract-text-webpack-plugin给webpack打包时出现报错

**问题原因：**
extract-text-webpack-plugin目前版本不支持webpack4。

**解决方案：**
使用extract-text-webpack-plugin的最新的beta版
npm install extract-text-webpack-plugin@next

##### 2. The 'mode' option has not been set, webpack will fallback to 'production' for this value. Set 'mode' option to 'development' or 'production' to enable defaults for each environment.
webpack官网更新日志有说明：webpack升级4.0新增mode属性

**解决方案：**
1.package.json中设置：

```js
"scripts": {
    "dev": "webpack --mode development",  // 开发环境
     "build": "webpack --mode production",  // 生产环境
  },
```
2.webpack.config.js中设置：

```js
module.exports = {
    entry: './src/app.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'main.js'
    },
    mode: 'development' // 设置mode
}
```

 3.下载指定webpack指定版本：

npm i -D webpack@3 // 3： webpack版本3最新
