---
createTime: 2022/12/10
tag: '工程化,项目搭建,SSR,Vite'
---

# 手把手教你搭建一个生产级的vite SSR项目

> 本文不对SSR原理深入解释

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/6a49f5e4c3b54eecb4495c6c414f90c8~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.image)

## 技术选型

以上思维导图第一列是我们的目标，第二列是我选择的技术栈。

通过目标导向技术栈，每个目标都对应了许多不同的技术栈，我只是把我选择的写下来了。

许多技术栈都可以替换，比如 vue 替换 React，React-use 替换 ahooks，按照你喜欢的来就行

## 开始搭建

有了选型了，那我们可以快速搭建项目模板了

## 初始化

推荐使用 `vite-plugin-ssr`cli初始化项目

```js
npm init vite-plugin-ssr@latest
```

初始化后可以得到以下结构的基础项目

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/6c08b64f75814bc3b0169a31eb193c94~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.image)

安装依赖后，我们可以尝试 `npm run dev`跑起来

下面开始工程化改造

工程化
---

### ESM

我们全程使用ESM规范开发，package.json 中设置 `type`

```js
"type": "module"
```

### pnpm

pnpm相对npm速度快很多，且做了依赖优化。`package.json`中 [限制只能使用 pnpm](https://link.juejin.cn/?target=https%3A%2F%2Fpnpm.io%2Fonly-allow-pnpm "https://pnpm.io/only-allow-pnpm")

```js
"scripts": {
  "preinstall": "npx only-allow pnpm",
}
```

### eslint

eslint可以根据规则校验代码是否符合规范

eslint看团队或个人习惯，这里给个例子

#### 安装

```js
pnpm add eslint eslint-define-config eslint-plugin-react eslint-plugin-react-hooks eslint-config-standard @typescript-eslint/parser @typescript-eslint/eslint-plugin -D
```

#### vscode插件

eslint插件ID：dbaeumer.vscode-eslint

为了方便大家都安装了这些插件，我把插件写在了 `.vscode`中

```js
{
  "recommendations": [
    "bradlc.vscode-tailwindcss", // tailwindcss
    "vunguyentuan.vscode-postcss", // postcss
    "dbaeumer.vscode-eslint", // eslint
    "esbenp.prettier-vscode" // prettier
    "lokalise.i18n-ally" // 国际化
  ]
}

```

#### 配置 (.eslintrc.cjs)

```js
const { defineConfig } = require('eslint-define-config')

module.exports = defineConfig({
  extends: ['plugin:react/recommended', 'plugin:react-hooks/recommended', 'plugin:@typescript-eslint/recommended', 'standard'],
  settings: {
    react: {
      version: '17.0',
    },
  },
  env: {
    es6: true,
    browser: true,
    node: true,
  },
  parser: '@typescript-eslint/parser'
})
```

#### eslint ignore

设置不需要eslint处理的文件

```js
*.sh
node_modules
*.woff
*.ttf
.vscode
.local
dist
public

```

### prettier

prettier可以格式化代码，也可按照团队或个人风格相应修改

#### 安装

```js
pnpm add prettier -D
```

#### 配置 (.pretterrc.cjs)

```js
/** @type {import('prettier').Config} */
module.exports = {
  singleQuote: true,
  trailingComma: 'all',
  tabWidth: 2,
  endOfLine: 'auto',
  printWidth: 120,
  semi: false,
  jsxSingleQuote: true,
  htmlWhitespaceSensitivity: 'strict',
  quoteProps: 'consistent',
  bracketSpacing: true,
  bracketSameLine: false,
  arrowParens: 'always',
}
```

### commitlint

commitlint可以根据规则检查我们的git commit是否符合规范

#### 安装

```js
pnpm add @commitlint/config-conventional @commitlint/cli -D
```

#### 配置(commitlint.config.cjs)

```js
module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'body-leading-blank': [2, 'always'],
    'footer-leading-blank': [1, 'always'],
    'header-max-length': [2, 'always', 108],
    'subject-empty': [2, 'never'],
    'subject-case': [
      2,
      'always',
      [
        'lower-case', // default
        'upper-case', // UPPERCASE
        'camel-case', // camelCase
        'kebab-case', // kebab-case
        'pascal-case', // PascalCase
        'sentence-case', // Sentence case
        'snake-case', // snake_case
        'start-case', // Start Case
      ],
    ],
    'type-empty': [2, 'never'],
    'type-enum': [
      2,
      'always',
      [
        'feat',
        'fix',
        'perf',
        'style',
        'docs',
        'test',
        'refactor',
        'build',
        'ci',
        'chore',
        'revert',
        'wip',
        'workflow',
        'types',
        'release',
        'merge',
        'deps',
      ],
    ],
  },
}

```

我们还需要一个触发git commit验证的入口，那就是 `git hook`，在 `commit-msg`阶段出发commitlint的命令即可。

我们可以手动添加githook，也可以配置自动添加。

#### 手动添加commit msg

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/130e7ecd9683429db14db81616a25cf4~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.image)

