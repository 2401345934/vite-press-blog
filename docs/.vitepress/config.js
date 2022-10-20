const sidebar = require("./sidebar")
module.exports = {
  title: "Alan",
  lang: 'zh-CN',
  themeConfig: {
    nav: [
      { text: "首页", link: "/" },
    ],
    algolia: {
      apiKey: 'your_api_key',
      indexName: 'index_name'
    },
    sidebar
  },
}