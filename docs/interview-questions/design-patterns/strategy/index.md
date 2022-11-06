---
createTime: 2022/11/06
tag: 'js,面试题,设计模式'
---
# 策略模式

## 场景

进入一个营销活动页面，会根据后端下发的不同 `type` ，前端页面展示不同的弹窗。

```js
async getMainData() {
  try {
    const res = await activityQuery(); // 请求后端数据
    this.styleType = res.styleType;
    if (this.styleType === STYLE_TYPE.Reward) {
      this.openMoneyPop();
    }else if (this.styleType === STYLE_TYPE.Waitreward) {
      this.openShareMoneyPop();
    } else if (this.styleType === STYLE_TYPE.Poster) {
      this.openPosterPop();
    } else if (this.styleType === STYLE_TYPE.Activity) {
      this.openActivityPop();
    } else if (this.styleType === STYLE_TYPE.Balance) {
      this.openBalancePop();
    } else if (this?.styleType === STYLE_TYPE.Cash) {
      this.openCashBalancePop();
    }
  } catch (error) {
    log.error(MODULENAME, '主接口异常', JSON.stringify(error));
  }
}

```

这个代码的话看了就想打人，未来新增一种弹窗类型的话，我们需要到 `getMainData` 内部去补一个 `else if`，一不小心可能就会影响到原有的逻辑，并且随着迭代函数会越来越大。但其实每种弹窗是相互独立的，我们并不关心其他弹窗的逻辑。

此时，就需要策略模式了。

## 策略模式

