
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
