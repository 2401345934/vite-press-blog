---
createTime: 2022/10/22
tag: 'Vue源码'
---
# 整体设计

## Vue3 相比于 Vue2 做了哪些优化

### 源码结构上面的优化  采用了  monorepo 和 typscript

* vue2 的源码是托管 src 目录 下  根据功能才分了  compiler  core  platforms  server  sfc  shared
* vue3 的源码 整体通过 monorepo 维护 不同的模块拆分到 packages 目录下 拆分到颗粒度更细 指责划分更明确 依赖关系也更明显 便于 开发人员 阅读和维护 提高了可维护性
* vue2 是用的  flow 进行 类型检查的  flow  在复杂场景下的支持不好
* vue3 是用的 typscript 重构的

### 源码体积的优化

* 移除一些不常用的 API filter inline-template delete  set 等
* 引入tree-shaking，可以将无用模块“剪辑”, 仅打包需要的，使打包的整体体积变小了
  * tree-shaking 的原理也很简单 依赖 es2015 模块语法的静态结构  import  export 通过编译阶段的静态分析 找到没有 导入的模块 打上标记  在压缩阶段删除 未使用的模块
  * 这样 vue3的体积是根据 项目中使用到的功能来变化的

### 数据劫持的优化

* 直接 Proxy 替换 Object.defineProperty
  * 缺点：  兼容性更低
* vue2 使用的 Object.defineProperty 需要递归遍历 对象来达到劫持的深层次变化监听
* vue3 使用 proxy 实现了 增加删除都可以监听到  但是也无法深层次的监听对象的变化 但是是在 proxy 处理器的 getter 中递归响应   好处是： 真正访问到的内部对象才会变成响应式   vue2 是 无脑递归

### 编译优化

* vue2 的更新 dom  颗粒度是到组件的   虽然保证了更新组件的最小化 但是单个组件内部 依然需要遍历整个 vnode
* vue3 通过 编译阶段 对静态模版的分析 编译生成了  Block Tree  
  * Block Tree 是将模版基于 动态节点 指令切割的嵌套区块 每个区块内部的节点结构是固定的 每个区块用一个 Array 来追踪自身包含的 动态节点
* vue3 将性能优化到 以 动态节点数量 相关  很大的性能突破

### 语法 API 优化

* Compostion  Api
  * 更好的逻辑代码拆分  代码不分散
  * 复用优势更大
* Vue2 options  
  * 代码过于分散
  * 多个 mixins 变量命名容易冲突

### 引入 RFC

* 保证每一个 fearure-request 都是经过团队讨论才会进行开发的
* 提升了 稳定性 少走弯路

### diff算法优化

* 新增了静态标记 如果被标记过的 就不会在重新对比
* vue2 是全量对比

### 静态提升

* 会把静态节点进行局部作用域的提升  再次更新的时候不会循环 会直接取声明的
* vue2 是 无论是否更新 都会重新创建 dom节点然后渲染
 cacheHandles 事件监听缓存
* cacheHandlers 是Vue3中提供的事件缓存对象，当 cacheHandlers 开启，会自动生成一个内联函数，同时生成一个静态节点。当事件再次触发时，只需从缓存中调用即可，无需再次更新
* vue2.x中，绑定事件每次触发都要重新生成全新的function去更新，

### SSR优化

* 当存在大量静态内容时，这些内容会被当作纯字符串推进一个 buffer 里面，即使存在动态的绑定，会通过模版插值潜入进去。这样会比通过虚拟 dmo 来渲染的快上很多。
* 当静态内容大到一个量级的时候，会用_createStaticVNode 方法在客户端去生成一个 static node，这些静态 node，会被直接 innerHtml，就不需要再创建对象，然后根据对象渲染。
支持多根节点组件

## vue3 源码编译过程

* vue3 的源码是通过 monorepo 的方式维护的  根据功能不同的模块拆分到 packages 目录下的不同子目录中
* 源码通过编译 会构建出不同版本的 Vue.js 它们的应用场景各不相同
  * 有的支持 cdn 直接导入
  * 有的需要配合打包工具使用
  * 有的用于服务端的渲染
* 在源码编译构建过程中 会先收集编译目标 然后执行 并行编译  最终通过 rollup 工具完成单个包的编译
* 在运行 rollup 编译单个包的时候 会从每个包的 package.json 中读取相关编译配置 最终编译生成不同的目标文件

## vue3 源码结构

### compiler-core

* 与平台无关的编译器核心代码实现
* 包含编译器  基础编译流程
* 解析模版 生成 ast
* ast 节点的转换
* 根据 ast 生成代码
* 与平台无关的转换插件

### compiler-dom

* 在浏览器端编译时 使用 compiler-dom 提供的编译器
* 专门针对浏览器的转换插件

### compiler-ssr

* 在服务端编译时 所使用的 渲染转换插件

### compiler-sfc

* 处理 .vue 单文件组件 解析 vue 文件  
* template style script 解析都是这里实现的

### runtime-core

* 虚拟 DOM 渲染器
* 组件实现
* 全局的 js api

### runtime-dom

* 对原生 dom api   属性 样式 事件等的管理

### runtime-test

* 测试 runtime-core 用于内部测试

### reactivity

* 响应式系统
* runtime-core 包的依赖
* 可以独立使用

### template-explorer

* 调试模版编译输出的工具
* 在源码目录中 yarn dev-compiler

### sfc-playground

* 调试 sfc 的工具

### shared

* 多个包共享的实用工具库
size-check
* 检测 tree-shaking 后的代码体积

### server-renderer

* 服务端渲染的核心实现

### vue

* 面向用户的完整构建

### vue-compat

* 构建版本 可配置兼容 vue2 版本
