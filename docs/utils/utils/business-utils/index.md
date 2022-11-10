---
createTime: 2022/10/29
tag: 'utils'
---
# 业务utils

## 判断图片尺寸

``` js
  function checkFile(f) {
      // 判断图片尺寸
      var img = null
      img = document.createElement('img')
      document.body.insertAdjacentElement('beforeend', img)
      img.style.visibility = 'hidden'
      img.src = f
      img.onload = () => {
        const imgwidth = img.offsetWidth
        const imgheight = img.offsetHeight
        //  ...
      }
    }
```

## 统计页面中所有标签的种类和个数

``` js
function getTagCount() {
  const tags = document.getElementsByTagName('*')
  const tagNames = []
  for (const val of tags) {
    // 把所有标签名转为小写，添加到数组中
    tagNames.push(val.tagName.toLocaleLowerCase())
  }
  const res = {}
  for (const val of tagNames) {
    if (!res[val]) {
      res[val] = 1
    } else {
      res[val]++
    }
  }
  return res
}

// test
console.log(getTagCount()) // { html: 1, head: 1, body: 1, div: 2, script: 1 }
```

## 计算首屏加载时间

``` js
console.log(new Date().getTime() - performance.timing.navigationStart)
```

## 检查设备上的触摸支持

``` js
const touchSupported = () => ('ontouchstart' in window || DocumentTouch && document instanceof DocumentTouch)
```

## 网页上获取选定的文本

``` js
const getSelectedText = () => window.getSelection().toString()
```

## 检测密码强度

``` js
// 检测密码强度
const checkPwd = str => {
  let Lv = 0
  if (str.length < 6) {
    return Lv
  }
  if (/[0-9]/.test(str)) {
    Lv++
  }
  if (/[a-z]/.test(str)) {
    Lv++
  }
  if (/[A-Z]/.test(str)) {
    Lv++
  }
  if (/[\.|-|_]/.test(str)) {
    Lv++
  }
  return Lv
}
```

## 求两个集合的交集

``` js
const intersect = (a, b) => {
  let _this = this
  a = this.unique(a)
  return this.map(a, function(o) {
    return _this.contains(b, o) ? o : null
  })
}
```

## 求两个集合的并集

``` js
 const union = (a, b) => {
  const newArr = a.concat(b)
  return this.unique(newArr)
}
```

## 动态引入js

``` js
const injectScript = src => {
  const s = document.createElement('script')
  s.type = 'text/JavaScript'
  s.async = true
  s.src = src
  const t = document.getElentsByTagName('script')[0]
  t.parentNode.insertBefore(s, t)
}

```

## 滚动到顶部

``` js
const scrollToTop = () => {
  const c = document.documentElement.scrollTop || document.body.scrollTop
  if (c > 0) {
    window.requestAnimationFrame(scrollToTop)
    window.scrollTo(0, c - c / 8)
  }
}
```

## el是否在视口范围

``` js
const elementIsVisibleInViewport = (el, partiallyVisible = false) => {
  const { top, left, right, bottom } = el.getBoundingClienRect()
  const { innerHeight, innerWidth } = window
  return partiallyVisible
    ? ((top > 0 && top < innerHeight) ||
        (bottom > 0 && bottom < innerHeight)) &&
        ((left > 0 && left < innerWidth) || (right > 0 && right < innerWidth))
    : top >= 0 && left >= 0 && bottom <= innerHeight && right <= innerWidth
}
```

## 洗牌算法随机

``` js
const shuffle = arr => {
  let result = []
  let random
  while (arr.length > 0) {
    random = Math.floor(Math.random() * arr.length)
    result.push(arr[random])
    arr.splice(random, 1)
  }
  return result
}
```

## 判断类型集合

``` js
const checkStr = (str, type) => {
  switch (type) {
    case 'phone':
      //手机号码
      return /^1[3|4|5|6|7|8|9][0-9]{9}$/.test(str);
    case 'tel':
      //座机
      return /^(0\d{2,3}-\d{7,8})(-\d{1,4})?$/.test(str);
    case 'card':
      //身份证 
      return /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(str);
    case 'pwd':
      //密码以字母开头，长度在6~18之间，只能包含字母、数字和下划线 
      return /^[a-zA-Z]\w{5,17}$/.test(str)
    case 'postal':
      //邮政编码
      return /[1-9]\d{5}(?!\d)/.test(str);
    case 'QQ':
      //QQ号
      return /^[1-9][0-9]{4,9}$/.test(str);
    case 'email':
      //邮箱 
      return /^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/.test(str);
    case 'money':
      //金额(小数点2位) 
      return /^\d*(?:\.\d{0,2})?$/.test(str);
    case 'URL':
      //网址
      return /(http|ftp|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&:/~\+#]*[\w\-\@?^=%&/~\+#])?/.test(str)
    case 'IP':
      //IP
      return /((?:(?:25[0-5]|2[0-4]\\d|[01]?\\d?\\d)\\.){3}(?:25[0-5]|2[0-4]\\d|[01]?\\d?\\d))/.test(str);
    case 'date':
      //日期时间
      return /^(\d{4})\-(\d{2})\-(\d{2}) (\d{2})(?:\:\d{2}|:(\d{2}):(\d{2}))$/.test(str) || /^(\d{4})\-(\d{2})\-(\d{2})$/.test(str) case 'number':
      //数字
      return /^[0-9]$/.test(str);
    case 'english':
      //英文
      return /^[a-zA-Z]+$/.test(str);
    case 'chinese':
      //中文
      return /^[\\u4E00-\\u9FA5]+$/.test(str);
    case 'lower':
      //小写 
      return /^[a-z]+$/.test(str);
    case 'upper':
      //大写
      return /^[A-Z]+$/.test(str);
    case 'HTML':
      //HTML标记
      return /<("[^"]*"|'[^']*'|[^'">])*>/.test(str);
    default:
      return true;
  }
}

```

