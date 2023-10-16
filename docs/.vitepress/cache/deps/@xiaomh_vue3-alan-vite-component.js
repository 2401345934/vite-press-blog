import {
  Fragment,
  createBaseVNode,
  createCommentVNode,
  createElementBlock,
  createStaticVNode,
  createTextVNode,
  defineComponent,
  normalizeClass,
  normalizeStyle,
  onBeforeUnmount,
  onMounted,
  openBlock,
  popScopeId,
  pushScopeId,
  reactive,
  ref,
  renderList,
  renderSlot,
  toDisplayString,
  unref,
  useSlots,
  vShow,
  withDirectives
} from "./chunk-HAEAH2P3.js";
import "./chunk-76J2PTFD.js";

// node_modules/@xiaomh/vue3-alan-vite-component/lib/vue3-alan-vite-component.es.js
var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
var _export_sfc = (sfc, props) => {
  const target = sfc.__vccOpts || sfc;
  for (const [key, val] of props) {
    target[key] = val;
  }
  return target;
};
var _hoisted_1$b = { class: "starry-sky-bg" };
var _hoisted_2$5 = { class: "stars" };
var __default__$d = defineComponent({
  name: "StarrySky"
});
var _sfc_main$e = defineComponent({
  ...__default__$d,
  props: {
    starsCount: {
      type: Number,
      default: () => 800
    },
    distance: {
      type: Number,
      default: () => 800
    }
  },
  setup(__props) {
    const props = __props;
    const star = ref();
    onMounted(() => {
      let starArr = star.value;
      starArr.forEach((item) => {
        let speed = 0.1 + Math.random() * 1;
        let thisDistance = props.distance + Math.random() * 300;
        item.style.transformOrigin = `0 0 ${thisDistance}px`;
        item.style.transform = `translate3d(0,0,-${thisDistance}px) rotateY(${Math.random() * 360}deg) rotateX(${Math.random() * -50}deg) scale(${speed},${speed})`;
      });
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1$b, [
        createBaseVNode("div", _hoisted_2$5, [
          (openBlock(true), createElementBlock(Fragment, null, renderList(__props.starsCount, (item) => {
            return openBlock(), createElementBlock("div", {
              key: item,
              class: "star",
              ref_for: true,
              ref_key: "star",
              ref: star
            });
          }), 128))
        ])
      ]);
    };
  }
});
var StarrySky = _export_sfc(_sfc_main$e, [["__scopeId", "data-v-7932ec82"]]);
StarrySky.install = (App) => {
  App.component(StarrySky.name, StarrySky);
};
var RecordingVideo = class {
  constructor() {
    this.duration = 0;
    this.maxD = 15;
    this.count = 15;
    this.gumVideo = document.querySelector("#gum");
    this.gumVideo2 = document.querySelector("#gum2");
    this.recordButton = document.querySelector("#record");
    this.playButton = document.querySelector("#play");
    this.downloadButton = document.querySelector("#download");
    this.tEL = document.getElementById("tEl");
    const constraints = {
      audio: true,
      video: {
        facingMode: "user",
        width: 400,
        height: 400,
        frameRate: 60
      }
    };
    const isSecureOrigin = location.protocol === "https:" || location.hostname === "localhost";
    if (!isSecureOrigin) {
      alert("getUserMedia() 必须在https或localhost下使用");
      location.protocol = "HTTPS";
    }
    this.recordButton.onclick = () => this.toggleRecording();
    this.playButton.onclick = () => this.play();
    this.downloadButton.onclick = () => this.download();
    this.gumVideo2.width = constraints.video.width;
    this.gumVideo2.height = constraints.video.height;
    this.getUserMedia(constraints, (stream) => {
      this.recordButton.disabled = false;
      this.stream = stream;
      this.gumVideo.srcObject = stream;
    }, (error) => {
      if (error.message === "Permission denied") {
        alert("您已经禁止使用摄像头，请到设置-通用-微信存储空间-管理微信存储空间-点击‘清理其他微信账号聊天数据’");
      }
      console.log("navigator.getUserMedia error: ", error);
    });
  }
  getUserMedia(constraints, success, error) {
    const navigator2 = window.navigator;
    if (navigator2.mediaDevices && navigator2.mediaDevices.getUserMedia) {
      navigator2.mediaDevices.getUserMedia(constraints).then(success).catch(error);
    } else if (navigator2.webkitGetUserMedia) {
      navigator2.webkitGetUserMedia(constraints, success, error);
    } else if (navigator2.mozGetUserMedia) {
      navigator2.mozGetUserMedia(constraints, success, error);
    } else if (navigator2.getUserMedia) {
      navigator2.getUserMedia(constraints, success, error);
    }
  }
  toggleRecording() {
    const tEl2 = this.tEL;
    if (this.recordButton.textContent === "开始录制") {
      tEl2.innerHTML = "";
      this.startRecording();
      clearInterval(this.intervalId);
      tEl2.innerHTML = "剩余时间：" + this.count + "秒";
      this.count--;
      this.intervalId = setInterval(() => {
        tEl2.innerHTML = "剩余时间：" + this.count + "秒";
        if (this.count <= 0) {
          clearInterval(this.intervalId);
          this.duration = this.maxD - this.count;
          this.count = this.maxD;
          this.stopRecording();
          this.recordButton.textContent = "开始录制";
          this.downloadButton.disabled = false;
          this.playButton.disabled = false;
        } else {
          this.count--;
        }
      }, 1e3);
    } else {
      clearInterval(this.intervalId);
      this.duration = this.maxD - this.count;
      this.count = this.maxD;
      this.stopRecording();
      this.recordButton.textContent = "开始录制";
      this.playButton.disabled = false;
      this.downloadButton.disabled = false;
    }
  }
  startRecording() {
    const isSafari = !!(/Safari/.test(navigator.userAgent) && !/Chrome/.test(navigator.userAgent));
    this.recordedBlobs = [];
    const options = {
      audioBitsPerSecond: 128e3,
      videoBitsPerSecond: 25e5,
      mimeType: isSafari ? "video/mp4" : "video/webm"
    };
    try {
      this.mediaRecorder = new MediaRecorder(this.stream, options);
    } catch (e) {
      alert("MediaRecorder创建失败: " + e + ". mimeType: " + options.mimeType);
      return;
    }
    this.recordButton.textContent = "结束录制";
    this.downloadButton.disabled = true;
    this.playButton.disabled = true;
    this.mediaRecorder.ondataavailable = (event) => {
      if (event.data && event.data.size > 0) {
        this.recordedBlobs.push(event.data);
      }
    };
    this.mediaRecorder.onstop = (event) => {
      console.log("Recorder stopped: ", event);
    };
    this.mediaRecorder.start(10);
  }
  stopRecording() {
    tEl.innerHTML = "录制完成";
    this.mediaRecorder.stop();
  }
  download() {
    const blob = new Blob(this.recordedBlobs, { type: "video/mp4" });
    const a = document.createElement("a");
    a.setAttribute("download", Date.now() + ".mp4");
    a.href = URL.createObjectURL(blob);
    a.click();
  }
  play() {
    const { recordedBlobs, gumVideo2 } = this;
    const blob = new Blob(recordedBlobs, { type: "video/mp4" });
    const size = parseInt(blob.size / 1024);
    let strSize = "";
    if (size < 1024) {
      strSize = size + "KB";
    } else {
      strSize = (size / 1024).toFixed(2) + "MB";
    }
    alert("播放时长：" + this.duration + "秒, 大小：" + strSize);
    const videoURL = URL.createObjectURL(blob);
    gumVideo2.style.display = "";
    gumVideo2.src = videoURL;
  }
};
function throttle(func, wait, options) {
  let timeout;
  let context;
  let args;
  let result;
  let previous = 0;
  options = options || {};
  let later = function() {
    let now = (/* @__PURE__ */ new Date()).getTime();
    previous = options.leading === false ? 0 : now;
    timeout = null;
    result = func.apply(context, args);
    if (!timeout)
      context = args = null;
  };
  return function() {
    context = this;
    args = arguments;
    let now = (/* @__PURE__ */ new Date()).getTime();
    if (!previous && options.leading === false)
      previous = now;
    let remaining = wait - (now - previous);
    if (remaining <= 0 || remaining > wait) {
      clearTimeout(timeout);
      timeout = null;
      previous = now;
      result = func.apply(context, args);
      if (!timeout)
        context = args = null;
    } else if (!timeout && options.trailing !== false) {
      timeout = setTimeout(later, remaining);
    }
    return result;
  };
}
var scrollToTop = () => {
  const c = document.documentElement.scrollTop || document.body.scrollTop;
  if (c > 0) {
    window.requestAnimationFrame(scrollToTop);
    window.scrollTo(0, c - c / 8);
  }
};
var getScrollPosition = (el = window) => ({
  x: el.pageXOffset !== void 0 ? el.pageXOffset : el.scrollLeft,
  y: el.pageYOffset !== void 0 ? el.pageYOffset : el.scrollTop
});
var DigitScroll = class {
  constructor(options) {
    this.container = document.querySelector(options.container);
    if (!this.container) {
      throw Error("no container");
    }
    this.container.style.overflow = "hidden";
    this.container.style.display = "flex";
    this.rollHeight = parseInt(getComputedStyle(this.container).height) || 30;
    this.container.style.height = this.rollHeight + "px";
  }
  roll(num) {
    this.initDigitEle(num);
    const numEles = this.container.querySelectorAll(".single-num");
    [...numEles].forEach((numEle, index2) => {
      const curNum = 0;
      let targetNum = Number(this.numberArr[index2]);
      if (curNum >= targetNum) {
        targetNum = targetNum + 10;
      }
      let cirNum = curNum;
      const fragment = document.createDocumentFragment();
      while (targetNum >= cirNum) {
        const ele = document.createElement("div");
        ele.innerHTML = cirNum % 10;
        cirNum++;
        fragment.appendChild(ele);
      }
      numEle.innerHTML = "";
      numEle.appendChild(fragment);
      numEle.style.cssText += "-webkit-transition-duration:0s;-webkit-transform:translateY(0)";
      setTimeout(() => {
        numEle.style.cssText += `-webkit-transition-duration:1s;-webkit-transform:translateY(${-(targetNum - curNum) * this.rollHeight}px);`;
      }, 50);
    });
  }
  initDigitEle(num) {
    const numArr = num.toString().split("");
    const fragment = document.createDocumentFragment();
    numArr.forEach((item) => {
      const el = document.createElement("div");
      if (/[0-9]/.test(item)) {
        el.className = "single-num";
        el.style.height = this.rollHeight + "px";
        el.style.lineHeight = this.rollHeight + "px";
      } else {
        el.innerHTML = item;
        el.className = "no-move";
        el.style.verticalAlign = "bottom";
      }
      fragment.appendChild(el);
    }, []);
    this.container.innerHTML = "";
    this.container.appendChild(fragment);
    this.numberArr = numArr.filter((item) => /[0-9]/.test(item));
  }
};
function randomRgbColor() {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);
  return `rgb(${r},${g},${b})`;
}
var DrawImage$1 = class {
  constructor(config) {
    this.images = {};
    this.bl = 2;
    this.cvs = config.el;
    this.bl = config.bl;
    this.ctx = this.cvs.getContext("2d");
    this.cvs.width = this.cvs.width * this.bl;
    this.cvs.height = this.cvs.height * this.bl;
    this.renderList = config.renderList;
    this.draw();
  }
  async draw() {
    const { ctx, renderList: renderList2 } = this;
    const urls = renderList2.filter((v) => v.type === "image").map((v) => v.src);
    await this.loadImgs(urls);
    renderList2.forEach((v) => {
      v.align && (ctx.textAlign = v.align);
      if (v.type === "image") {
        ctx.beginPath();
        ctx.save();
        if (v.clipCircle) {
          ctx.lineWidth = v.clipLineWidth;
          ctx.strokeStyle = v.clipStrokeStyle;
          ctx.arc((v.x + v.width / 2) * this.bl, (v.y + v.width / 2) * this.bl, v.width / 2 * this.bl, 0, Math.PI * 2);
          ctx.stroke();
          ctx.clip();
        }
        ctx.drawImage(this.images[v.src], v.x * this.bl, v.y * this.bl, v.width * this.bl, v.height * this.bl);
        ctx.restore();
      } else if (v.type === "text") {
        ctx.fillStyle = v.fillStyle;
        ctx.font = `${v.fontSize * this.bl}px 宋体`;
        ctx.fillText(v.text, v.x * this.bl, v.y * this.bl);
      }
    });
  }
  async loadImgs(urls) {
    for (let i = 0; i < urls.length; i++) {
      await this.loadImg(urls[i]);
    }
  }
  async loadImg(url) {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.src = url;
      img.onload = () => {
        this.images[url] = img;
        resolve(img);
      };
    });
  }
};
var useThrottle = throttle;
var useGetScrollPosition = getScrollPosition;
var useScrollToTop = scrollToTop;
var useDigitScroll = DigitScroll;
var useRandomRgbColor = randomRgbColor;
var useRecordingVideo = RecordingVideo;
var useDrawImage = DrawImage$1;
var __default__$c = defineComponent({
  name: "DigitalScroll"
});
var _sfc_main$d = defineComponent({
  ...__default__$c,
  props: {
    targetNumber: {
      type: Number,
      default: () => 300
    },
    targetClass: {
      type: String,
      default: () => "digital-scroll"
    }
  },
  setup(__props) {
    const props = __props;
    onMounted(() => {
      const DigitScrollSource = new useDigitScroll({
        container: "#digital-scroll"
      });
      DigitScrollSource.roll(props.targetNumber);
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", {
        class: normalizeClass(__props.targetClass),
        id: "digital-scroll"
      }, null, 2);
    };
  }
});
var DigitalScroll = _export_sfc(_sfc_main$d, [["__scopeId", "data-v-45c23839"]]);
DigitalScroll.install = (App) => {
  App.component(DigitalScroll.name, DigitalScroll);
};
var _hoisted_1$a = ["disabled"];
var __default__$b = defineComponent({
  name: "AlanButton"
});
var _sfc_main$c = defineComponent({
  ...__default__$b,
  props: {
    type: {
      type: String,
      default: "default"
    },
    disabled: {
      type: Boolean,
      default: false
    },
    block: {
      type: Boolean,
      default: false
    }
  },
  setup(__props) {
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("button", {
        disabled: __props.disabled,
        class: normalizeClass(["btn", __props.block && "block", __props.disabled && "disabled", __props.type])
      }, [
        renderSlot(_ctx.$slots, "default", {}, void 0, true)
      ], 10, _hoisted_1$a);
    };
  }
});
var AlanButton = _export_sfc(_sfc_main$c, [["__scopeId", "data-v-3313c991"]]);
AlanButton.install = (App) => {
  App.component(AlanButton.name, Button);
};
var _hoisted_1$9 = ["height", "width"];
var __default__$a = defineComponent({
  name: "CodeBackgroundWall"
});
var _sfc_main$b = defineComponent({
  ...__default__$a,
  props: {
    width: {
      type: Number,
      default: 300
    },
    height: {
      type: Number,
      default: 300
    },
    step: {
      type: Number,
      default: 0.02
    },
    color: {
      type: String,
      default: "green"
    }
  },
  setup(__props) {
    const props = __props;
    const cvs = ref(null);
    onMounted(() => {
      const el = cvs.value;
      el.width = props.width;
      el.height = props.height;
      const c = el.getContext("2d");
      const text = "qwertyuiopasdfghjklzxcvbnm";
      c.font = "14px 微软雅黑";
      const bl = 20;
      const startRates = {};
      const rates = {};
      const endRates = {};
      const textObj = {};
      const animate = () => {
        c.clearRect(0, 0, props.width, props.height);
        for (let i = 0; i < props.width; i += bl) {
          c.beginPath();
          const gradient = c.createLinearGradient(0, 0, 0, props.height);
          const s1 = 0.2 * Math.random();
          const s2 = 0.8 * Math.random();
          const step = props.step;
          rates[i] = rates[i] || -s1;
          startRates[i] = startRates[i] || s2;
          endRates[i] = endRates[i] || 0;
          gradient.addColorStop(startRates[i] < 0 ? 0 : startRates[i], "#000");
          gradient.addColorStop(rates[i] < 0 ? 0 : rates[i], props.color);
          gradient.addColorStop(endRates[i], "#000");
          c.fillStyle = gradient;
          for (let j = 0; j < props.height; j += bl) {
            textObj[`${i}-${j}`] = textObj[`${i}-${j}`] || text[parseInt(Math.random() * text.length)];
            c.fillText(textObj[`${i}-${j}`], i, j);
          }
          startRates[i] += step;
          rates[i] += step;
          endRates[i] += step;
          if (startRates[i] > 1) {
            startRates[i] = -s2;
          }
          if (rates[i] > 1) {
            if (startRates[i] === -s2) {
              rates[i] = -s1;
            } else {
              rates[i] = 1;
            }
          }
          if (endRates[i] > 1) {
            if (rates[i] === -s1 && startRates[i] === -s2) {
              endRates[i] = step;
            } else {
              endRates[i] = 1;
            }
          }
        }
        requestAnimationFrame(animate);
      };
      animate();
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("canvas", {
        ref_key: "cvs",
        ref: cvs,
        id: "cvs",
        height: __props.height,
        width: __props.width,
        class: "cvs"
      }, null, 8, _hoisted_1$9);
    };
  }
});
var CodeBackgroundWall = _export_sfc(_sfc_main$b, [["__scopeId", "data-v-f79d4606"]]);
CodeBackgroundWall.install = (App) => {
  App.component(CodeBackgroundWall.name, CodeBackgroundWall);
};
var _hoisted_1$8 = {
  key: 0,
  class: "alan-back-top-content"
};
var __default__$9 = defineComponent({
  name: "AlanBackTop"
});
var _sfc_main$a = defineComponent({
  ...__default__$9,
  props: {
    visibilityHeight: {
      type: Number,
      default: 400
    }
  },
  emits: ["goTopCompleteCb"],
  setup(__props, { emit: parentEmits }) {
    const props = __props;
    const slotDefault = !!useSlots().default;
    const visibilityH = ref(false);
    onMounted(() => {
      window.addEventListener("scroll", useThrottle(() => {
        scrollLoadMore();
      }, 250));
    });
    onBeforeUnmount(() => {
      window.removeEventListener("scroll", () => {
      });
    });
    const handleBackTop = () => {
      useScrollToTop();
      parentEmits("goTopCompleteCb");
    };
    const scrollLoadMore = () => {
      visibilityH.value = useGetScrollPosition().y >= props.visibilityHeight;
    };
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", {
        class: "alan-back-top",
        onClick: handleBackTop
      }, [
        createBaseVNode("div", {
          class: normalizeClass(["warp", visibilityH.value && "visibilityH"])
        }, [
          !slotDefault ? (openBlock(), createElementBlock("div", _hoisted_1$8, " 返回 ")) : createCommentVNode("", true),
          renderSlot(_ctx.$slots, "default", {}, void 0, true)
        ], 2)
      ]);
    };
  }
});
var BackTop = _export_sfc(_sfc_main$a, [["__scopeId", "data-v-2fc49e58"]]);
BackTop.install = (App) => {
  App.component(BackTop.name, BackTop);
};
var _sfc_main$9 = {
  name: "DynamicCard",
  props: {
    cardList: {
      type: Array,
      default: []
    },
    shape: {
      type: Number,
      default: 1
    },
    isKeyboardControl: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      activeIndex: -1,
      cards: []
    };
  },
  watch: {
    shape: function() {
      this.initData();
    }
  },
  created() {
    this.initData();
  },
  mounted() {
    this.isKeyboardControl && window.addEventListener("keyup", this.keyboardDeal);
  },
  unmounted() {
    this.isKeyboardControl && window.removeEventListener("keyup", this.keyboardDeal);
  },
  methods: {
    initData() {
      const arr = new Array(this.cardList.length).fill(1);
      this.cards = arr.map((_, index2) => {
        return this.computedStyle(index2, this.cardList.length || 0);
      });
    },
    resetData(style) {
      this.style = style;
      this.initData();
    },
    computedStyle(index2, length) {
      const style = this.shape;
      const defaultStyles = {
        "--max-index": length + 1,
        "--bg-color": useRandomRgbColor(),
        "--card-index": index2
      };
      if (style === 0) {
        defaultStyles["left"] = `${16 * ++index2}px`;
      } else if (style === 1) {
        let rotate = 0;
        if (index2 % 2 === 1) {
          rotate = length - index2;
        } else {
          rotate = index2 - length;
        }
        defaultStyles["--rotate-deg"] = rotate + "deg";
      } else {
        const tangle = 48;
        const unitArc = tangle / length;
        let rotate = unitArc * index2 - 48 / 2;
        defaultStyles["--rotate-deg"] = rotate + "deg";
      }
      return defaultStyles;
    },
    addIndex() {
      if (this.activeIndex < this.cards.length - 1) {
        this.activeIndex++;
      } else {
        this.activeIndex = 0;
      }
    },
    lessIndex() {
      if (this.activeIndex > 0) {
        this.activeIndex--;
      } else {
        this.activeIndex = this.cards.length - 1;
      }
    },
    keyboardDeal(e) {
      if (document.activeElement !== document.body)
        return;
      const keyMap = /* @__PURE__ */ new Map([
        [38, "addIndex"],
        [40, "lessIndex"],
        [37, "lessIndex"],
        [39, "addIndex"]
      ]);
      keyMap.get(e.keyCode) && this[keyMap.get(e.keyCode)]();
    }
  }
};
var _hoisted_1$7 = { class: "AnimationCards" };
var _hoisted_2$4 = { class: "demo-content" };
var _hoisted_3$3 = { class: "animation-cards-box" };
var _hoisted_4$2 = ["onClick"];
var _hoisted_5$2 = { class: "text-span" };
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", _hoisted_1$7, [
    createBaseVNode("div", _hoisted_2$4, [
      createBaseVNode("div", _hoisted_3$3, [
        (openBlock(true), createElementBlock(Fragment, null, renderList($data.cards, (styles, index2) => {
          return openBlock(), createElementBlock("div", {
            class: normalizeClass(["animation-card", { "is-active": $data.activeIndex === index2, "is-clutter": !!$props.shape, "is-list": !$props.shape }]),
            key: index2,
            style: normalizeStyle(styles),
            onClick: ($event) => $data.activeIndex = $data.activeIndex === index2 ? -1 : index2
          }, [
            createBaseVNode("span", _hoisted_5$2, toDisplayString($props.cardList[index2].text), 1)
          ], 14, _hoisted_4$2);
        }), 128))
      ])
    ])
  ]);
}
var DynamicCard = _export_sfc(_sfc_main$9, [["render", _sfc_render], ["__scopeId", "data-v-393e8e1d"]]);
DynamicCard.install = (App) => {
  App.component(DynamicCard.name, DynamicCard);
};
var _hoisted_1$6 = { class: "camera_outer" };
var _hoisted_2$3 = ["width", "height"];
var _hoisted_3$2 = ["width", "height"];
var _hoisted_4$1 = {
  key: 0,
  class: "img_bg_camera"
};
var _hoisted_5$1 = createBaseVNode("h2", null, "效果预览", -1);
var _hoisted_6$1 = ["src"];
var _hoisted_7$1 = { class: "button" };
var __default__$8 = defineComponent({
  name: "TakingPictures"
});
var _sfc_main$8 = Object.assign(__default__$8, {
  props: {
    autoGetCompetence: {
      type: Boolean,
      default: false
    }
  },
  setup(__props) {
    const props = __props;
    const state = reactive({
      videoWidth: 250,
      videoHeight: 350,
      imgSrc: "",
      thisCancas: null,
      thisContext: null,
      thisVideo: null,
      openVideo: false
    });
    onMounted(() => {
      props.autoGetCompetence && getCompetence();
    });
    const getCompetence = () => {
      state.thisCancas = document.getElementById("canvasCamera");
      state.thisContext = state.thisCancas.getContext("2d");
      state.thisVideo = document.getElementById("videoCamera");
      state.thisVideo.style.display = "block";
      if (navigator.mediaDevices === void 0) {
        navigator.mediaDevices = {};
      }
      if (navigator.mediaDevices.getUserMedia === void 0) {
        navigator.mediaDevices.getUserMedia = function(constraints2) {
          var getUserMedia = navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.getUserMedia;
          if (!getUserMedia) {
            return Promise.reject(
              new Error("getUserMedia is not implemented in this browser")
            );
          }
          return new Promise(function(resolve, reject) {
            getUserMedia.call(navigator, constraints2, resolve, reject);
          });
        };
      }
      const constraints = {
        audio: false,
        video: {
          width: state.videoWidth,
          height: state.videoHeight,
          transform: "scaleX(-1)"
        }
      };
      navigator.mediaDevices.getUserMedia(constraints).then(function(stream) {
        if ("srcObject" in state.thisVideo) {
          state.thisVideo.srcObject = stream;
        } else {
          state.thisVideo.src = window.URL.createObjectURL(stream);
        }
        state.thisVideo.onloadedmetadata = function(e) {
          state.thisVideo.play();
        };
      }).catch((err) => {
        console.log(err);
      });
    };
    const setImage = () => {
      state.thisContext.drawImage(
        state.thisVideo,
        0,
        0,
        state.videoWidth,
        state.videoHeight
      );
      const image = state.thisCancas.toDataURL("image/png");
      state.imgSrc = image;
    };
    const stopNavigator = () => {
      state.thisVideo.srcObject.getTracks()[0].stop();
    };
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1$6, [
        createBaseVNode("video", {
          id: "videoCamera",
          width: state.videoWidth,
          height: state.videoHeight,
          autoplay: ""
        }, null, 8, _hoisted_2$3),
        createBaseVNode("canvas", {
          style: { "display": "none" },
          id: "canvasCamera",
          width: state.videoWidth,
          height: state.videoHeight
        }, null, 8, _hoisted_3$2),
        state.imgSrc ? (openBlock(), createElementBlock("div", _hoisted_4$1, [
          _hoisted_5$1,
          createBaseVNode("img", {
            src: state.imgSrc,
            alt: "",
            class: "tx_img"
          }, null, 8, _hoisted_6$1)
        ])) : createCommentVNode("", true),
        createBaseVNode("div", _hoisted_7$1, [
          createBaseVNode("button", {
            onClick: _cache[0] || (_cache[0] = ($event) => getCompetence()),
            type: "primary"
          }, "打开摄像头"),
          createBaseVNode("button", {
            onClick: _cache[1] || (_cache[1] = ($event) => stopNavigator()),
            type: "warning"
          }, "关闭摄像头"),
          createBaseVNode("button", {
            onClick: _cache[2] || (_cache[2] = ($event) => setImage()),
            type: "success"
          }, "拍照")
        ])
      ]);
    };
  }
});
_sfc_main$8.install = (App) => {
  App.component(_sfc_main$8.name, _sfc_main$8);
};
var _withScopeId = (n) => (pushScopeId("data-v-47e5d9bc"), n = n(), popScopeId(), n);
var _hoisted_1$5 = { class: "container flex-row j_c" };
var _hoisted_2$2 = { class: "container-box" };
var _hoisted_3$1 = { class: "box-lines" };
var _hoisted_4 = { class: "left" };
var _hoisted_5 = { class: "right" };
var _hoisted_6 = { class: "box-pan" };
var _hoisted_7 = _withScopeId(() => createBaseVNode("div", { class: "box-shadow" }, null, -1));
var _hoisted_8 = { class: "bottom-center" };
var _hoisted_9 = { class: "container-title" };
var _hoisted_10 = _withScopeId(() => createBaseVNode("text", null, "C", -1));
var __default__$7 = defineComponent({
  name: "TherMometer"
});
var _sfc_main$7 = Object.assign(__default__$7, {
  props: {
    show: {
      type: Boolean,
      default: false
    },
    data: {
      type: Object,
      default: () => {
      },
      required: true
    }
  },
  setup(__props) {
    const props = __props;
    let step = parseInt(props.data.max) / 4, stepList = [], currPer = parseInt(props.data.value) / parseInt(props.data.max), warnPer = 0;
    if (parseInt(props.data.value) > parseInt(props.data.warn)) {
      warnPer = (parseInt(props.data.value) - parseInt(props.data.warn)) / parseInt(props.data.max);
    }
    for (let i = 0; i < 5; i++) {
      stepList.unshift(step * i);
    }
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("section", _hoisted_1$5, [
        createBaseVNode("div", _hoisted_2$2, [
          createBaseVNode("div", _hoisted_3$1, [
            (openBlock(true), createElementBlock(Fragment, null, renderList(unref(stepList), (item, index2) => {
              return openBlock(), createElementBlock("div", {
                key: index2,
                class: "line-item flex-row j_b"
              }, [
                createBaseVNode("div", _hoisted_4, toDisplayString(item), 1),
                createBaseVNode("div", _hoisted_5, toDisplayString(item), 1)
              ]);
            }), 128))
          ]),
          createBaseVNode("div", _hoisted_6, [
            _hoisted_7,
            createBaseVNode("div", {
              class: normalizeClass([
                "bottom-circle",
                __props.show && (__props.data.value >= 0 ? "active" : "trans")
              ])
            }, null, 2),
            withDirectives(createBaseVNode("div", _hoisted_8, [
              createBaseVNode("div", {
                class: normalizeClass(["active", unref(currPer) >= 0.94 && "br", __props.show && "trans"]),
                style: normalizeStyle({ "--per": unref(currPer) < 1 ? unref(currPer) : 1 })
              }, [
                withDirectives(createBaseVNode("div", {
                  class: normalizeClass(["bottom-warn", unref(currPer) >= 0.94 && "br"]),
                  style: normalizeStyle({ "--per": unref(warnPer) < 1 ? unref(warnPer) : 1 })
                }, null, 6), [
                  [vShow, __props.data.value > __props.data.warn]
                ])
              ], 6)
            ], 512), [
              [vShow, __props.data.value >= 0]
            ])
          ])
        ]),
        createBaseVNode("div", _hoisted_9, [
          createTextVNode(toDisplayString(__props.data.value) + "°", 1),
          _hoisted_10
        ])
      ]);
    };
  }
});
var TherMometer = _export_sfc(_sfc_main$7, [["__scopeId", "data-v-47e5d9bc"]]);
TherMometer.install = (App) => {
  App.component(TherMometer.name, TherMometer);
};
var _hoisted_1$4 = { id: "canvas" };
var __default__$6 = defineComponent({
  name: "YuanWar"
});
var _sfc_main$6 = defineComponent({
  ...__default__$6,
  props: {
    width: {
      type: Number,
      default: () => 800
    },
    height: {
      type: Number,
      default: () => 800
    }
  },
  setup(__props) {
    const props = __props;
    onMounted(() => {
      const canvas = document.getElementById("canvas");
      const ctx = canvas.getContext("2d");
      const WIDTH = props.width;
      const HEIGHT = props.height;
      canvas.height = HEIGHT;
      canvas.width = WIDTH;
      const intersectionDetection = (circle, anotherCircle) => {
        const distance = Math.sqrt(Math.pow(circle.x - anotherCircle.x, 2) + Math.pow(circle.y - anotherCircle.y, 2));
        return distance < circle.radius + anotherCircle.radius;
      };
      function drawCircle(cx, cy, radius, color, shadow) {
        ctx.beginPath();
        ctx.arc(cx, cy, radius, 0, 2 * Math.PI);
        ctx.shadowColor = shadow ? color : "";
        ctx.shadowBlur = shadow ? radius : 0;
        ctx.fillStyle = color;
        ctx.fill();
      }
      class King {
        constructor() {
          this.hp = 100;
          this.x = 200;
          this.y = 200;
          this.color = "purple";
        }
        draw() {
          drawCircle(this.x, this.y, 16, this.color, true);
        }
      }
      class Bullet {
        constructor(angle) {
          this.angle = angle;
          this.damage = 3;
          this.x = 200;
          this.y = 200;
          this.speed = 4;
          this.state = 1;
          this.color = "yellow";
          this.radius = 4;
        }
        move() {
          this.x += Math.cos(this.angle * Math.PI / 180) * this.speed;
          this.y += Math.sin(this.angle * Math.PI / 180) * this.speed;
        }
        draw() {
          if (!this.state)
            return;
          drawCircle(this.x, this.y, this.radius, this.color, true);
        }
        intersectionDetection(enemies) {
          const intersectionEnemy = enemies.find((enemy) => {
            return enemy.state && intersectionDetection(enemy, this);
          });
          if (intersectionEnemy) {
            this.state = 0;
            intersectionEnemy.hurt(this);
          }
        }
      }
      class Enemy {
        constructor() {
          this.x = -10;
          this.y = 200;
          this.speed = 0.2;
          this.color = "red";
          this.state = 1;
          this.radius = 6;
          this.hp = 3;
        }
        draw() {
          if (!this.state)
            return;
          drawCircle(this.x, this.y, this.radius, this.color, true);
        }
        move() {
          this.x += this.speed;
        }
        hurt(bullet) {
          this.hp -= bullet.damage;
          if (this.hp <= 0) {
            this.state = 0;
          }
        }
      }
      const computeAngle = (x, y) => {
        const distance = Math.sqrt(x * x + y * y);
        const angle = Math.asin(y / distance) * 180 / Math.PI;
        return +(x > 0 ? angle : 180 - angle).toFixed(2);
      };
      class Mouse {
        constructor() {
          this.angle = 0;
          this.x = 0;
          this.y = 0;
          this.moveHandler = this._moveHandler.bind(this);
        }
        _moveHandler(e) {
          const clientRect = canvas.getClientRects()[0];
          const x = e.pageX - (clientRect == null ? void 0 : clientRect.x);
          const y = e.pageY - (clientRect == null ? void 0 : clientRect.y);
          this.x = x;
          this.y = y;
          this.angle = computeAngle(x - 200, y - 200);
        }
        on() {
          document.addEventListener("mousemove", this.moveHandler);
        }
        off() {
          document.removeEventListener("mousemove", this.moveHandler);
        }
      }
      const BULLET_CD = 30;
      const ENEMY_CD = 300;
      const game = {
        bulletCD: 0,
        enemyCD: 0,
        start() {
          this.king = new King();
          this.enemies = [];
          this.bullets = [];
          this.mouse = new Mouse();
          this.mouse.on();
          this.loop();
        },
        loop() {
          requestAnimationFrame(() => this.loop());
          this.draw();
          this.move();
          this.intersectionDetection();
          this.cd();
        },
        cd() {
          if (this.bulletCD-- < 1) {
            this.bullets.push(new Bullet(this.mouse.angle));
            this.bulletCD = BULLET_CD;
          }
          if (this.enemyCD-- < 1) {
            this.enemies.push(new Enemy());
            this.enemyCD = ENEMY_CD;
          }
        },
        intersectionDetection() {
          this.bullets.forEach((bullet) => {
            bullet.intersectionDetection(this.enemies);
          });
        },
        draw() {
          ctx.clearRect(0, 0, WIDTH, HEIGHT);
          this.king.draw();
          this.enemies.forEach((enemy) => enemy.draw());
          this.bullets.forEach((bullet) => bullet.draw());
        },
        move() {
          this.enemies.forEach((enemy) => enemy.move());
          this.bullets.forEach((bullet) => bullet.move());
        }
      };
      game.start();
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("canvas", _hoisted_1$4);
    };
  }
});
_sfc_main$6.install = (App) => {
  App.component(_sfc_main$6.name, _sfc_main$6);
};
var _hoisted_1$3 = ["width", "height"];
var __default__$5 = defineComponent({
  name: "Clocks"
});
var _sfc_main$5 = Object.assign(__default__$5, {
  props: {
    width: {
      type: Number,
      default: 500
    },
    height: {
      type: Number,
      default: 500
    },
    backgroundColor: {
      type: String,
      default: "#03303a"
    }
  },
  setup(__props) {
    const props = __props;
    onMounted(() => {
      let canvas = document.getElementById("canvas");
      let ctx = canvas.getContext("2d");
      ctx.strokeStyle = "#7FFFD4";
      ctx.lineWidth = 3;
      ctx.shadowBlur = 5;
      ctx.shadowColor = "#7FFFD4";
      let milliseconds = 0;
      let minutes = 0;
      let hour = 0;
      let date = "";
      let ctxBack = canvas.getContext("2d");
      let numBack = canvas.getContext("2d");
      ctxBack.lineWidth = 1;
      ctxBack.shadowBlur = 0;
      ctxBack.shadowColor = "#F0F8FF";
      function pageInit() {
        showTime();
        showBack();
        drawSecPin();
        drawMinPin();
        drawHouPin();
        setPoint();
        setNum();
      }
      function setNum() {
        numBack.save();
        numBack.translate(250, 250);
        numBack.beginPath();
        numBack.fillStyle = "#7FFFD4";
        numBack.font = "30px Helvetica";
        for (let i = 0; i < 60; i++) {
          if (i % 5 == 0) {
            numBack.lineWidth = 5;
            let xPoint = Math.sin(i * 6 * 2 * Math.PI / 360) * 195;
            let yPoint = -Math.cos(i * 6 * 2 * Math.PI / 360) * 195;
            numBack.fillText(i == 0 ? 12 : i / 5, i == 0 ? -15 : xPoint - 10, i == 0 ? -185 : i <= 30 ? yPoint + 5 : yPoint + 10);
          }
        }
        numBack.stroke();
        numBack.closePath();
        numBack.restore();
      }
      function drawSecPin() {
        ctxBack.save();
        ctxBack.translate(250, 250);
        ctxBack.rotate(milliseconds / 60 * 2 * Math.PI);
        ctxBack.beginPath();
        ctxBack.strokeStyle = "#AFEEEE";
        ctxBack.lineWidth = 1;
        ctxBack.lineJoin = "bevel";
        ctxBack.miterLimit = 10;
        ctxBack.moveTo(0, 30);
        ctxBack.lineTo(3, -175);
        ctxBack.lineTo(13, -165);
        ctxBack.lineTo(0, -210);
        ctxBack.lineTo(-13, -165);
        ctxBack.lineTo(-3, -175);
        ctxBack.lineTo(0, 30);
        ctxBack.stroke();
        ctxBack.closePath();
        ctxBack.restore();
      }
      function drawMinPin() {
        ctxBack.save();
        ctxBack.translate(250, 250);
        ctxBack.rotate(minutes * 6 * Math.PI / 180);
        ctxBack.beginPath();
        ctxBack.strokeStyle = "#20B2AA";
        ctxBack.lineWidth = 1;
        ctxBack.lineJoin = "bevel";
        ctxBack.miterLimit = 10;
        ctxBack.moveTo(0, 20);
        ctxBack.lineTo(3, -145);
        ctxBack.lineTo(10, -135);
        ctxBack.lineTo(0, -180);
        ctxBack.lineTo(-10, -135);
        ctxBack.lineTo(-3, -145);
        ctxBack.lineTo(0, 20);
        ctxBack.stroke();
        ctxBack.closePath();
        ctxBack.restore();
      }
      function drawHouPin() {
        ctxBack.save();
        ctxBack.translate(250, 250);
        ctxBack.rotate(hour * 30 * Math.PI / 180);
        ctxBack.beginPath();
        ctxBack.strokeStyle = "#87CEFA";
        ctxBack.lineWidth = 1;
        ctxBack.lineJoin = "bevel";
        ctxBack.miterLimit = 10;
        ctxBack.moveTo(0, 20);
        ctxBack.lineTo(3, -110);
        ctxBack.lineTo(10, -100);
        ctxBack.lineTo(0, -150);
        ctxBack.lineTo(-10, -100);
        ctxBack.lineTo(-3, -110);
        ctxBack.lineTo(0, 20);
        ctxBack.stroke();
        ctxBack.closePath();
        ctxBack.restore();
      }
      function setPoint() {
        ctxBack.beginPath();
        ctxBack.fillStyle = "black";
        ctxBack.arc(250, 250, 3, 0, 2 * Math.PI);
        ctxBack.stroke();
      }
      function showBack() {
        for (let i = 0; i < 60; i++) {
          ctxBack.save();
          ctxBack.translate(250, 250);
          ctxBack.rotate(i / 60 * 2 * Math.PI);
          ctxBack.beginPath();
          ctxBack.strokeStyle = "#7FFFD4";
          ctxBack.moveTo(0, -250);
          ctxBack.lineWidth = i % 5 == 0 ? 5 : 2;
          ctxBack.lineTo(0, -230);
          ctxBack.stroke();
          ctxBack.closePath();
          ctxBack.restore();
        }
        ctxBack.beginPath();
        ctxBack.arc(250, 250, 230, 0, 2 * Math.PI);
        ctxBack.stroke();
      }
      function degToRad(degree) {
        let result;
        let factor = Math.PI / 180;
        if (degree == 0) {
          result = 270 * factor;
        } else {
          result = degree * factor;
        }
        return result;
      }
      function showTime() {
        let now = /* @__PURE__ */ new Date();
        let today = now.toLocaleDateString();
        let time = now.toLocaleTimeString();
        let day = now.getDay();
        let hrs = now.getHours();
        let min = now.getMinutes();
        let sec = now.getSeconds();
        let mil = now.getMilliseconds();
        let smoothsec = sec + mil / 1e3;
        let smoothmin = min + smoothsec / 60;
        let hours = hrs + smoothmin / 60;
        milliseconds = smoothsec;
        minutes = smoothmin;
        hour = hours;
        switch (day) {
          case 1:
            date = "一";
            break;
          case 2:
            date = "二";
            break;
          case 3:
            date = "三";
            break;
          case 4:
            date = "四";
            break;
          case 5:
            date = "五";
            break;
          case 6:
            date = "六";
            break;
          case 0:
            date = "日";
            break;
        }
        const gradient = ctx.createRadialGradient(250, 250, 5, 250, 250, 300);
        gradient.addColorStop(0, "#03303a");
        gradient.addColorStop(1, "#03303a");
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, props.width, props.height);
        ctx.beginPath();
        ctx.strokeStyle = "#87CEFA";
        ctx.arc(250, 250, 215, degToRad(0), degToRad(hours * 30 - 90));
        ctx.stroke();
        ctx.beginPath();
        ctx.strokeStyle = "#20B2AA";
        ctx.arc(250, 250, 220, degToRad(0), degToRad(smoothmin * 6 - 90));
        ctx.stroke();
        ctx.beginPath();
        ctx.strokeStyle = "#AFEEEE";
        ctx.arc(250, 250, 225, degToRad(0), degToRad(smoothsec * 6 - 90));
        ctx.stroke();
        ctx.font = "25px Helvetica Bold";
        ctx.fillStyle = "#7FFFD4";
        ctx.fillText(today + "/星期" + date, 150, 230);
        ctx.font = "23px Helvetica Bold";
        ctx.fillStyle = "#7FFFD4";
        ctx.fillText(time, 190, 280);
      }
      setInterval(pageInit, 60);
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("canvas", {
        id: "canvas",
        width: __props.width,
        height: __props.height
      }, null, 8, _hoisted_1$3);
    };
  }
});
_sfc_main$5.install = (App) => {
  App.component(_sfc_main$5.name, Button);
};
var _hoisted_1$2 = { class: "layui-body" };
var _hoisted_2$1 = createStaticVNode('<div id="container" data-v-177b98b4><video id="gum" autoplay muted data-v-177b98b4></video><div class="controls" data-v-177b98b4><button id="record" disabled data-v-177b98b4>开始录制</button><button id="play" disabled data-v-177b98b4>播放</button><button id="download" disabled data-v-177b98b4>下载</button><span id="tEl" data-v-177b98b4></span></div><video id="gum2" controls="controls" autoplay style="display:none;" data-v-177b98b4></video></div>', 1);
var _hoisted_3 = [
  _hoisted_2$1
];
var __default__$4 = defineComponent({
  name: "VideoRecording"
});
var _sfc_main$4 = Object.assign(__default__$4, {
  setup(__props) {
    onMounted(() => {
      new useRecordingVideo();
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1$2, _hoisted_3);
    };
  }
});
var VideoRecording = _export_sfc(_sfc_main$4, [["__scopeId", "data-v-177b98b4"]]);
VideoRecording.install = (App) => {
  App.component(VideoRecording.name, VideoRecording);
};
var __default__$3 = defineComponent({
  name: "Spotlight"
});
var _sfc_main$3 = Object.assign(__default__$3, {
  props: {
    width: {
      type: Number,
      default: 500
    },
    height: {
      type: Number,
      default: 500
    }
  },
  setup(__props) {
    const props = __props;
    onMounted(() => {
      document.querySelector("style").append(`canvas {
        position: fixed;
        left:0;
        top: 0;
        z-index: 9999;
        pointer-events: none;
    }`);
      document.body.appendChild(document.createElement("canvas"));
      const cvs = document.querySelector("canvas");
      const ctx = cvs.getContext("2d");
      cvs.width = props.width;
      cvs.height = props.height;
      const p = {
        x: 0,
        y: 0,
        r: 50
      };
      document.onmousemove = (e) => {
        p.x = e.clientX;
        p.y = e.clientY;
        render();
      };
      const render = () => {
        ctx.beginPath();
        ctx.clearRect(0, 0, cvs.width, cvs.height);
        var radial = ctx.createRadialGradient(p.x, p.y, p.r, p.x, p.y, p.r * 3);
        radial.addColorStop(0, "#fff");
        radial.addColorStop(1, "rgba(0, 0, 0, 0.5)");
        ctx.fillStyle = radial;
        ctx.fillRect(0, 0, cvs.width, cvs.height);
      };
      render();
    });
    return (_ctx, _cache) => {
      return null;
    };
  }
});
_sfc_main$3.install = (App) => {
  App.component(_sfc_main$3.name, Button);
};
var _hoisted_1$1 = ["width", "height"];
var __default__$2 = defineComponent({
  name: "DrawImage"
});
var _sfc_main$2 = defineComponent({
  ...__default__$2,
  props: {
    width: {
      type: Number,
      default: () => 500
    },
    height: {
      type: Number,
      default: () => 500
    },
    bl: {
      type: Number,
      default: () => 5
    },
    renderList: {
      type: Array,
      default: () => []
    }
  },
  setup(__props) {
    const props = __props;
    const cvs = ref("");
    onMounted(() => {
      new useDrawImage({
        el: cvs.value,
        bl: props.bl,
        renderList: props.renderList
      });
    });
    const download = () => {
      const a = document.createElement("a");
      a.href = cvs.value.toDataURL("image/png");
      a.setAttribute("download", "canvas.png");
      a.click();
    };
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock(Fragment, null, [
        createBaseVNode("canvas", {
          ref_key: "cvs",
          ref: cvs,
          id: "cvs",
          width: __props.width,
          height: __props.height,
          style: normalizeStyle(`width:${__props.width}px`)
        }, null, 12, _hoisted_1$1),
        createBaseVNode("div", null, [
          createBaseVNode("button", {
            onClick: _cache[0] || (_cache[0] = ($event) => download())
          }, "下载图片")
        ])
      ], 64);
    };
  }
});
var DrawImage = _export_sfc(_sfc_main$2, [["__scopeId", "data-v-bddadfbe"]]);
DrawImage.install = (App) => {
  App.component(DrawImage.name, DrawImage);
};
var __default__$1 = defineComponent({
  name: "CanvasAutograph"
});
var _sfc_main$1 = Object.assign(__default__$1, {
  props: {
    config: {
      type: Object,
      default: {
        width: 400,
        height: 200,
        lineWidth: 3,
        strokeStyle: "red",
        lineCap: "round",
        lineJoin: "round"
      }
    }
  },
  setup(__props) {
    const props = __props;
    const refs = ref("null");
    let canvas = null;
    let ctx = null;
    onMounted(() => {
      var _a, _b;
      canvas = refs.value;
      canvas.width = (_a = props.config) == null ? void 0 : _a.width;
      canvas.height = (_b = props.config) == null ? void 0 : _b.height;
      canvas.style.border = "1px solid #000";
      ctx = canvas.getContext("2d");
      ctx.fillStyle = "transparent";
      ctx.fillRect(
        0,
        0,
        props.config.width,
        props.config.height
      );
      const client = {
        offsetX: 0,
        offsetY: 0,
        endX: 0,
        endY: 0
      };
      const mobileStatus = /Mobile|Android|iPhone/i.test(navigator.userAgent);
      const init = (event) => {
        const { offsetX, offsetY, pageX, pageY } = mobileStatus ? event.changedTouches[0] : event;
        client.offsetX = offsetX;
        client.offsetY = offsetY;
        client.endX = pageX;
        client.endY = pageY;
        ctx.beginPath();
        ctx.lineWidth = props.config.lineWidth;
        ctx.strokeStyle = props.config.strokeStyle;
        ctx.lineCap = props.config.lineCap;
        ctx.lineJoin = props.config.lineJoin;
        ctx.moveTo(client.endX, client.endY);
        window.addEventListener(mobileStatus ? "touchmove" : "mousemove", draw);
      };
      const draw = (event) => {
        const { pageX, pageY } = mobileStatus ? event.changedTouches[0] : event;
        client.endX = pageX;
        client.endY = pageY;
        ctx.lineTo(pageX, pageY);
        ctx.stroke();
      };
      const cloaseDraw = () => {
        ctx.closePath();
        window.removeEventListener("mousemove", draw);
      };
      window.addEventListener(mobileStatus ? "touchstart" : "mousedown", init);
      window.addEventListener(mobileStatus ? "touchend" : "mouseup", cloaseDraw);
    });
    const cancel = () => {
      ctx.clearRect(0, 0, props.config.width, props.config.height);
    };
    const save = () => {
      canvas.toBlob((blob) => {
        const date = Date.now().toString();
        const a = document.createElement("a");
        a.download = `${date}.png`;
        a.href = URL.createObjectURL(blob);
        a.click();
        a.remove();
      });
    };
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock(Fragment, null, [
        createBaseVNode("canvas", {
          ref_key: "refs",
          ref: refs
        }, null, 512),
        createBaseVNode("div", null, [
          createBaseVNode("button", {
            onClick: _cache[0] || (_cache[0] = ($event) => cancel())
          }, "取消"),
          createBaseVNode("button", {
            onClick: _cache[1] || (_cache[1] = ($event) => save())
          }, "保存")
        ])
      ], 64);
    };
  }
});
_sfc_main$1.install = (App) => {
  App.component(_sfc_main$1.name, _sfc_main$1);
};
var _hoisted_1 = createBaseVNode("button", null, "点击开始", -1);
var _hoisted_2 = {
  ref: "canvas",
  class: "canvas"
};
var __default__ = defineComponent({
  name: "RedPacketRain"
});
var _sfc_main = Object.assign(__default__, {
  setup(__props) {
    onMounted(() => {
      const canvas = document.querySelector(".canvas");
      canvas.width = "400";
      canvas.height = "400";
      const cwidth = canvas.width;
      if (canvas.getContext) {
        let start = function() {
          let ball = new Ball(1, 3, getRandom(0, cwidth - 50), 0, canvas.clientWidth, canvas.clientHeight);
          ball.draw();
          arr.push(ball);
          setInterval(() => {
            let ball2 = new Ball(1, 3, getRandom(0, cwidth - 50), 0, canvas.clientWidth, canvas.clientHeight);
            ball2.draw();
            arr.push(ball2);
          }, 500);
          move();
        }, move = function() {
          ctx.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);
          for (let i = 0; i < arr.length; i++) {
            if (arr[i].y >= canvas.height) {
              arr.splice(i, 1);
              arr[i].move();
              arr[i].draw();
            } else {
              arr[i].move();
              arr[i].draw();
            }
          }
          window.requestAnimationFrame(move);
        }, getRandom = function(min, max) {
          return Math.ceil(Math.random() * (max - min) + min);
        };
        const ctx = canvas.getContext("2d");
        class Ball {
          constructor(speedX, speedY, x, y, boxWidth, boxHeight, width = 50, height = 50, color = "red") {
            this.speedY = speedY;
            this.speedX = speedX;
            this.x = x;
            this.y = y;
            this.boxWidth = boxWidth;
            this.boxHeight = boxHeight;
            this.width = width;
            this.height = height;
            this.color = color;
          }
          draw() {
            ctx.strokeStyle = this.color;
            ctx.strokeRect(this.x, this.y, this.width, this.height);
          }
          move() {
            this.y += this.speedY;
          }
        }
        let arr = [];
        document.querySelector("button").onclick = start;
        document.querySelector(".canvas").onclick = function(e) {
          const clickX = e.clientX - canvas.offsetLeft;
          const clickY = e.clientY - canvas.offsetTop;
          for (let i = 0; i < arr.length; i++) {
            if (arr[i].x <= clickX && arr[i].x + arr[i].width >= clickX && arr[i].y <= clickY && arr[i].y + arr[i].height >= clickY) {
              console.log(arr[i]);
              arr[i].color = "green";
              continue;
            }
          }
        };
      }
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock(Fragment, null, [
        _hoisted_1,
        createBaseVNode("canvas", _hoisted_2, " 浏览器版本较低 ", 512)
      ], 64);
    };
  }
});
_sfc_main.install = (App) => {
  App.component(_sfc_main.name, _sfc_main);
};
var WaterMark = class {
  constructor(waterTexts, needAddWaterTextElementIds) {
    __publicField(this, "waterTexts", []);
    __publicField(this, "needAddWaterTextElementIds", null);
    __publicField(this, "saveNeedAddWaterMarkElement", []);
    if (waterTexts && waterTexts.length != 0) {
      this.waterTexts = waterTexts;
    } else {
      this.waterTexts = ["水印文字哈哈哈哈", "2022-12-08"];
    }
    this.needAddWaterTextElementIds = Array.isArray(needAddWaterTextElementIds) ? needAddWaterTextElementIds : [needAddWaterTextElementIds];
  }
  startWaterMark() {
    const self = this;
    if (this.needAddWaterTextElementIds) {
      this.needAddWaterTextElementIds.forEach((id) => {
        let el = document.getElementById(id);
        self.saveNeedAddWaterMarkElement.push(el);
      });
    } else {
      this.saveNeedAddWaterMarkElement = Array.from(document.getElementsByTagName("img"));
    }
    this.saveNeedAddWaterMarkElement.forEach((el) => {
      self.startWaterMarkToElement(el);
    });
  }
  startWaterMarkToElement(el) {
    let nodeName = el.nodeName;
    if (["IMG", "img"].indexOf(nodeName) != -1) {
      this.addWaterMarkToImg(el);
    } else {
      this.addWaterMarkToNormalEle(el);
    }
  }
  async addWaterMarkToImg(img) {
    if (!img.complete) {
      await new Promise((resolve) => {
        img.onload = resolve;
      });
    }
    this.addWaterMarkToNormalEle(img);
  }
  addWaterMarkToNormalEle(el) {
    const self = this;
    let canvas = document.createElement("canvas");
    canvas.width = el.width ? el.width : el.clientWidth;
    canvas.height = el.height ? el.height : el.clientHeight;
    let ctx = canvas.getContext("2d");
    let maxSize = Math.max(canvas.height, canvas.width);
    let font = maxSize / 25;
    ctx.font = font + 'px "微软雅黑"';
    ctx.fillStyle = "rgba(195,195,195,1)";
    ctx.textAlign = "left";
    ctx.textBaseline = "top";
    ctx.save();
    let angle = -Math.PI / 10;
    let translateX = canvas.height * Math.tan(Math.abs(angle));
    let translateY = (canvas.width - translateX) * Math.tan(Math.abs(angle));
    ctx.translate(-translateX / 2, translateY / 2);
    ctx.rotate(angle);
    let x = 0;
    let y = 0;
    let sepY = font / 2;
    while (y < canvas.height) {
      let rowCurrentMaxY = 0;
      while (x < canvas.width) {
        let totleMaxX = 0;
        let currentY = 0;
        this.waterTexts.forEach((text, index2) => {
          currentY += index2 * (sepY + font);
          let rect = self.drawWater(ctx, text, x, y + currentY);
          let currentMaxX = rect.x + rect.width;
          totleMaxX = currentMaxX > totleMaxX ? currentMaxX : totleMaxX;
          rowCurrentMaxY = currentY;
        });
        x = totleMaxX + 20;
      }
      x = 0;
      y += rowCurrentMaxY + (sepY + font + canvas.height / 5);
    }
    ctx.restore();
    this.addCanvas(canvas, el);
  }
  drawWater(ctx, text, x, y) {
    ctx.fillText(text, x, y);
    let textRect = ctx.measureText(text);
    let width = textRect.width;
    let height = textRect.height;
    return { x, y, width, height };
  }
  addCanvas(canvas, el) {
    let warterMarDiv = document.createElement("div");
    el.warterMark = warterMarDiv;
    this.resetCanvasPosition(el);
    warterMarDiv.appendChild(canvas);
    el.parentElement.insertBefore(warterMarDiv, el);
  }
  resetCanvasPosition(el) {
    if (el.warterMark) {
      el.parentElement.style.cssText = `position: relative;`;
      el.warterMark.style.cssText = "position: absolute;top: 0px;left: 0px;pointer-events:none";
    }
  }
};
var useToggleFullscreen = ({
  fullscreenFlag,
  className
}) => {
  const isFullScreen = document.fullscreen || document.webkitIsFullScreen || document.mozFullScreen;
  const contentEle = className ? document.querySelector(`.${className}`) : document.body;
  if (contentEle && !fullscreenFlag) {
    let fullScreenEle = contentEle.requestFullscreen || contentEle.mozRequestFullScreen || contentEle.webkitRequestFullScreen || contentEle.msRequestFullscreen;
    if (fullScreenEle) {
      fullScreenEle.call(contentEle);
    }
  }
  if (document && isFullScreen && fullscreenFlag) {
    let exitFullScreen = document.exitFullscreen || document.mozCancelFullScreen || document.webkitCancelFullScreen || document.msExitFullscreen;
    if (exitFullScreen) {
      exitFullScreen.call(document);
    }
  }
};
var Utils = {
  WaterMark,
  useToggleFullscreen
};
var components = [StarrySky, DigitalScroll, AlanButton, CodeBackgroundWall, BackTop, TherMometer, _sfc_main$6, DynamicCard, _sfc_main$8, VideoRecording, _sfc_main$5, _sfc_main$3, DrawImage, _sfc_main$1, _sfc_main];
var install = (App) => {
  components.forEach((item) => {
    App.component(item.name, item);
  });
};
var index = { install, Utils };
export {
  BackTop as AlanBackTop,
  AlanButton,
  _sfc_main$1 as CanvasAutograph,
  _sfc_main$5 as Clocks,
  CodeBackgroundWall,
  DigitalScroll,
  DrawImage,
  DynamicCard,
  _sfc_main as RedPacketRain,
  _sfc_main$3 as Spotlight,
  StarrySky,
  _sfc_main$8 as TakingPictures,
  TherMometer,
  Utils,
  VideoRecording,
  _sfc_main$6 as YuanWar,
  index as default
};
//# sourceMappingURL=@xiaomh_vue3-alan-vite-component.js.map
