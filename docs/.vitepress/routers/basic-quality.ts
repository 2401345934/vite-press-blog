

import RouterType from "./types.type"

const Router: RouterType = [
  {
    text: 'HTTP',
    items: [
      {
        text: 'http  vs https',
        link: '/basic-quality/http/http-https/',
      },
      {
        text: 'HTTP请求头',
        link: '/basic-quality/http/http-headers/',
      },
      {
        text: 'HTTP 请求跨域问题',
        link: '/basic-quality/http/cross-domain/',
      },
      {
        text: 'http 状态码都有哪些',
        link: '/basic-quality/http/status-code/',
      },
      {
        text: 'http2.0 做了哪些改进 3.0',
        link: '/basic-quality/http/http2-http3/',
      },
      {
        text: 'HTTP 及 TLS',
        link: '/basic-quality/http/http-tls/',
      },
    ],
  },
  {
    text: '浏览器',
    items: [
      {
        text: '浏览器基础概念',
        items: [
          {
            text: '浏览器缓存机浏览器的组成 & 内核组成制',
            link: '/basic-quality/browser/browser/composition/',
          },
          { text: '浏览器缓存机制', link: '/basic-quality/browser/browser/browser-cache/' },
          {
            text: '从输入一个 URL 地址到浏览器完成渲染的整个过程!',
            link: '/basic-quality/browser/browser/browser-open-url/',
          },
          { text: '浏览器进程', link: '/basic-quality/browser/browser/browser-process/' },
          {
            text: '浏览器的 5 种 Observer',
            link: '/basic-quality/browser/browser/observer/',
          },
        ],
      },
      {
        text: '浏览器的渲染原理',
        link: '/basic-quality/browser/browser/render/',
      },
      {
        text: '浏览器渲染流水线解析',
        link: '/basic-quality/browser/browser/render-pipeline-parsing/',
      },
      {
        text: '浏览器 storage',
        link: '/basic-quality/browser/browser/storage/',
      },
      {
        text: '浏览器基础知识点及常考面试题',
        link: '/basic-quality/browser/interview-questions/',
      },
      {
        text: 'V8引擎',
        items: [
          {
            text: 'JavaScript是怎么被运行起来的',
            link: '/basic-quality/browser/v8/start/',
          },
          {
            text: 'JS运行9大概念',
            link: '/basic-quality/browser/v8/js-run/',
          },
        ],
      },
    ],
  },
  {
    text: '计算机',
    items: [
      {
        text: '计算机网络',
        items: [
          {
            text: '计算机网络基础知识',
            link: '/basic-quality/computer-networks/',
          },
          {
            text: '计算机网络分层结构',
            link: '/basic-quality/structure-computer-networks/',
          },
          {
            text: 'TCP三次握手 TCP 四次挥手',
            link: '/basic-quality/tcp-three-tcp-four/',
          },
          {
            text: 'TCP/IP / 如何保证数据包传输的有序可靠？',
            link: '/basic-quality/orderly-reliable-transmission/',
          },
          {
            text: 'TCP和UDP的区别',
            link: '/basic-quality/tcp-udp/',
          },
          {
            text: 'TCP',
            link: '/basic-quality/tcp/',
          },
          {
            text: 'UDP',
            link: '/basic-quality/udp/',
          },
        ]
      },
      {
        text: '计算机组成原理',
        link: '/basic-quality/computer-composition/',
      },
    ],
  },
  {
    text: '软能力',
    items: [
      {
        text: '沟通能力',
        items: [
          {
            text: '提问的艺术',
            link: '/basic-quality/soft-power/asking-questions/',
          },
          {
            text: '回答的艺术',
            link: '/basic-quality/soft-power/answer/',
          },
        ]
      },
      {
        text: '什么是架构师',
        link: '/basic-quality/soft-power/architect/',
      },
      {
        text: '前端招聘面试流程',
        link: '/basic-quality/soft-power/interview-process/',
      },
      {
        text: '结构化思维-MECE分析方法',
        link: '/basic-quality/soft-power/mece/',
      },
      {
        text: '飞轮思维',
        link: '/basic-quality/soft-power/flywheel/',
      },
      {
        text: '防错思维',
        link: '/basic-quality/soft-power/mistake-proofing/',
      },
      {
        text: '迭代思维',
        link: '/basic-quality/soft-power/iteration/',
      },
      {
        text: '根因思维',
        link: '/basic-quality/soft-power/returning/',
      },
      {
        text: '复盘思维',
        link: '/basic-quality/soft-power/analyse/',
      },
      {
        text: '灰度思维',
        link: '/basic-quality/soft-power/gray/',
      },
      {
        text: '管理',
        link: '/basic-quality/soft-power/management/',
      },
      {
        text: '估算',
        link: '/basic-quality/soft-power/estimate/',
      },
      {
        text: '概念化',
        link: '/basic-quality/soft-power/conceptualization/',
      },
      {
        text: '合作关系',
        link: '/basic-quality/soft-power/relations-cooperation/',
      },
      {
        text: '发现',
        link: '/basic-quality/soft-power/found/',
      },
    ]
  },
  {
    text: 'chrome小技巧',
    items: [
      {
        text: 'DevTools Tips',
        link: '/basic-quality/browser/chrome-dev/skills/DevTools-tips/',
      },
      {
        text: 'Devtools Snippets',
        link: '/basic-quality/browser/chrome-dev/skills/DevTools-Snippets/',
      },
      {
        text: '使用 control (按钮) 来移动元素',
        link: '/basic-quality/browser/chrome-dev/skills/control/',
      },
      {
        text: '拖动 & 放置 元素',
        link: '/basic-quality/browser/chrome-dev/skills/drag-element/',
      },
      {
        text: '$i  控制台中安装插件',
        link: '/basic-quality/browser/chrome-dev/skills/$i-install/',
      },
      {
        text: '获取某个元素',
        link: '/basic-quality/browser/chrome-dev/skills/get-element/',
      },
      {
        text: '快速隐藏元素',
        link: '/basic-quality/browser/chrome-dev/skills/hidden-element/',
      },
      {
        text: 'elements， logs， sources & network 中的查找',
        link: '/basic-quality/browser/chrome-dev/skills/search/',
      },
      {
        text: '线上环境开启vue devtool',
        link: '/basic-quality/browser/chrome-dev/skills/store-global/',
      },
      {
        text: 'Store as global (存储为一个全局变量)',
        link: '/basic-quality/browser/chrome-dev/skills/open-prod-vue-devtool/',
      },
    ]
  },
]

export default Router