## deepClone  深拷贝

``` js
const deepClone = obj => {
  // 先检测是不是数组和Object
  let isArr = Array.isArray(obj)
  let isJson = Object.prototype.toString.call(obj) === '[object Object]'
  if (isArr) {
    // 克隆数组
    let newObj = []
    for (let i = 0; i < obj.length; i++) {
      newObj[i] = deepClone(obj[i])
    }
    return newObj
  }
  if (isJson) {
    // 克隆Object
    let newObj = {}
    for (let i in obj) {
      newObj[i] = deepClone(obj[i])
    }
    return newObj
  }
  // 不是引用类型直接返回
  return obj
}
```

## unique  去重

``` js
const unique = arr => {
  let newArr = []
  let obj = {}
  arr.forEach(item => {
    if (typeof item !== 'object') {
      if (newArr.indexOf(item) === -1) {
        newArr.push(item)
      }
    } else {
      let str = JSON.stringify(item)
      if (!obj[str]) {
        newArr.push(item)
        obj[str] = 1
      }
    }
  })
  return newArr
}
```

## 判断数据类型

``` js
const typeOf = (obj) => {
  return Object.prototype.toString.call(obj).slice(8, -1).toLowerCase();
};
typeOf(value) === 'array'
typeOf(value) === 'object'

```

## getUUID

### createObjectURL

```javascript
URL.createObjectURL(new Blob()).substr(-36)
```

### 随机

```javascript
export function getUUID(len = 8, radix = 16) {
  let chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('')
  let uuid = []
  let i
  radix = radix || chars.length
  if (len) {
    for (i = 0; i < len; i++) uuid[i] = chars[Math.random() * radix]
  }
  return uuid.join('')
}
```

## 判断是否是 undefined null

```javascript
export function isUndef(v) {
  return v === undefined || v === null
}
```

## 判断不是 undefined null

```javascript
export function isDef(v) {
  return v !== undefined && v !== null
}

```

## 生成随机十六进制

```javascript
const randomHexColor = () => `#${Math.floor(Math.random() * 0xffffff).toString(16).padEnd(6, "0")}`
console.log(randomHexColor());
// #a2ce5b
```

## 检查当前选项卡是否在后台

```javascript
const isTabActive = () => !document.hidden; 

isTabActive()
// true|false
```

## 检测元素是否处于焦点

``` js
const elementIsInFocus = (el) => (el === document.activeElement);

elementIsInFocus(anyElement)
// 元素处于焦点返回true，反之返回false
```

## 检查设备类型

```javascript
const judgeDeviceType =
      () => /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|OperaMini/i.test(navigator.userAgent) ? 'Mobile' : 'PC';

judgeDeviceType()  // PC | Mobile
```

## 文字复制到剪贴板

``` js
const copyText = async (text) => await navigator.clipboard.writeText(text)
copyText('单行代码 前端世界')
```

## 将 RGB 转换为十六进制

```javascript
const rgbToHex = (r, g, b) =>   "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);

rgbToHex(255, 255, 255);
//  #ffffff
```

## 根据身份证号自动生成性别、出生日期和年龄

```javascript
//根据身份证号自动生成性别、出生日期和年龄
      const reg = /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/
      if (reg.test(value))) { // 身份证号码是否合法
        var org_birthday = value.substring(6, 14);
        var org_gender = value.substring(16, 17);
        var sex = org_gender % 2 == 1 ? "男" : "女";
        var birthday = org_birthday.substring(0, 4) + "-" + org_birthday.substring(4, 6) + "-" + org_birthday.substring(6, 8);
        var birthdays = new Date(birthday.replace(/-/g, "/"));
        let d = new Date();
        let age = d.getFullYear() - birthdays.getFullYear() - (d.getMonth() < birthdays.getMonth() || (d.getMonth() == birthdays.getMonth() && d.getDate() < birthdays.getDate()) ? 1 : 0);
      }
