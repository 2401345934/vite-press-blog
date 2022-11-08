---
createTime: 2022/11/08
tag: '工程化,买埋点'
---

# 数据埋点起步

## 认识数据埋点 SDK

> **SDK** 全称是 **Software Development Kit** 即 软件开发工具包，一般都是一些软件工程师为特定的软件包、软件框架、硬件平台、操作系统等建立应用软件时的开发工具的集合。

为什么需要前端数据埋点？
------------

对产品本身而言，我们需要关注内容包括如下几个方面：

* 用户在产品里 主要做什么操作、停留多久、访问几次
* 用户点击率占比如何，会不会出现某些功能设计对于用户而言是无效的
* 用户在核心使用流程上是否顺畅，页面反馈是否正常友好
* 可能有哪些潜在的用户的功能需要更新

总的来说，**数据埋点** 核心是为了 **收集数据**（~有了数据就可以为所欲为~），只有通过分析数据，才能更好的评估出整个项目的质量和重要性（~数据为王~），并且能够为产品优化指明方向（**数据驱动产品**）。

![7DBB34CE.jpg](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f830ec5729d84df3aa6515ad82db154f~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.image?)

前端数据埋点要考虑哪些方面？
--------------

数据埋点的核心是数据收集，而与数据相关的内容不外乎如下几个内容：

* 数据又是基于应用产生的，因为没有应用就不会有相关的数据
* 应用本身要提供展示、收集、操作内容，而这是基于平台的，比如网站就是基于浏览器平台
* 有应用、有平台就得有用户，因为应用本身就是为了给用户提供好用的功能去解决某些存在的问题
* 针对开发者而言，应用就是代码，代码运行的质量也能决定应用的质量，而显式质量体现在错误或警告上

总结下来，数据埋点其实要考虑的就是 **用户行为、错误警告、页面性能** 三个核心方面。

### 用户行为

用户行为就是在网页应用中进行的一系列操作，但用户的操作有很多种，都需要记录下来是不可能的，一般需要记录用户的以下几种行为：

* **用户浏览页面次数，PV（Page View）**
  * 用户每次访问网站中的一个页面就被记录为 `1` 个 `PV`，多次访问同一个页面，访问量就会累计
* **页面浏览用户数，UV（Unique visitor）**
  * 通过网络正常访问页面的使用者，通常一台电脑客户端或一个用户账号为一个访客，一般同一个客户端或用户账号在 `24h` 内多次访问只会被记录为 `1` 个 `UV`，计算策略视具体情况而定
* **用户点击按钮次数**
  * 以上两种可以认为是 **`自动式触发埋点`**，而点击按钮次数就属于是 **`互动式触发埋点`**，便于去了解这个功能按钮的使用情况

### 错误警告

页面中代码运行产生的错误，可能会导致用户核心操作流程被中断，为了避免大量用户受到影响，我们需要获取 **生产环境的错误数据**，这样才能便于开发者及时进行修复。

通常来讲代码中的错误会包含以下几大类：

* **全局错误**，即未被捕获的错误
* **局部错误**，即通过 `try...catch、promise.then、promise.catch` 等捕获的错误
* **接口请求错误**，即在二次封装请求 `API` 中进行请求和接收响应时的错误
* **组件级错误**，即使用 `Vue/React` 组件时发生的错误

### 页面性能

页面性能其实也是前端性能优化中一个需要考虑和优化的点，毕竟如果一个网站老是发生 **白屏、交互卡顿、页面资源加载时间长** 等问题，肯定是没办法留住用户的，特别是用户的真实环境各不相同，如 `Windows x、MACOS、Android、iOS` 等，更加需要统计和收集相关数据，便于进行集中优化处理，提升用户体验。

