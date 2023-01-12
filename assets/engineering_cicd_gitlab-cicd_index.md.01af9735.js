import{_ as e,o as c,c as o,b as s,w as r,d as n,e as i,a as t,r as a}from"./app.1fbcae6f.js";const _=JSON.parse('{"title":"GitLab CI 从入门到实践","description":"","frontmatter":{"createTime":"2022/11/10","tag":"工程化,cicd"},"headers":[{"level":2,"title":"一、Gitlab CI 是什么？","slug":"一、gitlab-ci-是什么","link":"#一、gitlab-ci-是什么","children":[]},{"level":2,"title":"二、如何使用？","slug":"二、如何使用","link":"#二、如何使用","children":[{"level":3,"title":"Gitlab CI的使用主要需要2大步骤","slug":"gitlab-ci的使用主要需要2大步骤","link":"#gitlab-ci的使用主要需要2大步骤","children":[]},{"level":3,"title":"步骤一：配置runner","slug":"步骤一-配置runner","link":"#步骤一-配置runner","children":[]},{"level":3,"title":"步骤二：创建.gitlab-ci.yml文件","slug":"步骤二-创建-gitlab-ci-yml文件","link":"#步骤二-创建-gitlab-ci-yml文件","children":[]}]},{"level":2,"title":"三、如何编写.gitlab-ci.yml文件？","slug":"三、如何编写-gitlab-ci-yml文件","link":"#三、如何编写-gitlab-ci-yml文件","children":[{"level":3,"title":"YAML语法","slug":"yaml语法","link":"#yaml语法","children":[]},{"level":3,"title":"流水线环节梳理","slug":"流水线环节梳理","link":"#流水线环节梳理","children":[]},{"level":3,"title":"结构图","slug":"结构图","link":"#结构图","children":[]}]},{"level":2,"title":"Gitlab-CI 关键字","slug":"gitlab-ci-关键字","link":"#gitlab-ci-关键字","children":[{"level":3,"title":"script","slug":"script","link":"#script","children":[]},{"level":3,"title":"before_script","slug":"before-script","link":"#before-script","children":[]},{"level":3,"title":"variables变量","slug":"variables变量","link":"#variables变量","children":[]},{"level":3,"title":"image","slug":"image","link":"#image","children":[]},{"level":3,"title":"stages","slug":"stages","link":"#stages","children":[]},{"level":3,"title":"stage","slug":"stage","link":"#stage","children":[]},{"level":3,"title":"cache","slug":"cache","link":"#cache","children":[]},{"level":3,"title":"retry","slug":"retry","link":"#retry","children":[]},{"level":3,"title":"only & except","slug":"only-except","link":"#only-except","children":[]},{"level":3,"title":"rules:if","slug":"rules-if","link":"#rules-if","children":[]},{"level":3,"title":"workflow","slug":"workflow","link":"#workflow","children":[]},{"level":3,"title":"when","slug":"when","link":"#when","children":[]},{"level":3,"title":"tags","slug":"tags","link":"#tags","children":[]},{"level":3,"title":"注意事项","slug":"注意事项","link":"#注意事项","children":[]},{"level":3,"title":"模块化写法","slug":"模块化写法","link":"#模块化写法","children":[]}]},{"level":2,"title":"四、Demo配置+运行示例","slug":"四、demo配置-运行示例","link":"#四、demo配置-运行示例","children":[{"level":3,"title":"流水线Demo1(基础用法)","slug":"流水线demo1-基础用法","link":"#流水线demo1-基础用法","children":[]},{"level":3,"title":"流水线Demo2(详细示例)","slug":"流水线demo2-详细示例","link":"#流水线demo2-详细示例","children":[]}]}],"relativePath":"engineering/cicd/gitlab-cicd/index.md","lastUpdated":1668091633000}'),b={name:"engineering/cicd/gitlab-cicd/index.md"},y=n("h1",{id:"gitlab-ci-从入门到实践",tabindex:"-1"},[i("GitLab CI 从入门到实践 "),n("a",{class:"header-anchor",href:"#gitlab-ci-从入门到实践","aria-hidden":"true"},"#")],-1),d=t(`<h2 id="一、gitlab-ci-是什么" tabindex="-1">一、Gitlab CI 是什么？ <a class="header-anchor" href="#一、gitlab-ci-是什么" aria-hidden="true">#</a></h2><p>现代持续的软件开发导致了开发者需要持续的build, test 和 deploy 重复的代码更改，这些重复的过程非常的繁琐，但是对保证代码持续更新迭代来说又非常的重要。此时便需要一种非人为手动的方法来帮助我们自动完成这些重复的工作。</p><p>这个自动完成工作的理念被称为CI/CD. 在这里Gitlab CI/CD就是Gitlab官方发布的一种自动流水线帮助开发者完成重复性工作的一个服务。</p><p>比如字节某内部工具E*** CI 则是在Gitlab CI 和 Codebase CI的基础上改进，增加更细节的使用场景分类，对monorepo支持更加的友好。</p><h2 id="二、如何使用" tabindex="-1">二、如何使用？ <a class="header-anchor" href="#二、如何使用" aria-hidden="true">#</a></h2><h3 id="gitlab-ci的使用主要需要2大步骤" tabindex="-1">Gitlab CI的使用主要需要2大步骤 <a class="header-anchor" href="#gitlab-ci的使用主要需要2大步骤" aria-hidden="true">#</a></h3><h3 id="步骤一-配置runner" tabindex="-1">步骤一：配置runner <a class="header-anchor" href="#步骤一-配置runner" aria-hidden="true">#</a></h3><blockquote><p>我们可以简单的把Gitlab runner给理解成<code>.gitlab-ci.yml</code> 文件内容的执行者，<code>.gitlab-ci.yml</code> 告诉了Gitlab runner去做什么。</p><p>Gitlab runner不是一个配置项，它是需要专门部署的，比如用docker部署一个runner镜像到可以连接内网的容器。也可以使用公司内配好的shared runners.</p></blockquote><p>使用公共的runner，或者自己创建一个runner</p><ol><li><h4 id="使用shared-runner" tabindex="-1">使用shared runner <a class="header-anchor" href="#使用shared-runner" aria-hidden="true">#</a></h4></li></ol><p>无需多余操作，请确保shared runner选项被enable了即可<strong>直接使用</strong>公共runner。（如下）</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/06f534c890984ad7a97475bca98e2d9c~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.image" alt="图片"></p><ol start="2"><li><h4 id="自己配置runner" tabindex="-1">自己配置runner <a class="header-anchor" href="#自己配置runner" aria-hidden="true">#</a></h4></li></ol><blockquote><p>部署Gitlab runner官方文档：<a href="https://link.juejin.cn/?target=https%3A%2F%2Fdocs.gitlab.com%2Frunner%2Finstall%2Fdocker.html" title="https://docs.gitlab.com/runner/install/docker.html" target="_blank" rel="noreferrer">Run GitLab Runner in a container | GitLab</a></p><p>关联runner到gitlab官方文档：<a href="https://link.juejin.cn/?target=https%3A%2F%2Fdocs.gitlab.com%2Frunner%2Fregister%2Findex.html%23docker" title="https://docs.gitlab.com/runner/register/index.html#docker" target="_blank" rel="noreferrer">Registering runners | GitLab</a></p></blockquote><h4 id="a-安装docker" tabindex="-1">A. 安装docker <a class="header-anchor" href="#a-安装docker" aria-hidden="true">#</a></h4><div class="language-js line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki one-dark-pro vp-code-dark"><code><span class="line"><span style="color:#E06C75;">brew</span><span style="color:#ABB2BF;"> </span><span style="color:#E06C75;">install</span><span style="color:#ABB2BF;"> </span><span style="color:#56B6C2;">--</span><span style="color:#E06C75;">cask</span><span style="color:#ABB2BF;"> </span><span style="color:#E06C75;">docker</span></span>
<span class="line"></span></code></pre><pre class="shiki material-palenight vp-code-light"><code><span class="line"><span style="color:#A6ACCD;">brew install </span><span style="color:#89DDFF;">--</span><span style="color:#A6ACCD;">cask docker</span></span>
<span class="line"></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div><h4 id="b-启动gitlab-runner-container" tabindex="-1">B. 启动Gitlab runner container <a class="header-anchor" href="#b-启动gitlab-runner-container" aria-hidden="true">#</a></h4><p>起一个docker container来执行Gitlab Runner镜像</p><div class="language-yaml line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki one-dark-pro vp-code-dark"><code><span class="line"><span style="color:#ABB2BF;">  </span><span style="color:#98C379;">docker run -d --name gitlab-runner --restart always \\</span></span>
<span class="line"><span style="color:#ABB2BF;">   </span><span style="color:#98C379;">-v /Users/Shared/gitlab-runner/config:/etc/gitlab-runner \\</span></span>
<span class="line"><span style="color:#ABB2BF;">   </span><span style="color:#98C379;">-v /var/run/docker.sock:/var/run/docker.sock \\</span></span>
<span class="line"><span style="color:#ABB2BF;">   </span><span style="color:#98C379;">gitlab/gitlab-runner:latest</span></span>
<span class="line"></span></code></pre><pre class="shiki material-palenight vp-code-light"><code><span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#C3E88D;">docker run -d --name gitlab-runner --restart always \\</span></span>
<span class="line"><span style="color:#A6ACCD;">   </span><span style="color:#C3E88D;">-v /Users/Shared/gitlab-runner/config:/etc/gitlab-runner \\</span></span>
<span class="line"><span style="color:#A6ACCD;">   </span><span style="color:#C3E88D;">-v /var/run/docker.sock:/var/run/docker.sock \\</span></span>
<span class="line"><span style="color:#A6ACCD;">   </span><span style="color:#C3E88D;">gitlab/gitlab-runner:latest</span></span>
<span class="line"></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/dca7cb3c3a8e4f5f8de42d872f95bf1e~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.image" alt="图片"></p><p><strong>Note</strong>: macOS上面的共享文件夹要设置为<code>/Users/Shared/</code>而不是<code>/srv</code></p><h4 id="c-注册runner到gitlab" tabindex="-1">C. 注册runner到Gitlab <a class="header-anchor" href="#c-注册runner到gitlab" aria-hidden="true">#</a></h4><p>只用docker起一个gitlab runner不能将我们当前使用的gitlab repository和上一步创建的runner进行关联。在此需要将其进行相互关联，将runner注册到我们的gitlab repository</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/801f5c22e20b4adfbd57193dbe25d03d~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.image" alt="图片"></p><p>使用上图得到的URL和token去替换下面指令的<code>--url</code>和<code>--registration-token</code></p><p><code>--tag-list</code> 为当前runner的标签，在配置流水线job的时候使用，在此可随意配置不同的标签名</p><div class="language-yaml line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki one-dark-pro vp-code-dark"><code><span class="line"><span style="color:#98C379;">docker run --rm -v /Users/Shared/gitlab-runner/config:/etc/gitlab-runner gitlab/gitlab-runner register \\</span></span>
<span class="line"><span style="color:#ABB2BF;"> </span><span style="color:#98C379;">--non-interactive \\</span></span>
<span class="line"><span style="color:#ABB2BF;"> </span><span style="color:#98C379;">--executor &quot;docker&quot; \\</span></span>
<span class="line"><span style="color:#ABB2BF;"> </span><span style="color:#98C379;">--docker-image alpine:latest \\</span></span>
<span class="line"><span style="color:#ABB2BF;"> </span><span style="color:#98C379;">--url &quot;https://gitlab.com/&quot; \\</span></span>
<span class="line"><span style="color:#ABB2BF;"> </span><span style="color:#98C379;">--registration-token &quot;wc-Reg7qUpGRB4Lw3q9Y&quot; \\</span></span>
<span class="line"><span style="color:#ABB2BF;"> </span><span style="color:#98C379;">--description &quot;gitlab—cicd-runner&quot; \\</span></span>
<span class="line"><span style="color:#ABB2BF;"> </span><span style="color:#98C379;">--tag-list &quot;yehanli,liyehan&quot; \\</span></span>
<span class="line"><span style="color:#ABB2BF;"> </span><span style="color:#98C379;">--run-untagged=&quot;true&quot; \\</span></span>
<span class="line"><span style="color:#ABB2BF;"> </span><span style="color:#98C379;">--locked=&quot;false&quot; \\</span></span>
<span class="line"><span style="color:#ABB2BF;"> </span><span style="color:#98C379;">--access-level=&quot;not_protected&quot;</span></span>
<span class="line"></span>
<span class="line"></span></code></pre><pre class="shiki material-palenight vp-code-light"><code><span class="line"><span style="color:#C3E88D;">docker run --rm -v /Users/Shared/gitlab-runner/config:/etc/gitlab-runner gitlab/gitlab-runner register \\</span></span>
<span class="line"><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">--non-interactive \\</span></span>
<span class="line"><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">--executor &quot;docker&quot; \\</span></span>
<span class="line"><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">--docker-image alpine:latest \\</span></span>
<span class="line"><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">--url &quot;https://gitlab.com/&quot; \\</span></span>
<span class="line"><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">--registration-token &quot;wc-Reg7qUpGRB4Lw3q9Y&quot; \\</span></span>
<span class="line"><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">--description &quot;gitlab—cicd-runner&quot; \\</span></span>
<span class="line"><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">--tag-list &quot;yehanli,liyehan&quot; \\</span></span>
<span class="line"><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">--run-untagged=&quot;true&quot; \\</span></span>
<span class="line"><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">--locked=&quot;false&quot; \\</span></span>
<span class="line"><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">--access-level=&quot;not_protected&quot;</span></span>
<span class="line"></span>
<span class="line"></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br></div></div><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/eae0169c8551445ca5e0b055dba6df3c~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.image" alt="图片"></p><p>至此，Gitlab runner和配置均已成功，打开setting/CICD页面可以看到如下提示：</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/03fac75871da4cb687f96734e6ab2da3~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.image" alt="图片"></p><p>在docker中我们也可以看到正在运行的runner(如下):</p><p>暂时无法在飞书文档外展示此内容</p><h3 id="步骤二-创建-gitlab-ci-yml文件" tabindex="-1">步骤二：创建<code>.gitlab-ci.yml</code>文件 <a class="header-anchor" href="#步骤二-创建-gitlab-ci-yml文件" aria-hidden="true">#</a></h3><hr><p>在mono repo的根目录创建一个文件, 命名为<code>.gitlab-ci.yml</code>, 并将其push到master分支。</p><div class="language- line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki one-dark-pro vp-code-dark"><code><span class="line"><span style="color:#abb2bf;">git add .gitlab-ci.yml</span></span>
<span class="line"><span style="color:#abb2bf;">git commit -m &quot;Add .gitlab-ci.yml&quot;</span></span>
<span class="line"><span style="color:#abb2bf;">git push origin master</span></span>
<span class="line"><span style="color:#abb2bf;"></span></span></code></pre><pre class="shiki material-palenight vp-code-light"><code><span class="line"><span style="color:#A6ACCD;">git add .gitlab-ci.yml</span></span>
<span class="line"><span style="color:#A6ACCD;">git commit -m &quot;Add .gitlab-ci.yml&quot;</span></span>
<span class="line"><span style="color:#A6ACCD;">git push origin master</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><p><strong>Note:</strong></p><ul><li>在较低gitlab版本(比如11.4)，如果在master主分支下没有<code>.gitlab-ci.yml</code>的话，在Gitlab左侧的导航栏不会有Gitlab Runner这个tab。</li></ul><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/26b56339a1554678905efc940457c6c5~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.image" alt="图片"></p><ul><li>在项目的setting/CI/CD/General pipelines中，我们可以自定义设置CI设置文件的路径，默认如下</li></ul><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/c48c917d6d8c4cc8a41bf7d0ad635dbf~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.image" alt="图片"></p><h2 id="三、如何编写-gitlab-ci-yml文件" tabindex="-1">三、如何编写.gitlab-ci.yml文件？ <a class="header-anchor" href="#三、如何编写-gitlab-ci-yml文件" aria-hidden="true">#</a></h2><p>首先，让我们先来熟悉下yaml的常见写法，以及对比下它与json有什么不同。</p><p>Yaml Syntax写法详情具体请见 =&gt; <a href="https://link.juejin.cn/?target=https%3A%2F%2Fdocs.ansible.com%2Fansible%2Flatest%2Freference_appendices%2FYAMLSyntax.html" title="https://docs.ansible.com/ansible/latest/reference_appendices/YAMLSyntax.html" target="_blank" rel="noreferrer">YAML Syntax ‒ Ansible Documentation</a></p><h3 id="yaml语法" tabindex="-1">YAML语法 <a class="header-anchor" href="#yaml语法" aria-hidden="true">#</a></h3><h4 id="数组写法" tabindex="-1">数组写法 <a class="header-anchor" href="#数组写法" aria-hidden="true">#</a></h4><div class="language- line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki one-dark-pro vp-code-dark"><code><span class="line"><span style="color:#abb2bf;">{</span></span>
<span class="line"><span style="color:#abb2bf;">    &quot;array&quot;: [&quot;red&quot;, &quot;blue&quot;, &quot;yellow&quot;]</span></span>
<span class="line"><span style="color:#abb2bf;">}</span></span>
<span class="line"><span style="color:#abb2bf;"></span></span></code></pre><pre class="shiki material-palenight vp-code-light"><code><span class="line"><span style="color:#A6ACCD;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">    &quot;array&quot;: [&quot;red&quot;, &quot;blue&quot;, &quot;yellow&quot;]</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><p>转化为yaml为</p><div class="language- line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki one-dark-pro vp-code-dark"><code><span class="line"><span style="color:#abb2bf;">array:</span></span>
<span class="line"><span style="color:#abb2bf;">  - red</span></span>
<span class="line"><span style="color:#abb2bf;">  - blue</span></span>
<span class="line"><span style="color:#abb2bf;">  - yellow</span></span>
<span class="line"><span style="color:#abb2bf;"></span></span></code></pre><pre class="shiki material-palenight vp-code-light"><code><span class="line"><span style="color:#A6ACCD;">array:</span></span>
<span class="line"><span style="color:#A6ACCD;">  - red</span></span>
<span class="line"><span style="color:#A6ACCD;">  - blue</span></span>
<span class="line"><span style="color:#A6ACCD;">  - yellow</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><h4 id="对象写法" tabindex="-1">对象写法 <a class="header-anchor" href="#对象写法" aria-hidden="true">#</a></h4><div class="language- line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki one-dark-pro vp-code-dark"><code><span class="line"><span style="color:#abb2bf;">{</span></span>
<span class="line"><span style="color:#abb2bf;">  &quot;student1&quot;: {</span></span>
<span class="line"><span style="color:#abb2bf;">    &quot;name&quot;: &quot;小明&quot;</span></span>
<span class="line"><span style="color:#abb2bf;">  },</span></span>
<span class="line"><span style="color:#abb2bf;">  &quot;array&quot;: [&quot;red&quot;, &quot;blue&quot;, &quot;yellow&quot;],</span></span>
<span class="line"><span style="color:#abb2bf;">  &quot;student2&quot;: {</span></span>
<span class="line"><span style="color:#abb2bf;">    &quot;name&quot;: &quot;小明&quot;</span></span>
<span class="line"><span style="color:#abb2bf;">  }</span></span>
<span class="line"><span style="color:#abb2bf;">}</span></span>
<span class="line"><span style="color:#abb2bf;"></span></span>
<span class="line"><span style="color:#abb2bf;"></span></span></code></pre><pre class="shiki material-palenight vp-code-light"><code><span class="line"><span style="color:#A6ACCD;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">  &quot;student1&quot;: {</span></span>
<span class="line"><span style="color:#A6ACCD;">    &quot;name&quot;: &quot;小明&quot;</span></span>
<span class="line"><span style="color:#A6ACCD;">  },</span></span>
<span class="line"><span style="color:#A6ACCD;">  &quot;array&quot;: [&quot;red&quot;, &quot;blue&quot;, &quot;yellow&quot;],</span></span>
<span class="line"><span style="color:#A6ACCD;">  &quot;student2&quot;: {</span></span>
<span class="line"><span style="color:#A6ACCD;">    &quot;name&quot;: &quot;小明&quot;</span></span>
<span class="line"><span style="color:#A6ACCD;">  }</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br></div></div><p>转化为yaml为</p><div class="language- line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki one-dark-pro vp-code-dark"><code><span class="line"><span style="color:#abb2bf;"># 我是注释</span></span>
<span class="line"><span style="color:#abb2bf;">student1:</span></span>
<span class="line"><span style="color:#abb2bf;">  name: 小明</span></span>
<span class="line"><span style="color:#abb2bf;">array:</span></span>
<span class="line"><span style="color:#abb2bf;">  - red</span></span>
<span class="line"><span style="color:#abb2bf;">  - blue</span></span>
<span class="line"><span style="color:#abb2bf;">  - yellow</span></span>
<span class="line"><span style="color:#abb2bf;">student2:</span></span>
<span class="line"><span style="color:#abb2bf;">  name: 小明</span></span>
<span class="line"><span style="color:#abb2bf;"></span></span>
<span class="line"><span style="color:#abb2bf;"></span></span></code></pre><pre class="shiki material-palenight vp-code-light"><code><span class="line"><span style="color:#A6ACCD;"># 我是注释</span></span>
<span class="line"><span style="color:#A6ACCD;">student1:</span></span>
<span class="line"><span style="color:#A6ACCD;">  name: 小明</span></span>
<span class="line"><span style="color:#A6ACCD;">array:</span></span>
<span class="line"><span style="color:#A6ACCD;">  - red</span></span>
<span class="line"><span style="color:#A6ACCD;">  - blue</span></span>
<span class="line"><span style="color:#A6ACCD;">  - yellow</span></span>
<span class="line"><span style="color:#A6ACCD;">student2:</span></span>
<span class="line"><span style="color:#A6ACCD;">  name: 小明</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br></div></div><ul><li>yaml中不像json那样无法注释，我们可以用<code>#</code>进行注释</li></ul><h3 id="流水线环节梳理" tabindex="-1">流水线环节梳理 <a class="header-anchor" href="#流水线环节梳理" aria-hidden="true">#</a></h3><p>流水线的流程，根据配置的.gitlab-ci.yml文件可以分为如下几个环节：</p><ol><li><p>在单个的流水线任务执行之前进行配置</p></li><li><p>定义单个流水线任务(job)，并对此任务进行针对配置</p></li></ol><h3 id="结构图" tabindex="-1">结构图 <a class="header-anchor" href="#结构图" aria-hidden="true">#</a></h3><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/733d1e7793a44d97bbb402d7e4a83c48~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.image" alt="图片"></p><p>单个流水线任务的形式可以参考如下示例，具体字段释义可以暂时忽略，会在之后详解：</p><div class="language-yaml line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki one-dark-pro vp-code-dark"><code><span class="line"><span style="color:#7F848E;font-style:italic;"># 这个my_job的任务名是可以自定义起的</span></span>
<span class="line"><span style="color:#E06C75;">my_job</span><span style="color:#ABB2BF;">:</span></span>
<span class="line"><span style="color:#ABB2BF;">  </span><span style="color:#E06C75;">only</span><span style="color:#ABB2BF;">:</span></span>
<span class="line"><span style="color:#ABB2BF;">    - </span><span style="color:#98C379;">master</span><span style="color:#ABB2BF;">    </span></span>
<span class="line"><span style="color:#ABB2BF;">  </span><span style="color:#E06C75;">tags</span><span style="color:#ABB2BF;">:</span></span>
<span class="line"><span style="color:#ABB2BF;">    - </span><span style="color:#98C379;">yehanli</span></span>
<span class="line"><span style="color:#ABB2BF;">  </span><span style="color:#E06C75;">script</span><span style="color:#ABB2BF;">:</span></span>
<span class="line"><span style="color:#ABB2BF;">    - </span><span style="color:#98C379;">echo &#39;job ========= 完成&#39;</span></span>
<span class="line"><span style="color:#ABB2BF;">  </span><span style="color:#E06C75;">stage</span><span style="color:#ABB2BF;">: </span><span style="color:#98C379;">build</span></span>
<span class="line"><span style="color:#ABB2BF;">  </span><span style="color:#E06C75;">retry</span><span style="color:#ABB2BF;">: </span><span style="color:#D19A66;">2</span></span>
<span class="line"></span>
<span class="line"></span></code></pre><pre class="shiki material-palenight vp-code-light"><code><span class="line"><span style="color:#676E95;font-style:italic;"># 这个my_job的任务名是可以自定义起的</span></span>
<span class="line"><span style="color:#F07178;">my_job</span><span style="color:#89DDFF;">:</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">only</span><span style="color:#89DDFF;">:</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">-</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">master</span><span style="color:#A6ACCD;">    </span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">tags</span><span style="color:#89DDFF;">:</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">-</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">yehanli</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">script</span><span style="color:#89DDFF;">:</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">-</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">echo &#39;job ========= 完成&#39;</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">stage</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">build</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">retry</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">2</span></span>
<span class="line"></span>
<span class="line"></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br></div></div><h2 id="gitlab-ci-关键字" tabindex="-1">Gitlab-CI 关键字 <a class="header-anchor" href="#gitlab-ci-关键字" aria-hidden="true">#</a></h2><blockquote><p>Gitlab CI的关键字有很多，但实际常用的只有较小一部分。在此部分会对常用关键字进行详解。</p><p>如果需要特殊配置可参考关键字文档=&gt; <a href="https://link.juejin.cn/?target=https%3A%2F%2Fdocs.gitlab.com%2Fee%2Fci%2Fyaml%2F" title="https://docs.gitlab.com/ee/ci/yaml/" target="_blank" rel="noreferrer">Keyword reference for the <code>.gitlab-ci.yml</code> file |</a> <a href="https://link.juejin.cn/?target=https%3A%2F%2Fdocs.gitlab.com%2Fee%2Fci%2Fyaml%2F" title="https://docs.gitlab.com/ee/ci/yaml/" target="_blank" rel="noreferrer">GitLab</a></p></blockquote><p>首先让我们先来介绍下关键字，然后再看一份完整的配置demo进行详解。</p><h3 id="script" tabindex="-1">script <a class="header-anchor" href="#script" aria-hidden="true">#</a></h3><p>需要被运行的脚本。以数组形式配置。</p><div class="language- line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki one-dark-pro vp-code-dark"><code><span class="line"><span style="color:#abb2bf;">pipeline_job:</span></span>
<span class="line"><span style="color:#abb2bf;">  ......</span></span>
<span class="line"><span style="color:#abb2bf;">  script:</span></span>
<span class="line"><span style="color:#abb2bf;">    - cd &lt;文件夹目录路径&gt;</span></span>
<span class="line"><span style="color:#abb2bf;">    - npm install</span></span>
<span class="line"><span style="color:#abb2bf;">    - npm build</span></span>
<span class="line"><span style="color:#abb2bf;">  ......</span></span>
<span class="line"><span style="color:#abb2bf;"></span></span>
<span class="line"><span style="color:#abb2bf;"></span></span></code></pre><pre class="shiki material-palenight vp-code-light"><code><span class="line"><span style="color:#A6ACCD;">pipeline_job:</span></span>
<span class="line"><span style="color:#A6ACCD;">  ......</span></span>
<span class="line"><span style="color:#A6ACCD;">  script:</span></span>
<span class="line"><span style="color:#A6ACCD;">    - cd &lt;文件夹目录路径&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    - npm install</span></span>
<span class="line"><span style="color:#A6ACCD;">    - npm build</span></span>
<span class="line"><span style="color:#A6ACCD;">  ......</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br></div></div><h3 id="before-script" tabindex="-1">before_script <a class="header-anchor" href="#before-script" aria-hidden="true">#</a></h3><p>在所有的流水线任务执行之前需要执行的脚本，或者单个流水线任务中的script执行之前执行某些script</p><h3 id="variables变量" tabindex="-1">variables变量 <a class="header-anchor" href="#variables变量" aria-hidden="true">#</a></h3><p>在Gitlab-CI中，变量大致可分为三类：</p><ol><li><p>Gitlab给我们预先定义的变量，比如<code>CI_COMMIT_BRANCH</code>.</p><ol><li><a href="https://link.juejin.cn/?target=https%3A%2F%2Fdocs.gitlab.com%2Fee%2Fci%2Fvariables%2Fpredefined_variables.html" title="https://docs.gitlab.com/ee/ci/variables/predefined_variables.html" target="_blank" rel="noreferrer">Predefined variables reference | GitLab</a></li></ol></li><li><p>Setting =&gt; Gitlab CI/CD =&gt; variables中定义的变量</p></li></ol><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a79a7bf40eb64a4283eaeae26649b5ca~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.image" alt="图片"></p><ol start="3"><li>在.gitlab-ci.yml中定义的变量(如下示例) <a href="https://link.juejin.cn/?target=https%3A%2F%2Fdocs.gitlab.com%2Fee%2Fci%2Fvariables%2Findex.html%23create-a-custom-cicd-variable-in-the-gitlab-ciyml-file" title="https://docs.gitlab.com/ee/ci/variables/index.html#create-a-custom-cicd-variable-in-the-gitlab-ciyml-file" target="_blank" rel="noreferrer">GitLab</a> <a href="https://link.juejin.cn/?target=https%3A%2F%2Fdocs.gitlab.com%2Fee%2Fci%2Fvariables%2Findex.html%23create-a-custom-cicd-variable-in-the-gitlab-ciyml-file" title="https://docs.gitlab.com/ee/ci/variables/index.html#create-a-custom-cicd-variable-in-the-gitlab-ciyml-file" target="_blank" rel="noreferrer"></a><a href="https://link.juejin.cn/?target=https%3A%2F%2Fdocs.gitlab.com%2Fee%2Fci%2Fvariables%2Findex.html%23create-a-custom-cicd-variable-in-the-gitlab-ciyml-file" title="https://docs.gitlab.com/ee/ci/variables/index.html#create-a-custom-cicd-variable-in-the-gitlab-ciyml-file" target="_blank" rel="noreferrer">CI</a><a href="https://link.juejin.cn/?target=https%3A%2F%2Fdocs.gitlab.com%2Fee%2Fci%2Fvariables%2Findex.html%23create-a-custom-cicd-variable-in-the-gitlab-ciyml-file" title="https://docs.gitlab.com/ee/ci/variables/index.html#create-a-custom-cicd-variable-in-the-gitlab-ciyml-file" target="_blank" rel="noreferrer">/</a><a href="https://link.juejin.cn/?target=https%3A%2F%2Fdocs.gitlab.com%2Fee%2Fci%2Fvariables%2Findex.html%23create-a-custom-cicd-variable-in-the-gitlab-ciyml-file" title="https://docs.gitlab.com/ee/ci/variables/index.html#create-a-custom-cicd-variable-in-the-gitlab-ciyml-file" target="_blank" rel="noreferrer">CD</a> <a href="https://link.juejin.cn/?target=https%3A%2F%2Fdocs.gitlab.com%2Fee%2Fci%2Fvariables%2Findex.html%23create-a-custom-cicd-variable-in-the-gitlab-ciyml-file" title="https://docs.gitlab.com/ee/ci/variables/index.html#create-a-custom-cicd-variable-in-the-gitlab-ciyml-file" target="_blank" rel="noreferrer">variables | GitLab</a></li></ol><div class="language- line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki one-dark-pro vp-code-dark"><code><span class="line"><span style="color:#abb2bf;">variables:</span></span>
<span class="line"><span style="color:#abb2bf;">  TEST_VAR: &quot;All jobs can use this variable&#39;s value&quot;</span></span>
<span class="line"><span style="color:#abb2bf;"></span></span>
<span class="line"><span style="color:#abb2bf;">job1:</span></span>
<span class="line"><span style="color:#abb2bf;">  variables:</span></span>
<span class="line"><span style="color:#abb2bf;">    TEST_VAR_JOB: &quot;Only job1 can use this variable&#39;s value&quot;</span></span>
<span class="line"><span style="color:#abb2bf;">  script:</span></span>
<span class="line"><span style="color:#abb2bf;">    - echo &quot;$TEST_VAR&quot;</span></span>
<span class="line"><span style="color:#abb2bf;">  ......</span></span>
<span class="line"><span style="color:#abb2bf;"></span></span>
<span class="line"><span style="color:#abb2bf;"></span></span></code></pre><pre class="shiki material-palenight vp-code-light"><code><span class="line"><span style="color:#A6ACCD;">variables:</span></span>
<span class="line"><span style="color:#A6ACCD;">  TEST_VAR: &quot;All jobs can use this variable&#39;s value&quot;</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">job1:</span></span>
<span class="line"><span style="color:#A6ACCD;">  variables:</span></span>
<span class="line"><span style="color:#A6ACCD;">    TEST_VAR_JOB: &quot;Only job1 can use this variable&#39;s value&quot;</span></span>
<span class="line"><span style="color:#A6ACCD;">  script:</span></span>
<span class="line"><span style="color:#A6ACCD;">    - echo &quot;$TEST_VAR&quot;</span></span>
<span class="line"><span style="color:#A6ACCD;">  ......</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br></div></div><h3 id="image" tabindex="-1">image <a class="header-anchor" href="#image" aria-hidden="true">#</a></h3><p>CI流水线运行环境的docker镜像(任何相关的代码运行环境镜像皆可)，比如字节某内部工具e***的镜像，里面装了nvm管理器.</p><ul><li>比较常用的有：node, python, java, etc...</li></ul><h3 id="stages" tabindex="-1">stages <a class="header-anchor" href="#stages" aria-hidden="true">#</a></h3><p>Gitlab CI允许我们进行自定义的流水线阶段配置，我们可以将自己的流水线自我划分为若干<code>stages</code>，然后在不同的stage来做不同的事。（稍后会有示例）</p><p>stages会依次执行，如果前一个stage的任务没有运行完，后面的stage不会被触发。</p><p>一旦有一个stage中的任务fail掉了，下一个stage的任务便不会执行。如果当前stage定义了多个任务，那么其中一个任务失败，另外一个任务还是会被继续执行。</p><p>以下为自定义的stages：</p><div class="language- line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki one-dark-pro vp-code-dark"><code><span class="line"><span style="color:#abb2bf;">stages:</span></span>
<span class="line"><span style="color:#abb2bf;">  - first_stage</span></span>
<span class="line"><span style="color:#abb2bf;">  - second_stage</span></span>
<span class="line"><span style="color:#abb2bf;">  - third_stage</span></span>
<span class="line"><span style="color:#abb2bf;">  - fourth_stage</span></span>
<span class="line"><span style="color:#abb2bf;">  - fifth_stage</span></span>
<span class="line"><span style="color:#abb2bf;"></span></span>
<span class="line"><span style="color:#abb2bf;"></span></span></code></pre><pre class="shiki material-palenight vp-code-light"><code><span class="line"><span style="color:#A6ACCD;">stages:</span></span>
<span class="line"><span style="color:#A6ACCD;">  - first_stage</span></span>
<span class="line"><span style="color:#A6ACCD;">  - second_stage</span></span>
<span class="line"><span style="color:#A6ACCD;">  - third_stage</span></span>
<span class="line"><span style="color:#A6ACCD;">  - fourth_stage</span></span>
<span class="line"><span style="color:#A6ACCD;">  - fifth_stage</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br></div></div><p>如果没有自定义stages，那么默认的stages为<code>.pre =&gt; build =&gt; test =&gt; deploy =&gt; .post</code></p><p>(自定义stages会<strong>重写</strong>除了<code>.pre</code>, <code>.post</code>之外所有的默认stages)</p><div class="language- line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki one-dark-pro vp-code-dark"><code><span class="line"><span style="color:#abb2bf;">stages:</span></span>
<span class="line"><span style="color:#abb2bf;">  - .pre # 执行在所有的stages之前</span></span>
<span class="line"><span style="color:#abb2bf;">  - build</span></span>
<span class="line"><span style="color:#abb2bf;">  - test</span></span>
<span class="line"><span style="color:#abb2bf;">  - deploy</span></span>
<span class="line"><span style="color:#abb2bf;">  - .post # 执行在所有的stages之后</span></span>
<span class="line"><span style="color:#abb2bf;"></span></span>
<span class="line"><span style="color:#abb2bf;"></span></span></code></pre><pre class="shiki material-palenight vp-code-light"><code><span class="line"><span style="color:#A6ACCD;">stages:</span></span>
<span class="line"><span style="color:#A6ACCD;">  - .pre # 执行在所有的stages之前</span></span>
<span class="line"><span style="color:#A6ACCD;">  - build</span></span>
<span class="line"><span style="color:#A6ACCD;">  - test</span></span>
<span class="line"><span style="color:#A6ACCD;">  - deploy</span></span>
<span class="line"><span style="color:#A6ACCD;">  - .post # 执行在所有的stages之后</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br></div></div><p><strong>Note</strong>: build 中如果定义多个jobs，这些jobs是并行执行的，别的stage中的为依次执行。</p><h3 id="stage" tabindex="-1">stage <a class="header-anchor" href="#stage" aria-hidden="true">#</a></h3><p>stage为stages的一个子项，在我们自定义单个流水线任务时可以配置</p><h3 id="cache" tabindex="-1">cache <a class="header-anchor" href="#cache" aria-hidden="true">#</a></h3><p>缓存多个流水线任务之间共用的文件，目录， etc...</p><div class="language- line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki one-dark-pro vp-code-dark"><code><span class="line"><span style="color:#abb2bf;">cache:</span></span>
<span class="line"><span style="color:#abb2bf;">  key: cache-node-modules</span></span>
<span class="line"><span style="color:#abb2bf;">  # 在这里写出需要缓存的文件的路径，在此为node_modules</span></span>
<span class="line"><span style="color:#abb2bf;">  paths:</span></span>
<span class="line"><span style="color:#abb2bf;">    - node_modules</span></span>
<span class="line"><span style="color:#abb2bf;"></span></span>
<span class="line"><span style="color:#abb2bf;"></span></span></code></pre><pre class="shiki material-palenight vp-code-light"><code><span class="line"><span style="color:#A6ACCD;">cache:</span></span>
<span class="line"><span style="color:#A6ACCD;">  key: cache-node-modules</span></span>
<span class="line"><span style="color:#A6ACCD;">  # 在这里写出需要缓存的文件的路径，在此为node_modules</span></span>
<span class="line"><span style="color:#A6ACCD;">  paths:</span></span>
<span class="line"><span style="color:#A6ACCD;">    - node_modules</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br></div></div><h3 id="retry" tabindex="-1">retry <a class="header-anchor" href="#retry" aria-hidden="true">#</a></h3><p>一个job可以被重新执行的最大数量。必须是个正整数, 0-2, 2为最大值</p><ul><li>when可设置在特定失败原因的情况下执行</li></ul><div class="language- line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki one-dark-pro vp-code-dark"><code><span class="line"><span style="color:#abb2bf;">job:</span></span>
<span class="line"><span style="color:#abb2bf;">  script: rspec</span></span>
<span class="line"><span style="color:#abb2bf;">  retry:</span></span>
<span class="line"><span style="color:#abb2bf;">    max: 2</span></span>
<span class="line"><span style="color:#abb2bf;">    when: runner_system_failure</span></span>
<span class="line"><span style="color:#abb2bf;"></span></span>
<span class="line"><span style="color:#abb2bf;"></span></span></code></pre><pre class="shiki material-palenight vp-code-light"><code><span class="line"><span style="color:#A6ACCD;">job:</span></span>
<span class="line"><span style="color:#A6ACCD;">  script: rspec</span></span>
<span class="line"><span style="color:#A6ACCD;">  retry:</span></span>
<span class="line"><span style="color:#A6ACCD;">    max: 2</span></span>
<span class="line"><span style="color:#A6ACCD;">    when: runner_system_failure</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br></div></div><h3 id="only-except" tabindex="-1">only &amp; except <a class="header-anchor" href="#only-except" aria-hidden="true">#</a></h3><ul><li><p>only: 设置流水线任务执行时机</p></li><li><p>except: 设置流水线任务不执行时机</p></li></ul><p>可配置选项（常用的几个）：</p><table><thead><tr><th>&lt;分支名&gt;</th><th>特定分支change的时候触发</th></tr></thead><tbody><tr><td>pushes</td><td>git push时触发，适用于所有分支</td></tr><tr><td>merge_requests</td><td>MR被创建时触发，适用于所有分支</td></tr><tr><td>web</td><td>手动在Gitlab Runner/pipeline里面点击run pipeline时触发<img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b5a8ad4a548944afae78c11f9a4b3b68~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.image" alt="图片"></td></tr></tbody></table><p>配置branch名称来规定触发任务的分支(如下)，</p><div class="language- line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki one-dark-pro vp-code-dark"><code><span class="line"><span style="color:#abb2bf;">myjob:</span></span>
<span class="line"><span style="color:#abb2bf;">  only:</span></span>
<span class="line"><span style="color:#abb2bf;">    - master</span></span>
<span class="line"><span style="color:#abb2bf;"># 以上写法等同于</span></span>
<span class="line"><span style="color:#abb2bf;">myjob:</span></span>
<span class="line"><span style="color:#abb2bf;">  only:</span></span>
<span class="line"><span style="color:#abb2bf;">    variables:</span></span>
<span class="line"><span style="color:#abb2bf;">    # $CI_COMMIT_REF_NAME是一个gitlab的预设变量，代表当前commit给哪个branch上了</span></span>
<span class="line"><span style="color:#abb2bf;">    - $CI_COMMIT_REF_NAME == &quot;master&quot;</span></span>
<span class="line"><span style="color:#abb2bf;"></span></span>
<span class="line"><span style="color:#abb2bf;"></span></span></code></pre><pre class="shiki material-palenight vp-code-light"><code><span class="line"><span style="color:#A6ACCD;">myjob:</span></span>
<span class="line"><span style="color:#A6ACCD;">  only:</span></span>
<span class="line"><span style="color:#A6ACCD;">    - master</span></span>
<span class="line"><span style="color:#A6ACCD;"># 以上写法等同于</span></span>
<span class="line"><span style="color:#A6ACCD;">myjob:</span></span>
<span class="line"><span style="color:#A6ACCD;">  only:</span></span>
<span class="line"><span style="color:#A6ACCD;">    variables:</span></span>
<span class="line"><span style="color:#A6ACCD;">    # $CI_COMMIT_REF_NAME是一个gitlab的预设变量，代表当前commit给哪个branch上了</span></span>
<span class="line"><span style="color:#A6ACCD;">    - $CI_COMMIT_REF_NAME == &quot;master&quot;</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br></div></div><h3 id="rules-if" tabindex="-1">rules:if <a class="header-anchor" href="#rules-if" aria-hidden="true">#</a></h3><p>此字段可以在单个流水线job或者workflow字段下进行配置。</p><p><code>rules</code>关键词下可以进行if语句配置，如果if满足的话可执行某些自定义配置(会在流水线任务demo2中和<code>workflow</code>配置中展示如何使用)</p><div class="language- line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki one-dark-pro vp-code-dark"><code><span class="line"><span style="color:#abb2bf;">rules:</span></span>
<span class="line"><span style="color:#abb2bf;">  - if: $CI_COMMIT_REF_NAME =~ /feature/</span></span>
<span class="line"><span style="color:#abb2bf;"></span></span>
<span class="line"><span style="color:#abb2bf;"></span></span></code></pre><pre class="shiki material-palenight vp-code-light"><code><span class="line"><span style="color:#A6ACCD;">rules:</span></span>
<span class="line"><span style="color:#A6ACCD;">  - if: $CI_COMMIT_REF_NAME =~ /feature/</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><p><strong>注意</strong>: <code>only &amp; except</code>和<code>rules:if</code>都是用来决定单个job执行时机的，在配置时只能存在一个，否则会报错。</p><h3 id="workflow" tabindex="-1">workflow <a class="header-anchor" href="#workflow" aria-hidden="true">#</a></h3><p>需要和<code>rules</code>配合用来控制整个pipeline的行为，比如整个流水线执行与否。整个流水线正常运行的前提是其<code>rules</code>配置中的<code>if</code>语句至少需要触发一个.</p><p>在各个流水线任务的外层进行配置</p><div class="language- line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki one-dark-pro vp-code-dark"><code><span class="line"><span style="color:#abb2bf;">variables:</span></span>
<span class="line"><span style="color:#abb2bf;">  IS_FEATURE: &quot;false&quot;</span></span>
<span class="line"><span style="color:#abb2bf;">workflow:</span></span>
<span class="line"><span style="color:#abb2bf;">  rules:</span></span>
<span class="line"><span style="color:#abb2bf;">    - if: $CI_COMMIT_REF_NAME =~ /feature/</span></span>
<span class="line"><span style="color:#abb2bf;">      variables:</span></span>
<span class="line"><span style="color:#abb2bf;">        IS_FEATURE: &quot;true&quot;</span></span>
<span class="line"><span style="color:#abb2bf;">    - when: always # Run the pipeline in other cases</span></span>
<span class="line"><span style="color:#abb2bf;"></span></span>
<span class="line"><span style="color:#abb2bf;"></span></span></code></pre><pre class="shiki material-palenight vp-code-light"><code><span class="line"><span style="color:#A6ACCD;">variables:</span></span>
<span class="line"><span style="color:#A6ACCD;">  IS_FEATURE: &quot;false&quot;</span></span>
<span class="line"><span style="color:#A6ACCD;">workflow:</span></span>
<span class="line"><span style="color:#A6ACCD;">  rules:</span></span>
<span class="line"><span style="color:#A6ACCD;">    - if: $CI_COMMIT_REF_NAME =~ /feature/</span></span>
<span class="line"><span style="color:#A6ACCD;">      variables:</span></span>
<span class="line"><span style="color:#A6ACCD;">        IS_FEATURE: &quot;true&quot;</span></span>
<span class="line"><span style="color:#A6ACCD;">    - when: always # Run the pipeline in other cases</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br></div></div><h3 id="when" tabindex="-1">when <a class="header-anchor" href="#when" aria-hidden="true">#</a></h3><p>这个关键字和stage需要配合使用。如果一个stage fail掉了，那么我们应该期待下个stage怎么办呢？</p><p>(When to run a job?)</p><ul><li><p><code>on_success</code>(default): 所有之前stage的任务都执行成功了才执行当前stage的任务，或者之前fail的任务有配置了<code>allow_failure: true</code></p></li><li><p><code>on_failure</code> ：只有在之前的流水线任务有至少一次的fail之下才执行当前任务。</p></li><li><p><code>always</code>：无论之前的stage的流水线的任务状态如何，当前的任务都会触发。</p></li><li><p><code>never</code>：不运行当前任务</p></li><li><p><code>manual</code>：流水线手动触发,点击play，如下图</p></li></ul><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/90db4cb0cc4a4cc5a1df5229317d30bc~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.image" alt="图片"></p><ul><li><code>delayed</code>：延迟一段时间执行</li></ul><div class="language- line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki one-dark-pro vp-code-dark"><code><span class="line"><span style="color:#abb2bf;">timed rollout 10%:</span></span>
<span class="line"><span style="color:#abb2bf;">  stage: deploy</span></span>
<span class="line"><span style="color:#abb2bf;">  script: echo &#39;Rolling out 10% ...&#39;</span></span>
<span class="line"><span style="color:#abb2bf;">  when: delayed</span></span>
<span class="line"><span style="color:#abb2bf;">  # 在之前的stage执行后30mins后再运行这个任务</span></span>
<span class="line"><span style="color:#abb2bf;">  # 时间单位可以是seconds，minutes，day, week</span></span>
<span class="line"><span style="color:#abb2bf;">  start_in: 30 minutes</span></span>
<span class="line"><span style="color:#abb2bf;"></span></span>
<span class="line"><span style="color:#abb2bf;"></span></span></code></pre><pre class="shiki material-palenight vp-code-light"><code><span class="line"><span style="color:#A6ACCD;">timed rollout 10%:</span></span>
<span class="line"><span style="color:#A6ACCD;">  stage: deploy</span></span>
<span class="line"><span style="color:#A6ACCD;">  script: echo &#39;Rolling out 10% ...&#39;</span></span>
<span class="line"><span style="color:#A6ACCD;">  when: delayed</span></span>
<span class="line"><span style="color:#A6ACCD;">  # 在之前的stage执行后30mins后再运行这个任务</span></span>
<span class="line"><span style="color:#A6ACCD;">  # 时间单位可以是seconds，minutes，day, week</span></span>
<span class="line"><span style="color:#A6ACCD;">  start_in: 30 minutes</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br></div></div><h3 id="tags" tabindex="-1">tags <a class="header-anchor" href="#tags" aria-hidden="true">#</a></h3><p>这个是设定Gitlab 在执行脚本时使用哪个runner</p><h3 id="注意事项" tabindex="-1">注意事项 <a class="header-anchor" href="#注意事项" aria-hidden="true">#</a></h3><p>配置时有些关键字比如<code>workflow</code>，<code>rules</code>什么的会显示报错 <code>XXX config conatins unknown keys.</code></p><p>这个是因为公司的Gitlab版本较旧，Gitlab 12.5之后才支持这些配置。</p><p><strong>e.g:</strong></p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/9d7d5d8da67a44668a93b8261d19fb77~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.image" alt="图片"></p><p><code>only</code>中的<code>merge_requests</code>配置在11.6的版本后才支持，所以有些公司的Gitlab版本还是不支持 😦</p><h3 id="模块化写法" tabindex="-1">模块化写法 <a class="header-anchor" href="#模块化写法" aria-hidden="true">#</a></h3><blockquote><p>随着流水线任务的变多，把所有的任务都写在.gitlab-ci.yml文件中会显得很臃肿</p><p>解决方法是拆分多个任务到不同的模块</p></blockquote><p>在<code>.gitlab.yml</code>文件中按照如下写法即可引入不同的yml文件</p><div class="language- line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki one-dark-pro vp-code-dark"><code><span class="line"><span style="color:#abb2bf;">include:</span></span>
<span class="line"><span style="color:#abb2bf;">  - &#39;/yml/job_1_install.yml&#39;</span></span>
<span class="line"><span style="color:#abb2bf;">  - &#39;/yml/job_2_build.yml&#39;</span></span>
<span class="line"><span style="color:#abb2bf;">  - &#39;/yml/job_3_deploy.yml&#39;</span></span>
<span class="line"><span style="color:#abb2bf;"></span></span>
<span class="line"><span style="color:#abb2bf;"></span></span></code></pre><pre class="shiki material-palenight vp-code-light"><code><span class="line"><span style="color:#A6ACCD;">include:</span></span>
<span class="line"><span style="color:#A6ACCD;">  - &#39;/yml/job_1_install.yml&#39;</span></span>
<span class="line"><span style="color:#A6ACCD;">  - &#39;/yml/job_2_build.yml&#39;</span></span>
<span class="line"><span style="color:#A6ACCD;">  - &#39;/yml/job_3_deploy.yml&#39;</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/236eb1e2df804ee1810634af7062838f~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.image" alt="图片"></p><h2 id="四、demo配置-运行示例" tabindex="-1">四、Demo配置+运行示例 <a class="header-anchor" href="#四、demo配置-运行示例" aria-hidden="true">#</a></h2><blockquote><p>下面让我们来配合运行示例看一看文件配置是如何生效的</p></blockquote><h3 id="流水线demo1-基础用法" tabindex="-1">流水线Demo1(基础用法) <a class="header-anchor" href="#流水线demo1-基础用法" aria-hidden="true">#</a></h3><div class="language- line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki one-dark-pro vp-code-dark"><code><span class="line"><span style="color:#abb2bf;"># .gitlab-ci.yml</span></span>
<span class="line"><span style="color:#abb2bf;"># 镜像为node的环境镜像，如果用的是别的环境可以更改为别的项目环境的镜像</span></span>
<span class="line"><span style="color:#abb2bf;">image: node:latest</span></span>
<span class="line"><span style="color:#abb2bf;"></span></span>
<span class="line"><span style="color:#abb2bf;"># 自定义stages</span></span>
<span class="line"><span style="color:#abb2bf;">stages:</span></span>
<span class="line"><span style="color:#abb2bf;">  - first_stage</span></span>
<span class="line"><span style="color:#abb2bf;">  - second_stage</span></span>
<span class="line"><span style="color:#abb2bf;">  - third_stage</span></span>
<span class="line"><span style="color:#abb2bf;">  - fourth_stage</span></span>
<span class="line"><span style="color:#abb2bf;">  - fifth_stage</span></span>
<span class="line"><span style="color:#abb2bf;">  </span></span>
<span class="line"><span style="color:#abb2bf;"># 自定义任务1</span></span>
<span class="line"><span style="color:#abb2bf;">job_1_push:</span></span>
<span class="line"><span style="color:#abb2bf;">  only:</span></span>
<span class="line"><span style="color:#abb2bf;">    - pushes</span></span>
<span class="line"><span style="color:#abb2bf;">  # 设置使用fe tags标签的shared runner</span></span>
<span class="line"><span style="color:#abb2bf;">  tags:</span></span>
<span class="line"><span style="color:#abb2bf;">    - yehanli</span></span>
<span class="line"><span style="color:#abb2bf;">  # 当前任务需要执行的脚本</span></span>
<span class="line"><span style="color:#abb2bf;">  script:</span></span>
<span class="line"><span style="color:#abb2bf;">    - echo &#39;job1 ========= 完成&#39;</span></span>
<span class="line"><span style="color:#abb2bf;">  # 设置当前任务的stage</span></span>
<span class="line"><span style="color:#abb2bf;">  stage: first_stage</span></span>
<span class="line"><span style="color:#abb2bf;">  </span></span>
<span class="line"><span style="color:#abb2bf;"># 自定义任务2</span></span>
<span class="line"><span style="color:#abb2bf;">job_2_push:</span></span>
<span class="line"><span style="color:#abb2bf;">  only:</span></span>
<span class="line"><span style="color:#abb2bf;">    - pushes</span></span>
<span class="line"><span style="color:#abb2bf;">  tags:</span></span>
<span class="line"><span style="color:#abb2bf;">    - yehanli</span></span>
<span class="line"><span style="color:#abb2bf;">  script:</span></span>
<span class="line"><span style="color:#abb2bf;">    - echo &#39;job2 ========= 完成&#39;</span></span>
<span class="line"><span style="color:#abb2bf;">  stage: third_stage</span></span>
<span class="line"><span style="color:#abb2bf;"># 自定义任务3</span></span>
<span class="line"><span style="color:#abb2bf;">job_3_push:</span></span>
<span class="line"><span style="color:#abb2bf;">  only:</span></span>
<span class="line"><span style="color:#abb2bf;">    - pushes</span></span>
<span class="line"><span style="color:#abb2bf;">  tags:</span></span>
<span class="line"><span style="color:#abb2bf;">    - yehanli</span></span>
<span class="line"><span style="color:#abb2bf;">  script:</span></span>
<span class="line"><span style="color:#abb2bf;">    - echo &#39;job3 ========= 完成&#39;</span></span>
<span class="line"><span style="color:#abb2bf;">  stage: fourth_stage</span></span>
<span class="line"><span style="color:#abb2bf;">  # 设置当前任务为手动触发</span></span>
<span class="line"><span style="color:#abb2bf;">  when: manual</span></span>
<span class="line"><span style="color:#abb2bf;">  </span></span>
<span class="line"><span style="color:#abb2bf;"># 自定义任务4</span></span>
<span class="line"><span style="color:#abb2bf;">job_4_push:</span></span>
<span class="line"><span style="color:#abb2bf;">  only:</span></span>
<span class="line"><span style="color:#abb2bf;">    - pushes</span></span>
<span class="line"><span style="color:#abb2bf;">    - tags</span></span>
<span class="line"><span style="color:#abb2bf;">  tags:</span></span>
<span class="line"><span style="color:#abb2bf;">    - yehanli</span></span>
<span class="line"><span style="color:#abb2bf;">  script:</span></span>
<span class="line"><span style="color:#abb2bf;">    - echo &#39;job4 ========= 完成&#39;</span></span>
<span class="line"><span style="color:#abb2bf;">  stage: fourth_stage</span></span>
<span class="line"><span style="color:#abb2bf;">  when: always</span></span>
<span class="line"><span style="color:#abb2bf;"> </span></span>
<span class="line"><span style="color:#abb2bf;"># 自定义任务5</span></span>
<span class="line"><span style="color:#abb2bf;">job_5_web:</span></span>
<span class="line"><span style="color:#abb2bf;">  only:</span></span>
<span class="line"><span style="color:#abb2bf;">  # 设置为点击run pipeline时触发，流水线不自动触发</span></span>
<span class="line"><span style="color:#abb2bf;">    - web</span></span>
<span class="line"><span style="color:#abb2bf;">  tags:</span></span>
<span class="line"><span style="color:#abb2bf;">    - yehanli</span></span>
<span class="line"><span style="color:#abb2bf;">  script:</span></span>
<span class="line"><span style="color:#abb2bf;">    - echo &#39;job5 ========= 完成&#39;</span></span>
<span class="line"><span style="color:#abb2bf;">  stage: fifth_stage</span></span>
<span class="line"><span style="color:#abb2bf;"></span></span>
<span class="line"><span style="color:#abb2bf;"></span></span></code></pre><pre class="shiki material-palenight vp-code-light"><code><span class="line"><span style="color:#A6ACCD;"># .gitlab-ci.yml</span></span>
<span class="line"><span style="color:#A6ACCD;"># 镜像为node的环境镜像，如果用的是别的环境可以更改为别的项目环境的镜像</span></span>
<span class="line"><span style="color:#A6ACCD;">image: node:latest</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;"># 自定义stages</span></span>
<span class="line"><span style="color:#A6ACCD;">stages:</span></span>
<span class="line"><span style="color:#A6ACCD;">  - first_stage</span></span>
<span class="line"><span style="color:#A6ACCD;">  - second_stage</span></span>
<span class="line"><span style="color:#A6ACCD;">  - third_stage</span></span>
<span class="line"><span style="color:#A6ACCD;">  - fourth_stage</span></span>
<span class="line"><span style="color:#A6ACCD;">  - fifth_stage</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span></span>
<span class="line"><span style="color:#A6ACCD;"># 自定义任务1</span></span>
<span class="line"><span style="color:#A6ACCD;">job_1_push:</span></span>
<span class="line"><span style="color:#A6ACCD;">  only:</span></span>
<span class="line"><span style="color:#A6ACCD;">    - pushes</span></span>
<span class="line"><span style="color:#A6ACCD;">  # 设置使用fe tags标签的shared runner</span></span>
<span class="line"><span style="color:#A6ACCD;">  tags:</span></span>
<span class="line"><span style="color:#A6ACCD;">    - yehanli</span></span>
<span class="line"><span style="color:#A6ACCD;">  # 当前任务需要执行的脚本</span></span>
<span class="line"><span style="color:#A6ACCD;">  script:</span></span>
<span class="line"><span style="color:#A6ACCD;">    - echo &#39;job1 ========= 完成&#39;</span></span>
<span class="line"><span style="color:#A6ACCD;">  # 设置当前任务的stage</span></span>
<span class="line"><span style="color:#A6ACCD;">  stage: first_stage</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span></span>
<span class="line"><span style="color:#A6ACCD;"># 自定义任务2</span></span>
<span class="line"><span style="color:#A6ACCD;">job_2_push:</span></span>
<span class="line"><span style="color:#A6ACCD;">  only:</span></span>
<span class="line"><span style="color:#A6ACCD;">    - pushes</span></span>
<span class="line"><span style="color:#A6ACCD;">  tags:</span></span>
<span class="line"><span style="color:#A6ACCD;">    - yehanli</span></span>
<span class="line"><span style="color:#A6ACCD;">  script:</span></span>
<span class="line"><span style="color:#A6ACCD;">    - echo &#39;job2 ========= 完成&#39;</span></span>
<span class="line"><span style="color:#A6ACCD;">  stage: third_stage</span></span>
<span class="line"><span style="color:#A6ACCD;"># 自定义任务3</span></span>
<span class="line"><span style="color:#A6ACCD;">job_3_push:</span></span>
<span class="line"><span style="color:#A6ACCD;">  only:</span></span>
<span class="line"><span style="color:#A6ACCD;">    - pushes</span></span>
<span class="line"><span style="color:#A6ACCD;">  tags:</span></span>
<span class="line"><span style="color:#A6ACCD;">    - yehanli</span></span>
<span class="line"><span style="color:#A6ACCD;">  script:</span></span>
<span class="line"><span style="color:#A6ACCD;">    - echo &#39;job3 ========= 完成&#39;</span></span>
<span class="line"><span style="color:#A6ACCD;">  stage: fourth_stage</span></span>
<span class="line"><span style="color:#A6ACCD;">  # 设置当前任务为手动触发</span></span>
<span class="line"><span style="color:#A6ACCD;">  when: manual</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span></span>
<span class="line"><span style="color:#A6ACCD;"># 自定义任务4</span></span>
<span class="line"><span style="color:#A6ACCD;">job_4_push:</span></span>
<span class="line"><span style="color:#A6ACCD;">  only:</span></span>
<span class="line"><span style="color:#A6ACCD;">    - pushes</span></span>
<span class="line"><span style="color:#A6ACCD;">    - tags</span></span>
<span class="line"><span style="color:#A6ACCD;">  tags:</span></span>
<span class="line"><span style="color:#A6ACCD;">    - yehanli</span></span>
<span class="line"><span style="color:#A6ACCD;">  script:</span></span>
<span class="line"><span style="color:#A6ACCD;">    - echo &#39;job4 ========= 完成&#39;</span></span>
<span class="line"><span style="color:#A6ACCD;">  stage: fourth_stage</span></span>
<span class="line"><span style="color:#A6ACCD;">  when: always</span></span>
<span class="line"><span style="color:#A6ACCD;"> </span></span>
<span class="line"><span style="color:#A6ACCD;"># 自定义任务5</span></span>
<span class="line"><span style="color:#A6ACCD;">job_5_web:</span></span>
<span class="line"><span style="color:#A6ACCD;">  only:</span></span>
<span class="line"><span style="color:#A6ACCD;">  # 设置为点击run pipeline时触发，流水线不自动触发</span></span>
<span class="line"><span style="color:#A6ACCD;">    - web</span></span>
<span class="line"><span style="color:#A6ACCD;">  tags:</span></span>
<span class="line"><span style="color:#A6ACCD;">    - yehanli</span></span>
<span class="line"><span style="color:#A6ACCD;">  script:</span></span>
<span class="line"><span style="color:#A6ACCD;">    - echo &#39;job5 ========= 完成&#39;</span></span>
<span class="line"><span style="color:#A6ACCD;">  stage: fifth_stage</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br><span class="line-number">44</span><br><span class="line-number">45</span><br><span class="line-number">46</span><br><span class="line-number">47</span><br><span class="line-number">48</span><br><span class="line-number">49</span><br><span class="line-number">50</span><br><span class="line-number">51</span><br><span class="line-number">52</span><br><span class="line-number">53</span><br><span class="line-number">54</span><br><span class="line-number">55</span><br><span class="line-number">56</span><br><span class="line-number">57</span><br><span class="line-number">58</span><br><span class="line-number">59</span><br><span class="line-number">60</span><br><span class="line-number">61</span><br><span class="line-number">62</span><br><span class="line-number">63</span><br><span class="line-number">64</span><br><span class="line-number">65</span><br><span class="line-number">66</span><br><span class="line-number">67</span><br><span class="line-number">68</span><br><span class="line-number">69</span><br></div></div><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/9f65972ca1da43ed8c58de8ce8758b2d~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.image" alt="图片"></p><p>设置为手动执行的job3需要我们手动流水线点击进行执行。</p><p>如下为前4个jobs运行输出结果(点击上图的各个jobs即可看到下图输出)</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/9ebf004287d74f29978aeee195c97b6b~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.image" alt="图片"><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/4f34116649be4967bee739b9e84c69b1~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.image" alt="图片"></p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/30e47eab685e4e25a5c1719bd2d28256~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.image" alt="图片"><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/4e081e1f01fd4fbebf10e6a7ea8092be~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.image" alt="图片"></p><p>如设想的一样，所有的jobs都按照设定执行了任务。</p><p>如图所示，我们没有定义second_stage的任务，那么默认就会跳过，按照成功处理</p><p>job5可以按照如下方式触发：</p><ol><li>pipeline界面点击run pipeline</li></ol><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/61c54185717e404aa3fce26c74b9ef15~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.image" alt="图片"></p><ol start="2"><li>选择branch，然后再点击run pipeline</li></ol><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/044bb49201b04553876e03475555a57e~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.image" alt="图片"></p><p>以下为输出结果</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/6e39062d764d40ba9987f355de90a19b~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.image" alt="图片"></p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/11b3695b7eef46209db50273d0c56cd4~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.image" alt="图片"></p><h3 id="流水线demo2-详细示例" tabindex="-1">流水线Demo2(详细示例) <a class="header-anchor" href="#流水线demo2-详细示例" aria-hidden="true">#</a></h3><div class="language- line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki one-dark-pro vp-code-dark"><code><span class="line"><span style="color:#abb2bf;"># .gitlab-ci.yml</span></span>
<span class="line"><span style="color:#abb2bf;">image: node:latest</span></span>
<span class="line"><span style="color:#abb2bf;"># # 在运行所有任务之前执行如下脚本</span></span>
<span class="line"><span style="color:#abb2bf;">before_script:</span></span>
<span class="line"><span style="color:#abb2bf;">  - echo &#39;====== 在所有jobs之前进行执行 =========&#39;</span></span>
<span class="line"><span style="color:#abb2bf;"></span></span>
<span class="line"><span style="color:#abb2bf;">variables:</span></span>
<span class="line"><span style="color:#abb2bf;">  IS_EXPERIENCING_MERGING: &quot;false&quot;</span></span>
<span class="line"><span style="color:#abb2bf;">  IS_ON_MYBRANCH: &quot;false&quot;</span></span>
<span class="line"><span style="color:#abb2bf;"></span></span>
<span class="line"><span style="color:#abb2bf;">workflow:</span></span>
<span class="line"><span style="color:#abb2bf;">  rules:</span></span>
<span class="line"><span style="color:#abb2bf;">    - if: $CI_PIPELINE_SOURCE == &quot;merge_request_event&quot;</span></span>
<span class="line"><span style="color:#abb2bf;">      variables:</span></span>
<span class="line"><span style="color:#abb2bf;">        IS_EXPERIENCING_MERGING: &quot;true&quot;</span></span>
<span class="line"><span style="color:#abb2bf;">    - if: $CI_COMMIT_REF_NAME =~ /myBranch/</span></span>
<span class="line"><span style="color:#abb2bf;">      variables:</span></span>
<span class="line"><span style="color:#abb2bf;">        IS_ON_MYBRANCH: &quot;true&quot;</span></span>
<span class="line"><span style="color:#abb2bf;">    - if: $CI_COMMIT_REF_NAME =~ /.*/</span></span>
<span class="line"><span style="color:#abb2bf;"></span></span>
<span class="line"><span style="color:#abb2bf;">cache:</span></span>
<span class="line"><span style="color:#abb2bf;">  key: cache-node-modules</span></span>
<span class="line"><span style="color:#abb2bf;">  # 在这里写出需要缓存的文件的路径，在此为node_modules</span></span>
<span class="line"><span style="color:#abb2bf;">  paths:</span></span>
<span class="line"><span style="color:#abb2bf;">    - node_modules</span></span>
<span class="line"><span style="color:#abb2bf;">    </span></span>
<span class="line"><span style="color:#abb2bf;"># 自定义stages</span></span>
<span class="line"><span style="color:#abb2bf;">stages:</span></span>
<span class="line"><span style="color:#abb2bf;">  - first_stage</span></span>
<span class="line"><span style="color:#abb2bf;">  - second_stage</span></span>
<span class="line"><span style="color:#abb2bf;">  - third_stage</span></span>
<span class="line"><span style="color:#abb2bf;">  - fourth_stage</span></span>
<span class="line"><span style="color:#abb2bf;">  - fifth_stage</span></span>
<span class="line"><span style="color:#abb2bf;"></span></span>
<span class="line"><span style="color:#abb2bf;">include:</span></span>
<span class="line"><span style="color:#abb2bf;">  - &#39;/yml/job_1_install.yml&#39;</span></span>
<span class="line"><span style="color:#abb2bf;">  - &#39;/yml/job_2_build.yml&#39;</span></span>
<span class="line"><span style="color:#abb2bf;">  - &#39;/yml/job_3_deploy.yml&#39;</span></span>
<span class="line"><span style="color:#abb2bf;">  - &#39;/yml/job_4_mybranch.yml&#39;</span></span>
<span class="line"><span style="color:#abb2bf;">  - &#39;/yml/job_5_beforeMR.yml&#39;</span></span>
<span class="line"><span style="color:#abb2bf;"></span></span>
<span class="line"><span style="color:#abb2bf;"></span></span></code></pre><pre class="shiki material-palenight vp-code-light"><code><span class="line"><span style="color:#A6ACCD;"># .gitlab-ci.yml</span></span>
<span class="line"><span style="color:#A6ACCD;">image: node:latest</span></span>
<span class="line"><span style="color:#A6ACCD;"># # 在运行所有任务之前执行如下脚本</span></span>
<span class="line"><span style="color:#A6ACCD;">before_script:</span></span>
<span class="line"><span style="color:#A6ACCD;">  - echo &#39;====== 在所有jobs之前进行执行 =========&#39;</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">variables:</span></span>
<span class="line"><span style="color:#A6ACCD;">  IS_EXPERIENCING_MERGING: &quot;false&quot;</span></span>
<span class="line"><span style="color:#A6ACCD;">  IS_ON_MYBRANCH: &quot;false&quot;</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">workflow:</span></span>
<span class="line"><span style="color:#A6ACCD;">  rules:</span></span>
<span class="line"><span style="color:#A6ACCD;">    - if: $CI_PIPELINE_SOURCE == &quot;merge_request_event&quot;</span></span>
<span class="line"><span style="color:#A6ACCD;">      variables:</span></span>
<span class="line"><span style="color:#A6ACCD;">        IS_EXPERIENCING_MERGING: &quot;true&quot;</span></span>
<span class="line"><span style="color:#A6ACCD;">    - if: $CI_COMMIT_REF_NAME =~ /myBranch/</span></span>
<span class="line"><span style="color:#A6ACCD;">      variables:</span></span>
<span class="line"><span style="color:#A6ACCD;">        IS_ON_MYBRANCH: &quot;true&quot;</span></span>
<span class="line"><span style="color:#A6ACCD;">    - if: $CI_COMMIT_REF_NAME =~ /.*/</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">cache:</span></span>
<span class="line"><span style="color:#A6ACCD;">  key: cache-node-modules</span></span>
<span class="line"><span style="color:#A6ACCD;">  # 在这里写出需要缓存的文件的路径，在此为node_modules</span></span>
<span class="line"><span style="color:#A6ACCD;">  paths:</span></span>
<span class="line"><span style="color:#A6ACCD;">    - node_modules</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span></span>
<span class="line"><span style="color:#A6ACCD;"># 自定义stages</span></span>
<span class="line"><span style="color:#A6ACCD;">stages:</span></span>
<span class="line"><span style="color:#A6ACCD;">  - first_stage</span></span>
<span class="line"><span style="color:#A6ACCD;">  - second_stage</span></span>
<span class="line"><span style="color:#A6ACCD;">  - third_stage</span></span>
<span class="line"><span style="color:#A6ACCD;">  - fourth_stage</span></span>
<span class="line"><span style="color:#A6ACCD;">  - fifth_stage</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">include:</span></span>
<span class="line"><span style="color:#A6ACCD;">  - &#39;/yml/job_1_install.yml&#39;</span></span>
<span class="line"><span style="color:#A6ACCD;">  - &#39;/yml/job_2_build.yml&#39;</span></span>
<span class="line"><span style="color:#A6ACCD;">  - &#39;/yml/job_3_deploy.yml&#39;</span></span>
<span class="line"><span style="color:#A6ACCD;">  - &#39;/yml/job_4_mybranch.yml&#39;</span></span>
<span class="line"><span style="color:#A6ACCD;">  - &#39;/yml/job_5_beforeMR.yml&#39;</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br></div></div><div class="language- line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki one-dark-pro vp-code-dark"><code><span class="line"><span style="color:#abb2bf;"># &#39;/yml/job_1_install.yml&#39;</span></span>
<span class="line"><span style="color:#abb2bf;"># install 阶段</span></span>
<span class="line"><span style="color:#abb2bf;">job_1_install:</span></span>
<span class="line"><span style="color:#abb2bf;">  only:</span></span>
<span class="line"><span style="color:#abb2bf;">    - master</span></span>
<span class="line"><span style="color:#abb2bf;">  tags:</span></span>
<span class="line"><span style="color:#abb2bf;">    - yehanli</span></span>
<span class="line"><span style="color:#abb2bf;">  before_script:</span></span>
<span class="line"><span style="color:#abb2bf;">    - echo &#39;========== job1 的script之前执行 ==========&#39;</span></span>
<span class="line"><span style="color:#abb2bf;">    - npm install</span></span>
<span class="line"><span style="color:#abb2bf;">  script:</span></span>
<span class="line"><span style="color:#abb2bf;">    - echo &#39;job1 ========= 完成&#39;</span></span>
<span class="line"><span style="color:#abb2bf;">  stage: first_stage</span></span>
<span class="line"><span style="color:#abb2bf;">  # 最多失败重试次数为3次</span></span>
<span class="line"><span style="color:#abb2bf;">  retry: 2</span></span>
<span class="line"><span style="color:#abb2bf;"></span></span>
<span class="line"><span style="color:#abb2bf;"></span></span></code></pre><pre class="shiki material-palenight vp-code-light"><code><span class="line"><span style="color:#A6ACCD;"># &#39;/yml/job_1_install.yml&#39;</span></span>
<span class="line"><span style="color:#A6ACCD;"># install 阶段</span></span>
<span class="line"><span style="color:#A6ACCD;">job_1_install:</span></span>
<span class="line"><span style="color:#A6ACCD;">  only:</span></span>
<span class="line"><span style="color:#A6ACCD;">    - master</span></span>
<span class="line"><span style="color:#A6ACCD;">  tags:</span></span>
<span class="line"><span style="color:#A6ACCD;">    - yehanli</span></span>
<span class="line"><span style="color:#A6ACCD;">  before_script:</span></span>
<span class="line"><span style="color:#A6ACCD;">    - echo &#39;========== job1 的script之前执行 ==========&#39;</span></span>
<span class="line"><span style="color:#A6ACCD;">    - npm install</span></span>
<span class="line"><span style="color:#A6ACCD;">  script:</span></span>
<span class="line"><span style="color:#A6ACCD;">    - echo &#39;job1 ========= 完成&#39;</span></span>
<span class="line"><span style="color:#A6ACCD;">  stage: first_stage</span></span>
<span class="line"><span style="color:#A6ACCD;">  # 最多失败重试次数为3次</span></span>
<span class="line"><span style="color:#A6ACCD;">  retry: 2</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br></div></div><div class="language- line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki one-dark-pro vp-code-dark"><code><span class="line"><span style="color:#abb2bf;"># &#39;/yml/job_2_build.yml&#39;</span></span>
<span class="line"><span style="color:#abb2bf;"># build 阶段</span></span>
<span class="line"><span style="color:#abb2bf;">job_2_build:</span></span>
<span class="line"><span style="color:#abb2bf;">  only:</span></span>
<span class="line"><span style="color:#abb2bf;">    - master</span></span>
<span class="line"><span style="color:#abb2bf;">  tags:</span></span>
<span class="line"><span style="color:#abb2bf;">    - yehanli</span></span>
<span class="line"><span style="color:#abb2bf;">  script:</span></span>
<span class="line"><span style="color:#abb2bf;">    - npm run build</span></span>
<span class="line"><span style="color:#abb2bf;">    - echo &#39;job2 ========= 完成&#39;</span></span>
<span class="line"><span style="color:#abb2bf;">  stage: second_stage</span></span>
<span class="line"><span style="color:#abb2bf;">  retry: 2</span></span>
<span class="line"><span style="color:#abb2bf;"></span></span>
<span class="line"><span style="color:#abb2bf;"></span></span></code></pre><pre class="shiki material-palenight vp-code-light"><code><span class="line"><span style="color:#A6ACCD;"># &#39;/yml/job_2_build.yml&#39;</span></span>
<span class="line"><span style="color:#A6ACCD;"># build 阶段</span></span>
<span class="line"><span style="color:#A6ACCD;">job_2_build:</span></span>
<span class="line"><span style="color:#A6ACCD;">  only:</span></span>
<span class="line"><span style="color:#A6ACCD;">    - master</span></span>
<span class="line"><span style="color:#A6ACCD;">  tags:</span></span>
<span class="line"><span style="color:#A6ACCD;">    - yehanli</span></span>
<span class="line"><span style="color:#A6ACCD;">  script:</span></span>
<span class="line"><span style="color:#A6ACCD;">    - npm run build</span></span>
<span class="line"><span style="color:#A6ACCD;">    - echo &#39;job2 ========= 完成&#39;</span></span>
<span class="line"><span style="color:#A6ACCD;">  stage: second_stage</span></span>
<span class="line"><span style="color:#A6ACCD;">  retry: 2</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br></div></div><div class="language- line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki one-dark-pro vp-code-dark"><code><span class="line"><span style="color:#abb2bf;"># &#39;/yml/job_3_deploy.yml&#39;</span></span>
<span class="line"><span style="color:#abb2bf;"># deploy 阶段</span></span>
<span class="line"><span style="color:#abb2bf;">job_3_deploy:</span></span>
<span class="line"><span style="color:#abb2bf;">  image: docker</span></span>
<span class="line"><span style="color:#abb2bf;">  only:</span></span>
<span class="line"><span style="color:#abb2bf;">    - master</span></span>
<span class="line"><span style="color:#abb2bf;">  tags:</span></span>
<span class="line"><span style="color:#abb2bf;">    - yehanli</span></span>
<span class="line"><span style="color:#abb2bf;">  script:</span></span>
<span class="line"><span style="color:#abb2bf;">    - docker build -t reactimages .</span></span>
<span class="line"><span style="color:#abb2bf;">    - if [ $(docker ps -aq --filter name=react-container) ]; then docker rm -f react-container; fi</span></span>
<span class="line"><span style="color:#abb2bf;">    - docker run -d -p 8000:80 --name react-container reactimages</span></span>
<span class="line"><span style="color:#abb2bf;">    - echo &#39;job3 ========= 完成&#39;</span></span>
<span class="line"><span style="color:#abb2bf;">    </span></span>
<span class="line"><span style="color:#abb2bf;">  stage: third_stage</span></span>
<span class="line"><span style="color:#abb2bf;">  when: always</span></span>
<span class="line"><span style="color:#abb2bf;"></span></span>
<span class="line"><span style="color:#abb2bf;"></span></span></code></pre><pre class="shiki material-palenight vp-code-light"><code><span class="line"><span style="color:#A6ACCD;"># &#39;/yml/job_3_deploy.yml&#39;</span></span>
<span class="line"><span style="color:#A6ACCD;"># deploy 阶段</span></span>
<span class="line"><span style="color:#A6ACCD;">job_3_deploy:</span></span>
<span class="line"><span style="color:#A6ACCD;">  image: docker</span></span>
<span class="line"><span style="color:#A6ACCD;">  only:</span></span>
<span class="line"><span style="color:#A6ACCD;">    - master</span></span>
<span class="line"><span style="color:#A6ACCD;">  tags:</span></span>
<span class="line"><span style="color:#A6ACCD;">    - yehanli</span></span>
<span class="line"><span style="color:#A6ACCD;">  script:</span></span>
<span class="line"><span style="color:#A6ACCD;">    - docker build -t reactimages .</span></span>
<span class="line"><span style="color:#A6ACCD;">    - if [ $(docker ps -aq --filter name=react-container) ]; then docker rm -f react-container; fi</span></span>
<span class="line"><span style="color:#A6ACCD;">    - docker run -d -p 8000:80 --name react-container reactimages</span></span>
<span class="line"><span style="color:#A6ACCD;">    - echo &#39;job3 ========= 完成&#39;</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span></span>
<span class="line"><span style="color:#A6ACCD;">  stage: third_stage</span></span>
<span class="line"><span style="color:#A6ACCD;">  when: always</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br></div></div><div class="language- line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki one-dark-pro vp-code-dark"><code><span class="line"><span style="color:#abb2bf;"># &#39;/yml/job_4_mybranch.yml&#39;</span></span>
<span class="line"><span style="color:#abb2bf;">job_4_mybranch:</span></span>
<span class="line"><span style="color:#abb2bf;">  only:</span></span>
<span class="line"><span style="color:#abb2bf;">    - myBranch</span></span>
<span class="line"><span style="color:#abb2bf;">  tags:</span></span>
<span class="line"><span style="color:#abb2bf;">    - yehanli</span></span>
<span class="line"><span style="color:#abb2bf;">  script:</span></span>
<span class="line"><span style="color:#abb2bf;">    - echo &#39;is it on myBranch?&#39; $IS_ON_MYBRANCH</span></span>
<span class="line"><span style="color:#abb2bf;">    - echo &#39;job4 ========= 完成&#39;</span></span>
<span class="line"><span style="color:#abb2bf;">  stage: fourth_stage</span></span>
<span class="line"><span style="color:#abb2bf;">  retry: 2</span></span>
<span class="line"><span style="color:#abb2bf;"></span></span>
<span class="line"><span style="color:#abb2bf;"></span></span></code></pre><pre class="shiki material-palenight vp-code-light"><code><span class="line"><span style="color:#A6ACCD;"># &#39;/yml/job_4_mybranch.yml&#39;</span></span>
<span class="line"><span style="color:#A6ACCD;">job_4_mybranch:</span></span>
<span class="line"><span style="color:#A6ACCD;">  only:</span></span>
<span class="line"><span style="color:#A6ACCD;">    - myBranch</span></span>
<span class="line"><span style="color:#A6ACCD;">  tags:</span></span>
<span class="line"><span style="color:#A6ACCD;">    - yehanli</span></span>
<span class="line"><span style="color:#A6ACCD;">  script:</span></span>
<span class="line"><span style="color:#A6ACCD;">    - echo &#39;is it on myBranch?&#39; $IS_ON_MYBRANCH</span></span>
<span class="line"><span style="color:#A6ACCD;">    - echo &#39;job4 ========= 完成&#39;</span></span>
<span class="line"><span style="color:#A6ACCD;">  stage: fourth_stage</span></span>
<span class="line"><span style="color:#A6ACCD;">  retry: 2</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br></div></div><div class="language- line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki one-dark-pro vp-code-dark"><code><span class="line"><span style="color:#abb2bf;"># &#39;/yml/job_5_beforeMR.yml&#39;</span></span>
<span class="line"><span style="color:#abb2bf;">job_5_afterMR:</span></span>
<span class="line"><span style="color:#abb2bf;">  rules:</span></span>
<span class="line"><span style="color:#abb2bf;">    - if: &#39;$CI_COMMIT_BRANCH == &quot;master&quot;&#39; </span></span>
<span class="line"><span style="color:#abb2bf;">  tags:</span></span>
<span class="line"><span style="color:#abb2bf;">    - yehanli</span></span>
<span class="line"><span style="color:#abb2bf;">  script:</span></span>
<span class="line"><span style="color:#abb2bf;">      - echo &#39;Is experiencing merging?&#39; $IS_EXPERIENCING_MERGING</span></span>
<span class="line"><span style="color:#abb2bf;">      - echo &#39;========== job_5_afterMR 完成 ===========&#39;</span></span>
<span class="line"><span style="color:#abb2bf;">  stage: fifth_stage</span></span>
<span class="line"><span style="color:#abb2bf;">  retry: 2</span></span>
<span class="line"><span style="color:#abb2bf;"></span></span>
<span class="line"><span style="color:#abb2bf;">job_5_beforeMR:</span></span>
<span class="line"><span style="color:#abb2bf;">  rules:</span></span>
<span class="line"><span style="color:#abb2bf;">    - if: &#39;$CI_MERGE_REQUEST_TARGET_BRANCH_NAME == &quot;master&quot;&#39;</span></span>
<span class="line"><span style="color:#abb2bf;">  tags:</span></span>
<span class="line"><span style="color:#abb2bf;">    - yehanli</span></span>
<span class="line"><span style="color:#abb2bf;">  script:</span></span>
<span class="line"><span style="color:#abb2bf;">      - echo &#39;Is experiencing before-merge?&#39; $IS_EXPERIENCING_MERGING</span></span>
<span class="line"><span style="color:#abb2bf;">      - echo &#39;========== job_5_beforeMR 完成 ===========&#39;</span></span>
<span class="line"><span style="color:#abb2bf;"></span></span>
<span class="line"><span style="color:#abb2bf;">  stage: fifth_stage</span></span>
<span class="line"><span style="color:#abb2bf;">  retry: 2</span></span>
<span class="line"><span style="color:#abb2bf;"></span></span>
<span class="line"><span style="color:#abb2bf;"></span></span></code></pre><pre class="shiki material-palenight vp-code-light"><code><span class="line"><span style="color:#A6ACCD;"># &#39;/yml/job_5_beforeMR.yml&#39;</span></span>
<span class="line"><span style="color:#A6ACCD;">job_5_afterMR:</span></span>
<span class="line"><span style="color:#A6ACCD;">  rules:</span></span>
<span class="line"><span style="color:#A6ACCD;">    - if: &#39;$CI_COMMIT_BRANCH == &quot;master&quot;&#39; </span></span>
<span class="line"><span style="color:#A6ACCD;">  tags:</span></span>
<span class="line"><span style="color:#A6ACCD;">    - yehanli</span></span>
<span class="line"><span style="color:#A6ACCD;">  script:</span></span>
<span class="line"><span style="color:#A6ACCD;">      - echo &#39;Is experiencing merging?&#39; $IS_EXPERIENCING_MERGING</span></span>
<span class="line"><span style="color:#A6ACCD;">      - echo &#39;========== job_5_afterMR 完成 ===========&#39;</span></span>
<span class="line"><span style="color:#A6ACCD;">  stage: fifth_stage</span></span>
<span class="line"><span style="color:#A6ACCD;">  retry: 2</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">job_5_beforeMR:</span></span>
<span class="line"><span style="color:#A6ACCD;">  rules:</span></span>
<span class="line"><span style="color:#A6ACCD;">    - if: &#39;$CI_MERGE_REQUEST_TARGET_BRANCH_NAME == &quot;master&quot;&#39;</span></span>
<span class="line"><span style="color:#A6ACCD;">  tags:</span></span>
<span class="line"><span style="color:#A6ACCD;">    - yehanli</span></span>
<span class="line"><span style="color:#A6ACCD;">  script:</span></span>
<span class="line"><span style="color:#A6ACCD;">      - echo &#39;Is experiencing before-merge?&#39; $IS_EXPERIENCING_MERGING</span></span>
<span class="line"><span style="color:#A6ACCD;">      - echo &#39;========== job_5_beforeMR 完成 ===========&#39;</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">  stage: fifth_stage</span></span>
<span class="line"><span style="color:#A6ACCD;">  retry: 2</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br></div></div><div class="language- line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki one-dark-pro vp-code-dark"><code><span class="line"><span style="color:#abb2bf;"># pull 官方的镜像，重命名为builder</span></span>
<span class="line"><span style="color:#abb2bf;">FROM node:latest as builder</span></span>
<span class="line"><span style="color:#abb2bf;"># 设置工作目录为/app</span></span>
<span class="line"><span style="color:#abb2bf;">WORKDIR /app</span></span>
<span class="line"><span style="color:#abb2bf;"># 按照package.json来安装依赖</span></span>
<span class="line"><span style="color:#abb2bf;">COPY package.json ./</span></span>
<span class="line"><span style="color:#abb2bf;">COPY package-lock.json ./</span></span>
<span class="line"><span style="color:#abb2bf;">RUN npm install --registry=https://bnpm.byted.org</span></span>
<span class="line"><span style="color:#abb2bf;"># 加入/app下</span></span>
<span class="line"><span style="color:#abb2bf;">COPY . ./</span></span>
<span class="line"><span style="color:#abb2bf;"># build一下</span></span>
<span class="line"><span style="color:#abb2bf;">RUN npm run build</span></span>
<span class="line"><span style="color:#abb2bf;"># 将 /app/dist dir 放入 /nginx/html dir</span></span>
<span class="line"><span style="color:#abb2bf;"># Nginx是一款轻量级的Web服务器</span></span>
<span class="line"><span style="color:#abb2bf;">FROM nginx:latest</span></span>
<span class="line"><span style="color:#abb2bf;">COPY --from=builder /app/build /usr/share/nginx/html</span></span>
<span class="line"><span style="color:#abb2bf;"></span></span>
<span class="line"><span style="color:#abb2bf;"></span></span></code></pre><pre class="shiki material-palenight vp-code-light"><code><span class="line"><span style="color:#A6ACCD;"># pull 官方的镜像，重命名为builder</span></span>
<span class="line"><span style="color:#A6ACCD;">FROM node:latest as builder</span></span>
<span class="line"><span style="color:#A6ACCD;"># 设置工作目录为/app</span></span>
<span class="line"><span style="color:#A6ACCD;">WORKDIR /app</span></span>
<span class="line"><span style="color:#A6ACCD;"># 按照package.json来安装依赖</span></span>
<span class="line"><span style="color:#A6ACCD;">COPY package.json ./</span></span>
<span class="line"><span style="color:#A6ACCD;">COPY package-lock.json ./</span></span>
<span class="line"><span style="color:#A6ACCD;">RUN npm install --registry=https://bnpm.byted.org</span></span>
<span class="line"><span style="color:#A6ACCD;"># 加入/app下</span></span>
<span class="line"><span style="color:#A6ACCD;">COPY . ./</span></span>
<span class="line"><span style="color:#A6ACCD;"># build一下</span></span>
<span class="line"><span style="color:#A6ACCD;">RUN npm run build</span></span>
<span class="line"><span style="color:#A6ACCD;"># 将 /app/dist dir 放入 /nginx/html dir</span></span>
<span class="line"><span style="color:#A6ACCD;"># Nginx是一款轻量级的Web服务器</span></span>
<span class="line"><span style="color:#A6ACCD;">FROM nginx:latest</span></span>
<span class="line"><span style="color:#A6ACCD;">COPY --from=builder /app/build /usr/share/nginx/html</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br></div></div>`,159);function u(C,m,A,h,f,g){const l=a("ArticleMetadata"),p=a("ClientOnly");return c(),o("div",null,[y,s(p,null,{default:r(()=>[s(l)]),_:1}),d])}const k=e(b,[["render",u]]);export{_ as __pageData,k as default};