```

## 扁平数据结构转Tree

### 递归

```javascript
 /**
     * 递归查找，获取children
     */
    const getChildren = (data, result, pid) => {
      for (const item of data) {
        if (item.pid === pid) {
          const newItem = {
            ...item,
            children: []
          };
          result.push(newItem);
          getChildren(data, newItem.children, item.id);
        }
      }
    }
    /**
     * 转换方法
     */
    const arrayToTree = (data, pid) => {
      const result = [];
      getChildren(data, result, pid)
      return result;
    }



    console.log(arrayToTree(arr, 0))

```

### map  地址引用

```javascript
  function arrayToTree(items, parentId = 'pid') {
      const result = []; // 存放结果集
      const itemMap = {}; // 
      for (const item of items) {
        const id = item.id;
        const pid = item[parentId];

        itemMap[id] = {
          ...item || {},
          children: itemMap[id] ? itemMap[id]['children'] : []
        };

        const treeItem = itemMap[id];

        if (pid === 0) {
          result.push(treeItem);
        } else {
          if (!itemMap[pid]) {
            itemMap[pid] = {
              children: [],
            }
          }
          itemMap[pid].children.push(treeItem);
        }

      }
      return result;
    }

```

## 数字滚动

### 封装

```javascript
 /**
   * 实现数字滚动的效果的类
   */
  class DigitScroll {
    constructor(options) {
      //获取容器的DOM，没有则抛出错误
      this.container = document.querySelector(options.container);
      if (!this.container) {
        throw Error('no container');
      }
      this.container.style.overflow = 'hidden';
      this.container.style.display = 'flex';
      //可视容器高度 也是滚动间隔距离,容器要设置高度，否则默认30px
      this.rollHeight = parseInt(getComputedStyle(this.container).height) || 30;
      this.container.style.height = this.rollHeight + 'px';
    }
    roll(num) {
      // 将传入的要滚动的数字拆分后初始化每一位数字的容器
      this.initDigitEle(num);
      const numEles = this.container.querySelectorAll('.single-num');
      // 遍历生成每一位数字的滚动队列，如滚动到7，则生成内容为0，1，2，3，4，5，6，7的7个div，用于滚动动画
      [...numEles].forEach((numEle, index) => {
        const curNum = 0;
        let targetNum = Number(this.numberArr[index]);
        if (curNum >= targetNum) {
          targetNum = targetNum + 10;
        }
        let cirNum = curNum;
        // 文档碎片，拼凑好后一次性插入节点中
        const fragment = document.createDocumentFragment();
        // 生成从0到目标数字对应的div
        while (targetNum >= cirNum) {
          const ele = document.createElement('div');
          ele.innerHTML = cirNum % 10;
          cirNum++;
          fragment.appendChild(ele);
        }
        numEle.innerHTML = '';
        numEle.appendChild(fragment);
        //重置位置
        numEle.style.cssText += '-webkit-transition-duration:0s;-webkit-transform:translateY(0)';
        setTimeout(() => {
          numEle.style.cssText += `-webkit-transition-duration:1s;-webkit-transform:translateY(${
            -(targetNum - curNum) * this.rollHeight
          }px);`;
        }, 50);
      });
    }
    // 初始化容器
    initDigitEle(num) {
      // 数字拆分位数
      const numArr = num.toString().split('');
      // 文档碎片，拼凑好后一次性插入节点中
      const fragment = document.createDocumentFragment();
      numArr.forEach((item) => {
        const el = document.createElement('div');
        // 数字是要滚动的，非数字如.是不滚动的
        if (/[0-9]/.test(item)) {
          el.className = 'single-num';
          el.style.height = this.rollHeight + 'px';
          el.style.lineHeight = this.rollHeight + 'px';
        } else {
          el.innerHTML = item;
          el.className = 'no-move';
          el.style.verticalAlign = 'bottom';
        }
        // el.style.float='left';
        fragment.appendChild(el);
      }, []);
      this.container.innerHTML = '';
      this.container.appendChild(fragment);
      // 存储滚动的数字
      this.numberArr = numArr.filter((item) => /[0-9]/.test(item));
    }
  }
```

### 使用

```javascript
 const a = new DigitScroll({
      container: '#test',
      // container 要操作的DOM节点
    });
    a.roll(`400-30`);
    console.log(a);
```

## 处理海量数据

### React

#### 时间分片

时间分片主要解决，初次加载，一次性渲染大量数据造成的卡顿现象。浏览器执 js 速度要比渲染 DOM 速度快的多。，时间分片，并没有本质减少浏览器的工作量，而是把一次性任务分割开来，给用户一种流畅的体验效果。就像造一个房子，如果一口气完成，那么会把人累死，所以可以设置任务，每次完成任务一部分，这样就能有效合理地解决问题。

```tsx
/* 获取随机颜色 */
function getColor(){
    const r = Math.floor(Math.random()*255);
    const g = Math.floor(Math.random()*255);
    const b = Math.floor(Math.random()*255);
    return 'rgba('+ r +','+ g +','+ b +',0.8)';
 }
