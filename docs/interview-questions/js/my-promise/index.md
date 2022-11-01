---
createTime: 2022/10/11
tag: 'js'
---
# 手写 promise

## MyPromise

```javascript
class MyPromise {
  // 定义 promise 状态
  static PENDING = 'pending'
  static FULFILLED = 'fulfilled'
  static REJECTED = 'rejected'

  constructor(surper) {
    this.value = null
    // 赋值初始状态
    this.state = MyPromise.PENDING
    // 存放callback
    this.callbacks = []
    try {
      surper(this.resolve, this.reject)
    } catch (err) {
      this.reject(err)
    }
  }

  resolve = (value) => {
    if (this.state !== MyPromise.PENDING) return
    this.state = MyPromise.FULFILLED
    this.value = value
    setTimeout(() => {
      this.callbacks.forEach(item => {
        item.reso(value)
      })
    });

  }
  reject = (reason) => {
    if (this.state !== MyPromise.PENDING) return
    this.state = MyPromise.REJECTED
    this.value = reason
    setTimeout(() => {
      this.callbacks.forEach(item => {
        item.reje(reason)
      })
    });

  }

  then = (reso, reje) => {
    if (typeof reso !== 'function') {
      reso = () => this.valeu
    }
    if (typeof reje !== 'function') {
      reje = () => this.valeu
    }
    return new MyPromise((resolve, reject) => {
      if (this.state === MyPromise.PENDING) {
        this.callbacks.push({
          reso: value => {
            try {
              const result = reso(value)
              resolve(result)
            } catch (err) {
              reje(err)
            }
          },
          reje: value => {
            try {
              const result = reje(value)
              resolve(result)
            } catch (err) {
              reje(err)
            }
          },
        })

      }
      if (this.state === MyPromise.FULFILLED) {
        setTimeout(() => {
          try {
            const result = reso(this.value)
            resolve(result)
          } catch (err) {
            reject(err)
          }
        })

      }
      if (this.state === MyPromise.REJECTED) {
        setTimeout(() => {
          try {
            const result = reje(this.value)
            resolve(result)
          } catch (err) {
            reject(err)
          }
        })

      }

    })
  }


}



```

## Promise.race

```javascript
Promise.myRace = function (promises) {
  return new Promise((resolve, reject) => {
    // promises 可以不是数组，但必须要具有 Iterator 接口
    if (typeof promises[Symbol.iterator] !== 'function') {
      reject('TypeError: promises is not iterable')
    }
    for (const item of promises) {
      // 先出来的结果会被 resolve 或 reject 出去, 一旦状态变化就不会再变
      Promise.resolve(item).then(resolve, reject)
    }
  })
}

// test
function p1() {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, 1000, 1)
  })
}
function p2() {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, 1000, 2)
  })
}
Promise.myRace([p1(), p2()]).then((res) => {
  console.log(res) // 1
})

```

## Promise.any

```javascript
Promise.myAny = function (promises) {
  return new Promise((resolve, reject) => {
    // promises 可以不是数组，但必须要具有 Iterator 接口
    if (typeof promises[Symbol.iterator] !== 'function') {
      reject('TypeError: promises is not iterable')
    }
    const len = promises.length
    let count = 0
    for (let i = 0; i < len; i++) {
      Promise.resolve(promises[i]).then(resolve, (err) => {
        count += 1
        if (count === promises.length) {
          reject(new Error('所有 promise 都失败'))
        }
      })
    }
  })
}

// test
function p1() {
  return new Promise((resolve, reject) => {
    setTimeout(reject, 1000, 1)
  })
}
function p2() {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, 1000, 2)
  })
}
Promise.myAny([p1(), p2()]).then((res) => {
  console.log(res) // 2
})

```

## Promise.all

```javascript
Promise.myAll = function (promises) {
  return new Promise((resolve, reject) => {
    // promises 可以不是数组，但必须要具有 Iterator 接口
    if (typeof promises[Symbol.iterator] !== 'function') {
      reject('TypeError: promises is not iterable')
    }
    if (promises.length === 0) {
      resolve([])
    } else {
      const res = []
      const len = promises.length
      let count = 0
      for (let i = 0; i < len; i++) {
        // Promise.resolve 的作用是将普通值或 thenable 对象转为 promise，promise 则直接返回
        Promise.resolve(promises[i])
          .then((data) => {
            res[i] = data
            count += 1
            if (count === len) {
              resolve(res)
            }
          })
          .catch((err) => {
            reject(err)
          })
      }
    }
  })
}

// test
function p1() {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, 1000, 1)
  })
}
function p2() {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, 1000, 2)
  })
}
Promise.myAll([p1(), p2()]).then(res => {
  console.log(res) // [1, 2]
})

```
