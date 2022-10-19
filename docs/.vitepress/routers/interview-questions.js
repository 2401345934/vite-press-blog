module.exports = [
  {
    text: '微信小程序',
    link: '/westore/',
    items: [
      { text: 'westore', link: '/westore/' },
    ]
  },
  {
    text: '浏览器',
    link: '/browser/browser-cache/',
    items: [
      { text: '浏览器缓存机制', link: '/browser/browser-cache/' },
      { text: '从输入一个 URL 地址到浏览器完成渲染的整个过程!', link: '/browser/browser-open-url/' },
      { text: '浏览器进程', link: '/browser/browser-process/' },
    ]
  },
  {
    text: 'Webpack ',
    link: '/webpack/',
    items: [
      { text: 'webpack', link: '/webpack/' },
    ]
  },
  {
    text: 'React',
    link: '/react/render/',
    items: [
      { text: '渲染控制', link: '/react/render/' },
      { text: '事件机制', link: '/react/event-mechanism/' },
      { text: 'Hooks原理', link: '/react/hooks/' },
    ]
  },
  {
    text: 'Vue',
    link: '/vue/vue-design/',
    items: [
      { text: 'Vue/整体设计', link: '/vue/vue-design/' },
      {
        text: 'Vue/组件',
        link: '/vue/component/vue-component-create/',
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
        link: '/vue/reactive/implementation/',
        items: [
          { text: 'reactive API', link: '/vue/reactive/reactive/' },
          { text: '依赖收集', link: '/vue/reactive/dep-collection/' },
          { text: '派发通知', link: '/vue/reactive/notification/' },
          { text: '响应式实现的优化 Vue3.2 版本', link: '/vue/reactive/implementation-optimized/' },
        ]
      }
    ]
  },
  {
    text: 'Nginx ',
    link: '/nginx/',
    items: [
      { text: 'Nginx', link: '/nginx/' },
    ]
  },
]