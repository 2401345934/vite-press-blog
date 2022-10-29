const interviewQuestions = require("./routers/interview-questions")
const utils = require("./routers/utils")
const source = require("./routers/source")
const basicQuality = require("./routers/basic-quality")
const tool = require("./routers/tool")
const engineering = require("./routers/engineering")
const dataStructuresAlgorithms = require("./routers/data-structures-algorithms")
const myViteComponent = require("./routers/my-vite-component")

module.exports ={
    '/interview-questions/': interviewQuestions,
    '/source/':  source,
    '/utils/':  utils,
    '/data-structures-algorithms/':  dataStructuresAlgorithms,
    '/basic-quality/':  basicQuality,
    '/tool/':  tool,
    '/engineering/':engineering,
    '/my-vite-component/':  myViteComponent,
}