---
createTime: 2022/11/19
tag: 'Axios,源码'
---

# Axios 源码介绍

`axios`是个很优秀的项目，到2022/2/25日为止，GitHub上有着`91.3k`的start。而它的源码也不多，所以很值得一看。

阅读源码不仅能学习到新的知识点也能发现自己的不足，带着问题去读源码是个好的习惯哦：

* 1.axios是怎么实现可以创建多个实例的。
* 2.axios的拦截器是怎么实现的。
* 3.axios取消请求是怎么实现的。
* 4.axios是怎么做到防`xsrf(csrf)`攻击的
* 5.axios的优缺点

axios的所有[源码]都在`lib`文件加下。建议`clone`下来仔细阅读。

### 1.axios是怎么实现可以创建多个实例的

打开`lib/axios.js`这个入口文件的源码，可以看到这个文件代码很少，主要的一个函数就是`createInstance`，这个函数返回一个实例，这个实例就是`axios`。此外还在`axios`上添加了一些属性和方法，方便用户使用。所以我们主要看看`createInstance`这个函数，这个也是axios可以创建多个实例的核心函数：

```js
function createInstance(defaultConfig) {
  // 创建一个Axios实例
  var context = new Axios(defaultConfig);
  // 调用bind函数将Axios原型的request函数上下文绑定到context上，并返回一个实例（函数）
  var instance = bind(Axios.prototype.request, context);

  // 把Axios原型上的函数(比如get、post、put等)复制到instance实例上，并绑定到context上下文
  utils.extend(instance, Axios.prototype, context);

  // 把context上的属性(defaults,interceptors)复制到instance上
  utils.extend(instance, context);

  // 在instance上添加一个create函数，调用createInstance函数返回axios实例。
  // 所以调用这个create函数可以创建多个axios实例
  instance.create = function create(instanceConfig) {
    return createInstance(mergeConfig(defaultConfig, instanceConfig));
  };

  return instance;
}

```

> 从上代码可以看出`createInstance`其实是个工厂函数。通过返回实例上的create函数可以创建新的实例。这样一个好处就是用户除了可以使用默认配置外还可以覆盖默认配置。

