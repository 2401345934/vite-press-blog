import interviewQuestions from "../routers/interview-questions"
import utils from "../routers/utils"
import source from "../routers/source"
import basicQuality from "../routers/basic-quality"
import tool from "../routers/tool"
import engineering from "../routers/engineering"
import dataStructuresAlgorithms from "../routers/data-structures-algorithms"

function addCollapsible(data: any) {
  data.forEach(item => {
    if (item?.items?.length) {
      item.collapsible = true
      item.collapsed = true
      if (Array.isArray(item.items) && item.items.length) {
        addCollapsible(item.items)
      }
    }
  })

  return data
}


const resultList: {
  [key: string]: any
} = {
  '/interview-questions/': addCollapsible(interviewQuestions),
  '/source/': addCollapsible(source),
  '/utils/': addCollapsible(utils),
  '/data-structures-algorithms/': addCollapsible(dataStructuresAlgorithms),
  '/basic-quality/': addCollapsible(basicQuality),
  '/tool/': addCollapsible(tool),
  '/engineering/': addCollapsible(engineering),
}
export default resultList