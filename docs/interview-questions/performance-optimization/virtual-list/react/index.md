---
createTime: 2022/10/29
tag: '性能优化'
---
# 虚拟列表

## 介绍

虚拟列表，其实就是将一个原本需要全部列表项的渲染的长列表，改为只渲染可视区域内的列表项，但滚动效果还是要和渲染所有列表项的长列表一样。

### 虚拟列表解决的长列表渲染大量节点导致的性能问题

* 一次性渲染大量节点，会占用大量 GPU 资源，导致卡顿；

* 即使渲染好了，大量的节点也持续占用内存。列表项下的节点越多，就越耗费性能。
我们会将计算出来的高度做成 style 对象以及一个索引值 index传入到这个组件里进行实例化。所以记得在列表项组件内接收它们并使用上它们，尤其是 style。
* 虚拟列表的实现分两种，一种是列表项高度固定的情况，另一种是列表项高度动态的情况。

## 列表项高度固定

### 思路讲解

* 列表项高度固定的情况会简单很多，因为我们可以在渲染前就能知道任何一个列表项的位置。
* 因为涉及到的变量很多，实现起来还是有点繁琐。
* 我们需要的必要信息有：
  * 容器高度（即可视区域高度） containerHeight
  * 列表长度（即列表项总数） itemCount
  * 列表项尺寸 itemHeight
  * 滚动位置 scrollTop

### 代码实现 一个将 items 往下推到正确位置的空元素

* 接收一个上面提到的几个数量和高度参数外，还接收一个列表项组件。
* 我们会将计算出来的高度做成 style 对象以及一个索引值 index传入到这个组件里进行实例化。所以记得在列表项组件内接收它们并使用上它们，尤其是 style。

```jsx
/**
 * 一个将 items 往下推到正确位置的空元素
 */
import { useState } from 'react';
import { flushSync } from 'react-dom';

function FixedSizeList({ containerHeight, itemHeight, itemCount, children }) {
  // children 语义不好，赋值给 Component
  const Component = children;

  const contentHeight = itemHeight * itemCount; // 内容高度
  const [scrollTop, setScrollTop] = useState(0); // 滚动高度

  // 继续需要渲染的 item 索引有哪些
  let startIdx = Math.floor(scrollTop / itemHeight);
  let endIdx = Math.floor((scrollTop + containerHeight) / itemHeight);

  // 上下额外多渲染几个 item，解决滚动时来不及加载元素出现短暂的空白区域的问题
  const paddingCount = 2;
  startIdx = Math.max(startIdx - paddingCount, 0); // 处理越界情况
  endIdx = Math.min(endIdx + paddingCount, itemCount - 1);

  const top = itemHeight * startIdx; // 第一个渲染 item 到顶部距离

  // 需要渲染的 items
  const items = [];
  for (let i = startIdx; i <= endIdx; i++) {
    items.push(<Component key={i} index={i} style={{ height: itemHeight }} />);
  }

  return (
    <div
      style={{ height: containerHeight, overflow: 'auto' }}
      onScroll={(e) => {
        // 处理渲染异步导致的白屏现象
        // 改为同步更新，但可能会有性能问题，可以做 节流 + RAF 优化
        flushSync(() => {
          setScrollTop(e.target.scrollTop);
        });
      }}
    >
      <div style={{ height: contentHeight }}>
        {/* 一个将 items 往下推到正确位置的空元素 */}
        <div style={{ height: top }}></div>
        {items}
      </div>
    </div>
  );
}

export default FixedSizeList;

```

### 代码实现 transform

