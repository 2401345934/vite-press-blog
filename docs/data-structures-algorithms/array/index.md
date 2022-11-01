---
createTime: 2022/10/26
tag: '算法'
---
# 数组

## Map 的妙用——两数求和问题

* 真题描述： 给定一个整数数组 nums 和一个目标值 target，请你在该数组中找出和为目标值的那 两个 整数，并返回他们的数组下标。
* 你可以假设每种输入只会对应一个答案。但是，你不能重复利用这个数组中同样的元素。

### 示例

* 给定 nums = [2, 7, 11, 15], target = 9
* 因为 nums[0] + nums[1] = 2 + 7 = 9 所以返回 [0, 1]

### 思路分析

### 一个“淳朴”的解法

这道题相信很多同学看一眼就很快能得出一个最基本的思路：两层循环来遍历同一个数组；第一层循环遍历的值记为 a，第二层循环时遍历的值记为 b；若 a+b = 目标值，那么 a 和 b 对应的数组下标就是我们想要的答案。

### 对“淳朴”解法的反思

大家以后做算法题的时候，要有这样的一种本能：当发现自己的代码里有两层循环时，先反思一下，能不能用空间换时间，把它优化成一层循环。

因为两层循环很多情况下都意味着 O(n^2) 的复杂度，这个复杂度非常容易导致你的算法超时。即便没有超时，在明明有一层遍历解法的情况下，你写了两层遍历，面试官对你的印象分会大打折扣。

空间换时间，Map 来帮忙
拿我们这道题来说，其实二层遍历是完全不必要的。
大家记住一个结论：几乎所有的求和问题，都可以转化为求差问题。 这道题就是一个典型的例子，通过把求和问题转化为求差问题，事情会变得更加简单。

我们可以在遍历数组的过程中，增加一个 Map 来记录已经遍历过的数字及其对应的索引值。然后每遍历到一个新数字的时候，都回到 Map 里去查询 targetNum 与该数的差值是否已经在前面的数字中出现过了。若出现过，那么答案已然显现，我们就不必再往下走了。

我们以 nums = [2, 7, 11, 15] 这个数组为例，来模拟一下这个思路：
第一次遍历到 2，此时 Map 为空：
![图片](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2020/4/16/171815ed07055b8d~tplv-t2oaga2asx-zoom-in-crop-mark:3024:0:0:0.awebp)
以 2 为 key，索引 0 为 value 作存储，继续往下走；遇到了 7：
![图片](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2020/4/16/171815d7f14b9ce0~tplv-t2oaga2asx-zoom-in-crop-mark:3024:0:0:0.awebp)
计算 targetNum 和 7 的差值为2，去 Map 中检索 2 这个 key，发现是之前出现过的值：
![图片](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2020/4/16/171815cf9cc83f3f~tplv-t2oaga2asx-zoom-in-crop-mark:3024:0:0:0.awebp)
那么 2 和 7 的索引组合就是这道题的答案啦。
键值对存储我们可以用 ES6 里的 Map 来做，如果图省事，直接用对象字面量来定义也没什么问题。

### 编码实现

```javascript
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
const twoSum = function(nums, target) {
    // 这里我用对象来模拟 map 的能力
    const diffs = {}
    // 缓存数组长度
    const len = nums.length
    // 遍历数组
    for(let i=0;i<len;i++) {
        // 判断当前值对应的 target 差值是否存在（是否已遍历过）
        if(diffs[target-nums[i]]!==undefined) {
            // 若有对应差值，那么答案get！
            return [diffs[target - nums[i]], i]
        }
        // 若没有对应差值，则记录当前值
        diffs[nums[i]]=i
    }
};
```

## 合并两个有序数组

* 真题描述：给你两个有序整数数组 nums1 和 nums2，请你将 nums2 合并到 nums1 中，使 nums1 成为一个有序数组。
* 说明: 初始化 nums1 和 nums2 的元素数量分别为 m 和 n 。 你可以假设 nums1 有足够的空间（空间大小大于或等于 m + n）来保存 nums2 中的元素。

### 示例

* 输入:
  * nums1 = [1,2,3,0,0,0], m = 3
  * nums2 = [2,5,6], n = 3
* 输出:
  * [1,2,2,3,5,6]

### 思路分析

### 标准解法

这道题没有太多的弯弯绕绕，标准解法就是双指针法。首先我们定义两个指针，各指向两个数组生效部分的尾部：
![图片](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2020/3/15/170ddde2f653cce0~tplv-t2oaga2asx-zoom-in-crop-mark:3024:0:0:0.awebp)
每次只对指针所指的元素进行比较。取其中较大的元素，把它从 nums1 的末尾往前面填补：
![图片](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2020/3/15/170de023737bd4d0~tplv-t2oaga2asx-zoom-in-crop-mark:3024:0:0:0.awebp)

### 这里有一点需要解释一下

为什么是从后往前填补？因为是要把所有的值合并到 nums1 里，所以说我们这里可以把 nums1 看做是一个“容器”。但是这个容器，它不是空的，而是前面几个坑有内容的。如果我们从前往后填补，就没法直接往对应的坑位赋值了（会产生值覆盖）。
从后往前填补，我们填的都是没有内容的坑，这样会省掉很多麻烦。

由于 nums1 的有效部分和 nums2 并不一定是一样长的。我们还需要考虑其中一个提前到头的这种情况：

如果提前遍历完的是 nums1 的有效部分，剩下的是 nums2。那么这时意味着 nums1 的头部空出来了，直接把 nums2 整个补到 nums1 前面去即可。