与页面性能指标相关的内容，在之前的 [**前端性能优化到底该怎么做（上）— 开门见山**](https://juejin.cn/post/7137058832592666655 "https://juejin.cn/post/7137058832592666655") 一文中有提到，这里大致总结下：

* **首次绘制（`First Paint，FP`）**

  * 在渲染进程确认要渲染当前响应资源后，渲染进程会先创建一个空白页面，通常把创建空白页面的这个时间点称为 `First Paint`，简称 `FP`
  * 所谓的 **白屏时间** 其实指的就是创建这个空白页面到浏览器开始渲染非空白内容的时间，比如页面背景发生变化等
* **首次内容绘制（`First Contentful Paint，FCP`）**

  * 当用户看见一些 "内容" 元素被绘制在页面上的时间点，和白屏是不一样，它可以是 **`文本`** 首次绘制，或 `SVG` 首次出现，或 `Canvas` 首次绘制等，即当页面中绘制了第一个 **像素** 时，这个时间点称为 `First Content Paint`，简称 `FCP`
* **首屏时间 / 最大内容绘制（`Largest Contentful Paint, LCP`）**

  * `LCP` 是一种新的性能度量标准，`LCP` 侧重于用户体验的性能度量标准，与现有度量标准相比，更容易理解与推理，当首屏内容完全绘制完成时，这个时间点称为 `Largest Content Paint`，简称 `LCP`
  * **最大内容绘制应在 `2.5s` 内完成**
* **首次输入延迟（`First Input Delay, FID`）**

  * `FID` 测量的是当用户第一次在页面上交互的时候（**点击链接**、**点击按钮** 或 **自定义基于 `js` 的事件**），到浏览器实际开始处理这个事件的时间
  * **首次输入延迟应在 `100ms` 内完成**
* **累积布局偏移（`Cumulative Layout Shift, CLS`)**

  * `CLS` 是为了测量 **视觉稳定性**，以便提供良好的用户体验
  * **累积布局偏移应保持在 `0.1` 或更少**
* **首字节达到时间（`Time to First Byte，TTFB`）**

  * 指的是浏览器开始收到服务器响应数据的时间（**后台处理时间 + 重定向时间**），是反映服务端响应速度的重要指标
  * **`TTFB` 时间如果超过 `500ms`，用户在打开网页的时就会感觉到明显的等待**

理解了 为什么要做前端数据埋点 和 前端数据埋点所需要统计数据的方方面面，接下来我们就需要设计一个自己的 **前端数据埋点 SDK** 了。

## 设计前端数据埋点 SDK

这里只我们考虑数据埋点的核心内容，因此不会涉及得肯定没有那么全面，而一开始也不可能设计得全面，只要保证核心功能，那么在基于核心进行扩展即可。

确定 options 和 data 内容
--------------------

### 应用的唯一标识 — options.AppId

**数据埋点 SDK** 作为一个通用的工具集，是可供多个系统进行使用的，而这就意味着需要去保证每个应用的唯一性，一般来讲，在初始化 **SDK** 的时候是需要接入方提供的当前应用的 **ID**。

那这个 **ID** 从何而来？随便生成吗？一般来说需要经过如下步骤：

* 在对应监控系统上为当前应用生成唯一的 **AppId**
* 在对应应用接入 **SDK** 时作为配置项之一传入

其实还会涉及到请求 `url` 内容，主要用于发送给对应的监控系统，因此 `options` 核心内容简单设计如下：

```
{
  appId: '', // 当前应用唯一标识
  baseUrl: '', // 数据发送的地址
}

```

### 数据发送格式 — data

由于需要收集的数据类型包含多种，最好能够定义一种比较通用的数据格式，便于更友好地进行数据收集。

这里简单定义一下数据格式，大致如下，格式随需求场景产生差异：

```
{
  appId: '', // 当前应用唯一标识
  type: 'action' | 'performance'| 'network' | 'error', // 不同数据类型
  pageUrl: '', // 页面地址
  apiUrl: '', // 接口地址
  userId: '', // 当前用户 id
  userName: '', // 当前用户 name
  time: '',// 触发记录的时间
  data: {}, // 接口响应结果 | 性能指标 | 错误对象 | 用户操作相关信息
}

```

确定数据发送方式
--------

