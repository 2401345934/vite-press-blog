---
createTime: 2022/10/25
tag: 'chrome'
---
# 浏览器代码片段

## 使用方式

* 打开开发者工具
* command + p 打开搜索
* ! + 代码片段的名字 选择某个代码片段

## 添加代码片段

* 打开开发者工具
* 选择 source 选项卡 或者 源代码选项卡
* 选择 Snippets 或者代码段
* 新建代码段 取个名字

## 分享我自己常用的代码片段

### colors

获取页面所有的颜色

```js
// allcolors.js
// https://github.com/bgrins/devtools-snippets
// Print out CSS colors used in elements on the page.

(function () {
  // Should include colors from elements that have a border color but have a zero width?
  var includeBorderColorsWithZeroWidth = false;

  var allColors = {};
  var props = ["background-color", "color", "border-top-color", "border-right-color", "border-bottom-color", "border-left-color"];
  var skipColors = {
    "rgb(0, 0, 0)": 1,
    "rgba(0, 0, 0, 0)": 1,
    "rgb(255, 255, 255)": 1
  };

  [].forEach.call(document.querySelectorAll("*"), function (node) {
    var nodeColors = {};
    props.forEach(function (prop) {
      var color = window.getComputedStyle(node, null).getPropertyValue(prop),
        thisIsABorderProperty = (prop.indexOf("border") != -1),
        notBorderZero = thisIsABorderProperty ? window.getComputedStyle(node, null).getPropertyValue(prop.replace("color", "width")) !== "0px" : true,
        colorConditionsMet;

      if (includeBorderColorsWithZeroWidth) {
        colorConditionsMet = color && !skipColors[color];
      } else {
        colorConditionsMet = color && !skipColors[color] && notBorderZero;
      }

      if (colorConditionsMet) {
        if (!allColors[color]) {
          allColors[color] = {
            count: 0,
            nodes: []
          };
        }

        if (!nodeColors[color]) {
          allColors[color].count++;
          allColors[color].nodes.push(node);
        }

        nodeColors[color] = true;
      }
    });
  });

  function rgbTextToRgbArray(rgbText) {
    return rgbText.replace(/\s/g, "").match(/\d+,\d+,\d+/)[0].split(",").map(function(num) {
      return parseInt(num, 10);
    });
  }

  function componentToHex(c) {
    var hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
  }

  function rgbToHex(rgbArray) {
    var r = rgbArray[0],
      g = rgbArray[1],
      b = rgbArray[2];
    return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
  }

  var allColorsSorted = [];
  for (var i in allColors) {
    var rgbArray = rgbTextToRgbArray(i);
    var hexValue = rgbToHex(rgbArray);

    allColorsSorted.push({
      key: i,
      value: allColors[i],
      hexValue: hexValue
    });
  }

  allColorsSorted = allColorsSorted.sort(function (a, b) {
    return b.value.count - a.value.count;
  });

  var nameStyle = "font-weight:normal;";
  var countStyle = "font-weight:bold;";
  function colorStyle(color) {
    return "background:" + color + ";color:" + color + ";border:1px solid #333;";
  };

  console.group("Total colors used in elements on the page: " + window.location.href + " are " + allColorsSorted.length);
  allColorsSorted.forEach(function (c) {
    console.groupCollapsed("%c    %c " + c.key + " " + c.hexValue + " %c(" + c.value.count + " times)",
      colorStyle(c.key), nameStyle, countStyle);
    c.value.nodes.forEach(function (node) {
      console.log(node);
    });
    console.groupEnd();
  });
  console.groupEnd("All colors used in elements on the page");

})();
```

### cookies

获取页面所有的 cookies

```js
// viewcookies.js
// https://github.com/bgrins/devtools-snippets
// Shows all cookies stored in document.cookies in a console.table

(function() {
  'use strict';

  window.viewCookies = function() {
    if (document.cookie) {
      const cookies = document.cookie
        .split(/; ?/)
        .map(s => {
          const [ , key, value ] = s.match(/^(.*?)=(.*)$/);
          return {
            key,
            value: decodeURIComponent(value)
          };
        });

      console.table(cookies);
    }
    else {
      console.warn('document.cookie is empty!');
    }
  };
})();

window.viewCookies();
```

### cssprettifier

css 格式化

