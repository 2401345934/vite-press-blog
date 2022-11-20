---
createTime: 2022/11/20
tag: '无感刷新token'
---
# 无感刷新token

一、无感刷新refreshToken是什么？
----------------------

首先，认证首先的方式有好几种，常见的有 `session` + `cookie`，需要存储的 `token` ，以及无需存储的 `token` ，其中无感刷新 `refreshToken` 就是属于无需存储 `token` 的一种为了提高用户体验，以及安全性的解决方案。  

### 1-1、先了解 token 认证流程

`token` 的认证基本的流程就是：

1. 客户端输入账号密码登录成功；
2. 服务端返回 `token`（一般里面包含用户的一些基本信息，不要让用户隐私信息入内）；
3. 客户端获取到 `token` 后，存储到本地的 `cookie` || `localStorge` 中；
4. 以后每次请求的时候，都将在 `Authorization` 携带上 `token`；

**缺点：**  
但是这种方法有一个缺点，就是 `token` 一经颁布，便无法被废除，只要在服务端规定的有效期内都是有用的，并且就算后面颁布了新的 `token` 也不会影响到之前旧的 `token`。这样出于安全考虑，就会将 `token` 的有效时间设置的短一些，通常都是10min~30min之内，这样就会造成用户的使用感观不好，比如用户的一个页面，填写数据填了很长一段时间，超过了 `token` 的有效时间，当他一提交时，便发现因为 `token` 的过期，需要重新登录，这样势必会造成用户的使用感觉极差，如此环境下，refreshToken 应运而生，我们可以通过 `refreshToken` 来刷新 `token` 的有效期。

### 1-2、refreshToken是啥？

`refreshToken` 其实和 `token` 并没有任何的区别，都是通过 `jwt` 加密的一串加密字符串，但是 `token` 是用来操作和获取数据的，`refreshToken` 仅仅只用来刷新 `token`。

**使用了 refreshToken 后的认证流程：**

1. 在用户登录成功后，后台返回一个 `token` ，一个 `refreshToken` ，平时发送请求的时候都是携带 `token`。
2. 当 `token` 过期时，这时前端便携带 `refreshToken` 发送一个请求到服务端，请求新的 `token` 回来。
3. 客户端用新的 `token` 替换原来过期的 `token`。
4. 如果 `refreshToken` 过期，则需要用户重新登录。

但是此时你可能会有一个疑问，既然 `refreshToken` 和 `token` 无区别，那为什么不干脆把 `token` 的过期时间延长呢？`refreshToken`这样的设计意义到底是什么？

二、为什么要设置两个Token？
----------------

首先，我们要了解 `token` 的主要矛盾点是在于，如果过期的时间设置的太长，用户数据的安全性会大打折扣，但是如果设置的时间过短，用户需要频繁登录，这必然会造成用户使用体验感受下降，所以 `refreshToken` 就是为了平衡这一矛盾而诞生的。

`token` 经常频繁的使用，暴露的几率很大，那我们就给他设置短的过期时间，提升安全性。 `refreshToken` 使用的不频繁，暴露几率相比较 `token` 小很多，我们需要给他设置较长的过期时间，以提升用户使用感受。

三、后端如何实现？
---------

**技术栈：koa + TS + mysql2**  
加密使用的是：jsonwebtoken ，token时间戳的判断使用的是 dayjs；

### 3-1、login 登录后返回

```js
  async login(ctx: Context, next: () => Promise<void>) {
    const { user_name } = ctx.request.body as userType

    // 1、获取用户信息（token 中包含 id，user_name） 
    try {
      const { password, ...res } = await getUserInfo({ user_name })
      
      ctx.body = {
        code: 200,
        message: '用户登录成功！',
        result: {
          token: jwt.sign(
            {
              ...res, // 携带用的的数据 id，与用户名，将密码等敏感信息过滤出去
              exp: dayjs().add(10, 's').valueOf() // 保存token的有效时间戳，此处因为是测试所以设置的时间很短，一般设置为10—~30m
            },
            env.JWT_SECRET
          ),
          refreshToken: jwt.sign(
            {
              ...res,
              exp: dayjs().add(2, 'h').valueOf() // 保存refreshToken的有效时间戳，一般设置为1d以上
            },
            env.JWT_REFRESH_SECRET
          )
        }
      }
    } catch (error) {
      console.error('用户登录失败', error)
    }
  }

```

### 3-2、router 单独配置 refreshToken

```js
router.get('/refresh', refreshAuth, refreshTokenCon)
// refreshAuth 监控refreshToken有无过期
// refreshTokenCon 返回新的token给前端
```

### 3-3、refreshToken 的权限时效判断

```js
import { Context } from 'koa'
import jwt from 'jsonwebtoken'
import env from '../config/config.default'
import errors from '../constants/err.type'
import dayjs from 'dayjs'
const { invalidRefreshToken } = errors

const refreshAuth = async (ctx: Context, next: () => Promise<void>) => {
  const { authorization = '' } = ctx.request.header
  const refreshToken = authorization.replace('Bearer ', '')

  try {
    const user = jwt.verify(refreshToken, env.JWT_REFRESH_SECRET) 
    if (dayjs().isAfter(user.exp)) {
      console.error('refreshToken 过期')
      return ctx.app.emit('error', invalidRefreshToken, ctx)
    }
    ctx.state.user = user
  } catch (error) {
    switch (error.name) {
      default:
        console.error('无效的refreshToken', error)
        return ctx.app.emit('error', invalidRefreshToken, ctx)
    }
  }

  await next()
}

export default refreshAuth

```

