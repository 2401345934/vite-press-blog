---
createTime: 2022/11/08
tag: '工程化,cicd'
---
# gitlab CiCd

## GitLabCI

* 轻量级，不需要复杂的安装手段。
* 配置简单，与gitlab可直接适配。
* 实时构建日志十分清晰，UI交互体验很好
* 使用 YAMIL，进行配置，任何人都可以很方便的使用。
* 没有统一的管理界面，无法统筹管理所有项目                            ·
* 配置依赖于代码仓库，耦合度没有Jenkins低

## CI  持续集成

* 合并开发人员正在开发编写的所有代码一种做法
* 一天之内多次合并提交代码
* 从存储库货生产环境中进行构建和自动化测试 保证没有问题 和低级错误

## CD 连续交付

* 通常可以自动将更改自动推送到 发布系统 随时软件发布到生产环境
* 持续部署 会更进一步  并自动将更改推送到生产中。

会在开始的  

```yaml
stages：
  // 在此处定义阶段  就是 每次我们打tag 和打版本都会显示几个圆圈
```

```yaml

stages:  # 定义了两个阶段  一个 build  一个 test

* build
* test

build-code-job:
  stage: build  # 第一个阶段的第一个事情 开始build
  script:
    - echo "Check the ruby version, then build some Ruby project files:"
    - ruby -v
    - rake

test-code-job1:
  stage: test  # 第二个阶段的第一个事情 开始test
  script:
    - echo "If the files are built successfully, test some files with one command:"
    - rake test1

test-code-job2:
  stage: test  # 第二个阶段的第二个事情 开始test
  script:
    - echo "If the files are built successfully, test other files with a different command:"
    - rake test2
```

### 大致可以分为几个阶段

* 第一阶段  编译阶段
  * 一般都会先build 开始编译
  * 代码测试 单元测试
  * 可以在本阶段进行 打包 在第二阶段直接用 但是要通过缓存  cache
* 第二阶段  打包
  * jar 报
* 第三阶段  发布

每个阶段之间的数据是可以放到缓存里面共享的  但是每个事情之间 的数据是不能共享的
阶段与阶段之前 一定 是 串行的 （前端叫做同步）
每个阶段的事情是 并行的  （前端叫做异步）
