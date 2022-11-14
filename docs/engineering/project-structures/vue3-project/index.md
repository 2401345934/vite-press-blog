---
createTime: 2022/11/05
tag: '工程化,项目搭建,Vue,Vite'
---

# vue3+vite+ts+vuex+vue-router+Element-plus+tailwindcss+mock 搭建完整项目

## 一，介绍

Vite（法语单词，“快” 的意思）是一种新型的前端构建工具

最初是配合 Vue3.0 一起使用的，后来适配了各种前端项目，目前提供了 Vue、React、Preact 框架模板

vite —— 一个由 vue 作者尤雨溪开发的 web 开发工具，它具有以下特点：

* 快速的冷启动
* 即时的模块热更新
* 真正的按需编译 从作者在微博上的发言：

> Vite，一个基于浏览器原生 ES imports 的开发服务器。利用浏览器去解析 imports，在服务器端按需编译返回，完全跳过了打包这个概念，服务器随起随用。同时不仅有 Vue 文件支持，还搞定了热更新，而且热更新的速度不会随着模块增多而变慢。针对生产环境则可以把同一份代码用 rollup 打。虽然现在还比较粗糙，但这个方向我觉得是有潜力的，做得好可以彻底解决改一行代码等半天热更新的问题

中可以看出 vite 主要特点是基于浏览器 native 的 ES module 来开发，省略打包这个步骤，因为需要什么资源直接在浏览器里引入即可

Vite 和 webpack的差别

* 从底层原理上来说，Vite是基于esbuild预构建依赖。而esbuild是采用go语言编写，因为go语言的操作是纳秒级别，而js是以毫秒计数，所以vite比用js编写的打包器快10-100倍。

* 从启动方式来说，vite在启动的时候不用打包，所以不用分析模块与模块之间的依赖关系，不用进行编译，就是一种按需编译的方式，和UI框架的那种按需导入类似，当浏览器请求某个模块的时候根据需要对模块内容进行编译，再按需动态编译可以缩减编译时间

* vite相关生态没有webpack完善，vite可以作为开发的辅助。

二，搭建项目
======

根据Vite官网介绍，我们可以使用npm或yarn来初始化Vite项目，并且Node.js的版本需要 >= 12.0.0。

2.1 创建项目
--------

使用 NPM方式

```
npm init vite@latest 项目名

```

使用 Yarn方式

```
yarn create vite 项目名

```

2.2 集成Vue-Router
----------------

使用 NPM方式

```
npm install vue-router@next --save

```

使用 Yarn方式

```
yarn add vue-router@next --save

```

安装完成之后，在src目录下创建一个文件夹router/index.ts，然后添加如下一些配置：

```
//router目录下的index.js
import { createRouter, createWebHashHistory, createWebHistory } from 'vue-router'

const routes = [
  { path: '/', component: () => import('../components/Home.vue')   
]

const router = createRouter({
  // hash 或者 history 模式
  // history: createWebHashHistory(),
  history: createWebHistory(),
  routes
})
// 全局路由守卫的方法跟vue-router3一样
//路由全局前置守卫
router.beforeEach((to,from,next)=>{
  console.log('路由全局前置守卫', to, from);
  next()
})
//路由全局后置守卫
router.afterEach((to,from,next)=>{
  console.log('路由全局后置守卫', to, from);
  next()
})

export default router


```

然后，我们在main.ts文件中引入Vue-Router，如下所示。

```
import router from './router';
createApp(App).use(router).mount("#app");

```

### 2.2.2 新增路由页面

为了方便演示，我们再新增两个路由页面。熟悉，创建views文件夹，把需要展示的页面创建完成。然后，我们在router/index.ts注册我们新增的页面，如下所示。

```
routes: [
        {
            path: "/home",
            name: "Home",
            alias: "/",
            component: () => import("../views/Home.vue")
        },
    ]

```

接下来，我们再修改一下App.vue的代码，如下所示。