/* 获取随机位置 */
function getPostion(position){
     const { width , height } = position
     return { left: Math.ceil( Math.random() * width ) + 'px',top: Math.ceil(  Math.random() * height ) + 'px'}
}
/* 色块组件 */
function Circle({ position }){
    const style = React.useMemo(()=>{ //用useMemo缓存，计算出来的随机位置和色值。
         return {  
            background : getColor(),
            ...getPostion(position)
         }
    },[])
    return <div style={style} className="circle" />
}
    class Index extends React.Component{
    state={
        dataList:[],    //数据源列表
        renderList:[],  //渲染列表
        position:{ width:0,height:0 }, // 位置信息
        eachRenderNum:500,  // 每次渲染数量
    }
    box = React.createRef() 
    componentDidMount(){
        const { offsetHeight , offsetWidth } = this.box.current
        const originList = new Array(20000).fill(1)
        const times = Math.ceil(originList.length / this.state.eachRenderNum) /* 计算需要渲染此次数*/
        let index = 1
        this.setState({
            dataList:originList,
            position: { height:offsetHeight,width:offsetWidth },
        },()=>{
            this.toRenderList(index,times)
        })
    }
    toRenderList=(index,times)=>{
        if(index > times) return /* 如果渲染完成，那么退出 */
        const { renderList } = this.state
        renderList.push(this.renderNewList(index)) /* 通过缓存element把所有渲染完成的list缓存下来，下一次更新，直接跳过渲染 */
        this.setState({
            renderList,
        })
        requestIdleCallback(()=>{ /* 用 requestIdleCallback 代替 setTimeout 浏览器空闲执行下一批渲染 */
            this.toRenderList(++index,times)
        })
    }
    renderNewList(index){  /* 得到最新的渲染列表 */
        const { dataList , position , eachRenderNum } = this.state
        const list = dataList.slice((index-1) * eachRenderNum , index * eachRenderNum  )
        return <React.Fragment key={index} >
            {  
                list.map((item,index) => <Circle key={index} position={position}  />)
            }
        </React.Fragment>
    }
    render(){
         return <div className="bigData_index" ref={this.box}  >
            { this.state.renderList }
         </div>
    }
}
```

#### 虚拟列表

虚拟列表是一种长列表的解决方案，现在滑动加载是 M 端和 PC 端一种常见的数据请求加载场景，这种数据交互有一个问题就是，如果没经过处理，加载完成后数据展示的元素，都显示在页面上，如果伴随着数据量越来越大，会使页面中的 DOM 元素越来越多，即便是像 React 可以良好运用 diff 来复用老节点，但也不能保证大量的 diff 带来的性能开销。所以虚拟列表的出现，就是解决大量 DOM 存在，带来的性能问题。

```tsx
function VirtualList(){
   const [ dataList,setDataList ] = React.useState([])  /* 保存数据源 */
   const [ position , setPosition ] = React.useState([0,0]) /* 截取缓冲区 + 视图区索引 */
   const scroll = React.useRef(null)  /* 获取scroll元素 */
   const box = React.useRef(null)     /* 获取元素用于容器高度 */
   const context = React.useRef(null) /* 用于移动视图区域，形成滑动效果。 */
   const scrollInfo = React.useRef({ 
       height:500,     /* 容器高度 */
       bufferCount:8,  /* 缓冲区个数 */
       itemHeight:60,  /* 每一个item高度 */
       renderCount:0,  /* 渲染区个数 */ 
    }) 
    React.useEffect(()=>{
        const height = box.current.offsetHeight
        const { itemHeight , bufferCount } = scrollInfo.current
        const renderCount =  Math.ceil(height / itemHeight) + bufferCount
        scrollInfo.current = { renderCount,height,bufferCount,itemHeight }
        const dataList = new Array(10000).fill(1).map((item,index)=> index + 1 )
        setDataList(dataList)
        setPosition([0,renderCount])
    },[])
   const handleScroll = () => {
       const { scrollTop } = scroll.current
       const { itemHeight , renderCount } = scrollInfo.current
       const currentOffset = scrollTop - (scrollTop % itemHeight) 
       const start = Math.floor(scrollTop / itemHeight)
       context.current.style.transform = `translate3d(0, ${currentOffset}px, 0)` /* 偏移，造成下滑效果 */
       const end = Math.floor(scrollTop / itemHeight + renderCount + 1)
       if(end !== position[1] || start !== position[0]  ){ /* 如果render内容发生改变，那么截取  */
            setPosition([ start , end ])
       }
   } 
   const { itemHeight , height } = scrollInfo.current
   const [ start ,end ] = position
   const renderList = dataList.slice(start,end) /* 渲染区间 */
   console.log('渲染区间',position)
   return <div className="list_box" ref={box} >
     <div className="scroll_box" style={{ height: height + 'px'  }}  onScroll={ handleScroll } ref={scroll}  >
        <div className="scroll_hold" style={{ height: `${dataList.length * itemHeight}px` }}  />
        <div className="context" ref={context}> 
            {
               renderList.map((item,index)=> <div className="list" key={index} >  {item + '' } Item </div>)
            }  
        </div>
     </div>
   </div>
}
```

## 纯JS监听document是否加载完成

跨浏览器且纯JavaScript检测document是否加载完成的方法是使用readyState

```js
.

