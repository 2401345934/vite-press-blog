
import RouterType from "./types.type"
const Router: RouterType = [
  {
    text: '工作工具',
    items: [
      {
        text: '压缩图片',
        link: '/tool/compressed-image/',
      },

      {
        text: '生成指定尺寸的图片',
        link: '/tool/create-image/',
      },
      {
        text: '代码转换工具',
        link: '/tool/code-transform/',
      },
      {
        text: '压缩视频',
        link: '/tool/compressed-video/',
      },
      {
        text: 'api查询',
        link: '/tool/api-all/',
      },
      {
        text: '常用git命令',
        link: '/tool/git-all/',
      },
      
      {
        text: 'json可视化',
        link: '/tool/json-view/',
      },
    ]
  },
  {
    text: 'mac 工具',
    items: [
      {
        text: '命令行工具-Warp',
        link: '/tool/Warp/',
      },
      {
        text: '快速搭建前端Mac环境',
        link: '/tool/mac-init/',
      },
      {
        text: 'Markdown-marktext',
        link: '/tool/marktext/',
      },
    ]
  },
  {
    text: '特效',
    items: [
      {
        text: '鼠标特效',
        link: '/tool/special-effects/mouse/',
      },
    ]
  },
  {
    text: '功能网站',
    items: [
      {
        text: 'code-fun 生成代码',
        link: '/tool/code-fun/',
      },

      {
        text: 'chartGpt 注册',
        link: '/tool/chartGpt/',
      },
      {
        text: '奇链',
        link: '/tool/q-link/',
      },
      {
        text: '抽奖插件',
        link: '/tool/ducky-draw/',
      },
      {
        text: 'CDN',
        link: '/tool/cdn/',
      },
      {
        text: '常用轮子集合',
        link: '/tool/tool-collection/',
      },
      {
        text: '页面评论功能',
        link: '/tool/valine/',
      },
      {
        text: '页面引导功能',
        link: '/tool/intro/',
      },
      {
        text: '静态网站部署',
        link: '/tool/static-html/',
      },
      {
        text: '好看的loading网站',
        link: '/tool/loading-html/',
      },
      {
        text: '在线ps',
        link: '/tool/ps/',
      },
      {
        text: '在线编辑器',
        link: '/tool/code/',
      },
    ]
  },
]
export default Router