---
title: vue基础语法
date: 2019-03-05 11:33:26
tags:
    - vue
---

v-on（@） 绑定事件
v-html、v-text 渲染数据
v-if、v-show 控制显示
v-bind（：）
v-model
v-for 循环渲染
***
## 1. 数据绑定
```html
<div id="app">
    <p>{{ 2*6 }}</p>
    <h1>{{ message }}</h1>
    <h2>{{ isTrue ? 'YES':'NO'}}</h2>
</div>
<script type="text/javascript">
    var app = new Vue({
        el:'#app',
        data:{
            message:'hello',
            isTrue: false
        }
    })
</script>
```
![在这里插入图片描述](https://img-blog.csdnimg.cn/20190305231137531.png)

```html
<div id="root"></div>
<script>
    new Vue({
        el:'#root',
        template:'<h1>hello {{msg}}</h1>',
        data:{
            msg:'hello'
        }
    })
</script>
```
***
## 2. v-text 和 v-html 的差别

```html
<div id="root">
    <h1 v-text="number"></h1>  //v-text 和 v-html 显示效果一样
</div>
<script>
    new Vue({
        el: "#root",
        data: {
            msg:"world",
            number:123
        }
    })
</script>
```
**v-text：会进行转义**

```html
<div id="root">
    <h1 v-text="content"></h1>
</div>
<script>
    new Vue({
        el: "#root",
        data: {
            content: "<h1>hello</h1>"

        }
    })
</script>
```
![在这里插入图片描述](https://img-blog.csdnimg.cn/20190305231455192.png)
**v-html：不进行转义**

```html
<div id="root">
    <h1 v-html="content"></h1>
</div>
<script>
    new Vue({
        el: "#root",
        data: {
            content: "<h1>hello</h1>"

        }
    })
</script>
```
![在这里插入图片描述](https://img-blog.csdnimg.cn/2019030523154789.png)
***
## 3. 事件绑定 v-on（@）

```html
<div id="root">
    <input v-model="content"/>
    <div>{{content}}</div>
</div>
<script>
    new Vue({
        el: "#root",
        data: {
            content: "this is content"
        
        },
    })
</script>
```
***
## 4. 属性绑定 v-bind（：号）

```html
<div id="root">
   <div v-bind:title="'hello '+title">hello world</div>   //title指变量title，v-bind可简写为 ：号
</div>
<script>
   new Vue({
       el: "#root",
       data: {
           title: "this is hello world"
       
       },
   })
</script>
```
![在这里插入图片描述](https://img-blog.csdnimg.cn/20190305231819317.png)
***
## 5. 数据双向绑定 v-model

```html
<div id="root">
    <input v-model="content"/>
    <div>{{content}}</div>
</div>
<script>
    new Vue({
        el: "#root",
        data: {
            content: "this is content"
        
        },
    })
</script>
```
![在这里插入图片描述](https://img-blog.csdnimg.cn/20190305231904148.png)
***
## 6. 计算属性

```html
<div id="root">
    姓：<input v-model="firstName"/>
    名：<input v-model="lastName"/>
    <div>{{fullName}}</div>
</div>
<script>
    new Vue({
        el: "#root",
        data: {
            firstName: '',
            lastName: ''
        },
        computed: {
            fullName: function() {
                return this.firstName + ' ' + this.lastName
            }
        }        //好处，当firstName和lastName没有改变的时候，fullName不会重新计算使用上一次的缓存
    })
</script>
```
***
## 7. 简单的侦听器

```html
<div id="root">
    姓：<input v-model="firstName"/>
    名：<input v-model="lastName"/>
    <div>{{fullName}}</div>
    <div>{{count}}</div>
</div>
<script>
    new Vue({
        el: "#root",
        data: {
            firstName: '',
            lastName: '',
            count: 0
        },
        computed: {
            fullName: function() {
                return this.firstName + ' ' + this.lastName
            }
        },
        watch: {
            fullName: function() {
                this.count ++
            }
        }   //缺点：侦听的是操作次数，删除也被算进去了
    })
</script>
```
***
## 8. v-show / v-if 显示和隐藏

```html
<div id="root">
    <div v-if="show">hello world</div>    //v-show="show"
    <button @click="handleClick">toggle</button>
</div>
<script>
    new Vue({
        el: "#root",
        data: {
            show: true
        },
        methods: {
            handleClick: function() {
                this.show = !this.show;
            }
        }
    })
</script>
```
![在这里插入图片描述](https://img-blog.csdnimg.cn/20190305232729335.gif)
**当变量值是false时**：
v-if：直接把元素从DOM移除。频率不大使用v-if
v-show：元素隐藏不移除，给元素添加display:none。频繁使用选择v-show
***
## 9. v-for 循环展示

```html
<div id="root">
   <ul>
     <li v-for="item of list">{{item}}</li>
     <li v-for="(item,index) of list" :key="index">{{item}}</li>  
     //加key值提升渲染效率，每个key值不能相同，如果频繁操作数值index不适合使用
   </ul>
</div>
<script>
    new Vue({
        el: "#root",
        data: {
            list: [1,2,3]
        }
    })
</script>
```
![在这里插入图片描述](https://img-blog.csdnimg.cn/2019030523230952.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzI1MTc0NzAx,size_16,color_FFFFFF,t_70)
渲染结果，第一行apple，第二行banana
![在这里插入图片描述](https://img-blog.csdnimg.cn/20190305232323550.png)
***
## 10. todolist功能开发

```html
<div id="root">
    <div>
        <input v-model="inputValue"/>
        <button @click="handleSubmit">提交</button>
    </div>
    <ul>
        <li v-for="(item,index) of list" :key="index">
            {{item}}
        </li>
    </ul>

</div>
<script>
    new Vue({
        el: "#root",
        data: {
            inputValue: '',
            list: []
        },
        methods: {
            handleSubmit: function() {
                this.list.push(this.inputValue)
                this.inputValue =''
            }
        }
    })
</script>
```
![在这里插入图片描述](https://img-blog.csdnimg.cn/20190305232657177.gif)
***
## 11. todolist组件拆分
Vue.component()：创建组件的方式

**全局组件：**

```html
<div id="root">
    <div>
        <input v-model="inputValue"/>
        <button @click="handleSubmit">提交</button>
    </div>
    <ul>
        <todo-item v-for="(item,index) of list" :key="index" :content="item"></todo-item>
    </ul>

</div>
<script>
    Vue.component('todo-item', {
        props: ['content'],
        template: '<li>{{content}}</li>'
    })   //全局组件
    new Vue({
        el: "#root",
        data: {
            inputValue: '',
            list: []
        },
        methods: {
            handleSubmit: function() {
                this.list.push(this.inputValue)
                this.inputValue =''
            }
        }
    })
</script>
```
**局部组件：**
```html
var TodoItem = {
      template: '<li>item</li>'
   }  //局部组件
new Vue({
      el: "#root",
      components: {
            'todo-item': TodoItem   //局部组件使用须注册
       },
```
***
**每一个组件都是一个vue实例
vue是由一个个实例构成**
组件里可以加模板方法事件

如果实例里没有模板，它会把挂载点下面所有的dom标签作为模板
![在这里插入图片描述](https://img-blog.csdnimg.cn/20190305233020511.png)
***
## 12. todolist删除功能
```html
<div id="root">
   <div>
       <input v-model="inputValue"/>
       <button @click="handleSubmit">提交</button>
   </div>
   <ul>
       <todo-item
       v-for="(item,index) of list"
       :key="index"
       :content="item"
       :index="index"
       @delete="handleDelete"></todo-item>
   </ul>

</div>
<script>
  Vue.component('todo-item', {
       props: ['content','index'],
       template: '<li @click="handleClick">{{content}}</li>',
       methods: {
           handleClick: function() {
               this.$emit('delete',this.index)
           }
       }
   })   //全局组件
   new Vue({
       el: "#root",
       data: {
           inputValue: '',
           list: []
       },
       methods: {
           handleSubmit: function() {
               this.list.push(this.inputValue)
               this.inputValue =''
           },
           handleDelete: function(index) {
               this.list.splice(index, 1)
           }
       }
   })
</script>
```

***
vue-cli构建的项目，src目录下的main.js

```js
import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: { App },   //{ App:App}，如果键和值相同，写一个App就可以了
  template: '<App/>'
})
```
