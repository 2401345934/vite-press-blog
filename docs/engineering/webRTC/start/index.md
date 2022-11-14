---
createTime: 2022/11/14
tag: '工程化,WebRTC'
userName: '荣顶'
link: 'https://github.com/wangrongding'
---

# WebRTC 的应用场景

----------

`WebRTC` (Web Real-Time Communications) 是一项`实时通讯技术`，它允许网络应用或者站点，在不借助中间媒介的情况下，建立浏览器之间`点对点（Peer-to-Peer）的连接`，实现视频流和（或）音频流或者其他`任意数据`的传输。WebRTC 包含的这些标准使用户在无需安装任何插件或者第三方的软件的情况下，创建点对点（Peer-to-Peer）的数据分享和电话会议成为可能。

WebRTC 的应用场景
------------

* 直播
* 游戏
* 视频会议/在线教育
* 屏幕共享/远程控制
* 等等等

可玩性很强，可以做很多有趣的事情。（哪怕是被玩烂了概念“元宇宙”😂） 在网速与硬件越来越好的趋势下，WebRTC 它有无限可能。

媒体流
---

要想了解 WebRTC，首先要了解媒体流，媒体流可以是来自本地设备的，也可以是来自远程设备的。媒体流可以是实时的，也可以是非实时的。上述的应用场景中，我们都需要使用到`媒体流`，我们可以通过摄像头，麦克风，屏幕共享等方式获取到媒体流，然后通过 WebRTC 技术将媒体流传输到远端实现实时通讯。

![图片](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/7154cbc6b15046e499766463a5f09ece~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.image)

摄像头获取媒体流及一些其他操作
---------------

要实现 音视频通话，我们肯定要先获取到摄像头的媒体流，然后通过 WebRTC 技术将媒体流传输到远端实现实时通讯。下面我们先通过一个简单的拍照小应用来看一下如何通过摄像头获取媒体流。

![图片](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/508858e1fe87430085afc372da7764c1~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.image)

先设置好用于播放媒体流的 video 标签，添加一个 autoplay 属性，这样就可以在摄像头获取到媒体流后自动播放了。

```html
<video id="localVideo" autoplay playsinline muted></video>
```

**需要注意的是，WebRTC 只能在 HTTPS 协议或者 localhost 下使用，如果是 HTTP 协议，会报错。**

![图片](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/65a5f0333ef04eb1a07bd7690df13f00~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.image)

这里我们暂时使用 localhost 做简单的演示，后面通过`信令服务器`实现实时音视频的章节我会讲到如何在本地用 `mkcert` 做自签名证书。

ok, continue ~

我们主要通过`navigator.mediaDevices.getUserMedia(constraints)`这个 api 来获取媒体流，这个方法接收一个配置对象作为参数，配置对象中包含了媒体流的类型，以及媒体流的分辨率等信息。

```js
// 获取本地音视频流
async function getLocalStream(constraints: MediaStreamConstraints) {
  // 获取媒体流
  const stream = await navigator.mediaDevices.getUserMedia(constraints)
}
```

其中`constraints`指定了请求的媒体类型和相对应的参数，用于配置视频流和音频流的信息。

我可以看下`constraints`参数中具体支持哪些配置项，可以通过`navigator.mediaDevices.getSupportedConstraints()`这个方法来获取。

```js
console.log(
  '🚀🚀🚀 / SupportedConstraints',
  navigator.mediaDevices.getSupportedConstraints(),
)
```

我们把它打印出来，可以看到它支持的配置项有：  
![图片](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/187ee4a65126482abda0759a8a40e4fc~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.image)

通常我们不设置`constraints`参数，那么默认就是获取摄像头和麦克风的媒体流，如果我们只想要获取摄像头的媒体流，那么我们可以这样设置：

```js
navigator.mediaDevices.getUserMedia({
  audio: false,
  video: true,
})
```

如果我们想要获取视频的高度宽度，那么我们可以这样设置：

