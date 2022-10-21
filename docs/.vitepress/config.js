const sidebar = require("./sidebar")
const path = require("path")

module.exports = {
  title: "Alan",
  lang: 'zh-CN',
  alias: {
    '@/': path.resolve(__dirname, 'docs'),
    '@img/': path.resolve(__dirname, 'docs', 'assets'),
  },
  markdown: {
    theme: 'material-palenight',
    lineNumbers: true
  },
  themeConfig: {
    outline: 'deep',
    docFooter: {
      prev: '上一页',
      next: '下一页'
    },
    footer: {
      message: 'Welcome to the site',
    },
    nav: [
      { text: "首页", link: "/" },
      { text: "面试题", link: "/interview-questions/",    activeMatch: '/interview-questions/' },
      { text: "源码", link: "/source/",    activeMatch: '/source/' },
      { text: "常用-utils", link: "/utils/",    activeMatch: '/utils/' },
      { text: "浏览器", link: "/browser/",    activeMatch: '/browser/' },
      { text: "HTTP", link: "/http/",    activeMatch: '/http/' },
      { text: "算法与数据结构", link: "/data-structures-algorithms/",activeMatch:'/data-structures-algorithms/' },
      {
        text: "相关链接",
        items: [
          { text: "git hub", link: "https://github.com/2401345934" },
          { text: "掘金", link: "https://juejin.cn/user/553809592726526/posts" }
        ]
      },
    ],
    algolia: {
      apiKey: 'f8e742898c758644dac164a10cf39ad9',
      indexName: 'index_name'
    },
    sidebar
  },
  head: [
    [
      "script",
      { src: '/Valine.min.js' },
    ],
  ],
}