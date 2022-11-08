---
createTime: 2022/11/09
tag: '面试题,Vue'
---
# 三十七个常见Vue面试题

一、谈谈你对MVVM的理解？
--------------

映射关系简化，隐藏controller MVVM在MVC的基础上，把控制层隐藏掉了。

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/dfb15f75c96540768cc1a1a6e5be3870~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.image?)

Vue不是一个MVVM框架，它是一个视图层框架。

ViewModal是一个桥梁，将数据和视图进行关联。

二、谈谈你对Vue中响应式数据的理解？
-------------------

数组和对象类型的值变化的时候，通过`defineReactive`方法，借助了`defineProperty`，将所有的属性添加了`getter`和`setter`。用户在取值和设置的时候，可以进行一些操作。

缺陷：只能监控最外层的属性，如果是多层的，就要进行全量递归。

get里面会做依赖搜集（dep\[watcher, watcher\]） set里面会做数据更新（notify，通知watcher更新）

三、Vue中如何检测数组的变化？
----------------

vue中对数组没有进行defineProperty，而是重写了数组的7个方法。 分别是：

* push
* shift
* pop
* splice
* unshift
* sort
* reverse

因为这些方法都会改变数组本身。

数组里的索引和长度是无法被监控的。

四、Vue中如何进行依赖收集的？
----------------

![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/6f1dafe073304e1ca756cb61845629c2~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.image?)

Vue初始化的时候，挂载之后会进行编译。生成renderFunction。

当取值的时候，就会搜集watcher，放到dep里面。

当用户更改值的时候，就会通知watcher，去更新视图。

五、如何理解Vue中的模板编译原理？
------------------

这个问题的核心是如何将template转换成render函数。

1. 将template模块转换成ast语法书 - parserHTML
2. 对静态语法做标记（某些节点不改变）
3. 重新生成代码 - codeGen,使用with语法包裹字符串

六、Vue生命周期钩子是如何实现的?
------------------

Vue的生命周期钩子是回调函数，当创建组件实例的过程中会调用相应的钩子方法。 内部会对钩子进行处理，将钩子函数维护成数组的形式。

七、Vue组件生命周期有哪些？
---------------

* beforeCreate 在实例初始化之后，数据观测observer 和event、watcher事件配置之前被调用
* created 实例已经创建完成，在这一步，以下配置被完成
  * 数据观测
  * 属性和方法的运算
  * watch/event时间回调
  * $el尚未生成
* beforeMount 在挂载之前被调用，render尚未被调用
* mounted el被新创建的vm.$el替换，并挂载到实例上去之后调用
* beforeUpdate 数据更新时，被调用，发生在虚拟Dom重新渲染和打补丁之前
* update 由于数据更改导致的虚拟Dom重新渲染和打补丁，在这之后调用
* beforeDestroy 实例销毁之前调用
* destroyed 实例销毁之后调用，调用后Vue实例的所有东西都会被解绑，所有的事件监听会被移除，子实例被销毁，该钩子在服务端渲染期间不被调用
* keep-alive（activated & deactivated）

八、vue.mixin的使用场景和原理?
--------------------

Vue的mixin的作用就是抽离公共的业务逻辑，原理类似对象的继承，当组件初始化的时候，会调用mergeOptions方法进行合并，采用策略模式针对不同的属性进行合并。 如果混入的数据和本身组件的数据有冲突，采用本身的数据为准。

缺点：命名冲突、数据来源不清晰

九、Vue的组件data为什么必须是一个函数?
-----------------------

`new Vue`是一个单例模式，不会有任何的合并操作，所以根实例不必校验data一定是一个函数。 组件的data必须是一个函数，是为了防止两个组件的数据产生污染。 如果都是对象的话，会在合并的时候，指向同一个地址。 而如果是函数的时候，合并的时候调用，会产生两个空间。

十、请说明nextTick的原理
-----------------

nextTick是一个微任务。

* nextTick中的回调是在下次Dom更新循环结束之后执行的延迟回调
* 可以用于获取更新后的Dom
* Vue中的数据更新是异步的，使用nextTick可以保证用户定义的逻辑在更新之后执行

十一、computed和watch的区别是什么？
------------------------

* computed和watch都基于watcher来实现的。
* computed的属性是具备缓存的，依赖的值不发生变化，对其取值时计算属性方法不会重复执行
* watch是监控值的变化，当值发生改变的时候，会调用回调函数

十二、Vue.set方法是如何实现的？
-------------------

* vue给对象和数组本身都增加了dep属性
* 当给对象新增不存在的属性的时候，就会触发对象依赖的watcher去更新
* 当修改数组索引的时候，就调用数组本身的splice方法去更新数组

