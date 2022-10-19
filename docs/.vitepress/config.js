module.exports = {
  title: "Alan",
  themeConfig: {
    nav: [
      { text: "首页", link: "/" },
    ],
    sidebar: [
      {
        text: '面试题',
        items: [
          {
            text: '微信小程序',
            link: '/westore/',
            items: [
              { text: 'westore', link: '/westore/' },
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
                  { text: '响应式的内部实现原理', link: '/vue/reactive/implementation/' },
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
      },
    ]
  },
}