看下 [维基百科](https://link.juejin.cn/?target=https%3A%2F%2Fzh.wikipedia.org%2Fwiki%2F%25E7%25AD%2596%25E7%2595%25A5%25E6%25A8%25A1%25E5%25BC%258F "https://zh.wikipedia.org/wiki/%E7%AD%96%E7%95%A5%E6%A8%A1%E5%BC%8F") 的定义。

> 策略模式作为一种[软件设计模式](https://link.juejin.cn/?target=https%3A%2F%2Fzh.wikipedia.org%2Fwiki%2F%25E8%25BB%259F%25E4%25BB%25B6%25E8%25A8%25AD%25E8%25A8%2588%25E6%25A8%25A1%25E5%25BC%258F "https://zh.wikipedia.org/wiki/%E8%BB%9F%E4%BB%B6%E8%A8%AD%E8%A8%88%E6%A8%A1%E5%BC%8F")，指对象有某个行为，但是在不同的场景中，该行为有不同的实现算法。比如每个人都要“交个人所得税”，但是“在中国交个人所得税”和“在美国交个人所得税”就有不同的算税方法。
>
> 策略模式：
>
> * 定义了一族算法（业务规则）；
> * 封装了每个算法；
> * 这族的算法可互换代替（interchangeable）。

看一下如果是 `Java` 语言会怎么实现：

```js
//StrategyExample test application
class StrategyExample {
    public static void main(String[] args) {
        Context context;
        // Three contexts following different strategies
        context = new Context(new FirstStrategy());
        context.execute();

        context = new Context(new SecondStrategy());
        context.execute();

        context = new Context(new ThirdStrategy());
        context.execute();
    }
}
// The classes that implement a concrete strategy should implement this
// The context class uses this to call the concrete strategy
interface Strategy {
    void execute();
}

// Implements the algorithm using the strategy interface
class FirstStrategy implements Strategy {
    public void execute() {
        System.out.println("Called FirstStrategy.execute()");
    }
}

class SecondStrategy implements Strategy {
    public void execute() {
        System.out.println("Called SecondStrategy.execute()");
    }
}

class ThirdStrategy implements Strategy {
    public void execute() {
        System.out.println("Called ThirdStrategy.execute()");
    }
}

// Configured with a ConcreteStrategy object and maintains a reference to a Strategy object
class Context {
    Strategy strategy;
    // Constructor
    public Context(Strategy strategy) {
        this.strategy = strategy;
    }
    public void execute() {
        this.strategy.execute();
    }

}

```

主要是利用到类的多态，根据传入 `Context` 中不同的 `strategy`，来执行不同的 `execute()`。如果未来有新增算法的话，只需要新增一个类即可。

那如果是 `js` 呢？众所周知，`ES6` 之前 `js` 是没有 `class` 关键字的，即使现在有了，也依然只是基于原型的语法糖，底层和 `java` 的类是完全不同的。

此外，`js` 中函数是一等公民，可以当作参数传入和返回，因此实现策略模式我们完全不需要去定一个类，然后通过生成的对象调用方法。在 `js` 中我们只需要将函数传入即可。

```js
const strategies = {
  FirstStrategy() {
    console.log("Called FirstStrategy");
  },
  SecondStrategy() {
    console.log("Called SecondStrategy");
  },
  ThirdStrategy() {
    console.log("Called ThirdStrategy");
  }
}

const execute = (strategy) => {
  return strategies[strategy]();
}

execute('FirstStrategy')
execute('SecondStrategy')
execute('ThirdStrategy')

```

上边主要演示了思想，实际开发中，我们完全可以把每种策略分文件单独写然后再 `import`。

相对于 `java`，写法简单了很多，我们不需要定义各个类，只需要用一个对象来存储所有策略，再提供一个调用策略的函数，甚至这个函数也可以直接省略。

## 优化代码

将所有弹窗方法从业务代码 `getMainData` 中抽离出来，只暴露一个打开弹窗的函数供业务调用。

```js
import { openPop } from './popTypes';
async getMainData() {
  try {
    const res = await activityQuery(); // 请求后端数据
    openPop(res.styleType)
  } catch (error) {
    log.error(MODULENAME, '主接口异常', JSON.stringify(error));
  }
}

```

然后就是 `popTypes.js` 文件。

```js
import { SHARETYPE } from './constant';

const popTypes = {
  [STYLE_TYPE.Reward]: function() {
    ...
  },
  [STYLE_TYPE.Waitreward]: function() {
    ...
  },
  [STYLE_TYPE.Poster]: function() {
    ...
  },
  [STYLE_TYPE.Activity]: function() {
    ...
  },
  [STYLE_TYPE.Balance]: function() {
    ...
  },
  [STYLE_TYPE.Cash()]: function() {
    ...
  },
}

export function openPop(type){
  return popTypes[type]();
}

```

## 更多场景

表单验证也是一个典型场景，常用的，我们需要验证用户输入字段是否是数字、是否必填、是否是数组，还有自定义的一些验证，同样可以通过策略模式实现，从而使得代码更易维护和扩展。

如果使用过 `Element UI`，对下边表单的 `rule` 一定很熟悉。

```js
const rule = {
  name: {
    type: 'string',
    required: true,
    message: '请输入名字'
  },
  age: [
    {
      type: 'number',
      message: '请输入number',
    },
    {
      message: '年龄必须大于 18',
      validator: (rule, value) => value > 18,
    },
  ]
};

```

`Element` 会帮助我们校验 `name` 是否是 `string`、`age` 是否是 `number`。而 `Element` 其实是用的一个开源的 **[async-validator](https://link.juejin.cn/?target=https%3A%2F%2Fgithub.com%2Fyiminghe%2Fasync-validator "https://github.com/yiminghe/async-validator")** 校验库。

**[async-validator](https://link.juejin.cn/?target=https%3A%2F%2Fgithub.com%2Fyiminghe%2Fasync-validator "https://github.com/yiminghe/async-validator")** 内部会内置很多 `type` 的 `validator`，然后会根据 `rule` 中的 `type` 来帮我们填充相应的 `validator`。让我们看一下相应的源码。

首先是 `validator` 文件夹，会定义很多校验规则，`date` 类型、`number` 类型等等，相当于很多策略。

![image-20220106090411041](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/4d0e4df297b24ec4a56349938855ac2a~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.image)

然后是上边截图中的 `validator/index.ts` 文件，将这些策略导出。

```js
import string from './string';
import method from './method';
import number from './number';
import boolean from './boolean';
import regexp from './regexp';
import integer from './integer';
import float from './float';
import array from './array';
import object from './object';
import enumValidator from './enum';
import pattern from './pattern';
import date from './date';
import required from './required';
import type from './type';
import any from './any';

export default {
  string,
  method,
  number,
  boolean,
  regexp,
  integer,
  float,
  array,
  object,
  enum: enumValidator,
  pattern,
  date,
  url: type,
  hex: type,
  email: type,
  required,
  any,
};


```

校验前会执行下边的代码，通过 `type` 填充相应的 `validator`。

```js
arr.forEach(r => {
  ...
  if (typeof rule === 'function') {
    rule = {
      validator: rule,
    };
  } else {
    rule = { ...rule };
  }

  // Fill validator. Skip if nothing need to validate
  rule.validator = this.getValidationMethod(rule); // 策略模式应用
  if (!rule.validator) {
    return;
  }
});
```

策略模式的体现就是 `getValidationMethod` 方法了，让我们看一下实现。

```js
import validators from './validator/index'; // 导入所有策略

getValidationMethod(rule: InternalRuleItem) {
  // 已经有了就直接返回 validator
  if (typeof rule.validator === 'function') {
    return rule.validator;
  }
  ...
  // 通过 type 得到相应的 validator。
  return validators[this.getType(rule)] || undefined;
}

getType(rule: InternalRuleItem) {
  ...
  return rule.type || 'string';
}

```

填充相应的 `validator` 之后接下来只需要遍历相应的 `rule` 然后校验就可以了。
