---
createTime: 2022/10/26
tag: '算法'
---
# 二叉树

## 前序遍历

### 先序遍历 递归

```js
var preorderTraversal = function (root) {
  const treeNodeList = []
  const funcNode = (r) => {
    if (!r) return null
    treeNodeList.push(r.val)
    funcNode(r.left)
    funcNode(r.right)
  }
  funcNode(root)
  return treeNodeList
}
```

### 先序遍历 非递归

```javascript
var preorderTraversal = function (root, res = []) {
  const stack = []
  if (root) stack.push(root)
  while (stack.length) {
    const node = stack.pop()
    if (!node) {
      res.push(stack.pop().val)
      continue
    }
    if (node.right) stack.push(node.right) // 右
    if (node.left) stack.push(node.left) // 左
    stack.push(node) // 中
    stack.push(null)
  }
  return res
}
```

## 中序遍历

### 中序遍历 递归

```javascript
var inorderTraversal = function (root) {
  const treeNodeList = []
  const funcNode = (r) => {
    if (!r) return null
    funcNode(r.left)
    treeNodeList.push(r.val)
    funcNode(r.right)
  }
  funcNode(root)
  return treeNodeList
}
```

### 中序遍历 非递归

```javascript
var inorderTraversal = function (root, res = []) {
  const stack = []
  if (root) stack.push(root)
  while (stack.length) {
    const node = stack.pop()
    if (!node) {
      res.push(stack.pop().val)
      continue
    }
    if (node.right) stack.push(node.right) // 右
    stack.push(node) // 中
    stack.push(null)
    if (node.left) stack.push(node.left) // 左
  }
  return res
}
```

## 后序遍历

### 后序遍历 递归

```javascript
var postorderTraversal = function (root) {
  const treeNodeList = []
  const funcNode = (r) => {
    if (!r) return null
    funcNode(r.left)
    funcNode(r.right)
    treeNodeList.push(r.val)
  }
  funcNode(root)
  return treeNodeList
}
```

### 后序遍历 非递归

```javascript
var postorderTraversal = function (root, res = []) {
  const stack = []
  if (root) stack.push(root)
  while (stack.length) {
    const node = stack.pop()
    if (!node) {
      res.push(stack.pop().val)
      continue
    }
    stack.push(node) // 中
    stack.push(null)
    if (node.right) stack.push(node.right) // 右

    if (node.left) stack.push(node.left) // 左
  }
  return res
}
```

## 二叉树的层序遍历

```javascript
// 需要返回 [[1], [2,3], [4,5]]

// 时间复杂度 O(n) n为树的节点数
// 空间复杂度 O(n)
var levelOrder = function (root) {
  if (!root) return []
  // 广度优先遍历
  const q = [root]
  const res = []
  while (q.length) {
    let len = q.length
    res.push([])
    // 循环每层的节点数量次
    while (len--) {
      const n = q.shift()
      res[res.length - 1].push(n.val)
      if (n.left) q.push(n.left)
      if (n.right) q.push(n.right)
    }
  }

  return res
}
```

## 二叉树的最小深度

```javascript
// 给一个二叉树，需要你找出其最小的深度， 从根节点到叶子节点的距离
// 时间复杂度O(n) n是树的节点数量
// 空间复杂度O(n) n是树的节点数量
var minDepth = function (root) {
  if (!root) return 0
  // 使用广度优先遍历
  const q = [[root, 1]]
  while (q.length) {
    // 取出当前节点
    const [n, l] = q.shift()
    // 如果是叶子节点直接返回深度就可
    if (!n.left && !n.right) return l
    if (n.left) q.push([n.left, l + 1])
    if (n.right) q.push([n.right, l + 1])
  }
}
```

## 二叉树的最大深度

```javascript
// 给一个二叉树，需要你找出其最大的深度，从根节点到叶子节点的距离

// 时间复杂度 O(n) n为树的节点数
// 空间复杂度 有一个递归调用的栈 所以为 O(n) n也是为二叉树的最大深度
var maxDepth = function (root) {
  let res = 0
  // 使用深度优先遍历
  const dfs = (n, l) => {
    if (!n) return
    if (!n.left && !n.right) {
      // 没有叶子节点就把深度数量更新
      res = Math.max(res, l)
    }
    dfs(n.left, l + 1)
    dfs(n.right, l + 1)
  }

  dfs(root, 1)

  return res
}
```
