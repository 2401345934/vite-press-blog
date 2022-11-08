---
createTime: 2022/11/08
tag: 'Vue,面试题'
---
# Vue3中操作dom的四种方式

通过ref直接拿到dom引用
--------------

```vue
<template>
    <div class="demo1-container">
        <div ref="sectionRef" class="ref-section"></div>
    </div>
</template>

<script setup lang="ts">
import {ref} from 'vue'
const sectionRef = ref()
</script>

```

通过对div元素添加了ref属性，为了获取到这个元素，我们声明了一个与ref属性名称相同的变量sectionRef，然后我们通过 sectionRef.value 的形式即可获取该div元素。

### 适用场景

单一dom元素或者个数较少的场景 ![demo1.gif](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/2c0b690c50da40a192deb21503ce8ff2~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.image?)

### 示例代码

```js
<template>
    <div class="demo1-container">
        <p>通过ref直接拿到dom</p>
        <div ref="sectionRef" class="ref-section"></div>
        <button @click="higherAction" class="btn">变高</button>
    </div>
</template>

<script setup lang="ts">
import {ref} from 'vue'
const sectionRef = ref()
let height = 100;

const higherAction = () => {
    height += 50;
    sectionRef.value.style = `height: ${height}px`;
}
</script>

<style lang="scss" scoped>
.demo1-container {
    width: 100%;
    height: 100%;

    .ref-section {
        width: 200px;
        height: 100px;
        background-color: pink;
        transition: all .5s ease-in-out;
    }

    .btn {
        width: 200px;
        height: 50px;
        background-color: gray;
        color: #fff;
        margin-top: 100px;
    }
}
</style>

```

通过父容器的ref遍历拿到dom引用
------------------

```js
<template>
    <div class="demo2-container">
        <div ref="listRef" class="list-section">
            <div @click="higherAction(index)" class="list-item" v-for="(item, index) in state.list" :key="index">
                <span>{{item}}</span>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
const listRef = ref()

```

通过对父元素添加了ref属性，并声明了一个与ref属性名称相同的变量listRef，此时通过listRef.value会获得包含子元素的dom对象

![微信图片_20221015192615.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/95b78f55b1784a0f9a7afcc62b585b24~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.image?) 此时可以通过listRef.value.children\[index\]的形式获取子元素dom

### 适用场景

通过v-for循环生成的固定数量元素的场景 ![demo2.gif](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a24f3ca92e9a4782baab8201de4fee75~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.image?)

### 示例代码

```vue
<template>
    <div class="demo2-container">
        <p>通过父容器遍历拿到dom</p>
        <div ref="listRef" class="list-section">
            <div @click="higherAction(index)" class="list-item" v-for="(item, index) in state.list" :key="index">
                <span>{{item}}</span>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
const listRef = ref()
const state = reactive({
    list: [1, 2, 3, 4, 5, 6, 7, 8]
})

const higherAction = (index: number) => {
    let height = listRef.value.children[index].style.height ? listRef.value.children[index].style.height : '20px';
    height = Number(height.replace('px', ''));
    listRef.value.children[index].style = `height: ${height + 20}px`;
}
</script>

<style lang="scss" scoped>
.demo2-container {
    width: 100%;
    height: 100%;

    .list-section {
        width: 200px;
        .list-item {
            width: 200px;
            height: 20px;
            background-color: pink;
            color: #333;
            transition: all .5s ease-in-out;
            display: flex;
            justify-content: center;
            align-items: center;
        }
    }
}
</style>

```

通过:ref将dom引用放到数组中
-----------------

```vue
<template>
    <div class="demo2-container">
        <div class="list-section">
            <div :ref="setRefAction" @click="higherAction(index)" class="list-item" v-for="(item, index) in state.list" :key="index">
                <span>{{item}}</span>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue'

const state = reactive({
    list: [1, 2, 3, 4, 5, 6, 7],
    refList: [] as Array<any>
})

const setRefAction = (el: any) => {
    state.refList.push(el);
}
</script>

```

