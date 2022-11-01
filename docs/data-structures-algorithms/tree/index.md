---
createTime: 2022/10/26
tag: '算法'
---
# 树

## 广度优先遍历

```javascript
// ● 先访问离根节点最近的节点, 如果有兄弟节点就会先遍历兄弟节点，再去遍历自己的子节点
// ● 口诀
//   ○ 新建一个队列 并把根节点入队
//   ○ 把队头出队并访问
//   ○ 把队头的children挨个入队
//   ○ 重复第二 、三步 直到队列为空
// 广度优先遍历
const bfs = (tree) => {
  const q = [tree]

  while (q.length > 0) {
    const n = q.shift()
    console.log(n.val)
    n.children.forEach((c) => q.push(c))
  }
}
```