```js
// cssprettifier.js
// https://github.com/bgrins/devtools-snippets
// Unminify and prettify a CSS file.

/*
 * cssprettifier-bookmarklet
 * Copyright (c) 2013 Addy Osmani, Sindre Sorhus
 * CSSBeautify (c) Sencha, Ariya Hidayat
 * Prism (c) Lea Verou
 * Licensed under the MIT license.
 */
 /*globals document:true*/
(function () {
  'use strict';

  if (document.body.childNodes.length !== 1) {
       console.log("CSS Prettify: This page doesn't appear to be a stylesheet.  Make sure you run this on a css file");
       return;
  }

  // cssbeautify
  (function(){"use strict";function a(a,b){function s(a){return" "===a||"\n"===a||"   "===a||"\r"===a||"\f"===a}function t(a){return"'"===a||'"'===a}function u(a){return h>="a"&&"z">=h||h>="A"&&"Z">=h||h>="0"&&"9">=h||"-_*.:#".indexOf(a)>=0}function v(){var a;for(a=m;a>0;a-=1)g+=c.indent}function w(){g=r(g),p?g+=" {":(g+="\n",v(),g+="{"),"\n"!==i&&(g+="\n"),m+=1}function x(){var a;m-=1,g=r(g),q&&(a=g.charAt(g.length-1),";"!==a&&"{"!==a&&(g+=";")),g+="\n",v(),g+="}",f.push(g),g=""}var c,f,h,i,j,k,l,m,n,o,r,d=0,e=a.length,g="",p=!0,q=!1;for(c=arguments.length>1?b:{},c.indent===void 0&&(c.indent="    "),"string"==typeof c.openbrace&&(p="end-of-line"===c.openbrace),"boolean"==typeof c.autosemicolon&&(q=c.autosemicolon),r=String.prototype.trimRight?function(a){return a.trimRight()}:function(a){return a.replace(/\s+$/,"")},l={Start:0,AtRule:1,Block:2,Selector:3,Ruleset:4,Property:5,Separator:6,Expression:7,URL:8},m=0,k=l.Start,o=!1,f=[],a=a.replace(/\r\n/g,"\n");e>d;)if(h=a.charAt(d),i=a.charAt(d+1),d+=1,t(n))g+=h,h===n&&(n=null),"\\"===h&&i===n&&(g+=i,d+=1);else if(t(h))g+=h,n=h;else if(o)g+=h,"*"===h&&"/"===i&&(o=!1,g+=i,d+=1);else if("/"!==h||"*"!==i){if(k===l.Start){if(0===f.length&&s(h)&&0===g.length)continue;if(" ">=h||h.charCodeAt(0)>=128){k=l.Start,g+=h;continue}if(u(h)||"["===h||"@"===h){if(j=r(g),0===j.length)f.length>0&&(g="\n\n");else if("}"===j.charAt(j.length-1)||";"===j.charAt(j.length-1))g=j+"\n\n";else for(;;){if(i=g.charAt(g.length-1)," "!==i&&9!==i.charCodeAt(0))break;g=g.substr(0,g.length-1)}g+=h,k="@"===h?l.AtRule:l.Selector;continue}}if(k!==l.AtRule)if(k!==l.Block)if(k!==l.Selector)if(k!==l.Ruleset)if(k!==l.Property)if(k!==l.Separator)if(k!==l.Expression)k===l.URL&&")"===h&&g.charAt("\\"!==g.length-1)?(g+=h,k=l.Expression):g+=h;else{if("}"===h){x(),k=l.Start,m>0&&(k=l.Block);continue}if(";"===h){g=r(g),g+=";\n",k=l.Ruleset;continue}if(g+=h,"("===h&&"l"===g.charAt(g.length-2)&&"r"===g.charAt(g.length-3)&&"u"===g.charAt(g.length-4)){k=l.URL;continue}}else{if(!s(h)){g+=h,k=l.Expression;continue}t(i)&&(k=l.Expression)}else{if(":"===h){g=r(g),g+=": ",k=l.Expression,s(i)&&(k=l.Separator);continue}if("}"===h){x(),k=l.Start,m>0&&(k=l.Block);continue}g+=h}else{if("}"===h){x(),k=l.Start,m>0&&(k=l.Block);continue}if("\n"===h){g=r(g),g+="\n";continue}if(!s(h)){g=r(g),g+="\n",v(),g+=h,k=l.Property;continue}g+=h}else{if("{"===h){w(),k=l.Ruleset;continue}if("}"===h){x(),k=l.Start;continue}g+=h}else{if(u(h)){if(j=r(g),0===j.length)f.length>0&&(g="\n\n");else if("}"===j.charAt(j.length-1))g=j+"\n\n";else for(;;){if(i=g.charAt(g.length-1)," "!==i&&9!==i.charCodeAt(0))break;g=g.substr(0,g.length-1)}v(),g+=h,k=l.Selector;continue}if("}"===h){x(),k=l.Start;continue}g+=h}else{if(";"===h){g+=h,k=l.Start;continue}if("{"===h){j=r(g),w(),k="@font-face"===j?l.Ruleset:l.Block;continue}g+=h}}else o=!0,g+=h,g+=i,d+=1;return g=f.join("")+g}"undefined"!=typeof exports?module.exports=exports=a:"object"==typeof window&&(window.cssbeautify=a)})();
  // prism
  (function(){var e=/\blang(?:uage)?-(?!\*)(\w+)\b/i,t=self.Prism={util:{type:function(e){return Object.prototype.toString.call(e).match(/\[object (\w+)\]/)[1]},clone:function(e){var n=t.util.type(e);switch(n){case"Object":var r={};for(var i in e)e.hasOwnProperty(i)&&(r[i]=t.util.clone(e[i]));return r;case"Array":return e.slice()}return e}},languages:{extend:function(e,n){var r=t.util.clone(t.languages[e]);for(var i in n)r[i]=n[i];return r},insertBefore:function(e,n,r,i){i=i||t.languages;var s=i[e],o={};for(var u in s)if(s.hasOwnProperty(u)){if(u==n)for(var a in r)r.hasOwnProperty(a)&&(o[a]=r[a]);o[u]=s[u]}return i[e]=o},DFS:function(e,n){for(var r in e){n.call(e,r,e[r]);t.util.type(e)==="Object"&&t.languages.DFS(e[r],n)}}},highlightAll:function(e,n){var r=document.querySelectorAll('code[class*="language-"], [class*="language-"] code, code[class*="lang-"], [class*="lang-"] code');for(var i=0,s;s=r[i++];)t.highlightElement(s,e===!0,n)},highlightElement:function(r,i,s){var o,u,a=r;while(a&&!e.test(a.className))a=a.parentNode;if(a){o=(a.className.match(e)||[,""])[1];u=t.languages[o]}if(!u)return;r.className=r.className.replace(e,"").replace(/\s+/g," ")+" language-"+o;a=r.parentNode;/pre/i.test(a.nodeName)&&(a.className=a.className.replace(e,"").replace(/\s+/g," ")+" language-"+o);var f=r.textContent;if(!f)return;f=f.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/\u00a0/g," ");var l={element:r,language:o,grammar:u,code:f};t.hooks.run("before-highlight",l);if(i&&self.Worker){var c=new Worker(t.filename);c.onmessage=function(e){l.highlightedCode=n.stringify(JSON.parse(e.data));l.element.innerHTML=l.highlightedCode;s&&s.call(l.element);t.hooks.run("after-highlight",l)};c.postMessage(JSON.stringify({language:l.language,code:l.code}))}else{l.highlightedCode=t.highlight(l.code,l.grammar);l.element.innerHTML=l.highlightedCode;s&&s.call(r);t.hooks.run("after-highlight",l)}},highlight:function(e,r){return n.stringify(t.tokenize(e,r))},tokenize:function(e,n){var r=t.Token,i=[e],s=n.rest;if(s){for(var o in s)n[o]=s[o];delete n.rest}e:for(var o in n){if(!n.hasOwnProperty(o)||!n[o])continue;var u=n[o],a=u.inside,f=!!u.lookbehind||0;u=u.pattern||u;for(var l=0;l<i.length;l++){var c=i[l];if(i.length>e.length)break e;if(c instanceof r)continue;u.lastIndex=0;var h=u.exec(c);if(h){f&&(f=h[1].length);var p=h.index-1+f,h=h[0].slice(f),d=h.length,v=p+d,m=c.slice(0,p+1),g=c.slice(v+1),y=[l,1];m&&y.push(m);var b=new r(o,a?t.tokenize(h,a):h);y.push(b);g&&y.push(g);Array.prototype.splice.apply(i,y)}}}return i},hooks:{all:{},add:function(e,n){var r=t.hooks.all;r[e]=r[e]||[];r[e].push(n)},run:function(e,n){var r=t.hooks.all[e];if(!r||!r.length)return;for(var i=0,s;s=r[i++];)s(n)}}},n=t.Token=function(e,t){this.type=e;this.content=t};n.stringify=function(e){if(typeof e=="string")return e;if(Object.prototype.toString.call(e)=="[object Array]")return e.map(n.stringify).join("");var r={type:e.type,content:n.stringify(e.content),tag:"span",classes:["token",e.type],attributes:{}};r.type=="comment"&&(r.attributes.spellcheck="true");t.hooks.run("wrap",r);var i="";for(var s in r.attributes)i+=s+'="'+(r.attributes[s]||"")+'"';return"<"+r.tag+' class="'+r.classes.join(" ")+'" '+i+">"+r.content+"</"+r.tag+">"};if(!self.document){self.addEventListener("message",function(e){var n=JSON.parse(e.data),r=n.language,i=n.code;self.postMessage(JSON.stringify(t.tokenize(i,t.languages[r])));self.close()},!1);return}var r=document.getElementsByTagName("script");r=r[r.length-1];if(r){t.filename=r.src;document.addEventListener&&!r.hasAttribute("data-manual")&&document.addEventListener("DOMContentLoaded",t.highlightAll)}})();;
  Prism.languages.css={comment:/\/\*[\w\W]*?\*\//g,atrule:/@[\w-]+?(\s+[^;{]+)?(?=\s*{|\s*;)/gi,url:/url\((["']?).*?\1\)/gi,selector:/[^\{\}\s][^\{\}]*(?=\s*\{)/g,property:/(\b|\B)[a-z-]+(?=\s*:)/ig,string:/("|')(\\?.)*?\1/g,important:/\B!important\b/gi,ignore:/&(lt|gt|amp);/gi,punctuation:/[\{\};:]/g};Prism.languages.markup&&Prism.languages.insertBefore("markup","tag",{style:{pattern:/(&lt;|<)style[\w\W]*?(>|&gt;)[\w\W]*?(&lt;|<)\/style(>|&gt;)/ig,inside:{tag:{pattern:/(&lt;|<)style[\w\W]*?(>|&gt;)|(&lt;|<)\/style(>|&gt;)/ig,inside:Prism.languages.markup.tag.inside},rest:Prism.languages.css}}});

  var prismStyle = document.createElement('style');
  var beautified = cssbeautify(document.body.textContent, {autosemicolon: true});
  var highlighted = Prism.highlight(beautified, Prism.languages.css);

  prismStyle.textContent = 'code[class*="language-"],pre[class*="language-"]{color:black;text-shadow:0 1px white;font-family:Consolas,Monaco,\'Andale Mono\',monospace;direction:ltr;text-align:left;white-space:pre;word-spacing:normal;-moz-tab-size:4;-o-tab-size:4;tab-size:4;-webkit-hyphens:none;-moz-hyphens:none;-ms-hyphens:none;hyphens:none;}@media print{code[class*="language-"],pre[class*="language-"]{text-shadow:none;}}pre[class*="language-"]{padding:1em;margin:.5em 0;overflow:auto;}:not(pre) > code[class*="language-"],pre[class*="language-"]{background:#f5f2f0;}:not(pre) > code[class*="language-"]{padding:.1em;border-radius:.3em;}.token.comment,.token.prolog,.token.doctype,.token.cdata{color:slategray;}.token.punctuation{color:#999;}.namespace{opacity:.7;}.token.property,.token.tag,.token.boolean,.token.number{color:#905;}.token.selector,.token.attr-name,.token.string{color:#690;}.token.operator,.token.entity,.token.url,.language-css .token.string,.style .token.string{color:#a67f59;background:hsla(0,0%,100%,.5);}.token.atrule,.token.attr-value,.token.keyword{color:#07a;}.token.regex,.token.important{color:#e90;}.token.important{font-weight:bold;}.token.entity{cursor:help;}';

  document.head.innerHTML = '';
  document.head.appendChild(prismStyle);
  document.body.innerHTML = '<code><pre>' + highlighted + '</pre></code>';

})();
```