十三、Vue为什么要用虚拟Dom
----------------

* 虚拟dom就是用js对象来描述真实Dom，是对真实Dom的抽象
* 由于直接操作Dom性能低，但是js层的操作效率高，可以将Dom操作转化成对象操作。最终通过diff算法比对差异进行更新Dom
* 虚拟Dom不依赖真实平台环境，可以实现跨平台

十四、Vue的diff算法原理是什么？
-------------------

Vue的diff算法是平级比较，不考虑跨级比较的情况。内部采用深度递归的方式+双指针方式比较

* 先比较两个节点是不是相同节点
* 相同节点比较属性，复用老节点
* 先比较儿子节点，考虑老节点和新节点儿子的情况
* 优化比较：头头、尾尾、头尾、尾头
* 比对查找，进行复用

十五、既然vue通过数据劫持可以精准的探测数据变化，为什么还要进行diff检测差异？
------------------------------------------

* 响应式数据变化，Vue确实可以在数据变化的时候，响应式系统可以立刻得知。但是如何每个属性都添加watcher的话，性能会非常的差。
* 粒度过细，会导致更新不精准

所以采用watcher + Diff算法来检测差异。

十六、请说明key的作用和原理
---------------

* Vue在patch过程中，通过key可以判断两个虚拟节点是否是相同节点。
* 没有key会导致更新的时候出问题
* 尽量不要采用索引作为key

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/1cd5917790ac4d048c86ffe9983ab707~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.image?)

十七、谈谈对组件的理解
-----------

* 组件化开发能大幅提高应用开发效率、测试性、复用性
* 常用的组件化技术：属性、自定义事件、插槽
* 降低更新范围，值重新渲染变化的组件
* 高内聚、低耦合、单向数据流

十八、请描述组件的渲染流程
-------------

产生组件虚拟节点 -> 创建组件的真实节点 -> 插入到页面

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b060c176af4d41a4abd60dc7edced2d8~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.image?)

十九、请描述组件的更新流程
-------------

属性更新会触发patchVnode方法，组件的虚拟节点会调用prepatch钩子，然后更新属性，更新组件。

![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/c5a19f7f110f441faa0aff053e3ed06a~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.image?)

二十、异步组件原理
---------

先渲染异步占位符节点 -> 组件加载完毕后调用forceUpdate强制更新。

二十一、函数组件的优势和原理
--------------

* 函数式组件的特性：无状态、无生命周期、无this。因此性能会高一点。

正常的一个组件是一个类继承了Vue。

函数式组件，就是一个普通的函数。

二十二、组件的传值方式有哪些？
---------------

1. props和emit:父组件向子组件传递数据，通过prop传递。子组件传递数据给父组件是通过emit: 父组件向子组件传递数据，通过prop传递。子组件传递数据给父组件是通过emit:父组件向子组件传递数据，通过prop传递。子组件传递数据给父组件是通过emit事件
2. parent,parent,parent,children获取当前组件的父组件和当前组件的子组件
3. attrs和attrs和attrs和listeners 。
4. 父组件通过provide提供，子组件通过inject注入变量
5. $ref获取实例
6. eventBus平级组件数据传递
7. Vuex

二十三、$attrs是为了解决什么问题出现的？
-----------------------

主要作用是为了实现批量传递数据。

provide/inject更适合应用在插件中，主要实现跨级数据传递。

二十四、v-for和v-if哪个优先级更高？
----------------------

首先，v-for和v-if 不能在同一个标签中使用。

先处理v-for，再处理v-if。

如果同时遇到的时候，应该考虑先用计算属性处理数据，在进行v-for，可以减少循环次数。

二十五、v-mode是如何实现的？
-----------------

在组件上用的v-model，是model和callback

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/7d87fe51a5d24ad396f428175b14fa50~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.image?)

在普通元素上用v-model，会生成指令，还可能因为不同的元素：

* 生成value和input
* 生成change和radio
* 生成change和checked

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/9457f347c54944e7b6819e21dc8d3896~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.image?)

指令在什么时候会调用？

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/4aa81c3d92ed454d99153dc9ca6ec019~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.image?)

源码：

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ca5f7c5f41ea4550b8f7604a3d8d4f4e~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.image?)

二十六、Vue的普通Slot以及作用域Slot的区别
--------------------------

### 普通插槽

普通插槽是渲染后做替换的工作。父组件渲染完毕后，替换子组件的内容。

![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/d5d2edbc5b6145349d6ccecd01cb7a82~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.image?)

在模板编译的时候，处理组件中的子节点和slot标签 ![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/508c06da3cea4e2cbb2271a565bbcedc~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.image?)