### 3-4、token 的时效判断

```js
import { Context } from 'koa'
import jwt from 'jsonwebtoken'
import env from '../config/config.default'
import errors from '../constants/err.type'
import dayjs from 'dayjs'
const { invalidToken } = errors

const auth = async (ctx: Context, next: () => Promise<void>) => {
  const { authorization = '' } = ctx.request.header
  const token = authorization.replace('Bearer ', '')

  try {
    // user中包含了payload的信息(id, user_name)
    const user = jwt.verify(token, env.JWT_SECRET)

    if (dayjs().isAfter(user.exp)) { // 表示 Day.js 对象是否在另一个提供的日期时间之后。
    // dayjs中文官网：https://dayjs.fenxianglu.cn/category/query.html#%E7%9B%B8%E5%90%8C
      console.error('token 过期')
      return ctx.app.emit('error', invalidToken, ctx)
    }

    ctx.state.user = user
  } catch (error) {
    switch (error.name) {
      default:
        console.error('无效的token', error)
        return ctx.app.emit('error', invalidToken, ctx)
    }
  }

  await next()
}

export default auth

```

### 3-5、ctx.body 返回新的token

```js
  // 重新返回新的 token 和 refreshToken
  async refreshTokenCon(ctx: Context, next: () => Promise<void>) {
    // user中包含了payload的信息(id, user_name)
    const res = ctx.state.user
    ctx.body = {
      code: 200,
      message: 'token状态刷新成功！',
      result: {
        token: jwt.sign(
          {
            ...res,
            exp: dayjs().add(10, 's').valueOf()
          },
          env.JWT_SECRET
        )
      }
    }
  }

```

四、前端如何实现？
---------

**技术栈：React + TS + mobx + axios**

### 4-1、request封装

```js
import axios, { type Method } from 'axios'
import NProgress from './nprogress'
import useStore from '@/store'
import { baseUrlFn } from '@/utils'
import { message } from 'antd'
import { getToken } from '@/utils'
import handle401 from './handle401'

// control global serve loading
const {
  useGlobalStore: { changeIsLoading },
} = useStore()

// 请求基地址
export const baseURL = baseUrlFn(process.env.BASE_ENV)

const instance = axios.create({
  baseURL: baseURL,
  timeout: 10000,
})

// 请求拦截器
instance.interceptors.request.use(
  function (config: any) {
    // token配置请求头
    if (!config.headers?.authorization && getToken()) {
      config.headers.Authorization = 'Bearer ' + getToken()
    }
    changeIsLoading(true)
    NProgress.start()
    return config
  },
  function (error) {
    return Promise.reject(error)
  },
)

// 响应拦截器
instance.interceptors.response.use(
  function (response) {
    setTimeout(() => {
      changeIsLoading(false)
    }, 300)

    NProgress.done()
    return response
  },
  function (error) {
    NProgress.done()
    changeIsLoading(false)
    const { status, config } = error.response

    // 判断token过期，进行 refresh token
    // 与后台规定好 401 为 token 过期，需要重新请求 token
    // 403 为 refresh token 过期，直接登出，让用户重新登录
    if (status === 401) {
      return handle401(config)
    } else if (status === 403) {
      message.error('身份凭证过期，请重新登录')
      return
    }

    // 对响应错误做点什么
    if (!error.response) {
      // 网络错误，response 没有信息
      window.location.pathname = '/500'
    } else {
      // 对响应错误做点什么 400 401 404 500 ...
      // 通用错误，通用提示
      message.error(error.response.data.code + ' ' + error.response.data.message)
    }
    return
  },
)

export default instance

```

### 4-2、handle401 封装重新请求 token 函数

```js
import instance from './index'
import { getRefreshToken, setToken } from '@/utils' // 将 token 与 refreshToken 用js-cookie存储到cookie中

let lock = false // 锁
const originRequest: any = [] // 缓冲

/**
 * 处理401——刷新token并处理之前的请求，目的在于实现用户无感知刷新
 * @param config 之前的请求的配置
 * @returns {Promise<unknown>}
 */
export default async function async(config: any) {
  if (lock) {
    lock = false
    try {
      const res = await refreshTokenAPI(getRefreshToken() as string)
      const token = res.data.result.token
      setToken(token)
      originRequest.map((callback: Function) => callback(token))
      originRequest.splice(0)
    } catch (error) {}
  }
  lock = true
  // 关键代码，返回Promise替换当前的请求
  return new Promise((resolve) => {
    // 收集旧的请求，以便刷新后构造新的请求，同时由于Promise链式调用的效果，
    // instance(config)的结果就是最终的请求结果
    originRequest.push(() => {
      resolve(instance(config))
    })
  })
}

// 重新获取 Token
export const refreshTokenAPI = (refreshToken: string) => {
  return instance.get('/user/refresh', {
    headers: {
      authorization: 'Bearer ' + refreshToken, // 更换authorization为refreshToken
    },
  })
}

```

### 4-3、实际效果图

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ffb707c8693c4282a5fa2d5646b10814~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.image?)
