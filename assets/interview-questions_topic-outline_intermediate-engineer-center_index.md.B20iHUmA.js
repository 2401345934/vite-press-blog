import{_ as l,o as i,c as t,J as s,w as r,m as n,a as c,aa as o,E as a}from"./chunks/framework.DJCjJe2w.js";const y=JSON.parse('{"title":"中级前端面试(中)","description":"","frontmatter":{"createTime":"2022/11/05","tag":"面试题"},"headers":[],"relativePath":"interview-questions/topic-outline/intermediate-engineer-center/index.md","filePath":"interview-questions/topic-outline/intermediate-engineer-center/index.md","lastUpdated":1667619833000}'),u={name:"interview-questions/topic-outline/intermediate-engineer-center/index.md"},d=n("h1",{id:"中级前端面试-中",tabindex:"-1"},[c("中级前端面试(中) "),n("a",{class:"header-anchor",href:"#中级前端面试-中","aria-label":'Permalink to "中级前端面试(中)"'},"​")],-1),b=o(`<h2 id="进阶知识" tabindex="-1">进阶知识 <a class="header-anchor" href="#进阶知识" aria-label="Permalink to &quot;进阶知识&quot;">​</a></h2><h2 id="框架-react" tabindex="-1">框架: React <a class="header-anchor" href="#框架-react" aria-label="Permalink to &quot;框架: React&quot;">​</a></h2><p>React 也是现如今最流行的前端框架，也是很多大厂面试必备。React 与 Vue 虽有不同，但同样作为一款 UI 框架，虽然实现可能不一样，但在一些理念上还是有相似的，例如数据驱动、组件化、虚拟 dom 等。这里就主要列举一些 React 中独有的概念。</p><h3 id="_1-fiber" tabindex="-1">1. Fiber <a class="header-anchor" href="#_1-fiber" aria-label="Permalink to &quot;1\\. Fiber&quot;">​</a></h3><p>React 的核心流程可以分为两个部分:</p><ul><li>reconciliation (<strong>调度算法</strong>，也可称为 render): <ul><li>更新 state 与 props；</li><li>调用生命周期钩子；</li><li>生成 virtual dom； <ul><li>这里应该称为 Fiber Tree 更为符合；</li></ul></li><li>通过新旧 vdom 进行 diff 算法，获取 vdom change；</li><li>确定是否需要重新渲染</li></ul></li><li>commit: <ul><li>如需要，则操作 dom 节点更新；</li></ul></li></ul><p>要了解 Fiber，我们首先来看为什么需要它？</p><ul><li><p><strong>问题</strong>: 随着应用变得越来越庞大，整个更新渲染的过程开始变得吃力，大量的组件渲染会导致主进程长时间被占用，导致一些动画或高频操作出现卡顿和掉帧的情况。而关键点，便是 <strong>同步阻塞</strong>。在之前的调度算法中，React 需要实例化每个类组件，生成一颗组件树，使用 <strong>同步递归</strong> 的方式进行遍历渲染，而这个过程最大的问题就是无法 <strong>暂停和恢复</strong>。</p></li><li><p><strong>解决方案</strong>: 解决同步阻塞的方法，通常有两种: <strong>异步</strong> 与 <strong>任务分割</strong>。而 React Fiber 便是为了实现任务分割而诞生的。</p></li><li><p><strong>简述</strong>:</p><ul><li>在 React V16 将调度算法进行了重构， 将之前的 stack reconciler 重构成新版的 fiber reconciler，变成了具有链表和指针的 <strong>单链表树遍历算法</strong>。通过指针映射，每个单元都记录着遍历当下的上一步与下一步，从而使遍历变得可以被暂停和重启。</li><li>这里我理解为是一种 <strong>任务分割调度算法</strong>，主要是 将原先同步更新渲染的任务分割成一个个独立的 <strong>小任务单位</strong>，根据不同的优先级，将小任务分散到浏览器的空闲时间执行，充分利用主进程的事件循环机制。</li></ul></li><li><p><strong>核心</strong>:</p><ul><li><p>Fiber 这里可以具象为一个 <strong>数据结构</strong>:</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>class Fiber {</span></span>
<span class="line"><span> constructor(instance) {</span></span>
<span class="line"><span>  this.instance = instance</span></span>
<span class="line"><span>  // 指向第一个 child 节点</span></span>
<span class="line"><span>  this.child = child</span></span>
<span class="line"><span>  // 指向父节点</span></span>
<span class="line"><span>  this.return = parent</span></span>
<span class="line"><span>  // 指向第一个兄弟节点</span></span>
<span class="line"><span>  this.sibling = previous</span></span>
<span class="line"><span> } </span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br></div></div></li><li><p><strong>链表树遍历算法</strong>: 通过 <strong>节点保存与映射</strong>，便能够随时地进行 停止和重启，这样便能达到实现任务分割的基本前提；</p><ul><li>1、首先通过不断遍历子节点，到树末尾；</li><li>2、开始通过 sibling 遍历兄弟节点；</li><li>3、return 返回父节点，继续执行2；</li><li>4、直到 root 节点后，跳出遍历；</li></ul></li><li><p><strong>任务分割</strong>，React 中的渲染更新可以分成两个阶段:</p><ul><li><strong>reconciliation 阶段</strong>: vdom 的数据对比，是个适合拆分的阶段，比如对比一部分树后，先暂停执行个动画调用，待完成后再回来继续比对。</li><li><strong>Commit 阶段</strong>: 将 change list 更新到 dom 上，并不适合拆分，才能保持数据与 UI 的同步。否则可能由于阻塞 UI 更新，而导致数据更新和 UI 不一致的情况。</li></ul></li><li><p><strong>分散执行</strong>: 任务分割后，就可以把小任务单元分散到浏览器的空闲期间去排队执行，而实现的关键是两个新API: <code>requestIdleCallback</code> 与 <code>requestAnimationFrame</code></p><ul><li>低优先级的任务交给<code>requestIdleCallback</code>处理，这是个浏览器提供的事件循环空闲期的回调函数，需要 pollyfill，而且拥有 deadline 参数，限制执行事件，以继续切分任务；</li><li>高优先级的任务交给<code>requestAnimationFrame</code>处理；</li></ul><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>// 类似于这样的方式</span></span>
<span class="line"><span>requestIdleCallback((deadline) =&gt; {</span></span>
<span class="line"><span>    // 当有空闲时间时，我们执行一个组件渲染；</span></span>
<span class="line"><span>    // 把任务塞到一个个碎片时间中去；</span></span>
<span class="line"><span>    while ((deadline.timeRemaining() &gt; 0 || deadline.didTimeout) &amp;&amp; nextComponent) {</span></span>
<span class="line"><span>        nextComponent = performWork(nextComponent);</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>});</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br></div></div></li><li><p><strong>优先级策略</strong>: 文本框输入 &gt; 本次调度结束需完成的任务 &gt; 动画过渡 &gt; 交互反馈 &gt; 数据更新 &gt; 不会显示但以防将来会显示的任务</p></li></ul></li></ul><blockquote><p><strong>Tips</strong>:</p><p>Fiber 其实可以算是一种编程思想，在其它语言中也有许多应用(Ruby Fiber)。核心思想是 任务拆分和协同，主动把执行权交给主线程，使主线程有时间空挡处理其他高优先级任务。</p><p>当遇到进程阻塞的问题时，<strong>任务分割</strong>、<strong>异步调用</strong> 和 <strong>缓存策略</strong> 是三个显著的解决思路。</p><p><strong>感谢 @Pengyuan 童鞋，在评论中指出了几个 Fiber 中最核心的理念，感恩！！</strong></p></blockquote><h3 id="_2-生命周期" tabindex="-1">2. 生命周期 <a class="header-anchor" href="#_2-生命周期" aria-label="Permalink to &quot;2\\. 生命周期&quot;">​</a></h3><p>在新版本中，React 官方对生命周期有了新的 <strong>变动建议</strong>:</p><ul><li>使用<code>getDerivedStateFromProps</code> 替换 <code>componentWillMount</code> 与 <code>componentWillReceiveProps</code>；</li><li>使用<code>getSnapshotBeforeUpdate</code>替换<code>componentWillUpdate</code>；</li><li>避免使用<code>componentWillReceiveProps</code>；</li></ul><p>其实该变动的原因，正是由于上述提到的 Fiber。首先，从上面我们知道 React 可以分成 reconciliation 与 commit 两个阶段，对应的生命周期如下:</p><ul><li><p><strong>reconciliation</strong>:</p><ul><li><code>componentWillMount</code></li><li><code>componentWillReceiveProps</code></li><li><code>shouldComponentUpdate</code></li><li><code>componentWillUpdate</code></li></ul></li><li><p><strong>commit</strong>:</p><ul><li><code>componentDidMount</code></li><li><code>componentDidUpdate</code></li><li><code>componentWillUnmount</code></li></ul></li></ul><p>在 Fiber 中，reconciliation 阶段进行了任务分割，涉及到 暂停 和 重启，因此可能会导致 reconciliation 中的生命周期函数在一次更新渲染循环中被 <strong>多次调用</strong> 的情况，产生一些意外错误。</p><p>新版的建议生命周期如下:</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>class Component extends React.Component {</span></span>
<span class="line"><span>  // 替换 \`componentWillReceiveProps\` ，</span></span>
<span class="line"><span>  // 初始化和 update 时被调用</span></span>
<span class="line"><span>  // 静态函数，无法使用 this</span></span>
<span class="line"><span>  static getDerivedStateFromProps(nextProps, prevState) {}</span></span>
<span class="line"><span>  </span></span>
<span class="line"><span>  // 判断是否需要更新组件</span></span>
<span class="line"><span>  // 可以用于组件性能优化</span></span>
<span class="line"><span>  shouldComponentUpdate(nextProps, nextState) {}</span></span>
<span class="line"><span>  </span></span>
<span class="line"><span>  // 组件被挂载后触发</span></span>
<span class="line"><span>  componentDidMount() {}</span></span>
<span class="line"><span>  </span></span>
<span class="line"><span>  // 替换 componentWillUpdate</span></span>
<span class="line"><span>  // 可以在更新之前获取最新 dom 数据</span></span>
<span class="line"><span>  getSnapshotBeforeUpdate() {}</span></span>
<span class="line"><span>  </span></span>
<span class="line"><span>  // 组件更新后调用</span></span>
<span class="line"><span>  componentDidUpdate() {}</span></span>
<span class="line"><span>  </span></span>
<span class="line"><span>  // 组件即将销毁</span></span>
<span class="line"><span>  componentWillUnmount() {}</span></span>
<span class="line"><span>  </span></span>
<span class="line"><span>  // 组件已销毁</span></span>
<span class="line"><span>  componentDidUnmount() {}</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br></div></div><ul><li><p><strong>使用建议</strong>:</p><ul><li><p>在<code>constructor</code>初始化 state；</p></li><li><p>在<code>componentDidMount</code>中进行事件监听，并在<code>componentWillUnmount</code>中解绑事件；</p></li><li><p>在<code>componentDidMount</code>中进行数据的请求，而不是在<code>componentWillMount</code>；</p></li><li><p>需要根据 props 更新 state 时，使用<code>getDerivedStateFromProps(nextProps, prevState)</code>；</p><ul><li>旧 props 需要自己存储，以便比较；</li></ul><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>public static getDerivedStateFromProps(nextProps, prevState) {</span></span>
<span class="line"><span> // 当新 props 中的 data 发生变化时，同步更新到 state 上</span></span>
<span class="line"><span> if (nextProps.data !== prevState.data) {</span></span>
<span class="line"><span>  return {</span></span>
<span class="line"><span>   data: nextProps.data</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span> } else {</span></span>
<span class="line"><span>  return null1</span></span>
<span class="line"><span> }</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br></div></div></li><li><p>可以在<code>componentDidUpdate</code>监听 props 或者 state 的变化，例如:</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>componentDidUpdate(prevProps) {</span></span>
<span class="line"><span> // 当 id 发生变化时，重新获取数据</span></span>
<span class="line"><span> if (this.props.id !== prevProps.id) {</span></span>
<span class="line"><span>  this.fetchData(this.props.id);</span></span>
<span class="line"><span> }</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br></div></div></li><li><p>在<code>componentDidUpdate</code>使用<code>setState</code>时，必须加条件，否则将进入死循环；</p></li><li><p><code>getSnapshotBeforeUpdate(prevProps, prevState)</code>可以在更新之前获取最新的渲染数据，它的调用是在 render 之后， update 之前；</p></li><li><p><code>shouldComponentUpdate</code>: 默认每次调用<code>setState</code>，一定会最终走到 diff 阶段，但可以通过<code>shouldComponentUpdate</code>的生命钩子返回<code>false</code>来直接阻止后面的逻辑执行，通常是用于做条件渲染，优化渲染的性能。</p></li></ul></li></ul><h3 id="_3-setstate" tabindex="-1">3. setState <a class="header-anchor" href="#_3-setstate" aria-label="Permalink to &quot;3\\. setState&quot;">​</a></h3><p>在了解<code>setState</code>之前，我们先来简单了解下 React 一个包装结构: <strong>Transaction</strong>:</p><ul><li><strong>事务</strong> (Transaction): <ul><li>是 React 中的一个调用结构，用于包装一个方法，结构为: <strong>initialize - perform(method) - close</strong>。通过事务，可以统一管理一个方法的开始与结束；处于事务流中，表示进程正在执行一些操作；</li></ul></li></ul><p><img src="https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2019/3/21/1699e0cb48cd4013~tplv-t2oaga2asx-zoom-in-crop-mark:4536:0:0:0.image" alt=""></p><ul><li><p><code>setState</code>: React 中用于修改状态，更新视图。它具有以下特点:</p></li><li><p><strong>异步与同步</strong>: <code>setState</code>并不是单纯的异步或同步，这其实与调用时的环境相关:</p><ul><li>在 <strong>合成事件</strong> 和 <strong>生命周期钩子(除 componentDidUpdate)</strong> 中，<code>setState</code>是&quot;异步&quot;的； <ul><li><strong>原因</strong>: 因为在<code>setState</code>的实现中，有一个判断: 当更新策略正在事务流的执行中时，该组件更新会被推入<code>dirtyComponents</code>队列中等待执行；否则，开始执行<code>batchedUpdates</code>队列更新； <ul><li>在生命周期钩子调用中，更新策略都处于更新之前，组件仍处于事务流中，而<code>componentDidUpdate</code>是在更新之后，此时组件已经不在事务流中了，因此则会同步执行；</li><li>在合成事件中，React 是基于 <strong>事务流完成的事件委托机制</strong> 实现，也是处于事务流中；</li></ul></li><li><strong>问题</strong>: 无法在<code>setState</code>后马上从<code>this.state</code>上获取更新后的值。</li><li><strong>解决</strong>: 如果需要马上同步去获取新值，<code>setState</code>其实是可以传入第二个参数的。<code>setState(updater, callback)</code>，在回调中即可获取最新值；</li></ul></li><li>在 <strong>原生事件</strong> 和 <strong>setTimeout</strong> 中，<code>setState</code>是同步的，可以马上获取更新后的值； <ul><li>原因: 原生事件是浏览器本身的实现，与事务流无关，自然是同步；而<code>setTimeout</code>是放置于定时器线程中延后执行，此时事务流已结束，因此也是同步；</li></ul></li></ul></li><li><p><strong>批量更新</strong>: 在 <strong>合成事件</strong> 和 <strong>生命周期钩子</strong> 中，<code>setState</code>更新队列时，存储的是 <strong>合并状态</strong>(<code>Object.assign</code>)。因此前面设置的 key 值会被后面所覆盖，最终只会执行一次更新；</p></li><li><p><strong>函数式</strong>: 由于 Fiber 及 合并 的问题，官方推荐可以传入 <strong>函数</strong> 的形式。<code>setState(fn)</code>，在<code>fn</code>中返回新的<code>state</code>对象即可，例如<code>this.setState((state, props) =&gt; newState)；</code></p><ul><li>使用函数式，可以用于避免<code>setState</code>的批量更新的逻辑，传入的函数将会被 <strong>顺序调用</strong>；</li></ul></li><li><p><strong>注意事项</strong>:</p><ul><li>setState 合并，在 合成事件 和 生命周期钩子 中多次连续调用会被优化为一次；</li><li>当组件已被销毁，如果再次调用<code>setState</code>，React 会报错警告，通常有两种解决办法: <ul><li>将数据挂载到外部，通过 props 传入，如放到 Redux 或 父级中；</li><li>在组件内部维护一个状态量 (isUnmounted)，<code>componentWillUnmount</code>中标记为 true，在<code>setState</code>前进行判断；</li></ul></li></ul></li></ul><h3 id="_4-hoc-高阶组件" tabindex="-1">4. HOC(高阶组件) <a class="header-anchor" href="#_4-hoc-高阶组件" aria-label="Permalink to &quot;4\\. HOC(高阶组件)&quot;">​</a></h3><p>HOC(Higher Order Componennt) 是在 React 机制下社区形成的一种组件模式，在很多第三方开源库中表现强大。</p><ul><li><p><strong>简述</strong>:</p><ul><li>高阶组件不是组件，是 <strong>增强函数</strong>，可以输入一个元组件，返回出一个新的增强组件；</li><li>高阶组件的主要作用是 <strong>代码复用</strong>，<strong>操作</strong> 状态和参数；</li></ul></li><li><p><strong>用法</strong>:</p><ul><li><p><strong>属性代理 (Props Proxy)</strong>: 返回出一个组件，它基于被包裹组件进行 <strong>功能增强</strong>；</p><ul><li><p><strong>默认参数</strong>: 可以为组件包裹一层默认参数；</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>function proxyHoc(Comp) {</span></span>
<span class="line"><span> return class extends React.Component {</span></span>
<span class="line"><span>  render() {</span></span>
<span class="line"><span>   const newProps = {</span></span>
<span class="line"><span>    name: &#39;tayde&#39;,</span></span>
<span class="line"><span>    age: 1,</span></span>
<span class="line"><span>   }</span></span>
<span class="line"><span>   return &lt;Comp {...this.props} {...newProps} /&gt;</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span> }</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br></div></div></li><li><p><strong>提取状态</strong>: 可以通过 props 将被包裹组件中的 state 依赖外层，例如用于转换受控组件:</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>function withOnChange(Comp) {</span></span>
<span class="line"><span> return class extends React.Component {</span></span>
<span class="line"><span>  constructor(props) {</span></span>
<span class="line"><span>   super(props)</span></span>
<span class="line"><span>   this.state = {</span></span>
<span class="line"><span>    name: &#39;&#39;,</span></span>
<span class="line"><span>   }</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>  onChangeName = () =&gt; {</span></span>
<span class="line"><span>   this.setState({</span></span>
<span class="line"><span>    name: &#39;dongdong&#39;,</span></span>
<span class="line"><span>   })</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>  render() {</span></span>
<span class="line"><span>   const newProps = {</span></span>
<span class="line"><span>    value: this.state.name,</span></span>
<span class="line"><span>    onChange: this.onChangeName,</span></span>
<span class="line"><span>   }</span></span>
<span class="line"><span>   return &lt;Comp {...this.props} {...newProps} /&gt;</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span> }</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br></div></div><p>使用姿势如下，这样就能非常快速的将一个 <code>Input</code> 组件转化成受控组件。</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>const NameInput = props =&gt; (&lt;input name=&quot;name&quot; {...props} /&gt;)</span></span>
<span class="line"><span>export default withOnChange(NameInput)</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div></li><li><p><strong>包裹组件</strong>: 可以为被包裹元素进行一层包装，</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>function withMask(Comp) {</span></span>
<span class="line"><span>  return class extends React.Component {</span></span>
<span class="line"><span>      render() {</span></span>
<span class="line"><span>    return (</span></span>
<span class="line"><span>        &lt;div&gt;</span></span>
<span class="line"><span>      &lt;Comp {...this.props} /&gt;</span></span>
<span class="line"><span>     &lt;div style={{</span></span>
<span class="line"><span>       width: &#39;100%&#39;,</span></span>
<span class="line"><span>       height: &#39;100%&#39;,</span></span>
<span class="line"><span>       backgroundColor: &#39;rgba(0, 0, 0, .6)&#39;,</span></span>
<span class="line"><span>      }} </span></span>
<span class="line"><span>     &lt;/div&gt;</span></span>
<span class="line"><span>    )</span></span>
<span class="line"><span>   }</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br></div></div></li></ul></li><li><p><strong>反向继承</strong> (Inheritance Inversion): 返回出一个组件，<strong>继承于被包裹组件</strong>，常用于以下操作:</p><pre><code>\`\`\`
function IIHoc(Comp) {
    return class extends Comp {
        render() {
            return super.render();
        }
    };
}

\`\`\`
</code></pre><ul><li><p><strong>渲染劫持</strong> (Render Highjacking)</p><ul><li><p><strong>条件渲染</strong>: 根据条件，渲染不同的组件</p><pre><code>\`\`\`
function withLoading(Comp) {
    return class extends Comp {
        render() {
            if(this.props.isLoading) {
                return &lt;Loading /&gt;
            } else {
                return super.render()
            }
        }
    };
}

\`\`\`
</code></pre></li><li><p>可以直接修改被包裹组件渲染出的 React 元素树</p></li></ul></li><li><p><strong>操作状态</strong> (Operate State): 可以直接通过 <code>this.state</code> 获取到被包裹组件的状态，并进行操作。但这样的操作容易使 state 变得难以追踪，不易维护，谨慎使用。</p></li></ul></li></ul></li><li><p><strong>应用场景</strong>:</p><ul><li><p><strong>权限控制</strong>，通过抽象逻辑，统一对页面进行权限判断，按不同的条件进行页面渲染:</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>function withAdminAuth(WrappedComponent) {</span></span>
<span class="line"><span>    return class extends React.Component {</span></span>
<span class="line"><span>  constructor(props){</span></span>
<span class="line"><span>   super(props)</span></span>
<span class="line"><span>   this.state = {</span></span>
<span class="line"><span>       isAdmin: false,</span></span>
<span class="line"><span>   }</span></span>
<span class="line"><span>  } </span></span>
<span class="line"><span>  async componentWillMount() {</span></span>
<span class="line"><span>      const currentRole = await getCurrentUserRole();</span></span>
<span class="line"><span>      this.setState({</span></span>
<span class="line"><span>          isAdmin: currentRole === &#39;Admin&#39;,</span></span>
<span class="line"><span>      });</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>  render() {</span></span>
<span class="line"><span>      if (this.state.isAdmin) {</span></span>
<span class="line"><span>          return &lt;Comp {...this.props} /&gt;;</span></span>
<span class="line"><span>      } else {</span></span>
<span class="line"><span>          return (&lt;div&gt;您没有权限查看该页面，请联系管理员！&lt;/div&gt;);</span></span>
<span class="line"><span>      }</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>    };</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br></div></div></li><li><p><strong>性能监控</strong>，包裹组件的生命周期，进行统一埋点:</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>function withTiming(Comp) {</span></span>
<span class="line"><span>    return class extends Comp {</span></span>
<span class="line"><span>        constructor(props) {</span></span>
<span class="line"><span>            super(props);</span></span>
<span class="line"><span>            this.start = Date.now();</span></span>
<span class="line"><span>            this.end = 0;</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>        componentDidMount() {</span></span>
<span class="line"><span>            super.componentDidMount &amp;&amp; super.componentDidMount();</span></span>
<span class="line"><span>            this.end = Date.now();</span></span>
<span class="line"><span>            console.log(\`\${WrappedComponent.name} 组件渲染时间为 \${this.end - this.start} ms\`);</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>        render() {</span></span>
<span class="line"><span>            return super.render();</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>    };</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br></div></div></li><li><p><strong>代码复用</strong>，可以将重复的逻辑进行抽象。</p></li></ul></li><li><p>使用注意:</p><ul><li><ol><li><strong>纯函数</strong>: 增强函数应为纯函数，避免侵入修改元组件；</li></ol></li><li><ol start="2"><li><strong>避免用法污染</strong>: 理想状态下，应透传元组件的无关参数与事件，尽量保证用法不变；</li></ol></li><li><ol start="3"><li><strong>命名空间</strong>: 为 HOC 增加特异性的组件名称，这样能便于开发调试和查找问题；</li></ol></li><li><ol start="4"><li><strong>引用传递</strong>: 如果需要传递元组件的 refs 引用，可以使用<code>React.forwardRef</code>；</li></ol></li><li><ol start="5"><li><strong>静态方法</strong>: 元组件上的静态方法并无法被自动传出，会导致业务层无法调用；解决:</li></ol><ul><li>函数导出</li><li>静态方法赋值</li></ul></li><li><ol start="6"><li><strong>重新渲染</strong>: 由于增强函数每次调用是返回一个新组件，因此如果在 Render 中使用增强函数，就会导致每次都重新渲染整个HOC，而且之前的状态会丢失；</li></ol></li></ul></li></ul><h3 id="_5-redux" tabindex="-1">5. Redux <a class="header-anchor" href="#_5-redux" aria-label="Permalink to &quot;5\\. Redux&quot;">​</a></h3><p>Redux 是一个 <strong>数据管理中心</strong>，可以把它理解为一个全局的 data store 实例。它通过一定的使用规则和限制，保证着数据的健壮性、可追溯和可预测性。它与 React 无关，可以独立运行于任何 JavaScript 环境中，从而也为同构应用提供了更好的数据同步通道。</p><ul><li><p><strong>核心理念</strong>:</p><ul><li><strong>单一数据源</strong>: 整个应用只有唯一的状态树，也就是所有 state 最终维护在一个根级 Store 中；</li><li><strong>状态只读</strong>: 为了保证状态的可控性，最好的方式就是监控状态的变化。那这里就两个必要条件： <ul><li>Redux Store 中的数据无法被直接修改；</li><li>严格控制修改的执行；</li></ul></li><li><strong>纯函数</strong>: 规定只能通过一个纯函数 (Reducer) 来描述修改；</li></ul></li><li><p>大致的数据结构如下所示:</p></li></ul><p><img src="https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2019/3/21/1699e0d09c40cec7~tplv-t2oaga2asx-zoom-in-crop-mark:4536:0:0:0.image" alt=""></p><ul><li><p><strong>理念实现</strong>:</p><ul><li><p><strong>Store</strong>: 全局 Store 单例， 每个 Redux 应用下只有一个 store， 它具有以下方法供使用:</p><ul><li><code>getState</code>: 获取 state；</li><li><code>dispatch</code>: 触发 action, 更新 state；</li><li><code>subscribe</code>: 订阅数据变更，注册监听器；</li></ul><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>// 创建</span></span>
<span class="line"><span>const store = createStore(Reducer, initStore)</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div></li><li><p><strong>Action</strong>: 它作为一个行为载体，用于映射相应的 Reducer，并且它可以成为数据的载体，将数据从应用传递至 store 中，是 store <strong>唯一的数据源</strong>；</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>// 一个普通的 Action</span></span>
<span class="line"><span>const action = {</span></span>
<span class="line"><span> type: &#39;ADD_LIST&#39;,</span></span>
<span class="line"><span> item: &#39;list-item-1&#39;,</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// 使用：</span></span>
<span class="line"><span>store.dispatch(action)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// 通常为了便于调用，会有一个 Action 创建函数 (action creater)</span></span>
<span class="line"><span>funtion addList(item) {</span></span>
<span class="line"><span> return const action = {</span></span>
<span class="line"><span>  type: &#39;ADD_LIST&#39;,</span></span>
<span class="line"><span>  item,</span></span>
<span class="line"><span> }</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// 调用就会变成:</span></span>
<span class="line"><span>dispatch(addList(&#39;list-item-1&#39;))</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br></div></div></li><li><p><strong>Reducer</strong>: 用于描述如何修改数据的纯函数，Action 属于行为名称，而 Reducer 便是修改行为的实质；</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>// 一个常规的 Reducer</span></span>
<span class="line"><span>// @param {state}: 旧数据</span></span>
<span class="line"><span>// @param {action}: Action 对象</span></span>
<span class="line"><span>// @returns {any}: 新数据</span></span>
<span class="line"><span>const initList = []</span></span>
<span class="line"><span>function ListReducer(state = initList, action) {</span></span>
<span class="line"><span> switch (action.type) {</span></span>
<span class="line"><span>  case &#39;ADD_LIST&#39;:</span></span>
<span class="line"><span>   return state.concat([action.item])</span></span>
<span class="line"><span>   break</span></span>
<span class="line"><span>  defalut:</span></span>
<span class="line"><span>   return state</span></span>
<span class="line"><span> }</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br></div></div><blockquote><p><strong>注意</strong>:</p><ol><li>遵守数据不可变，不要去直接修改 state，而是返回出一个 <strong>新对象</strong>，可以使用 <code>assign / copy / extend / 解构</code> 等方式创建新对象；</li><li>默认情况下需要 <strong>返回原数据</strong>，避免数据被清空；</li><li>最好设置 <strong>初始值</strong>，便于应用的初始化及数据稳定；</li></ol></blockquote></li></ul></li><li><p><strong>进阶</strong>:</p><ul><li><strong>React-Redux</strong>: 结合 React 使用； <ul><li><code>&lt;Provider&gt;</code>: 将 store 通过 context 传入组件中；</li><li><code>connect</code>: 一个高阶组件，可以方便在 React 组件中使用 Redux； <ul><li><ol><li>将<code>store</code>通过<code>mapStateToProps</code>进行筛选后使用<code>props</code>注入组件</li></ol></li><li><ol start="2"><li>根据<code>mapDispatchToProps</code>创建方法，当组件调用时使用<code>dispatch</code>触发对应的<code>action</code></li></ol></li></ul></li></ul></li><li><strong>Reducer 的拆分与重构</strong>: <ul><li>随着项目越大，如果将所有状态的 reducer 全部写在一个函数中，将会 <strong>难以维护</strong>；</li><li>可以将 reducer 进行拆分，也就是 <strong>函数分解</strong>，最终再使用<code>combineReducers()</code>进行重构合并；</li></ul></li><li><strong>异步 Action</strong>: 由于 Reducer 是一个严格的纯函数，因此无法在 Reducer 中进行数据的请求，需要先获取数据，再<code>dispatch(Action)</code>即可，下面是三种不同的异步实现: <ul><li><a href="https://link.juejin.cn/?target=https%3A%2F%2Fgithub.com%2Freduxjs%2Fredux-thunk" title="https://github.com/reduxjs/redux-thunk" target="_blank" rel="noreferrer">redex-thunk</a></li><li><a href="https://link.juejin.cn/?target=https%3A%2F%2Fgithub.com%2Fredux-saga%2Fredux-saga" title="https://github.com/redux-saga/redux-saga" target="_blank" rel="noreferrer">redux-saga</a></li><li><a href="https://link.juejin.cn/?target=https%3A%2F%2Fgithub.com%2Fredux-observable%2Fredux-observable" title="https://github.com/redux-observable/redux-observable" target="_blank" rel="noreferrer">redux-observable</a></li></ul></li></ul></li></ul><h3 id="_6-react-hooks" tabindex="-1">6. React Hooks <a class="header-anchor" href="#_6-react-hooks" aria-label="Permalink to &quot;6\\. React Hooks&quot;">​</a></h3><p>React 中通常使用 <strong>类定义</strong> 或者 <strong>函数定义</strong> 创建组件:</p><p>在类定义中，我们可以使用到许多 React 特性，例如 state、 各种组件生命周期钩子等，但是在函数定义中，我们却无能为力，因此 React 16.8 版本推出了一个新功能 (React Hooks)，通过它，可以更好的在函数定义组件中使用 React 特性。</p><ul><li><p><strong>好处</strong>:</p><ul><li>1、<strong>跨组件复用</strong>: 其实 render props / HOC 也是为了复用，相比于它们，Hooks 作为官方的底层 API，最为轻量，而且改造成本小，不会影响原来的组件层次结构和传说中的嵌套地狱；</li><li>2、<strong>类定义更为复杂</strong>: <ul><li>不同的生命周期会使逻辑变得分散且混乱，不易维护和管理；</li><li>时刻需要关注<code>this</code>的指向问题；</li><li>代码复用代价高，高阶组件的使用经常会使整个组件树变得臃肿；</li></ul></li><li>3、<strong>状态与UI隔离</strong>: 正是由于 Hooks 的特性，状态逻辑会变成更小的粒度，并且极容易被抽象成一个自定义 Hooks，组件中的状态和 UI 变得更为清晰和隔离。</li></ul></li><li><p><strong>注意</strong>:</p><ul><li>避免在 循环/条件判断/嵌套函数 中调用 hooks，保证调用顺序的稳定；</li><li>只有 函数定义组件 和 hooks 可以调用 hooks，避免在 类组件 或者 普通函数 中调用；</li><li>不能在<code>useEffect</code>中使用<code>useState</code>，React 会报错提示；</li><li>类组件不会被替换或废弃，不需要强制改造类组件，两种方式能并存；</li></ul></li><li><p><strong>重要钩子</strong>*:</p><ul><li><p><strong>状态钩子</strong> (<code>useState</code>): 用于定义组件的 State，其到类定义中<code>this.state</code>的功能；</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>// useState 只接受一个参数: 初始状态</span></span>
<span class="line"><span>// 返回的是组件名和更改该组件对应的函数</span></span>
<span class="line"><span>const [flag, setFlag] = useState(true);</span></span>
<span class="line"><span>// 修改状态</span></span>
<span class="line"><span>setFlag(false)</span></span>
<span class="line"><span> </span></span>
<span class="line"><span>// 上面的代码映射到类定义中:</span></span>
<span class="line"><span>this.state = {</span></span>
<span class="line"><span> flag: true </span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>const flag = this.state.flag</span></span>
<span class="line"><span>const setFlag = (bool) =&gt; {</span></span>
<span class="line"><span>    this.setState({</span></span>
<span class="line"><span>        flag: bool,</span></span>
<span class="line"><span>    })</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br></div></div></li><li><p><strong>生命周期钩子</strong> (<code>useEffect</code>):</p><p>类定义中有许多生命周期函数，而在 React Hooks 中也提供了一个相应的函数 (<code>useEffect</code>)，这里可以看做<code>componentDidMount</code>、<code>componentDidUpdate</code>和<code>componentWillUnmount</code>的结合。</p></li><li><p><code>useEffect(callback, [source])</code>接受两个参数</p><ul><li><code>callback</code>: 钩子回调函数；</li><li><code>source</code>: 设置触发条件，仅当 source 发生改变时才会触发；</li><li><code>useEffect</code>钩子在没有传入<code>[source]</code>参数时，默认在每次 render 时都会优先调用上次保存的回调中返回的函数，后再重新调用回调；</li></ul><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>useEffect(() =&gt; {</span></span>
<span class="line"><span> // 组件挂载后执行事件绑定</span></span>
<span class="line"><span> console.log(&#39;on&#39;)</span></span>
<span class="line"><span> addEventListener()</span></span>
<span class="line"><span> </span></span>
<span class="line"><span> // 组件 update 时会执行事件解绑</span></span>
<span class="line"><span> return () =&gt; {</span></span>
<span class="line"><span>  console.log(&#39;off&#39;)</span></span>
<span class="line"><span>  removeEventListener()</span></span>
<span class="line"><span> }</span></span>
<span class="line"><span>}, [source]);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// 每次 source 发生改变时，执行结果(以类定义的生命周期，便于大家理解):</span></span>
<span class="line"><span>// --- DidMount ---</span></span>
<span class="line"><span>// &#39;on&#39;</span></span>
<span class="line"><span>// --- DidUpdate ---</span></span>
<span class="line"><span>// &#39;off&#39;</span></span>
<span class="line"><span>// &#39;on&#39;</span></span>
<span class="line"><span>// --- DidUpdate ---</span></span>
<span class="line"><span>// &#39;off&#39;</span></span>
<span class="line"><span>// &#39;on&#39;</span></span>
<span class="line"><span>// --- WillUnmount --- </span></span>
<span class="line"><span>// &#39;off&#39;</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br></div></div></li><li><p>通过第二个参数，我们便可模拟出几个常用的生命周期:</p><ul><li><p><code>componentDidMount</code>: 传入<code>[]</code>时，就只会在初始化时调用一次；</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>const useMount = (fn) =&gt; useEffect(fn, [])</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div></li><li><p><code>componentWillUnmount</code>: 传入<code>[]</code>，回调中的返回的函数也只会被最终执行一次；</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>const useUnmount = (fn) =&gt; useEffect(() =&gt; fn, [])</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div></li><li><p><code>mounted</code>: 可以使用 useState 封装成一个高度可复用的 mounted 状态；</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>const useMounted = () =&gt; {</span></span>
<span class="line"><span>    const [mounted, setMounted] = useState(false);</span></span>
<span class="line"><span>    useEffect(() =&gt; {</span></span>
<span class="line"><span>        !mounted &amp;&amp; setMounted(true);</span></span>
<span class="line"><span>        return () =&gt; setMounted(false);</span></span>
<span class="line"><span>    }, []);</span></span>
<span class="line"><span>    return mounted;</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br></div></div></li><li><p><code>componentDidUpdate</code>: <code>useEffect</code>每次均会执行，其实就是排除了 DidMount 后即可；</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>const mounted = useMounted() </span></span>
<span class="line"><span>useEffect(() =&gt; {</span></span>
<span class="line"><span>    mounted &amp;&amp; fn()</span></span>
<span class="line"><span>})</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div></li></ul></li></ul></li><li><p><strong>其它内置钩子</strong>:</p><ul><li><p><code>useContext</code>: 获取 context 对象</p></li><li><p><code>useReducer</code>: 类似于 Redux 思想的实现，但其并不足以替代 Redux，可以理解成一个组件内部的 redux:</p><ul><li>并不是持久化存储，会随着组件被销毁而销毁；</li><li>属于组件内部，各个组件是相互隔离的，单纯用它并无法共享数据；</li><li>配合<code>useContext</code>的全局性，可以完成一个轻量级的 Redux；(<a href="https://link.juejin.cn/?target=https%3A%2F%2Fgithub.com%2Fctrlplusb%2Feasy-peasy" title="https://github.com/ctrlplusb/easy-peasy" target="_blank" rel="noreferrer">easy-peasy</a>)</li></ul></li><li><p><code>useCallback</code>: 缓存回调函数，避免传入的回调每次都是新的函数实例而导致依赖组件重新渲染，具有性能优化的效果；</p></li><li><p><code>useMemo</code>: 用于缓存传入的 props，避免依赖的组件每次都重新渲染；</p></li><li><p><code>useRef</code>: 获取组件的真实节点；</p></li><li><p><code>useLayoutEffect</code>:</p><ul><li>DOM更新同步钩子。用法与<code>useEffect</code>类似，只是区别于执行时间点的不同。</li><li><code>useEffect</code>属于异步执行，并不会等待 DOM 真正渲染后执行，而<code>useLayoutEffect</code>则会真正渲染后才触发；</li><li>可以获取更新后的 state；</li></ul></li></ul></li><li><p><strong>自定义钩子</strong>(<code>useXxxxx</code>): 基于 Hooks 可以引用其它 Hooks 这个特性，我们可以编写自定义钩子，如上面的<code>useMounted</code>。又例如，我们需要每个页面自定义标题:</p></li></ul><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>function useTitle(title) {</span></span>
<span class="line"><span>  useEffect(</span></span>
<span class="line"><span>    () =&gt; {</span></span>
<span class="line"><span>      document.title = title;</span></span>
<span class="line"><span>    });</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// 使用:</span></span>
<span class="line"><span>function Home() {</span></span>
<span class="line"><span> const title = &#39;我是首页&#39;</span></span>
<span class="line"><span> useTitle(title)</span></span>
<span class="line"><span> </span></span>
<span class="line"><span> return (</span></span>
<span class="line"><span>  &lt;div&gt;{title}&lt;/div&gt;</span></span>
<span class="line"><span> )</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br></div></div><h3 id="_7-ssr" tabindex="-1">7. SSR <a class="header-anchor" href="#_7-ssr" aria-label="Permalink to &quot;7\\. SSR&quot;">​</a></h3><p>SSR，俗称 <strong>服务端渲染</strong> (Server Side Render)，讲人话就是: 直接在服务端层获取数据，渲染出完成的 HTML 文件，直接返回给用户浏览器访问。</p><ul><li><p><strong>前后端分离</strong>: 前端与服务端隔离，前端动态获取数据，渲染页面。</p></li><li><p><strong>痛点</strong>:</p><ul><li><p><strong>首屏渲染性能瓶颈</strong>:</p><ul><li>空白延迟: HTML下载时间 + JS下载/执行时间 + 请求时间 + 渲染时间。在这段时间内，页面处于空白的状态。</li></ul></li><li><p><strong>SEO 问题</strong>: 由于页面初始状态为空，因此爬虫无法获取页面中任何有效数据，因此对搜索引擎不友好。</p><ul><li>虽然一直有在提动态渲染爬虫的技术，不过据我了解，大部分国内搜索引擎仍然是没有实现。</li></ul></li></ul></li></ul><p>最初的服务端渲染，便没有这些问题。但我们不能返璞归真，既要保证现有的前端独立的开发模式，又要由服务端渲染，因此我们使用 React SSR。</p><ul><li><p><strong>原理</strong>:</p><ul><li>Node 服务: 让前后端运行同一套代码成为可能。</li><li>Virtual Dom: 让前端代码脱离浏览器运行。</li></ul></li><li><p><strong>条件</strong>: Node 中间层、 React / Vue 等框架。 结构大概如下:</p></li></ul><p><img src="https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2019/3/21/1699e0d41797a4d1~tplv-t2oaga2asx-zoom-in-crop-mark:4536:0:0:0.image" alt=""></p><ul><li><p><strong>开发流程</strong>: (此处以 React + Router + Redux + Koa 为例)</p><ul><li><p>1、在同个项目中，<strong>搭建</strong> 前后端部分，常规结构:</p><ul><li>build</li><li>public</li><li>src <ul><li>client</li><li>server</li></ul></li></ul></li><li><p>2、server 中使用 Koa <strong>路由监听</strong> 页面访问:</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>import * as Router from &#39;koa-router&#39;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>const router = new Router()</span></span>
<span class="line"><span>// 如果中间也提供 Api 层</span></span>
<span class="line"><span>router.use(&#39;/api/home&#39;, async () =&gt; {</span></span>
<span class="line"><span> // 返回数据</span></span>
<span class="line"><span>})</span></span>
<span class="line"><span></span></span>
<span class="line"><span>router.get(&#39;*&#39;, async (ctx) =&gt; {</span></span>
<span class="line"><span> // 返回 HTML</span></span>
<span class="line"><span>})</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br></div></div></li><li><p>3、通过访问 url <strong>匹配</strong> 前端页面路由:</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>// 前端页面路由</span></span>
<span class="line"><span>import { pages } from &#39;../../client/app&#39;</span></span>
<span class="line"><span>import { matchPath } from &#39;react-router-dom&#39;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// 使用 react-router 库提供的一个匹配方法</span></span>
<span class="line"><span>const matchPage = matchPath(ctx.req.url, page)</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br></div></div></li><li><p>4、通过页面路由的配置进行 <strong>数据获取</strong>。通常可以在页面路由中增加 SSR 相关的静态配置，用于抽象逻辑，可以保证服务端逻辑的通用性，如:</p><pre><code>\`\`\`
class HomePage extends React.Component{
 public static ssrConfig = {
    cache: true,
         fetch() {
           // 请求获取数据
         }
    }
}

\`\`\`

获取数据通常有两种情况:
</code></pre><ul><li><p>中间层也使用 <strong>http</strong> 获取数据，则此时 fetch 方法可前后端共享；</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>const data = await matchPage.ssrConfig.fetch()</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div></li><li><p>中间层并不使用 http，是通过一些 <strong>内部调用</strong>，例如 Rpc 或 直接读数据库 等，此时也可以直接由服务端调用对应的方法获取数据。通常，这里需要在 ssrConfig 中配置特异性的信息，用于匹配对应的数据获取方法。</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>// 页面路由</span></span>
<span class="line"><span>class HomePage extends React.Component{</span></span>
<span class="line"><span> public static ssrConfig = {</span></span>
<span class="line"><span>        fetch: {</span></span>
<span class="line"><span>          url: &#39;/api/home&#39;,</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// 根据规则匹配出对应的数据获取方法</span></span>
<span class="line"><span>// 这里的规则可以自由，只要能匹配出正确的方法即可</span></span>
<span class="line"><span>const controller = matchController(ssrConfig.fetch.url)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// 获取数据</span></span>
<span class="line"><span>const data = await controller(ctx)</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br></div></div></li></ul></li><li><p>5、创建 Redux store，并将数据<code>dispatch</code>到里面:</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>import { createStore } from &#39;redux&#39;</span></span>
<span class="line"><span>// 获取 Clinet层 reducer</span></span>
<span class="line"><span>// 必须复用前端层的逻辑，才能保证一致性；</span></span>
<span class="line"><span>import { reducers } from &#39;../../client/store&#39;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// 创建 store</span></span>
<span class="line"><span>const store = createStore(reducers)</span></span>
<span class="line"><span> </span></span>
<span class="line"><span>// 获取配置好的 Action</span></span>
<span class="line"><span>const action = ssrConfig.action</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// 存储数据 </span></span>
<span class="line"><span>store.dispatch(createAction(action)(data))</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br></div></div></li><li><p>6、注入 Store， 调用<code>renderToString</code>将 React Virtual Dom 渲染成 <strong>字符串</strong>:</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>import * as ReactDOMServer from &#39;react-dom/server&#39;</span></span>
<span class="line"><span>import { Provider } from &#39;react-redux&#39;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// 获取 Clinet 层根组件</span></span>
<span class="line"><span>import { App } from &#39;../../client/app&#39;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>const AppString = ReactDOMServer.renderToString(</span></span>
<span class="line"><span> &lt;Provider store={store}&gt;</span></span>
<span class="line"><span>  &lt;StaticRouter</span></span>
<span class="line"><span>   location={ctx.req.url}</span></span>
<span class="line"><span>   context={{}}&gt;</span></span>
<span class="line"><span>   &lt;App /&gt;</span></span>
<span class="line"><span>  &lt;/StaticRouter&gt;</span></span>
<span class="line"><span> &lt;/Provider&gt;</span></span>
<span class="line"><span>)</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br></div></div></li><li><p>7、将 AppString 包装成完整的 html 文件格式；</p></li><li><p>8、此时，已经能生成完整的 HTML 文件。但只是个纯静态的页面，没有样式没有交互。接下来我们就是要插入 JS 与 CSS。我们可以通过访问前端打包后生成的<code>asset-manifest.json</code>文件来获取相应的文件路径，并同样注入到 Html 中引用。</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>const html = \`</span></span>
<span class="line"><span> &lt;!DOCTYPE html&gt;</span></span>
<span class="line"><span> &lt;html lang=&quot;zh&quot;&gt;</span></span>
<span class="line"><span>  &lt;head&gt;&lt;/head&gt;</span></span>
<span class="line"><span>  &lt;link href=&quot;\${cssPath}&quot; rel=&quot;stylesheet&quot; /&gt;</span></span>
<span class="line"><span>  &lt;body&gt;</span></span>
<span class="line"><span>   &lt;div id=&quot;App&quot;&gt;\${AppString}&lt;/div&gt;</span></span>
<span class="line"><span>   &lt;script src=&quot;\${scriptPath}&quot;&gt;&lt;/script&gt;</span></span>
<span class="line"><span>  &lt;/body&gt;</span></span>
<span class="line"><span> &lt;/html&gt;</span></span>
<span class="line"><span>\`</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br></div></div></li><li><p>9、进行 <strong>数据脱水</strong>: 为了把服务端获取的数据同步到前端。主要是将数据序列化后，插入到 html 中，返回给前端。</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>import serialize from &#39;serialize-javascript&#39;</span></span>
<span class="line"><span>// 获取数据</span></span>
<span class="line"><span>const initState = store.getState()</span></span>
<span class="line"><span>const html = \`</span></span>
<span class="line"><span> &lt;!DOCTYPE html&gt;</span></span>
<span class="line"><span> &lt;html lang=&quot;zh&quot;&gt;</span></span>
<span class="line"><span>  &lt;head&gt;&lt;/head&gt;</span></span>
<span class="line"><span>  &lt;body&gt;</span></span>
<span class="line"><span>   &lt;div id=&quot;App&quot;&gt;&lt;/div&gt;</span></span>
<span class="line"><span>   &lt;script type=&quot;application/json&quot; id=&quot;SSR_HYDRATED_DATA&quot;&gt;\${serialize(initState)}&lt;/script&gt;</span></span>
<span class="line"><span>  &lt;/body&gt;</span></span>
<span class="line"><span> &lt;/html&gt;</span></span>
<span class="line"><span>\`</span></span>
<span class="line"><span></span></span>
<span class="line"><span>ctx.status = 200</span></span>
<span class="line"><span>ctx.body = html</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br></div></div><blockquote><p><strong>Tips</strong>:</p><p>这里比较特别的有两点:</p><ol><li><p>使用了<code>serialize-javascript</code>序列化 store， 替代了<code>JSON.stringify</code>，保证数据的安全性，避免代码注入和 XSS 攻击；</p></li><li><p>使用 json 进行传输，可以获得更快的加载速度；</p></li></ol></blockquote></li><li><p>10、Client 层 <strong>数据吸水</strong>: 初始化 store 时，以脱水后的数据为初始化数据，同步创建 store。</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>const hydratedEl = document.getElementById(&#39;SSR_HYDRATED_DATA&#39;)</span></span>
<span class="line"><span>const hydrateData = JSON.parse(hydratedEl.textContent)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// 使用初始 state 创建 Redux store</span></span>
<span class="line"><span>const store = createStore(reducer, hydrateData)</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div></li></ul></li></ul><h3 id="_8-函数式编程" tabindex="-1">8. 函数式编程 <a class="header-anchor" href="#_8-函数式编程" aria-label="Permalink to &quot;8\\. 函数式编程&quot;">​</a></h3><p>函数式编程是一种 <strong>编程范式</strong>，你可以理解为一种软件架构的思维模式。它有着独立一套理论基础与边界法则，追求的是 <strong>更简洁、可预测、高复用、易测试</strong>。其实在现有的众多知名库中，都蕴含着丰富的函数式编程思想，如 React / Redux 等。</p><ul><li><p><strong>常见的编程范式</strong>:</p><ul><li>命令式编程(过程化编程): 更关心解决问题的步骤，一步步以语言的形式告诉计算机做什么；</li><li>事件驱动编程: 事件订阅与触发，被广泛用于 GUI 的编程设计中；</li><li>面向对象编程: 基于类、对象与方法的设计模式，拥有三个基础概念: 封装性、继承性、多态性；</li><li>函数式编程 <ul><li>换成一种更高端的说法，面向数学编程。怕不怕~🥴</li></ul></li></ul></li><li><p><strong>函数式编程的理念</strong>:</p><ul><li><p><strong>纯函数</strong>(确定性函数): 是函数式编程的基础，可以使程序变得灵活，高度可拓展，可维护；</p><ul><li><p><strong>优势</strong>:</p><ul><li>完全独立，与外部解耦；</li><li>高度可复用，在任意上下文，任意时间线上，都可执行并且保证结果稳定；</li><li>可测试性极强；</li></ul></li><li><p><strong>条件</strong>:</p><ul><li>不修改参数；</li><li>不依赖、不修改任何函数外部的数据；</li><li>完全可控，参数一样，返回值一定一样: 例如函数不能包含<code>new Date()</code>或者<code>Math.rando()</code>等这种不可控因素；</li><li>引用透明；</li></ul></li><li><p>我们常用到的许多 API 或者工具函数，它们都具有着纯函数的特点， 如<code>split / join / map</code>；</p></li></ul></li><li><p><strong>函数复合</strong>: 将多个函数进行组合后调用，可以实现将一个个函数单元进行组合，达成最后的目标；</p><ul><li><p><strong>扁平化嵌套</strong>: 首先，我们一定能想到组合函数最简单的操作就是 包裹，因为在 JS 中，函数也可以当做参数:</p><ul><li><code>f(g(k(x)))</code>: 嵌套地狱，可读性低，当函数复杂后，容易让人一脸懵逼；</li><li>理想的做法: <code>xxx(f, g, k)(x)</code></li></ul></li><li><p><strong>结果传递</strong>: 如果想实现上面的方式，那也就是<code>xxx</code>函数要实现的便是: 执行结果在各个函数之间的执行传递；</p><ul><li><p>这时我们就能想到一个原生提供的数组方法: <code>reduce</code>，它可以按数组的顺序依次执行，传递执行结果；</p></li><li><p>所以我们就能够实现一个方法<code>pipe</code>，用于函数组合:</p><pre><code>\`\`\`
// ...fs: 将函数组合成数组；
// Array.prototype.reduce 进行组合；
// p: 初始参数；
const pipe = (...fs) =&gt; p =&gt; fs.reduce((v, f) =&gt; f(v), p)

\`\`\`
</code></pre></li></ul></li><li><p><strong>使用</strong>: 实现一个 驼峰命名 转 中划线命名 的功能:</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>// &#39;Guo DongDong&#39; --&gt; &#39;guo-dongdong&#39;</span></span>
<span class="line"><span>// 函数组合式写法</span></span>
<span class="line"><span>const toLowerCase = str =&gt; str.toLowerCase()</span></span>
<span class="line"><span>const join = curry((str, arr) =&gt; arr.join(str))</span></span>
<span class="line"><span>const split = curry((splitOn, str) =&gt; str.split(splitOn));</span></span>
<span class="line"><span></span></span>
<span class="line"><span>const toSlug = pipe(</span></span>
<span class="line"><span> toLowerCase, </span></span>
<span class="line"><span> split(&#39; &#39;),</span></span>
<span class="line"><span> join(&#39;_&#39;),</span></span>
<span class="line"><span> encodeURIComponent,</span></span>
<span class="line"><span>);</span></span>
<span class="line"><span>console.log(toSlug(&#39;Guo DongDong&#39;))</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br></div></div></li><li><p><strong>好处</strong>:</p><ul><li><p>隐藏中间参数，不需要临时变量，避免了这个环节的出错几率；</p></li><li><p>只需关注每个纯函数单元的稳定，不再需要关注命名，传递，调用等；</p></li><li><p>可复用性强，任何一个函数单元都可被任意复用和组合；</p></li><li><p>可拓展性强，成本低，例如现在加个需求，要查看每个环节的输出:</p><pre><code>\`\`\`
const log = curry((label, x) =&gt; {
 console.log(\`\${ label }: \${ x }\`);
 return x;
});

const toSlug = pipe(
 toLowerCase, 
 log(&#39;toLowerCase output&#39;),
 split(&#39; &#39;),
 log(&#39;split output&#39;),
 join(&#39;_&#39;),
 log(&#39;join output&#39;),
 encodeURIComponent,
);

\`\`\`
</code></pre><blockquote><p>Tips:</p><p>一些工具纯函数可直接引用<code>lodash/fp</code>，例如<code>curry/map/split</code>等，并不需要像我们上面这样自己实现；</p></blockquote></li></ul></li></ul></li><li><p><strong>数据不可变性</strong>(immutable): 这是一种数据理念，也是函数式编程中的核心理念之一:</p><ul><li><strong>倡导</strong>: 一个对象再被创建后便不会再被修改。当需要改变值时，是返回一个全新的对象，而不是直接在原对象上修改；</li><li><strong>目的</strong>: 保证数据的稳定性。避免依赖的数据被未知地修改，导致了自身的执行异常，能有效提高可控性与稳定性；</li><li>并不等同于<code>const</code>。使用<code>const</code>创建一个对象后，它的属性仍然可以被修改；</li><li>更类似于<code>Object.freeze</code>: 冻结对象，但<code>freeze</code>仍无法保证深层的属性不被串改；</li><li><code>immutable.js</code>: js 中的数据不可变库，它保证了数据不可变，在 React 生态中被广泛应用，大大提升了性能与稳定性； <ul><li><code>trie</code>数据结构: <ul><li>一种数据结构，能有效地深度冻结对象，保证其不可变；</li><li><strong>结构共享</strong>: 可以共用不可变对象的内存引用地址，减少内存占用，提高数据操作性能；</li></ul></li></ul></li></ul></li><li><p>避免不同函数之间的 <strong>状态共享</strong>，数据的传递使用复制或全新对象，遵守数据不可变原则；</p></li><li><p>避免从函数内部 <strong>改变外部状态</strong>，例如改变了全局作用域或父级作用域上的变量值，可能会导致其它单位错误；</p></li><li><p>避免在单元函数内部执行一些 <strong>副作用</strong>，应该将这些操作抽离成更独立的工具单元；</p><ul><li>日志输出</li><li>读写文件</li><li>网络请求</li><li>调用外部进程</li><li>调用有副作用的函数</li></ul></li></ul></li><li><p><strong>高阶函数</strong>: 是指 以函数为参数，返回一个新的增强函数 的一类函数，它通常用于:</p><ul><li>将逻辑行为进行 <strong>隔离抽象</strong>，便于快速复用，如处理数据，兼容性等；</li><li><strong>函数组合</strong>，将一系列单元函数列表组合成功能更强大的函数；</li><li><strong>函数增强</strong>，快速地拓展函数功能，</li></ul></li><li><p><strong>函数式编程的好处</strong>:</p><ul><li>函数副作用小，所有函数独立存在，没有任何耦合，复用性极高；</li><li>不关注执行时间，执行顺序，参数，命名等，能专注于数据的流动与处理，能有效提高稳定性与健壮性；</li><li>追求单元化，粒度化，使其重构和改造成本降低，可维护、可拓展性较好；</li><li>更易于做单元测试。</li></ul></li><li><p><strong>总结</strong>:</p><ul><li>函数式编程其实是一种编程思想，它追求更细的粒度，将应用拆分成一组组极小的单元函数，组合调用操作数据流；</li><li>它提倡着 纯函数 / 函数复合 / 数据不可变， 谨慎对待函数内的 状态共享 / 依赖外部 / 副作用；</li></ul></li></ul><blockquote><p>Tips:</p><p>其实我们很难也不需要在面试过程中去完美地阐述出整套思想，这里也只是浅尝辄止，一些个人理解而已。博主也是初级小菜鸟，停留在表面而已，只求对大家能有所帮助，轻喷🤣；</p><p>我个人觉得: 这些编程范式之间，其实并不矛盾，各有各的 <strong>优劣势</strong>。</p><p>理解和学习它们的理念与优势，合理地 <strong>设计融合</strong>，将优秀的软件编程思想用于提升我们应用；</p><p>所有设计思想，最终的目标一定是使我们的应用更加 <strong>解耦颗粒化、易拓展、易测试、高复用，开发更为高效和安全</strong>；</p><p>有一些库能让大家很快地接触和运用函数思想: <code>Underscore.js</code> / <code>Lodash/fp</code> / <code>Rxjs</code> 等。</p></blockquote>`,47);function m(g,h,v,k,f,C){const p=a("ArticleMetadata"),e=a("ClientOnly");return i(),t("div",null,[d,s(e,null,{default:r(()=>[s(p)]),_:1}),b])}const R=l(u,[["render",m]]);export{y as __pageData,R as default};
