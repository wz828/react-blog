---
title: CSS文本溢出显示省略号
date: 2019-03-01 17:16:37
tags:
    - css
---
## 单行文本溢出
```css
 overflow: hidden;   //超出的文本隐藏
 text-overflow: ellipsis;   //溢出用省略号
 white-space: nowrap;   //溢出不换行
```

## 多行文本溢出
```css
 display: -webkit-box;   //弹性伸缩盒子
 -webkit-box-orient: vertical;   //从上到下垂直排列子元素
 -webkit-line-clamp: 3;   //这是一个不规范的属性，组合上面两个属性，表示显示的行数
 word-break: break-all; 
 overflow: hidden;
 text-overflow: ellipsis;
```

## 关于打包后-webkit-box-orient: vertical;消失解决方法
```css
  /*! autoprefixer: off */
  -webkit-box-orient: vertical;
  /* autoprefixer: on */
```
