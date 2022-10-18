module.exports = {
  title: "Alan",
  themeConfig: {
    nav: [
      { text: "首页", link: "/" },
    ],
    sidebar: [
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
          { text: 'vue/整体设计', link: '/vue-design/' },
          {
            text: 'vue/组件',
            items: [
              { text: '组件的渲染流程', link: '/vue-component-create/' },
              { text: '组件的更新流程', link: '/vue-component-update/' },
            ]
          }
        ]
      }
    ]
  },
}