### cssreload

页面 css 颜色重新随机加载

```js
// cssreload.js
// https://github.com/bgrins/devtools-snippets
// Removes then reloads all the CSS files in the current page

(function () {

  function insertAfter(newElement, targetElement) {
    var parent = targetElement.parentNode;
    if (parent.lastChild == targetElement) {
      parent.appendChild(newElement);
    } else {
      parent.insertBefore(newElement, targetElement.nextSibling);
    }
  }

  function reloadStyleSheet(stylesheet) {
    var element = stylesheet.ownerNode;
    var clone = element.cloneNode(false);
    clone.href = addRandomToUrl(clone.href);
    clone.addEventListener("load", function() {
      if (element.parentNode) {
        element.parentNode.removeChild(element);
      }
    });
    insertAfter(clone, element);
  }

  function addRandomToUrl(input) {
    // prevent CSS caching
    var hasRnd = /([?&])_=[^&]*/,
      hasQueryString = /\?/,
      hasHash = /(.+)#(.+)/,
      hash = null,
      rnd = Math.random();

    var hashMatches = input.match(hasHash);
    if (hashMatches) {
      input = hashMatches[1];
      hash = hashMatches[2];
    }
    url = hasRnd.test(input) ?
    input.replace(hasRnd, "$1_=" + rnd) :
    input + (hasQueryString.test(input) ? "&" : "?") + "_=" + rnd;
    if (hash) url += '#' + hash;
    return url;
  }

  [].forEach.call(document.styleSheets, function(styleSheet) {
    if (!styleSheet.href) return;
    console.log('reload ' + styleSheet.href);
    reloadStyleSheet(styleSheet);
  });

})();
```

