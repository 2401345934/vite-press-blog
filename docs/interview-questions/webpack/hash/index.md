---
createTime: 2022/10/09
tag: 'webpack'
---
# webpack中的三种hash分别是

## hash：全局hash

```js
entry: {
    main: './src/main.js',
    console: './src/console.js'
  },
output: {
    path: path.resolve(__dirname, './dist'),
    // 修改为 hash
    filename: 'js/[name].[hash].js',
    clean: true
  },
plugins: [
      new MiniCssExtractPlugin({
      // 修改为 hash
      filename: 'styles/[name].[hash].css'
    })
]

```

结论：牵一发动全身，只改了一个文件  会导致打包后所有文件的hash值都改变。所以当打包名称设置为hash时，整个项目文件是一致的，修改其中一个会导致所有跟着一起改。

## chunkhash：分组hash

```js
entry: {
    main: './src/main.js',
    console: './src/console.js'
  },
output: {
    path: path.resolve(__dirname, './dist'),
    // 修改为 chunkhash
    filename: 'js/[name].[chunkhash].js',
    clean: true
  },
plugins: [
      new MiniCssExtractPlugin({
      // 修改为 chunkhash
      filename: 'styles/[name].[chunkhash].css'
    })
]

```

结论：当规则为chunkhash时，打包后的hash值会根据入口文件的不用而不一样，当某个入口文件修改后重新打包，会导致本入口文件关联的所有文件的hash值都修改，但是不会影响到其他入口文件的hash值

## contenthash：内容hash

```js
entry: {
    main: './src/main.js',
    console: './src/console.js'
  },
output: {
    path: path.resolve(__dirname, './dist'),
    // 修改为 contenthash
    filename: 'js/[name].[contenthash].js',
    clean: true
  },
plugins: [
      new MiniCssExtractPlugin({
      // 修改为 contenthash
      filename: 'styles/[name].[contenthash].css'
    })
]

```

结论：当规则为 contenthash 时，每个文件的hash值都是根据自身内容而生成，当某个文件内容修改时，打包后只会修改其本身的hash值，不会影响其他文件的hash值

## file-loader 配置的 hash 是上面说的哪一种 hash

contenthash
