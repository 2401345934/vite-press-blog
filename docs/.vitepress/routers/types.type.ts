type ChildrenType = {
  text: string,
  link?: string,
  items?: Array<ChildrenType>
}

type RouterType = Array<ChildrenType>

export default RouterType