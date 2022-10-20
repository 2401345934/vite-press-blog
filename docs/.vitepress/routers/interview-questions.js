module.exports = [
  {
    text: '微信小程序',
    items: [
      { text: 'westore', link: '/westore/' },
    ]
  },
  {
    text: '浏览器',
    items: [
      { text: '浏览器缓存机制', link: '/browser/browser-cache/' },
      { text: '从输入一个 URL 地址到浏览器完成渲染的整个过程!', link: '/browser/browser-open-url/' },
      { text: '浏览器进程', link: '/browser/browser-process/' },
    ]
  },
  {
    text: 'Webpack ',
    items: [
      { text: 'webpack', link: '/webpack/' },
    ]
  },
  {
    text: 'React',
    items: [
      { text: '渲染控制', link: '/react/render/' },
      { text: '事件机制', link: '/react/event-mechanism/' },
      { text: 'Hooks原理', link: '/react/hooks/' },
    ]
  },
  {
    text: 'Vue',
    items: [
      { text: 'Vue/整体设计', link: '/vue/vue-design/' },
      {
        text: 'Vue/组件',
        items: [
          { text: '组件的渲染流程', link: '/vue/component/vue-component-create/' },
          { text: '组件的更新流程', link: '/vue/component/vue-component-update/' },
          { text: '组件的实例', link: '/vue/component/vue-component-instance/' },
          { text: '组件的 props', link: '/vue/component/vue-component-props/' },
          { text: '组件的生命周期', link: '/vue/component/vue-component-life-cycle/' },
          { text: '异步组件', link: '/vue/component/vue-component-async/' },

        ]
      },
      {
        text: 'Vue/响应式原理',
        items: [
          { text: 'reactive API', link: '/vue/reactive-principle/reactive/' },
          { text: '依赖收集', link: '/vue/reactive-principle/dep-collection/' },
          { text: '派发通知', link: '/vue/reactive-principle/notification/' },
          { text: '响应式实现的优化 Vue3.2 版本', link: '/vue/reactive-principle/implementation-optimized/' },
          { text: 'ref', link: '/vue/reactive-principle/ref/' },
          { text: 'shallowReactive', link: '/vue/reactive-principle/shallowReactive/' },
          { text: 'readonly', link: '/vue/reactive-principle/readonly/' },
        ]
      }
    ]
  },
  {
    text: '面试题纲集合',
    items: [
      { text: '字节前端面试题', link: '/topic-outline/bytes/' },
    ]
  },
  {
    text: 'TypeScript ',
    items: [
      { text: 'Array 和 tuple 的区别', link: '/ts/array-tuple/' },
      { text: 'interface 和 type 的区别', link: '/ts/interface-type/' },
      { text: 'unknown 和any 的区别', link: '/ts/unknown-any/' },
      { text: 'type of 和 key of 的区别', link: '/ts/type0f-keyOf/' },
      { text: 'void  和 never  类型的 区别', link: '/ts/void-never/' },
    ]
  },
  {
    text: 'Nginx ',
    items: [
      { text: 'Nginx', link: '/nginx/' },
    ]
  },
]