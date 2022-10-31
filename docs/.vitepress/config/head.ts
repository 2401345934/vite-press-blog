import type { HeadConfig } from 'vitepress'

const head: HeadConfig[] = [
  [
    "script",
    { src: '/Valine.min.js' },
  ],
]

module.exports = head