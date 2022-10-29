# 解析子节点

## parseChildren

* 解析子节点通过 parseChildren 函数完成
* 目的就是 解析模版并创建 AST 节点数据
* 有两个主要流程
  * 自顶向下分析代码 生成  AST 节点数组 nodes
  * 空白字符的处理 提高编译效率

## 生成 AST节点数组

* 主要分为四种情况
* 注释节点的解析
* 插值的解析
* 普通文本的解析
* 元素节点的解析

## 注释节点的解析

* 以 <!-- 开头的字符串 会进入注释节点的解析
* 通过 paseComment 函数解析的
  * 首先会利用注释结束符的正则表达式去匹配代码 找出注释结束符
  * 如果没有匹配到或者注释结束符不合法 都会报错
  * 如果找到合法的注释结束符
  * 获取她中间的注释内容 content 然后截取注释开头到结尾的代码 判断是否有嵌套注释 如果有 报错
* 通过调用 advanceBy 函数
  * 运行到注释结束符到后面
  * 目的是用来前进代码的  
  * 更新 context 解析上下文

#### advanceBy

* 主要更新上下文 context 和 source 来前进代码
* 同时更新  offset line column 等和代码位置相关的属性
* 经过 advanceBy的 处理把代码前进到注释结束符的后面 表述注释部分代码处理完毕可以继续解析
* paseComment 返回值是一个描述注释节点的对象  
  * type 为 3 表示是一个注释节点
  * context 表示注释的内容
  * loc 表示 注释代码的开头和结束的位置

#### advanceBy 作用

## 插值的解析

* 如果是 v-pre 会跳过插值的解析
* 通过 parseInterpolation 函数解析的
* 首先尝试查找取插值的结束隔离符 找不到则报错
  * 如果找到把代码前进到取插值开始分隔符后
  * 通过 parseTextData 获取插值中间的内容并将代码前进到插值内容后
  * 除了普通字符串  parseTextData 内部会处理一些 HTML实体符号
  * 由于插值内容可能会有前后空白字符 最终返回到 content 需要执行一下 trim 函数
* 为了准确的拿到插值内容的代码位置信息  通过 innerStart 和 innerEnd 去记录插值内容的代码开头和结束为止
* parseInterpolation 最终的返回值是一个描述插值节点的对象  
  * type 为5 表示是一个插值节点
  * loc 表示代码的开头和结束位置信息  
* 插值内容可以是一个表达式 content 又是一个描述表达式节点的对象
  * type 为 4 表示是一个表达式节点
  * loc 表示代码的开头和结束位置信息  
  * content 表示插值表达式内容

## 普通文本的解析

* 通过 paraseText 函数解析
  * 会尝试从代码中截取响应的文本内容
  * 遇到 < 或者插值分隔符 <span v-pre>{{</span> 结束 找到结束位置
* 执行 parseTextData 获取文本内容
* paraseText 最终返回的值是一个描述文本节点的对象
  * type 为2 表示是一个文本节点
  * content 表示文本内容
  * loc 表示代码的开头和结束位置信息

## 元素节点的解析

* 会解析模版中的标签节点
  * 当代码是 以 < 开头 后门跟着字母 说明是一个标签开头 进入解析
* 通过 parseElement 函数解析
* 主要做了三件事
  * 解析开始标签
  * 解析子节点
  * 解析闭合标签

### 解析开始标签 parseTag

* 首先匹配标签文本的结束位置  将代码前进到标签文本后门的空白字符后
* 然后执行 parseAttributes 解析标签的属性 class style 指令等  最终解析生成一个 prop 数组 将代码推进到属性后
  * 接着检查是不是一个 pre 标签 如果是 设置 context.inPre 为 true
  * 再去检查属性有没有 v-pre 指令  如果是 设置 context.inVPre 为 true
  * 重置上下文 context 重置解析属性
* 判断是不是一个 自闭和标签 将代码推进到闭合标签后
* 最后判断标签类型  插槽 模版 还是 自定义组件
* 最终返回到值是一个描述节点类型的对象
  * type  ： 1 元素节点
  * tag： 标签名
  * tagType ：标签的类型
  * props: 标签的属性
  * isSelfClosing ： 是否是一个闭合标签
  * loc: 表示开头和结束的位置
  * children : 标签的子节点数组 初始化 空

### 解析子节点 parseChildren

* 如果遇到元素节点 递归执行 parseElement
* parseChildren  和 parseElement 开头 获取 ancestor 数组的最后一个值 拿到元素的标签节点
* 执行 parseChildren 前添加到数组的尾部元素
* 解析完成子节点后 把 element 从 ancestors 中弹出 把children 数组添加到 element.chilren 中

### 解析结束标签

* 更新标签节点的代码位置
* parseElement 最终返回的值就是一个元素节点的  element

### 总结

* 通过不断递归的解析 就得到整个模版
* 并且标签类型的  AST 节点保持对子节点数组的引用 构成了一个树形的数据结构
* 整个解析过程 构造出来的 AST 节点数组能够映射整个模版的 DOM 结构
