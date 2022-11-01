---
createTime: 2022/11/01
tag: 'js,v8'
---
# JavaScript是怎么被运行起来的?

## Web应用的生命周期

典型客户端Web应用的生命周期从用户在浏览器地址栏输入一串 URL，或单击一个链接开始。

首先当我们输入了URL,www.baidu.com, 其过程如下图所示:
![图片](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/04ea3fa40f5e43a8b5f8925be30507e4~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.awebp?)
相信到这来,很多人的DNA就已经动了,第一时间想到的是计算机网络(假以时日,我将会写一篇输入url到浏览器后,从操作系统到http响应的详细过程,可以期待一下),但是今天不是讲计算机网络,我们今天要讲的是浏览器遇到了JavaScript文件之后到底是怎么处理的,也就是图中的第四个步骤。

## 什么是v8

* v8是谷歌的开源高性能JavaScript和WebAssembly引擎,使用c++编写。目前主要使用于 Chrome 浏览器和 Node.js 中，其核心功能主要是让开发者编写的JavaScript代码编译成CPU易于理解的二进制指令。

* 在这里,你可以把v8引擎当做一个虚拟机,虚拟机通过模拟实际计算机的各种功能来实现代码的执行。对于JavaScript代码来说,v8就是它的全部。当 V8 执行 JavaScript 代码时，你并不需要担心现实中不同操作系统的差异，也不需要担心不同体系结构计算机的差异，你只需要按照虚拟机的规范写好代码就可以了。

* V8可以独立运行，也可以嵌入到任何C++应用程序中。

## V8 是怎么执行 JavaScript 代码的

参考下面的流程图，以及官方的流程图
![图片](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/4288943e7058467b8409d68790ad4fd7~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.awebp?)
![图片](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f3974fc456cc43b6b07d783686e18d69~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.awebp?)

* 首先Blink将ja代码交给v8引擎,以ASCLL,LATIN1,UTF-8编码的方式把代码交给Stream。
* Stream再以UTF-16 code unit的编码方式传给扫描器(Scanner)。
* 因为UTF-16不能在单个代码单元中编码每个Unicodes字符,Scanner实际上操作的是Unicodes字符而不是UTF-16代码单元。Scanner会进行词法分析,词法分析会将代码转换成tokens。
* 接下来对token进行解析,但这并不是全部进行解析,并不是所有的js代码都会一开始便执行的(你可以理解为我们平常使用的路由懒加载),这将会影响浏览器的运行效率。于是v8实现了解析(Parser)和预解析(PreParser),它的作用是将暂时还没有使用到的函数进行预解析,对其标记为函数,但不解析函数里面的代码,而对函数的全局解析是在函数被调用时才会进行。在这个步骤里最终会将解析的代码生成AST抽象语法树。全局上下文和作用域在这里也出现了,我们将会在后面的内容中讲到。
* 解释器ignition会将AST解释成ByteCode字节码,在解释执行字节码的过程中，如果发现了某一段代码会被重复多次执行，那么会将这段代码标记为热点代码。当某段代码被标记为热点代码后，V8 就会将这段字节码交给给优化编译器(turbofan)，优化编译器会在后台将字节码编译为优化的机器码，优化后的二进制机器代码的执行效率会得到大幅提升。
* 不过，和静态语言不同的是，JavaScript是一种非常灵活的动态语言，对象的结构和属性是可以在运行时任意修改的，而经过优化编译器优化过的代码只能针对某种固定的结构，一旦在执行过程中，对象的结构被动态修改了，那么优化之后的代码势必会变成无效的代码，这时候优化编译器就需要执行反优化操作，经过反优化的代码，下次执行时就会回退到解释器解释执行。

## Ignition解释器

Ignition是一台寄存器机器，每个字节码将其输入和输出指定为显式寄存器操作数，这与堆栈机器相反，在堆栈机器中，每个字节码将消耗输入并将输出推入隐式堆栈。

## Turbofan 优化编译器

TurboFan 将尖端的中间表示与多层翻译和优化管道相结合，以生成比以前使用 CrankShaft JIT 更优质的机器代码。

Turbofan 获取之前生成的热点字节码,通过优化编译生成intel,ARM,MIPS等机器码。