if (document.readyState === 'complete') {
  // 页面已完全加载
}
// 这样可以在document完全加载时监测到……

let stateCheck = setInterval(() => {
  if (document.readyState === 'complete') {
 clearInterval(stateCheck);
 // document ready
  }
}, 100);
// 或者使用onreadystatechange

document.onreadystatechange = () => {
  if (document.readyState === 'complete') {
 // document ready
  }
};
// 使用document.readyState === 'interactive'监听DOM是否加载完成。
```

## 取得文件扩展名

```javascript
var file1 = "50.xsl";
var file2 = "30.doc";
getFileExtension(file1); //returs xsl
getFileExtension(file2); //returs doc
function getFileExtension1(filename) {
  return (/[.]/.exec(filename)) ? /[^.]+$/.exec(filename)[0] : undefined;
}
function getFileExtension2(filename) {
  return filename.split('.').pop();
}
function getFileExtension3(filename) {
  return filename.slice((filename.lastIndexOf(".") - 1 >>> 0) + 2);
}
```

## 大文件 断点续传

### 创建切片

createFileChunks 方法接收两个参数

* 要进行切片的文件对象
* 切片大小，这里设置默认值为 1024*100，单位为字节

```javascript
// 创建切片
  const createFileChunks = function (file, size = 1024*100) {
      // 创建数组，存储文件的所有切片
      let fileChunks = [];
      for (let cur = 0; cur < file.size; cur += size) {
        // file.slice 方法用于切割文件，从 cur 字节开始，切割到 cur+size 字节
        fileChunks.push(file.slice(cur, cur + size));
      }
      return fileChunks;
    };
```

### 拼接 formData

上传的时候，通过 formData 对象组装要上传的切片数据
/**

* 2、拼接 formData
* 参数1：存储文件切片信息的数组
* 参数2：上传时的文件名称

 ```javascript
   */
  const concatFormData = function (fileChunks, filename) {
    /**
  * map 方法会遍历切片数组 fileChunks中的元素map 方法会遍历切片数组 fileChunks中的元素,
  * 数组中有多少个切片，创建几个 formData，在其中上传的文件名称、hash值和切片，并将此 formData
  * 返回，最终chunksList中存储的就是多个 formData(每个切片对应一个 formData)
  *
     */
    const chunksList = fileChunks.map((chunk, index) => {
      let formData = new FormData();
      // 这个'filename' 字符串的名字要与后端约定好
      formData.append("filename", filename);
      // 作为区分每个切片的编号，后端会以此作为切片的文件名称，此名称也应该与后端约定好
      formData.append("hash", index);
      // 后端会以此作为切片文件的内容
      formData.append("chunk", chunk);
      return {
        formData,
      };
    });
    return chunksList;
  };

 ```

### 上传切片

遍历上面的 chunksList 数组，调用 axios 对每个 formData 信息进行提交
// 3、上传切片

 ```javascript
   const uploadChunks=async (chunksList)=>{
     const uploadList = chunksList.map(({ formData }) =>
       axios({
         method: "post",
         url: "/upload",
         data: formData,
       })
     );
     await Promise.all(uploadList);
   }
 ```

### 合并切片

当所有切片都已经上传成功后，告诉后端一声
 // 合并切片

 ```javascript
    const mergeFileChunks = async function (filename) {
      await axios({
        method: "get",
        url: "/merge",
        params: {
          filename,
        },
      });
    };

 ```

### handleFileUpload 函数

 // 大文件上传

```javascript
async function handleFileUpload(event) {
  event.preventDefault();
  const file = window.file;
  if (!file) return;
  // 1、切片切割，第二个参数采用默认值
  const fileChunks = createFileChunks(file);
  // 2、将切片信息拼接成 formData 对象
  const chunksList = concatFormData(fileChunks, file.name);
  // 3、上传切片
  await uploadChunks(chunksList);
  // 4、所有切片上传成功后后，再告诉后端所有切片都已完成
  await mergeFileChunks(file.name);
  console.log("上传完成");
}
```

### vue 示例

```html

<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>大文件上传</title>
  </head>
  <body>
    <div id="app">
      <form action="">
        <input type="file" name="" id="uploadInput" />
        <button id="uploadBtn">上传</button>
      </form>
    </div>
  </body>