```
<template>
  <router-link to="/home">Home</router-link>
  <router-link to="/about">About</router-link>
  <router-view></router-view>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'App'
})
</script>

```

接下来启动服务，就可以看到所配置的页面了，并且点击还能够跳转到对应的页面。

2.3 集成Vuex
----------

Vuex 是一个专为 Vue.js 应用程序开发的状态管理模式。它采用集中式存储管理应用的所有组件的状态，并以相应的规则保证状态以一种可预测的方式发生变化。Vuex 也集成到 Vue 的官方调试工具 devtools extension (opens new window)，提供了诸如零配置的 time-travel 调试、状态快照导入导出等高级调试功能。

安装vuex

```
npm install vuex@next --save

```

安装完成之后，需要先初始化Vuex。首先，创建一个store/index.ts文件，添加如下代码。

```
import { createStore } from "vuex";

const store = createStore({
  modules: {
    home: {
      namespaced: true,
      state: {
        count: 1
      },
      mutations: {
        add(state){
          state.count++;
        }
      }
    }
  }
})

export default store;

```

上面的代码作用就是实现一个简单的自加功能。然后，我们在main.ts文件中引入Vuex

```
import { createApp } from 'vue';
import App from './App.vue';

import store from "./store";

const app = createApp(App);
app.use(store);
app.mount('#app');


```

完成上述操作之后，接下来我们给Vuex编写一个测试代码看Vuex是否有效。修改Home.vue的代码如下。

```
<template>
  <h1>Home Page</h1>
  <h2>{{count}}</h2>
  <button @click="handleClick">click</button>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
import { useStore } from 'vuex';

export default defineComponent({
  setup () {
    const store = useStore();
    const count = computed(() => store.state.home.count);
    const handleClick = () => {
      store.commit('home/add');
    };
    return {
      handleClick,
      count
    };
  }
})
</script>

```

上面的代码实现的就是一个简单的自加功能，和默认示例工程的效果事一样的，只不过我们使用Vuex。

2.4 集成element-plus
------------------

Element Plus是由饿了么大前端团队开源出品的一套为开发者、设计师和产品经理准备的基于 Vue 3.0 的组件库，可以帮助开发者快速的开发网站，如果你使用过element-ui，那么可以快速的过渡到element-plus。除了element-plus，支持Vue 3.0 的UI框架还有很多。

首先，在项目的根目录下安装element-plus，命令如下：

```
npm install element-plus --save

```

### 2.4.1 引入element-plus

我们可以引入整个 element-plus，也可以根据需要仅引入部分组件。如果是全部引入，只需要在main.js 添加如下代码即可。

```
import { createApp } from 'vue'
import ElementPlus from 'element-plus'
const app = createApp(App)
app.use(ElementPlus)
app.mount('#app')

```

如果为了减小项目的包体积，那么只需要引入对应的功能组件即可。首先，安装 babel-plugin-component插件，如下所示。

```
npm install babel-plugin-component --save

```

然后，修改.babelrc的配置内容。

```
{
  "plugins": [
    [
      "component",
      {
        "libraryName": "element-plus",
        "styleLibraryName": "theme-chalk"
      }
    ]
  ]
}

```

如果我们只需要引入部分组件，比如 Button 和 Select组件，那么需要在 main.ts 中引入对应的组件即可，如下所示。

```
import { createApp } from 'vue'
import { store, key } from './store';
import router from "./router";
import { ElButton, ElSelect } from 'element-plus';
import App from './App.vue';
import './index.css'

const app = createApp(App)

  app.use(ElButton)
  app.use(ElSelect)

app.use(store, key)
app.use(router)
app.mount('#app')

```

### 2.4.2 添加配置

引入 Element Plus后，我们可以添加一个全局配置对象。该对象目前支持 size 与 zIndex 字段。size 用于改变组件的默认尺寸，zIndex 设置弹框的初始 z-index。以下是两种不同的引入方式： 全局引入：

