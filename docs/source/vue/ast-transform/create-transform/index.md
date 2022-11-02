---
createTime: 2022/11/01
tag: 'Vue源码,AST'

---
# 创建 tramsform 上下文

* 和 parse 过程一样 在 tramsform 阶段会创建一个上下文对象
* 上下文对象 context 维护了 tramsform 过程的一些配置
* 还维护了 tramsform 过程中的一些状态数据  比如： 当前处理的 ast 节点 当前 ast 节点在子节点的索引 当前 ast 节点的父节点
* context 包含了 转换过程中调用的一些辅助函数 和修改 context 对象的函数
