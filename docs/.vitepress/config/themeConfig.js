
const sidebar = require("../sidebar")
const nav = require("../nav")
const themeConfig = {
  outline: 'deep',
  docFooter: {
    prev: '上一页',
    next: '下一页'
  },
  footer: {
    message: 'Welcome to the site',
  },
  nav,
  algolia: {
    apiKey: 'f8e742898c758644dac164a10cf39ad9',
    indexName: 'index_name',
    // appId: '<APP_ID>',
    translations: {
      button: {
        buttonText: '搜索文档',
        buttonAriaLabel: '搜索文档',
      },
    },
  },
  sidebar
}

module.exports = themeConfig