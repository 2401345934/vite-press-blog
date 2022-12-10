
import RouterType from "./types.type"

const Router: RouterType = [
  {
    text: 'NPM',
    items: [
      {
        text: 'NPM私服库的搭建',
        link: '/engineering/npm/private/',
      },
      {
        text: 'NPM 发布包',
        link: '/engineering/npm/npm-release/',
      },
      {
        text: '初识 npm script',
        link: '/engineering/npm/start-script/',
      },
      {
        text: 'npm ci和npm install区别',
        link: '/engineering/npm/npm-ci/',
      },
      {
        text: '运行多个 npm script 的各种姿势',
        link: '/engineering/npm/more-script/',
      },
      {
        text: '给 npm script 传递参数和添加注释',
        link: '/engineering/npm/parameter-script/',
      },
      {
        text: '使用 npm script 的钩子',
        link: '/engineering/npm/npm-hook/',
      },
      {
        text: '在 npm script 中使用变量',
        link: '/engineering/npm/npm-var/',
      },
      {
        text: '实现命令行自动补全',
        link: '/engineering/npm/npm-auto/',
      },
      {
        text: '实现 npm script 跨平台兼容',
        link: '/engineering/npm/cross-platform/',
      },
      {
        text: '用 node.js 脚本替代复杂的 npm script',
        link: '/engineering/npm/node/',
      },
      {
        text: '文件变化时自动运行 npm script',
        link: '/engineering/npm/npm-watch/',
      },
      {
        text: 'npm 安装流程',
        link: '/engineering/npm/npm-install/',
      },
    ],
  },
  {
    text: 'git',
    items: [
      {
        text: 'Git Submodules 介绍',
        link: '/engineering/git/Submodules/',
      },
    ],
  },
  {
    text: '代码规范',
    items: [
      {
        text: 'Eslint + Prettier + Husky + Commitlint + Lint-staged',
        link: '/engineering/code-specification/',
      },
    ],
  },
  {
    text: 'cicd',
    items: [
      {
        text: 'gitlab CiCd',
        link: '/engineering/cicd/gitlab-cicd-start/',
      },
      {
        text: 'GitLab CI 从入门到实践',
        link: '/engineering/cicd/gitlab-cicd/',
      },
      {
        text: '基于GitLab+docker的前端自动化构建部署(CI/CD)流程 ',
        link: '/engineering/cicd/gitlab-docker-cicd/',
      },
      {
        text: ' 基于 Docker ( Gitlab、Gitlab Runner ) 自动部署运行 ',
        link: '/engineering/cicd/gitlab-two-docker-cicd/',
      },
    ],
  },

  {
    text: 'package.json',
    items: [
      {
        text: 'packager介绍',
        link: '/engineering/package/package-start/',
      },
      {
        text: '自动修改 packager.json 文件 version',
        link: '/engineering/package/package-version/',
      }
    ],
  },

  {
    text: '项目搭建',
    items: [
      {
        text: '从0搭建 Vite 3 + Vue 3',
        link: '/engineering/project-structures/vue3-vite/',
      },
      {
        text: ' 手把手教你搭建一个生产级的vite SSR项目',
        link: '/engineering/project-structures/vite-ssr/',
      },
      {
        text: '从零搭建vitepress博客',
        link: '/engineering/project-structures/vite-press/',
      },
      {
        text: 'vue3+vite+ts+vuex+vue-router+Element-plus+tailwindcss+mock 搭建完整项目',
        link: '/engineering/project-structures/vue3-project/',
      },
      {
        text: '整理的一些前后端协同工作',
        link: '/engineering/project-structures/synergy/',
      },
      {
        text: '处理浏览器默认样式',
        link: '/engineering/project-structures/commonly-css-base/',
      },
      {
        text: '常用 less mixins',
        link: '/engineering/project-structures/commonly-less/',
      },
      {
        text: '常用scss mixins',
        link: '/engineering/project-structures/commonly-scss/',
      },
    ],
  },
  {
    text: 'Vite',
    items: [
      {
        text: 'Vite 入门篇',
        link: '/engineering/vite/start/',
      },
      {
        text: 'Vite项目屏幕适配的两种方案',
        link: '/engineering/vite/screen-adaptation/',
      }
    ],
  },
  {
    text: 'GitHub',
    items: [
      {
        text: '代码同步 Github 和 Gitee',
        link: '/engineering/github/github-gitee/',
      },
      {
        text: 'actions',
        link: '/engineering/github/actions/',
      }
    ],
  },
  {
    text: '部署',
    items: [
      {
        text: 'GitHub Pages部署报错：JavaScript heap out of memory',
        link: '/engineering/deployment/pages-js-memory/',
      },
    ],
  },
  {
    text: '适配',
    items: [
      {
        text: '数据大屏适配方案',
        link: '/engineering/adapter/data-screen/',
      },
    ],
  },
  {
    text: 'Markdown',
    items: [
      {
        text: 'hard-line-breaks',
        link: '/engineering/Markdown/details/',
      }
    ],
  },
  {
    text: 'AST',
    items: [
      {
        text: 'AST的介绍',
        link: '/engineering/ast/start/',
      },
      {
        text: 'AST的广泛应用',
        link: '/engineering/ast/widely-used/',
      },
      {
        text: '🔥 手撕babel插件-消灭console！ ',
        link: '/engineering/ast/delete-console/',
      }
    ],
  },

  {
    text: '权限',
    items: [
      {
        text: '前端B端权限控制【资源权限，数据权限】',
        link: '/engineering/permissions/tob-permissions/',
      }
    ],
  },
  {
    text: 'SDK',
    items: [
      {
        text: '从0到1搭建前端监控平台',
        link: '/engineering/sdk/monitoring-platform/',
      },
      {
        text: '数据埋点起步',
        link: '/engineering/sdk/buried-point/',
      },
      {
        text: '前端录屏+定位源码',
        link: '/engineering/sdk/source-bug/',
      }
    ],
  },
  {
    text: 'Web RTC',
    items: [
      {
        text: 'WebRTC 的应用场景',
        link: '/engineering/webRTC/start/',
      },
      {
        text: '从0搭建一个WebRTC，实现多房间多对多通话，并实现屏幕录制',
        link: '/engineering/webRTC/screen-recording/',
      }
    ],
  },
]

export default Router