</html>
<script src="https://unpkg.com/axios/dist/axios.min.js"></script>
<script>
  axios.defaults.baseURL = `http://localhost:3000`;

  let file = null;
  // 文件被更改
  function handleFileChange(event) {
    const file = event.target.files[0];
    if (!file) return;
    window.file = file;
  }

  // 1、创建切片
  const createFileChunks = (file, size = 1024 * 100) => {
    // 创建数组，存储文件的所有切片
    let fileChunks = [];
    for (let cur = 0; cur < file.size; cur += size) {
      // file.slice 方法用于切割文件，从 cur 字节开始，切割到 cur+size 字节
      fileChunks.push(file.slice(cur, cur + size));
    }
    return fileChunks;
  };
  /**

* 2、拼接 formData
* 参数1：存储文件切片信息的数组
* 参数2：上传时的文件名称
   */
  const concatFormData = function (fileChunks, filename) {
    /**
  * map 方法会遍历切片数组 fileChunks中的元素map 方法会遍历切片数组 fileChunks中的元素,
  * 数组中有多少个切片，创建几个 formData，在其中上传的文件名称、hash值和切片，并将此 formData
  * 返回，最终chunksList中存储的就是多个 formData(每个切片对应一个 formData)
  *
     */
    const chunksList = fileChunks.map((chunk, index) => {
      let formData = new FormData();
      // 这个'filename' 字符串的名字要与后端约定好
      formData.append("filename", filename);
      // 作为区分每个切片的编号，后端会以此作为切片的文件名称，此名称也应该与后端约定好
      formData.append("hash", index);
      // 后端会以此作为切片文件的内容
      formData.append("chunk", chunk);
      return {
        formData,
      };
    });
    return chunksList;
  };
  // 3、上传切片
  const uploadChunks = async (chunksList) => {
    const uploadList = chunksList.map(({ formData }) =>
      axios({
        method: "post",
        url: "/upload",
        data: formData,
      })
    );
    await Promise.all(uploadList);
  };

  // 大文件上传
  async function handleFileUpload(event) {
    event.preventDefault();

    const file = window.file;
    if (!file) return;
    // 1、切片切割，第二个参数采用默认值
    const fileChunks = createFileChunks(file);
    // 2、将切片信息拼接成 formData 对象
    const chunksList = concatFormData(fileChunks, file.name);
    // 3、上传切片
    await uploadChunks(chunksList);
    // 4、所有切片上传成功后后，再告诉后端所有切片都已完成
    await mergeFileChunks(file.name);
    console.log("上传完成");
  }

  // 合并切片
  const mergeFileChunks = async function (filename) {
    await axios({
      method: "get",
      url: "/merge",
      params: {
        filename,
      },
    });
  };

  document
    .getElementById("uploadInput")
    .addEventListener("change", handleFileChange);
  document
    .getElementById("uploadBtn")
    .addEventListener("click", handleFileUpload);
</script>

```

## 页面尺寸整体缩放

```js
window.addEventListener('resize', () => {
  fun();
});
const heightAll = ref(document.documentElement.clientHeight);
const fun = () => {
  let devicewidth = document.documentElement.clientWidth; //获取当前分辨率下的可是区域宽度
  let scale = devicewidth / 1440; // 分母——设计稿的尺寸
  heightAll.value = document.documentElement.clientHeight / scale;
  document.body.style.zoom = scale; //放大缩小相应倍数
};
fun();

```

## 用数组建立一个简单的循环 (循环播放使用)

```javascript
var aList = ['A','B','C','D','E'];
function make_looper( arr ){

    arr.loop_idx = 0;

    // return current item
    arr.current = function(){
      this.loop_idx = ( this.loop_idx ) % this.length;// 无需检查 !!
      return arr[ this.loop_idx ];
    };

    // 增加 loop_idx 然后返回新的当前元素
    arr.next = function(){
      this.loop_idx++;
      return this.current();
    };
    
    // 减少 loop_idx 然后返回新的当前元素
    arr.prev = function(){
      this.loop_idx += this.length - 1;
      return this.current();
    };
}

make_looper( aList);

aList.current();// -> A
aList.next();// -> B
aList.next();// -> C
aList.next();// -> D
aList.next();// -> E
aList.next();// -> A
aList.pop() ;// -> E
aList.prev();// -> D
aList.prev();// -> C
aList.prev();// -> B
aList.prev();// -> A
aList.prev();// -> D
```

## js 实现上传

### window.showOpenFilePicker()

代表选中文件

```javascript

    const clickFunc = async () => {
      const options = {
        types: [
          {
            description: '这只是一个描述',
            accept: {
              // 'image/*': ['.png', '.gif', '.jpeg', '.jpg'],
              // "text/plain": [".txt"],
              'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx']
            }
          }
        ],
        excludeAcceptAllOption: false // 有一个选项的按钮
        // multiple: true
      }
      try {
        myFiles.file = await window.showOpenFilePicker(options)
      } catch (error) {
        console.error(error)
      }
    }

```

### 相关 options 的属性

* excludeAcceptAllOption上面代码中 options 里的一个配置 excludeAcceptAllOption
  * 这个值如果是 false则显示下图中的这个选项按钮，并且能看看到 格式 的 一个 描述信息。
  * 这个值如果是true这不显示 这个按钮
* myltiple多选的意思，能够选取多个文件
* type这个通过 accept 来以 键值对的形式来接受，值为 数组 类型。

### window.showSaveFilePicker()

保存文件

 ```javascript
  const clickFunc = async () => {
      const options = {
        types: [
          {
            description: '这只是一个描述',
            accept: {
              // "text/plain": [".txt"],
              'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx']
            }
          }
        ],
      }
      try {
        myFiles.file = await window.showSaveFilePicker(options)
        console.log(myFiles.file)
        // console.log(myFiles.file)
        console.log(myFiles.file.getFile()) // 返回一个 promise
        // // 所以我们需要 await 来接受
        // console.log(await myFiles.file[0].getFile());

      } catch (error) {
        console.error(error)
      }
    }
 ```

### window.showDirectoryPicker()

这个 API 代表的是 选中 文件夹

```javascript

      const clickFunc = async () => {
        try {
          myFiles.file = await window.showDirectoryPicker()
          console.log(myFiles.file)
          console.log(myFiles.file.values())

          for await (const item of myFiles.file.values()) {
            console.log(item)
          }
        } catch (error) {
          console.error(error)
        }
      }

