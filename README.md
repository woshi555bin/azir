# 需求功能

- 提供模板
- 主题色
- 丰富的功能模块，如图文、轮播
- 模块可以拖拽以及根据需求配置
- 支持创建多个页面的网站
- 页面可以分栏分区，有一些布局上的变化
- 网站支持手持设备

# 需求设计

- 页面
```
一个网站由一个或多个页面（Page）组成。
```
- 分栏/分区
```
页面由不同的功能区组成，比如公司介绍、成功案例、联系我们等。它们可能是纵向排列的，
也可能左右分栏排布，我们取个更恰当的名字 “区块”（Section）。
```

- 模块
```
每个区块包含一个或多个组件，这些组件组合起来达到同一个目的。例如公司介绍这个区块可以用
一段文字模块介绍公司大体情况，用一个轮播模块展示公司主打产品。这里所说的模块和我们熟悉的
“组件”（Component）划等号，是我们要实现的最小功能单元。
```
- 模板
```
模板可以有很多种定义。此处我们可以理解为一个页面的布局，类似于 QQ 空间可以选择的分栏布局。
模板定义了一个页面包含的区块数量和每个区块的横向占比。
```

- 主题色
```
风格 = 模板 + 主题色
```

### 网站的数据表示

- 一个网站包含几个页面，一个页面包含几个区块，一个区块包含几个模块。可以看出这是一个树形结构
````
{
  "id": 1,
  "name": "xxx公司"
  "type": "site",
  "children": [{
    "type": "page",
    "name": "首页",
    "children": [{
      "type": "section",
      "name": "公司简介",
      "children": [{
        "type": "paragraph"
      }, {
        "type": "carousel"
      }]
    }]
  }]
}

````
- 数据配置
````
那么模块就是树中的叶子节点，需求中要求模块可以配置，我们可以把配置分为两部分：
包含的内容（content）和设置（config）。举例来说，轮播模块中 content 存放的是几张图片的 URL，
config 可以是轮播切换的动画效果、是否开启自动播放等设置。

````

###  数据到网站
- 2步
```
1,编写每个节点的代码，每个节点接受 node 属性和 themeColor
2,遍历 JSON 树，在对应位置渲染对应的节点（即父子节点的包含关系）

```
- 单元节点例子
```
<!-- Paragraph.vue -->
<template>
  <div>
    <h1 :style="{color: themeColor}">{{node.content.title}}</h1>
    <small v-if="node.config.showSubTitle">{{node.content.subTitle}}</small>
    <p>{{node.content.detail}}</p>
  </div>
</template>

<script>
export default {
  name: 'paragraph',
  props: ['node', 'themeColor']
}
</script>

```
- 2步
````
“renderer” 的组件来递归的渲染 JSON 树。基本思路是该组件先渲染自己，然后渲染自己的后代，
每个后代也重复此渲染过程，如此渲染整棵树。
这里需要根据节点的 type 属性也就是一个 String 来获取对应的组件定义。
幸运的是 Vue.js 中已经有这样的动态组件 Component ，此组件的 is 属性接受一个 String。

```
```
<!-- render.vue -->
<tempplate>
  <component :is="node.type" :node="node" :theme="themeColor">
    <render v-for="child in node.children" :key="child.id" :node="child" :theme="themeColor" />
  </component>
</tempplate>

<script>
// 导入JSON 树中所涉及的所有节点
import Page from './Page.vue'
import Section from './Section.vue'
import Paragraph from './Paragraph.vue'

export default {
  name: 'render',
  props: ['node', 'themeColor'],
  components: {
    Page,
    Section,
    Paragraph
  }
}
</script>

```

### 编辑与保存
```
创建一个网站，用户在后台会经历选择样板站、调整色调、拖拽模块、编辑模块内容和配置、保存等操作。
值得注意的是，此处用户选择的样板站跟文章开头的模板定义有些差别。如果说模板是网站的骨架的话，
那样板站是填充了初始数据（默认色调、板块中包含的模块以及模块的默认内容）的模板。

选择模板（样板站）
该模板定义的初始树，包含默认的色调和模块

选择色调
更新 site.config.themeColor

拖拽模块到区域中
在对应的 section.children 的数组中 push 一个组件节点

在区域中排序模块
在对应的 section.children 的数组中重新设置组件节点的 index

编辑模块内容和配置
更新对应模块的 content 和 config 中的属性

保存网站
把 JSON 树存入数据库持久化

// store.js
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
const store = new Vuex.Store({
  state: {
    site: {}
  },
  mutations: {
    changeThemeColor () {},
    addModule () {},
    sortModule () {},
    removeModule () {},
    updateModule () {}
  },
  actions: {
    getSite () {},
    saveSite () {}
  }
})

```

###  拖拽功能
```
<draggable v-model="myArray" :options="{group:'people'}" @start="drag=true" @end="drag=false">
   <div v-for="element in myArray">{{element.name}}</div>
</draggable>

在我们的场景中，只需在 draggable 组件上监听 add 和 sort 事件调用 store 中对应的方法即可。
```

### 变更检测
```
保存用户的编辑，本质上是需要检测 store 中 site 这个状态的变更，Vuex 中的插件（plugin）可以针对改动做一些类如
记录日志和持久化的操作，我们可以写一个 autoSave 的插件来实现。


// store.js
const autoSave = (store) => {
  store.watch(
    state => state.site,
    (newV, oldV) => {
      store.dispatch('saveSite')
    },
    { deep: true }
  )
}

const store = new Vuex.Store({
  state: {
      site: {}
  },
  plugins: [autoSave]
})

```




