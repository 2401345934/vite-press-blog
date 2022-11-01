---
createTime: 2022/10/26
tag: '算法'
---
# 字符串

## 回文字符串的衍生问题

### 真题描述：给定一个非空字符串 s，最多删除一个字符。判断是否能成为回文字符串

* 示例 1: 输入: "aba"
* 输出: True
* 示例 2:
* 输入: "abca"
* 输出: True
* 解释: 你可以删除c字符。
* 注意: 字符串只包含从 a-z 的小写字母。字符串的最大长度是50000。

### 思路分析

* 如何判断自己解决回文类问题的解法是否“高效”？其中一个很重要的标准，就是看你对回文字符串的对称特性利用得是否彻底。
* 字符串题干中若有“回文”关键字，那么做题时脑海中一定要冒出两个关键字——对称性 和 双指针。这两个工具一起上，足以解决大部分的回文字符串衍生问题。
回到这道题上来，我们首先是初始化两个指针，一个指向字符串头部，另一个指向尾部：
![图片](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2020/3/16/170e18e4bd1c843a~tplv-t2oaga2asx-zoom-in-crop-mark:3024:0:0:0.awebp)
如果两个指针所指的字符恰好相等，那么这两个字符就符合了回文字符串对对称性的要求，跳过它们往下走即可。如果两个指针所指的字符串不等，比如这样：
![图片](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2020/3/16/170e191a29f7b7cb~tplv-t2oaga2asx-zoom-in-crop-mark:3024:0:0:0.awebp)
那么就意味着不对称发生了，意味着这是一个可以“删掉试试看”的操作点。我们可以分别对左指针字符和右指针字符尝试进行“跳过”，看看区间在 [left+1, right] 或 [left, right-1] 的字符串是否回文。如果是的话，那么就意味着如果删掉被“跳过”那个字符，整个字符串都将回文：
![图片](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2020/3/16/170e1993aac908fe~tplv-t2oaga2asx-zoom-in-crop-mark:3024:0:0:0.awebp)
 比如说这里我们跳过了 b，[left+1, right] 的区间就是 [2, 2]，它对应 c 这个字符，单个字符一定回文。这样一来，删掉 b 之后，左右指针所指的内部区间是回文的，外部区间也是回文的，可以认为整个字符串就是一个回文字符串了。

### 编码实现

```js
const validPalindrome = function(s) {
    // 缓存字符串的长度
    const len = s.length
    // i、j分别为左右指针
    let i=0, j=len-1
    // 当左右指针均满足对称时，一起向中间前进
    while(i<j&&s[i]===s[j]) {
        i++ 
        j--
    }
    // 尝试判断跳过左指针元素后字符串是否回文
    if(isPalindrome(i+1,j)) {
      return true
    }
    // 尝试判断跳过右指针元素后字符串是否回文
    if(isPalindrome(i,j-1)) {
        return true
    }
    // 工具方法，用于判断字符串是否回文
    function isPalindrome(st, ed) {
        while(st<ed) {
            if(s[st] !== s[ed]) {
                return false
            }
            st++
            ed--
        } 
        return true
    }
    // 默认返回 false
    return false 
};
```

## 字符串匹配问题——正则表达式初相见

### 真题描述： 设计一个支持以下两种操作的数据结构

* void addWord(word)
* bool search(word)
* search(word) 可以搜索文字或正则表达式字符串，字符串只包含字母 . 或 a-z 。
* . 可以表示任何一个字母。

* 示例: addWord("bad")
  * addWord("dad")
  * addWord("mad")
  * search("pad") -> false
  * search("bad") -> true
  * search(".ad") -> true
  * search("b..") -> true
* 说明:
  * 你可以假设所有单词都是由小写字母 a-z 组成的。

### 思路分析

* 这道题要求字符串既可以被添加、又可以被搜索，这就意味着字符串在添加时一定要被存在某处。键值对存储，我们用 Map（或对象字面量来模拟 Map）。
* 注意，这里为了降低查找时的复杂度，我们可以考虑以字符串的长度为 key，相同长度的字符串存在一个数组中，这样可以提高我们后续定位的效率。
* 难点在于 search 这个 API，它既可以搜索文字，又可以搜索正则表达式。因此我们在搜索前需要额外判断一下，传入的到底是普通字符串，还是正则表达式。若是普通字符串，则直接去 Map 中查找是否有这个 key；若是正则表达式，则创建一个正则表达式对象，判断 Map 中相同长度的字符串里，是否存在一个能够与这个正则相匹配。

```js
/**
 * 构造函数
 */
const WordDictionary = function () {
  // 初始化一个对象字面量，承担 Map 的角色
  this.words = {}
};

/**
  添加字符串的方法
 */
WordDictionary.prototype.addWord = function (word) {
  // 若该字符串对应长度的数组已经存在，则只做添加
  if (this.words[word.length]) {
    this.words[word.length].push(word)
  } else {
    // 若该字符串对应长度的数组还不存在，则先创建
    this.words[word.length] = [word]
  }

};

/**
  搜索方法
 */
WordDictionary.prototype.search = function (word) {
  // 若该字符串长度在 Map 中对应的数组根本不存在，则可判断该字符串不存在
  if (!this.words[word.length]) {
    return false
  }
  // 缓存目标字符串的长度
  const len = word.length
  // 如果字符串中不包含‘.’，那么一定是普通字符串
  if (!word.includes('.')) {
    // 定位到和目标字符串长度一致的字符串数组，在其中查找是否存在该字符串
    return this.words[len].includes(word)

  }

  // 否则是正则表达式，要先创建正则表达式对象
  const reg = new RegExp(word)

  // 只要数组中有一个匹配正则表达式的字符串，就返回true
  return this.words[len].some((item) => {
    return reg.test(item)
  })
};

```