```

## 处理浏览器默认样式

```css

html,
body,
div,
span,
applet,
object,
iframe,
h1,
h2,
h3,
h4,
h5,
h6,
p,
blockquote,
pre,
a,
abbr,
acronym,
address,
big,
cite,
code,
del,
dfn,
em,
img,
ins,
kbd,
q,
s,
samp,
small,
strike,
strong,
sub,
sup,
tt,
var,
b,
u,
i,
center,
dl,
dt,
dd,
ol,
ul,
li,
fieldset,
form,
label,
legend,
table,
caption,
tbody,
tfoot,
thead,
tr,
th,
td,
article,
aside,
canvas,
details,
embed,
figure,
figcaption,
footer,
header,
hgroup,
menu,
nav,
output,
ruby,
section,
summary,
time,
mark,
audio,
video {
  margin: 0;
  padding: 0;
  border: 0;
  font-size: 100%;
  font: inherit;
  vertical-align: baseline;
}
/* HTML5 display-role reset for older browsers */
article,
aside,
details,
figcaption,
figure,
footer,
header,
hgroup,
menu,
nav,
section {
  display: block;
}
body {
  line-height: 1;
}
ol,
ul {
  list-style: none;
}
blockquote,
q {
  quotes: none;
}
blockquote:before,
blockquote:after,
q:before,
q:after {
  content: "";
  content: none;
}
table {
  border-collapse: collapse;
  border-spacing: 0;
}
.markdown-body pre,
.markdown-body pre > code.hljs {
  color: #333;
  background: #f8f8f8;
}
.hljs-comment,
.hljs-quote {
  color: #998;
  font-style: italic;
}
.hljs-keyword,
.hljs-selector-tag,
.hljs-subst {
  color: #333;
  font-weight: 700;
}
.hljs-literal,
.hljs-number,
.hljs-tag .hljs-attr,
.hljs-template-variable,
.hljs-variable {
  color: teal;
}
.hljs-doctag,
.hljs-string {
  color: #d14;
}
.hljs-section,
.hljs-selector-id,
.hljs-title {
  color: #900;
  font-weight: 700;
}
.hljs-subst {
  font-weight: 400;
}
.hljs-class .hljs-title,
.hljs-type {
  color: #458;
  font-weight: 700;
}
.hljs-attribute,
.hljs-name,
.hljs-tag {
  color: navy;
  font-weight: 400;
}
.hljs-link,
.hljs-regexp {
  color: #009926;
}
.hljs-bullet,
.hljs-symbol {
  color: #990073;
}
.hljs-built_in,
.hljs-builtin-name {
  color: #0086b3;
}
.hljs-meta {
  color: #999;
  font-weight: 700;
}
.hljs-deletion {
  background: #fdd;
}
.hljs-addition {
  background: #dfd;
}
.hljs-emphasis {
  font-style: italic;
}
.hljs-strong {
  font-weight: 700;
}
```

## scrollToTop：平滑滚动至顶部

```javascript
const scrollToTop = () => {
  const c = document.documentElement.scrollTop || document.body.scrollTop;
  if (c > 0) {
    window.requestAnimationFrame(scrollToTop);
    window.scrollTo(0, c - c / 8);
  }
};

scrollToTop();
```

## smoothScroll：滚动到指定元素区域

```javascript
const smoothScroll = element =>
  document.querySelector(element).scrollIntoView({
    behavior: 'smooth'
  });
smoothScroll('#fooBar');
smoothScroll('.fooBar');
```

## detectDeviceType：检测移动/PC设备

```javascript
const detectDeviceType = () =>
  /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
    ? 'Mobile'
    : 'Desktop';
```

## getScrollPosition：返回当前的滚动位置

默认参数为window ，pageXOffset(pageYOffset)为第一选择，没有则用scrollLeft(scrollTop)

```javascript
const getScrollPosition = (el = window) => ({
  x: el.pageXOffset !== undefined ? el.pageXOffset : el.scrollLeft,
  y: el.pageYOffset !== undefined ? el.pageYOffset : el.scrollTop
});

