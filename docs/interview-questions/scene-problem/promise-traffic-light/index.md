---
createTime: 2022/11/13
tag: '场景题'
---
# 红绿灯的两种实现

## 基础

```js
function solve(){
    setTimeout(() => {
        console.log("red");
        setTimeout(() => {
            console.log('green');
            setTimeout(() => {
                console.log('yello');
                solve();
            }, 3000);
        }, 2000);
    }, 1000);
}
solve();
```

## Promise

```js
function solve(time1,time2,time3){
    let p=new Promise(resolve=>{
        console.log("red");
        setTimeout(resolve,time1);
    }).then(()=>{
        return new Promise(resolve=>{
            console.log("green");
            setTimeout(resolve,time2);
        })
    }).then(()=>{
        return new Promise(resolve=>{
            console.log("yellow");
            setTimeout(()=>{
                
                solve(time1,time2,time3);
                resolve();
            },time3);
        })
    })
}
solve(1000,2000,3000);
```
