import type { HeadConfig } from 'vitepress'

const head: HeadConfig[] = [
  ['link', { rel: 'icon', href: '/favicon.ico' }],
  ['meta', { name: 'author', content: 'Alan' }],
  ['meta', { name: 'keywords', content: 'Alan知识库, 知识库, 博客' }],
  [
    "script",
    { src: '/Valine.min.js' },
  ],
]

export default head