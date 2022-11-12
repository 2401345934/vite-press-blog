---
createTime: 2022/11/12
tag: 'utils'
---
# 请求 utils

## 请求结果缓存

```js
// 最多缓存接口数
const CACHE_MAX = 20;
const cache = (function () {
  const cache = {};
  const cacheArr = [];
  return {
    get: function (params) {
      const uniKey = JSON.stringify(params);
      return new Promise((resolve, reject) => {
        if (cache[uniKey]) {
          // promise特性，如果resolve出去的是一个promise，则会替代外层promise
          resolve(cache[uniKey]);
        } else {
          const promise = getRequest(params)
            .then((res) => {
              if (cacheArr.length > CACHE_MAX) {
                const _api = cacheArr.shift();
                this.remove(_api);
              }
              this.set(uniKey, res);
              resolve(res);
              return res;
            })
            .catch((err) => {
              reject(err);
            });
          // 此处还做了单请求限制
          return (cache[uniKey] = promise);
        }
      });
    },
    set: function (uniKey, data) {
      cache[uniKey] = data;
      cacheArr.push(uniKey);
    },
    remove: function (uniKey) {
      // 释放内存
      cache[uniKey] = null;
      delete cache[uniKey];
    },
  };
}());
```