如果要问前端埋点最基本要实现的功能是什么，那必然是 **数据发送** 的能力，否则即便有应用、有用户、有数据也只能保存在本地没法发送给相应的监控系统，意味就没法进行收集和统计（~数据等于白给~）。

那么数据发送都有什么方式呢？针对这个问题把 **数据发送** 翻译成 **请求发送** 就容易多了，转而问题就变成了 请求发送方式都有哪些？

一般会包括如下几种（包括但不限于）：

* **`XMLHttpRequest`**
* **`fetch`**
* **`form` 表单的 `action`**
* **基于元素 `src` 属性的请求**
  * `img` 标签的 `src`
  * `script` 标签的 `src`
* **`Navigator.sendBeacon()`**

这里选择的是最后一种，因为 **`Navigator.sendBeacon()`** 就是专门用于通过 [**HTTP POST**](https://link.juejin.cn/?target=https%3A%2F%2Fdeveloper.mozilla.org%2Fzh-CN%2Fdocs%2FWeb%2FHTTP%2FMethods%2FPOST "https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Methods/POST") 将统计数据 [**异步**](https://link.juejin.cn/?target=https%3A%2F%2Fdeveloper.mozilla.org%2Fzh-CN%2Fdocs%2FGlossary%2FAsynchronous "https://developer.mozilla.org/zh-CN/docs/Glossary/Asynchronous") 发送到 `Web` 服务器上，同时能避免传统技术发送分析数据的一些问题。

> **传统技术发送统计数据的一些问题，可以直接通过 [**`传送门`**](https://link.juejin.cn/?target=https%3A%2F%2Fdeveloper.mozilla.org%2Fzh-CN%2Fdocs%2FWeb%2FAPI%2FNavigator%2FsendBeacon "https://developer.mozilla.org/zh-CN/docs/Web/API/Navigator/sendBeacon") 查看，由于文章篇幅有限不在额外解释。**

SDK 核心代码
--------

这里我们只考虑极简情况，设计好的 **SDK** 代码内容比较简单，直接上代码：

```js
let SDK = null // EasyAgentSDK 实例对象
const QUEUE = [] // 任务队列
cosnt NOOP = (v) => v

// 通过 web-vitals 页面性能指标
const reportWebVitals = (onPerfEntry) => {
  if (onPerfEntry && onPerfEntry instanceof Function) {
    import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
      getCLS(onPerfEntry) // 布局偏移量
      getFID(onPerfEntry) // 首次输入延迟时间
      getFCP(onPerfEntry) // 首次内容渲染时间
      getLCP(onPerfEntry) // 首次最大内容渲染时间
      getTTFB(onPerfEntry) // 首个字节到达时间
    })
  }
}

export default class EasyAgentSDK {
  appId = ''
  baseUrl = ''
  timeOnPage = 0
  config = {}
  onPageShow = null
  onPagesHide = null
  
  constructor(options = {}) {
    if (SDK) return

    SDK = this
    this.appId = options.appId
    this.baseUrl = options.baseUrl || window.location.origin
    this.onPageShow = options.onPageShow || NOOP
    this.onPagesHide = options.onPagesHide || NOOP

    // 初始化监听页面变化
    this.listenPage()
  }
  
  // 设置 config
  setConfig(congfig){
    this.config = congfig
  }

  // 刷新任务队列
  flushQueue() {
    Promise.resolve().then(() => {
      QUEUE.forEach((fn) => fn())
      QUEUE.length = 0;
    })
  }

  // 监听页面变化
  listenPage() {
    let pageShowTime = 0

    window.addEventListener('pageshow', () => {
      pageShowTime = performance.now()
      
       // 页面性能指标上报
      reportWebVitals((data) => {
        this.performanceReport({ data })
      })
      
      // 执行 onPageShow
      this.onPageShow();
    })

    window.addEventListener('pagehide', () => {
      // 记录用户在页面停留时间
      this.timeOnPage = performance.now() - pageShowTime
      
      // 刷新队列前执行 onPageShow
      this.onPageShow();

      // 刷新任务队列
      this.flushQueue()
    })
  }

  // Json 转 FormData
  json2FormData(data){
    const formData = new FormData()

    Object.keys(data).forEach(key => {
      formData.append(key, data[key])
    });

    return formData
  }

  // 自定义上报类型
  report(config) {
    QUEUE.push(() => {
      const formData = json2FormData({
        ...this.config,
        ...config,
        time: new Date().toLocaleString(),
        appId: this.appId,
        pageUrl: window.location.href,
      });
      navigator.sendBeacon(`${this.baseUrl}${config.url || ''}`, formData)
    })
  }

  // 用户行为上报
  actionReport(config) {
    this.report({
      ...config,
      type: 'action',
    })
  }

  // 网络状况上报
  networkReport(config) {
    this.report({
      ...config,
      type: 'network',
    })
  }

  // 页面性能指标上报
  performanceReport(config) {
    this.report({
      ...config,
      type: 'performance',
    })
  }

  // 错误警告上报
  errorReport(config) {
    this.report({
      ...config,
      type: 'error',
    })
  }
}

```

上报用户行为
------

### 统计 PV 和 UV — 自动触发埋点

关于 **PV** 和 **UV** 在上述已经做过介绍了，本质上这两个数据统计都可在一个上报类型为 `action` 数据发送中获得，主要看监控系统是按照怎样的规则对数据进行分析和统计，这里在 `SDK` 内部监听了页面的 `pageshow / pagehide` 两个事件：

* 在 `pageshow` 中可以上报与 **PV / UV** 相关的数据 和 页面性能相关的数据

```js
window.SDK = new EasyAgentSDK({
    appId: 'application_id',
    baseUrl: '//aegis.example.com/collect',
    onPageShow() {
        window.SDK.actionReport({
            data: {} // 其他必要传递的信息
        })
    }
});
window.SDK.setConfig({
    userId: UserInfo.userId, // 当前用户 id
    userName: UserInfo.userName, // 当前用户 name
});
```

* 在 `pagehide` 中主要用于计算用户停留在页面上的时间 `timeOnPage` 和 刷新任务队列

### 统计用户点击按钮 — 交互式触发埋点

假设我们希望记录某些按钮的使用次数的数据，可以在 `document` 上监听 `click` 事件，目的利用事件冒泡以便于不需要侵入不同按钮的 `click` 事件，比如：

```js
const TargetElementFilter = ['export_btn']

const findTarget = (filters) => {
 return filters.find((filter) => TargetElementFilter.find((v) => filter === v)));
}

document.addEventListener('click', (e) => {
  const { id, className, outerHTML } = e.target
  const isTarget = findTarget([id, className])

  if (isTarget) {
    SDK.actionReport({
      data: {
        id, 
        className,
        outerHTML
      }, // 其他必要传递的信息
    })
  }
})

```

上报页面性能
------

和页面性能相关的内容，属于 `SDK` 自动触发埋点，不应该让使用者在手动接入，在上面的实现中，我们在 `pageshow` 事件中通 `reportWebVitals` 和 `performanceReport` 进行数据上报，并且这里选择了 `Google` 推出的 [**`web-vitals`**](https://link.juejin.cn/?target=https%3A%2F%2Fwww.npmjs.com%2Fpackage%2Fweb-vitals "https://www.npmjs.com/package/web-vitals") 来获取和页面性能指标相关的具体数据，对应代码为：

```js
// 通过 web-vitals 页面性能指标
const reportWebVitals = (onPerfEntry) => {
  if (onPerfEntry && onPerfEntry instanceof Function) {
    import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
      getCLS(onPerfEntry) // 布局偏移量
      getFID(onPerfEntry) // 首次输入延迟时间
      getFCP(onPerfEntry) // 首次内容渲染时间
      getLCP(onPerfEntry) // 首次最大内容渲染时间
      getTTFB(onPerfEntry) // 首个字节到达时间
    })
  }
}

```

获取得到的数据大致如下：

![](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/87deeee2a8d84b249007151d79a6cb85~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.image?)

上报错误警告
------

### 全局错误

全局错误，即未被捕获的错误，可以通过 `window.onerror` 事件来捕获，然后进行错误数据上报，大致如下：

```js
window.addEventListener('error', (reason) => {
    const { filename, message, error } = reason;

    window.SDK.errorReport({
        data: {
            filename, 
            message, 
            error
        }
    });
})

```

### 局部错误

局部错误，即通过 `try...catch、promise.then、promise.catch` 等捕获的错误，大致使用如下：

```js
 try {
    throw new Error('error for test')
  } catch(error) {
    window.SDK.errorReport({
      data: {
        error,
      },
    })
  }


  Promise.reject(new Error('Promise reject for test'))
  .then(
    () => {},
    (reason) => {
      window.SDK.errorReport({
        data: {
            error: reason
        }
    });
    },
  )
  
  Promise.reject(new Error('Promise reject for test'))
  .catch(
    (reason) => {
      window.SDK.errorReport({
        data: {
            error: reason
        }
    });
    },
  )

```

### 接口请求错误

接口请求错误，即在二次封装请求 `API` 中进行请求和接收响应时的错误，为了方便这里以 `axios` 来举例子，我们可以在它的 **请求拦截** 和 **响应拦截** 的第二个回调参数中去上报对应的错误数据信息，大致如下：

```js
// 创建axios实例
const service = axios.create({
  baseURL, // api 的 base_url
  timeout: 60000, // 请求超时时间
  responseType: reqConf.responseType,
});

// 请求拦截
service.interceptors.request.use(
  (config) => {
    ...
    return config;
  },
  (error) => {
    window.SDK.errorReport({
      apiUrl: config.url,
      data: {
        error,
      },
    })
  },
);

// 响应拦截
service.interceptors.response.use(
  (config: any) => {
    ...
    return config;
  },
  (error: any) => {
    window.SDK.errorReport({
      apiUrl: config.url,
      data: {
        error,
      },
    })

    return error.response.data;
  },
);

```

### 组件级错误

组件级错误，即使用 `Vue / React` 框架组件时发生的错误，完全可以使用它们在官方文档中提到的错误捕获方式来捕获并上报错误。

* **`Vue`** 中的 [**`errorHandler`**](https://link.juejin.cn/?target=https%3A%2F%2Fcn.vuejs.org%2Fapi%2Fapplication.html%23app-config-errorhandler "https://cn.vuejs.org/api/application.html#app-config-errorhandler") 就是用于为应用内抛出的未捕获错误指定一个全局处理函：

```js
    // App.vue
    onMounted(()=>{
      throw new Error('error in onMounted')
    });

    // main.ts
    const app = createApp(App)

    app.config.errorHandler = (error, instance, info) => {
        window.SDK.errorReport({
            data: {
                instance,
                info,
                error
            }
        });
    }

```

**`React`** 中的 [**`ErrorBoundary`**](https://link.juejin.cn/?target=https%3A%2F%2Fzh-hans.reactjs.org%2Fdocs%2Ferror-boundaries.html%23introducing-error-boundaries "https://zh-hans.reactjs.org/docs/error-boundaries.html#introducing-error-boundaries") 错误边界相关的 `getDerivedStateFromError` 和 `componentDidCatch` 钩子

```jsx

    // 定义错误边界组件
    class ErrorBoundary extends React.Component {
      constructor(props) {
        super(props);
        this.state = { hasError: false };
      }

      static getDerivedStateFromError(error) {
          // 更新 state 使下一次渲染能够显示降级后的 UI
          return { hasError: true };  
      }
      componentDidCatch(error, info) {
          // 可以将错误日志上报给服务器
          window.SDK.errorReport({
            data: {
                info,
                error
            }
        });
      }
      render() {
        if (this.state.hasError) {
            // 自定义降级后的 UI 并渲染      、
            return <h1>Something went wrong.</h1>;
        }
        return this.props.children;
      }
    }

    // 使用错误边界组件
    <ErrorBoundary>
      <MyWidget />
    </ErrorBoundary>

    ```
