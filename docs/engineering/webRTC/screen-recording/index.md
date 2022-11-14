---
createTime: 2022/11/14
tag: '工程化,WebRTC'
userName: 'sxuan'
link: 'https://juejin.cn/user/254742429437752'
---

# 从0搭建一个WebRTC，实现多房间多对多通话，并实现屏幕录制

为什么要使用WebRTC
------------

WebRTC全称**Web** Real-Time Communication，是一种实时音视频的技术，它的优势是低延时。

本片文章食用者要求
---------

* [了解音视频基础](https://link.juejin.cn/?target=https%3A%2F%2Fzhuanlan.zhihu.com%2Fp%2F86751078 "https://zhuanlan.zhihu.com/p/86751078")
* 能搭建简单的node服务，docker配置
* vue框架的使用

环境搭建及要求
-------

废话不多说，现在开始搭建环境，首先是需要开启socket服务，采用的是[fastify](https://link.juejin.cn/?target=https%3A%2F%2Fwww.fastify.io%2F "https://www.fastify.io/")来进行搭建。[详情可以见文档地址](https://link.juejin.cn/?target=https%3A%2F%2Fwww.fastify.io "https://www.fastify.io")，本例使用的是3.x来启动的。接下来安装[fastify-socket.io](https://link.juejin.cn/?target=https%3A%2F%2Fgithub.com%2Falemagio%2Ffastify-socket.io "https://github.com/alemagio/fastify-socket.io")3.0.0插件，详细配置可以见文档，此处不做详细解释。接下来是搭建Vue3，使用 [vite](https://link.juejin.cn/?target=https%3A%2F%2Fcn.vitejs.dev%2F "https://cn.vitejs.dev/") 脚手架搭建简单的demo。

要求：前端服务运行在localhost或者https下。node需要redis进行数据缓存

获取音视频
-----

要实现实时音视频第一步当然是要能获取到视频流，在这里我们使用浏览器提供的API,[MediaDevices](https://link.juejin.cn/?target=https%3A%2F%2Fdeveloper.mozilla.org%2Fen-US%2Fdocs%2FWeb%2FAPI%2FMediaDevices "https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices")来进行摄像头流的捕获

### enumerateDevices

第一个要介绍的API是`enumerateDevices`，是请求一个可用的媒体输入和输出设备的列表，例如麦克风，摄像机，耳机设备等。直接在控制台执行API，获取的设备如图

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/11192f43a25947c3982256a86380ef1f~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.image?)

我们注意到里面返回的设备ID和label是空的，这是由于浏览器的安全策略限制，必须授权摄像头或麦克风才能允许返回设备ID和设备标签，接下来我们介绍如何请求摄像头和麦克风

### getUserMedia

这个API顾名思义，就是去获取用户的Meida的，那我们直接执行这个API来看看效果

> ps: 由于掘金的代码片段的iframe没有配置`allow="display-capture *;microphone *; camera *"`属性，需要手动打开详情查看效果

通过上述例子我们可以获取到本机的音视频画面，并且可以播放在video标签里，那么我们可以在获取了用户的流之后，重新再获取一次设备列表看看发生了什么变化

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/77a239c1bb2e42489431fbd53f7de2cd~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.image?)

在获取了音视频之后，获取的设备列表的详细信息已经出现，我们就可以获取指定设备的音视频数据，[详情可以见](https://link.juejin.cn/?target=https%3A%2F%2Fdeveloper.mozilla.org%2Fen-US%2Fdocs%2FWeb%2FAPI%2FMediaTrackConstraints "https://developer.mozilla.org/en-US/docs/Web/API/MediaTrackConstraints")

这里介绍一下getUserMedia的参数constraints，

#### 视频参数配置

```ts
interface MediaTrackConstraintSet {
    // 画面比例
    aspectRatio?: ConstrainDouble;
    // 设备ID，可以从enumerateDevices中获取
    deviceId?: ConstrainDOMString;
    // 摄像头前后置模式，一般适用于手机
    facingMode?: ConstrainDOMString;
    // 帧率，采集视频的目标帧率
    frameRate?: ConstrainDouble;
    // 组ID，用一个设备的输入输出的组ID是同一个
    groupId?: ConstrainDOMString;
    // 视频高度
    height?: ConstrainULong
    // 视频宽度
    width?: ConstrainULong;
}

```

#### 音频参数配置

```ts
interface MediaTrackConstraintSet {
    // 是否开启AGC自动增益，可以在原有音量上增加额外的音量
    autoGainControl?: ConstrainBoolean;
    // 声道配置
    channelCount?: ConstrainULong;
    // 设备ID，可以从enumerateDevices中获取
    deviceId?: ConstrainDOMString;
    // 是否开启回声消除
    echoCancellation?: ConstrainBoolean;
    // 组ID，用一个设备的输入输出的组ID是同一个
    groupId?: ConstrainDOMString;
    // 延迟大小
    latency?: ConstrainDouble;
    // 是否开启降噪
    noiseSuppression?: ConstrainBoolean;
    // 采样率单位Hz
    sampleRate?: ConstrainULong;
    // 采样大小，单位位
    sampleSize?: ConstrainULong;
    // 本地音频在本地扬声器播放
    suppressLocalAudioPlayback?: ConstrainBoolean;
}

```

一对一连接
-----

当我们采集到了音视频数据，接下来就是要建立链接，在开始之前需要科普一下WebRTC的工作方式，我们常见有三种WebRTC的网络结构

1. **Mesh**
2. **MCU**
3. **SFU** 关于这三种模式的区别可以查看 [文章](https://link.juejin.cn/?target=https%3A%2F%2Fmillo-l.github.io%2FWebRTC-implementation-method-Mesh-SFU-MCU%2F "https://millo-l.github.io/WebRTC-implementation-method-Mesh-SFU-MCU/")来了解

在这里由于设备的限制，我们采用Mesh的方案来进行开发

### 一对一的流程

我们建立一对一的链接需要知道后流程是怎么流转的，接下来上一张图，便可以清晰的了解

![1825097218-5db028f8d5205.webp](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/96b17ca5021a4335af29162aa1eba215~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.image?)

这里是由ClientA发起B来接受A的视频数据。上图总结可以为A创建本地视频流，把视频流添加到PeerConnection里面 创建一个Offer给B，B收到Offer以后，保存这个offer，并响应这个Offer给A，A收到B的响应后保存A的远端响应，进行NAT穿透，完成链接建立。

话已经讲了这么多，我们该怎么建立呢，光说不做假把式，接下来，用我们的项目创建一个来试试

### 初始化

首先启动fastify服务，接下来在Vue项目安装`socket.io-client@4`然后连接服务端的socket

```ts
import { v4 as uuid } from 'uuid';
import { io, Socket } from 'socket.io-client';
const myUserId = ref(uuid());
let socket: Socket;
socket = io('http://127.0.0.1:7070', {
  query: {
    // 房间号，由输入框输入获得
    room: room.value,
    // userId通过uuid获取
    userId: myUserId.value,
    // 昵称，由输入框输入获得
    nick: nick.value
  }
});

```

可以查看chrome的控制台，检查ws的链接情况，如果出现跨域，请查看socket.io的server配置并开启cors配置。

### 创建offer

开始创建RTCPeerConnection，这里采用google的公共stun服务

```ts
const peerConnect = new RTCPeerConnection({
  iceServers: [
    {
      urls: "stun:stun.l.google.com:19302"
    }
  ]
})

```

根据上面的流程图我们下一步要做的事情是用上面的方式获取视频流，并将获取到的流添加到RTCPeerConnection中,并创建offer，把这个offer设置到这个rtcPeer中，并把offer发送给socket服务

```ts
let localStream: MediaStream;

stream.getTracks().forEach((track) => {
  peerConnect.addTrack(track, stream)
})

const offer = await peerConnect.createOffer();
await peerConnect.setLocalDescription(offer);
socket.emit('offer', { creatorUserId: myUserId.value, sdp: offer }, (res: any) => {
  console.log(res);
});
```

socket 服务收到了这份offer后需要给B发送A的offer

```ts
fastify.io.on('connection', async (socket) => {
    socket.on('offer', async (offer, callback) => {
      socket.emit('offer', offer);
      callback({
        status: "ok"
      })
    })
})
```

### 处理offer

B需要监听socket里面的offer事件并创建RTCPeerConnection，将这个offer设置到远端，接下来来创建响应。并且将这个响应设置到本地，发送answer事件回复给A

```ts
socket.on('offer', async (offer: { sdp: RTCSessionDescriptionInit, creatorUserId: string }) => {
    const peerConnect = new RTCPeerConnection({
      iceServers: [
        {
          urls: "stun:stun.l.google.com:19302"
        }
      ]
    })

    await peerConnect.setRemoteDescription(offer.sdp);
    const answer = await peerConnect.createAnswer();
    await peerConnect.setLocalDescription(answer);
    socket.emit('answer', { sdp: answer }, (res: any) => {
      console.log(res);
    }) 
})
```

### 处理answer

服务端广播answer

```ts
socket.on('offer', async (offer, callback) => {
      socket.emit('offer', offer);
      callback({
        status: "ok"
      })
    })
```

A监听到socket里面的answer事件，需要将刚才的自己的RTCpeer添加远端描述

```ts
socket.on('answer', async (data: { sdp: RTCSessionDescriptionInit }) => {
    await peerConnect.setRemoteDescription(data.sdp)
})
```

### 处理ICE-candidate

接下来A会获取到ICE候选信息，需要发送给B

```ts
peerConnect.onicecandidate = (candidateInfo: RTCPeerConnectionIceEvent) => {
  if (candidateInfo.candidate) {
    socket.emit('ICE-candidate', { sdp: candidateInfo.candidate }, (res: any) => {
      console.log(res);
    })
  }
}

```

广播消息是同理这里就不再赘述了，B获取到了A的ICE，需要设置候选

```ts
socket.on('ICE-candidate', async (data: { sdp: RTCIceCandidate }) => {
   await peerConnect.addIceCandidate(data.sdp)
})
```

接下来B也会获取到ICE候选信息，同理需要发送给A，待A设置完成之后便可以建立链接,代码同上，B接下来会收到流添加的事件，这个事件会有两次，分别是音频和视频的数据

### 处理音视频数据

```ts
peerConnect.ontrack = (track: RTCTrackEvent) => {
    if (track.track.kind === 'video') {
      const video = document.createElement('video');
      video.srcObject = track.streams[0];
      video.autoplay = true;
      video.style.setProperty('width', '400px');
      video.style.setProperty('aspect-ratio', '16 / 9');
      video.setAttribute('id', track.track.id)
      document.body.appendChild(video)
    }
    if (track.track.kind === 'audio') {
      const audio = document.createElement('audio');
      audio.srcObject = track.streams[0];
      audio.autoplay = true;
      audio.setAttribute('id', track.track.id)
      document.body.appendChild(audio)
    }
}
```

到这里你就可以见到两个视频建立的P2P链接了。到这里为止只是建立了视频的一对一链接，但是我们可以通过这些操作进行复制，就能进行多对多的连接了。

多对多连接
-----

在开始我们需要知道，一个人和另一个人建立连接双方都需要创建自己的peerConnection。对于多人的情况，首先我们需要知道进入的房间里面当前的人数，给每个人都创建一个RtcPeer，同时收到的人也回复这个offer给发起的人。对于后进入的人，需要让已经创建音视频的人给后进入的人创建新的offer。

基于上面的流程，我们现在先实现一个成员列表的接口

### 成员列表的接口

在我们登录socket服务的时候我们在query参数里面有房间号，userId和昵称，我们可以通过redis记录对应的房间号的登录和登出，从而实现成员列表。

可以在某一个人登录的时候获取一下redis对应房间的成员列表，如果没有这个房间，就把这个人丢进新的房间，并且存储到redis中，方便其他人登录这个房间的时候知道现在有多少人。

```ts
fastify.io.on('connection', async (socket) => {
  const room = socket.handshake.query.room;
  const redis = fastify.redis;
  let userList;
  // 获取当前房间的数据
  await getUserList()

    async function getUserList() {
      const roomUser = await redis.get(room);
      if (roomUser) {
        userList = new Map(JSON.parse(roomUser))
      } else {
        userList = new Map();
      }
    }
    async function setRedisRoom() {
      await redis.set(room, JSON.stringify([...userList]))
    }
    function rmUser(userId) {
      userList.delete(userId);
    }
    if (room) {
      // 将这人加入到对应的socket房间
      socket.join(room);
      await setRedisRoom();
      // 广播有人加入了
      socket.to(room).emit('join', userId);
    }
    // 这个人断开了链接需要将这个人从redis中删除
    socket.on('disconnect', async (socket) => {
      await getUserList();
      rmUser(userId);
      await setRedisRoom();
    })
})
```

到上面为止，我们实现了成员的记录、广播和删除。接下来是需要实现一个成员列表的接口，提供给前端项目调用。

```ts
fastify.get('/userlist', async function (request, reply) {
  const redis = fastify.redis;
  return await redis.get(request.query.room);
})
```

### 多对多初始化

由于需要给每个人发送offer，需要对上面的初始化函数进行封装。

```ts
/**
 * 创建RTCPeerConnection
 * @param creatorUserId 创建者id，本人
 * @param recUserId 接收者id
 */
const initPeer = async (creatorUserId: string, recUserId: string) => {
  const peerConnect = new RTCPeerConnection({
    iceServers: [
      {
        urls: "stun:stun.l.google.com:19302"
      }
    ]
  })
  return peerConnect;
})
```

由于存在多份rtc的映射关系，我们这里可以用Map来实现映射的保存

```ts
const peerConnectList = new Map();

const initPeer = () => {
   // ice，track，new Peer等其他代码
   ......
   peerConnectList.set(`${creatorUserId}_${recUserId}`, peerConnect);
}
```

### 获取成员列表

上面实现了成员列表。接下来进入了对应的房间后需要轮询获取对应的成员列表

```ts
let userList = ref([]);
const intoRoom = () => {
    //其他代码
    ......
    
    setInterval(()=>{
      axios.get('/userlist', { params: { room: room.value }}).then((res)=>{
        userList.value = res.data
      })
    }, 1000)
}
```

### 创建多对多的Offer和Answer

在我们获取到视频流的时候，可以对在线列表里除了自己的人都创建一个RTCpeer，来进行一对一连接，从而达到多对多连接的效果。

```ts
// 过滤自己
const emitList = userList.value.filter((item) => item[0] !== myUserId.value);
for (const item of emitList) {
  // item[0]就是目标人的userId
  const peer = await initPeer(myUserId.value, item[0]);
  await createOffer(item[0], peer);
}

const createOffer = async (recUserId: string, peerConnect: RTCPeerConnection, stream: MediaStream = localStream) => {
  if (!localStream) return;
  stream.getTracks().forEach((track) => {
    peerConnect.addTrack(track, stream)
  })
  const offer = await peerConnect.createOffer();
  await peerConnect.setLocalDescription(offer);
  socket.emit('offer', { creatorUserId: myUserId.value, sdp: offer, recUserId }, (res: any) => {
    console.log(res);
  });
}
```

那么在socket服务中我们怎么只给对应的人进行事件广播，不对其他人进行广播，我们可以用找到这个人userId对应的socketId，进而只给这一个人广播事件。

```ts
// 首先获取IO对应的nameSpace
const IONameSpace = fastify.io.of('/');

// 发送Offer给对应的人
socket.on('offer', async (offer, callback) => {
  // 重新从reids获取用户列表
  await getUserList();
  // 找到目标的UserId的数据
  const user = userList.get(offer.recUserId);
  if (user) {
    // 找到对应的socketId
    const io = IONameSpace.sockets.get(user.sockId);
    if (!io) return;
    io.emit('offer', offer);
    callback({
      status: "ok"
    })
  }
})
```

其他人需要监听socket的事件，每个人都需要处理对应自己的offer。

```ts
socket.on('offer', handleOffer);
const handleOffer = async (offer: { sdp: RTCSessionDescriptionInit, creatorUserId: string, recUserId: string }) => {
  const peer = await initPeer(offer.creatorUserId, offer.recUserId);
  await peer.setRemoteDescription(offer.sdp);
  const answer = await peer.createAnswer();
  await peer.setLocalDescription(answer);
  socket.emit('answer', { recUserId: myUserId.value, sdp: answer, creatorUserId: offer.creatorUserId }, (res: any) => {
    console.log(res);
  })
}

```

接下来的步骤其实就是和一对一是一样的了，后面还需要发起offer的人处理对应peer的offer、以及ICE候选，还有流进行挂载播放。

```ts
socket.on('answer', handleAnswer)
// 应答方回复
const handleAnswer = async (data: { sdp: RTCSessionDescriptionInit, recUserId: string, creatorUserId: string }) => {
  const peer = peerConnectList.get(`${data.creatorUserId}_${data.recUserId}`);
  if (!peer) {
    console.warn('handleAnswer peer 获取失败')
    return;
  }
  await peer.setRemoteDescription(data.sdp)
}
......处理播放，处理ICE候选

```

到目前为止，就实现了一个基于mesh的WebRTC的多对多通信。在这里附上了一个完整的Demo可供参考 [socketServer](https://link.juejin.cn/?target=https%3A%2F%2Fgithub.com%2Fsxuan11%2FWebRTC-socket-server "https://github.com/sxuan11/WebRTC-socket-server") [FontPage](https://link.juejin.cn/?target=https%3A%2F%2Fgithub.com%2Fsxuan11%2FWebRTC-font-multi "https://github.com/sxuan11/WebRTC-font-multi")

基于WebRTC的屏幕录制
-------------

### getDisplayMedia

这个API是在MediaDevices里面的一个方法，是用来获取屏幕共享的。

> 这个 [`MediaDevices`](https://link.juejin.cn/?target=https%3A%2F%2Fdeveloper.mozilla.org%2Fzh-CN%2Fdocs%2FWeb%2FAPI%2FMediaDevices "https://developer.mozilla.org/zh-CN/docs/Web/API/MediaDevices")  接口的 `getDisplayMedia() 方法提示用户去选择和授权捕获展示的内容或部分内容（如一个窗口）在一个`  [`MediaStream`](https://link.juejin.cn/?target=https%3A%2F%2Fdeveloper.mozilla.org%2Fzh-CN%2Fdocs%2FWeb%2FAPI%2FMediaStream "https://developer.mozilla.org/zh-CN/docs/Web/API/MediaStream") 里. 然后，这个媒体流可以通过使用 [MediaStream Recording API](https://link.juejin.cn/?target=https%3A%2F%2Fdeveloper.mozilla.org%2Fen-US%2Fdocs%2FWeb%2FAPI%2FMediaStream_Recording_API "https://developer.mozilla.org/en-US/docs/Web/API/MediaStream_Recording_API") 被记录或者作为[WebRTC](https://link.juejin.cn/?target=https%3A%2F%2Fdeveloper.mozilla.org%2Fen-US%2Fdocs%2FWeb%2FAPI%2FWebRTC_API "https://developer.mozilla.org/en-US/docs/Web/API/WebRTC_API") 会话的一部分被传输。

```
await navigator.mediaDevices.getDisplayMedia()

```

### MediaRecorder

获取到屏幕共享流后，需要使用 [MediaRecorder](https://link.juejin.cn/?target=https%3A%2F%2Fdeveloper.mozilla.org%2Fen-US%2Fdocs%2FWeb%2FAPI%2FMediaRecorder "https://developer.mozilla.org/en-US/docs/Web/API/MediaRecorder")这个api来对流进行录制，接下来我们先获取屏幕流,同时创建一个MeidaRecord类

```
let screenStream: MediaStream;
let mediaRecord: MediaRecorder;
let blobMedia: (Blob)[] = [];
const startLocalRecord = async  () => {
  blobMedia = [];
  try {
      screenStream = await navigator.mediaDevices.getDisplayMedia();
      screenStream.getVideoTracks()[0].addEventListener('ended', () => {
        console.log('用户中断了屏幕共享');
        endLocalRecord()
      })

      mediaRecord = new MediaRecorder(screenStream, { mimeType: 'video/webm' });

      mediaRecord.ondataavailable = (e) => {
        if (e.data && e.data.size > 0) {
          blobMedia.push(e.data);
        }
      };

      // 500是每隔500ms进行一个保存数据
      mediaRecord.start(500)
  } catch(e) {
      console.log(`屏幕共享失败->${e}`);
  }
}

```

获取到了之后可以使用 [Blob](https://link.juejin.cn/?target=https%3A%2F%2Fdeveloper.mozilla.org%2Fzh-CN%2Fdocs%2FWeb%2FAPI%2FBlob "https://developer.mozilla.org/zh-CN/docs/Web/API/Blob") 进行处理

```
const replayLocalRecord = async () => {
  if (blobMedia.length) {
    const scVideo = document.querySelector('#screenVideo') as HTMLVideoElement;
    const blob = new Blob(blobMedia, { type:'video/webm' })
    if(scVideo) {
       scVideo.src = URL.createObjectURL(blob);
    }
  } else {
    console.log('没有录制文件');
  }
}

const downloadLocalRecord = async () => {
  if (!blobMedia.length) {
    console.log('没有录制文件');
    return;
  }
  const blob = new Blob(blobMedia, { type: 'video/webm' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `录屏_${Date.now()}.webm`;
  a.click();
}

```