通过:ref循环调用setRefAction方法，该方法会默认接收一个el参数，这个参数就是我们需要获取的div元素

![微信图片_20221015193242.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e6a4d52a90ec4029ad97e50fb9bfef76~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.image?) 此时可以通过state.refList\[index\]的形式获取子元素dom

### 适用场景

通过v-for循环生成的不固定数量或者多种元素的场景 ![demo3.gif](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/9c05d453bef84bdb8cad98e2f015e820~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.image?)

### 示例代码

```vue
<template>
    <div class="demo2-container">
        <p>通过:ref将dom引用放到数组中</p>
        <div class="list-section">
            <div :ref="setRefAction" @click="higherAction(index)" class="list-item" v-for="(item, index) in state.list" :key="index">
                <span>{{item}}</span>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue'

const state = reactive({
    list: [1, 2, 3, 4, 5, 6, 7],
    refList: [] as Array<any>
})

const higherAction = (index: number) => {
    let height = state.refList[index].style.height ? state.refList[index].style.height : '20px';
    height = Number(height.replace('px', ''));
    state.refList[index].style = `height: ${height + 20}px`;
    console.log(state.refList[index]);
}

const setRefAction = (el: any) => {
    state.refList.push(el);
}
</script>

<style lang="scss" scoped>
.demo2-container {
    width: 100%;
    height: 100%;

    .list-section {
        width: 200px;
        .list-item {
            width: 200px;
            height: 20px;
            background-color: pink;
            color: #333;
            transition: all .5s ease-in-out;
            display: flex;
            justify-content: center;
            align-items: center;
        }
    }
}
</style>

```

通过子组件emit传递ref
--------------

```vue
<template>
    <div ref="cellRef" @click="cellAction" class="cell-item">
        <span>{{item}}</span>
    </div>
</template>

<script setup lang="ts">
import {ref} from 'vue';

const props = defineProps({
    item: Number
})
const emit = defineEmits(['cellTap']);
const cellRef = ref();
const cellAction = () => {
    emit('cellTap', cellRef.value);
}
</script>

```

通过对子组件添加了ref属性，并声明了一个与ref属性名称相同的变量cellRef，此时可以通过emit将cellRef.value作为一个dom引用传递出去

![微信图片_20221015193830.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/0d14d6a3c0b24dd58c6ee6961a42e758~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.image?)

### 适用场景

多个页面都可能有操作组件dom的场景 ![demo4.gif](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/d8ad386f34094e2fbd08821ecda949bf~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.image?)

### 示例代码

```vue
<template>
    <div ref="cellRef" @click="cellAction" class="cell-item">
        <span>{{item}}</span>
    </div>
</template>

<script setup lang="ts">
import {ref} from 'vue';

const props = defineProps({
    item: Number
})
const emit = defineEmits(['cellTap']);
const cellRef = ref();
const cellAction = () => {
    emit('cellTap', cellRef.value);
}
</script>

<style lang="scss" scoped>
.cell-item {
    width: 200px;
    height: 20px;
    background-color: pink;
    color: #333;
    transition: all .5s ease-in-out;
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>

```

```vue
<template>
    <div class="demo2-container">
        <p>通过子组件emit传递ref</p>
        <div class="list-section">
            <Cell :item="item" @cellTap="cellTapHandler" v-for="(item, index) in state.list" :key="index">
            </Cell>
        </div>
    </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import Cell from '@/components/Cell.vue'
const state = reactive({
    list: [1, 2, 3, 4, 5, 6, 7],
    refList: [] as Array<any>
})

const cellTapHandler = (el: any) => {
    let height = el.style.height ? el.style.height : '20px';
    height = Number(height.replace('px', ''));
    el.style = `height: ${height + 20}px`;
}
</script>

<style lang="scss" scoped>
.demo2-container {
    width: 100%;
    height: 100%;

    .list-section {
        width: 200px;
    }
}
</style>

```