### formcontrols

页面所有的 from 表单和表格打印

```js
// formcontrols.js
// https://github.com/bgrins/devtools-snippets
// Print out forms and their controls

(function() {

  var forms = document.querySelectorAll("form");

  for (var i = 0, len = forms.length; i < len; i++) {
    var tab = [ ];

    console.group("HTMLForm \"" + forms[i].name + "\": " + forms[i].action);
    console.log("Element:", forms[i], "\nName:    "+forms[i].name+"\nMethod:  "+forms[i].method.toUpperCase()+"\nAction:  "+forms[i].action || "null");

    ["input", "textarea", "select"].forEach(function (control) {
      [].forEach.call(forms[i].querySelectorAll(control), function (node) {
        tab.push({
          "Element": node,
          "Type": node.type,
          "Name": node.name,
          "Value": node.value,
          "Pretty Value": (isNaN(node.value) || node.value === "" ? node.value : parseFloat(node.value))
        });
      });
    });

    console.table(tab);
    console.groupEnd();
  }
})();
```

### jq

给当前环境添加 jq

```js
// jquerify.js
// https://github.com/bgrins/devtools-snippets
// Add jQuery to any page that does not have it already.

(function () {

  if ( !window.jQuery ) {
    var dollarInUse = !!window.$;
    var s = document.createElement('script');
    s.setAttribute('src', '//ajax.googleapis.com/ajax/libs/jquery/2.1.0/jquery.min.js');
    s.addEventListener('load', function(){
      console.log('jQuery loaded!');

      if(dollarInUse) {
        jQuery.noConflict();
        console.log('`$` already in use; use `jQuery`');
      }
    });

    document.body.appendChild(s);
  }

})();
```

