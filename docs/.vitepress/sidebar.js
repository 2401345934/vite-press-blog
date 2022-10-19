const interviewQuestions = require("./routers/interview-questions")
const utils = require("./routers/utils")

module.exports =[
  {
    text: '面试题',
    items:interviewQuestions
  },
  {
    text: 'utils',
    items: utils
  },
]