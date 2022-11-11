---
createTime: 2022/11/11
tag: '项目搭建'
---

# 常用scss mixins

```scss
/显示多行，省略号 
@mixin ellipsis($row:1) {
    /* 显示两行，省略号 */
    text-overflow: -o-ellipsis-lastline;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: $row;
    line-clamp: $row;
    -webkit-box-orient: vertical;
}

//单行，省略号 
@mixin uniline {
 overflow: hidden;
 text-overflow:ellipsis;
 white-space: nowrap;
}

//flex样式
@mixin flex($msg: ()) {
    display: flex;
    @if ($msg) {
        @each $key,
        $value in $msg {
            @if ($key == "i") {
                @if ($value) {
                    align-items: $value;
                }
                @else{
                    align-items: center;
                }
            }
            @else if($key == "c") {
                @if ($value) {
                    justify-content: $value;
                }
                @else{
                    justify-content: center;
                }
            }
   @else if($key == "d") {
                @if ($value) {
                    flex-direction: $value;
                }
                @else{
                    flex-direction: column;
                }
   }
            @else if($key == "w") {
                @if ($value) {
                    flex-wrap:$value;
                }
                @else{
                    flex-wrap:wrap ;
                }
   }
        }
    }
}

//iPhone X、iPhone XR、iPhone XS Max、iPhone 11、iPhone 11 Pro、iPhone 11 Pro Max适配 
@mixin iphoneAdaptive ($name:'p',$n:''){
 @if($name == "p"){
  /* 可以通过增加padding-bottom来适配 */
  padding-bottom: calc(#{$n} +  constant(safe-area-inset-bottom)); /*兼容 IOS<11.2*/
  padding-bottom: calc(#{$n} +  env(safe-area-inset-bottom)); /*兼容 IOS>11.2*/
 }
 @else if($name == "m"){
  /* 可以通过margin-bottom来适配 */
  margin-bottom: calc(#{$n} +  constant(safe-area-inset-bottom));
  margin-bottom: calc(#{$n} +  env(safe-area-inset-bottom));
 }
 @else if($name == "h"){
  /* 或者改变高度*/
  height: calc(#{$n} +  constant(safe-area-inset-bottom));
  height: calc(#{$n} +  env(safe-area-inset-bottom));
 }
}

// 宽高
@mixin wh($w, $h: $w) {
    width: $w;
    height: $h;
    min-width: $w;
}

// 图片background: url()
@mixin bgUrl($name, $w, $h:$w) {
    width: $w;
    height: $h;
    background: url("@/static/"+$name) no-repeat;
    background-size: $w, $h;
}

// 老生常谈的 1px 问题
// 下边框
@mixin borderTopBot($borderColor, $type: bottom) {
    position: relative;
    &::before {
        content: '';
        display: block;
        position: absolute;
        left: 0;
        right: 0;

        @if ($type=="top") {
            top: 0;
        }

        @if ($type=="bottom") {
            bottom: 0;
        }

        width: 100%;

        @if ($type=="top") {
            border-top: 1px solid $borderColor;
        }

        @if ($type=="bottom") {
            border-bottom: 1px solid $borderColor;
        }

        transform: scaleY(0.5);
    }

 //图标样式
 @mixin iconStyle() {
     @include pseudoClassContent;
     background-repeat: no-repeat;
     background-size: 100%;
     background-position: center;
 }
 
 //伪类展示内容
 @mixin pseudoClassContent($text: "") {
     content: $text;
 }

```
