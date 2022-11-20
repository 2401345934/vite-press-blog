---
createTime: 2022/11/20
tag: '场景题'
---
# 实时更新数据

----

先说一下这个**动态事件列表**的需求：我们的服务器每隔**5秒**会产生一个新的事件，每个事件都有一个id字段以及timestamp字段，id和timestamp字段都是该事件生成的时间戳，前端会以列表的形式展示目前服务端已产生的所有事件信息，后面当服务器产生新的事件时，前端会获取到**最新的事件**并添加到页面列表的末尾。

下面是项目的运行效果图: ![2022-09-03 17.57.08.gif](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/8f3068e3e7d54a7f93e691ef89d289f3~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.image?)

轮询
--

### 概念解释

我相信大多数程序员或多或少都使用过轮询来获取服务端的资源，简单来说轮询就是**客户端不停地调用服务端接口以获得最新的数据**。下图是一个简单的轮询过程: ![截屏2022-09-03 下午12.00.36.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/c55495f70a744b7683ddae1b22a2d2b7~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.image?) 在上图中客户端在发起请求后服务端会**立即响应**，不过因为这时服务端的数据没有更新所以返回了一个空的结果给客户端。客户端在**等待了一段时间后**(可能是几秒)，再次请求服务端的数据，这时由于服务端的数据发生了更新，所以会给客户端返回最新的数据，客户端在拿到数据后等待一下然后继续发送请求，如此反复。

### 代码实现

下面就让我们用轮询来实现动态事件列表的需求, 首先是Node代码:

```js
// node/polling.js

const http = require('http')
const url = require('url')

// 时间列表
const events = []
// 最新生成的事件时间
let latestTimestamp = 0

// 事件生产者
const EventProducer = () => {
  const event = {
    id: Date.now(),
    timestamp: Date.now()
  }
  events.push(event)
  latestTimestamp = event.timestamp
}

// 每隔5秒生成一个新的事件
setInterval(() => {
  EventProducer()
}, 5000)

const server = http.createServer((req, resp) => {
  const urlParsed = url.parse(req.url, true)

  resp.setHeader('Access-Control-Allow-Origin', '*')
  resp.setHeader('Origin', '*')

  if (urlParsed.pathname == '/events') {
    // 每次客户端都带上它最后拿到的事件时间戳来获取新的事件
    const timestamp = parseInt(urlParsed.query['timestamp'])
    // 判断客户端是否拿到最新事件
    if (timestamp < latestTimestamp) {
      // 将所有没发送过给这个客户端的事件一次性发送出去
      resp.write(JSON.stringify(events.filter(event => event.timestamp > timestamp)))
    }
    resp.end()
  }
})

server.listen(8080, () => {
  console.log('server is up')
})

```

上面的代码十分简单，我们实现了一个`events`API，前端每次都会带上上一次的时间戳来请求这个时间点后的最新事件。接着再来看一下前端的实现:

```js
// react/Polling.jsx

import { useEffect, useRef, useState } from 'react'

const fetchLatestEvents = async (timestamp) => {
  // 获取最新的事件
  const body = await fetch(`http://localhost:8080/events?timestamp=${timestamp}`)
  if (body.ok) {
    const json = await body.json()
    return json
  } else {
    console.error('failed to fetch')
  }
}

function App() {
  // 记录当前客户端拿到的最新事件的timestamp
  const timestampRef = useRef(0)
  const [events, setEvents] = useState([])
  
  useEffect(() => {
    const timer = setInterval(async () => {
      const latestEvents = await fetchLatestEvents(timestampRef.current)
      if (latestEvents && latestEvents.length) {
        timestampRef.current = latestEvents[latestEvents.length - 1].timestamp
        setEvents(events => [...events, ...latestEvents])
      }
    }, 3000)

    return () => {
      clearInterval(timer)
    }
  }, [])

  return (
    <div className="App">
      <h2>event list</h2>
      <ol>
        {
          events.map(event => {
            return <li key={event.id}>{`${event.id}`}</li>
          })
        }
      </ol>
    </div>
  );
}

export default App

