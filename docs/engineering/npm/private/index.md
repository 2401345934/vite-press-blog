---
createTime: 2022/10/26
tag: '工程化,npm'
---
# 30 秒搭建一个 npm 私服库

## 下载依赖  verdaccio

```javascript
sudo npm i -g verdaccio
```

## 下载完成之后会提供一个命令

```javascript
 /usr/local/lib/node_modules/verdaccio/bin/verdaccio
```

## 执行

```javascript
 /usr/local/lib/node_modules/verdaccio/bin/verdaccio
```

## 执行之后

## 提供一个本地服务地址

```js
http://localhost:4873/
```

## 然后按照这个步骤 登陆

```javascript
npm address --registry <http://localhost:4873/>
```

## 发布包

```javascript
npm publish --registry <http://localhost:4873/>
```

## 发布一个私有域名的包

```javascript
npm publish --access=public
```
