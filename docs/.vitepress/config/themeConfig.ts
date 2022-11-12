
import nav from "./nav"
import sidebar from "./sidebar"
const themeConfig = {
  outline: 'deep',
  outlineTitle: '目录', // 右侧大纲标题文本配置
  lastUpdatedText: '最后更新', // 最后更新时间文本配置, 需先配置lastUpdated为true
  // 编辑链接配置
  editLink: {
    pattern: 'https://github.com/2401345934/vite-press/issues/new',
    text: '不妥之处，敬请雅正'
  },
  docFooter: {
    prev: '上一页',
    next: '下一页'
  },
  footer: {
    message: 'Welcome to the site',
  },
  nav,
  // algolia: {
  //   apiKey: 'f8e742898c758644dac164a10cf39ad9',
  //   indexName: 'index_name',
  //   // appId: '<APP_ID>',
  //   translations: {
  //     button: {
  //       buttonText: '搜索文档',
  //       buttonAriaLabel: '搜索文档',
  //     },
  //   },
  // },
  sidebar
}

export default themeConfig