import interviewQuestions from "../routers/interview-questions"
import utils from "../routers/utils"
import source from "../routers/source"
import basicQuality from "../routers/basic-quality"
import tool from "../routers/tool"
import engineering from "../routers/engineering"
import dataStructuresAlgorithms from "../routers/data-structures-algorithms"
import myViteComponent from "../routers/my-vite-component"

function addCollapsible(data){
  data.forEach(item => {
    if(item?.items?.length) {
      item.collapsible = true
      item.collapsed = true
      if(Array.isArray(item.items) && item.items.length) {
        addCollapsible(item.items)
      }
    }
  })

  return  data
}

export default {
  '/interview-questions/': addCollapsible(interviewQuestions),
  '/source/': addCollapsible(source),
  '/utils/': addCollapsible(utils),
  '/data-structures-algorithms/': addCollapsible(dataStructuresAlgorithms),
  '/basic-quality/': addCollapsible(basicQuality),
  '/tool/': addCollapsible(tool),
  '/engineering/': addCollapsible(engineering),
  '/my-vite-component/': addCollapsible(myViteComponent),
}