### log

增加 log 方法

```js
// log.js
// https://github.com/bgrins/devtools-snippets
// Adds a `log` function to window object.
// http://www.briangrinstead.com/blog/console-log-helper-function

(function() {

  window.log = Function.prototype.bind.call(console.log, console);

})();
```

### performance

打印当前页面的 performance

```js
// performance.js
// https://github.com/bgrins/devtools-snippets
// Print out window.performance information.
// https://developer.mozilla.org/en-US/docs/Navigation_timing

(function () {

  var t = window.performance.timing;
  var lt = window.chrome && window.chrome.loadTimes && window.chrome.loadTimes();
  var timings = [];

  timings.push({
    label: "Time Until Page Loaded",
    time: t.loadEventEnd - t.navigationStart + "ms"
  });
  timings.push({
    label: "Time Until DOMContentLoaded",
    time: t.domContentLoadedEventEnd - t.navigationStart + "ms"
  });
  timings.push({
    label: "Total Response Time",
    time: t.responseEnd - t.requestStart + "ms"
  });
  timings.push({
    label: "Connection",
    time: t.connectEnd - t.connectStart + "ms"
  });
  timings.push({
    label: "Response",
    time: t.responseEnd - t.responseStart + "ms"
  });
  timings.push({
    label: "Domain Lookup",
    time: t.domainLookupEnd - t.domainLookupStart + "ms"
  });
  timings.push({
    label: "Load Event",
    time: t.loadEventEnd - t.loadEventStart + "ms"
  });
  timings.push({
    label: "Unload Event",
    time: t.unloadEventEnd - t.unloadEventStart + "ms"
  });
  timings.push({
    label: "DOMContentLoaded Event",
    time: t.domContentLoadedEventEnd - t.domContentLoadedEventStart + "ms"
  });
  if(lt) {
    if(lt.wasNpnNegotiated) {
      timings.push({
        label: "NPN negotiation protocol",
        time: lt.npnNegotiatedProtocol
      });
    }
    timings.push({
      label: "Connection Info",
      time: lt.connectionInfo
    });
    timings.push({
      label: "First paint after Document load",
      time: Math.ceil(lt.firstPaintTime - lt.finishDocumentLoadTime) + "ms"
    });
  }

  var navigation = window.performance.navigation;
  var navigationTypes = { };
  navigationTypes[navigation.TYPE_NAVIGATENEXT || 0] = "Navigation started by clicking on a link, or entering the URL in the user agent's address bar, or form submission.",
  navigationTypes[navigation.TYPE_RELOAD] = "Navigation through the reload operation or the location.reload() method.",
  navigationTypes[navigation.TYPE_BACK_FORWARD] = "Navigation through a history traversal operation.",
  navigationTypes[navigation.TYPE_UNDEFINED] = "Navigation type is undefined.",

  console.group("window.performance");

  console.log(window.performance);

  console.group("Navigation Information");
  console.log(navigationTypes[navigation.type]);
  console.log("Number of redirects that have taken place: ", navigation.redirectCount)
  console.groupEnd("Navigation Information");

  console.group("Timing");
  console.log(window.performance.timing);
  console.table(timings, ["label", "time"]);
  console.groupEnd("Timing");

  console.groupEnd("window.performance");

})();
```