在创建元素的时候，用\_t()方法方法来替换\_v()的内容。

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/8acfee0c25a34b23a991fe9b85164394~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.image?)

### 作用域插槽

作用域插槽可以拿到子组件里面的属性。在子组件中传入属性然后渲染。

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/2515ece3689249efbd205d2fd6dda57c~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.image?)

![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ef974fde9b1841d4bf5f2624d5951bb3~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.image?)

作用域插槽的编译结果：

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/0a94ce2443aa4eb1809a1de30e52d22b~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.image?)

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/af45b0d4954642bea25c74cc1d1ce8fe~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.image?)

二十八、Vue.use是干什么的？
-----------------

`Vue.use`是用来使用插件的。我们可以在插件中扩展全局组件、指令、原型方法等。 会调用`install`方法将Vue的构建函数默认传入，在插件中可以使用vue，无需依赖vue库

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/031b2b04e9224332b8c8413a4f27f243~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.image?)

二十九、组件写name有啥好处？
----------------

* 增加name属性，会在components属性中增加组件本身，实现组件的递归调用。
* 可以表示组件的具体名称，方便调试和查找对应的组件。

三十、vue的修饰符有哪些？
--------------

* .stop
* .prevent
* .capture
* .self
* .once
* .passive
* .right
* .center
* .middle
* .alt

三十一、如何理解自定义指令？
--------------

* 在生成ast语法树时，遇到指令会给当前元素添加directives属性
* 通过genDirectives生成指令代码
* 在patch前，将指令的钩子提取到cbs中，在patch过程中调用对应的钩子
* 当执行cbs对应的钩子时，调用对应指令定义方法

三十二、keep-alive平时在哪里使用？原理是什么？
----------------------------

* 使用keep-alive包裹动态组件时，会对组件进行缓存，避免组件重新创建

使用有两个场景，一个是动态组件，一个是router-view

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/1f7bef9d47854a28a8a017be9c243672~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.image?)

这里创建了一个白名单和一个黑名单。表明哪些需要需要做缓存，哪些不需要做缓存。以及最大的缓存个数。

![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/371734825c204f7fb6efbd8b4c764357~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.image?)

缓存的是组件的实例，用key和value对象保存。

加载的时候，监控include和exclude。

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/c42c3bece8594c2c80552394128721d3~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.image?)

如果不需要缓存，直接返回虚拟节点。

如果需要缓存，就用组件的id和标签名，生成一个key，把当前vnode的instance作为value，存成一个对象。这就是缓存列表

如果设置了最大的缓存数，就删除第0个缓存。新增最新的缓存。

并且给组件添加一个keepAlive变量为true，当组件初始化的时候，不再初始化。

三十三、vue-router有几种钩子函数？执行流程如何？
-----------------------------

钩子函数有三种：

* 全局守卫
* 路由守卫
* 组件守卫

![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/32a1543889ee492b946868f4adeb5365~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.image?)

三十四、vuerouter的两种模式的区别
---------------------

* vue-router中有三种模式，分别是hash、history、abstract
* abstract在不支持浏览器的API换景使用
* hash模式兼容性好，但是不美观，不利于SEO
* history美观，historyAPI+popState，但是刷新会出现404

三十五、谈谈Vue的性能优化有哪些？
------------------

* 数据层级不要过深，合理的设置响应式数据
* 使用数据时，缓存值的结果，不频繁取值
* 合理设置key
* v-show(频繁切换性能高)和v-if的合理使用
* 控制组件的粒度 -> Vue采用组件级别更新
* 采用函数式组件 -> 函数式组价开销低
* 采用异步组件 -> 借助webpack的分包策略
* 使用keep-alive来缓存组件
* 虚拟滚动、时间分片等策略
* 打包优化

三十六、谈谈你对Vuex的理解？
----------------

Vuex是专门为vue提供的全局状态管理系统，用于多个组件中的数据共享、数据缓存。

问题：无法持久化。

![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/34588bd2f1a446e394cd360acb806fd1~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.image?)

* mutation 主要修改状态，同步执行
* action 执行业务代码，方便复用，逻辑可以为异步。不能直接修改状态。

三十七、vue中使用了哪些设计模式？
------------------

* 单例模式：new多次，只有一个实例

![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/2eda03992e4a40abab75781d03102411~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.image?)

* 工场模式：传入参数就可以创建实例（虚拟节点的创建）
* 发布订阅模式：eventBus
* 观察者模式：watch和dep
* 代理模式：\_data属性、proxy、防抖、节流
* 中介者模式：vuex
* 策略模式
* 外观模式
