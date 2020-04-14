---
title: canvas笔记
date: 2019-03-05 10:28:42
tags:
	- canvas
---

# 一、绘制复杂图形
## 1.画曲线
 1. 二次贝塞尔曲线，用quadraticCurveTo(cpx,cpy,x,y)，cpx、cpy表示控制点的坐标，x、y表示终点坐标
```js
 var canvas = document.getElementById('canvas');        
 var context = canvas.getContext('2d');  
       
 context.beginPath();        
 context.moveTo(100,100);        
 context.quadraticCurveTo(20,50,200,20);        
 context.stroke();
```
![在这里插入图片描述](https://img-blog.csdnimg.cn/20190305225253151.png)
 2. 三次贝塞尔曲线，用bezierCurveTo(cpx1,cpy1,cpx2,cpy2,x,y)，有两个控制点

```js
context.moveTo(68,130);        
context.bezierCurveTo(20,10,268,10,268,170);        
context.stroke();
```
 ![在这里插入图片描述](https://img-blog.csdnimg.cn/20190305225332228.png)
## 2.利用clip在指定区域绘图       
clip函数使用当前路径作为连续绘制操作的剪切区域 
```js
context.arc(100,100,40,0,360*Math.PI/180,true);        
context.clip();        
context.beginPath();        
context.fillStyle = "lightblue";        
context.fillRect(0,0,300,150);  
```
![在这里插入图片描述](https://img-blog.csdnimg.cn/20190305225226836.png)
如果改成context.fillRect(0,0,100,100);
![在这里插入图片描述](https://img-blog.csdnimg.cn/20190305225234181.png)
## 3.绘制自定义图形        
```js
context.beginPath();        
context.moveTo(100,150);        
context.bezierCurveTo(50,100,100,0,150,50);        
context.bezierCurveTo(200,0,250,100,200,150);        
context.bezierCurveTo(250,200,200,300,150,250);        
context.bezierCurveTo(100,300,50,200,100,150);        
context.closePath();     
context.moveTo(100,150);        
context.lineTo(150,50);        
context.lineTo(200,150);        
context.lineTo(150,250);        
context.lineTo(100,150);        
context.lineWidth = 5;        
context.strokeStyle = "#fff";        
context.stroke();
```
![在这里插入图片描述](https://img-blog.csdnimg.cn/20190305225553515.png)

# 二、绘制文本
fillText(text,x,y,maxWidth)，maxWidth可省略，当省去时文本宽度自动设为整个文本的宽度。

文字粗体效果：font-weight 的值可以是 normal(正常)、bold(粗体)、bolder(更粗)、lighter(更细)，或者数字设置        

```js
context.beginPath();        
context.font = 'normal 30px Arial';        
context.fillText("Hello world",50,50);
```
文字斜体效果：italic 或者 oblique        
```js
context.beginPath();        
context.font = 'italic 30px Arial';        
context.fillText("Hello world (italic)",50,50);     
   
context.font = 'oblique 30px Arial';        
context.fillText("Hello world (oblique)",50,90);
```
![在这里插入图片描述](https://img-blog.csdnimg.cn/20190305225905322.png)
## 文字的对齐方式
textAlign：水平方向，center、start、end、left、right
textBaseline：竖直方向，alphabetic、bottom、hanging、ideographic、middle、top

```js
ctx.beginPath();
ctx.textAlign='start';  //start与left相同，表示文字从左侧开始对齐
ctx.font='30px Arial';
ctx.fillText("Hello start",160,50);

ctx.beginPath();
ctx.textAlign='end';    //end与right相同，表示文字从右侧开始对齐
ctx.font='30px Arial';
ctx.fillText("Hello end",160,100);

ctx.beginPath();
ctx.textAlign='left';
ctx.font='30px Arial';
ctx.fillText("Hello left",160,150);

ctx.beginPath();
ctx.textAlign='center';
ctx.font='30px Arial';
ctx.fillText("Hello center",160,200);

ctx.beginPath();
ctx.textAlign='right';
ctx.font='30px Arial';
ctx.fillText("Hello right",160,250);
```
![在这里插入图片描述](https://img-blog.csdnimg.cn/20190305230240130.png)

```js
ctx.textBaseline='alphabetic';
ctx.font='30px Arial';
ctx.fillText('alphabetic',50,50);
ctx.moveTo(0,50);
ctx.lineTo(250,50);
ctx.stroke();

ctx.textBaseline='bottom';
ctx.font='30px Arial';
ctx.fillText('bottom',50,100);
ctx.moveTo(0,100);
ctx.lineTo(250,100);
ctx.stroke();

ctx.textBaseline='hanging';
ctx.font='30px Arial';ctx.fillText('hanging',50,150);
ctx.moveTo(0,150);ctx.lineTo(250,150);
ctx.stroke();

ctx.textBaseline='ideographic';
ctx.font='30px Arial';
ctx.fillText('ideographic',50,200);
ctx.moveTo(0,200);
ctx.lineTo(250,200);
ctx.stroke();

ctx.textBaseline='middle';
ctx.font='30px Arial';
ctx.fillText('middle',50,250);
ctx.moveTo(0,250);
ctx.lineTo(250,250);
ctx.stroke();

ctx.textBaseline='top';
ctx.font='30px Arial';
ctx.fillText('top',50,300);
ctx.moveTo(0,300);
ctx.lineTo(250,300);
ctx.stroke();
```
![在这里插入图片描述](https://img-blog.csdnimg.cn/20190305230714247.png)