```

打开Chrome的Devtools我们发现，前端每隔3s向后端请求一次，请求得相当频繁，并且在后端没有产生新数据的时候，很多请求的返回值是空的，也就是说`大多数的网络资源都被浪费了`。

![请求有很多空响应](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/c3b43a422b434419bf33c3d9ffd06540~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.image?)

### Polling的优缺点

从上面的代码我们可以看出，短轮询这个技术方案最大的优点就是`实现简单`，而它的缺点也很明显：

* 无用的请求多: 因为客户端不知道服务端什么时候有数据更新，所以它只能不停地询问服务端，如果服务端的数据更新并不频繁的话，这些请求大多都是无用的。无用的请求会导致服务端的带宽占用增加，消耗服务端资源，同时如果客户端是一些移动设备的话，耗电速度也会很快。
* 数据实时性差: 由于不想消耗太多客户端或者服务端的资源，我们通常在实现轮询时不会拿到上一个请求的结果后立即发送第二个请求，这就导致了即使服务端的数据更新了，我们客户端还是需要一段时间才能拿到最新的数据，这对于一些数据实时性要求高的应用例如IM系统是致命的。

### 使用场景

一般生产级别的应用都不会使用短轮询这个方案，除非你只是写一些给少数人用的系统。

长轮询
---

看完了上面关于短轮询的介绍，我们知道了轮询有两个重大的缺陷：`一个是无用请求过多，另外一个是数据实时性差`。为了解决这两个问题，某些聪明的程序员就发明了另外一个方案：长轮询。下面是一个简单的长轮询示意图： ![截屏2022-09-03 下午12.02.31.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/4070b0ca25204ca19a8ecc8c67b3161b~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.image?) 在上图中，客户端发起请求后，服务端发现当前没有新的数据，这个时候服务端没有立即返回请求，而是`将请求挂起`，在等待一段时间后(一般为30s或者是60s)，发现还是没有数据更新的话，就返回一个空结果给客户端。客户端在收到服务端的回复后，`立即再次向服务端发送新的请求`。这次服务端在接收到客户端的请求后，同样等待了一段时间，这次好运的是服务端的数据发生了更新，服务端给客户端返回了最新的数据。客户端在拿到结果后再次发送下一个请求，如此反复。

### 代码实现

接着就让我们使用长轮询来动态实现事件列表的功能，先看一下后端代码:

```js
// node/long-polling.js

const http = require('http')
const url = require('url')

const events = []

let timers = new Set()
// 当前挂起的请求
let subscribers = new Set()

const EventProducer = () => {
  const event = {
    id: Date.now(),
    timestamp: Date.now()
  }
  events.push(event)
  
  // 通知所有挂起的请求
  subscribers.forEach(subscriber => {
    subscriber.resp.write(JSON.stringify(events.filter(event => event.timestamp > subscriber.timestamp)))
    subscriber.resp.end()
  })
  // 重置subscribers
  subscribers.clear()
  // 取消请求的超时回调
  timers.forEach(timer => clearTimeout(timer))
  // 重置timers
  timers.clear()
}

// 5秒生成一个事件
setInterval(() => {
  EventProducer()
}, 5000)

const server = http.createServer((req, resp) => {
  const urlParsed = url.parse(req.url, true)

  resp.setHeader('Access-Control-Allow-Origin', '*')
  resp.setHeader('Origin', '*')

  if (urlParsed.pathname == '/list') {
    // 发送服务端现存事件
    resp.write(JSON.stringify(events))
    resp.end()
  } else if (urlParsed.pathname == '/subscribe') {
    const timestamp = parseInt(urlParsed.query['timestamp'])
    const subscriber = {
      timestamp,
      resp
    }
    // 新建的连接挂起来
    subscribers.add(subscriber)
    
    // 30s超时，自动关闭连接
    const timer = setTimeout(() => {
      resp.end()
      timers.delete(timer)
    }, 30000)
    
    // 客户端主动断开连接
    req.on('close', () => {
      subscribers.delete(subscriber)
      clearTimeout(timer)
    })
    
    timers.add(timer)
  }
})

server.listen(8080, () => {
  console.log('server is up')
})

```

上面的代码中每来一个新的连接我们都会将它挂起来(保存在set里面)，然后当有新的事件产生时再将所有该客户端没有获取过的事件返回给它，接着来看一下前端代码的实现:

```js
// react/LongPolling.jsx

import { useEffect, useRef, useState } from 'react'