```
import { createApp } from 'vue'
import ElementPlus from 'element-plus';
import App from './App.vue';

const app = createApp(App)
app.use(ElementPlus, { size: 'small', zIndex: 3000 });

```

按需引入：

```
import { createApp } from 'vue'
import { ElButton } from 'element-plus';
import App from './App.vue';

const app = createApp(App)
app.config.globalProperties.$ELEMENT = option
app.use(ElButton);

```

### 2.4.3 配置proxy 和 alias

如果要在Vite中使用alias别名配置和proxy代理配置，那么需要在vite.config.ts文件中进行单独的配置。

```
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import styleImport from 'vite-plugin-style-import'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    styleImport({
      libs: [
        {
          libraryName: 'element-plus',
          esModule: true,
          ensureStyleFile: true,
          resolveStyle: (name) => {
            return `element-plus/lib/theme-chalk/${name}.css`;
          },
          resolveComponent: (name) => {
            return `element-plus/lib/${name}`;
          },
        }
      ]
    })
  ],

  /**
   * 在生产中服务时的基本公共路径。
   * @default '/'
   */
  base: './',
  /**
  * 与“根”相关的目录，构建输出将放在其中。如果目录存在，它将在构建之前被删除。
  * @default 'dist'
  */
  // outDir: 'dist',
  server: {
    // hostname: '0.0.0.0',
    host: "localhost",
    port: 3001,
    // // 是否自动在浏览器打开
    // open: true,
    // // 是否开启 https
    // https: false,
    // // 服务端渲染
    // ssr: false,
    proxy: {
      '/api': {
        target: 'http://localhost:3333/',
        changeOrigin: true,
        ws: true,
        rewrite: (pathStr) => pathStr.replace('/api', '')
      },
    },
  },
  resolve: {
    // 导入文件夹别名
    alias: {
      '@': path.resolve(__dirname, './src'),
      views: path.resolve(__dirname, './src/views'),
      components: path.resolve(__dirname, './src/components'),
      utils: path.resolve(__dirname, './src/utils'),
      less: path.resolve(__dirname, "./src/less"),
      assets: path.resolve(__dirname, "./src/assets"),
      com: path.resolve(__dirname, "./src/components"),
      store: path.resolve(__dirname, "./src/store"),
      mixins: path.resolve(__dirname, "./src/mixins")
    },
  }
})

```

其中，vite-plugin-style-import是一个可以按需引入样式的库。

2.5 集成 tailwindcss
------------------

### 安装

```
npm install -D tailwindcss@latest postcss@latest autoprefixer@lates

```

创建您的配置文件 接下来，生成您的 tailwind.config.js 和 postcss.config.js 文件：

```
npx tailwindcss init -p

```

这将会在您的项目根目录创建一个最小化的 tailwind.config.js 文件：

```
// tailwind.config.js
module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
}

```

这也将会创建一个包含已配置好的 tailwindcss 和 autoprefixer 的 postcss.config.js 配置文件：

```
// postcss.config.js
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}

```

配置 Tailwind 来移除生产环境下没有使用到的样式声明

在您的 tailwind.config.js 文件中，配置 purge 选项指定所有的 pages 和 components 文件，使得 Tailwind 可以在生产构建中对未使用的样式进行摇树优化。

```
  // tailwind.config.js
  module.exports = {
-   purge: [],
+   purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
    darkMode: false, // or 'media' or 'class'
    theme: {
      extend: {},
    },
    variants: {
      extend: {},
    },
    plugins: [],
  }

```

在您的 CSS 中引入 Tailwind 创建 ./src/index.css 文件 并使用 @tailwind 指令来包含 Tailwind的 base、 components 和 utilities 样式，来替换掉原来的文件内容。

```
/* ./src/index.css */
@tailwind base;
@tailwind components;
@tailwind utilities;

```

Tailwind 会在构建时将这些指令转换成所有基于您配置的设计系统生成的样式文件。

