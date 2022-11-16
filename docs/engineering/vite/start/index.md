---
createTime: 2022/11/16
tag: '工程化,vite'
---

# Vite 入门篇

**本文为稀土掘金技术社区首发签约文章，14天内禁止转载，14天后未获授权禁止转载，侵权必究！**

相信大部分兄弟都体验过 Vite 了，知道它很快。但你知道它为什么快，相比 Webpack 有哪些不同吗？今天咱们就来全面了解一下 Vite ，尤其适合新手兄弟。创作不易，如果有触及到你的知识盲区，还请点赞支持一下！

什么是构建工具
-------

很多人对构建工具没有什么概念，只知道是用来打包的。那么到底什么是构建工具呢？

大家都知道浏览器只支持 Html、CSS、JavaScript，但一个企业级项目可能会用到各种各样的前端技术，如 Less、Sass、TS、Vue组件、语法降级、体积优化等，这时候我们就需要相应的工具去处理这些内容：

* 使用 `less-loader` / `sass-loader` 处理 less / sass
* 使用 `tsc` 将 typescript 转换为 javascript
* 使用 `vue-complier` 将 vue 组件模板转换为 render 函数
* 使用 `babel` 将 es 的新语法转换为旧版浏览器认识的语法
* 使用 `uglifyjs` 将我们的代码压缩成体积更小的文件
* ......

我们可以手动把代码挨个处理一遍，但这样效率非常低，当我们稍微修改一点代码，这个流程又要重新走一遍，非常麻烦。有个神奇的东西，可以把以上工具集成到一起，整个流程交给它自动处理，而且当代码发生变化时，自动帮我们重新走一遍，这个东西就叫做构建工具。当然构建工具做的事情远不止于此，比如：

1. 模块化开发支持：支持直接从 node\_modules 里引入代码
2. 处理代码兼容性：比如 less、sass、ts、语法降级
3. 提高项目性能：压缩文件、代码分割
4. 优化开发体验：热更新、跨域问题

构建工具减轻了我们的心智负担，让我们不用关心我们写的代码如何在浏览器运行，只需要关心代码怎么写就可以了。市面上主流的构建工具有 Webpack、Vite、esbuild、Rollup、Parcel，以及最近刚出的 turbopack ，但目前最流行的依然是 `Webpack` 和 `Vite` 。

Vite 相较于 Webpack 的优势
--------------------

当项目体积越来越庞大时，构建工具需要处理的代码量也呈指数级增长，包含数千个模块的项目也是相当普遍。类似 Webpack 的构建工具就会遇到性能瓶颈：通常需要几分钟项目才能启动起来。即使使用热更新（HMR），也可能需几秒，甚至十几秒页面才能更新。不知道大家目前的项目怎么样，反正我们公司稍微大一点的 Vue2 项目是真的慢，等的捉急。这种情况已经很大程度影响到了我们的开发效率和摸鱼时间。

Webpack 有没有办法进行优化呢？很难。Webpack 先递归分析各模块依赖关系-构建依赖图谱，然后进行打包，再启动本地服务器。而且 Webpack 支持多种模块化规范，比如 `CommonJS` 、`ES-Module` ，它一开始就要统一模块化代码，将所有的依赖全部处理一遍。整个流程如下图：

![vite1.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/be2c6b840af7464a94ac2e36b3616b0f~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.image?)

即使使用按需加载，也有一系列工作需要做，所以 Webpack 很难有优化空间。

那么 Vite 为什么能解决这个问题呢？

1. 底层语言。Vite 使用 `esbuild` 预构建依赖。`esbuild` 使用 Go 编写，比用 JS 编写的打包器预构建依赖快 10-100 倍。
2. 先启动服务器，再按需请求模块并编译。Vite 利用的是现代浏览器本身支持 `ES-Module` 这个特性，直接向依赖的模块发出请求。Vite 启动时不需要分析模块之间的依赖关系，也不用打包，项目越大，优势越明显。

这个是 Vite 的启动过程：

![vite2.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/4401110c37614e0ca9cb9401b5b6e769~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.image?)

这样大家应该看得出来 Vite 为什么快了吧！

依赖预构建
-----

上面提到了依赖预构建，可能很多兄弟对这个不太理解，这里我也来讲一下。现代浏览器已经支持 `ES-Module` ，但导入模块只能用相对路径或绝对路径，直接使用模块名称的方式是行不通的：

```js
// main.js
// 假设我们已经安装了 lodash 模块
import a from './a.js' // 支持
import b from '/b.js' // 支持
import _ from 'lodash' // 报错
```

依赖预构建就可以很好的解决这个问题。Vite 首先会找到依赖的模块，然后调用 `esbuild`，将 `CommonJS` 等其他规范的代码转换成 `ES-Module` 规范，然后把它放在 `node_modules/.vite/deps` 目录下，接着修改相应的引入路径。