手动添加只适合咱们了解原理，为了团队协作和减少开发负担，我们尽量选择自动添加

#### 自动添加commit msg

目前市面上比较流行的是 `husky`，我个人喜欢使用 `simple-git-hooks`。

##### 安装

```
pnpm add simple-git-hooks -D

```

##### 配置

在package.json的hook中触发 `simple-git-hooks` 初始化

```js
"scripts": {
 "postinstall": "simple-git-hooks",
}

```

在package.json中配置 `simple-git-hooks`

```js
"simple-git-hooks": {
  "commit-msg": "pnpm exec commitlint --edit $1"
},

```

我们执行以下 `pnpm i`，如果出现以下截图，那我们就配置成功了

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/106b1f6be96f46469c59adf8c61a170c~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.image)

tsconfig
--------

我们使用`typscript`做runtime的类型检查，所以需要配置检查规则

```js
{
  "compilerOptions": {
    "baseUrl": ".",
    "target": "esnext",
    "module": "esnext",
    "moduleResolution": "node",
    "allowJs": true,
    "noEmit": true,
    "isolatedModules": true,
    "allowSyntheticDefaultImports": true,
    "lib": ["esnext", "dom", "DOM.Iterable"],
    "strict": true,
    "jsx": "react-jsx",
    "forceConsistentCasingInFileNames": true,
    "resolveJsonModule": true,
    "skipLibCheck": true,
    "esModuleInterop": true,
    "noUnusedLocals": true,
    "types": ["vite/client"],
    "paths": {
      "@/*": ["./src/*"],
      "@root/*": ["./*"]
    }
  },
  "exclude": ["node_modules", "dist", "**/*.js"]
}

```

其中比较重要的配置是：