```js
navigator.mediaDevices.getUserMedia({
  audio: false,
  video: {
    width: 1280,
    height: 720,
  },
})
```

诸如此类，video 中也可以设置设备 id 或者前后置摄像头...， 大家可以在支持的情况下根据自己的需求来设置即可。具体可以查看[MDN](https://link.juejin.cn/?target=https%3A%2F%2Fdeveloper.mozilla.org%2Fzh-CN%2Fdocs%2FWeb%2FAPI%2FMediaDevices%2FgetUserMedia "https://developer.mozilla.org/zh-CN/docs/Web/API/MediaDevices/getUserMedia")。这里我不做过多的介绍了，我们继续。

获取通过摄像头获取媒体流后，将媒体流赋值给 video 标签的 srcObject 属性，让其播放。

```js
// 获取本地音视频流
async function getLocalStream(constraints: MediaStreamConstraints) {
  // 获取媒体流
  const stream = await navigator.mediaDevices.getUserMedia(constraints)
  // 将媒体流设置到 video 标签上播放
  playLocalStream(stream)
}

// 播放本地视频流
function playLocalStream(stream: MediaStream) {
  const videoEl = document.getElementById('localVideo') as HTMLVideoElement
  videoEl.srcObject = stream
}

getLocalStream({
  audio: false,
  video: true,
})
```

实现拍照功能，canvas 标签可以将媒体流绘制到 canvas 上，也可以通过 toDataURL 方法将 canvas 转换为 base64 图片后做一些其他操作。

附上一个 👉 [体验地址](https://link.juejin.cn/?target=https%3A%2F%2Ffrontend-park.vercel.app%2Faudio-and-video%2FwebRTC%2Ftake-photos "https://frontend-park.vercel.app/audio-and-video/webRTC/take-photos")

![图片](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/87ce1c50fce64c75aacb220014d3d52e~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.image)

```js
<video id="localVideo" autoplay playsinline muted></video>
<div v-for="(item,index) in imgList.length" :key="index" class="item">
  <img :src="item" alt="" />
</div>
```

我们通过获取已经在播放媒体流的 video 标签，然后将其绘制到 canvas 上，再通过 toDataURL 方法将 canvas 转换为 base64 图片。

这里你可以加一些滤镜或者加一些美颜功能或是其他的操作，最终生成的 imgUrl 给到 img 标签让其展示就行了。

```js
// 拍照
function takePhoto() {
  const videoEl = document.getElementById('localVideo') as HTMLVideoElement
  const canvas = document.createElement('canvas')
  canvas.width = videoEl.videoWidth
  canvas.height = videoEl.videoHeight
  const ctx = canvas.getContext('2d')!
  ctx.drawImage(videoEl, 0, 0, canvas.width, canvas.height)
  imgList.value.push(canvas.toDataURL('image/png'))
  console.log('🚀🚀🚀 / imgList', imgList)

  // 添加滤镜
  const filterList = [
    'blur(5px)', // 模糊
    'brightness(0.5)', // 亮度
    'contrast(200%)', // 对比度
    'grayscale(100%)', // 灰度
    'hue-rotate(90deg)', // 色相旋转
    'invert(100%)', // 反色
    'opacity(90%)', // 透明度
    'saturate(200%)', // 饱和度
    'saturate(20%)', // 饱和度
    'sepia(100%)', // 褐色
    'drop-shadow(4px 4px 8px blue)', // 阴影
  ]

  for (let i = 0; i < filterList.length; i++) {
    ctx.filter = filterList[i]
    ctx.drawImage(videoEl, 0, 0, canvas.width, canvas.height)
    imgList.value.push(canvas.toDataURL('image/png'))
  }
}

```

拍摄的时候我们也可以切换摄像头，这里我们通过调用 `navigator.mediaDevices.enumerateDevices` 方法，获取到所有的设备，然后筛选出 videoinput 类型的设备，最后通过不同的设备 id 来实现切换摄像头。

```js
// 获取所有视频输入设备
async function getDevices() {
  const devices = await navigator.mediaDevices.enumerateDevices()
  console.log('🚀🚀🚀 / devices', devices)
  let videoDevices = devices.filter((device) => device.kind === 'videoinput')
}

```

```js
// 切换设备
function handleDeviceChange(deviceId: string) {
  getLocalStream()
  const stream = await navigator.mediaDevices.getUserMedia({
    audio: false,
    video: {
      deviceId: { exact: deviceId },
    },
  })
}

```

这里我们把获取到的设备列表信息打印看看，我们可以看到每个设备都有一个 deviceId，我们就是通过这个 id 来切换设备的。

![图片](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/4016821b03214f5a9f35a19767fc6fe2~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.image)

可以看到，获得了多个摄像头设备，我这里是一个笔记本自带的摄像头和一个 OBS 虚拟摄像头，包括最近 MacOs 更新到 Ventura 13 ,IOS 更新到 16 后的`连续互通摄像头`，都可以获取到。这样我们就可以在视频的时候，就可以通过拍摄更清晰的手机后置来拍摄了。

虚拟摄像头更有意思，在 OBS 中开启虚拟摄像头后，可以播放一个视频，然后进行视频会议，这样你甚至可以提前录制好一个端坐的视频（简直是上网课必备！😅），我之前试过播放特朗普的视频，然后微信视频，对面看到的确实是特朗普在演讲，所以说这方面很有安全隐患，所以大家在网上和别人视频的时候，还是需要注意下，对方可能不是真的。

![图片](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/35e6428b3c76425094067f3a88f0c08c~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.image)  
![图片](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/07e694f9c95c423c99492b8ceaaffb47~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.image)  
![图片](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e7dca829c42944e2a45b4b017d0070a5~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.image)

跑题了，我们继续。🦄🦄🦄

说完了切换摄像头，我们再来看看如何在支持切换前后置摄像头的设备上如何切换前后摄像头。我们可以通过指定 `facingMode` 来实现，facingMode 有 4 个值，分别是 user、environment 和 left、right，分别对应前后摄像头和左右摄像头。

当需要强制使用前置摄像头时，可以使用 exact 关键字，例如 facingMode: { exact: 'user' }，强制切换前后摄像头时，当摄像头不支持时，会报一个 OverconstrainedError［无法满足要求的错误］  
![图片](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/779e8bb4fc7a47a29c05327ada434290~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.image)

```
// 切换前后摄像头
function switchCamera(val: number) {
  let constraints = {
    video: true, // 开启默认摄像头
    audio: true,
  }
  constraints.video = {
    // 强制切换前后摄像头时，当摄像头不支持时，会报一个OverconstrainedError［无法满足要求的错误］
    facingMode: { exact: val === 1 ? 'user' : 'environment' },
    // 也可以这样当前后摄像头不支持切换时，会继续使用当前摄像头，好处是不会报错
    // facingMode: val === 1 ? 'user' : 'environment',
  }

  navigator.mediaDevices
    .getUserMedia(constraints)
    .then((stream) => {
      ElMessage.success('切换成功')
      playLocalStream(stream)
    })
    .catch((err) => {
      ElMessage.error('你的设备不支持切换前后摄像头')
    })
}
switchCamera(1) // 切换前置摄像头

```

![图片](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/8f70b6a6b5be4faaa84f14442603faa5~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.image)

通过这个简单的拍照小应用，相信我们已经知道了通过摄像头获取媒体流的大概流程以及一些常用的 API 了。

ok, continue ~

通过屏幕共享获取获取媒体流，实现录制等操作
---------------------

在视频会议中，我们经常会使用到屏幕共享，已经我们经常会有录制屏幕等需求，市面上还有那么多需要付费的软件，我们通过 WebRTC 配合一些相关 api 自己实现一个不是更好吗？🤔🤔🤔 既省钱又学到了知识。

那么我们如何通过屏幕共享获取媒体流并实现录制呢？下面通过一个小 demo 来简单实现一下。

在 WebRTC 中，我们可以通过 `getDisplayMedia` 来获取屏幕共享的媒体流，这个 API 与 `getUserMedia` 类似，但是它只能获取屏幕共享的媒体流。

```js
// 获取屏幕共享的媒体流
async function shareScreen() {
  let localStream = await navigator.mediaDevices.getDisplayMedia({
    audio: true,
    video: true,
  })
  // 播放本地视频流
  playStream(localStream)
}

// 在视频标签中播放视频流
function playStream(stream: MediaStream) {
  const video = document.querySelector('#localVideo') as HTMLVideoElement
  video.srcObject = stream
}

```

执行 `shareScreen` 函数后，会弹出一个权限询问框，询问是否允许获取屏幕共享的媒体流。

然后你就可以分享你的整个屏幕，如果你又多个屏幕的话，你可以选择其中一个进行分享  
![图片](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/6cdd2153dabd4e88a802ea34d026cc70~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.image)

然后你也可以选择只分享你屏幕上的某个应用的窗口，不用担心你一边干嘛干嘛一边录制屏幕，它只会捕捉你选择的应用窗口的内容。非常 nice。

![图片](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/cbe6fa6e96b94a888266cf46ac39cee7~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.image)

你甚至可以在你浏览器打开的各种页面中，选择一个你想要分享的网页，当你页面各种切换时候，你的屏幕共享也只会显示你选择的网页的内容。

共享前你可以随便选一个进行预览，然后可以选择是否分享的时候包含页面中的音频，这样你获取的媒体流就会包含音频轨道了。

![图片](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/2d94b6755607462a9e5b88ed6c818fdc~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.image)

这里我打开自己 github 的网页，然后点击屏幕共享，可以看到共享的只有自己的 github 页面了。不用担心会有什么奇怪的东西乱入进来，非常适合视频会议或者在线教育等场景。

![图片](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/67221d90ba214be899bbf382e9410e76~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.image)

说完获取屏幕媒体流，接下来我们来看看如何通过媒体流进行录制。

[完整的 MIME 类型列表](https://link.juejin.cn/?target=https%3A%2F%2Fwww.iana.org%2Fassignments%2Fmedia-types%2Fmedia-types.xhtml "https://www.iana.org/assignments/media-types/media-types.xhtml")

这里我们使用 `MediaRecorder` 来进行录制，它是一个用于录制媒体流的 API，它可以将媒体流中的数据进行录制，然后将录制的数据保存成一个文件。

由于 `MediaRecorder` api 的对 mimeType 参数的支持是有限的。所以我们需要通过 `MediaRecorder.isTypeSupported` 来判断当前浏览器是否支持我们需要的 mimeType。

chrome 中 `MediaRecorder` 支持的 `mimeType` 如下：

```js
"video/webm"
"video/webm;codecs=vp8"
"video/webm;codecs=vp9"
"video/webm;codecs=h264"
"video/x-matroska;codecs=avc1"

```

![图片](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/c5aeee0c5c5d4b2da70b56b51f900c14~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.image)

为了验证上述的内容，这里我把一些常用的 mimeType 列出来，拼装后通过 `MediaRecorder.isTypeSupported` 来判断是否支持，最后放到下拉框中供用户根据自己的需求选择合适的 mimeType。

```
// 获取支持的媒体类型
function getSupportedMimeTypes() {
  const media = 'video'
  // 常用的视频格式
  const types = [
    'webm',
    'mp4',
    'ogg',
    'mov',
    'avi',
    'wmv',
    'flv',
    'mkv',
    'ts',
    'x-matroska',
  ]
  // 常用的视频编码
  const codecs = ['vp9', 'vp9.0', 'vp8', 'vp8.0', 'avc1', 'av1', 'h265', 'h264']
  // 支持的媒体类型
  const supported: string[] = []
  const isSupported = MediaRecorder.isTypeSupported
  // 遍历判断所有的媒体类型
  types.forEach((type: string) => {
    const mimeType = `${media}/${type}`
    codecs.forEach((codec: string) =>
      [
        `${mimeType};codecs=${codec}`,
        `${mimeType};codecs=${codec.toUpperCase()}`,
      ].forEach((variation) => {
        if (isSupported(variation)) supported.push(variation)
      }),
    )
    if (isSupported(mimeType)) supported.push(mimeType)
  })
  return supported
}

console.log(getSupportedMimeTypes())

```

可以看到这么多排列组合后，筛选出的支持的 mimeType 也就只有`"video/webm"`和 `"video/x-matroska"` 两种。

![图片](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/99a2702007dc4901bfa7c7539ffb8253~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.image)

也可以通过这个网址[👉🏻media-mime-support](https://link.juejin.cn/?target=https%3A%2F%2Fcconcolato.github.io%2Fmedia-mime-support%2F "https://cconcolato.github.io/media-mime-support/") 来查看当前浏览器所支持的 mimeType 的情况。

目前最常用的一般都是 `video/mp4`。 截止到目前为止，最佳的 8 种视频格式为：`mp4` ,`webm` ,`mov` ,`avi` ,`mkv` ,`wmv` ,`avchd` ,`flv`。而 webm 是 Google 专门为 web 端推出的一种视频格式。100% 开源，且 100%兼容 Google Chrome 浏览器和 Android 设备。如果你没有强烈的需求，也可以使用 webm 格式。

说了这么多，不支持就不能录制成 mp4 了？🥲  
肯定不是啊 😂

都拿到 blob 了，可以通过 `ffmpeg.js` 来将 webm 格式转换成 mp4 格式，但是 `ffmpeg.js` 的体积比较大，太重了。这里也可以通过一种 hack 的方式来实现，但是不靠谱，这种方式导出的 mp4 文件部分软件可能会识别不了，求稳的话最好还是推荐使用我们浏览器环境列出的支持的 mimeType，或者用工具转一下)

```
// 录制媒体流
function startRecord() {
  const kbps = 1024
  const Mbps = kbps * kbps
  const options = {
    audioBitsPerSecond: 128000,
    videoBitsPerSecond: 2500000,
    mimeType: 'video/webm; codecs="vp8,opus"',
  }
  const mediaRecorder = new MediaRecorder(localStream, options)
  mediaRecorder.start()

  mediaRecorder.ondataavailable = (e) => {
    // 将录制的数据合并成一个 Blob 对象
    // const blob = new Blob([e.data], { type: e.data.type })

    // 🌸重点是这个地方，我们不要把获取到的 e.data.type设置成 blob 的 type，而是直接改成 mp4
    const blob = new Blob([e.data], { type: 'video/mp4' })
    downloadBlob(blob)
  }
  mediaRecorder.onstop = (e: Event) => {
    // 停止录制
  }
}

// 下载 Blob
function downloadBlob(blob: Blob) {
  // 将 Blob 对象转换成一个 URL 地址
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  // 设置 a 标签的 href 属性为刚刚生成的 URL 地址
  a.href = url
  // 设置 a 标签的 download 属性为文件名
  a.download = `${new Date().getTime()}.${blob.type.split('/')[1]}`
  // 模拟点击 a 标签
  a.click()
  // 释放 URL 地址
  URL.revokeObjectURL(url)
}

```

然后我们就可以愉快的录制视频了。当然这里只是用分享屏幕的方式来录制视频，如果你想要录制摄像头的视频，也是一样，拿到媒体流后，就可以直接录制了。

[👉 线上体验地址：](https://link.juejin.cn/?target=https%3A%2F%2Ffrontend-park.vercel.app%2Faudio-and-video%2FwebRTC%2Faudio-and-video%2FwebRTC%2Frecord "https://frontend-park.vercel.app/audio-and-video/webRTC/audio-and-video/webRTC/record")

![图片](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/12fae373d86b4e9095d5c815a96eda46~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.image)

当然，既然都拿到了媒体流，那么我们也可以将媒体流中的视频轨道录制成 gif 图片，这样在一些场景下分享起来也会更加方便。

由于 `MediaRecorder` api 不支持将 mimeType 设置成 image/gif ，所以我们需要借助一个第三方库`MediaStreamRecorder`来实现。它的用法和 `MediaRecorder` 基本一致。我就不再赘述了。

最后有一个需要注意的地方，也是我在实际项目中遇到的问题。截止到目前为止，在使用 `MediaRecorder` 录制视频的时候，如果你的系统是 Windows 或者 Chrome OS，那么录制的视频没什么问题，但是在 Mac 和 Linux 上，录制摄像头和分享屏幕时，选择网页的分享方式，所拿获得的媒体流是可以拿到视频轨道和音频轨道的，但是录制整个屏幕时，由于系统的限制，只能拿到视频的轨道。好在一般录屏都不会有带音频的需求，期待后面能够支持。

![图片](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/245eb5e34b184764bde713c699a0e41c~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.image)

实现视频的虚拟背景
---------

在视频会议中，我们经常会看到一些人在视频中的背景是虚拟的，这样可以让我们更专注于对方的表情和语言，而不会被背景中的一些干扰因素所分散注意力。那么我们如何实现这样的效果呢？

下面我们先通过一个简单的 demo 来看看效果。

[👉 线上体验地址](https://link.juejin.cn/?target=https%3A%2F%2Ffrontend-park.vercel.app%2Faudio-and-video%2FwebRTC%2Fbackground-process "https://frontend-park.vercel.app/audio-and-video/webRTC/background-process")

![图片](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/fb0c083b16fa42e2822fdfaefc1727d4~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.image)

主要原理是通过 `canvas` 将视频中的每一帧画到画布上，然后将画布中的像素逐个与设定的背景色（默认是绿色，你可以更换为任意符合你背景的颜色）进行计算，比较后的差值达到设定的阈值时，对其进行处理，将其更换为预先准备好的背景图的图像数据，最后将处理后的图像数据再画到虚拟背景画布上，通过虚拟背景画布拿到媒体流后给到 video 标签播放， 这样就实现了视频的虚拟背景效果。

下面我们来看看具体的实现。

为保持大小一致，这里我们统一设置画布和视频的宽高为 480\*300。

```
<canvas id="backgroundImg" width="480" height="300"></canvas>
<video id="real-video" width="480" height="300" autoplay muted></video>
<video id="virtual-video" width="480" height="300" autoplay muted></video>

```

首先我们需要准备好背景图，这里我使用了一张图片，你也可以使用视频作为背景。

通过 canvas 将背景图画到画布上，然后通过 `getImageData` 方法拿到图像数据。

```
// 虚拟背景的 canvas中的图片数据
let backgroundImageData: ImageData
// 获取背景图像数据
function getBackgroundImageData() {
  const backgroundCanvas = document.querySelector(
    '#backgroundImg',
  ) as HTMLCanvasElement
  const backgroundCtx = backgroundCanvas.getContext('2d')!
  const img = new Image()
  img.src = 'https://xxxx.png'
  img.onload = () => {
    backgroundCtx.drawImage(
      img,
      0,
      0,
      backgroundCanvas.width,
      backgroundCanvas.height,
    )

    backgroundImageData = backgroundCtx.getImageData(
      0,
      0,
      backgroundCanvas.width,
      backgroundCanvas.height,
    )
  }
}

```

然后我们需要通过摄像头获取到视频流，还是用之前几个 demo 中的方法。

```
// 获取本地音视频流
async function getLocalStream(options: MediaStreamConstraints) {
  const stream = await navigator.mediaDevices.getUserMedia(options)
  return stream
}

// 播放原始视频流
function playRealVideo(stream: MediaStream) {
  realVideo = document.querySelector('#real-video') as HTMLVideoElement
  realVideo.srcObject = stream
}

```

上述步骤完成后，我们就可以通过创建 `canvas` 标签 先将真实的视频每隔 40ms 一次 画到画布上。

这样的话，画布就会不断的更新，能达到 25 帧的效果，这样能保证我们的视频流是非常流畅的。

一般来说，人眼舒适放松时可视帧数是每秒 24 帧，高度集中精神时不超过 30 帧。电影院里的 2D 电影一般是 24 帧的，3D 电影一般是 60 帧以上。

画到画布后，我们也相应的要通过 `getImageData` 方法拿到真实视频的图像数据。

然后每一帧都要与设置好的背景色进行比较，比较后的差值达到设定的阈值的像素，就要扣除（替换为之前拿到的背景图的像素。

![图片](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f1d64a29c3c24d828f117d9951d6aba1~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.image)  
![图片](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/d0ab76d1315c42fca106ade3f82a3b6b~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.image)

看到这里,如果以前看过我的文章，大家一定很眼熟，这个计算颜色差的逻辑与我之前写的[《我用 10000 张图片合成我们美好的瞬间》](https://juejin.cn/post/6996431901623844894 "https://juejin.cn/post/6996431901623844894")用来做合成图的逻辑是一样的。

首先需要明白的一点就是，rgb 的色域是一个 3 维的空间，我们可以通过计算两个点之间的距离来判断两个颜色的差异。距离越小，颜色差异越小。

而这只需要我们中学时期学过的 欧式距离 公式就可以了。

![图片](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/23ed293fcf8f44898e00d32e5373c4ae~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.image)

我们把它转化为颜色差的计算公式如下：

```
// 计算颜色差
function colorDiff(color1: number[], color2: number[]) {
  const r = color1[0] - color2[0]
  const g = color1[1] - color2[1]
  const b = color1[2] - color2[2]
  return Math.sqrt(r * r + g * g + b * b)
}

```

然后再将处理后的图像数据画到虚拟视频的画布上，再通过`captureStream`api 将画布转换为视频流，最后将视频流赋值给虚拟视频的 `srcObject` 属性。

代码如下：

```
const WIDTH = 480 // 视频宽度
const HEIGHT = 300 // 视频高度

// 将视频写到 canvas 中
function drawVideoToCanvas(realVideo: HTMLVideoElement) {
  realVideoCanvas = document.createElement('canvas') as HTMLCanvasElement
  realVideoCtx = realVideoCanvas.getContext('2d')!
  virtualVideoCanvas = document.createElement('canvas') as HTMLCanvasElement
  virtualVideoCtx = virtualVideoCanvas.getContext('2d')!
  realVideoCanvas.width = virtualVideoCanvas.width = WIDTH
  realVideoCanvas.height = virtualVideoCanvas.height = HEIGHT

  // 每隔 100ms 将真实的视频写到 canvas 中，并获取视频的图像数据
  setInterval(() => {
    realVideoCtx.drawImage(
      realVideo,
      0,
      0,
      realVideoCanvas.width,
      realVideoCanvas.height,
    )
    // 获取 realVideoCanvas 中的图像数据
    realVideoImageData = realVideoCtx.getImageData(
      0,
      0,
      realVideoCanvas.width,
      realVideoCanvas.height,
    )
    // 处理真实视频的图像数据，将其写到虚拟视频的 canvas 中
    processFrameDrawToVirtualVideo()
  }, 40)
  // 从 VirtualVideoCanvas 中获取视频流并在 virtualVideo 中播放
  getStreamFromVirtualVideoCanvas()
}

// 从 VirtualVideoCanvas 中获取视频流并在 virtualVideo 中播放
function getStreamFromVirtualVideoCanvas() {
  virtualVideo = document.querySelector('#virtual-video') as HTMLVideoElement
  const stream = virtualVideoCanvas.captureStream(30)
  virtualVideo.srcObject = stream
}

```

逐像素计算与要处理的目标颜色的差值，如果差值小于容差，则将该像素设置为背景图片中的对应像素

```
// 处理真实视频的图像数据，将其写到虚拟视频的 canvas 中
function processFrameDrawToVirtualVideo() {
  // 逐像素计算与要处理的目标颜色的差值，如果差值小于阈值，则将该像素设置为背景图片中的对应像素
  for (let i = 0; i < realVideoImageData.data.length; i += 4) {
    const r = realVideoImageData.data[i]
    const g = realVideoImageData.data[i + 1]
    const b = realVideoImageData.data[i + 2]
    const a = realVideoImageData.data[i + 3]
    const bgR = backgroundImageData.data[i]
    const bgG = backgroundImageData.data[i + 1]
    const bgB = backgroundImageData.data[i + 2]
    const bgA = backgroundImageData.data[i + 3]

    // 计算与背景色的差值
    const diff = colorDiff([r, g, b], backgroundColor)
    // 当差值小于设定的阈值，则将该像素设置为背景图片中的对应像素
    if (diff < allowance.value) {
      realVideoImageData.data[i] = bgR
      realVideoImageData.data[i + 1] = bgG
      realVideoImageData.data[i + 2] = bgB
      realVideoImageData.data[i + 3] = bgA
    }
  }
  // 将处理后的图像数据写到虚拟视频的 canvas 中
  virtualVideoCtx.putImageData(realVideoImageData, 0, 0)
}

// 计算颜色差异
function colorDiff(rgba1: number[], rgba2: number[]) {
  let d = 0
  for (let i = 0; i < rgba1.length; i++) {
    d += (rgba1[i] - rgba2[i]) ** 2
  }
  return Math.sqrt(d)
}

```

可以看到，其中`backgroundColor`（需要扣除的背景色）和`allowance`（容差值）两个变量是由外部控制的，这样我们就可以在页面上通过滑动条或是其他的组件来动态改变容差，通过取色器来动态改变需要扣除的背景色。

![图片](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/d4c4a4c37dd140d689892b22cd3dba78~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.image)

最后
--

至此，我们就可以实现一个简单的背景替换的功能了。当然，这里只是简单的实现了一个背景替换的功能，实际上，我们还可以通过更多的技术手段来实现更加复杂的功能，比如：

目前只是针对纯色的背景进行了替换，如果复杂的背景，我们可以通过图像分割的方式来实现背景替换，比如：TensorFlow.js 中的 身体分割（BodyPix）。

![图片](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f262d5322e6641f7a35ae91bd60355ef~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.image)

或者是说，对于视频中的人脸，我们可以通过`face-api.js`来检测人脸，并将人脸替换为其他的图片，从而实现一个简单的换脸功能。对于视频中的人体，我们可以通过`BodyPix`来检测人体，并将人体替换为其他的图片，从而实现一个简单的换装功能。等等...（后续我都在这个专栏中安排~）

可以见得，用 WebRTC 相关的知识来结合一些其他相关技术，可以实现非常多的有趣的项目，可玩性非常强。

这作为我专栏的第一篇，主要是想通过这篇文章来介绍一下 WebRTC 相关的知识，以及 WebRTC 相关的一些应用场景，希望能够帮助到大家。

本来还想写下 1v1 视频聊天的实现，但是由于时间关系，我把它放到第二篇来写吧，demo 我已经放到了 我的[前端公园合集仓库](https://link.juejin.cn/?target=https%3A%2F%2Fgithub.com%2Fwangrongding%2Ffrontend-park "https://github.com/wangrongding/frontend-park")中，这两天抽空写完,大家也可以 follow 一下我的 Github，谢谢大家~ 🌸

![图片](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/af50e747a22849e5a44ad1543f471f03~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.image)