由于浏览器是通过 HTTP 来请求模块文件的，一旦模块的依赖关系比较多的话，就会发起很多个网络请求。例如，`lodash-es` 内置模块超过 600 个，它们之前相互导入。当我们执行以下代码时，浏览器会同时发出 600 多个 HTTP 请求！大量的请求造成网络堵塞，导致页面的加载非常的慢。

```js
import { debounce } from 'lodash-es'
```

这时候还得靠依赖预构建，预构建将 `lodash-es` 整体转换为一个模块，这样我们就只需要发起一个 HTTP 请求了！

总结一下，依赖预构建为我们解决了以下三个头痛的问题：

1. 兼容其他规范。不同的第三方依赖包会有不同的导出格式（如 `CommonJS` 规范）。
2. 重写导入路径。例如 `lodash` 或重写为 `/node_modules/.vite/deps/lodash.js?v=fef37e66` ，以便浏览器能够正确导入。
3. 网络性能优化。Vite 会将内部有众多依赖关系的 `ES-Module` 模块转换为一个模块，提高页面的加载性能。

对不同内容的处理
--------

学习一项技术，我们最好单独使用它。抛开脚手架工具，Vite 使用起来也非常的简单，直接在项目中安装 `vite` ，给个配置就可以了。当然不给也可以，Vite 会使用内置的默认配置：

```js
npm install vite -D
```

```js
// vite.config.js
import { defineConfig } from 'vite'

export default defineConfig({
  // ...
})
```

为了方便使用，可以在 package.json 添加启动和打包命令。

```js
"scripts": {
  "dev": "vite",
  "build": "vite build"
},
```

然后在根目录下新建一个 `index.html`，`npm run dev` 项目就跑起来了！

### 对 CSS 的处理

**CSS Modules**

在不同模块中定义相同类名，会导致样式被覆盖，这时候就要用到 CSS module 。以 `.module.css` 结尾的文件都被认为是一个 `CSS modules 文件`。导入这样的文件会返回一个相应的对象：

```js
/* example.module.css */
.red {
  color: red;
}
```

```js
// main.js
import example from './example.module.css'
console.log(example) // { red: '_red_te83z_1' }
document.getElementById('foo').className = example.red
```

**CSS 预处理器**

Vite 同时提供了对 `.scss`，`.sass`，`.less`，`.styl` 和 `.stylus` 文件的内置支持，仅需安装相应的预处理器就可以了：

```js
# .less
npm install less -D

# .scss and .sass
npm install sass -D

# .styl and .stylus
npm install stylus -D
```

感觉这块要比 webpack 简单的多，webpack 需要给不同类型的文件配置不同的 `loader` 去处理，而 Vite 内部直接帮我们配置好了。如果使用的是 Vue 单文件组件，可以通过 `<style lang="less">` 自动开启。

**PostCSS**

PostCSS 也是用来处理 CSS 的，只不过它更像是一个工具箱，可以添加各种各样的插件来处理 CSS 。像我们经常遇到的样式兼容性问题，如高级 CSS 语法的降级、前缀补全等，都可以通过 PostCSS 来解决。

Vite 对 PostCSS 有良好的支持，我们只需安装需要使用的插件就可以了。

```
npm install postcss-preset-env -D
```

`postcss-preset-env` 是一个预设环境插件，包含高级 CSS 语法的降级、前缀补全等众多功能。接下来我们在 `vite.config.js` 中配置一下：

```js
// vite.config.js
import { defineConfig } from 'vite'
import postcssPresetEnv from 'postcss-preset-env'

export default defineConfig({
  css: {
    postcss: {
      plugins: [postcssPresetEnv()]
    }
  }
})
```

然后我们来写一些特别的样式：

```js
/* index.css */
.content {
  width: clamp(100px, 30%, 200px);
  user-select: none;
}

```

```js
// main.js
import './index.css'
```

打开浏览器，可以看到 CSS 已经帮我们处理好了：

![65d5424bcd65769abee4f8bd790424e.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/544ce551bbb84765bde169586ff4da1d~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.image?)

整体来说 PostCSS 还是非常实用的，可以帮助我们处理各种各样的 CSS 问题。

### 对静态资源的处理

1. 将资源引入为 URL 。默认情况下引入一个静态资源，会返回这个资源的 URL 路径，也就是绝对路径。

    ```js
    import imgUrl from './img.png'
    console.log(imgUrl) // /src/img.png
    document.getElementById('hero-img').src = imgUrl
    ```

    我们可以通过添加后缀的方式，修改文件的引入方式。默认的引入方式等同于添加 `?url` 后缀。

    ```js
    import imgUrl from './img.png?url'
    ```

2. 将资源引入为字符串。使用 `?raw` 后缀可以将资源作为字符串引入，这个字符串其实就是源文件信息。

    ```js
    import imgUrl from './img.png?raw'
    console.log(imgUrl) // 源文件信息
    document.getElementById('hero-img').src = imgUrl
    ```