getScrollPosition(); // {x: 0, y: 200}
```

## escapeHTML：转义HTML

当然是用来防XSS攻击啦。

```javascript
const escapeHTML = str =>
  str.replace(
    /[&<>'"]/g,
    tag =>
      ({
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        "'": '&#39;',
        '"': '&quot;'
      }[tag] || tag)
  );

escapeHTML('<a href="#">Me & you</a>'); // '&lt;a href=&quot;#&quot;&gt;Me &amp; you&lt;/a&gt;'
```

## isBrowser：检查是否为浏览器环境

```javascript
const isBrowser = () => ![typeof window, typeof document].includes('undefined');

isBrowser(); // true (browser)
isBrowser(); // false (Node)
```

## isBrowserTab：检查当前标签页是否活动

```javascript
const isBrowserTabFocused = () => !document.hidden;

isBrowserTabFocused(); // true
```

## Random Hexadecimal Color Code：随机十六进制颜色

```javascript

const randomHexColorCode = () => {
  let n = (Math.random() * 0xfffff * 1000000).toString(16);
  return '#' + n.slice(0, 6);
};

randomHexColorCode(); // "#e34155"
```

## httpsRedirect：HTTP 跳转 HTTPS

```javascript
const httpsRedirect = () => {
  if (location.protocol !== 'https:') location.replace('https://' + location.href.split('//')[1]);
};

httpsRedirect(); // 若在`http://www.baidu.com`, 则跳转到`https://www.baidu.com`
```

## hide：隐藏所有的指定标签

```javascript
const hide = (...el) => [...el].forEach(e => (e.style.display = 'none'));

hide(document.querySelectorAll('img')); // 隐藏所有<img>标签
```

## hasClass：校验指定元素的类名

```javascript
const hasClass = (el, className) => el.classList.contains(className);
hasClass(document.querySelector('p.special'), 'special'); // true
```

## distance：返回两点间的距离

```javascript
const distance = (x0, y0, x1, y1) => Math.hypot(x1 - x0, y1 - y0);

distance(1, 1, 2, 3); // 2.23606797749979
```

## bottomVisible：检查页面底部是否可见

```javascript
const bottomVisible = () =>
  document.documentElement.clientHeight + window.scrollY >=
  (document.documentElement.scrollHeight || document.documentElement.clientHeight);

bottomVisible(); // true
```

## 不能操作DOM和调接口的环境

```javascript
// 沙箱全局代理对象类
class SandboxGlobalProxy {
  constructor(blacklist) {
    // 创建一个 iframe 标签，取出其中的原生浏览器全局对象作为沙箱的全局对象
    const iframe = document.createElement("iframe", { url: "about:blank" });
    iframe.style.display = "none";
    document.body.appendChild(iframe);

    // 获取当前HTMLIFrameElement的Window对象
    const sandboxGlobal = iframe.contentWindow;

    return new Proxy(sandboxGlobal, {
      // has 可以拦截 with 代码块中任意属性的访问
      has: (target, prop) => {

        // 黑名单中的变量禁止访问
        if (blacklist.includes(prop)) {
          throw new Error(`Can't use: ${prop}!`);
        }
        // sandboxGlobal对象上不存在的属性，直接报错，实现禁用三方库调接口
        if (!target.hasOwnProperty(prop)) {
          throw new Error(`Not find: ${prop}!`);
        }

        // 返回true，获取当前提供上下文对象中的变量；如果返回false，会继续向上层作用域链中查找
        return true;
      }
    });
  }
}

// 使用with关键字，来改变作用域
function withedYourCode(code) {
  code = "with(sandbox) {" + code + "}";
  return new Function("sandbox", code);
}

// 将指定的上下文对象，添加到待执行代码作用域的顶部
function makeSandbox(code, ctx) {
  withedYourCode(code).call(ctx, ctx);
}

// 待执行的代码code，获取document对象
const code = `console.log(document)`;

// 设置黑名单
// 经过小伙伴的指导，新添加Image字段，禁止使用new Image来调接口
const blacklist = ['window', 'document', 'XMLHttpRequest', 'fetch', 'WebSocket', 'Image'];

// 将globalProxy对象，添加到新环境作用域链的顶部
const globalProxy = new SandboxGlobalProxy(blacklist);

makeSandbox(code, globalProxy);
```

## 防止重复请求

保证同一时间只有一个请求

```js
function firstPromise(promiseFunction) {
  let p = null;
  return function (...args) {
    // 请求的实例，已存在意味着正在请求中，直接返回实例，不触发新的请求
    return p
      ? p
      // 否则发送请求，且在finally时将p置空，那么下一次请求可以重新发起
      : (p = promiseFunction.apply(this, args).finally(() => (p = null)));
  };
}
```

## 获取获取字符串的宽度

```js
// 获取获取字符串的宽度代码： 
getTextWidth(textStr,fontSize = 14) {
    // 创建一个临时的 div 标签
    const div = document.createElement('div');
    // 将文本追加到元素中
    div.innerText = textStr;
    // 设置字体大小
    div.style.fontSize = `${fontSize}px`;
    // 追加到 body 中
    document.body.appendChild(div);
    // 获取元素的宽度
    const width = div.offsetWidth;
    // 移除临时标签
    document.body.removeChild(div);
    return width
},

```