具体编译流程如下图所示:
![图片](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/fed3cb01f0494ae5910582ca5276a493~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.awebp?)

## 什么是抽象语法树

* 在计算机科学中，抽象语法树（Abstract Syntax Tree，AST），或简称语法树（Syntax tree），是源代码语法结构的一种抽象表示。它以树状的形式表现编程语言的语法结构，树上的每个节点都表示源代码中的一种结构。之所以说语法是“抽象”的，是因为这里的语法并不会表示出真实语法中出现的每个细节。比如，嵌套括号被隐含在树的结构中，并没有以节点的形式呈现；而类似于 if-condition-then 这样的条件跳转语句，可以使用带有三个分支的节点来表示。
* 和抽象语法树相对的是具体语法树（通常称作分析树）。一般的，在源代码的翻译和编译过程中，语法分析器创建出分析树，然后从分析树生成AST。一旦AST被创建出来，在后续的处理过程中，比如语义分析阶段，会添加一些信息。

## 抽象语法书生成过程

词法分析 : 词法分析，也称之为扫描（scanner），简单来说就是把一段代码进行拆分，一个一个字母的来读取字符，然后与定义好的 JavaScript 关键字符做比较，生成对应的Token。Token 是一个不可分割的最小单元。

语法分析 : 语法分析会将词法分析出来的 Token 转化成有语法含义的抽象语法树结构。同时，验证语法，语法如果有错的话，抛出语法错误。
举个🌰

```js
const moment='777'
```

对源码的字符流进行扫描后根据构词规则识别单词,生成token流

```js
[
    {
        "type": "Keyword",
        "value": "const"
    },
    {
        "type": "Identifier",
        "value": "moment"
    },
    {
        "type": "Punctuator",
        "value": "="
    },
    {
        "type": "String",
        "value": "'777'"
    }
]
```

在词法分析的基础上将单词序列组合成抽象语法树
![图片](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b032390da970453ea7205e0fb3a3c513~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.awebp?)

## 什么是执行上下文

* 执行上下文是一种规范，用于跟踪ECMAScript实现对代码的运行时评估。
* 全局执行上下文在 V8 的生存周期内是不会被销毁的，它会一直保存在堆中，这样当下次在需要使用函数或者全局变量时，就不需要重新创建了。
* 由于JavaScript是单线程的,所以在任何时间点,实际上最多有一个上下文正在执行代码( worker? )。
* 执行栈用于跟踪执行上下文,正在运行的执行上下文总是这个执行栈的顶部元素。
* 每当解析器从与当前运行的执行上下文关联的可执行代码转移到与该执行上下文不关联的可执行代码时，就会创建一个新的执行上下文。新创建的执行上下文被推到堆栈上，并成为当前正在运行的执行上下文。
* 每个执行上下文至少具有三个状态组件,用于跟踪其关联代码的执行进度所需的任何实现特定状态。
* code evaluation：用于判断代码是处于执行,暂停还是恢复。
* Function：如果这个执行上下文正在评估一个函数对象的代码，那么这个组件的值就是那个函数对象。如果上下文正在评估script标签或者module的代码，则值为 null。
* Realm：每一个 Realm 由一组固有对象、一个ECMAScript全局环境、在该全局环境的作用域中加载的所有ECMAScript代码以及其他相关的状态和资源组成。

```js
function moment() {
  const age = 18;
  const hobby = ["music"];

  function studyReact() {
    console.log("react真好玩");
  }
  studyReact();

  console.log(age, hobby);
}

/**
 * 要执行这段代码,执行栈会创建一个函数的执行上下文
 * 执行到函数 studyReact 的时候,执行栈会为其再创建一个新的执行上下文
 * 并把新的执行上下文推送到栈顶上,并成为当前正在运行的执行上下文
 * 等当前函数执行完,函数 studyReact 会弹出栈,继续执行函数 moment 剩下的代码
 * 整个过程经历的状态分别是 执行moment 暂停moment 执行studyReact 恢复moment
 */
```

## 执行上下文的类型

* 全局执行上下文: 这是默认的或基本的执行上下文。任何不在函数内部的代码位于全局执行上下文中。他在编译阶段便创建一个 Global对象,在浏览器中它是window对象,由var创建的变量和全局声明的函数都会被挂载到Global对象上,此时this的值设置等于这个Global对象,一个程序中有且仅有一个全局执行上下文。
* 函数执行上下文: 每个函数都拥有自己的执行上下文,但是只有在函数被调用的时候才会被创建。被调用的函数的执行上下文会被推送到栈顶并执行当前的执行上下文。