3. 导入脚本作为 Worker 。js 脚本可以通过 `?worker` 或 `?sharedworker` 后缀导入为 web worker。

    ```js
    // worker
    import Worker from './shader.js?worker'
    const worker = new Worker()
    ```

    ```js
    // sharedworker
    import SharedWorker from './shader.js?sharedworker'
    const sharedWorker = new SharedWorker()
    ```

### 对 JSON 的处理

JSON 文件可以被直接导入。同时也支持具名导入，帮助我们更好地利用 treeshaking ：

```js
// 导入整个对象
import json from './example.json'
// 对一个根字段使用具名导入 有效帮助 treeshaking！
import { field } from './example.json'
```

### 对 Vue 的处理

Vite 为 Vue 提供第一优先级支持，直接使用相应的插件就好了：

* Vue 3 支持：[@vitejs/plugin-vue](https://link.juejin.cn/?target=https%3A%2F%2Fgithub.com%2Fvitejs%2Fvite%2Ftree%2Fmain%2Fpackages%2Fplugin-vue "https://github.com/vitejs/vite/tree/main/packages/plugin-vue")
* Vue 3 JSX 支持：[@vitejs/plugin-vue-jsx](https://link.juejin.cn/?target=https%3A%2F%2Fgithub.com%2Fvitejs%2Fvite%2Ftree%2Fmain%2Fpackages%2Fplugin-vue-jsx "https://github.com/vitejs/vite/tree/main/packages/plugin-vue-jsx")
* Vue 2.7 支持：[@vitejs/vite-plugin-vue2](https://link.juejin.cn/?target=https%3A%2F%2Fgithub.com%2Fvitejs%2Fvite-plugin-vue2 "https://github.com/vitejs/vite-plugin-vue2")
* Vue <2.7 支持：[underfin/vite-plugin-vue2](https://link.juejin.cn/?target=https%3A%2F%2Fgithub.com%2Funderfin%2Fvite-plugin-vue2 "https://github.com/underfin/vite-plugin-vue2")

```js
// vite.config.js
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()]
})
```

### 对 TS 的处理

Vite 天然支持引入 `.ts` 文件。Vite 使用 `esbuild` 将 TypeScript 转译到 JavaScript，约是 `tsc` 速度的 20~30 倍，同时 HMR 热更新也是非常的快 。

Vite 仅执行 `.ts` 文件的转译工作，并不执行任何类型检查。换句话来说，即使 IDE 提示报错，也不影响正常开发和生成环境打包。这样肯定是不行的，不然很难对代码进行有效约束。我们可以使用插件实现这个功能：

```js
# 用于检查的插件
npm install vite-plugin-checker -D
# typescript 是 vite-plugin-checker 的依赖
npm install typescript -D

```

然后在根目录创建 tsconfig.json 文件：

```js
// tsconfig.json
{
  "compilerOptions": {
    "skipLibCheck": true // 是否跳过 node_modules 检查
  }
}

```

这样 TS 的报错信息就会在命令行和页面上显示出来，不修正就无法继续往下开发了。

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/29c93f22acb54fb398d2f0099b8b3662~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.image?)

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e320dc6030ee4f51a64a9d496b601480~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.image?)

如果要在类型检查不通过时阻止生产环境打包，直接在 `build` 命令中添加一个指令即可：

```
// package.json
"scripts": {
  "dev": "vite",
  "build": "tsc --noEmit && vite build"
},

```

生产环境构建
------

尽管原生 `ES-Module` 现在得到了广泛支持，但由于嵌套导入会导致额外的网络往返，在生产环境中发布未打包的 `ES-Module` 效率仍然非常低（即使使用 HTTP/2）。为了在生产环境中获得最佳的加载性能，更好的利用 tree-shaking、懒加载和 chunk 分割等，Vite 把生产环境构建全权交给了 `Rollup` 。

默认情况下，Vite 的目标是支持 `原生 ESM script 标签` 、`支持原生 ESM 动态导入` 和 `import.meta` 的现代浏览器：

* Chrome >=87
* Firefox >=78
* Safari >=13
* Edge >=88

如果要兼容旧版本的浏览器，可以使用 Vite 自带的 `@vitejs/plugin-legacy` 插件。

```js
# 必须安装 Terser，@vitejs/plugin-legacy 会使用 Terser 进行压缩
npm install terser -D

```

```js
// vite.config.js
import legacy from '@vitejs/plugin-legacy'

export default {
  plugins: [
    legacy({
      // defaults 是 Browserslist 推荐的值
      targets: ['defaults', 'not IE 11']
    })
  ]
}

```

同时我们还可以通过 `构建配置选项` 自定义构建过程，比如，通过 `build.rollupOptions` 直接调整底层的 `Rollup 选项` ，使用 `build.assetsInlineLimit` 修改图片转 base64 的阈值。

```js
// vite.config.js
export default defineConfig({
  build: {
    assetsInlineLimit: 4096, // 4kb
    rollupOptions: {
      // https://rollupjs.org/guide/en/#big-list-of-options
    }
  }
})

```
