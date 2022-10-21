const interviewQuestions = require("./routers/interview-questions")
const utils = require("./routers/utils")
const rule = require("./routers/rule")
const hooks = require("./routers/hooks")
const chrome = require("./routers/chrome")
const browser = require("./routers/browser")
const dataStructuresAlgorithms = require("./routers/data-structures-algorithms")

module.exports =[
  {
    text: '面试题',
    items:interviewQuestions
  },
  {
    text: 'utils',
    items: utils
  },
  {
    text: 'rule',
    items: rule
  },
  {
    text: 'hooks',
    items: hooks
  },
  {
    text: '数据结构与算法',
    items: dataStructuresAlgorithms
  },
  {
    text: '浏览器',
    items: browser
  },
  {
    text: 'chrome',
    items: chrome
  },
]