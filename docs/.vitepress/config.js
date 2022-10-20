const sidebar = require("./sidebar")
const path = require("path")
module.exports = {
  title: "Alan",
  lang: 'zh-CN',
  alias: {
    '@/': path.resolve(__dirname, 'docs') ,
    '@img/': path.resolve(__dirname, 'docs','assets') ,
  },
  markdown: {
    theme: 'material-palenight',
    lineNumbers: true
  },
  themeConfig: {
    outline: 'deep',
    footer: {
      message: 'Welcome to the site',
    },
    nav: [
      { text: "首页", link: "/" },
    ],
    algolia: {
      apiKey: 'f8e742898c758644dac164a10cf39ad9',
      indexName: 'index_name'
    },
    sidebar
  },
}