### 骗人的小鬼

eval函数:在Eval函数内部执行的代码也会获得它自己的执行上下文

```js
function foo(str, age) {
  eval(str); // 小伙子你很会撒谎嘛
  console.log(age, nickname);
}

var nickname = "Mayday";

foo("var nickname = 'moment'", 18); //18 moment

/**
 * 由于传入的代码声明了一个新的变量nickname,因此它对已存在的foo(...)词法作用域进行了修改
 * 实际上是eval函数在函数foo内部创建了一个值为moment的变量,并遮盖外部(全局)作用域中的同名变量
 */
```

## 执行栈

* 执行栈,在其他编程语言中也被用为调用栈,是一个具有后进先出数据结构的栈，它用于存储代码执行期间创建的所有执行上下文。

* 当JavaScript引擎进行编译时,它会创建一个全局执行上下文并将其推入当前执行栈中,每当引擎发现函数调用时,它就为该函数创建一个新的执行上下文,并将其推送到栈顶并执行当前上下文。

* JavaScript引擎执行当前执行上下文位于堆栈顶部的函数。当这个函数完成时，它的执行栈从栈中弹出，继续执行前一个执行上下文剩下的代码。

## 如何创建执行上下文

执行上下文的创建分为两个阶段,第一阶段是创建阶段,第二个阶段是执行阶段

### 执行阶段

执行阶段所要理解的东西不是很多,在这里先提前说了。

在这个阶段，所有这些变量的赋值都完成了，代码也最终执行了。

### 创建阶段

在创建阶段,V8引擎只是扫描所有代码,但是不执行。它创建作用域,并且为其作用域内的每个变量和函数都分配内存。之后还初始化this的值。

创建阶段会创建一个词法环境 LexicalEnvironment 组件和变量环境 VariableEnvironment 组件。在这个时候它们的值都相同。执行上下文的 LexicalEnvironment 和 VariableEnvironment 组件始终是 Lexical Environments。

因此,执行上下文的概念可以用以下代码表示:

```js
ExecutionContext = {  
LexicalEnvironment = <ref. to LexicalEnvironment in memory>,
VariableEnvironment = <ref. to VariableEnvironment in memory>,  
}
```

#### 什么是 词法环境(Lexical Environments)

中文理解就是词法环境是一种规范类型，用于根据ECMAScript代码的词法嵌套结构定义标识符与特定变量和函数的关联。词汇环境由一个环境记录和一个可能为空的对外部词汇环境的引用组成。

词法环境就是一个链表结构 Lexical Environments -> outer -> global environment -> null

词法环境分为两种类型:

全局环境： 全局执行上下文，他没有外部环境的引用或者说为null，在浏览器的环境下拥有一个全局对象window和关联的方法和属性: Math,String,Date等。还有用户定义的全局变量,例如var定义的变量和全局定义的函数，并将this指向全局对象。
函数环境： 用户在函数定义的变量将储存在环境记录中。对外部环境的引用可以是全局环境，也可以是包含内部函数的外部函数环境。环境记录中包含用户声明的变量,函数,还有arguments对象。

```js
// 词法环境可以用一下的伪代码表示
GlobalExectionContent = {
  LexicalEnvironment: {
    EnvironmentRecord: {
      Type: "Object",
      // 剩余标识符
    },
    Outer: null,
  }
}

FunctionExectionContent = {
  LexicalEnvironment: {
    EnvironmentRecord: {
      Type: "Declarative",
      // 剩余标识符
    },
    Outer: [Global or outer function environment reference],
  }
}
```

#### 什么是 环境记录(Environment Records)

环境记录是在词法环境中存放变量和函数声明的地方。
环境记录可分为两种类型:

声明性环境记录:声明性环境变量存储了作用域中的变量、常量、类、模块或函数声明。函数环境记录(Function Environment Records)也是一个声明性环境记录，用于表示函数的顶级范围，如果函数不是 ArrowFunction，则提供 this 绑定。

