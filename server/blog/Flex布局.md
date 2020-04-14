---
title: Flex布局
date: 2019-03-11 09:22:47
tags:
    - flex
    - css
---


# 一、flex布局
任何一个容器都可以指定为flex布局
```css
div{
  display: flex;
}
```
行内元素也可以使用flex布局
```css
div{
  display: inline-flex;
}
```
Webkit内核的浏览器，须加上 -webkit前缀
```css
div{
  display: -webkit-flex; /* Safari */
  display: flex;
}
```
**注意：设为flex布局以后，子元素的float、clear、vertical-align属性将失效。**
******
# 二、flex属性
### flex-direction
伸缩流方向：row | row-reverse | column | column-reverse;
 
### flex-wrap
伸缩换行：nowrap | wrap | wrap-reverse;
- nowrap：默认值，不换行。
- wrap：行从上到下排，列从左到又排。
- wrap-reverse：行从下到上排，列从右到左排。

### flex-flow
伸缩流方向与换行：\<flex-direction> || \<flex-wrap>;

### justify-content
主轴对齐：flex-start | flex-end | center | space-between | space-around;

 - flex-start（默认值）：向一行的起始位置靠齐
 - flex-end：向一行的结束位置靠齐
 - center： 向一行的中间位置靠齐
 - space-between：平均地分布在行里，两端不保留空间
 - space-around：平均地分布在行里，两端保留一半的空间

### align-items
侧轴对齐：flex-start | flex-end | center | baseline | stretch;

 - flex-start：侧轴的起点对齐
 - flex-end：侧轴的终点对齐。 
 - center：侧轴的中点对齐。 
 - baseline：项目的第一行文字的基线对齐。 
 - stretch（默认值）：如果项目未设置高度或设为auto，将占满整个容器的高度。


### align-content
 堆栈伸缩行：flex-start | flex-end | center | space-between | space-around | stretch;

#### align-self
auto | flex-start | flex-end | center | baseline | stretch;
用来设置单独伸缩项目在侧轴的对齐方式，可以用来覆盖align-items属性。

 - flex-start：与侧轴的起点对齐
 - flex-end：与侧轴的终点对齐。
 - center：与侧轴的中点对齐。
 - space-between：与侧轴两端对齐，轴线之间的间隔平均分布
 - space-around：每根轴线两侧的间隔都相等。所以，轴线之间的间隔比轴线与边框的间隔大一倍。
 - stretch（默认值）：轴线占满整个交叉轴。

### flex
伸缩性：none | [ <'flex-grow'> <'flex-shrink'>? || <'flex-basis'> ];

- flex-grow: \<number>;  默认值为0，扩展项目，容器太大时对元素作出调整
- flex-shrink: \<number>; 默认值为1，收缩项目，容器太小时对元素作出调整
- flex-basis: \<length> | auto; 默认值为auto，调整前的项目初始大小

### order显示顺序
  order: \<number >; 属性定义项目的排列顺序。数值越小，排列越靠前，默认为0。