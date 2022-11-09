---
createTime: 2022/11/09
tag: '工程化,Node'
---

# 需要了解的nodejs知识（工具模块）

## Util

Node.js 的工具模块

### 常用的判断属性，在util.types对象

* isDate：判断是否是日期格式的变量
* isAnyArrayBuffer：判断是否是buffer
* isAsyncFunction：判断函数是否是异步的

```js
let util = require('util');

// types: 判断变量/函数的一些类型
const {isAnyArrayBuffer,isAsyncFunction,isDate} = util.types
// isDate
const is_date = isDate(new Date())
const is_date2 = isDate('2022-09-01')
console.log('is_date2: ', is_date2);
console.log('is_date: ', is_date);
// isAnyArrayBuffer
const isBuff1 = isAnyArrayBuffer('buffer')
console.log('isBuff1: ', isBuff1);
const isBuff2 = isAnyArrayBuffer(new ArrayBuffer(14))
console.log('isBuff2: ', isBuff2);
// isAsyncFunction
const f2 = async function function2(){} 
const f1 = function function1(){} 
const isAsyncFunc = isAsyncFunction(f1)
const isAsyncFunc2 = isAsyncFunction(f2)
console.log('isAsyncFunc2: ', isAsyncFunc2);
console.log('isAsyncFunc: ', isAsyncFunc);

```

### 常用的方法和属性

* format:格式化字符串
* inspect: 将对象转为字符串
* isDeepStrictEqual：判断两个字符是否强相等，相当于===
* deprecate：将函数包装为弃用

```js
// inspect
const obj = {name:'inspect',date:'2022-09-01'}
const str = util.inspect(obj)
console.log('str: ', str);

// 格式化字符串util.format(arg1,arg2,arg3,arg4)
const str2 = util.format('%s:%s','12','34','56')
console.log('str2: ', str2);

// deprecate
util.deprecate(()=>{
    console.log('this is a deprecate func')
})
// isDeepStrictEqual 
const v1 = '2'
const v2 = 2;
const isEqual = util.isDeepStrictEqual(v1,v2)
console.log('isEqual: ', isEqual);
console.log(v1 == v2);
console.log(v1 === v2);

```

## DNS

Node.js DNS 模块用于解析域名

* DNS(Domain Name System): 域名系统、
  * 组成：他是由解析器和域名服务器组成
  * 作用：域名解析，将域名转换成IP地址，将IP地址转换成域名列表
* nodejs中DNS支持域名和对应IP地址的相互解析，主要代码如下：

```js
let dns = require("dns");

//lookup（底层系统工具进行）：将域名（比如 'runoob.com'）解析为第一条找到的记录 A （IPV4）或 AAAA(IPV6)。
const hostname = "www.runoob.com";
dns.lookup(hostname, function (err, address, famliy) {
  if (!err) {
    console.log(hostname + "绑定的IP地址为：" + address);
  }
});
//lookupService：实现给定的ip地址和端口号，解析为对应的域名
dns.lookupService("104.20.23.46", 80, (err, hostname, service) => {
  if (err) {
    console.log(err);
  }
  console.log("主机：" + hostname);
  console.log("协议：" + service);
});
//resolve：使用网络域名系统
dns.resolve("nodejs.org", (err, address) => {
  if (err) {
    return;
  }
  console.log('resolve address: ', address);
});

// reverse：反向解析 IP 地址，指向该 IP 地址的域名数组。
const ip = "192.30.252.130";
dns.reverse(ip, function (err, hostnames) {
  if (!err) {
    console.log(ip + "IP绑定的语言数组为：" + hostnames);
  } else {
    console.log(err);
  }
});
// 返回当前正在使用的ip地址
const servers = dns.getServers();
console.log("current server ip address: ", servers);


```

## OS

Node.js OS 模块提供了一些基本系统操作函数

### 常用的方法和属性

* networkInterfaces获取网络信息
* cpus：获取系统的CPU内核细腻，返回个数组
* totalmem：系统总共内存容量
* freemem：系统空余内存变量
* hostname：系统主机名
* version: 系统内核版本的字符串

```js
    const os =require('os');
    console.log('系统所有内存变量为（单位M）：',os.totalmem()/1024/1024);
    console.log('系统空余内存变量为（单位M）：',os.freemem()/1024/1024);
    console.log('系统主机名：',os.hostname());
    console.log('系统主机内核版本：',os.version());

```

* platform: 主机操作系统平摊
* type: 主机的操作系统平台名称,可能的值为'aix'、'darwin'、'freebsd'、'linux'、'openbsd'、'sunos'、以及 'win32'。
* uptime: 操作系统正常运行时间

```js
console.log('主机的平台：',os.platform());
console.log('主机的平台名称：',os.type());
console.log('主机的x正常运行时间：',os.uptime()/3600/24);

```

## Path

nodejs用来处理文件路径的工具模块，主要处理绝对路径，相对路径

### 常用的方法和属性

```js
const path = require('path')

//属性- 平台路径的分隔符
const sep =path.sep;
console.log('sep: ', sep);
//属性- 分隔符获取
const delimiter = path.delimiter;
console.log('delimiter: ', delimiter);
//属性- 提供上述 path 的方法，不过总是以 win32 兼容的方式交互。
const win32 = path.win32;
// console.log('win32: ', win32);

// resolve参数解析为绝对路径
const r1 = path.resolve(__dirname,'../');
console.log('r1: ', r1);
// join参数拼接为一个路径
const j1 = path.join(r1,'http/app.js')
console.log('j1: ', j1);
// path.relative(from, to)用于将绝对路径转为相对路径，返回从 from 到 to 的相对路径（基于当前工作目录）
const r2 = path.relative(j1,'http/app.js')
console.log('rl: ', r2);
// isAbsolute判断是否是绝对路径
const isAbs1 = path.isAbsolute(r2)
console.log('isAbs1: ', isAbs1);
const isAbs2 = path.isAbsolute(j1)
console.log('isAbs2: ', isAbs2);
// path.dirname(p):返回路径中代表文件夹的部分，同 Unix 的dirname 命令类似。
const dir = path.dirname(j1)
console.log('dir: ', dir);
// path.basename：返回路径中的最后一部分。同 Unix 命令 bashname 类似。
const basename = path.basename(j1)
console.log('basename: ', basename);
// path.extname(p): 返回路径中文件的后缀名，即路径中最后一个'.'之后(包含'.')的部分。如果一个路径中并不包含'.'或该路径只包含一个'.' 且这个'.'为路径的第一个字符，则此命令返回空字符串。
const extname = path.extname(j1);
console.log('extname: ', extname);
// path.parse(pathString):返回路径字符串的对象,与path.format相反。
const pathObj = path.parse('D:\\demo\\demo\\nodejs\\http\\app.js')
console.log('pathObj: ', pathObj);
// path.format(pathObject):从对象中返回路径字符串，和 path.parse 相反。
const pathStr = path.format(pathObj)
console.log('pathStr: ', pathStr);


```
