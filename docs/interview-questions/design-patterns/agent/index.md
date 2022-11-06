---
createTime: 2022/11/06
tag: 'js,面试题,设计模式'
---
# 装饰器模式

## 场景

微信小程序定义一个页面是通过微信提供的 `Page` 方法，然后传入一个配置对象进去。

```js
Page({
  data: { // 参与页面渲染的数据
    logs: []
  },
  onLoad: function () {
    // 页面渲染后 执行
  }
})

```

如果我们有个需求是在每个页面加载的时候上报一些自定义数据。

最直接的当然是去每个页面加就好了，但上报数据的逻辑是一致的，一个一个加有些傻了，这里就可以用到装饰器模式了。

## 装饰器模式

看下维基百科的定义。

> **装饰器（修饰）模式**，是[面向对象程式](https://link.juejin.cn/?target=https%3A%2F%2Fzh.wikipedia.org%2Fw%2Findex.php%3Ftitle%3D%25E9%259D%25A2%25E5%2590%2591%25E5%25AF%25B9%25E8%25B1%25A1%25E7%25A8%258B%25E5%25BC%258F%26action%3Dedit%26redlink%3D1 "https://zh.wikipedia.org/w/index.php?title=%E9%9D%A2%E5%90%91%E5%AF%B9%E8%B1%A1%E7%A8%8B%E5%BC%8F&action=edit&redlink=1")领域中，一种动态地往一个类别中添加新的行为的[设计模式](https://link.juejin.cn/?target=https%3A%2F%2Fzh.wikipedia.org%2Fwiki%2F%25E8%25BD%25AF%25E4%25BB%25B6%25E8%25AE%25BE%25E8%25AE%25A1%25E6%25A8%25A1%25E5%25BC%258F "https://zh.wikipedia.org/wiki/%E8%BD%AF%E4%BB%B6%E8%AE%BE%E8%AE%A1%E6%A8%A1%E5%BC%8F")。就功能而言，修饰模式相比生成[子类别](https://link.juejin.cn/?target=https%3A%2F%2Fzh.wikipedia.org%2Fwiki%2F%25E5%25AD%2590%25E9%25A1%259E%25E5%2588%25A5 "https://zh.wikipedia.org/wiki/%E5%AD%90%E9%A1%9E%E5%88%A5")更为灵活，这样可以给某个对象而不是整个类别添加一些功能。

看一下 `UML` 类图和次序图。

![image-20220117093402007](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/930ce7826edd48859bd6fb4fa19145d8~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.image)

当访问 `Component1` 中的 `operation` 方法时，会先调用预先定义的两个装饰器 `Decorator1` 和 `Decorator2` 中的 `operation` 方法，执行一些额外操作，最后再执行原始的 `operation` 方法。

举一个简单的例子：

买奶茶的话可以额外加珍珠、椰果等，不同小料有不同的价格、也可以自由组合，此时就可以用到装饰器模式，对原始奶茶进行加料、算价。

原始的奶茶有一个接口和类。

```js
interface MilkTea {
    public double getCost(); // 返回奶茶的价格
    public String getIngredients(); // 返回奶茶的原料
}

class SimpleMilkTea implements MilkTea {
    @Override
    public double getCost() {
        return 10;
    }

    @Override
    public String getIngredients() {
        return "MilkTea";
    }
}

```

下边引入装饰器，进行加料。

```js
// 添加一个装饰器的抽象类
abstract class MilkTeaDecorator implements MilkTea {
    private final MilkTea decoratedMilkTea;

    public MilkTeaDecorator(MilkTea c) {
        this.decoratedMilkTea = c;
    }

    @Override
    public double getCost() {
        return decoratedMilkTea.getCost();
    }

    @Override
    public String getIngredients() {
        return decoratedMilkTea.getIngredients();
    }
}

// 添加珍珠
class WithPearl extends MilkTeaDecorator {
    public WithPearl(MilkTea c) {
        super(c); // 调用父类构造函数
    }

    @Override
    public double getCost() { 
        // 调用父类方法
        return super.getCost() + 2;
    }

    @Override
    public String getIngredients() {
       // 调用父类方法
        return super.getIngredients() + ", 加珍珠";
    }
}

// 添加椰果
class WithCoconut extends MilkTeaDecorator {
    public WithCoconut(MilkTea c) {
        super(c);
    }

    @Override
    public double getCost() {
        return super.getCost() + 1;
    }

    @Override
    public String getIngredients() {
        return super.getIngredients() + ", 加椰果";
    }
}

```

让我们测试一下，

```js
public class Main {
    public static void printInfo(MilkTea c) {
        System.out.println("价格: " + c.getCost() + "; 加料: " + c.getIngredients());
    }

    public static void main(String[] args) {
        MilkTea c = new SimpleMilkTea();
        printInfo(c); // 价格: 10.0; 加料: MilkTea
        
        c = new WithPearl(new SimpleMilkTea());
        printInfo(c); // 价格: 12.0; 加料: MilkTea, 加珍珠
        
        c = new WithCoconut(new WithPearl(new SimpleMilkTea()));
        printInfo(c); // 价格: 13.0; 加料: MilkTea, 加珍珠, 加椰果
    }
}

```

未来如果需要新增一种小料，只需要新写一个装饰器类，并且可以和之前的小料随意搭配。

```js
// 添加冰淇淋
class WithCream extends MilkTeaDecorator {
    public WithCream(MilkTea c) {
        super(c);
    }

    @Override
    public double getCost() {
        return super.getCost() + 5;
    }

    @Override
    public String getIngredients() {
        return super.getIngredients() + ", 加冰淇淋";
    }
}

public class Main {
    public static void printInfo(MilkTea c) {
        System.out.println("价格: " + c.getCost() + "; 加料: " + c.getIngredients());
    }

    public static void main(String[] args) {
        c = new WithCoconut(new WithCream(new WithPearl(new SimpleMilkTea())));
        printInfo(c); // 价格: 18.0; 加料: MilkTea, 加珍珠, 加冰淇淋, 加椰果
    }
}

```

让我们用 `js` 改写一下，达到同样的效果。

```js
const SimpleMilkTea = () => {
    return {
        getCost() {
            return 10;
        },

        getIngredients() {
            return "MilkTea";
        },
    };
};

// 加珍珠
const WithPearl = (milkTea) => {
    return {
        getCost() {
            return milkTea.getCost() + 2;
        },

        getIngredients() {
            return milkTea.getIngredients() + ", 加珍珠";
        },
    };
};

// 加椰果
const WithCoconut = (milkTea) => {
    return {
        getCost() {
            return milkTea.getCost() + 1;
        },

        getIngredients() {
            return milkTea.getIngredients() + ", 加椰果";
        },
    };
};

// 加冰淇淋
const WithCream = (milkTea) => {
    return {
        getCost() {
            return milkTea.getCost() + 5;
        },

        getIngredients() {
            return milkTea.getIngredients() + ", 加冰淇淋";
        },
    };
};

// test
const printInfo = (c) => {
    console.log(
        "价格: " + c.getCost() + "; 加料: " + c.getIngredients()
    );
};

let c = SimpleMilkTea();
printInfo(c); // 价格: 10; 加料: MilkTea

c = WithPearl(SimpleMilkTea());
printInfo(c); // 价格: 12; 加料: MilkTea, 加珍珠

c = WithCoconut(WithPearl(SimpleMilkTea()));
printInfo(c); // 价格: 13; 加料: MilkTea, 加珍珠, 加椰果

c = WithCoconut(WithCream(WithPearl(SimpleMilkTea())));
printInfo(c); // 价格: 18; 加料: MilkTea, 加珍珠, 加冰淇淋, 加椰果


```

没有再定义类和接口，`js` 中用函数直接表示。

原始的 `SimpleMilkTea` 方法返回一个奶茶对象，然后又定义了三个装饰函数，传入一个奶茶对象，返回一个装饰后的对象。

## 代码实现

回到文章最开头的场景，我们需要为每个页面加载的时候上报一些自定义数据。其实我们只需要引入一个装饰函数，将传入的 `option` 进行装饰返回即可。

```js
const Base = (option) => {
  const { onLoad ...rest } = option;
  return {
    ...rest,
    // 重写 onLoad 方法
    onLoad(...args) { 
      // 增加路由字段
      this.reportData(); // 上报数据

      // onLoad
      if (typeof onLoad === 'function') {
        onLoad.call(this, ...args);
      }
    }
    reportData() {
      // 做一些事情
    }
}

```

然后回到原始页面增加 `Base` 的调用即可。

```js
Page(Base({
  data: { // 参与页面渲染的数据
    logs: []
  },
  onLoad: function () {
    // 页面渲染后 执行
  }
})

```

同理，利用装饰器模式我们也可以对其它生命周期统一插入我们需要做的事情，而不需要业务方自己再写一遍。

在大团队的话，每个业务方可能都需要在小程序生命周期做一些事情，此时只需要利用装饰器模式，编写一个装饰函数，然后在业务代码中调用即可。

最终的业务代码可能会装饰很多层，最终才传给小程序 `Page` 函数。

```js
Page(Base(Log(Ce({
  data: { // 参与页面渲染的数据
    logs: []
  },
  onLoad: function () {
    // 页面渲染后 执行
  }
})

```

## 易混设计模式

如果之前看过 代理模式
但还是有很大的不同点：

代理模式中，我们是直接将原对象封装到代理对象之中，对于业务方并不关系原始对象，直接使用代理对象即可。

装饰器模式中，我们只提供了装饰函数，输入原始对象，输出增强对象。输出的增强对象，还可以接着传入到新的装饰器函数中继续增强。对于业务方，可以随意组合装饰函数，但得有一个最最开始的原始对象。

再具体点：

代理模式的话，对象之间的依赖关系已经写死了，原始对象 `A`，新增代理对象 `A1`， `A1` 的基础上再新增代理对象 `A2`。如果我们不想要 `A1` 新增的功能了，我们并不能直接使用 `A2` ，因为 `A2` 已经包含了 `A1` 的功能，我们只能在 `A` 的基础上再新写一个代理对象 `A3`。

而装饰器模式，我们只提供装饰函数 `A1`，装饰函数 `A2`，然后对原始对象进行装饰 `A2(A1(A))`。如果不想要 `A1` 新增的功能，只需要把 `A1` 这个装饰器去掉，调用 `A2(A)` 即可。

所以使用代理模式还是使用装饰器模式，取决于我们是要把所有功能包装后最终产出一个对象给业务方使用，还是提供许多功能，让业务方自由组合。
