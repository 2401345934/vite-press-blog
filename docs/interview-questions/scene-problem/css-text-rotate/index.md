---
createTime: 2022/11/16
tag: '场景题,css'
---
# 文本环绕球体

## 实现

```html
<!DOCTYPE html>
<html>

<head>
  <meta charset="utf-8">
  <title>rotate text around the ball</title>
</head>

<body>
  <style media="screen">
    * {
      margin: 0;
      padding: 0;
    }

    .wrapper {
      width: 400px;
      height: 400px;
      margin: 200px;
      perspective: 800px;
      perspective-origin: 50% 50%;
      position: relative;
    }

    .stage {
      transform-style: preserve-3d;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate3d(-50%, -50%, 0);
    }

    .text {
      width: 100px;
      height: 50px;
      line-height: 50px;
      text-align: center;
      white-space: nowrap;
      transform: rotateY(100deg) translateZ(100px);
      backface-visibility: hidden
    }

    .ball {
      width: 200px;
      height: 200px;
      border-radius: 50%;
      background-color: #ccc;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate3d(-50%, -50%, 0);
      box-shadow: 0px 55px 45px -38px rgba(0, 0, 0, .3);
    }

    .ball::before {
      content: "";
      position: absolute;
      top: 1%;
      left: 5%;
      width: 90%;
      height: 90%;
      border-radius: 50%;
      background: -webkit-radial-gradient(50% 0px, circle, #ffffff, rgba(255, 255, 255, 0) 58%);
      z-index: 2;
    }

    @keyframes rotate {
      from {
        transform: rotateY(0deg) translateZ(100px);
      }

      to {
        transform: rotateY(360deg) translateZ(100px);
      }
    }
  </style>
  <div class="wrapper">
    <div class="ball"></div>
    <div class="stage">
      <div class="text">
        这里是文字
      </div>
    </div>
  </div>
</body>

</html>
```