const fetchLatestEvents = async (timestamp) => {
  const body = await fetch(`http://localhost:8080/subscribe?timestamp=${timestamp}`)
  if (body.ok) {
    const json = await body.json()
    return json
  } else {
    console.error('failed to fetch')
  }
}

const listEvents = async () => {
  const body = await fetch(`http://localhost:8080/list`)
  if (body.ok) {
    const json = await body.json()
    return json
  } else {
    console.error('failed to fetch')
  }
}

function App() {
  const timestampRef = useRef(0)
  const eventsRef = useRef([])
  const [refresh, setRefresh] = useState(false)
  
  useEffect(() => {
    const fetchTask = async () => {
      if (timestampRef.current === 0) {
        // 初次加载
        const currentEvents = await listEvents()
        timestampRef.current = currentEvents[currentEvents.length - 1].timestamp
        eventsRef.current = [...eventsRef.current, ...currentEvents]
      }
  
      const latestEvents = await fetchLatestEvents(timestampRef.current)
      if (latestEvents && latestEvents.length) {
        timestampRef.current = latestEvents[latestEvents.length - 1].timestamp
        eventsRef.current = [...eventsRef.current, ...latestEvents]
      }
    }

    fetchTask()
      .catch(err => {
        console.error(err)
      })
      .finally(() => {
        // 触发下次加载
        setRefresh(refresh => !refresh)
      })
  }, [refresh])

  return (
    <div className="App">
      <h2>event list</h2>
      <ol>
        {
          eventsRef.current.map(event => {
            return <li key={event.id}>{`${event.id}`}</li>
          })
        }
      </ol>
    </div>
  );
}

export default App

```

值得注意的是，这个时候，我们打开浏览器的调试工具可以发现浏览器每一次发出的请求都不会立马收到回复，而是pending一段时间后(大概是5秒)才会有结果，并且结果里面都是有数据的。

![截屏2022-09-04 上午8.31.23.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/280f98ea843a4e86af4ab19781207675~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.image?)

### Long Polling的优缺点

长轮询很完美地解决了短轮询的问题，首先服务端在没有数据更新的情况下没有给客户端返回数据，所以避免了客户端大量的重复请求。再者客户端在收到服务端的返回后，马上发送下一个请求，这就保证了更好的数据实时性。不过长轮询也不是完美的:

* 服务端资源大量消耗: 服务端会一直hold住客户端的请求，这部分请求会占用服务器的资源。对于某些语言来说，每一个HTTP连接都是一个独立的线程，过多的HTTP连接会消耗掉服务端的内存资源。
* 难以处理数据更新频繁的情况: 如果数据更新频繁，会有大量的连接创建和重建过程，这部分消耗是很大的。虽然HTTP的keep-alive字段可以解决一部分问题，不过每次拿到数据后客户端都需要重新subscribe，因此相对于WebSocket和SSE它多了一个发送新请求的阶段，对实时性和性能还是有影响的。

### 应用场景

从网上找的资料来看之前的WebQQ和Web微信都是基于长轮询实现的，现在是不是我就不知道了，有兴趣的读者可以自行验证一下。

WebSocket
---------

### 概念解释

上面说到长轮询不适用于服务端资源频繁更新的场景，而解决这类问题的一个方案就是WebSocket。用最简单的话来介绍WebSocket就是：**客户端和服务器之间建立一个持久的长连接，这个连接是双工的，客户端和服务端都可以实时地给对方发送消息**。下面是WebSocket的图示:

![截屏2022-09-03 上午11.35.00.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/44758368f3bd42f2b39ef0c699e232f1~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.image?) 在上图中，首先客户端会给服务端发送一个HTTP请求，这个请求的Header会告诉服务端它想基于WebSocket协议通信，如果服务端支持升级协议的话，会给客户端发送一个**Switching Protocal**的响应，它们之间后面都是基于WebSocket协议来通信了。

### 代码实现

我们再来看一下如何使用WebSocket来实现动态事件列表的需求，下面是后端代码:

```js
// node/websocket.js

const WebSocket = require('ws')

const events = []
let latestTimestamp = Date.now()

const clients = new Set()

