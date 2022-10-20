const interviewQuestions = require("./routers/interview-questions")
const utils = require("./routers/utils")
const rule = require("./routers/rule")
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
    text: 'chrome',
    items: chrome
  },
]