最后，确保您的 CSS 文件被导入到您的 ./src/main.js 文件中。

```
// src/main.js
import { createApp } from 'vue'
import App from './App.vue'
import './index.css'

createApp(App).mount('#app')

```

您已经完成了所有步骤！现在，当您运行 npm run dev, Tailwind CSS 就可以在您的 Vue 3 and Vite 项目中使用了。

2.6 集成mock.js
-------------

### 介绍

mock.js 官网：[mockjs.com/](https://link.juejin.cn/?target=http%3A%2F%2Fmockjs.com%2F "http://mockjs.com/")

目前的大部分公司的项目都是采用的前后端分离, 后端接口的开发和前端人员是同时进行的. 那么这个时候就会存在一个问题, 在页面需要使用大量数据进行渲染生成前, 后端开发人员的接口也许并没有写完, 作为前端的我们也就没有办法获取数据. 所以 前端工程师就需要自己按照接口文档模拟后端人员提供的数据, 以此进行页面的开发.

这个时候, Mock.js的作用就体现出来了, 在数据量较大的情况下, 我们不用一个一个的编写数据, 只需要根据接口文档将数据的格式填入, Mock.js就能够自动的按需生成大量的模拟数据. 且Mock.js提供了大量的数据类型, 包括文本, 数字, 布尔值, 日期, 邮箱, 链接, 图片, 颜色等.

### 使用

### ①下载

```
npm install mockjs

```

### ②引入

Mock.js暴露了一个全局的Mock对象, 我们只需要将Mock对象引入到文件中, 调用Mock对象的方法即可

CommonJS的引入方式

```
//CommonJS引入
let Mock = require('mockjs)

//调用Mock.mock()方法模拟数据
let data = Mock.mock({
'list|1-10': [{
  'id|+1': 1
}]
});
console.log(data);

```

ES6的引入方式

```
//ES6的引入方式
import Mock from 'mockjs'

let data = Mock.mock({
 // 属性 list 的值是一个数组，其中含有 1 到 10 个元素
'list|1-10': [{
        // 属性 id 是一个自增数，起始值为 1，每次增 1
  'id|+1': 1
}]
});
console.log(data);

```

Mock对象提供了4个方法, 分别是

* Mock.mock(),
* Mock.setup()
* Mock.valid,
* Mock.toJSONSchema()

一个工具库Mock.Random. 其中我们经常使用到的就是Mock.mock()和Mock.Random.

### ③Mock.js的规范

```
'list|1-10': [{
  'id|+1': 1
}]

```

上面的代码被称为数据模板, 用于告诉Mock.js生成什么样的数据, 其中数据模板中的每个属性由三部分构成: 属性名, 生成规则, 属性值:

**list** 为数据模板中的属性名; **1-10** 为生成规则(表示生成最少1个, 最多10个重复数据) **\[{'id|+1': 1}\]** 是属性值, 属性值中可以嵌套使用属性名和生成规则.

> 具体的生成规则参见: [github.com/nuysoft/Moc…](https://link.juejin.cn/?target=https%3A%2F%2Fgithub.com%2Fnuysoft%2FMock%2Fwiki%2FSyntax-Specification "https://github.com/nuysoft/Mock/wiki/Syntax-Specification")

### Mock.mock()

Mock.mock()方法是用来根据数据模板生成模拟数据, 我常用到的是以下两种传参方式:

Mock.mock(template): 根据数据模板template生成模拟数据

```
let data = Mock.mock({
data: {
  'products|10-20': [{
    name: '手机',
    price: 1000
  }]
}
})
console.log(data);

```

Mock.mock(url, template): 拦截请求地址为url的ajax请求, 并根据数据模板template生成模拟数据

```
let data = Mock.mock('api/products' , {
data: {
  'products|10-20': [{
    name: '手机',
    price: 1000
  }]
}
})

//使用jquery Ajax发送请求
$.ajax({
  url: 'api/products',
  type: 'GET',
  success: function(res) {
    console.log(res);
  }
})

```

### Mock.Random

Mock.Random是Mock.js提供一个工具类, 用于生成常用的几种数据.

生成布尔值

```
//使用@占位符的方式
 let data = Mock.mock({
    data: {
      boolean: '@boolean'
    }
  })
  console.log(data);

```

```
//使用Mock.Random调用函数的方式
  let data = Mock.mock({
    data: {
      boolean: Mock.Random.boolean()
    }
  })
  console.log(data);

```

生成日期

```
 let data = Mock.mock({
    data: {
      date: Mock.Random.date('yyyy-MM-dd')
    }
  })
  console.log(data);

```

Mock.js支持丰富的日期格式的自定义: [github.com/nuysoft/Moc…](https://link.juejin.cn/?target=https%3A%2F%2Fgithub.com%2Fnuysoft%2FMock%2Fwiki%2FDate "https://github.com/nuysoft/Mock/wiki/Date") 生成图片

```
let data = Mock.mock({
    data: {
    //用于生成高度自定义的图片地址
      imgURL: Mock.Random.image()
    }
  })
  console.log(data);

```

生成名字

```
let data = Mock.mock({
    data: {
      //生成一个英文名字
      name: Mock.Random.name(),
      //生成一个中文名字
      chineseName: Mock.Random.cname()
    }
  })
  console.log(data);

```

更多Mock.Random工具库提供的数据: [github.com/nuysoft/Moc…](https://link.juejin.cn/?target=https%3A%2F%2Fgithub.com%2Fnuysoft%2FMock%2Fwiki%2FMock.Random "https://github.com/nuysoft/Mock/wiki/Mock.Random")

### 在 Vite2 与 Vue3 中使用Mockjs来模拟数据

1. 安装mockjs

```
npm install mockjs --save-dev

```

2. 安装vite-plugin-mock

```
npm i vite-plugin-mock cross-env -D

```

vite-plugin-mock介绍 ： [github.com/vbenjs/vite…](https://link.juejin.cn/?target=https%3A%2F%2Fgithub.com%2Fvbenjs%2Fvite-plugin-mock%2Fblob%2Fmain%2FREADME.zh_CN.md "https://github.com/vbenjs/vite-plugin-mock/blob/main/README.zh_CN.md")

3.在 package.json 中设置环境变量

```
{
    "scripts": {
        // 修改dev构建脚本的命令
        "dev": "cross-env NODE_ENV=development vite",
        "build": "vite build",
        "serve": "vite preview"
    }
}

```

4.在 vite.config.js 中添加 mockjs 插件

```
import vue from "@vitejs/plugin-vue"
import { viteMockServe } from "vite-plugin-mock"
import { defineConfig } from "vite"

export default defineConfig({
    plugins: [
        vue(),
        viteMockServe({
         mockPath: "./src/mock",
        supportTs: true     //如果使用 js发开，则需要配置 supportTs 为 false
        })
    ]
})

```

5.在项目中根目录创建 mock 文件夹，建立index.ts在其中创建需要的数据接口

```
// 仅做示例: 通过GET请求返回一个名字数组
export default [
    {
        url: "/api/getUsers",
        method: "get",
        response: () => {
            return {
                code: 0,
                message: "ok",
                data: ["tom", "jerry"],
            }
        }
    }
]

```

6. 修改mock.vue，请求接口，显示数据

```
<template>
  <div v-for="(item,index) in users" :key="item">{{ index + 1 }}-{{ item }}</div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import axios from "axios"
import '../mock/index.ts'

export default defineComponent({
  setup() {
    let users = ref([])
    onMounted(() => {
      axios.get(`/api/getUsers`).then(res => {
        users.value = res.data.data
        console.log('users', users)
      }).catch(err => {
        console.log(err)
      })
    })

    return { users }
  }
})
</script>

```
