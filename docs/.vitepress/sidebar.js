const interviewQuestions = require("./routers/interview-questions")
const utils = require("./routers/utils")
const source = require("./routers/source")
const http = require("./routers/http")
const softPower = require("./routers/soft-power")
const tool = require("./routers/tool")
const dataStructuresAlgorithms = require("./routers/data-structures-algorithms")
const myViteComponent = require("./routers/my-vite-component")

module.exports ={
    '/interview-questions/': interviewQuestions,
    '/source/':  source,
    '/utils/':  utils,
    '/data-structures-algorithms/':  dataStructuresAlgorithms,
    '/http/':  http,
    '/soft-power/':  softPower,
    '/tool/':  tool,
    '/my-vite-component/':  myViteComponent,
}