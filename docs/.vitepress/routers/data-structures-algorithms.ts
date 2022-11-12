import RouterType from "./types.type"

const Router: RouterType = [
  {
    text: "算法",
    items: [
      {
        text: '入门',
        link: '/data-structures-algorithms/introduction/',
      },
      {
        text: '时间复杂度',
        link: '/data-structures-algorithms/time-complexity/',
      },
      {
        text: '空间复杂度',
        link: '/data-structures-algorithms/space-complexity/',
      },
      {
        text: '算法题',
        items: [
          {
            text: '排序',
            link: '/data-structures-algorithms/sort/',
          },
          {
            text: '数组',
            link: '/data-structures-algorithms/array/',
          },
          {
            text: '字符串',
            link: '/data-structures-algorithms/string/',
          },
          {
            text: '树',
            link: '/data-structures-algorithms/tree/',
          },
          {
            text: '二叉树',
            link: '/data-structures-algorithms/binary-tree/',
          },
        ]
      },
    ]
  }
]
export default Router