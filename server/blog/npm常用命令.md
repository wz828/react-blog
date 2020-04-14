---
layout: npm常用命令
title: npm简介与常用命令
date: 2019-02-03 21:16:24
tags:
    - npm
    - node
---
## npm：Node Package Manager，Node包管理器，Node.js默认的用JavaScript编写的软件包管理器
如果一个项目中存在 package.json 文件，那么用户可以直接使用 **npm install** 命令自动安装和维护当前项目所需的所有模块。
在 **package.json** 文件中，开发者可以指定每个依赖项的版本范围。

一般情况下，npm 的使用情况有这样几种：

 1. 从 npm 服务器下载第三方包到本地。
 2. 从 npm 服务器下载并安装别人的命令行程序到本地。
 3. 将自己便携的 npm 包或者命令行程序上传到 npm 服务器。
 
更多的信息，我们可以参考 [npm 官方网站](https://www.npmjs.com/)。
实际上，Node 的包管理器除了 npm，还有 Facebook 推出的 yarn 与淘宝推出的 cnpm。
***************************************************
**npm 安装模块一般有两种方式：全局安装和项目内安装**
一般对于我们需要全局使用的命令行程序等，我们采用全局安装，而对于项目中依赖的包模块，我们采用项目内安装的方式。

## 全局安装

    npm install xxx -g / npm install -g xxx

这样安装的包一般会在本机 Node 的安装目录，对于 Linux 系统来说，这个目录默认一般是 /usr/local/lib/Node_modules， 
而 windows 会在安装 Node 的文件夹中的 node_module 文件夹内。
全局安装的包，一般会有暴露的命令行命令，可以直接使用。

## 项目内安装
npm install：按照现成依赖列表安装（根据package.json这个配置文件，自动下载所需的模块，也就是配置项目所需的运行和开发环境）

    npm install xxx
    npm install xxx@<Version>：安装指定版本
    npm install --save xxx：安装并写入运行依赖
    npm install --save-dev xxx：安装并写入开发依赖
    npm install -g npm：更新npm

*********************************
## 常用命令
    npm 更新模块
    npm update xxx：更新模块，默认更新到最新版本
    npm update xxx@<Version>：更新指定版本
    npm 卸载模块
    npm uninstall xxx (-g)：卸载模块但是不删除 package.json 中的记录
    npm uninstall xxx --save：卸载模块并删除在 package.json 的生产环境中(dependencies)的记录
    npm uninstall xxx --save-dev：卸载模块并删除在 package.json 开发环境中的记录
    npm remove -g  <Module Name> 的方式移除全局模块。
    
    node -v：查看安装版本
    npm -v：查看安装版本
    npm ls：查看安装的模块及依赖
    npm ls webpack：查看某个安装的模块
    npm ls -g：查看全局安装的模块及依赖
    
    npm cache clean：清空缓存
    
    npm start：打开服务器（start是写在package.json文件里的）
    http-server：启动http服务器
    http-server -p 3001：指定端口
