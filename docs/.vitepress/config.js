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
            text: '微信小程序面试题',
            items: [
              { text: 'westore', link: '/westore/' },
            ]
          },
          {
            text: 'webpack 面试题',
            items: [
              { text: 'webpack', link: '/webpack/' },
            ]
          },
          {
            text: 'Vue面试题',
            items: [
              { text: 'vue/整体设计', link: '/vue/vue-design/' },
              {
                text: 'vue/组件',
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
                text: 'vue/响应式原理',
                items: [
                  { text: '响应式的内部实现原理', link: '/vue/reactive/implementation/' },
                ]
              }
            ]
          },
          {
            text: 'Nginx 面试题',
            items: [
              { text: 'Nginx', link: '/nginx/' },
            ]
          },
        ]
      },
    ]
  },
}