const EventProducer = () => {
  const event = {
    id: Date.now(),
    timestamp: Date.now()
  }
  events.push(event)
  latestTimestamp = event.timestamp
  
  // 推送给所有连接着的socket
  clients.forEach(client => {
    client.ws.send(JSON.stringify(events.filter(event => event.timestamp > client.timestamp)))
    client.timestamp = latestTimestamp
  })
}

// 每5秒生成一个新的事件
setInterval(() => {
  EventProducer()
}, 5000)

// 启动socket服务器
const wss = new WebSocket.Server({ port: 8080 })

wss.on('connection', (ws, req) => {
  console.log('client connected')

  // 首次连接，推送现存事件
  ws.send(JSON.stringify(events))
  
  const client = {
    timestamp: latestTimestamp,
    ws,
  }
  clients.add(client)

  ws.on('close', _ => {
    clients.delete(client)
  })
})

```

上面的代码中客户端连接服务端的时候，服务端会记住客户端的时间戳，当新事件产生的时候会给客户端推送所有的新事件。下面是前端代码实现:

```js
// react/LongPolling.jsx

import { useEffect, useRef, useState } from 'react'

function App() {
  const timestampRef = useRef(0)
  const eventsRef = useRef([])
  const [_, setRefresh] = useState(false)
  
  useEffect(() => {
    const ws = new WebSocket(`ws://localhost:8080/ws?timestamp=${timestampRef.current}`)
    
    ws.addEventListener('open', e => {
      console.log('successfully connected')
    })
    
    ws.addEventListener('close', e => {
      console.log('socket close')
    })
    
    ws.addEventListener('message', (ev) => {
      const latestEvents = JSON.parse(ev.data)
      if (latestEvents && latestEvents.length) {
        timestampRef.current = latestEvents[latestEvents.length - 1].timestamp
        eventsRef.current = [...eventsRef.current, ...latestEvents]
        setRefresh(refresh => !refresh)
      }
    })
    
    return () => {
      ws.close()
    }
  }, [])

  return (
    <div className="App">
      <h2>event list</h2>
      <ol>
        {
          eventsRef.current.map(event => {
            return <li key={event.id}>{`${event.id}`}</li>
          })
        }
      </ol>
    </div>
  );
}

export default App

```

打开Chrome的网络调试工具点击ws，你会发现客户端和服务端只有一个websocket连接，它们所有的通信都是发生在这个连接上面的: ![截屏2022-09-03 下午5.51.23.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/17998aa6d8924de68855ca73c786a663~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.image?)

### WebSocket的优缺点

总的来说，我认为WebSocket有下面这些优点：

* 客户端和服务端建立连接的次数少：理想情况下客户端只需要发送一个HTTP升级协议就可以升级到WebSocket连接，后面所有的消息都是通过这个通道进行通信，无需再次建立连接。
* 消息实时性高：由于客户端和服务端的连接是一直建立的，所以当数据更新的时候可以马上推送给客户端。
* 双工通信：服务端和客户端都可以随时给对方发送消息，这对于本文的其它三种方案都是很难做到的。
* 适用于服务端数据频繁更新的场景：和长轮询不同，服务端可以随时给客户端推送新的信息，而客户端在拿到信息后不需要重新建立连接或者发送请求，因此WebSocket适合于数据频繁更新的场景。

同样WebSocket也不是完美的，它有下面这些问题：

* 扩容麻烦：基于WebSocket的服务是`有状态的`。这就意味着在扩容的时候很麻烦，系统设计也会较复杂。
* 代理限制：某些代理层软件(如Nginx)默认配置的长连接时间是有限制的，可能只有几十秒，这个时候客户端需要自动重连。要想突破这个限制你就需要将从客户端到服务端之间所有的代理层的配置都改掉，在现实中这可能是不可行的。

### 应用场景

WebSocket的应用场景是一些`实时性要求很高的而且需要双工通信`的系统例如IM软件等。

Server-Sent Events
------------------

### 概念解释

Server-Sent Events简称`SSE`，是一个`基于HTTP协议的服务端向客户端推送数据的技术`。下面是一个简单的SSE图示: ![截屏2022-09-03 下午12.14.06.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/161982d15d68404da9d0366cbb39d1c5~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.image?) 在上图中，客户端向服务端发起一个`持久化的HTTP连接`，服务端接收到请求后，会挂起客户端的请求，有新消息时，再通过这个连接将数据推送给客户端。这里需要指出的是和WebSocket长连接不同，SSE的连接是`单向的`，也就是说它`不允许客户端向服务端发送消息`。

### 代码实现

和上面一样，我们使用SSE来实现一下动态事件列表的需求，先看后端代码:

```js
// node/sse.js