```jsx
/**
 * transform 方案
 */
import { useState } from 'react';
import { flushSync } from 'react-dom';

function FixedSizeList({ containerHeight, itemHeight, itemCount, children }) {
  // children 语义不好，赋值给 Component
  const Component = children;

  const contentHeight = itemHeight * itemCount; // 内容高度
  const [scrollTop, setScrollTop] = useState(0); // 滚动高度

  // 继续需要渲染的 item 索引有哪些
  let startIdx = Math.floor(scrollTop / itemHeight);
  let endIdx = Math.floor((scrollTop + containerHeight) / itemHeight);

  // 上下额外多渲染几个 item，解决滚动时来不及加载元素出现短暂的空白区域的问题
  const paddingCount = 2;
  startIdx = Math.max(startIdx - paddingCount, 0); // 处理越界情况
  endIdx = Math.min(endIdx + paddingCount, itemCount - 1);

  const top = itemHeight * startIdx; // 第一个渲染 item 到顶部距离

  // 需要渲染的 items
  const items = [];
  for (let i = startIdx; i <= endIdx; i++) {
    items.push(<Component key={i} index={i} style={{ height: itemHeight }} />);
  }

  return (
    <div
      style={{ height: containerHeight, overflow: 'auto' }}
      onScroll={(e) => {
        flushSync(() => {
          setScrollTop(e.target.scrollTop);
        });
      }}
    >
      <div style={{ height: contentHeight }}>
        <div style={{ transform: `translate3d(0px, ${top}px, 0` }}>{items}</div>
      </div>
    </div>
  );
}

export default FixedSizeList;

```

### 代码实现 绝对定位方案

```jsx
/**
 * 绝对定位方案
 */
import { useState } from 'react';
import { flushSync } from 'react-dom';

function FixedSizeList({ containerHeight, itemHeight, itemCount, children }) {
  // children 语义不好，赋值给 Component
  const Component = children;

  const contentHeight = itemHeight * itemCount; // 内容高度
  const [scrollTop, setScrollTop] = useState(0); // 滚动高度

  // 继续需要渲染的 item 索引有哪些
  let startIdx = Math.floor(scrollTop / itemHeight);
  let endIdx = Math.floor((scrollTop + containerHeight) / itemHeight);

  // 上下额外多渲染几个 item，解决滚动时来不及加载元素出现短暂的空白区域的问题
  const paddingCount = 2;
  startIdx = Math.max(startIdx - paddingCount, 0); // 处理越界情况
  endIdx = Math.min(endIdx + paddingCount, itemCount - 1);

  const top = itemHeight * startIdx; // 第一个渲染 item 到顶部距离

  // 需要渲染的 items
  const items = [];
  for (let i = startIdx; i <= endIdx; i++) {
    items.push(
      <Component
        key={i}
        index={i}
        style={{
          position: 'absolute',
          left: 0,
          top: i * itemHeight,
          width: '100%',
          height: itemHeight
        }}
      />
    );
  }

  return (
    <div
      style={{
        height: containerHeight,
        overflow: 'auto',
        position: 'relative'
      }}
      onScroll={(e) => {
        flushSync(() => {
          setScrollTop(e.target.scrollTop);
        });
      }}
    >
      <div style={{ height: contentHeight }}>{items}</div>
    </div>
  );
}

export default FixedSizeList;

```

### 使用示例

```jsx
import FixedSizeList from './FixedSizeList';
import './styles.css';

/**
 * 三种让 items 定位到正确位置的方案
 * 可自行切换，感受 style 的不同
 *
 * FixedSizeList：一个将 items 往下推到正确位置的空元素
 * FixedSizeList2：transform 方案
 * FixedSizeList3：绝对定位方案
 *
 */

function Item({ style, index }) {
  return (
    <div
      className="item"
      style={{
        ...style,
        backgroundColor: index % 2 === 0 ? 'burlywood' : 'cadetblue'
      }}
    >
      {index}
    </div>
  );
}

export default function App() {
  const list = new Array(10000).fill(0).map((item, i) => i);

  return (
    <>
      列表项高度固定 - 虚拟列表实现
      <FixedSizeList
        containerHeight={300}
        itemCount={list.length}
        itemHeight={50}
      >
        {Item}
      </FixedSizeList>
    </>
  );
}

```

## 列表项高度动态

### 思路讲解

* 和列表项等高的实现不同，这里不能传一个固定值 itemHeight，改为传入一个根据 index 获取列表项宽度函数 getItemHeight(index)。
* 组件会通过这个函数，来拿到不同列表项的高度，来计算出 offsets 数组。offsets 是每个列表项的底边到顶部的距离。offsets 的作用是在滚动到特定位置时，计算出需要渲染的列表项有哪些。
* 当然你也可以用高度数组，但查找起来并没有优势，你需要累加。offsets 是 heights 的累加缓存结果（其实也就是前缀和）。
* 假设几个列表项的高度数组 heights 为 [10, 20, 40, 100]，那么 offsets 就是 [10, 30, 70, 170]。一推导公式为：offsets[i] = offsets[i-1] + heights[i]

### 代码实现

```jsx
import { forwardRef, useState } from 'react';
import { flushSync } from 'react-dom';

// 动态列表组件
const VariableSizeList = forwardRef(
  ({ containerHeight, getItemHeight, itemCount, itemData, children }, ref) => {
    ref.current = {
      resetHeight: () => {
        setOffsets(genOffsets());
      }
    };

    // children 语义不好，赋值给 Component
    const Component = children;
    const [scrollTop, setScrollTop] = useState(0); // 滚动高度

    const genOffsets = () => {
      const a = [];
      a[0] = getItemHeight(0);
      for (let i = 1; i < itemCount; i++) {
        a[i] = getItemHeight(i) + a[i - 1];
      }
      return a;
    };

    // 所有 items 的位置
    const [offsets, setOffsets] = useState(() => {
      return genOffsets();
    });

    // 找 startIdx 和 endIdx
    // 这里用了普通的查找，更好的方式是二分查找
    let startIdx = offsets.findIndex((pos) => pos > scrollTop);
    let endIdx = offsets.findIndex((pos) => pos > scrollTop + containerHeight);
    if (endIdx === -1) endIdx = itemCount;

    // 上下扩展补充几个 item
    const paddingCount = 2;
    startIdx = Math.max(startIdx - paddingCount, 0); // 处理越界情况
    endIdx = Math.min(endIdx + paddingCount, itemCount - 1);

    // 计算高度
    const contentHeight = offsets[offsets.length - 1];

    // 需要渲染的 items
    const items = [];
    for (let i = startIdx; i <= endIdx; i++) {
      const top = i === 0 ? 0 : offsets[i - 1];
      const height = i === 0 ? offsets[0] : offsets[i] - offsets[i - 1];
      items.push(
        <Component
          key={i}
          index={i}
          style={{
            position: 'absolute',
            left: 0,
            top,
            width: '100%',
            height
          }}
          data={itemData}
        />
      );
    }

    return (
      <div
        style={{
          height: containerHeight,
          overflow: 'auto',
          position: 'relative'
        }}
        onScroll={(e) => {
          flushSync(() => {
            setScrollTop(e.target.scrollTop);
          });
        }}
      >
        <div style={{ height: contentHeight }}>{items}</div>
      </div>
    );
  }
);

export default VariableSizeList;

```

### 使用示例

```jsx
import { useEffect, useRef, useState } from 'react';
import VariableSizeList from './VariableSizeList';

// 列表项组件
function Item({ index, data, setHeight }) {
  const itemRef = useRef();
  useEffect(() => {
    setHeight(index, itemRef.current.getBoundingClientRect().height);
  }, [setHeight, index]);

  return (
    <div
      ref={itemRef}
      style={{
        backgroundColor: index % 2 === 0 ? 'burlywood' : 'cadetblue'
      }}
    >
      {data[index]}
    </div>
  );
}

export default function App() {
  const [list, setList] = useState(
    new Array(1000).fill(0).map(() => 1)
  );
  const listRef = useRef();

  const heightsRef = useRef(new Array(100));
  // 预估高度
  const estimatedItemHeight = 40;
  const getHeight = (index) => {
    return heightsRef.current[index] ?? estimatedItemHeight;
  };

  const setHeight = (index, height) => {
    if (heightsRef.current[index] !== height) {
      heightsRef.current[index] = height;
      // 让 VariableSizeList 组件更新高度
      listRef.current.resetHeight();
    }
  };

  return (
    <>
      列表项高度动态 - 虚拟列表实现
      <VariableSizeList
        ref={listRef}
        containerHeight={300}
        itemCount={list.length}
        getItemHeight={getHeight}
        itemData={list}
      >
        {({ index, style, data }) => {
          return (
            <div style={style}>
              <Item {...{ index, data }} setHeight={setHeight} />
            </div>
          );
        }}
      </VariableSizeList>
    </>
  );
}

```