通常情况下，声明式环境记录绑定的内容会被直接存储在底层实现上，如虚拟机的寄存器上，以便于快速访问。另外声明式环境记录项的特性允许使用完整的词法寻址技术，无需任何作用域链查找即可直接访问所需的变量。声明式环境记录除了支持可变绑定之外，还提供不可变绑定。不可变绑定是一种标识符和值之间的关联一旦建立就不能修改的绑定。如果绑定的内容是不可更改的，所有变量的地址在编译时就可以确定，这样js引擎在执行时就可以针对性进行优化。

对象环境记录:绑定了一组字符串标识符名称，这些名称直接对应于其绑定对象的属性名称。在浏览器环境下就是保存对象的key-value在windows上,所以对象环境记录不存在不可变绑定。

#### 全局环境记录(Global Environment Records)

全局环境记录在逻辑上是单个记录，但它被指定为封装对象环境记录和声明性环境记录的组合。
全局环境记录的对象环境记录组件包含所有内置全局变量的绑定，以及由全局代码中包含的FunctionDeclaration、GeneratorDeclaration、AsyncFunctionDeclaration、AsyncGeneratorDeclaration或VariableStatement引入的所有绑定。全局代码中所有其他ECMAScript声明的绑定包含在全局环境记录的声明性环境记录组件中。
用伪代码的形式可以表现为以下的方式:

```js
GlobalEnvironmentRecords: {
    outerEnv: null, // 全局环境 的外部引用为null
    [[GlobalThisValue]]: // this的执行 如 window
    [[ObjectRecord]]: { // 即对象式环境记录ObjectEnvironmentRecord
      // 包含了全局下var、function、generator、async声明的标识符 还有其他内置对象 如Math、Date
      // 用全局对象（如window）作为绑定对象，所以在全局下用var、function...声明的变量可以通过window[变量名] 访问（或window.变量名）
      [变量名]: undefined
    }, 
    [[DeclarativeRecord]]:{ // 即声明式环境记录DeclarativeEnvironmentRecord
      // 除了var、function、generator、async声明的标识符保存在这里，如let、const
      [变量名]: uninitialized // 在编译阶段为uninitialized
    },
    [[varNames]]: // var、function、generator、async声明的标识符列表
  }
```

```js

console.log(moment); // undefined
var moment = "777";

console.log(foo); // ReferenceError: Cannot access 'foo' before initialization
let foo = 18;
```

* JavaScript引擎在编译的时候会创建一个全局对象Global,
* 而由var声明的变量会挂载到全局对象Global上,
* 所以在代码执行的时候moment属性已经存在了,只不过值是undefined,这就是我们常说的作用域提升。
* 而由let声明的变量只有在代码执行阶段才创建,而在定义前使用,
* JavaScript引擎会通过作用域链的查找方式一层一层往上找,而Global的上一层作用域为null
* 所以会有 ReferenceError 的报错。
* 函数声明和变量声明都会被提升。但是值得注意的细节是,
* 在重复声明的代码中, 函数会被首先提升, 然后才是变量

## 什么是作用域

作用域是一套规则,用于确定在何处以及如何查找变量(标识符)。如果查找的目的对变量进行赋值,那么就会使用LHS查询,如果目的是获取变量的值就会使用RHS查询。

作用域链就是通过作用域一层一层的往上找,直到查找到顶层(全局作用域),可能找到,也可能没找到,但无论如何查找过程都将终止,因为全局作用域外层作用域的指向为null。

作用域分为两种主要的工作模型。第一种是词法作用域,另外一种叫作动态作用域。

词法作用域就是定义在词法阶段的作用域。换句话说,词法作用域是由你在代码时将变量和快作用域写在哪里决定的,作用域在编译的时候已经决定了,不会再修改。

而动态作用域是是通过运行时就行修改的,就是前面讲到的eval语法和with语法,这会导致性能下降。

## 作用域和执行上下文是什么关系

执行下上下文，简单概括来说就是全局代码执行期间,JS引擎就会创建一个栈来存储管理所有的执行上下文对象。

作用域是在JavaScript源代码编译成机器码和字节码之前，编译器需要依赖的一个作用对象。用于查找当前环境所定义的变量等，最终输出整体抽象语法树(AST),作用域一旦确定便不会再修改了。

二者形似,但生不逢时。