在之前版本的代码中`create`函数并不在`createInstance`里面，而是放在`axios`上，既：`axios.create(config)`。为什么这么修改呢？可以看看`Github`上的这个[PR-#2795](https://link.juejin.cn/?target=https%3A%2F%2Fgithub.com%2Faxios%2Faxios%2Fpull%2F2795 "https://github.com/axios/axios/pull/2795")。这么写是为了能更方便的在有多个域名的复杂的项目提供更深层次的构建。

### 2.axios的拦截器是怎么实现的

`axios`拦截器的源码主要在`Axios.js`和`InterceptorManager.js`文件中。

**我们先来看看`Axios`函数：** `lib/core/Axios.js`

```js
function Axios(instanceConfig) {
  this.defaults = instanceConfig;
  this.interceptors = {
    request: new InterceptorManager(),
    response: new InterceptorManager()
  };
}

```

`Axios`函数在实例对象上有两个属性`default`和`interceptors`，`defaults`是默认配置；`interceptors`就是我们的拦截器对象，它也有两个属性`request`和`response`分别对应请求拦截和响应拦截；它们的值都是`InterceptorManager`对象实例。

再来看看我们拦截器的使用方式：`axios.interceptors.request.use`。`use`是`InterceptorManager`实例对象上的函数，`InterceptorManager`顾名思义是对拦截器的管理，我们来看看它的源码：

`lib/core/InterceptorManager.js`

```js
function InterceptorManager() {
  // 实例化后保存当前实例的请求拦截器的堆栈
  this.handlers = [];
}
// 往堆栈中添加定义的拦截器
// fulfilled和rejected是拦截器传入的函数
InterceptorManager.prototype.use = function use(fulfilled, rejected, options) {
  this.handlers.push({
    fulfilled: fulfilled,
    rejected: rejected,
    // 这里需要注意一下，默认值为false，用于控制请求拦截器是否为同步执行
    synchronous: options ? options.synchronous : false,
    runWhen: options ? options.runWhen : null
  });
  return this.handlers.length - 1;
};
// 移除拦截器
InterceptorManager.prototype.eject = function eject(id) {
  if (this.handlers[id]) {
    this.handlers[id] = null;
  }
};
// 拦截器的遍历
InterceptorManager.prototype.forEach = function forEach(fn) {
  utils.forEach(this.handlers, function forEachHandler(h) {
    if (h !== null) {
      fn(h);
    }
  });
};

```

`InterceptorManager`源码很简单，提供`handlers`堆栈来储存拦截器，同时在原型上增加了3个函数对这个堆栈的增删以及遍历。

`Axios`实例的`interceptors`对象只在`Axios.prototype.request`函数中使用，而这个函数是`axios`请求的源函数，你调用的请求函数像`axios.get`和`axios.post`等本质都是调用`Axios.prototype.request`这个函数。而拦截器的的处理也是在这个函数中。 我们回到`Axios.js`文件，看看这个函数的源码：

```js
Axios.prototype.request = function request(configOrUrl, config) {

  /// ...省略代码

  // filter out skipped interceptors
  // 收集响应拦截器
  var requestInterceptorChain = [];
  var synchronousRequestInterceptors = true;
  this.interceptors.request.forEach(function unshiftRequestInterceptors(interceptor) {
    if (typeof interceptor.runWhen === 'function' && interceptor.runWhen(config) === false) {
      return;
    }

    synchronousRequestInterceptors = synchronousRequestInterceptors && interceptor.synchronous;

    requestInterceptorChain.unshift(interceptor.fulfilled, interceptor.rejected);
  });

  // 收集请求拦截器
  var responseInterceptorChain = [];
  this.interceptors.response.forEach(function pushResponseInterceptors(interceptor) {
    responseInterceptorChain.push(interceptor.fulfilled, interceptor.rejected);
  });

  var promise;

  // 判断是否是同步执行，默认值为false
  if (!synchronousRequestInterceptors) {
    var chain = [dispatchRequest, undefined];

    Array.prototype.unshift.apply(chain, requestInterceptorChain);
    chain = chain.concat(responseInterceptorChain);

    promise = Promise.resolve(config);
    while (chain.length) {
      // promise的链式调用
      promise = promise.then(chain.shift(), chain.shift());
    }

    return promise;
  }

  // 请求拦截器同步执行
  var newConfig = config;
  while (requestInterceptorChain.length) {
    var onFulfilled = requestInterceptorChain.shift();
    var onRejected = requestInterceptorChain.shift();
    try {
      newConfig = onFulfilled(newConfig);
    } catch (error) {
      onRejected(error);
      break;
    }
  }

  try {
    promise = dispatchRequest(newConfig);
  } catch (error) {
    return Promise.reject(error);
  }

  while (responseInterceptorChain.length) {
    promise = promise.then(responseInterceptorChain.shift(), responseInterceptorChain.shift());
  }

  return promise;
};

```

在执行请求前定义了两个堆栈`requestInterceptorChain`和`responseInterceptorChain`来存储拦截器处理函数

* `requestInterceptorChain`存储的是请求拦截器的处理函数，要注意它通过`unshift`添加的，是先进后出的，所以越早添加的拦截器越晚执行。
* `responseInterceptorChain`存储的是响应拦截器的处理函数，这个是先进先出的，也就是越早添加越先执行。

> 这里需要注意的是，在存入堆栈时都是两个为一组存储的，第一个始终是`fulfilled`的处理函数，第二个始终是`rejected`，因为后续取值的时候也是两个为一组取，刚好对应`Promise.then`函数对应的两个参数。

我们现在再来看请求的执行，进入`if`语句块的代码(默认执行if语句块里的代码，原因后面再来讲解)。

我们可以看到定义了一个`chain`数组来存放要执行的函数，默认有两个值，第一个是`dispatchRequest`,第二个是`undefined`。现在暂时不去看`dispatchRequest`是怎么样的，只要明白这个函数是可以发起请求就行了。

```js
Array.prototype.unshift.apply(chain, requestInterceptorChain);
chain = chain.concat(responseInterceptorChain);

```

`chain`通过上面代码处理 之后变成这样了: `chain = [...请求拦截函数, dispatchRequest, undefined, ...响应拦截函数 ]`。之后使用`Promise`链式调用执行函数。**这样就使得请求拦截函数始终在发起请求前执行，响应拦截函数在请求之后执行。**

**再来看看刚刚问题：为什么默认执行if语句里面的代码？** 看`if (!synchronousRequestInterceptors) { ... }`这个判断条件。

在`axios.interceptors.request`中`synchronousRequestInterceptors`默认值为`false`，如果在请求拦截器中没有配置`synchronous`为`true`的情况下这个值会被设置为`false`。`synchronous`是用于设置请求拦截器是否为同步执行。

使用代码如下：

```js
axios.interceptors.request.use(function (config) {
  config.headers.test = 'I am only a header!';
  return config;
}, null, { synchronous: true });

```

`synchronous`是用来控制请求拦截器是否为同步执行的。我们一般情况下使用是不用配置这个的，那什么时候需要配置呢？

**假如请求拦截器是异步的(其实默认就是异步的)，而请求的`promise(dispatchRequest)`又是在请求拦截堆栈后面，所以当主线程被阻塞时，那么`axios`请求发起时机就会被延迟。所以想要避免发起请求时机会延迟这个问题，可以设置请求拦截器是同步执行的。**

所以会默认情况是会执行`if`语句块里的代码。后面的代码就是请求拦截器同步执行的代码，这里就不多赘述啦。

### 3.axios取消请求是怎么实现的

**先来看看取消请求是如何使用的：**

```js
const CancelToken = axios.CancelToken;
const source = CancelToken.source();

axios.get('/user/12345', {
  cancelToken: source.token
}).catch(function (thrown) {
  if (axios.isCancel(thrown)) {
    console.log('Request canceled', thrown.message);
  } else {
    // 处理错误
  }
});

// 取消请求（message 参数是可选的）
source.cancel('Operation canceled by the user.');

```

这里通过`CancelToken`的`source`函数返回一个对象，然后把`source.token`传入`axios`配置，使用`source.cancel`则可以取消请求。

来看看源码的实现： 取消请求有两部分关键代码分别在`lib/cancel/CancelToken.js`和`lib/adapters/xhr.js`

`lib/cancel/CancelToken.js`

```js
function CancelToken(executor) {
  if (typeof executor !== 'function') {
    throw new TypeError('executor must be a function.');
  }

  var resolvePromise;

  // 新建一个promise，此时这个promise为pending状态，既挂起，等待resolve或reject
  this.promise = new Promise(function promiseExecutor(resolve) {
    resolvePromise = resolve;
  });

  var token = this;

  // 当promise别resolve后，会遍历订阅列表，执行取消请求函数。
  // 批量取消函数是v0.22之后新增的功能，之前版本是不支持批量取消的。
  // eslint-disable-next-line func-names
  this.promise.then(function(cancel) {
    if (!token._listeners) return;

    var i;
    var l = token._listeners.length;

    for (i = 0; i < l; i++) {
      token._listeners[i](cancel);
    }
    token._listeners = null;
  });

  // 这段代码应该是对旧版本的兼容
  // eslint-disable-next-line func-names
  this.promise.then = function(onfulfilled) {
    var _resolve;
    // eslint-disable-next-line func-names
    var promise = new Promise(function(resolve) {
      token.subscribe(resolve);
      _resolve = resolve;
    }).then(onfulfilled);

    promise.cancel = function reject() {
      token.unsubscribe(_resolve);
    };

    return promise;
  };

  // 执行executor函数，把取消请求的权限提供给使用者。
  executor(function cancel(message) {
    if (token.reason) {
      // Cancellation has already been requested
      return;
    }

    token.reason = new Cancel(message);
    resolvePromise(token.reason);
  });
}
CancelToken.prototype.throwIfRequested = function throwIfRequested() {
  if (this.reason) {
    throw this.reason;
  }
};
// 把取消请求函数加入订阅列表
CancelToken.prototype.subscribe = function subscribe(listener) {
  if (this.reason) {
    listener(this.reason);
    return;
  }
  if (this._listeners) {
    this._listeners.push(listener);
  } else {
    this._listeners = [listener];
  }
};
// 把取消函数从订阅列表中移除
CancelToken.prototype.unsubscribe = function unsubscribe(listener) {
  if (!this._listeners) {
    return;
  }
  var index = this._listeners.indexOf(listener);
  if (index !== -1) {
    this._listeners.splice(index, 1);
  }
};
// 获得CancelToken对象实例以及返回取消请求函数
CancelToken.source = function source() {
  var cancel;
  var token = new CancelToken(function executor(c) {
    cancel = c;
  });
  return {
    token: token,
    cancel: cancel
  };
};

```

`lib/adapters/xhr.js`

```js
/// ...省略代码

// 当请求完成会调用这个函数，保证取消请求函数从订阅列表中移除
function done() {
  if (config.cancelToken) {
    config.cancelToken.unsubscribe(onCanceled);
  }

  if (config.signal) {
    config.signal.removeEventListener('abort', onCanceled);
  }
}

/// ...省略代码

// 在XHR实例化后，发送请求之前，如果有配置有传入取消监听，则会把这个取消请求的函数加入订阅列表中。
if (config.cancelToken || config.signal) {
  // Handle cancellation
  // eslint-disable-next-line func-names
  onCanceled = function(cancel) {
    if (!request) {
      return;
    }
    reject(!cancel || (cancel && cancel.type) ? new Cancel('canceled') : cancel);
    request.abort();
    request = null;
  };

  config.cancelToken && config.cancelToken.subscribe(onCanceled);
  if (config.signal) {
    config.signal.aborted ? onCanceled() : config.signal.addEventListener('abort', onCanceled);
  }
}
/// ...省略代码

```

**取消请求的核心代码是在`CancelToken.js`中，以及在创建`xhr`时对`config.cancelToken 和 config.signal`配置的处理上。**

从代码可以看出，当调用`CancelToken.source()`时会返回一个`CancelToken`实例对象和一个可以取消请求的函数。

在**CancelToken**函数中：

* 1、当创建`CancelToken`实例时`this.promise`指向一个创建好的`Promise`实例，此时这个`promise`为挂起状态，等待`resolve`或`reject`。
* 2、接着会执行`executor`函数，`executor`函数就是实例化`CancelToken`时传入函数，传入`executor`参数是一个函数，这个函数就是`cancel`函数，调用这个函数后，该函数会`resolve`实例的`promise`，同时传入`Cancel`实例对象，`CancelToken`中的`promise`就会变为`fulfilled`，此时`this.promise.then`中的代码将会执行，遍历订阅列表，执行取消函数，请求会被逐个取消。

在**xhr.js**文件中：

* 1、定义了一个`done`函数，这个函数在请求完成后会执行。用于移除取消请求的监听。
* 2、在发送请求前会检查是否有传入取消请求的配置，如果有配置，则会给`onCanceled`赋值为一个函数，这个函数就是用于真正取消请求的函数，这个函数还会`reject`掉axios请求的`Promise`。`onCanceled`被赋值后会把`onCanceled`这个函数添加到`CancelToken`实例中的`_listeners`订阅列表中，当`CancelToken`的`promise`被`resolve`后这个函数被执行，取消请求。
* 3、你会发`axios`现取消请求的方式有两种，一种是`axios`本身自己实现的`cancelToken`，还有一种是`signal`；这种用的是`Web`的原生的[AbortController API](https://link.juejin.cn/?target=https%3A%2F%2Fdeveloper.mozilla.org%2Fzh-CN%2Fdocs%2FWeb%2FAPI%2FAbortController "https://developer.mozilla.org/zh-CN/docs/Web/API/AbortController")，官网的第一句话是这么说的：`AbortController`接口表示一个控制器对象，允许你根据需要中止一个或多个 Web 请求。所以它不仅可以取消`axios`发起的请求，`Fetch`发起的可以用这个API取消。详情查看：[Abortable fetch](https://link.juejin.cn/?target=https%3A%2F%2Fdevelopers.google.com%2Fweb%2Fupdates%2F2017%2F09%2Fabortable-fetch "https://developers.google.com/web/updates/2017/09/abortable-fetch")

**除了`CancelToken.js`还有`Cancel.js`和`isCancel.js`：**

* `Cancel`是一个构造函数，有一个`message`属性用于存储用户调用取消函数时的错误提示，当用户取消请求时，会把`Cancel`实例对象传递给取消函数，在错误处可以捕获这个对象实例。并且`Cancel`原型上有个`__CANCEL__`属性，可以用于判断`axios`抛出的错误是否是由于取消请求而导致的。
* `isCancel`就是个很简单的函数，用于判断是否是`Cancel`对象。

### 4.axios是怎么做到防`xsrf(csrf)`攻击的

在`axios`使用很简单，在请求上添加配置即可

```js
//`xsrfCookieName`是要用作 xsrf 令牌的值的cookie的名称
xsrfCookieName: 'XSRF-TOKEN', // default

// `xsrfHeaderName`是携带xsrf令牌值的http头的名称
xsrfHeaderName: 'X-XSRF-TOKEN', // default

```

防护`XSRF`策略有多种，一般的防护策略有：

* 阻止不明外域的访问
  * 同源检测
  * Samesite Cookie
* 提交时要求附加本域才能获取的信息
  * 双重Cookie验证
  * CSRF Token

同源策略虽然可以防护，但多少还有点缺陷，比如来之搜索引擎的访问。而在请求头上加`token`是目前一种更有效的防护策略。详情参考这篇博文：[如何防止CSRF攻击？](https://link.juejin.cn/?target=https%3A%2F%2Ftech.meituan.com%2F2018%2F10%2F11%2Ffe-security-csrf.html "https://tech.meituan.com/2018/10/11/fe-security-csrf.html")

### 5.axios的优缺点

`axios`的优点有很多，比如

* 体积小
* 支持请求响应拦截
* 支持取消请求
* 返回自动转换JSON
* 兼容性好
* 支持node
* 等等... `axios`优点很多，当然也有缺点。`axios`在请求的处理上做的很优秀，但随着业务的或者技术的进步可能你需要跟好的请求库：
* 给予xhr，兼容性好，但XHR本身的架构不清晰。
* 你可能需要防抖、节流、轮询等比较高级的需求，但axios没有提供，需要自己手动编写。
* 等等...(我想不到了！！！我不管！它就是很好！！！【狗头保命】) 当然第二条也可以说不算缺点，硬凑的~ 如果`axios`做的越智能，那么它的体积也就不会这么小了，也不是每个人都需要如此复杂的功能。这也是编写库时要去明确以及取舍的啦~

### 最后

除了以上的内容，`axios`还有很多值得学习的地方，这里就不一一讲解了。比如`axios`对`config配置`的合并、处理；对请求响应的自动转化；对`url`的处理；如何适配`node`和`web`端和一些对JS使用的小技巧等；此外`axios`的`utils`工具函数也值得一看，比如`merge`、`extend`、`forEach`和`isPlainObject`等。

一个额外的小知识点，下面的`isPlainObject`和`axios`中的写法不同，为什么要这么写呢？

```js
export default function isPlainObject(obj: any): boolean {
  if (typeof obj !== 'object' || obj === null) return false

  let proto = obj
  while (Object.getPrototypeOf(proto) !== null) {
    proto = Object.getPrototypeOf(proto)
  }

  return Object.getPrototypeOf(obj) === proto
}

```
