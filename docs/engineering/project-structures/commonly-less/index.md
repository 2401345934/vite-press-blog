---
createTime: 2022/11/11
tag: '项目搭建'
---

# 常用 less mixins

```less
//表单元素垂直居中对齐（也可设置顶对齐，底对齐）
.form-element-v-align(@alignment: middle){
  display: inline-block;
  vertical-align: @alignment;
  *vertical-align: auto;
  *display: inline;
  zoom: 1;
}

//水平居中
.horizontal-center(){
  margin-left: auto;
  margin-right: auto;
}

//绝对居中(相对于固定宽高的容器)
.absolute-center(@width, @height){
  position: absolute;
  left: 50%;
  top: 50%;
  margin-left: -(@width / 2);
  margin-top: -(@height / 2);
  width: @width;
  height: @height;
}

//浮动（主要针对PC端了...）
.float(@side: left){
  float: @side;
  _display: inline;
}

//清除浮动(其实很多时候，clear-fix也被提取为单类使用)
.clear-fix(){
  *zoom: 1;
  &:before,
  &:after {
    content: "";
    display: table;
    clear: both;
    overflow: hidden;
  }
}

//截取文本(仅针对单行)
.text-single-line-ellipsis(@height, @line-height, @ auto){
  width: @width;
  height: @height;
  line-height: @line-height;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

//设置透明度
.opacity(@val){
  filter: alpha(opacity=@val);
  opacity: @val / 100;
}

//不可用状态
.disabled(@bgColor:#e6e6e6, @textColor:#ababab){
  background-color: @bgColor !important;
  color: @textColor !important;
  cursor: not-allowed !important;
}

//最小高度（主要针对PC端了...）
.min-height(@height){
  min-height: @height;
  height: auto !important;
  _height: @height;
}
```