* baseUrl：告诉tsconfig我们的根目录，它会影响`paths`/`exclude`这些与路径相关的字段
* esModuleInterop： [esbuild.github.io/content-typ…](https://link.juejin.cn/?target=https%3A%2F%2Fesbuild.github.io%2Fcontent-types%2F%23es-module-interop "https://esbuild.github.io/content-types/#es-module-interop")
* paths: 路径映射

vite配置
------

### 配合tsconfig path设置路径别名

```js
resolve: {
  alias: [
    { find: '@', replacement: path.resolve(__dirname, './src') },
    {
      find: '@root',
      replacement: path.resolve(__dirname),
    }
  ],
},

```

vite-plugin-ssr配置
-----------------

### 服务端路由与客户端路由

服务端路由适合简单，页面之间没有关联的项目，页面跳转时都会经历一次服务端渲染

客户端渲染适合复杂，页面之间有关联的项目，首次加载页面是服务端渲染，后续页面跳转是客户端渲染，就相当于SPA了

我们选择客户端路由，按照 [vite-plugin-ssr](https://link.juejin.cn/?target=https%3A%2F%2Fvite-plugin-ssr.com%2FclientRouting%23usage-options "https://vite-plugin-ssr.com/clientRouting#usage-options") 配置

```js
import ReactDOM from 'react-dom/client'

export const clientRouting = true

let root: ReactDOM.Root

export async function render(pageContext) {

  const container = document.getElementById('app')!

  if (pageContext.isHydration) {
   // 首次渲染，注水
    root = ReactDOM.hydrateRoot(container, await createApp(pageContext))
  } else {
    // 客户端渲染
    if (!root) {
      root = ReactDOM.createRoot(container)
    }
    root.render(await createApp(pageContext))
  }

  document.title = pageContext.pageProps?.title || (pageContext.exports?.pageProps as PageType.PageProps)?.title || ''
}

```

路由
--

使用vite-plugin-ssr内置路由功能即可，vite-plugin-ssr客户端路由跟React-Router类似，内部根据historyAPI实现了一套路由跳转的逻辑

#### 使用方式

```js
import { navigate } from 'vite-plugin-ssr/client/router'

navigate('/some/url')

```

状态管理
----

非业务层面全局状态使用 React Context，业务层面使用`zustand`

创建globalContext

```js
import React, { useContext } from 'react'

type GlobalContextProps = PageType.PageContext

const Context = React.createContext<GlobalContextProviderType>(undefined as any)

export function GlobalContextProvider({ props, children }) {
  return <Context.Provider value={{...props}}>{children}</Context.Provider>
}

export function useGlobalContext() {
  const globalContext = useContext(Context)
  return globalContext
}

```

业务层面 zustand example

```js
import create from 'zustand'

interface IModalState {
  visible: boolean
  setVisible: (visible: boolean) => void
}

const useModalStore = create<IModalState>((set) => {
  return {
    visible: false,
    setVisible: (visible: boolean) => {
      set({ visible })
    },
  }
})

export { useModalStore }

// 使用方式
const { visible, setVisible } = useModalStore()

setVisible(true)

```

请求axios
-------

axios兼容浏览器和node环境，适合SSR项目

参考 [vue-vben-admin](https://link.juejin.cn/?target=https%3A%2F%2Fgithub.com%2Fvbenjs%2Fvue-vben-admin "https://github.com/vbenjs/vue-vben-admin") 的axios封装进行二次修改，主要是区分browser/node环境

```js
export const axiosRequest = createAxios({
  requestOptions: {
    urlPrefix: isBrowser() ? import.meta.env.VITE_APIPREFIX ?? '' : '',
    apiUrl: isBrowser() ? window.location.origin : import.meta.env.VITE_APIURL,
  },
})

```

跨域代理
----

vite自带了跨域代理功能，但是只在开发期间生效，如果我们希望测试或正式环境代理的话，配置 `http-proxy-middleware`

### 安装

```js
pnpm add http-proxy-middleware -D

```

### 使用

```js
const proxy = import.meta.VITE_PROXY
if (proxy) {
  const { createProxyMiddleware } = await import('http-proxy-middleware')
  const rewriteKey = `^${proxy}`

  app.use(
    proxy,
    createProxyMiddleware({
      target: import.meta.VITE_APIURL,
      changeOrigin: true,
      pathRewrite: {
        [rewriteKey]: '/',
      },
    }),
  )
}

```

antd5 + tailwindcss方案
---------------------

antd5采用cssinjs方案，不再依赖less，所以可以把以前关于less的配置都移除。我们不需要使用预处理语言(less/scss...）了，用css配合postcss插件即可

之所以选择tailwind，有两个对我而言比较重要的原因：

1. 写响应式非常方便
2. 不用去想类名

tailwind非常强大，几乎支持所有css功能，建议各位同学使用之前熟悉官方文档。我列一些比较常用的工具类

```js
@apply text-white; // 使用tailwind的样式

@layer base { // 添加基础类。组件和工具类同理
  h1 {
    @apply text-2xl;
  }
}

class="!text-white" // ! ==> !important

class="text-[16px]" // [] ==> 任意值

class="hover:text-white" // hover: ==> 变体

class="text-[length:16PX]" // [length:] ==> 告诉tailwind后面紧接的是长度单位

```

### 重置样式 + 引入tailwindcss

```js
@import 'antd/dist/reset.css';
@tailwind base;
@tailwind components;
@tailwind utilities;
@tailwind variants;
@tailwind screens;

```

### tailwind配置

#### 响应式布局

```js
/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ['./renderer/**/*.{jsx,tsx}', './src/**/*.{jsx,tsx}'],
  prefix: '',
  theme: {
    // 如果开发以pc优先，则自定义以下screens。否则使用默认screens即可
    screens: {
      '2xl': { max: '1535px' },
      // => @media (max-width: 1535px) { ... }

      'xl': { max: '1279px' },
      // => @media (max-width: 1279px) { ... }

      'lg': { max: '1023px' },
      // => @media (max-width: 1023px) { ... }

      'md': { max: '767px' },
      // => @media (max-width: 767px) { ... }

      'sm': { max: '639px' },
      // => @media (max-width: 639px) { ... }
    },
  },
}

```

### postcss配置

postcss插件执行顺序是从上到下，所以 `autoprefixer`（一个处理css浏览器兼容的插件）放在最后

```js
module.exports = {
  plugins: {
    'tailwindcss/nesting': {}, // 默认是postcss-nested。支持css嵌套，不再需要less/scss
    'tailwindcss': {},
    'autoprefixer': {}, // 最后引入autoprefix
  },
}

```

### 移动端兼容

现在流行三种布局方案

1. 响应式
2. pxtorem自适应
3. pxtoviewport自适应

#### 响应式

响应式是比较麻烦的，因为需要针对不同的分辨率增加css代码，维护成本和难度相比自适应布局更难

但tailwind使得响应式布局更简单

```js
<div class="text-[32px] md:text-[24px] sm:text-[16px]"></div>
```

#### pxtorem方案

需要配合动态rem使用。监听窗口变化同时设置rem。

pxtorem相对比pxtoviewport，前者可以做到限制最大宽度，最小宽度

比如，我们的网页最大宽度为1920px，那么在窗口超过1920px后，rem不再变化即可

pxtoviewport做不到，它只能跟随窗口的大小变化

```js
module.exports = {
  plugins: {
    'tailwindcss/nesting': {},
    'tailwindcss': {},
    '@minko-fe/postcss-pxtorem': {
      rootValue: 16,
      propList: ['*'],
      minPixelValue: 1,
      convertUnitOnEnd: {
        sourceUnit: /[p|P][x|X]$/,
        targetUnit: 'px',
      },
      exclude(file) {
        return file.includes('node_modules/antd')
      },
    },
    'autoprefixer': {},
  },
}

```

#### pxtoviewport方案

```js
module.exports = {
  plugins: {
    'tailwindcss/nesting': {},
    'tailwindcss': {},
    '@minko-fe/postcss-pxtoviewport': {
      viewportWidth: 375,
      convertUnitOnEnd: {
        sourceUnit: /[p|P][x|X]$/,
        targetUnit: 'px',
      },
      exclude(file) {
        return file.includes('node_modules/antd')
      },
    },
    'autoprefixer': {},
  },
}

```

#### 响应式 + 自适应

一种奇怪的组合，但有可能真的会遇到这种需求。此时我们可以这样做：

##### 第一步

正常如上配置 pxtorem / pxtoviewport

##### 第二步

如果不希望转换，就用大写PX。如果希望转化，就用小写px

```js
class="lg:text-[length:16PX] sm:text-[16px]"
// lg 16PX，不会被 pxtorem/pxtoviewport转化
// sm 16px，会被转化

```

##### 第三步

经过`pxtorem/pxtoviewport`的 `convertUnitOnEnd`处理后，把 `PX`转成 `px`

扩展
==

至此，我们已经有一个完整的SSR项目了

下面开始扩展功能

暗黑主题
----

暗黑主题基于tailwindcss的dark模式和antd5的动态主题能力

首先准备两套css变量

### light.css

```js
html {
  --color-primary: blue;
}

```

### dark.css

```js
html[class*='dark'] {
  --color-primary: green;
}

```

### tailwind dark配置

```js
const path = require('node:path')
const fs = require('fs-extra')
const { camelCase } = require('change-case')

const vars = fs.readFileSync(path.resolve(__dirname, './src/assets/style/vars/light.css'), 'utf8')

// 读取css变量名
const getVarsToken = (cssVars) => {
  const token = {}
  const varsList = cssVars?.match(/--[\w|-]+:[^;]+/g) || []

  varsList.forEach((item) => {
    const k = camelCase(item.split(':')[0]?.trim())

    const v = `var(${item.split(':')[0]?.trim()})`
    token[k] = v
  })

  return token
}

/** @type {import('tailwindcss').Config} */
module.exports = {
   darkMode: 'class',
    theme: {
    extend: {
      colors: token, // { colorPrimary: 'var(--color-primary)' }
    },
  },
}

```

这样我们就可以这样写tailwind了：

```js
class='text-colorPrimary'
```

### antd

#### 获取当前网页的主题

```js
export enum Theme {
  dark = 'dark',
  light = 'light',
}

const localStorageThemeKey = 'theme'

export function isDark() {
  return (
    localStorage[localStorageThemeKey] === Theme.dark ||
    (!(localStorageThemeKey in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)
  )
}

```

通过 `ConfigProvider`配置主题token

```js
import { Theme as antdTheme } from 'antd'
import { useSetState, useIsomorphicLayoutEffect } from 'ahooks'

export const cssVarsMap = { dark: {}, light: {} }

const vars = import.meta.glob('@/assets/style/vars/*.css', {
  as: 'raw',
  eager: true,
})

Object.keys(vars).forEach((css) => {
  const cssFileName = /(?<=/)[^/]*(?=.css)/.exec(css)![0]
  const token = getVarsToken(vars[css])
  cssVarsMap[cssFileName] = token
})

const Layout = () => {
 const [themeConfig, setThemeConfig] = useSetState({
    algorithm: antdTheme.defaultAlgorithm,
    token: {},
  })

  const [theme, setTheme] = useState<Theme>()

  useIsomorphicLayoutEffect(() => {
    setTheme(isDark() ? Theme.dark : Theme.light)
  }, [])


  useEffect(() => {
    if (theme) {
      setThemeConfig({
        token: cssVarsMap?.[theme],
        algorithm: theme === Theme.light ? antdTheme.defaultAlgorithm : antdTheme.darkAlgorithm,
      })
    }
  }, [theme])
  
  return <ConfigProvider
          theme={{
              algorithm: themeConfig?.algorithm,
              token: themeConfig?.token,
          }}
          >
          {children}
        </ConfigProvider>
}

```

至此，我们实现了antd的动态暗黑主题。但这时候还有一些小问题：

1. 网页加载的一瞬间如果客户端是暗黑模式，antd组件会有明显的颜色闪动
2. 我们没有在网页刚加载时设置html的class

这些问题说起来比较复杂，暂时跳过哈，有兴趣可以看仓库

国际化
---

在用户增长缓慢的今天，如果我们跳出破圈去外面看看，或许有新的机会

国际化就是为了更多新的机会

我们需要考虑三个国际化：

1. 文本国际化
2. antd组件国际化
3. dayjs国际化

### 文本国际化

i18next有非常丰富的社区生态

由于我们是SSR国际化，所以需要在服务端跟客户端语言同步，那么服务端就需要在收到客户端请求的时候判断客户端的语言。此时我们需要使用到 `i18next-http-middleware`

还是先把依赖装上

```
pnpm add i18next i18next-http-middleware i18next-browser-languagedetector react-i18next

```

#### i18next

##### 服务端

在服务端只用i18next来侦测语言，不需要locale资源

```js
import i18next from 'i18next'
import type { i18n as i18nType } from 'i18next'

const createI18nextInstance = () => {
  return i18next.createInstance({
    debug: false,
    fallbackLng: 'en',
  })
}

let serverI18next: i18nType

function getI18next() {
  if(!serverI18next) {
    serverI18next = createI18nextInstance().use(new i18nextMiddleware.LanguageDetector())
    serverI18next.init({ debug: false, resources: {} })
  }
  return serverI18next
}

```

server/index.ts

```js
import i18nextMiddleware from 'i18next-http-middleware'

const app = express()

app.use(i18nextMiddleware.handle(await getI18next()))

app.get('*', async (req, res, next) => {
  const url = req.originalUrl

  const pageContextInit = {
    urlOriginal: url,
    i18n: req.i18n, // 传给服务端渲染模板 _default.page.server.tsx
  }

  const pageContext = await renderPage<PageType.PageContext, {}>(pageContextInit)
})

```

此时服务端就能根据 `req.i18n`获取到客户端语言进行相应处理了

##### 客户端和服务端渲染

服务端拿到客户端语言后，也需要注水相应的语言。**此时服务端跟客户端语言已经一致了，那么服务端就可以使用客户端的i18next实例进行SSR渲染了**

完整的i18next 初始化代码

```js
import type { i18n as i18nType } from 'i18next'
import i18next from 'i18next'
import { getBase } from '@root/shared'

export const lookupTarget = 'i18next'

export const fallbackLng = 'en'

const createI18nextInstance = () => {
  return i18next.createInstance({
    debug: false,
    nsSeparator: '.',
    keySeparator: '.',
    interpolation: {
      escapeValue: false,
    },
    fallbackLng,
  })
}

let clientI18next: i18nType

let serverI18next: i18nType

export async function getI18next(server?: boolean) {
  const _i18n: i18nType = createI18nextInstance()
  if (server) {
    if (!serverI18next) {
      const i18nextMiddleware = (await import('i18next-http-middleware')).default
      serverI18next = _i18n.use(new i18nextMiddleware.LanguageDetector({}, {}))
      serverI18next.init({ debug: false, resources: {} })
    }
    return serverI18next
  } else {
    if (!clientI18next) {
      const resourcesOrigin = import.meta.glob('./*/index.ts', {
        eager: true,
        import: 'default',
      })

      const resources = {}

      Object.keys(resourcesOrigin).forEach((k) => {
        const dir = /./(.+)//.exec(k)![1]
        resources[dir] = resourcesOrigin[k]
      })

      const LanguageDetector = (await import('i18next-browser-languagedetector')).default

      const { initReactI18next } = await import('react-i18next')

      clientI18next = _i18n.use(LanguageDetector).use(initReactI18next)

      clientI18next.init({
        debug: false,
        resources,
        ns: Object.keys(resources[fallbackLng]),
        defaultNS: Object.keys(resources[fallbackLng])[0],
        fallbackLng,
        detection: {
          order: [
            'querystring',
            'cookie',
            'localStorage',
            'sessionStorage',
            'navigator',
            'htmlTag',
            'path',
            'subdomain',
          ],
          lookupFromPathIndex: getBase()
            ?.split('/')
            .filter((t) => !!t).length,
          caches: ['localStorage', 'sessionStorage', 'cookie'],
          lookupLocalStorage: lookupTarget,
          lookupSessionStorage: lookupTarget,
          lookupCookie: lookupTarget,
        },
      })
    }
    return clientI18next
  }
}

if (import.meta.hot) {
  import.meta.hot.accept((newModule) => {
    if (newModule) {
      i18next.reloadResources()
      console.log('🌀 i18next reload all resources')
    }
  })
}

```

服务端渲染/客户端渲染相同入口：

```js
import { I18nextProvider } from 'react-i18next'

async function createApp(pageContext: PageType.PageContext) {
  const { locale } = pageContext

  const i18n = await getI18next() // 获取客户端i18n实例，其中包含语言资源

  i18n.changeLanguage(locale)

  return (
    <I18nextProvider i18n={i18n}>
      <Layout>
        <Page {...pageProps} />
      </Layout>
    </I18nextProvider>
  )
}

```

#### react-i18next

在 i18next 初始化的时候使用到了 react-i18next，它带来的能力是SSR(I18nextProvider)以及`hook`

可以很方便的在组件中使用翻译了

```js
import { useTranslation } from 'react-i18next'

const { t } = useTranslation()

t('namespace.key')

```

##### 国际化 vscode插件

至此，国际化已经可以使用。为了更方便看到国际化的结果，我们可以使用vscode插件：`lokalise.i18n-ally`

###### 配置

.vscode/setting.json

```js
{
  "i18n-ally.localesPaths": ["locales"],
  "i18n-ally.keystyle": "nested",
  "i18n-ally.enabledParsers": ["json"],
  "i18n-ally.enabledFrameworks": ["react", "i18next"],
  "i18n-ally.namespace": true,
  "i18n-ally.pathMatcher": "{locale}/{namespaces}.json",
  "i18n-ally.displayLanguage": "en",
  "i18n-ally.sourceLanguage": "en",
  "i18n-ally.usage.scanningIgnore": ["**/*.js"],
}

```

配好后我们可以看到如下效果：

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/782c5c89dc944020ac5db882fb117c86~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.image)

项目地址
----

[github仓库地址](https://link.juejin.cn/?target=https%3A%2F%2Fgithub.com%2Fhemengke1997%2Fvite-react-ssr-boilerplate "https://github.com/hemengke1997/vite-react-ssr-boilerplate")

[vercel在线地址](https://link.juejin.cn/?target=https%3A%2F%2Fvite-react-ssr-boilerplate-hemengke1997.vercel.app%2F "https://vite-react-ssr-boilerplate-hemengke1997.vercel.app/")（比较慢，请耐心）
