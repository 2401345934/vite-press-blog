---
createTime: 2022/11/13
tag: '场景题'
---
# 实现拖拽

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=<device-width>, initial-scale=1.0">
    <title>Document</title>
</head>
<style>
    #aa {
        width: 100px;
        height: 100px;
        background-color: aqua;
        position: absolute;
    }
</style>

<body>
    <div id='aa'>
        dasdsadas
    </div>

    <script>
        let down=false;
        let mouseX=0;
        let mouseY=0;
        let divX=0;
        let divY=0;
        let node = document.getElementById('aa');
        node.onmousedown = function (e) {
            console.log(e);
            mouseX=e.clientX;
            mouseY=e.clientY;
            divX=node.offsetLeft;
            divY=node.offsetTop;
            node.style.cursor='move';
            down=true;
        }
        window.onmousemove=function(e){
            if(down==false)
                return ;
            var nx=e.clientX-mouseX;
            var ny=e.clientY-mouseY;
            node.style.left=divX+nx+'px';
            node.style.top=divY+ny+'px';
        }
        node.onmouseup=function(e){
            down=false;
            node.style.cursor='default';
        }
    </script>
</body>

</html>
```