### tags

获取页面所有的 标签数量

```js
function getTagCount() {
  const tags = document.getElementsByTagName('*')
  const tagNames = []
  for (const val of tags) {
    // 把所有标签名转为小写，添加到数组中
    tagNames.push(val.tagName.toLocaleLowerCase())
  }
  const res = {}
  for (const val of tagNames) {
    if (!res[val]) {
      res[val] = 1
    } else {
      res[val]++
    }
  }
  return res
}

getTagCount()

```

### urlquerystring

获取当前路径的拼接参数

```js
// querystringvalues.js
// https://github.com/bgrins/devtools-snippets
// Print out key/value pairs from querystring.

(function() {

  var url = location;
  var querystring = location.search.slice(1);
  var tab = querystring.split("&").map(function(qs) {
    return { "Key": qs.split("=")[0], "Value": qs.split("=")[1], "Pretty Value": decodeURIComponent(qs.split("=")[1]).replace(/\+/g," ") }
  });

  console.group("Querystring Values");
  console.log("URL: "+url+"\nQS:  "+querystring);
  console.table(tab);
  console.groupEnd("Querystring Values");

})();
```

### varglobal

在console中打印全局变量，用于检测全局变量的内存泄露。

```js
/*
 log-globals
 by Sindre Sorhus
 https://github.com/sindresorhus/log-globals
 MIT License

 Logs your global variables to the console. Useful for finding leaked global variables.
 在console中打印全局变量，用于检测全局变量的内存泄露。
*/

// 使用了匿名函数，避免了创建新的全局对象。
(function () {
 'use strict';

 function getIframe() {
  var el = document.createElement('iframe');
  el.style.display = 'none';
  document.body.appendChild(el);
  var win = el.contentWindow;
  document.body.removeChild(el);
  return win;
 }

 function detectGlobals() {
  // 创建一个iframe对象，并返回它的contentWindow。
  //   这个设计很巧妙，不用自己去找一个全局变量的key了（不同版本的浏览器，key还不一样）。
  //  之前写了一个笨方案，就是自己枚举了某个版本window的所有key，https://blog.csdn.net/kinghzking/article/details/122943821。
  var iframe = getIframe();
  var ret = Object.create(null);

  for (var prop in window) {
   if (!(prop in iframe)) {
    // 比较两个window对象，多出来就是新增的对象。
    ret[prop] = window[prop];
   }
  }

  return ret;
 }

 console.log(detectGlobals());
})();

```
