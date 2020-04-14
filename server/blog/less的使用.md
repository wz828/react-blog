---
title: less的使用
date: 2019-04-04 10:22:47
tags:
    - less
    - css
---


### **总结：less=变量+混合+函数**

## 一. less的使用
参考：[用法 | Less.js](http://www.runoob.com/manual/lessguide/usage/)
### 1. 客户端使用

从 http://lesscss.org 下载 less.js 文件
先引入 styles.less 再引入 less 源文件
```html
<link rel="stylesheet/less" type="text/css" href="styles.less">
<!-- rel属性要设置为 stylesheet/less -->
```
```html
<script src="//cdnjs.cloudflare.com/ajax/libs/less.js/3.9.0/less.min.js" ></script>
```
### 2. 服务器端使用
  node 环境中对 less 源文件进行编译。
  
安装：npm i less -g， 或者 npm i less --save-dev
转换：lessc test.less test.css，或者 lessc less/test.less css/test.css

@import "styles.less"，引入less文件，.less后缀名可省略

### 3. 其他方法编译
Webstorm编译
Koala编译
## 二. 变量
适用于定义主题，将背景颜色、字体颜色、边框属性等常规样式进行统一定义。
```css
@mainColor: #ffbfe8;
div {
    background-color: @mainColor;
}
```
less的变量和其他编程语言一样，可以实现值的复用，同样它也有生命周期，就是有作用域（就是局部变量还是全局变量的概念）。

查找变量的顺序是先在局部定义中找，如果找不到，则查找上级定义，直至全局。
```css
 @width : 20px; 
.parents { 
   @width : 30px; 
   .children{ 
       width : @width;   /*此处应该取最近定义的变量 width 的值 30px*/
              } 
 } 
 .uncle { 
     width : @width;    /*此处应该取最上面定义的变量 width 的值 20px*/
 }
```

## 三. 混入（Mixins）
1. 多重继承，嵌套
2. 可以传入参数，可以定义默认值
3. 可以使用arguments表示所有变量
```css
.radius(@radius:5px) {   /*定义默认值5px*/
	-moz-border-radius: @radius; 
	-webkit-border-radius: @radius; 
	border-radius: @radius; 
} 
.boxShadow(@x:0,@y:0,@blur:1px,@color:#000){ 
 	box-shadow: @arguments;   /*@arguments 表示所有的变量*/
 } 
 #header { 
	.radius; 
	.boxShadow(2px,2px,3px,#f36); 
 } 
 #footer { 
	.radius(10px); /*传入参数10px*/
 }

```
## 四. 嵌套
从外到内的选择器嵌套定义
```css
#home{ 
   width : 600px; 
   enter{ 
        width : 90%; 
        #right{ 
  		  width : 40%; 
        } 
    } 
 }
```

伪类/伪元素选择器用 &
```css
a { 
	color: red; 
	&:hover {  /* 有&时解析的是同一个元素或此元素的伪类，没有&解析是后代元素*/
		color: black; 
	} 
}
```
## 五. 模式匹配
即如果满足条件，则执行。
```css
.triangle(top; @border_width: 5px; @border_color: #000;) {
  border: @border_width solid transparent;
  border-bottom-color: @border_color;
}
.triangle(bottom; @border_width: 5px; @border_color: #000;) {
  border: @border_width solid transparent;
  border-top-color: @border_color;
}
.triangle(left; @border_width: 5px; @border_color: #000;) {
  border: @border_width solid transparent;
  border-right-color: @border_color;
}
.triangle(right; @border_width: 5px; @border_color: #000;) {
  border: @border_width solid transparent;
  border-left-color: @border_color;
}
/*默认执行(无论是否匹配，都会执行)**/
.triangle(@_; @border_width: 5px; @border_color: #000;) {
  width:   0px;
  height:  0px;
  overflow: hidden;
}
.box {
  .triangle(top);
}
```
## 六. 命名空间
避免团队协同开发重名问题

```css
#mynamespace { 
	.home {...} 
	.user {...} 
}
```
使用： #mynamespace > .user
## 七. 引导
less 通过导引混合而非if/else语句来实现条件判断。
1. when关键字用以定义一个导引序列(此例只有一个导引)。
```css
.mixin (@a) when (lightness(@a) >= 50%) {  /*lightness内置函数：在HSL颜色中提取亮度通道。*/
  background-color: black;
}
.mixin (@a) when (lightness(@a) < 50%) {
  background-color: white;
}
.mixin (@a) {
  color: @a;
}
.class1 { .mixin(#ddd) }
.class2 { .mixin(#555) }
```
得到：
```css
.class1 {
  background-color: black;
  color: #ddd;
}
.class2 {
  background-color: white;
  color: #555;
}
```
2. 导引中可用的全部比较运算有： > >= = =< <。此外，关键字true只表示布尔真值，下面两个混合是相同的：

```css
.truth (@a) when (@a) { ... }
.truth (@a) when (@a = true) { ... }
```
3. 除去关键字true以外的值都被视示布尔假：

```css
.class {
  .truth(40); // Will not match any of the above definitions.
}
```
4. 导引序列使用逗号‘,’—分割，当且仅当所有条件都符合时，才会被视为匹配成功。
```css
.mixin (@a) when (@a > 10), (@a < -10) { ... }
```
5. 导引可以无参数，也可以对参数进行比较运算：

```css
@media: mobile;

.mixin (@a) when (@media = mobile) { ... }
.mixin (@a) when (@media = desktop) { ... }

.max (@a, @b) when (@a > @b) { width: @a }
.max (@a, @b) when (@a < @b) { width: @b }
```
6. 如果想基于值的类型进行匹配，我们就可以使用类型函数：

```css
.mixin (@a, @b: 0) when (isnumber(@b)) { ... }
.mixin (@a, @b: black) when (iscolor(@b)) { ... }
```
参考：[类型函数 | Less 入门文档](http://www.runoob.com/manual/lessguide/functions/#type-functions)

7. 使用and关键字实现与条件，使用not关键字实现或条件
```css
.mixin (@a) when (isnumber(@a)) and (@a > 0) { ... }
.mixin (@b) when not (@b > 0) { ... }
```
## 八. 运算
Less 支持加减乘除运算。
```css
 @init: #111111; 
 @transition: @init*2; 
 .switchColor { 
	color: @transition; 
 }
```
得到：
```css
 .switchColor { 
	color: #222222; 
 }
```
## 九. 函数
[Less 内置函数官方文档](https://less.bootcss.com/functions/)
1. color函数

```css
lighten(@color, 10%);     // return a color which is 10% *lighter* than @color
darken(@color, 10%);      // return a color which is 10% *darker* than @color

saturate(@color, 10%);    // return a color 10% *more* saturated than @color
desaturate(@color, 10%);  // return a color 10% *less* saturated than @color

fadein(@color, 10%);      // return a color 10% *less* transparent than @color
fadeout(@color, 10%);     // return a color 10% *more* transparent than @color
fade(@color, 50%);        // return @color with 50% transparency

spin(@color, 10);         // return a color with a 10 degree larger in hue than @color
spin(@color, -10);        // return a color with a 10 degree smaller hue than @color

mix(@color1, @color2);    // return a mix of @color1 and @color2
```
使用：
```css
@base: #f04615;
.class {
  color: saturate(@base, 5%);
  background-color: lighten(spin(@base, 8), 25%);
}
```
可以提取颜色信息：
```css
hue(@color);        // returns the `hue` channel of @color
saturation(@color); // returns the `saturation` channel of @color
lightness(@color);  // returns the 'lightness' channel of @color
```
在一种颜色的通道上创建另一种颜色：
```css
@new: hsl(hue(@old), 45%, 90%);
```
@new 将会保持 @old的 色调, 但是具有不同的饱和度和亮度.

2. math函数

```css
round(1.67); // returns `2`
ceil(2.4);   // returns `3`
floor(2.6);  // returns `2`
percentage(0.5); // returns `50%`
```
参考：[数字函数 | Less 入门文档](http://www.runoob.com/manual/lessguide/functions/#math-functions)
## 十. 字符串插值
变量可以用类似ruby和php的方式嵌入到字符串中，像@{name}这样的结构：

```css
@base-url: "http://assets.fnord.com";
background-image: url("@{base-url}/images/bg.png");
```
## 十一. 注释
LESS 中单行注释 (// 单行注释 ) 是不能显示在编译后的 CSS 中，所以如果你的注释是针对样式说明的请使用多行注释。
## 十二. 避免编译
有时候需要输出一些不正确的css语法或者使用一些less不认识的专有语法。
在字符串前加上 ~

```css
.test {
	width: ~'calc(300px-30px)';
}
```

***
## 关于less中对“/”的编译处理

在less中，如果我们要将其编译为CSS时，less会自动根据 +、-、*、/ 等运算符进行尺寸大小的计算
于是，如果在less中绘制椭圆，border-radius: 100px / 50px 就会变编译成 border-radius: 2px，造成异常。

**解决方案1：**
改成以下：
```css
border-radius: ~'100px/50px';
border-radius: 50%;
```
**解决方案2：**
使用e()输出 / 
```css
border-radius: 100px e('/') 50px;
```


***

**参考链接：**
[Less的@import指令 - 歪脖先生 - 博客园](https://www.cnblogs.com/waibo/p/7908229.html)

[LESS 原理及使用方式 - 北极鱼 - CSDN博客](https://blog.csdn.net/sinat_27169251/article/details/49721751 )

[less 使用指南 - 李鴻耀 - CSDN博客](https://blog.csdn.net/hierarch_lee/article/details/79003787)