如果提前遍历完的是 nums2，剩下的是 nums1。由于容器本身就是 nums1，所以此时不必做任何额外的操作。

### 编码实现

```js
/**
 * @param {number[]} nums1
 * @param {number} m
 * @param {number[]} nums2
 * @param {number} n
 * @return {void} Do not return anything, modify nums1 in-place instead.
 */
const merge = function(nums1, m, nums2, n) {
    // 初始化两个指针的指向，初始化 nums1 尾部索引k
    let i = m - 1, j = n - 1, k = m + n - 1
    // 当两个数组都没遍历完时，指针同步移动
    while(i >= 0 && j >= 0) {
        // 取较大的值，从末尾往前填补
        if(nums1[i] >= nums2[j]) {
            nums1[k] = nums1[i] 
            i-- 
            k--
        } else {
            nums1[k] = nums2[j] 
            j-- 
            k--
        }
    }
    
    // nums2 留下的情况，特殊处理一下 
    while(j>=0) {
        nums1[k] = nums2[j]  
        k-- 
        j--
    }
};
```

## 三数求和问题

* 双指针法能处理的问题多到你想不到。不信来瞅瞅两数求和它儿子——三数求和问题！
* 俗话说，青出于蓝而胜于蓝，三数求和虽然和两数求和只差了一个字，但是思路却完全不同。
* 真题描述：给你一个包含 n 个整数的数组 nums，判断 nums 中是否存在三个元素 a，b，c ，使得 a + b + c = 0 ？请你找出所有满足条件且不重复的三元组。
* 注意：答案中不可以包含重复的三元组。

### 示例

* 给定数组 nums = [-1, 0, 1, 2, -1, -4]，
* 满足要求的三元组集合为： [ [-1, 0, 1], [-1, -1, 2] ]

### 思路分析

* 三数之和延续两数之和的思路，我们可以把求和问题变成求差问题——固定其中一个数，在剩下的数中寻找是否有两个数和这个固定数相加是等于0的。
* 虽然乍一看似乎还是需要三层循环才能解决的样子，不过现在我们有了双指针法，定位效率将会被大大提升，从此告别过度循环~
* （这里大家相信已经能察觉出来双指针法的使用场景了，一方面，它可以做到空间换时间；另一方面，它也可以帮我们降低问题的复杂度。）
* 双指针法用在涉及求和、比大小类的数组题目里时，大前提往往是：该数组必须有序。否则双指针根本无法帮助我们缩小定位的范围，压根没有意义。因此这道题的第一步是将数组排序：

```javascript
 nums = nums.sort((a,b)=>{
    return a-b
})
```

* 然后，对数组进行遍历，每次遍历到哪个数字，就固定哪个数字。然后把左指针指向该数字后面一个坑里的数字，把右指针指向数组末尾，让左右指针从起点开始，向中间前进：
* 每次指针移动一次位置，就计算一下两个指针指向数字之和加上固定的那个数之后，是否等于0。如果是，那么我们就得到了一个目标组合；否则，分两种情况来看：
* 相加之和大于0，说明右侧的数偏大了，右指针左移
* 相加之和小于0，说明左侧的数偏小了，左指针右移

### 编码实现

```js
/**
 * @param {number[]} nums
 * @return {number[][]}
 */
const threeSum = function(nums) {
    // 用于存放结果数组
    let res = [] 
    // 给 nums 排序
    nums = nums.sort((a,b)=>{
        return a-b
    })
    // 缓存数组长度
    const len = nums.length
    // 注意我们遍历到倒数第三个数就足够了，因为左右指针会遍历后面两个数
    for(let i=0;i<len-2;i++) {
        // 左指针 j
        let j=i+1 
        // 右指针k
        let k=len-1   
        // 如果遇到重复的数字，则跳过
        if(i>0&&nums[i]===nums[i-1]) {
            continue
        }
        while(j<k) {
            // 三数之和小于0，左指针前进
            if(nums[i]+nums[j]+nums[k]<0){
                j++
               // 处理左指针元素重复的情况
               while(j<k&&nums[j]===nums[j-1]) {
                    j++
                }
            } else if(nums[i]+nums[j]+nums[k]>0){
                // 三数之和大于0，右指针后退
                k--
               // 处理右指针元素重复的情况
               while(j<k&&nums[k]===nums[k+1]) {
                    k--
                }
            } else {
                // 得到目标数字组合，推入结果数组
                res.push([nums[i],nums[j],nums[k]])
                // 左右指针一起前进
                j++
                k--
                // 若左指针元素重复，跳过
                while(j<k&&nums[j]===nums[j-1]) {
                    j++
                }
               // 若右指针元素重复，跳过
               while(j<k&&nums[k]===nums[k+1]) {
                    k--
                }
            }
        }
    }
    // 返回结果数组
    return res
};
```

## 在区间范围内统计奇数数目

```javascript
不能被0整除的数为奇数,那么求两个数之间的奇数个数,以0为开始,然后相减即可
//规律
var countOdds = function(low, high) {
  return count(high)-count(low-1)
};

var count = function(x){
  if(x==0) return 0
  return Math.ceil(x/2)
}
```

## 去掉最低工资和最高工资后的工资平均值

```javascript
var average = function(salary) {
  // 先算 最大最小的和
   const sumOther = (Math.max(...salary)+Math.min(...salary))
  //  求和
   const sum = salary.reduce((pre,cur)=>pre+cur)
  //  通过整体的 和 减去 最大最小的和 / 数组长度 - 2 的值
   return (sum-sumOther)/(salary.length-2)
};

```
