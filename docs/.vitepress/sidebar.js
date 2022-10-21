const interviewQuestions = require("./routers/interview-questions")
const utils = require("./routers/utils")
const rule = require("./routers/rule")
const hooks = require("./routers/hooks")
const chrome = require("./routers/chrome")

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
    text: 'chrome',
    items: chrome
  },
]