const http = require('http')

const events = []
const clients = new Set()
let latestTimestamp = Date.now()

const headers = {
  // 告诉HTTP连接，它是一个event-stream的请求
  'Content-Type': 'text/event-stream',
  // 保持HTTP连接不断开
  'Connection': 'keep-alive',
  'Cache-Control': 'no-cache',
  'Access-Control-Allow-Origin': '*',
  "Origin": '*'
}

const EventProducer = () => {
  const event = {
    id: Date.now(),
    timestamp: Date.now()
  }
  events.push(event)
  latestTimestamp = event.timestamp

  clients.forEach(client => {
    client.resp.write(`id: ${(new Date()).toLocaleTimeString()}\n`)
    // 后面的两个\n\n一定要有，可以理解为服务端先客户端推送信息的特殊格式
    client.resp.write(`data: ${JSON.stringify(events.filter(event => event.timestamp > client.timestamp))}\n\n`)
    client.timestamp = latestTimestamp
  })
}

// 每5秒生成一个新的事件
setInterval(() => {
  EventProducer()
}, 5000)

const server = http.createServer((req, resp) => {
  const urlParsed = url.parse(req.url, true)

  if (urlParsed.pathname == '/subscribe') {
    resp.writeHead(200, headers)
    
    // 发送现存事件
    resp.write(`id: ${(new Date()).toLocaleTimeString()}\n`)
    resp.write(`data: ${JSON.stringify(events)}\n\n`)
   
    const client = {
      timestamp: latestTimestamp,
      resp
    }
    
    clients.add(client)
    req.on('close', () => {
      clients.delete(client)
    })
  }
})

server.listen(8080, () => {
  console.log('server is up')
})

```

在上面的代码中，每次客户端给服务端发送请求后，服务端先给客户端返回所有的现存事件然后将该请求挂起，在新的事件生成时再给客户端返回所有的新事件。下面是前端代码实现:

```js
// react/SSE.jsx
import { useEffect, useRef, useState } from 'react'

function App() {
  const timestampRef = useRef(0)
  const eventsRef = useRef([])
  const [, setRefresh] = useState(false)
  
  useEffect(() => {
    const source = new EventSource(`http://localhost:8080/subscribe?timestamp=${timestampRef.current}`)
    
    source.onopen = () => {
      console.log('connected')
    }
    
    source.onmessage = event => {
      const latestEvents = JSON.parse(event.data)
      if (latestEvents.length) {
        timestampRef.current = latestEvents[latestEvents.length - 1].timestamp
        eventsRef.current = [...eventsRef.current, ...latestEvents]
        setRefresh(refresh => !refresh)
      }
    }
    
    source.addEventListener('error', (e) => {
      console.error('Error: ',  e);
    })

    return () => {
      source.close()
    }
  }, [])

  return (
    <div className="App">
      <h2>event list</h2>
      <ol>
        {
          eventsRef.current.map(event => {
            return <li key={event.id}>{`${event.id}`}</li>
          })
        }
      </ol>
    </div>
  );
}

export default App

```

打开Chrome的网络调试工具，会发现HTTP请求变成了EventStream类型，而且服务端给客户端所有的事件推送都在这个连接上，而无需建立新的连接。

![截屏2022-09-03 下午6.38.44.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/84cf6389f3c94b4ead2508d8960841da~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.image?)

### SSE的优缺点

在我看来，SSE的技术有下面的优点：

* 连接数少： 客户端和服务端只有一个持久的HTTP连接，因此性能也是很好的。
* 数据实时性高: 它比长轮询更加实时，因为服务端和客户端的连接是持久的，所以有新消息的话可以直接推送到客户端。

SSE的问题也很明显：

* 单向通信: SSE长连接是单向的，不允许客户端给服务端推送数据。
* 代理层限制: 和WebSocket一样会遇到代理层配置的问题，配置错误的话，客户端需要不断和服务端进行重连。

### 使用场景

SSE技术适合一些只需要服务端单向推送事件给客户端的场景，例如股票行情推送软件。
