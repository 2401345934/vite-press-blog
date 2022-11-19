
import RouterType from "./types.type"

const Router: RouterType = [

  {
    text: 'html ',
    items: [
      { text: '基础', link: '/interview-questions/html/start/' },
      { text: 'meta标签知识', link: '/interview-questions/html/meta/' },
    ]
  },
  {
    text: 'css ',
    items: [
      { text: '基础', link: '/interview-questions/css/start/' },
    ]
  },
  {
    text: 'Js ',
    items: [
      { text: '跨域原理', link: '/interview-questions/js/cross-domain/' },
      { text: '浅拷贝与深拷贝', link: '/interview-questions/js/copy/' },
      { text: 'JSON-stringify', link: '/interview-questions/js/json-stringify/' },
      { text: 'URL 转码 和解码', link: '/interview-questions/js/url-encryption-to-decrypt/' },
      { text: 'for-in vs for-of', link: '/interview-questions/js/forIn-forOf/' },
      { text: '跨页面通信', link: '/interview-questions/js/page-communication/' },
      { text: '手写常用函数', link: '/interview-questions/js/my-js/' },
      { text: '手写promise', link: '/interview-questions/js/my-promise/' },
      { text: '从ES6到ES10特性', link: '/interview-questions/js/es/' },
    ]
  },
  {
    text: 'TypeScript ',
    items: [
      { text: '说说你对 TypeScript 的理解？与 JavaScript 的区别？', link: '/interview-questions/ts/ts-understand/' },
      { text: '面试题集合', link: '/interview-questions/ts/interview-questions/' },
      { text: 'tsconfig', link: '/interview-questions/ts/tsconfig/' },
      { text: 'Array 和 tuple 的区别', link: '/interview-questions/ts/array-tuple/' },
      { text: 'interface 和 type 的区别', link: '/interview-questions/ts/interface-type/' },
      { text: 'unknown 和any 的区别', link: '/interview-questions/ts/unknown-any/' },
      { text: 'type of 和 key of 的区别', link: '/interview-questions/ts/type0f-keyOf/' },
      { text: 'void  和 never  类型的 区别', link: '/interview-questions/ts/void-never/' },
    ]
  },
  {
    text: '微信小程序',
    items: [
      { text: 'westore', link: '/interview-questions/westore/principle/' },
      { text: '微信小程序的理解', link: '/interview-questions/westore/understand/' },
      { text: '小程序生命周期', link: '/interview-questions/westore/life-cycle/' },
      { text: '微信小程序中路由跳转的方式有哪些？区别', link: '/interview-questions/westore/router-navigate/' },
      { text: '提高微信小程序的应用速度的手段有哪些', link: '/interview-questions/westore/optimize/' },
      { text: '微信小程序的登录流程', link: '/interview-questions/westore/login/' },
      { text: '微信小程序的发布流程', link: '/interview-questions/westore/release/' },
      { text: '微信小程序的支付流程', link: '/interview-questions/westore/pay/' },
      { text: '微信小程序的实现原理', link: '/interview-questions/westore/implementation/' },
    ]
  },
  {
    text: '性能优化',
    items: [
      { text: 'performance', link: '/interview-questions/performance-optimization/performance/' },
      { text: 'HTML优化', link: '/interview-questions/performance-optimization/html/' },
      { text: '图片懒加载', link: '/interview-questions/performance-optimization/img-lazy/' },
      {
        text: 'JS优化',
        items: [
          { text: '减少引用类型内存访问', link: '/interview-questions/performance-optimization/js/reference-memory-access/' },
          { text: '何减少卡顿的代码', link: '/interview-questions/performance-optimization/js/reduce-stuttering-code/' },
        ]
      },
      {
        text: '虚拟列表',
        items: [
          { text: 'react版本', link: '/interview-questions/performance-optimization/virtual-list/react/' },
        ]
      },
      { text: '前端懒加载和预加载', link: '/interview-questions/performance-optimization/lazyload-preload/' },
    ]
  },
  {
    text: 'Vue ',
    items: [
      { text: 'Vue3中操作dom的四种方式', link: '/interview-questions/vue/dom/' },
    ]
  },
  {
    text: 'React ',
    items: [
      { text: '自定义hooks', link: '/interview-questions/react/hooks/' },
      { text: 'React的setState是异步的还是同步的', link: '/interview-questions/react/setstate/' },
    ]
  },
  {
    text: 'Webpack ',
    items: [
      { text: 'webpack', link: '/interview-questions/webpack/start/' },
      { text: 'hash的3种方式', link: '/interview-questions/webpack/hash/' },
      { text: 'webpack 编译时样式美化', link: '/interview-questions/webpack/beautify-compile/' },
    ]
  },
  {
    text: 'Node ',
    items: [
      { text: '需要了解的nodejs知识', link: '/interview-questions/node/understand-start/' },
      { text: 'require加载器实现原理 ', link: '/interview-questions/node/require/' },
    ]
  },
  {
    text: 'npm',
    items: [
      { text: '简介', link: '/interview-questions/npm/start/' },
      { text: '常用操作', link: '/interview-questions/npm/common-operations/' },
      { text: 'link 创建软链', link: '/interview-questions/npm/link/' },
      { text: '运行 npm run xxx 的时候发生了什么？', link: '/interview-questions/npm/npm-run-xxx/' },
    ]
  },
  {
    text: '设计模式 ',
    items: [
      { text: '发布订阅模式', link: '/interview-questions/design-patterns/release-subscription/' },
      { text: '观察者模式', link: '/interview-questions/design-patterns/observer/' },
      { text: '代理模式', link: '/interview-questions/design-patterns/decorator/' },
      { text: '装饰器模式', link: '/interview-questions/design-patterns/agent/' },
      { text: '适配器模式', link: '/interview-questions/design-patterns/adapter/' },
      { text: '策略模式', link: '/interview-questions/design-patterns/strategy/' },
    ]
  },
  {
    text: 'Git',
    items: [
      { text: '储藏 stash', link: '/interview-questions/git/stash/' },
      { text: '常用命令', link: '/interview-questions/git/commands/' },
      { text: '工作区&暂存区的操作命令', link: '/interview-questions/git/workspace-temporary/' },
      { text: '本地仓库上的操作&gitignore', link: '/interview-questions/git/gitignore-localRepository/' },
    ]
  },
  {
    text: 'Nginx ',
    items: [
      { text: 'Nginx', link: '/interview-questions/nginx/start/' },
      { text: '基础知识', link: '/interview-questions/nginx/basis/' },
    ]
  },
  {
    text: 'Docker ',
    items: [
      { text: 'Docker介绍', link: '/interview-questions/docker/start/' },
    ]
  },
  {
    text: 'Linux ',
    items: [
      { text: '硬链接和软链接', link: '/interview-questions/linux/soft-hard/' },
    ]
  },
  {
    text: '场景题 ',
    items: [
      { text: '并发请求数量控制', link: '/interview-questions/scene-problem/concurrent-requests/' },
      { text: '文本环绕球体', link: '/interview-questions/scene-problem/css-text-rotate/' },
      { text: '前端水印功能', link: '/interview-questions/scene-problem/watermark/' },
      { text: 'EventLoop', link: '/interview-questions/scene-problem/event-loop/' },
      { text: '请求合并', link: '/interview-questions/scene-problem/request-merge/' },
      { text: '拖拽的实现', link: '/interview-questions/scene-problem/drag/' },
      { text: '红绿灯', link: '/interview-questions/scene-problem/promise-traffic-light/' },
      { text: 'requestAnimationFrame 和 requestIdleCallback', link: '/interview-questions/scene-problem/requestAnimationFrame-requestIdleCallback/' },
    ]
  },
  {
    text: '面试题纲集合',
    items: [
      { text: '30 道 Vue 面试题', link: '/interview-questions/topic-outline/vue30/' },
      { text: '字节前端面试题', link: '/interview-questions/topic-outline/bytes/' },
      { text: '三十七个常见Vue面试题', link: '/interview-questions/topic-outline/vue-37/' },
      { text: '2022高频前端面试题——HTML篇', link: '/interview-questions/topic-outline/2022-html/' },
      { text: '2022高频前端面试题——CSS篇', link: '/interview-questions/topic-outline/2022-css/' },
      { text: '2022高频前端面试题合集之JavaScript篇', link: '/interview-questions/topic-outline/2022-js-top/' },
      { text: '中级前端面试(上)', link: '/interview-questions/topic-outline/intermediate-engineer-top/' },
      { text: '中级前端面试(中)', link: '/interview-questions/topic-outline/intermediate-engineer-center/' },
      { text: '中级前端面试(下)', link: '/interview-questions/topic-outline/intermediate-engineer-bottom/' },
      { text: '常见的前端算法题', link: '/interview-questions/topic-outline/algorithm/' },
      { text: '面试万字总结（浏览器网络篇）', link: '/interview-questions/topic-outline/browser/' },
    ]
  },
]

export default Router