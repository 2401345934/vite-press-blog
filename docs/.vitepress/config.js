import head from "./config/head"
import themeConfig from "./config/themeConfig"
import markdown from "./config/markdown"

export default {
  title: "Alan",
  lang: 'zh-CN',
  locale: 'zh_CN',
  description: '个人知识库，记录 & 分享个人碎片化、结构化、体系化的知识内容。',
  lastUpdated: true, // 显示最后更新时间
  markdown,
  themeConfig,
  head,
  base:'/github.io',
}