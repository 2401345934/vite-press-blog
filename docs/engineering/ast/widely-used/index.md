---
createTime: 2022/11/12
tag: '工程化,AST'
---
# AST 广泛应用 & 手写编译器

手写编译器
-------

该小节分为两个部分：设计篇和原理篇。

设计篇侧重整体设计，原理篇则是手撕代码，侧重编码实现，在阅读过程中建议将重心放在设计篇，学习思想最重要。

### 设计篇

#### 整体流程

一个完整的编译器整体执行过程可以分为三个步骤：

1. **Parsing(解析过程)**：这个过程要经`词法分析`、`语法分析`、`构建AST（抽象语法树）`一系列操作；
2. **Transformation（转化过程**）：这个过程就是将上一步解析后的内容，按照编译器指定的规则进行处理，`形成一个新的表现形式`；
3. **Code Generation（代码生成**）：将上一步处理好的内容`转化为新的代码`；

如图所示，不喜欢看字的就看图：

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/2f90236f5c914a069bd51611b75160a7~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.image?)

接下来，我们先看一个小Demo，将 [lisp](https://link.juejin.cn/?target=https%3A%2F%2Fen.wikipedia.org%2Fwiki%2FLisp_(programming_language) "https://en.wikipedia.org/wiki/Lisp_(programming_language)") 的函数调用编译成类似 [C](https://link.juejin.cn/?target=https%3A%2F%2Fzh.wikipedia.org%2Fwiki%2FC%25E8%25AF%25AD%25E8%25A8%2580 "https://zh.wikipedia.org/wiki/C%E8%AF%AD%E8%A8%80") 的函数，如果你不熟悉也没关系，看完下面的代码相信大家能够快速的理解：

```
    LISP 代码： (add 2 (subtract 4 2))
    C    代码  add(2, subtract(4, 2))
    释义： 2 + （ 4 - 2 ）

```

#### Parsing(解析)

解析过程分为2个步骤：`词法分析`、`语法分析`。

**词法分析**是使用`tokenizer(分词器)`或者`lexer(词法分析器)`，将源码拆分成`tokens`，tokens是一个放置对象的数组，其中的每一个对象都可以看做是一个单元（数字，标签，标点，操作符...）的描述信息。

结合最开始做的语文题目（_**"你是猪，"**_），我们照葫芦画瓢，对`(add 2 (subtract 4 2))` 进行词法分析后得到：

```
[
  { type: "paren", value: "(" },
  { type: "name", value: "add" },
  { type: "number", value: "2" },
  { type: "paren", value: "(" },
  { type: "name", value: "subtract" },
  { type: "number", value: "4" },
  { type: "number", value: "2" },
  { type: "paren", value: ")" },
  { type: "paren", value: ")" },
];

```

像这样对中文语句进行了主谓宾的拆解得到了`tokens`，但这并不能帮助我们判断该条语句是否合法，还需要进行**语法解析**。

**语法解析**`则是将tokens重新整理成语法相互关联的表达形式` ，这种表达形式一般被称为`中间层或者AST（抽象语法树）`。

还是拿语文题目（_**"你是猪，"**_）来照葫芦画瓢，`(add 2 (subtract 4 2))` 进行语法解析后得到的AST：

```
{
  type: 'Program',
  body: [{
    type: 'CallExpression',
    name: 'add',
    params:
      [{
        type: 'NumberLiteral',
        value: '2',
      },
      {
        type: 'CallExpression',
        name: 'subtract',
        params: [{
          type: 'NumberLiteral',
          value: '4',
        }, {
          type: 'NumberLiteral',
          value: '2',
        }]
      }]
  }]
}

```

#### Transformation(转化)

这个过程主要是`改写AST（抽象语法树）`，`或者根据当前AST（抽象语法树）生成一个新的AST（抽象语法树）`，这个过程可以是相同语言，或者可以直接将AST（抽象语法树）翻译为其他语言。

注意看上述生成的AST（抽象语法树），有一些特殊的对象，都具有自己的类型描述，他们就是这个“树”上的节点，如下所示

```
// 数字片段节点
{
   type: 'NumberLiteral',
   value: '2',
}

// 调用语句节点
 {
   type: 'CallExpression',
   name: 'subtract',
   params: [{
     type: 'NumberLiteral', // 数字片段节点
     value: '4',
   }, {
     type: 'NumberLiteral', // 数字片段节点
     value: '2',
   }]
 }

```

在案例中我们是想将 [lisp](https://link.juejin.cn/?target=https%3A%2F%2Fen.wikipedia.org%2Fwiki%2FLisp_(programming_language) "https://en.wikipedia.org/wiki/Lisp_(programming_language)") 语言转化为 [C](https://link.juejin.cn/?target=https%3A%2F%2Fzh.wikipedia.org%2Fwiki%2FC%25E8%25AF%25AD%25E8%25A8%2580 "https://zh.wikipedia.org/wiki/C%E8%AF%AD%E8%A8%80") 语言，因此需要构建一个新的AST（抽象语法树），这个创建的过程就`需要遍历这个“树”的节点`并读取其内容，由此引出 **Traversal(遍历)** 和 **Visitors (访问器)**。

**Traversal(遍历)**：顾名思义这个过程就是，遍历这个AST（抽象语法树）的所有节点，这个过程使用 [深度优先原则](https://link.juejin.cn/?target=https%3A%2F%2Fzhuanlan.zhihu.com%2Fp%2F33340701 "https://zhuanlan.zhihu.com/p/33340701")，大概执行顺序如下：

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/825779625fa34efd90a6c115be7919af~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.image?)

```
进入Program - 最顶层开始
   进入CallExpression (add)
      进入NumberLiteral (2)
      离开NumberLiteral (2)
      进入CallExpression (subtract)
         进入NumberLiteral (4)
         离开NumberLiteral (4)
         进入NumberLiteral (2)
         离开NumberLiteral (2)
      离开CallExpression (subtract)
   离开CallExpression (add)
离开Program

```

**Visitors (访问器)**：`访问器最基本的思想是创建一个“访问器”对象，这个对象可以处理不同类型的节点函数`,如下所示

```
    const visitor = {
        NumberLiteral(node,parent){}, // 处理数字类型节点
        CallExpression(node,parent){} // 处理调用语句类型节点
    }

```

在遍历节点的时候，**当 enter (进入)到该节点，我们会调用访问器，然后会调用针对于这个节点的相关函数**，同时这个节点和其父节点作为参数传入。

同时**在exit（离开）的时候我们也希望能够调用访问器**，当 enter 一个节点的时候，最外层节点就相当于一个分支，他是一个节点，这个分支的内部依然存在若干节点，就像上边遍历的那样。

我们会按照`深度优先的原则`，依次遍历到这个分支的最内层，当达到最内层的时候，针对当前分支的访问就完成了，接着会依次exit（退出）节点，这个过程是由内向外的。

为了能够处理到 enter 和 exit，访问器最终会做成这个样子

```
    const visitor = {
        NumberLiteral:{
            enter(node, parent) {},
            exit(node, parent) {},
        }
    }

```

#### Code Generation(生成代码)

最后就是代码生成阶段了，`其实就是将生成的新AST树再转回代码的过程`。大部分的代码生成器主要过程是，不断的访问Transformation生成的AST(抽象语法树)或者再结合tokens，按照指定的规则，将“树”上的节点打印拼接最终还原为新的code，自此编译器的执行过程就结束了。

### 原理篇

接下来按照上述步骤，开始手写编译器。

#### 生成Tokens

第一步: 将代码解析为`tokens`。这个过程需要`tokenzier(分词器)`函数，整体思路就是通过遍历字符串的方式，对每个字符按照一定的规则进行`switch case`，最终生成`tokens`数组。

```
function tokenizer (input) {
  let current = 0; //记录当前访问的位置
  let tokens = [] // 最终生成的tokens
  // 循环遍历input
  while (current < input.length) {
    let char = input[current];
    // 如果字符是开括号，我们把一个新的token放到tokens数组里，类型是`paren`
    if (char === '(') {
      tokens.push({
        type: 'paren',
        value: '(',
      });
      current++;
      continue;
    }
    // 闭括号做同样的操作
    if (char === ')') {
      tokens.push({
        type: 'paren',
        value: ')',
      });
      current++;
      continue;
    }
    //空格检查，我们关心空格在分隔字符上是否存在，但是在token中他是无意义的
    let WHITESPACE = /\s/;
    if (WHITESPACE.test(char)) {
      current++;
      continue;
    }
    //接下来检测数字，这里解释下 如果发现是数字我们如 add 22 33 这样
    //我们是不希望被解析为2、2、3、3这样的，我们要遇到数字后继续向后匹配直到匹配失败
    //这样我们就能截取到连续的数字了
    let NUMBERS = /[0-9]/;
    if (NUMBERS.test(char)) {
      let value = '';
      while (NUMBERS.test(char)) {
        value += char;
        char = input[++current];
      }
      tokens.push({ type: 'number', value });
      continue;
    }

    // 接下来检测字符串,这里我们只检测双引号，和上述同理也是截取连续完整的字符串
    if (char === '"') {
      let value = '';
      char = input[++current];
      while (char !== '"') {
        value += char;
        char = input[++current];
      }
      char = input[++current];
      tokens.push({ type: 'string', value });
      continue;
    }
    // 最后一个检测的是name 如add这样，也是一串连续的字符，但是他是没有“”的
    let LETTERS = /[a-z]/i;
    if (LETTERS.test(char)) {
      let value = '';
      while (LETTERS.test(char)) {
        value += char;
        char = input[++current];
      }
      tokens.push({ type: 'name', value });
      continue;
    }
    // 容错处理，如果我们什么都没有匹配到，说明这个token不在我们的解析范围内
    throw new TypeError('I dont know what this character is: ' + char);
  }
  return tokens
}

```

#### 生成AST

第二步： 将生成好的`tokens`转化为`AST`。现在需要定义`parser`函数，接收上一步处理好的`tokens`：

```
function parser (tokens) {
  let current = 0; //访问tokens的下标

  //walk函数辅助我们遍历整个tokens
  function walk () {
    let token = tokens[current]
    // 现在就是遍历出每一个token，根据其类型生成对应的节点
    if (token.type === 'number') {
      current++
      return {
        type: 'NumberLiteral',
        value: token.value
      }
    }
    if (token.type === 'string') {
      current++;
      return {
        type: 'StringLiteral',
        value: token.value,
      };
    }
    //这里处理调用语句
    if (token.type === 'paren' && token.value === "(") {
      token = tokens[++current]
      //这里以一个例子解释(add 2 3) 这样的代码 "(" 就是 paren token ，而接下来的node其实就是那个 name 类型的token "add"
      let node = {
        type: "CallExpression",
        value: token.value,
        params: []
      }
      //获取name后我们需要继续获取接下来调用语句中的参数，直到我们遇到了")",这里会存在嵌套的现象如下
      // (add 2 (subtract 4 2))
      /*
        [                                        
          { type: 'paren', value: '(' },       
          { type: 'name', value: 'add' },      
          { type: 'number', value: '2' },      
          { type: 'paren', value: '(' },       
          { type: 'name', value: 'subtract' }, 
          { type: 'number', value: '4' },      
          { type: 'number', value: '2' },      
          { type: 'paren', value: ')' },       
          { type: 'paren', value: ')' },       
        ]
      */
      token = tokens[++current];
      //这里我们通过递归调用不断的读取参数
      while (
        (token.type !== 'paren') || (token.type === 'paren' && token.value !== ')')
      ) {
        node.params.push(walk())
        token = tokens[current] //因为参数的if判断里会让 current++ 实际上就是持续向后遍历了tokens,然后将参数推入params
      }
      // 当while中断后就说明参数读取完了，现在下一个应该是")"，所以我们++越过
      current++
      return node // 最终将CallExpression节点返回了
    }
    //当然这里做了容错处理，如果没有匹配到预计的类型，就说明出现了，parse无法识别的token
    throw new TypeError(token.type);
  }
  // 现在我们创建AST，树的最根层就是Program
  let ast = {
    type: 'Program',
    body: [],
  };
  //然后我们通过调用walk遍历tokens将tokens内的对象，转化为AST的节点，完成AST的构建
  while (current < tokens.length) {
    ast.body.push(walk());
  }
  return ast;
}

```

#### 遍历和访问生成好的AST

现在已经有AST了，然后我们希望能够通过访问器访问不同的节点，当遇到不同的节点的时候，调用访问器的不同函数，大致设计成这样：

```
//  traverse(ast,visitor) 迭代器(抽象语法树，访问器)
traverse(ast, {
  Program: {
    enter(node, parent) {
      // ...
    },
    exit(node, parent) {
      // ...
    },
  },
  CallExpression: {
    enter(node, parent) {
      // ...
    },
    exit(node, parent) {
      // ...
    },
  },
  NumberLiteral: {
    enter(node, parent) {
      // ...
    },
    exit(node, parent) {
      // ...
    },
  }
})

```

接下来实现`traverse`函数：

```
function traverse (ast, visitor) {
  //遍历数组，在遍历数组的同时会调用traverseNode来遍历节点
  function traverseArray (array, parent) {
    array.forEach(child => {
      traverseNode(child, parent)
    });
  }
  function traverseNode (node, parent) {
    // 判断访问器中是否有合适处理该节点的函数
    let methods = visitor[node.type];
    // 如果有就执行enter函数，因为此时已经进入这个节点了
    if (methods && methods.enter) {
      methods.enter(node, parent);
    }
    //接下来就根据node节点类型来处理了
    switch (node.type) {
      case 'Program':
        traverseArray(node.body, node); //如果你是ast的根部，就相当于树根，body中的每一项都是一个分支
        break;
      case 'CallExpression':
        traverseArray(node.params, node); //这个和Program一样处理，但是这里是为了遍历params,上面是为了遍历分支
        break;
      // 字符串和数字没有子节点需要访问直接跳过
      case 'NumberLiteral':
      case 'StringLiteral':
        break;
      // 最后容错处理
      default:
        throw new TypeError(node.type);
    }
    // 当执行到这里时，说明该节点（分支）已经遍历到尽头了，执行exit
    if (methods && methods.exit) {
      methods.exit(node, parent);
    }
  }
  //我们从ast开始进行节点遍历，因为ast没有父节点所以传入null
  traverseNode(ast, null);
}

```

#### Transformer转化

现在已经生成好AST了。在这一步需要使用到转换器，`帮助我们将刚才生成的AST转化为新的AST`。`在转化之前，必须要明确转化后的AST长什么样`，记得之前的案例：

```
    LISP 代码 (add 2 (subtract 4 2))
    C    代码  add(2, subtract(4, 2))

```

将原来的AST转化为目标AST，数据结构如下：

```
*   Original AST                     |   Transformed AST
* ----------------------------------------------------------------------------
*   {                                |   {
*     type: 'Program',               |     type: 'Program',
*     body: [{                       |     body: [{
*       type: 'CallExpression',      |       type: 'ExpressionStatement',
*       name: 'add',                 |       expression: {
*       params: [{                   |         type: 'CallExpression',
*         type: 'NumberLiteral',     |         callee: {
*         value: '2'                 |           type: 'Identifier',
*       }, {                         |           name: 'add'
*         type: 'CallExpression',    |         },
*         name: 'subtract',          |         arguments: [{
*         params: [{                 |           type: 'NumberLiteral',
*           type: 'NumberLiteral',   |           value: '2'
*           value: '4'               |         }, {
*         }, {                       |           type: 'CallExpression',
*           type: 'NumberLiteral',   |           callee: {
*           value: '2'               |             type: 'Identifier',
*         }]                         |             name: 'subtract'
*       }]                           |           },
*     }]                             |           arguments: [{
*   }                                |             type: 'NumberLiteral',
*                                    |             value: '4'
* ---------------------------------- |           }, {
*                                    |             type: 'NumberLiteral',
*                                    |             value: '2'
*                                    |           }]
*                                    |         }
*                                    |       }
*                                    |     }]
*                                    |   }

```

具体代码实现：

```
function transformer (ast) {
  // 将要被返回的新的AST
  let newAst = {
    type: 'Program',
    body: [],
  };
  // 这里相当于将在旧的AST上创建一个_content,这个属性就是新AST的body，因为是引用，所以后面可以直接操作就的AST
  ast._context = newAst.body;
  // 用之前创建的访问器来访问这个AST的所有节点
  traverser(ast, {
    // 针对于数字片段的处理
    NumberLiteral: {
      enter (node, parent) {
        // 创建一个新的节点，其实就是创建新AST的节点，这个新节点存在于父节点的body中
        parent._context.push({
          type: 'NumberLiteral',
          value: node.value,
        });
      },
    },

    // 针对于文字片段的处理
    StringLiteral: {
      enter (node, parent) {
        parent._context.push({
          type: 'StringLiteral',
          value: node.value,
        });
      },
    },

    // 对调用语句的处理
    CallExpression: {
      enter (node, parent) {
        // 在新的AST中如果是调用语句，type是`CallExpression`，同时他还有一个`Identifier`，来标识操作
        let expression = {
          type: 'CallExpression',
          callee: {
            type: 'Identifier',
            name: node.name,
          },
          arguments: [],
        };
        // 在原来的节点上再创建一个新的属性，用于存放参数 这样当子节点修改_context时，会同步到expression.arguments中，这里用的是同一个内存地址
        node._context = expression.arguments;
        // 这里需要判断父节点是否是调用语句，如果不是，那么就使用`ExpressionStatement`将`CallExpression`包裹，因为js中顶层的`CallExpression`是有效语句
        if (parent.type !== 'CallExpression') {
          expression = {
            type: 'ExpressionStatement',
            expression: expression,
          };
        }
        parent._context.push(expression);
      },
    }
  });
  return newAst;
}

```

#### 新代码生成

最后一步： 新代码生成。到这一步就是`用新的AST，遍历其每一个节点，根据指定规则生成最终新的代码`。

```
function codeGenerator(node) {
  // 我们以节点的种类拆解(语法树)
  switch (node.type) {
    // 如果是Progame,那么就是AST的最根部了，他的body中的每一项就是一个分支，我们需要将每一个分支都放入代码生成器中
    case 'Program':
      return node.body.map(codeGenerator)
        .join('\n');
    // 如果是声明语句注意看新的AST结构，那么在声明语句中expression，就是声明的标示，我们以他为参数再次调用codeGenerator
    case 'ExpressionStatement':
      return (
        codeGenerator(node.expression) + ';'
      );
    // 如果是调用语句，我们需要打印出调用者的名字加括号，中间放置参数如生成这样"add(2,2)",
    case 'CallExpression':
      return (
        codeGenerator(node.callee) +  '(' + node.arguments.map(codeGenerator).join(', ') + ')'
      );
      
    // 如果是识别就直接返回值 如： (add 2 2),在新AST中 add就是那个identifier节点
    case 'Identifier':
      return node.name;
    // 如果是数字就直接返回值
    case 'NumberLiteral':
      return node.value;
    // 如果是文本就给值加个双引号
    case 'StringLiteral':
      return '"' + node.value + '"';
    // 容错处理
    default:
      throw new TypeError(node.type);
  }
}

```

最终按照上面的步骤实现`compiler`完成这个微型编译器,注意这个过程的顺序。

```
function compiler(input) {
  let tokens = tokenizer(input); //生成tokens
  let ast    = parser(tokens); //生成ast
  let newAst = transformer(ast); //拿到新的ast
  let output = codeGenerator(newAst); //生成新代码
  return output;
}

```

现在一个小型的编译器就完整实现了，我们来测试一下：测试通过😄。

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/d53afc14edd344dbbc30b93a4713d192~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.image?)

AST的广泛应用
----------

在讲AST的广泛应用之前，我们先来了解一下 [Babel](https://link.juejin.cn/?target=https%3A%2F%2Fbabeljs.io%2Fdocs%2Fen%2F "https://babeljs.io/docs/en/") 是什么？以免一部分同学不熟悉，影响后面的学习。

[Babel](https://link.juejin.cn/?target=https%3A%2F%2Fbabeljs.io%2Fdocs%2Fen%2F "https://babeljs.io/docs/en/") 其实就是一个最常用的Javascript编译器，它能够转译 `ECMAScript 2015+` 的代码，使它在旧的浏览器或者环境中也能够运行，工作过程分为三个部分（其实就跟我们上面手写的一样，相信大家现在肯定倍感亲切）：

* **Parse(解析)** 将源代码转换成抽象语法树，树上有很多的[estree节点](https://link.juejin.cn/?target=https%3A%2F%2Fgithub.com%2Festree%2Festree "https://github.com/estree/estree")
* **Transform(转换)** 对抽象语法树进行转换
* **Generate(代码生成)** 将上一步经过转换过的抽象语法树生成新的代码

当然我们现在不用从零开始手写了，可以借助于 `babel` 插件：

* [@babel/parser](https://link.juejin.cn/?target=https%3A%2F%2Fgithub.com%2Fbabel%2Fbabel%2Ftree%2Fmaster%2Fpackages%2F%40babel%2Fparser "https://github.com/babel/babel/tree/master/packages/@babel/parser") 可以把源码转换成`AST`
* [@babel/traverse](https://link.juejin.cn/?target=https%3A%2F%2Fwww.npmjs.com%2Fpackage%2Fbabel-traverse "https://www.npmjs.com/package/babel-traverse") 用于对 `AST` 的遍历，维护了整棵树的状态，并且负责替换、移除和添加节点
* [@babel/generate](https://link.juejin.cn/?target=https%3A%2F%2Fgithub.com%2Fbabel%2Fbabel%2Ftree%2Fmaster%2Fpackages%2F%40babel%2Fgenerate "https://github.com/babel/babel/tree/master/packages/@babel/generate") 可以把`AST`生成源码，同时生成`sourcemap`
* [@babel/types](https://link.juejin.cn/?target=https%3A%2F%2Fgithub.com%2Fbabel%2Fbabel%2Ftree%2Fmaster%2Fpackages%2Fbabel-types "https://github.com/babel/babel/tree/master/packages/babel-types") 用于 `AST` 节点的 Lodash 式工具库, 它包含了构造、验证以及变换 `AST` 节点的方法，对编写处理 `AST` 逻辑非常有用
* [@babel/core](https://link.juejin.cn/?target=https%3A%2F%2Fwww.npmjs.com%2Fpackage%2F%40babel%2Fcore "https://www.npmjs.com/package/@babel/core") Babel 的编译器，核心 API 都在这里面，比如常见的 `transform`、`parse`，并实现了插件功能

先安装：

```
yarn add @babel/core -D //里面就包含了@babel/parser、@babel/traverse、@babel/generate、@babel/types等

```

### 小试牛刀：使用Babel修改函数名

上面铺垫了这么多，现在开始进入实战演习。

要求：借助 [Babel](https://link.juejin.cn/?target=https%3A%2F%2Fbabeljs.io%2Fdocs%2Fen%2F "https://babeljs.io/docs/en/") 给函数重命名。

```
//源代码
const hello = () => {};
//需要修改为：
const world = () => {};

```

根据前面学过的知识点，我们先来整理下思路：

1. 先将源代码转化成`AST`
2. 遍历`AST`上的节点，找到 `hello` 函数名节点并修改
3. 将转换过的`AST`再生成`JS`代码

将源代码拷贝到 [在线 ast 转换器](https://link.juejin.cn/?target=https%3A%2F%2Fastexplorer.net%2F "https://link.juejin.cn/?target=https%3A%2F%2Fastexplorer.net%2F") 中，查看 `hello` 函数名节点：

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/1633a93e9ff24157b5e575d3fbcddaed~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.image?)

接下来再看看目标函数的`AST`，和原函数的`AST`做个比较：

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e3626d1c60fb4c779f0d5f595d155053~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.image?)

现在我们已经有了思路：只需要将该节点的`name`字段修改即可。

该例子比较简单，直接上代码：

```
const parser = require("@babel/parser");
const traverse = require("@babel/traverse");
const generator = require("@babel/generator");

// 源代码
const code = `
const hello = () => {};
`;

// 1. 源代码解析成 ast
const ast = parser.parse(code);

// 2. 转换
const visitor = {
  // traverse 会遍历树节点，只要节点的 type 在 visitor 对象中出现，变化调用该方法
  Identifier(path) {
    const { node } = path; //从path中解析出当前 AST 节点
    if (node.name === "hello") {
      node.name = "world"; //找到hello的节点，替换成world
    }
  },
};
traverse.default(ast, visitor);

// 3. 生成
const result = generator.default(ast, {}, code);

console.log(result.code); //const world = () => {};

```

### 初露锋芒：手写简易版babel-plugin-transform-es2015-arrow-functions

接下来尝试稍微难度大一点的，手写箭头函数转换插件 [babel-plugin-transform-es2015-arrow-functions](https://link.juejin.cn/?target=https%3A%2F%2Fwww.npmjs.com%2Fpackage%2Fbabel-plugin-transform-es2015-arrow-functions "https://www.npmjs.com/package/babel-plugin-transform-es2015-arrow-functions")，将箭头函数转换为普通函数。

先看看使用原插件的情况，安装：

```
yarn add babel-plugin-transform-es2015-arrow-functions -D

```

使用插件：

```
const core = require("@babel/core"); //babel核心模块
let arrowFunctionPlugin = require("babel-plugin-transform-es2015-arrow-functions"); //转换箭头函数插件

let sourceCode = `
const sum = (a, b) => {
    return a + b;
}
`;
let targetSource = core.transform(sourceCode, {
  plugins: [arrowFunctionPlugin], //使用插件
});

console.log(targetSource.code);

```

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/cbdc0163e6f04d8789308128c79e0d54~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.image?)

接下来我们就来照着写一个类似的**Babel插件**。`所谓的babel插件其实是一个对象，对象里面有一个visitor属性，它也是一个对象，key为类型，value为函数，接受path作为参数。`也就是这样：

```
const arrowFunctionPlugin = {
  visitor: {
    [type]: (path) => {
      //xxx
    },
  },
};

```

老规矩，先看普通函数之前的AST：

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/452d8a6833ad4270a76db12d639c10ce~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.image?)

如果现在再让我们去修改函数名，其实也可以通过**Babel插件**的方式更简单：

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f36bd02fd8294e4bbe40fff732fdcbb5~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.image?)

好了，进入正题。在写箭头函数转换插件之前，我们首先得知道代码转换前后的区别。还是通过 [astexplorer.net/](https://link.juejin.cn/?target=https%3A%2F%2Fastexplorer.net%2F "https://astexplorer.net/") 这个网站去比较，经过本人长达一分钟的对比，`发现箭头函数和普通函数除了类型不一样，其他都一样`。

![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/5960c94e11d84b3e9786d324a4206f74~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.image?)

那这就好办了呀，直接修改类型尝试一下：

```
const core = require("@babel/core"); //babel核心模块

let sourceCode = `
const sum = (a, b) => {
    return a + b;
}
`;

const arrowFunctionPlugin = {
  visitor: {
    //如果是箭头函数，那么就会进来此函数，参数是箭头函数的节点路径对象
    ArrowFunctionExpression(path) {
      let { node } = path;
      node.type = "FunctionExpression";
    },
  },
};

let targetSource = core.transform(sourceCode, {
  plugins: [arrowFunctionPlugin], //使用插件
});

console.log(targetSource.code);

```

打印结果：符合预期（是不是so easy!!!）。

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/becaefcaa1cc4fcc9d2af357547c2440~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.image?)

### 崭露头角：手写复杂版babel-plugin-transform-es2015-arrow-functions

在上面中，我们虽然实现了基本的转换，但还有一些场景并没有考虑进来：

* 比如箭头函数使用简写的语法，该如何处理？
* 比如箭头函数中的this，该如何处理？
* ...

本节就来详细的分析分析，剩下的希望大家能够举一反三。

先看看箭头函数使用简写的语法：

```
let sourceCode = `
  const sum = (a, b) => a + b
`;

```

如果还是使用上面写的插件进行转换：

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/4703d8da30d94f09b68f40e39c389436~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.image?)

结果肯定是不对的，转换后的代码缺少一对大括号，还缺少 return 关键字。

解决思路：`先判断要转换的函数体是不是一个块语句，如果是就不处理，不是就生成一个块语句，将我们的代码添加到这个块里面去。在添加的过程中还需要在原代码中添加return关键字。`

在这过程中需要用到两个api：[blockStatement](https://link.juejin.cn/?target=https%3A%2F%2Fbabeljs.io%2Fdocs%2Fen%2Fbabel-types "https://babeljs.io/docs/en/babel-types") 、[returnStatement](https://link.juejin.cn/?target=https%3A%2F%2Fbabeljs.io%2Fdocs%2Fen%2Fbabel-types "https://babeljs.io/docs/en/babel-types")，可以用它们来生成节点或判断节点。

```
let types = require("@babel/types"); //用来生成或者判断节点的AST语法树的节点

const arrowFunctionPlugin = {
  visitor: {
    //如果是箭头函数，那么就会进来此函数，参数是箭头函数的节点路径对象
    ArrowFunctionExpression(path) {
      let { node } = path;
      node.type = "FunctionExpression";

      //如果函数体不是块语句
      if (!types.isBlockStatement(node.body)) {
        node.body = types.blockStatement([types.returnStatement(node.body)]); //生成一个块语句，并将内容return
      }
    },
  },
};

```

查看运行后的结果：成功。

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/85b229571e34405099409ecad9d3758d~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.image?)

再来看如果存在`this`的情况，原插件 [babel-plugin-transform-es2015-arrow-functions](https://link.juejin.cn/?target=https%3A%2F%2Fwww.npmjs.com%2Fpackage%2Fbabel-plugin-transform-es2015-arrow-functions "https://www.npmjs.com/package/babel-plugin-transform-es2015-arrow-functions") 转换后的结果：

![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/6166252ef2dd44cc9a65b79892566cb4~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.image?)

老套路，我们先得知道`转化后的代码的AST`和`源代码的AST`之间的差异，这里就不贴图了，大家可以自己动手看一看比较一下。

整体思路：

* 第一步：找到当前箭头函数要使用哪个作用域内的`this`，暂时称为父作用域
* 第二步：往父作用域中加入`_this`变量，也就是添加语句：`var _this = this`
* 第三步：找出当前箭头函数内所有用到`this`的地方
* 第四步：将当前箭头函数中的`this`，统一替换成`_this`

> 第一步：找到当前箭头函数要使用哪个作用域内的`this`

具体思路：`从当前节点开始向上查找，直到找到一个不是箭头函数的函数，最后还找不到那就是根节点`。

新增`hoistFunctionEnvironment`函数：

```
function hoistFunctionEnvironment(path) {
  //确定当前箭头函数要使用哪个地方的this
  const thisEnv = path.findParent((parent) => {
    return (
      (parent.isFunction() && !path.isArrowFunctionExpress()) ||
      parent.isProgram()
    ); //要求父节点是函数且不是箭头函数，找不到就返回根节点
  });
}

const arrowFunctionPlugin = {
  visitor: {
    //如果是箭头函数，那么就会进来此函数，参数是箭头函数的节点路径对象
    ArrowFunctionExpression(path) {
      let { node } = path;
+     hoistFunctionEnvironment(path); //提升函数环境，解决this作用域问题

      node.type = "FunctionExpression"; //箭头函数转换为普通函数
      //如果函数体不是块语句
      if (!types.isBlockStatement(node.body)) {
        node.body = types.blockStatement([types.returnStatement(node.body)]);
      }
    },
  },
};

```

> 第二步：往父作用域中加入`_this`变量

这里需要引入[作用域（scope）](https://link.juejin.cn/?target=https%3A%2F%2Fen.wikipedia.org%2Fwiki%2FScope_(computer_science) "https://en.wikipedia.org/wiki/Scope_(computer_science)")的概念。大家都知道JavaScript 拥有[词法作用域](https://link.juejin.cn/?target=https%3A%2F%2Fen.wikipedia.org%2Fwiki%2FScope_(computer_science)%23Lexical_scoping_vs._dynamic_scoping "https://en.wikipedia.org/wiki/Scope_(computer_science)#Lexical_scoping_vs._dynamic_scoping")，即代码块创建新的作用域会形成一个树状结构，它与别的作用域之间相互隔离不受影响。[作用域（scope）](https://link.juejin.cn/?target=https%3A%2F%2Fen.wikipedia.org%2Fwiki%2FScope_(computer_science) "https://en.wikipedia.org/wiki/Scope_(computer_science)")同样如此，我们得确保在改变代码的各个部分时不会破坏其他的部分。

[作用域（scope）](https://link.juejin.cn/?target=https%3A%2F%2Fen.wikipedia.org%2Fwiki%2FScope_(computer_science) "https://en.wikipedia.org/wiki/Scope_(computer_science)")的大致结构：

```
{
  path: path,
  block: path.node,
  parentBlock: path.parent,
  parent: parentScope,
  bindings: [...]
}

```

这一步比较简单，要想在作用域中加一个\_this变量，其实就是对AST树中的[（scope）](https://link.juejin.cn/?target=https%3A%2F%2Fen.wikipedia.org%2Fwiki%2FScope_(computer_science) "https://en.wikipedia.org/wiki/Scope_(computer_science)")新增一个节点即可。

```
function hoistFunctionEnvironment(path) {
  //确定当前箭头函数要使用哪个地方的this
  const thisEnv = path.findParent((parent) => {
    return (
      (parent.isFunction() && !path.isArrowFunctionExpress()) ||
      parent.isProgram()
    ); //要求父节点是函数且不是箭头函数，找不到就返回根节点
  });

  //向父作用域内放入一个_this变量
+  thisEnv.scope.push({
+    id: types.identifier("_this"), //生成标识符节点,也就是变量名
+    init: types.thisExpression(), //生成this节点 也就是变量值
+  });
}

```

> 第三步：找出当前箭头函数内所有用到`this`的地方

思路：遍历当前节点的子节点，如果有`this`变量，就收集起来。

```
function hoistFunctionEnvironment(path) {
  //确定当前箭头函数要使用哪个地方的this
  const thisEnv = path.findParent((parent) => {
    return (
      (parent.isFunction() && !path.isArrowFunctionExpress()) ||
      parent.isProgram()
    ); //要求父节点是函数且不是箭头函数，找不到就返回根节点
  });

  //向父作用域内放入一个_this变量
  thisEnv.scope.push({
    id: types.identifier("_this"), //生成标识符节点,也就是变量名
    init: types.thisExpression(), //生成this节点 也就是变量值
  });

+  let thisPaths = []; //获取当前节点this的路径
+  //遍历当前节点的子节点
+  path.traverse({
+    ThisExpression(thisPath) {
+      thisPaths.push(thisPath);
+    },
+  });
}

```

> 第四步：将当前箭头函数中的`this`，统一替换成`_this`

```
function hoistFunctionEnvironment(path) {
  //确定当前箭头函数要使用哪个地方的this
  const thisEnv = path.findParent((parent) => {
    return (
      (parent.isFunction() && !path.isArrowFunctionExpress()) ||
      parent.isProgram()
    ); //要求父节点是函数且不是箭头函数，找不到就返回根节点
  });

  //向父作用域内放入一个_this变量
  thisEnv.scope.push({
    id: types.identifier("_this"), //生成标识符节点,也就是变量名
    init: types.thisExpression(), //生成this节点 也就是变量值
  });

  let thisPaths = []; //获取当前节点this的路径
  //遍历当前节点的子节点
  path.traverse({
    ThisExpression(thisPath) {
      thisPaths.push(thisPath);
    },
  });

+  //替换
+  thisPaths.forEach((thisPath) => {
+    thisPath.replaceWith(types.identifier("_this")); //this => _this
+  });
}

```

运行结果：成功（OHHHHHHHHHHHHHH）。

![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/80ca9ba284b7404d86c6edbf2ed18138~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.image?)

> 整体代码

```
const core = require("@babel/core"); //babel核心模块
let types = require("@babel/types"); //用来生成或者判断节点的AST语法树的节点

let sourceCode = `
  const sum = (a, b) => {
    console.log(this);
    return a + b;
  };
`;

/**
 * 思路：
 * 第一步：找到当前箭头函数要使用哪个作用域内的this，暂时称为父作用域
 * 第二步：往父作用域中加入_this变量，也就是var _this=this
 * 第三步：找出当前箭头函数内所有用到this的地方
 * 第四步：将当前箭头函数中的this，统一替换成_this
 */
function hoistFunctionEnvironment(path) {
  //确定当前箭头函数要使用哪个地方的this
  const thisEnv = path.findParent((parent) => {
    return (
      (parent.isFunction() && !path.isArrowFunctionExpress()) ||
      parent.isProgram()
    ); //要求父节点是函数且不是箭头函数，找不到就返回根节点
  });

  //向父作用域内放入一个_this变量
  thisEnv.scope.push({
    id: types.identifier("_this"), //生成标识符节点,也就是变量名
    init: types.thisExpression(), //生成this节点 也就是变量值
  });

  let thisPaths = []; //获取当前节点this的路径
  //遍历当前节点的子节点
  path.traverse({
    ThisExpression(thisPath) {
      thisPaths.push(thisPath);
    },
  });

  //替换
  thisPaths.forEach((thisPath) => {
    thisPath.replaceWith(types.identifier("_this")); //this => _this
  });
}

const arrowFunctionPlugin = {
  visitor: {
    //如果是箭头函数，那么就会进来此函数，参数是箭头函数的节点路径对象
    ArrowFunctionExpression(path) {
      let { node } = path;
      hoistFunctionEnvironment(path); //提升函数环境，解决this作用域问题

      node.type = "FunctionExpression"; //箭头函数转换为普通函数
      //如果函数体不是块语句
      if (!types.isBlockStatement(node.body)) {
        node.body = types.blockStatement([types.returnStatement(node.body)]);
      }
    },
  },
};

let targetSource = core.transform(sourceCode, {
  plugins: [arrowFunctionPlugin], //使用插件
});

console.log(targetSource.code);

```

### 初战告捷：手写一个`console.log`插件

场景：在开发阶段，我们通常会打印一些`console.log`进行调试。但随着项目的日常迭代，`console.log`也越来越多，有时候控制台打印了一大堆，不能第一时间定位到想要的日志。`这个时候希望可以通过一个插件强化console，让其也打印出当前文件名，以及打印地方的行和列等代码信息`。

经过分析，其实就是往`console.log`中添加几个参数，比如源代码：

```
console.log("hello world")

```

变成：（这样是不是会清晰很多）

```
console.log("hello world","当前文件名","具体代码位置信息")

```

到了现在，相信大家已经开始去对比前后AST树了，经过我们火眼金睛的对比，找出只是`arguments`略有不同，我们只需处理这一块即可：

![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/0e386aca5dbf4a40b93373ee587dfd5f~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.image?)

思路：

* 第一步：先找出`console`节点的部分
* 第二步：判断是否是这几个方法名中的某一个：`"log"、"info"、"warn"、"error"`
* 第三步：往节点的`arguments`中添加参数

> 第一步：先找出`console`节点的部分

我们先观察console.log部分的AST：

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/91da267deed9436b8d899a0bfea46e2c~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.image?)

看完思路也就出来了：先找`CallExpression`类型的节点，然后再找出节点中的`callee.object.name`属性：

```
const core = require("@babel/core"); //babel核心模块
let types = require("@babel/types"); //用来生成或者判断节点的AST语法树的节点
const pathlib = require("path");

let sourceCode = `
  console.log("日志")
`;

const logPlugin = {
  visitor: {
    CallExpression(path, state) {
      const { node } = path;
      if (types.isMemberExpression(node.callee)) {
        if (node.callee.object.name === "console") {
          //找到console
        }
      }
    },
  },
};

let targetSource = core.transform(sourceCode, {
  plugins: [logPlugin], //使用插件
});

console.log(targetSource.code);

```

> 第二步：判断是否是这几个方法名中的某一个：`"log"、"info"、"warn"、"error"`

还是先观察console部分的AST：

![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/44c3185f4af84757a7e855793cd85cb2~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.image?)

发现我们想要的方法名可以在节点的`callee.property.name`属性中直接取到，那就好办了呀，直接上代码：

```
const core = require("@babel/core"); //babel核心模块
let types = require("@babel/types"); //用来生成或者判断节点的AST语法树的节点
const pathlib = require("path");

let sourceCode = `
  console.log("日志")
`;

const logPlugin = {
  visitor: {
    CallExpression(path, state) {
      const { node } = path;
      if (types.isMemberExpression(node.callee)) {
        if (node.callee.object.name === "console") {
          //找到console
+         if (["log", "info", "warn", "error"].includes(node.callee.property.name)) {
+           //找到符合的方法名
+         }
        }
      }
    },
  },
};

let targetSource = core.transform(sourceCode, {
  plugins: [logPlugin], //使用插件
  filename: "sum.js",
});

console.log(targetSource.code);

```

> 第三步：往节点的`arguments`中添加参数

继续观察新的AST：

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/563ce7dc56514816a9d5eedfe5572e59~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.image?)

需要我们往`arguments`中插入`StringLiteral`节点，节点中的`value`属性即是我们需要配置的值。

```
const core = require("@babel/core"); //babel核心模块
let types = require("@babel/types"); //用来生成或者判断节点的AST语法树的节点
const pathlib = require("path");

let sourceCode = `
  console.log("日志")
`;

const logPlugin = {
  visitor: {
    CallExpression(path, state) {
      const { node } = path;
      if (types.isMemberExpression(node.callee)) {
        if (node.callee.object.name === "console") {
          //找到console
          if (["log", "info", "warn", "error"].includes(node.callee.property.name)) {
            //找到方法名
+           const { line, column } = node.loc.start; //找到所处位置的行和列
+           node.arguments.push(types.stringLiteral(`${line}:${column}`)); //向右边添加我们的行和列信息
+           //找到文件名
+           const filename = state.file.opts.filename;
+           //输出文件的相对路径
+           const relativeName = pathlib
+             .relative(__dirname, filename)
+             .replace(/\\/g, "/"); //兼容window
+           node.arguments.push(types.stringLiteral(relativeName)); //向右边添加我们的行和列信息
         }
        }
      }
    },
  },
};

let targetSource = core.transform(sourceCode, {
  plugins: [logPlugin], //使用插件
+ filename: "hello.js", //模拟环境
});

console.log(targetSource.code);

```

> 效果：

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/c6c66b3b115b417bb3f5249c41858eac~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.image?)

再也不怕找不到自己的`console.log`了🐶。

### 大展身手：手写监控系统中的日志上传插件

场景：在监控系统的日志上传过程中，我们需要`往每个函数的作用域中添加一行日志执行函数`，也就是这样（但这里要注意的是，函数的定义方式总共有四种，都需要考虑进来）：

源代码：

```
//四种声明函数的方式
function sum(a, b) {
  return a + b;
}
const multiply = function (a, b) {
  return a * b;
};
const minus = (a, b) => a - b;
class Calculator {
  divide(a, b) {
    return a / b;
  }
}

```

期望转换后的代码：

```
import loggerLib from "logger"

function sum(a, b) {
  loggerLib()
  return a + b;
}
const multiply = function (a, b) {
  loggerLib()
  return a * b;
};
const minus = (a, b) =>{
  loggerLib()
  return  a - b;
}
class Calculator {
  divide(a, b) {
    loggerLib()
    return a / b;
  }
}

```

整体思路：

* 第一步：先判断源代码中是否引入了`logger`库
* 第二步：如果引入了，就找出导入的变量名，后面直接使用该变量名即可
* 第三步：如果没有引入我们就在源代码的顶部引用一下
* 第四步：在函数中插入引入的函数

> 第一步：先判断源代码中是否引入了`logger`库

导入的方式总共有三种：

```
import logger2 from "logger1";
import { logger4 } from "logger3";
import * as logeer6 from "logger5";

```

要判断源代码中有没有引入`logger`库，其实就是查找 `from`节点后面有没有`logger`，老规矩，查看这三种导入方式的`AST`：

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/313d26a3bb314f6598bcdb50c4a5cb25~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.image?)

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/edff1c0b76484aaa976282b7ca4e1223~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.image?)

发现不管哪种导入方式，我们都可以通过节点的`source.value属性获取导入的库名`，通过`specifiers.local.name属性获取导入的变量名`。上代码：

```
const core = require("@babel/core"); //babel核心模块
let types = require("@babel/types"); //用来生成或者判断节点的AST语法树的节点

let sourceCode = `
  //四种声明函数的方式
  function sum(a, b) {
    return a + b;
  }
  const multiply = function (a, b) {
    return a * b;
  };
  const minus = (a, b) => a - b;
  class Calculator {
    divide(a, b) {
      return a / b;
    }
  }
`;

const autoImportLogPlugin = {
  visitor: {
    //用来保证此模块内一定会引入一个日志的模块
    Program(path) {
      let loggerId;
      //遍历子节点
      path.traverse({
        ImportDeclaration(path) {
          const { node } = path;
          if (node.source.value === "logger") {
            //说明导入过了
            loggerId=导入的变量名
          }
        },
      });

      if (!loggerId) {
       //如果loggerId没有值，说明源代码中还没有导入此模块，需要我们手动插入一个import语句
      }
    },
  },
};

let targetSource = core.transform(sourceCode, {
  plugins: [autoImportLogPlugin], //使用插件
});

console.log(targetSource.code);

```

> 第二步：如果引入了，就找出导入的变量名，后面直接使用该变量名即可

这一步比较简单，直接通过`specifiers.local.name属性`获取导入的变量名再赋值即可。

```
  visitor: {
    //用来保证此模块内一定会引入一个日志的模块，如果源代码中已经有logger模块引入了，直接用就可以，如果没有就引用一下logger
    Program(path, state) {
      let loggerId;
      //遍历子节点
      path.traverse({
        ImportDeclaration(path) {
          const { node } = path;
          if (node.source.value === "logger") {
            //说明导入过了
+           const specifiers = node.specifiers[0];
+           loggerId = specifiers.local.name; //取出导入的变量名赋值给loggerId
+           path.stop(); //找到了就跳出循环
          }
        },
      });

      //如果loggerId没有值，说明源代码中还没有导入此模块 插入一个import语句
      if (!loggerId) {
      //xx

      }
    },
  },

```

> 第三步：如果没有引入我们就在源代码的顶部引用一下

老规矩，先去看看要引入语句的AST，然后生成一个对应的节点就好。

![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/6f57af5c81224f37b8831532b10b5d0a~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.image?)

```
  visitor: {
    //用来保证此模块内一定会引入一个日志的模块，如果源代码中已经有logger模块引入了，直接用就可以，如果没有就引用一下logger
    Program(path, state) {
      let loggerId;
      //遍历子节点
      path.traverse({
        ImportDeclaration(path) {
          const { node } = path;
          if (node.source.value === "logger") {
            //说明导入过了
            const specifiers = node.specifiers[0];
            loggerId = specifiers.local.name; //取出导入的变量名赋值给loggerId
            path.stop(); //找到了就跳出循环
          }
        },
      });

      //如果loggerId没有值，说明源代码中还没有导入此模块 插入一个import语句
      if (!loggerId) {
 +       loggerId = path.scope.generateUid("loggerLib"); //防止冲突
 +       path.node.body.unshift(
 +        types.importDeclaration(
 +          [types.importDefaultSpecifier(types.identifier(loggerId))],
 +          types.stringLiteral("logger")
 +        )
 +       );
      }
    },
  },

```

这里要说明一下的是，为了防止变量名之间的冲突，我们通过使用`path.scope.generateUid("loggerLib")`生成一个新的变量名。比如源代码中已经有别的命名叫`loggerLib`，那它就会变成`_loggerLib`。

写到这一步我们看看效果：引入成功。

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/76a11dfafefd4a4b9aaac0e052dc9ee4~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.image?)

> 第四步：在函数中插入引入的函数

思路：在获取`loggerLib()`代码块的AST，然后将其插入到函数的顶层。

这里需要考虑的是，函数共有四种声明方式，我们都需要考虑进来。

先生成`loggerLib()`代码块的AST：

```
 //loggerId就是loggerLib，第二个参数【】代表执行该函数无传参
 types.expressionStatement(
      types.callExpression(types.identifier(loggerId), [])
 );

```

我们可以将生成后的该节点挂载在state对象下，`state就是一个用来暂存数据的对象，是一个容器，用于共享数据`。

```
+   Program(path, state) {
      let loggerId;
      //遍历子节点
      path.traverse({
        ImportDeclaration(path) {
          const { node } = path;
          if (node.source.value === "logger") {
            //说明导入过了
            const specifiers = node.specifiers[0];
            loggerId = specifiers.local.name; //取出导入的变量名赋值给loggerId
            path.stop(); //找到了就跳出循环
          }
        },
      });

      //如果loggerId没有值，说明源代码中还没有导入此模块 插入一个import语句
      if (!loggerId) {
        path.node.body.unshift(
          types.importDeclaration(
            [types.importDefaultSpecifier(types.identifier(loggerId))],
            types.stringLiteral("logger")
          )
        );
      }
+     //在state上面挂在一个节点 => loggerLib()
+     state.loggerNode = types.expressionStatement(
+       types.callExpression(types.identifier(loggerId), [])
+     );
    },
  },

```

接着，在函数中插入该节点：

```
  visitor: {
    //四种函数方式，这是插件能够识别的语法，这是四种函数的type
    "FunctionDeclaration | FunctionExpression | ArrowFunctionExpression | ClassMethod"(path, state) {
      const { node } = path;
      if (types.isBlockStatement(node.body)) {
        //如果是一个块级语句的话
        node.body.body.unshift(state.loggerNode); //在语句的头部添加logger函数节点
      } else {
        //处理箭头函数，生成一个块级语句，在第一行中插入loggerNode，然后return 之前的内容
        const newBody = types.blockStatement([
          state.loggerNode,
          types.returnStatement(node.body),
        ]);
        //替换老节点
        node.body = newBody;
      }
    },
  },

```

到此，就大功告成了，查看效果：

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a936d4c1ff5e4d2f9abb2da831b65510~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.image?)

> 优化代码：

在原代码中，我们需要生成以下节点：

```
import loggerLib from "logger";
loggerLib()

```

在生成这些节点的过程中我们需要反复对照AST进行查看，很不方便而且不直观。这里我们其实可以使用Babel提供给我们的库：`@babel/template`，它可以通过我们传入的模版代码帮助我们生成对应的节点。

比如生成`import loggerLib from "logger"`节点，我们可以这么做：

```
template.statement(`import loggerLib from 'logger'`)()

```

这样是不是直观多了。优化后的代码（含完整注释）：

```
const core = require("@babel/core"); //babel核心模块
let types = require("@babel/types"); //用来生成或者判断节点的AST语法树的节点
const template = require("@babel/template");
let sourceCode = ` 
  //四种声明函数的方式
  function sum(a, b) {
    return a + b;
  }
  const multiply = function (a, b) {
    return a * b;
  };
  const minus = (a, b) => a - b;
  class Calculator {
    divide(a, b) {
      return a / b;
    }
  }
`;

const autoImportLogPlugin = {
  visitor: {
    //用来保证此模块内一定会引入一个日志的模块，state就是一个用来暂存数据的对象，是一个容器，用于共享
    Program(path, state) {
      let loggerId;
      //遍历子节点
      path.traverse({
        ImportDeclaration(path) {
          const { node } = path;
          if (node.source.value === "logger") {
            //说明导入过了
            const specifiers = node.specifiers[0];
            loggerId = specifiers.local.name; //取出导入的变量名赋值给loggerId
            path.stop(); //找到了就跳出循环
          }
        },
      });

      //如果loggerId没有值，说明源代码中还没有导入此模块 插入一个import语句
      if (!loggerId) {
        loggerId = path.scope.generateUid("loggerLib"); //防止冲突
        path.node.body.unshift(
          template.statement(`import ${loggerId} from 'logger'`)()
        );
      }
      //在state上面挂在一个节点 => logger()
      state.loggerNode = template.statement(`${loggerId}()`)();
    },
    //四种函数方式
    "FunctionDeclaration|FunctionExpression|ArrowFunctionExpression|ClassMethod"(
      path,
      state
    ) {
      const { node } = path;
      if (types.isBlockStatement(node.body)) {
        //如果是一个块级语句的话
        node.body.body.unshift(state.loggerNode); //在语句的头部添加logger函数节点
      } else {
        //处理箭头函数，生成一个块级语句，在第一行中插入loggerNode，然后return 之前的内容
        const newBody = types.blockStatement([
          state.loggerNode,
          types.returnStatement(node.body),
        ]);
        //替换老节点
        node.body = newBody;
      }
    },
  },
};

let targetSource = core.transform(sourceCode, {
  plugins: [autoImportLogPlugin], //使用插件
});

console.log(targetSource.code);

```

### 大展神威：实现简易版`ESLint`

相信大家在工作中都肯定使用过 [ESLint](https://link.juejin.cn/?target=https%3A%2F%2Fwww.npmjs.com%2Fpackage%2Feslint "https://www.npmjs.com/package/eslint")，今天我们就来扒一扒它的工作原理。本节会带着大家手写一个简易版的`ESLint`，整体不难，更多的是抛砖引玉，帮助大家更好的理解 [ESLint](https://link.juejin.cn/?target=https%3A%2F%2Fwww.npmjs.com%2Fpackage%2Feslint "https://www.npmjs.com/package/eslint")的工作原理。

在手写前先补充一个前置小知识：其实 [Babel](https://link.juejin.cn/?target=https%3A%2F%2Fbabeljs.io%2Fdocs%2Fen%2F "https://babeljs.io/docs/en/") 里面的AST遍历也是有生命周期的，有两个钩子：在遍历开始之前或遍历结束之后，它们可以用于设置或清理/分析工作。

```
export default function() {
  return {
   //遍历开始之前
    pre(state) {
      this.cache = new Map();
    },
    visitor: {
      StringLiteral(path) {
        this.cache.set(path.node.value, 1);
      }
    },
    //遍历结束后
    post(state) {
      console.log(this.cache);
    }
  };
}

```

前置小知识学完我们开干吧！ [ESLint](https://link.juejin.cn/?target=https%3A%2F%2Fwww.npmjs.com%2Fpackage%2Feslint "https://www.npmjs.com/package/eslint")中的一个比较简单的校验规则：[noconsole](https://link.juejin.cn/?target=https%3A%2F%2Feslint.org%2Fdocs%2Flatest%2Frules%2Fno-console%23rule-details "https://eslint.org/docs/latest/rules/no-console#rule-details")，也就是代码中不允许打印console.log，今天就撸它了，以儆效尤！

源代码：基于此规则，校验肯定不能通过了

```
var a = 1;
console.log(a);
var b = 2;

```

思路：遍历ATS，然后找出console节点，如果有console就报错。

```
const core = require("@babel/core"); //babel核心模块
const pathlib = require("path");

const sourceCode = `
var a = 1;
console.log(a);
var b = 2;
`;

//no-console 禁用 console fix=true：自动修复
const eslintPlugin = ({ fix }) => {
  return {
    //遍历前
    pre(file) {
      file.set("errors", []);
    },
    visitor: {
      CallExpression(path, state) {
        const errors = state.file.get("errors");
        const { node } = path;
        if (node.callee.object && node.callee.object.name === "console") {
          errors.push(
            path.buildCodeFrameError(`代码中不能出现console语句`, Error)  //抛出一个语法错误
          );
          if (fix) {
            //如果启动了fix，就删掉该节点
            path.parentPath.remove();
          }
        }
      },
    },
    //遍历后
    post(file) {
      console.log(...file.get("errors"));
    },
  };
};
let targetSource = core.transform(sourceCode, {
  plugins: [eslintPlugin({ fix: true })], //使用插件
});

console.log(targetSource.code);

```

运行效果：

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a2034985c3bf494db60c401d7374e5e6~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.image?)

其实各种大大小小的规则，都是基于此，大同小异，就是这么简单！！！

### 一鸣惊人：实现代码压缩

代码压缩一般是在项目打包上线阶段做的，平时大家可能更多的是直接使用插件，今天也来趴一趴它的工作原理。

压缩其实也很简单，就是把变量从有意义变成无意义，保证尽可能的短，例如变成：\_、a、b等，当然其实远远不止这些，还有将空格缩进取消等等，本节同样也只是抛砖引玉。

源代码：

```
 function getAge(){
   var age = 12;
   console.log(age);
   var name = 'zhufeng';
   console.log(name);
 }

```

压缩后希望将getAge、age、name这些命名进行压缩。

整体思路：

* 第一步：需要捕获那些能够生成作用域的节点（函数、类的函数、函数表达式、语句块、if else 、while、for等），因为只要有作用域，就有可能会使用变量
* 第二步：给这些作用域内的捕获到的变量重新命名，进行简化

> 第一步：需要捕获那些能够生成作用域的节点

这里引入一个新的知识点：`Bindings`，它是变量引用的集合。比如在下面这个例子中：

```
function scopeOnce() {
  var ref = "This is a binding";

  ref; // 这里是该作用域下的一个引用

  function scopeTwo() {
    ref; // 这里是上级作用域下的一个引用
  }
}

```

`ref`与`scopeOnce`作用域和`scopeTwo`作用域之间的关系就称为`binding`，它的大致结构如下：

```
{
  identifier: node,
  scope: scope,
  path: path,
  kind: 'var',

  referenced: true,
  references: 3,
  referencePaths: [path, path, path],

  constant: false,
  constantViolations: [path]
}

```

有了这些信息我们就可以查找一个变量的所有引用，并且知道变量的类型是什么（参数，定义等等），寻找到它所属的作用域，或者得到它的标识符的拷贝。 甚至可以知道它是否是一个常量，并查看是哪个路径让它不是一个常量。

知道了`binding`是否为常量在很多情况下都会很有用，最大的用处就是代码压缩。

回到实战中，可以通过`Scopable`这个别名来捕获所有作用域节点，然后通过`path.scope.bindings`取出作用域内的所有变量

```
const uglifyPlugin = () => {
  return {
    visitor: {
      //这是一个别名，用于捕获所有作用域节点：函数、类的函数、函数表达式、语句快、if else 、while、for
      Scopable(path) {
        //path.scope.bindings 取出作用域内的所有变量
      },
    },
  };
};

```

> 第二步：给这些捕获到的变量重新命名

```
const { transformSync } = require("@babel/core");

const sourceCode = `
 function getAge(){
   var age = 12;
   console.log(age);
   var name = 'zhufeng';
   console.log(name);
 }
 `;
//压缩其实就是把变量从有意义变成无意义，尽可能的短_、a、b
const uglifyPlugin = () => {
  return {
    visitor: {
      //这是一个别名，用于捕获所有作用域节点：函数、类的函数、函数表达式、语句快、if else 、while、for
      Scopable(path) {
        //path.scope.bindings 取出作用域内的所有变量
+       //取出后进行重命名
+       Object.entries(path.scope.bindings).forEach(([key, binding]) => {
+         const newName = path.scope.generateUid(); //在当前作用域内生成一个新的uid，并且不会和任何本地定义的变量冲突的标识符
+         binding.path.scope.rename(key, newName); //进行🐛命名
+       });
      },
    },
  };
};

const { code } = transformSync(sourceCode, {
  plugins: [uglifyPlugin()],
});
console.log(code);

```

效果：代码中的变量命名已经经过压缩。

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/085020877b954951990661982dad95ce~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.image?)

### 厚积薄发：实现按需加载插件

相信大家在工作中肯定都用过 [Lodash](https://link.juejin.cn/?target=https%3A%2F%2Fwww.lodashjs.com%2F "https://www.lodashjs.com/") 这个工具库，它是一个一致性、模块化、高性能的 JavaScript 实用工具库。

但是在使用它的时候有一个痛点，那就是它不支持按需加载，只要我们引用了这个工具库中的某个方法，就相当于引用整个工具库。

这无疑是不能接受的，今天我们通过一个手写的Babel插件来解决这个痛点问题。

在Webpack中使用Babel插件，配置：

```
const path = require("path");

module.exports = {
  mode: "development",
  entry: "./src/index.js",
  output: {
    path: path.resolve("dist"),
    filename: "bundle.js",
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: "babel-loader",
          options: {
            plugins: [
              //我们自己手写的babel-plugin-import插件
              [
                path.resolve(__dirname, "plugins/babel-plugin-import.js"),
                {
                  libraryName: "lodash",
                },
              ],
            ],
          },
        },
      },
    ],
  },
};

```

源代码（src/index.js）：

```
import { flatten, concat } from "lodash";
console.log(flatten, concat);

```

我们先来看看不做按需加载的情况下的打包结果：可以看到，已经快有500Kb的大小了。

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/47109f93b1f549c7b08ee74e44f3e0e8~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.image?)

解决思路：将源代码变成这样

```
import flatten from "lodash/flatten";
import concat from "lodash/concat";
console.log(flatten, concat);

```

整体方案：

* 第一步：在插件中拿到我们在插件调用时传递的参数`libraryName`
* 第二步：获取`import`节点，找出引入模块是`libraryName`的语句
* 第三步：进行批量替换旧节点

> 第一步：在插件中拿到我们在插件调用时传递的参数libraryName

```
const core = require("@babel/core"); //babel核心模块
let types = require("@babel/types"); //用来生成或者判断节点的AST语法树的节点

const visitor = {
  ImportDeclaration(path, state) {
    const { libraryName, libraryDirectory = "lib" } = state.opts; //获取选项中的支持的库的名称
    }
  },
};

module.exports = function () {
  return {
    visitor,
  };
};

```

> 第二步：获取import节点，找出引入模块是libraryName的语句

```
const core = require("@babel/core"); //babel核心模块
let types = require("@babel/types"); //用来生成或者判断节点的AST语法树的节点

const visitor = {
  ImportDeclaration(path, state) {
    const { libraryName, libraryDirectory = "lib" } = state.opts; //获取选项中的支持的库的名称
   
+   const { node } = path; //获取节点
+   const { specifiers } = node; //获取批量导入声明数组
+   //如果当前的节点的模块名称是我们需要的库的名称，并且导入不是默认导入才会进来
+   if (
+     node.source.value === libraryName &&
+     !types.isImportDefaultSpecifier(specifiers[0])
+   ) {
+     //xxx
+   }
  },
};

module.exports = function () {
  return {
    visitor,
  };
};

```

> 第三步：进行批量替换旧节点

```
const core = require("@babel/core"); //babel核心模块
let types = require("@babel/types"); //用来生成或者判断节点的AST语法树的节点

const visitor = {
  ImportDeclaration(path, state) {
    const { libraryName, libraryDirectory = "lib" } = state.opts; //获取选项中的支持的库的名称
    
    const { node } = path; //获取节点
    const { specifiers } = node; //获取批量导入声明数组
    //如果当前的节点的模块名称是我们需要的库的名称，并且导入不是默认导入才会进来
    if (
      node.source.value === libraryName &&
      !types.isImportDefaultSpecifier(specifiers[0])
    ) {
+     //遍历批量导入声明数组
+     const declarations = specifiers.map((specifier) => {
+       //返回一个importDeclaration节点，这里也可以用template
+       return types.importDeclaration(
+         //导入声明importDefaultSpecifier flatten
+         [types.importDefaultSpecifier(specifier.local)],
+         //导入模块source lodash/flatten
+         types.stringLiteral(
+           libraryDirectory
+             ? `${libraryName}/${libraryDirectory}/${specifier.imported.name}`
+             : `${libraryName}/${specifier.imported.name}`
+         )
+       );
+     });
+     path.replaceWithMultiple(declarations); //替换当前节点
    }
  },
};

module.exports = function () {
  return {
    visitor,
  };
};

```

效果：最终打包结果只有19KB了。

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/d8cd4d5e77484d0d88dba95610e09de7~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.image?)

### 一战成名：实现`TypeScript`的类型校验

此节难度较高，还是有一定的难度，不过既然大家都能坚持到这里，相信一定也没有问题！！！

这里先说一个题外话，项目中做TS文件的类型检测大致有以下几种途径：

* 使用 [ts-loader](https://link.juejin.cn/?target=https%3A%2F%2Fwww.npmjs.com%2Fpackage%2Fts-loader "https://www.npmjs.com/package/ts-loader")
* 使用 [babel-loader](https://link.juejin.cn/?target=https%3A%2F%2Fwww.npmjs.com%2Fpackage%2Fbabel-loader "https://www.npmjs.com/package/babel-loader")结合 [fork-ts-checker-webpack-plugin](https://link.juejin.cn/?target=https%3A%2F%2Fwww.npmjs.com%2Fpackage%2Ffork-ts-checker-webpack-plugin "https://www.npmjs.com/package/fork-ts-checker-webpack-plugin")
* 使用 [babel-loader](https://link.juejin.cn/?target=https%3A%2F%2Fwww.npmjs.com%2Fpackage%2Fbabel-loader "https://www.npmjs.com/package/babel-loader")结合 [tsc](https://link.juejin.cn/?target=https%3A%2F%2Fwww.typescriptlang.org%2F%3F "https://www.typescriptlang.org/?")

这三种方式有利有弊，详细细节可以看之前的一篇文章：[我是如何带领团队从零到一建立前端规范的？🎉🎉🎉](https://juejin.cn/post/7085257325165936648 "https://juejin.cn/post/7085257325165936648")。这三种方式虽然解决方案不同，但原理还是大同小异的，本节将从三种常见场景出发，由易到难，带大家吃透其中的原理。

#### 赋值场景

源代码：

```
var age:number="12";

```

校验思路：

* 第一步：获取拿到声明的类型（number）
* 第二步：获取真实值的类型（"12"的类型）
* 第三步：比较声明的类型和值的类型是否相同

```
const core = require("@babel/core"); //babel核心模块

const sourceCode = `var age:number="12";`;

const TypeAnnotationMap = {
  TSNumberKeyword: "NumericLiteral",
};

const tsCheckPlugin = {
  //遍历前
  pre(file) {
    file.set("errors", []);
  },
  visitor: {
    VariableDeclarator(path, state) {
      const errors = state.file.get("errors");
      const { node } = path;
      //第一步：获取拿到声明的类型（number）
      const idType =
        TypeAnnotationMap[node.id.typeAnnotation.typeAnnotation.type]; //拿到声明的类型 TSNumberKeyword
      //第二步：获取真实值的类型（"12"的类型）
      const initType = node.init.type; //这里拿到的是真实值的类型 StringLiteral
      //第三步：比较声明的类型和值的类型是否相同
      if (idType !== initType) {
        errors.push(
          path
            .get("init") //拿到子路径init
            .buildCodeFrameError(`无法把${initType}类型赋值给${idType}类型`, Error)
        );
      }
    },
  },
  //遍历后
  post(file) {
    console.log(...file.get("errors"));
  },
};

let targetSource = core.transform(sourceCode, {
  parserOpts: { plugins: ["typescript"] }, //解析的参数，这样才能识别ts语法
  plugins: [tsCheckPlugin], //使用插件
});

console.log(targetSource.code);

```

> 效果：

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/5fdec86c0a344936857449d00b9405e0~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.image?)

#### 先声明再赋值场景

源代码：

```
let sourceCode = `
  var age:number;
  age = "12";
`;

```

校验思路：

* 第一步：先获取左侧变量的定义（age）
* 第二步：在获取左侧变量定义的类型（number）
* 第三步：获取右侧的值的类型（“12”）
* 第四步：判断变量的左侧变量的类型和右侧的值的类型是否相同

```

const babel = require("@babel/core");

function transformType(type) {
  switch (type) {
    case "TSNumberKeyword":
    case "NumberTypeAnnotation":
      return "number";
    case "TSStringKeyword":
    case "StringTypeAnnotation":
      return "string";
  }
}
const tsCheckPlugin = () => {
  return {
    pre(file) {
      file.set("errors", []);
    },
    visitor: {
      AssignmentExpression(path, state) {
        const errors = state.file.get("errors");
        //第一步：先获取左侧变量的定义（age）
        const variable = path.scope.getBinding(path.get("left"));
        //第二步：在获取左侧变量定义的类型（number）
        const variableAnnotation = variable.path.get("id").getTypeAnnotation();
        const variableType = transformType(variableAnnotation.type);
        //第三步：获取右侧的值的类型（“12”）
        const valueType = transformType(
          path.get("right").getTypeAnnotation().type
        );
        //第四步：判断变量的左侧变量的类型和右侧的值的类型是否相同
        if (variableType !== valueType) {
          Error.stackTraceLimit = 0;
          errors.push(
            path
              .get("init")
              .buildCodeFrameError(
                `无法把${valueType}赋值给${variableType}`,
                Error
              )
          );
        }
      },
    },
    post(file) {
      console.log(...file.get("errors"));
    },
  };
};

let sourceCode = `
   var age:number;
   age = "12";
 `;

const result = babel.transform(sourceCode, {
  parserOpts: { plugins: ["typescript"] },
  plugins: [tsCheckPlugin()],
});
console.log(result.code);

```

> 效果：

![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/3ed1194aac9f4c019860d83e0dbb0f5d~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.image?)

#### 泛型场景

由于整体较复杂，我们此小节不写代码，整体理解思路即可，重在理解。

源代码：

```
  function join<T, W>(a: T, b: W) {}
  join < number, string > (1, "2");

```

整体思路：

* 第一步：先获取实参类型数组（1,'2'的类型数组：\[number,string\]）
* 第二步：获取函数调用时传递的泛型类型数组（\[number, string\]）
* 第三步：拿到函数定义时的泛型 \[ T , W \]，然后结合第二步将 T赋值为number，W赋值为string，得到数组 \[T=number,W=string\]
* 第四步：计算函数定义时的形参类型数组：此时 a:number，b:string => \[number,string\]
* 第五步：a的形参类型跟a的实参类型进行比较，b的形参类型跟b的实参类型进行比较

理清思路很简单是不是？其实并不复杂。

最佳实践
------

### 1、尽量避免遍历抽象语法树（AST）

遍历 AST 的代价很昂贵，并且很容易做出非必要的遍历，可能是数以千计甚或上万次的多余操作。

Babel 尽可能的对此做出了优化，方法是如果合并多个`visitor`能够在单次遍历做完所有事情的话那就合并它们。

> 及时合并访问者对象

当编写访问者时，若逻辑上必要的话，它会试图在多处调用 `path.traverse`。

```
path.traverse({
  Identifier(path) {
    // ...
  }
});

path.traverse({
  BinaryExpression(path) {
    // ...
  }
});

```

不过若能把它们写进一个访问者的话会更好，这样只会运行一次，否则你会毫无必要的对同一棵树遍历多次。

```
path.traverse({
  Identifier(path) {
    // ...
  },
  BinaryExpression(path) {
    // ...
  }
});

```

> 可以手动查找就不要遍历

访问者也会尝试在查找一个特定节点类型时调用 `path.traverse`。

```
const visitorOne = {
  Identifier(path) {
    // ...
  }
};

const MyVisitor = {
  FunctionDeclaration(path) {
    path.get('params').traverse(visitorOne);
  }
};

```

然而如果你查找的是很明确并且是表层的节点，那么手动去查找它们会避免代价更高的遍历。

```
const MyVisitor = {
  FunctionDeclaration(path) {
    path.node.params.forEach(function() {
      // ...
    });
  }
};

```

### 2、优化嵌套的访问者对象

当你嵌套访问者时，直接把它们嵌套式的写进代码里看起来很合理。

```
const MyVisitor = {
  FunctionDeclaration(path) {
    path.traverse({
      Identifier(path) {
        // ...
      }
    });
  }
};

```

当上述代码在每次调用 `FunctionDeclaration()` 时都会创建新的访问者对象，使得 Babel 变得更大并且每次都要去做验证。 这也是代价不菲的，所以最好把访问者向上提升。

```
const visitorOne = {
  Identifier(path) {
    // ...
  }
};

const MyVisitor = {
  FunctionDeclaration(path) {
    path.traverse(visitorOne);
  }
};

```

如果你需要嵌套的访问者的内部状态，就像这样：

```
const MyVisitor = {
  FunctionDeclaration(path) {
    var exampleState = path.node.params[0].name;

    path.traverse({
      Identifier(path) {
        if (path.node.name === exampleState) {
          // ...
        }
      }
    });
  }
};

```

可以传递给 `traverse()` 方法的第二个参数然后在访问者中用 `this` 去访问。

```
const visitorOne = {
  Identifier(path) {
    if (path.node.name === this.exampleState) {
      // ...
    }
  }
};

const MyVisitor = {
  FunctionDeclaration(path) {
    var exampleState = path.node.params[0].name;
    path.traverse(visitorOne, { exampleState });
  }
};

```

### 3、留意嵌套结构

有时候在考虑一些转换时，你可能会忘记某些结构是可以嵌套的。

举例来说，假设我们要从 `Foo` `ClassDeclaration` 中查找 `constructor` `ClassMethod`。.

```
class Foo {
  constructor() {
    // ...
  }
}

```

```
const constructorVisitor = {
  ClassMethod(path) {
    if (path.node.name === 'constructor') {
      // ...
    }
  }
}

const MyVisitor = {
  ClassDeclaration(path) {
    if (path.node.id.name === 'Foo') {
      path.traverse(constructorVisitor);
    }
  }
}

```

可是我们忽略了类型定义是可以嵌套的，于是使用上面的遍历方式最终也会找到嵌套的 `constructor`：

```
class Foo {
  constructor() {
    class Bar {
      constructor() {
        // ...
      }
    }
  }
}

```
