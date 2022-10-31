const path = require("path")
const head = require("./config/head")
const themeConfig = require("./config/themeConfig")
const markdown = require("./config/markdown")

module.exports = {
  title: "Alan",
  lang: 'zh-CN',
  alias: {
    '@/': path.resolve(__dirname, 'docs'),
    '@img/': path.resolve(__dirname, 'docs', 'assets'),
  },
  markdown,
  themeConfig,
  head,
}