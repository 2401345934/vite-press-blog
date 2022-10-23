const interviewQuestions = require("./routers/interview-questions")
const utils = require("./routers/utils")
const chrome = require("./routers/chrome")
const browser = require("./routers/browser")
const source = require("./routers/source")
const http = require("./routers/http")
const softPower = require("./routers/soft-power")
const dataStructuresAlgorithms = require("./routers/data-structures-algorithms")
module.exports ={
    '/interview-questions/': interviewQuestions,
    '/source/':  source,
    '/utils/':  utils,
    '/browser/':  [...browser,...chrome],
    '/data-structures-algorithms/':  dataStructuresAlgorithms,
    '/http/':  http,
    '/soft-power/':  softPower,
}