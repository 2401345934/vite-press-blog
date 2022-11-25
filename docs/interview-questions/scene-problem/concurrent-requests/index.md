---
createTime: 2022/11/13
tag: '场景题,并发'
---
# 关于前端：如何实现并发请求数量控制？

## 场景

假设有这么一个场景：现在有`20`个异步请求需要发送，但是由于某些原因，要求我们必须将同一时刻的并发请求数量控制在`3`个以内，并且还要尽可能快速的拿到响应结果。其实这个场景在一些大厂的面试题中也有过提及，如下：

实现一个并发请求函数concurrencyRequest(urls, maxNum)，要求如下：

* 要求最大并发数 maxNum
* 每当有一个请求返回，就留下一个空位，可以增加新的请求
* 所有请求完成后，结果按照 urls 里面的顺序依次打出（发送请求的函数可以直接使用fetch即可）

遇到到这个问题时你会怎么来做？

遇到这个问题还是先来分析一下这个问题的设计思路→。

## 设计思路

首先来看将上面的文字转化为图之后的效果：

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/07bbe7e8bd9641d58569fdc2526d1a12~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.image?)

这样就直观的看到，有一个最大并发数`maxNum`，`20`个异步请求的`urls`集合和并发返回之后的`results`集合。

下面就开始演示这个思路是如何开始的，如下：

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/c7e9910c36ea44b8a8048ba2f61bc910~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.image?)

首先按照每次只能并发`3`个请求的要求，这里就对应`A、B、C`，当其中有一个请求完之后就会再从`urls`里面再取出一个进行请求，这样依次类推，直到`urls`里面的`20`个请求都执行完才终止请求。

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/8e34080a4e7a4b3a99ae2a81489ef85d~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.image?)

主要思路就是上面所述，但是在开发时我们要考虑一些特殊情况，如下：

* `urls`的长度为`0`时，`results`就没有值，此时应该返回空数组
* `maxNum`大于`urls`的长度时，应该取的是`urls`的长度，否则则是取`maxNum`
* 需要定义一个`count`计数器来判断是否已全部请求完成
* 因为没有考虑请求是否请求成功，所以请求成功或报错都应把结果保存在`results`集合中
* `results`中的顺序需和`urls`中的保持一致

好，我的设计思路就是这样的，下面就要来开始开发工作啦~

## 开发

具体代码如下（代码中已备注有注释）：

```js
// 并发请求函数
const concurrencyRequest = (urls, maxNum) => {
    return new Promise((resolve) => {
        if (urls.length === 0) {
            resolve([]);
            return;
        }
        const results = [];
        let index = 0; // 下一个请求的下标
        let count = 0; // 当前请求完成的数量

        // 发送请求
        async function request() {
            if (index === urls.length) return;
            const i = index; // 保存序号，使result和urls相对应
            const url = urls[index];
            index++;
            console.log(url);
            try {
                const resp = await fetch(url);
                // resp 加入到results
                results[i] = resp;
            } catch (err) {
                // err 加入到results
                results[i] = err;
            } finally {
                count++;
                // 判断是否所有的请求都已完成
                if (count === urls.length) {
                    console.log('完成了');
                    resolve(results);
                }
                request();
            }
        }

        // maxNum和urls.length取最小进行调用
        const times = Math.min(maxNum, urls.length);
        for(let i = 0; i < times; i++) {
            request();
        }
    })
}

```

## 测试

测试代码如下：

```js
const urls = [];
for (let i = 1; i <= 20; i++) {
    urls.push(`https://jsonplaceholder.typicode.com/todos/${i}`);
}
concurrencyRequest(urls, 3).then(res => {
    console.log(res);
})

```

## 结果

下面通过运行代码来看看效果：

首先来看看控制台输出的结果，如下：

![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/4c8ea31912dc453da2b40aa1a8a87a7e~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.image?)

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/d0b8c31dff2d403d9db7c7263412dcf5~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.image?)

可以看到`20`个请求都请求完成，`results`里面也是按顺序打印出了结果。

然后再看看请求时请求数量是否每次都是`3`个，如下：

![test1.gif](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/5ed226dce0674af09bdbac1617aac8ab~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.image?)

通过上面这个`gif`图可以很直观的看到，每次请求的数量都是`3`个，证明写的代码没有毛病，搞定！

至此，这个在实际开发中会遇见的前端控制并发请求的需求就实现完成了。代码相对来说没有太大的难度，只要把一些特殊情况给考虑完全，最后的实现也就没什么太大问题。最后，希望看完这篇文章之后你也能轻松掌握前端控制并发数量的问题，栓Q~
