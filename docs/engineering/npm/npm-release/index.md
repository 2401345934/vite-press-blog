---
createTime: 2022/11/16
tag: '工程化,npm'
---
# npm plubilsh 发包

前言
--

> 学会发包可以避免我们在项目开发中重复造轮子的现象；当我们开发了通用的组件或者工具库后可以将其发布到`npm`上，这样在我们后续有同样需求的时候就可以直接下载下来用了，是不是灰常的的灵性。不知道怎么发包的小伙伴可以跟着我从0到1的发布一个包（发包流程跟技术框架和打包工具没有必然的联系，可根据自身情况进行技术选型）

技术栈
---

* [Vite](https://link.juejin.cn/?target=https%3A%2F%2Fcn.vitejs.dev%2F "https://cn.vitejs.dev/")
* [React](https://link.juejin.cn/?target=https%3A%2F%2Freactjs.org%2F "https://reactjs.org/")
* [TypeScript](https://link.juejin.cn/?target=https%3A%2F%2Fwww.tslang.cn%2Findex.html "https://www.tslang.cn/index.html")
* [Less](https://link.juejin.cn/?target=https%3A%2F%2Fless.bootcss.com%2F "https://less.bootcss.com/")
* [Npm](https://link.juejin.cn/?target=https%3A%2F%2Fwww.npmjs.com%2F "https://www.npmjs.com/")

操作流程
----

#### 1\. 准备项目工程并编写组件

1. 创建一个基础模板（这里我通过`vite`创建一个`react`模板，`node`版本要求：14.18+，16+ ）

```js
npm: npm create vite@latest

or

yarn: yarn create vite
```

然后根据命令行提示输入项目名称、选择框架、选择语言  
我这边选择的是：`React`和`TypeScript`

2. 项目创建后先安装依赖

```js
npm: npm install
npm: npm install less less-loader -D

or

yarn: yarn
yarn: yarn add less less-loader -D
```

3. 改造模板（可根据个人习惯改造）

* 删除样式文件`App.css`和`index.css`
* 在`assets`目录创建`styles`目录用于存放样式
* 在`/assets/styles`新建`index.less`文件，所有样式都统一从这里导出
* 在`src`目录下新建`components`目录用于编写组件
* 在`/src/components`目录下新建`index.ts`文件，所有组件都统一从这里导出
* 跟目录下新建`index.d.ts`类型文件
* 改造`main.tsx`
* 改造`App.tsx`

类型文件`index.d.ts`

```js
import { ReactNode } from "react"

export declare type XButtonType = {
    children: string | ReactNode
    primaryColor?: string
    onClick?: () => void
}
```

`main.tsx` 改造后

```tsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
// 引入项目所需样式
import './assets/styles/index.less'
// 导出组件
export * from './components/index'
if (mode !== 'production') {
  // <App /> 组件里面可以放我们的组件测试代码 所以开发环境这一步是必要的
  // 但是生产环境渲染节点会显得多余 所以生产环境不需要这一步（主要是react18+ createRoot不能使用多次，否则开发者使用该包时控制台会报警告）
  ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <App />
  )
}
```

`App.tsx` 改造后

```js
import { XButton } from "./components"

function App() {
  return (
    <div className="App">
      <XButton>测试</XButton>
    </div>
  )
}

export default App
```

#### 2\. 配置vite.config.ts

1. 下载`path`

```js
npm: npm install path -D

or

yarn: yarn add path -D
```

2. 配置`vite.config.ts`

```js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

export default defineConfig({
  plugins: [react()]
  build: {
    lib: {
      // 打包入口
      entry: resolve('src', 'main.tsx'),
      name: 'x-button',
      // 文件名称
      fileName: 'index',
    },
    rollupOptions: {
      // 确保外部化处理那些你不想打包进库的依赖
      external: ['react', 'react-dom'],
      output: {
        // 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
        globals: {
            react: 'React',
        },
      },
    },
    // 打包输出目录
    outDir: 'lib/dist', 
  },
})
```

3. 执行打包命令

```js
npm: npm run build

or 

yarn: yarn build
```

4. 根目录会生成一个`lib`目录，这时打包工作已经完成，不过还有几个坑我们后面来填

#### 3\. 配置npm

1. 终端执行命令

```js
npm init
```

2. 根据命令行提示输入对应信息

* `package name`: 包名，发到`npm`上的名称
* `version`: 版本号
* `description`：项目描述（选填）
* `entry point`： 入口文件路径(路径就是我们打包后的目录文件 `./lib/dist/index.js`)
* `git repository`：仓库地址（选填）
* `keywords`： 关键词（选填）
* `author`：作者信息（选填）
* `license`：开源协议（默认`ISC`，关于开源协议可以自行了解）

3. 修改`package.json`部分配置

```json
{
  "name": "xz-test-button",
  "private": false, // true改为false
  "version": "0.0.1",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0"
  },
  "devDependencies": {
    "@types/react": "^18.0.22",
    "@types/react-dom": "^18.0.7",
    "@vitejs/plugin-react": "^2.2.0",
    "less": "^4.1.3",
    "less-loader": "^11.1.0",
    "path": "^0.12.7",
    "typescript": "^4.6.4",
    "vite": "^3.2.2"
  },
  "types": "./index.d.ts",
  "description": "按钮",
  "main": "./lib/dist/index.js",
  "module": "./lib/dist/index.js",
  "exports": {
    ".": {
      "import": "./lib/dist/index.js",
      "require": "./lib/dist/index.umd.cjs"
    }
  },
  "files": [
    "lib",
    "index.d.ts"
  ],
  "author": "",
  "license": "ISC"
}
```

经过上面操作我们的准备工作已经完成

#### 4\. 发布

1. 没有`npm`账号的可以先去[npm官网](https://link.juejin.cn/?target=https%3A%2F%2Fwww.npmjs.com%2F "https://www.npmjs.com/")注册一个或者通过`npm adduser`命令注册
2. 完成上面步骤后我们先登录npm账号，执行`npm login`命令进行登录，根据命令行提示输入用户名、密码、邮箱、邮箱验证码
3. 登录完成后我们执行`npm publish`命令进行发布
    * 这里发包可能会出现`404或者403`，这时先确保是否登录成功，然后再确认当前项目名称是否和npm已有的包冲突，更换名字后再进行尝试
    * 每次发包需要保证当前版本号在此之前没有被使用（发布）过
4. 当终端没有报错且最后一行显示包名和版本号就表示发布成功
    * 如 `xz-test-button@0.0.1`
    * 可以去`npm`官网去搜索自己的包名或者在自己的包列表查看
5. 完成以上操作后一个`npm`包就算是发布成功了，但是还没完...

#### 5\. 使用

1. 在另一个项目中`npm install 包名`或者`yarn add 包名`
2. 使用方式

```js
import { XButton } from "xz-test-button";

function App() {
  return (
    <div className="App">
      <XButton>测试</XButton>
    </div>
  );
}

export default App;
```

3. 使用中的问题：

* 样式没加载 ![测试图片](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/edf458e43718410fa28ec1702a34e1ff~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.image?)
* 使用问题：类型问题 ![测试图片](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e09a48325d974ef996e9a2be941cc4c9~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.image?)

#### 6\. 填坑

虽然包发布成功了，但是前面说过还有一些坑需要填，这些坑刚刚也看见了，都是在使用的时候出现的

1. 样式问题

* 将包下载到另一个项目使用会发现组件结构是存在的就是没有样式，这是因为`vite`打包的时候虽然将样式打包到输出目录了，但是在`js`文件中没有引用`css`文件；
* 解决方案：
  * 可以手动将`style.css`引入到`index.js`中（每次打包都需要引一次，比较麻烦，不推荐）
  * 通过`vite-plugin-libcss`插件自动引入（推荐），先下载依赖：

```js
npm: npm install vite-plugin-libcss -D
or 
yarn: yarn add vite-plugin-libcss -D
```

改造`vite.config.ts`文件

```js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'
import libCss from 'vite-plugin-libcss';
export default defineConfig({
  plugins: [react(), libCss()],
  ... 不变 ...
})
```

2. 问题：模块“"xxx"”没有导出的成员“x”或者找不到“xxx”的类型声明文件

* 因为项目是`TypeScript`开发的所以我们需要模块导出，通过改造`index.d.ts`文件来解决

```js
import React, { ReactNode } from "react"

export declare type XButtonType = {
    children: string | ReactNode
    primaryColor?: string
    onClick?: () => void
}

declare module 'xz-test-button' {
    export function XButton(props: XButtonType): JSX.Element
}
```

然后重新打包即可

#### 7\. 更新包

1. 首先更新包版本`npm version patch`（因为我们是修复bug，所以我们只需更新修复版本号）
2. 再次执行发包命令`npm publish`
3. 最后在使用这个包的项目中重新下载一次这个包就不会出现类型问题和样式问题了
