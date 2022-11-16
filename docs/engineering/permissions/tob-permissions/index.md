---
createTime: 2022/11/16
tag: '工程化,资源权限'
---

# 前端B端权限控制【资源权限，数据权限】

## 1\. 基本介绍

* 资源权限：菜单导航栏 & 页面 & 按钮 资源可见权限。
* 数据权限：对于页面上的数据操作，同一个人同一个页面不同的数据可能存在不同的数据操作权限。

**权限纬度**

* 角色纬度：大部分的情况为：用户 => 角色 => 权限
* 用户纬度：用户 => 权限

**表现形式**

* 基础表现形式还是树结构的展现形式，因为对应的**菜单-页面-按钮**是一个树的从主干到节点的数据流向。

## 2\. 权限数据录入与展示

采用**树结构**进行处理。唯一需要处理的是**父子节点的联动关系**处理。这里因为不同的公司或者系统可能对于这部分的数据录入方式不同，所以久不贴图了。

## 3.用户资源权限流程图

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/d10f504df749426eb8166090edd0379e~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.image)

## 4 前端权限控制

前端控制权限也是分为两部分，菜单页面 与 按钮。因为前端权限控制的实现，会因为后台接口形式有所影响，但是大体方向是相同。还是会分为这两块内容。**这里对于权限是使用多接口查询权限，初始登录查询页面权限，点击业务页面，查询对应业务页面的资源code。**  
  
4.1 菜单权限
--------

菜单权限控制需要了解两个概念：

* 一个是可见的菜单页面         ： 左侧dom节点
* 一个是可访问的菜单页面       ： 系统当中路由这一块

这里说的意思是：**我们所说的菜单权限控制，大多只是停留在菜单是否可见，但是系统路由的页面可见和页面上的菜单是否可见是两回事情。假设系统路由/path1可见，尽管页面上的没有/path1对应的菜单显示。我们直接在浏览器输入对应的path1，还是可以访问到对应的页面。这是因为系统路由那一块其实我们是没有去处理的。** **​**

了解了这个之后，我们需要做菜单页面权限的时候就需要去考虑两块，并且是对应的。  
  
### 4.1.1 路由权限 【[代码地址](https://link.juejin.cn/?target=https%3A%2F%2Fgithub.com%2Frodchen-king%2Fant-design-pro-v2%2Fcommit%2F0e7895c56e4962d75ab8ccf4637cefca3f5f71b6%23diff-a7acc04e8fb20252554c588f7b7a8564 "https://github.com/rodchen-king/ant-design-pro-v2/commit/0e7895c56e4962d75ab8ccf4637cefca3f5f71b6#diff-a7acc04e8fb20252554c588f7b7a8564") [demo地址](https://link.juejin.cn/?target=https%3A%2F%2Fgithub.com%2Frodchen-king%2Fant-design-pro-v2%2Fcommits%2Fpermission-branch "https://github.com/rodchen-king/ant-design-pro-v2/commits/permission-branch")】

这里是有两种做法：

* 第一种，控制路由的配置，当然不是路由配置文件里去配置。而是生效的路由配置里去做。
* 第二种，完全不做这里的路由控制，而是在路由跳转到没有权限的页面，写逻辑校验是否有当前的权限，然后手动跳转到403页面。

这里还是先用第一种做法来做：因为这里用第一种做了之后，菜单可见权限自动适配好了。会省去我们很多事情。

**a. 路由文件，定义菜单页面权限。并且将exception以及404的路由添加notInAut标志，这个标志说明：这两个路由不走权限校验。同理的还有 /user。**

```js
export default [
  // user
  {
    path: '/user',
    component: '../layouts/UserLayout',
    routes: [
      { path: '/user', redirect: '/user/login' },
      { path: '/user/login', component: './User/Login' },
      { path: '/user/register', component: './User/Register' },
      { path: '/user/register-result', component: './User/RegisterResult' },
    ],
  },
  // app
  {
    path: '/',
    component: '../layouts/BasicLayout',
    Routes: ['src/pages/Authorized'],
    authority: ['admin', 'user'],
    routes: [
      // dashboard
      { path: '/', redirect: '/list/table-list' },
      // forms
      {
        path: '/form',
        icon: 'form',
        name: 'form',
        code: 'form_menu',
        routes: [
          {
            path: '/form/basic-form',
            code: 'form_basicForm_page',
            name: 'basicform',
            component: './Forms/BasicForm',
          },
        ],
      },
      // list
      {
        path: '/list',
        icon: 'table',
        name: 'list',
        code: 'list_menu',
        routes: [
          {
            path: '/list/table-list',
            name: 'searchtable',
            code: 'list_tableList_page',
            component: './List/TableList',
          },
        ],
      },
      {
        path: '/profile',
        name: 'profile',
        icon: 'profile',
        code: 'profile_menu',
        routes: [
          // profile
          {
            path: '/profile/basic',
            name: 'basic',
            code: 'profile_basic_page',
            component: './Profile/BasicProfile',
          },
          {
            path: '/profile/advanced',
            name: 'advanced',
            code: 'profile_advanced_page',
            authority: ['admin'],
            component: './Profile/AdvancedProfile',
          },
        ],
      },
      {
        name: 'exception',
        icon: 'warning',
        notInAut: true,
        hideInMenu: true,
        path: '/exception',
        routes: [
          // exception
          {
            path: '/exception/403',
            name: 'not-permission',
            component: './Exception/403',
          },
          {
            path: '/exception/404',
            name: 'not-find',
            component: './Exception/404',
          },
          {
            path: '/exception/500',
            name: 'server-error',
            component: './Exception/500',
          },
          {
            path: '/exception/trigger',
            name: 'trigger',
            hideInMenu: true,
            component: './Exception/TriggerException',
          },
        ],
      },
      {
        notInAut: true,
        component: '404',
      },
    ],
  },
];


```

**b. 修改app.js 文件，加载路由**

```js
export const dva = {
  config: {
    onError(err) {
      err.preventDefault();
    },
  },
};

let authRoutes = null;

function ergodicRoutes(routes, authKey, authority) {
  routes.forEach(element => {
    if (element.path === authKey) {
      Object.assign(element.authority, authority || []);
    } else if (element.routes) {
      ergodicRoutes(element.routes, authKey, authority);
    }
    return element;
  });
}

function customerErgodicRoutes(routes) {
  const menuAutArray = (localStorage.getItem('routerAutArray') || '').split(',');

  routes.forEach(element => {
    // 没有path的情况下不需要走逻辑检查
    // path 为 /user 不需要走逻辑检查
    if (element.path === '/user' || !element.path) {
      return element;
    }

    // notInAut 为true的情况下不需要走逻辑检查
    if (!element.notInAut) {
      if (menuAutArray.indexOf(element.code) >= 0 || element.path === '/') {
        if (element.routes) {
          element.routes = customerErgodicRoutes(element.routes);

          element.routes = element.routes.filter(item => !item.isNeedDelete);
        }
      } else {
        element.isNeedDelete = true;
      }
    }

    /**
     * 后台接口返回子节点的情况，父节点需要溯源处理
     */
    // notInAut 为true的情况下不需要走逻辑检查
    // if (!element.notInAut) {
    //   if (element.routes) {
    //     // eslint-disable-next-line no-param-reassign
    //     element.routes = customerErgodicRoutes(element.routes);

    //     // eslint-disable-next-line no-param-reassign
    //     if (element.routes.filter(item => item.isNeedSave && !item.hideInMenu).length) {
    //       // eslint-disable-next-line no-param-reassign
    //       element.routes = element.routes.filter(item => item.isNeedSave);
    //       if (element.routes.length) {
    //         // eslint-disable-next-line no-param-reassign
    //         element.isNeedSave = true;
    //       }
    //     }
    //   } else if (menuAutArray.indexOf(element.code) >= 0) {
    //     // eslint-disable-next-line no-param-reassign
    //     element.isNeedSave = true;
    //   }
    // } else {
    //   // eslint-disable-next-line no-param-reassign
    //   element.isNeedSave = true;
    // }

    return element;
  });

  return routes;
}

export function patchRoutes(routes) {
  Object.keys(authRoutes).map(authKey =>
    ergodicRoutes(routes, authKey, authRoutes[authKey].authority),
  );

  customerErgodicRoutes(routes);

  /**
   * 后台接口返回子节点的情况，父节点需要溯源处理
   */
  window.g_routes = routes.filter(item => !item.isNeedDelete);

  /**
   * 后台接口返回子节点的情况，父节点需要溯源处理
   */
  // window.g_routes = routes.filter(item => item.isNeedSave);
}

export function render(oldRender) {
  authRoutes = '';
  oldRender();
}


```

**c. 修改login.js，获取路由当中的code便利获取到，进行查询权限**

```js
import { routerRedux } from 'dva/router';
import { stringify } from 'qs';
import { fakeAccountLogin, getFakeCaptcha } from '@/services/api';
import { getAuthorityMenu } from '@/services/authority';
import { setAuthority } from '@/utils/authority';
import { getPageQuery } from '@/utils/utils';
import { reloadAuthorized } from '@/utils/Authorized';
import routes from '../../config/router.config';

export default {
  namespace: 'login',

  state: {
    status: undefined,
  },

  effects: {
    *login({ payload }, { call, put }) {
      const response = yield call(fakeAccountLogin, payload);
      yield put({
        type: 'changeLoginStatus',
        payload: response,
      });
      // Login successfully
      if (response.status === 'ok') {
        // 这里的数据通过接口返回菜单页面的权限是什么

        const codeArray = [];
        // eslint-disable-next-line no-inner-declarations
        function ergodicRoutes(routesParam) {
          routesParam.forEach(element => {
            if (element.code) {
              codeArray.push(element.code);
            }
            if (element.routes) {
              ergodicRoutes(element.routes);
            }
          });
        }

        ergodicRoutes(routes);
        const authMenuArray = yield call(getAuthorityMenu, codeArray.join(','));
        localStorage.setItem('routerAutArray', authMenuArray.join(','));

        reloadAuthorized();
        const urlParams = new URL(window.location.href);
        const params = getPageQuery();
        let { redirect } = params;
        if (redirect) {
          const redirectUrlParams = new URL(redirect);
          if (redirectUrlParams.origin === urlParams.origin) {
            redirect = redirect.substr(urlParams.origin.length);
            if (redirect.match(/^\/.*#/)) {
              redirect = redirect.substr(redirect.indexOf('#') + 1);
            }
          } else {
            window.location.href = redirect;
            return;
          }
        }
        // yield put(routerRedux.replace(redirect || '/'));

        // 这里之所以用页面跳转，因为路由的重新设置需要页面重新刷新才可以生效
        window.location.href = redirect || '/';
      }
    },

    *getCaptcha({ payload }, { call }) {
      yield call(getFakeCaptcha, payload);
    },

    *logout(_, { put }) {
      yield put({
        type: 'changeLoginStatus',
        payload: {
          status: false,
          currentAuthority: 'guest',
        },
      });
      reloadAuthorized();
      yield put(
        routerRedux.push({
          pathname: '/user/login',
          search: stringify({
            redirect: window.location.href,
          }),
        }),
      );
    },
  },

  reducers: {
    changeLoginStatus(state, { payload }) {
      setAuthority(payload.currentAuthority);
      return {
        ...state,
        status: payload.status,
        type: payload.type,
      };
    },
  },
};


```

**d. 添加service**

```
import request from '@/utils/request';

// 查询菜单权限
export async function getAuthorityMenu(codes) {
  return request(`/api/authority/menu?resCodes=${codes}`);
}

// 查询页面按钮权限
export async function getAuthority(params) {
  return request(`/api/authority?codes=${params}`);
}


```
  
### 4.1.2 路由权限 菜单可见权限

参照上面的方式，这里的菜单可见权限不用做其他的操作。

4.2 按钮权限 【[代码地址](https://link.juejin.cn/?target=https%3A%2F%2Fgithub.com%2Frodchen-king%2Fant-design-pro-v2%2Fcommit%2F0e7895c56e4962d75ab8ccf4637cefca3f5f71b6%23diff-a7acc04e8fb20252554c588f7b7a8564 "https://github.com/rodchen-king/ant-design-pro-v2/commit/0e7895c56e4962d75ab8ccf4637cefca3f5f71b6#diff-a7acc04e8fb20252554c588f7b7a8564") [demo地址](https://link.juejin.cn/?target=https%3A%2F%2Fgithub.com%2Frodchen-king%2Fant-design-pro-v2%2Fcommits%2Fpermission-branch "https://github.com/rodchen-king/ant-design-pro-v2/commits/permission-branch")】
--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

按钮权限上就涉及到两块，**资源权限**和**数据权限**。数据获取的方式不同，代码逻辑上会稍微有点不同。核心是业务组件内部的code，在加载的时候就自行累加，然后在页面加载完成的时候，发送请求。拿到数据之后，自行进行权限校验。尽量减少业务页面代码的复杂度。

**资源权限逻辑介绍：**

1. **PageHeaderWrapper**包含的业务页面存在按钮权限
2. 按钮权限通过**AuthorizedButton**包含处理，需要添加code。但是业务页面因为是单独页面发送当前页面code集合去查询权限code，然后在**AuthorizedButton**进行权限逻辑判断。
3. 所以**AuthorizedButton**的**componentWillMount**生命周期进行当前业务页面的code累加。累加完成之后，通过**PageHeaderWrapper**的**componentDidMount**生命周期函数发送权限请求，拿到权限code，通过公有globalAuthority model读取数据进行权限逻辑判断。
4. 对于业务页面的调用参考readme进行使用。因为对于弹出框内部的code，在业务列表页面渲染的时候，组件还未加载，所以通过extencode提前将code累加起来进行查询权限。

**数据权限介绍：**

1. 涉及数据权限，则直接将对应的数据规则放进**AuthorizedButton**内部进行判断，需要传入的数据则直接通过props传入即可。因为数据权限的规则不同，这里就没有举例子。
2. 需要注意的逻辑是资源权限和数据权限是串行的，先判断资源权限，然后判断数据权限。

**a. 添加公用authority model**

```js
/* eslint-disable no-unused-vars */
/* eslint-disable no-prototype-builtins */
import { getAuthority } from '@/services/authority';

export default {
  namespace: 'globalAuthority',

  state: {
    hasAuthorityCodeArray: [], // 获取当前具有权限的资源code
    pageCodeArray: [], // 用来存储当前页面存在的资源code
  },

  effects: {
    /**
     * 获取当前页面的权限控制
     */
    *getAuthorityForPage({ payload }, { put, call, select }) {
      // 这里的资源code都是自己加载的
      const pageCodeArray = yield select(state => state.globalAuthority.pageCodeArray);
      const response = yield call(getAuthority, pageCodeArray);

      if (pageCodeArray.length) {
        yield put({
          type: 'save',
          payload: {
            hasAuthorityCodeArray: response,
          },
        });
      }
    },

    *plusCode({ payload }, { put, select }) {
      // 组件累加当前页面的code，用来发送请求返回对应的权限code
      const { codeArray = [] } = payload;
      const pageCodeArray = yield select(state => state.globalAuthority.pageCodeArray);

      yield put({
        type: 'save',
        payload: {
          pageCodeArray: pageCodeArray.concat(codeArray),
        },
      });
    },

    // eslint-disable-next-line no-unused-vars
    *resetAuthorityForPage({ payload }, { put, call }) {
      yield put({
        type: 'save',
        payload: {
          hasAuthorityCodeArray: [],
          pageCodeArray: [],
        },
      });
    },
  },

  reducers: {
    save(state, { payload }) {
      return {
        ...state,
        ...payload,
      };
    },
  },
};


```
  
**b. 修改PageHeaderWrapper文件【因为所有的业务页面都是这个组件的子节点】**

```js
import React, { PureComponent } from 'react';
import { FormattedMessage } from 'umi/locale';
import Link from 'umi/link';
import PageHeader from '@/components/PageHeader';
import { connect } from 'dva';
import MenuContext from '@/layouts/MenuContext';
import { Spin } from 'antd';
import GridContent from './GridContent';
import styles from './index.less';

class PageHeaderWrapper extends PureComponent {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'globalAuthority/getAuthorityForPage', // 发送请求获取当前页面的权限code
    });
  }

  componentWillUnmount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'globalAuthority/resetAuthorityForPage',
    });
  }

  render() {
    const { children, contentWidth, wrapperClassName, top, loading, ...restProps } = this.props;

    return (
      <Spin spinning={loading}>
        <div style={{ margin: '-24px -24px 0' }} className={wrapperClassName}>
          {top}
          <MenuContext.Consumer>
            {value => (
              <PageHeader
                wide={contentWidth === 'Fixed'}
                home={<FormattedMessage id="menu.home" defaultMessage="Home" />}
                {...value}
                key="pageheader"
                {...restProps}
                linkElement={Link}
                itemRender={item => {
                  if (item.locale) {
                    return <FormattedMessage id={item.locale} defaultMessage={item.title} />;
                  }
                  return item.title;
                }}
              />
            )}
          </MenuContext.Consumer>
          {children ? (
            <div className={styles.content}>
              <GridContent>{children}</GridContent>
            </div>
          ) : null}
        </div>
      </Spin>
    );
  }
}

export default connect(({ setting, globalAuthority, loading }) => ({
  contentWidth: setting.contentWidth,
  globalAuthority,
  loading: loading.models.globalAuthority,
}))(PageHeaderWrapper);


```
  
**c. 添加AuthorizedButton公共组件**

```js
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';

@connect(({ globalAuthority }) => ({
  globalAuthority,
}))
class AuthorizedButton extends Component {
  static contextTypes = {
    isMobile: PropTypes.bool,
  };

  componentWillMount() {
    // extendcode 扩展表格中的code还没有出现的情况
    const {
      dispatch,
      code,
      extendCode = [],
      globalAuthority: { pageCodeArray },
    } = this.props;

    let codeArray = [];

    if (code) {
      codeArray.push(code);
    }

    if (extendCode && extendCode.length) {
      codeArray = codeArray.concat(extendCode);
    }

    // code已经存在，证明是页面数据渲染之后或者弹出框的按钮资源，不需要走dva了
    if (pageCodeArray.indexOf(code) >= 0) {
      return;
    }

    dispatch({
      type: 'globalAuthority/plusCode',
      payload: {
        codeArray,
      },
    });
  }

  checkAuthority = code => {
    const {
      globalAuthority: { hasAuthorityCodeArray },
    } = this.props;

    return hasAuthorityCodeArray.indexOf(code) >= 0; // 资源权限
  };

  render() {
    const { children, code } = this.props;

    return (
      <span style={{ display: this.checkAuthority(code) ? 'inline' : 'none' }}>{children}</span>
    );
  }
}

export default AuthorizedButton;


```
  
**d. 添加AuthorizedButton readme文件**  
[github.com/rodchen-kin…](https://link.juejin.cn/?target=https%3A%2F%2Fgithub.com%2Frodchen-king%2Fant-design-pro-v2%2Fblob%2Fpermission-branch%2Fsrc%2Fcomponents%2FAuthorizedButton%2Findex.md "https://github.com/rodchen-king/ant-design-pro-v2/blob/permission-branch/src/components/AuthorizedButton/index.md")  
  
4.3 按钮权限扩展-链接权限控制 【[代码地址](https://link.juejin.cn/?target=https%3A%2F%2Fgithub.com%2Frodchen-king%2Fant-design-pro-v2%2Fcommit%2F02914330f17f11f3d6e8b7d5c1239702c6832337 "https://github.com/rodchen-king/ant-design-pro-v2/commit/02914330f17f11f3d6e8b7d5c1239702c6832337") [demo地址](https://link.juejin.cn/?target=https%3A%2F%2Fgithub.com%2Frodchen-king%2Fant-design-pro-v2%2Fcommits%2Fpermission-branch "https://github.com/rodchen-king/ant-design-pro-v2/commits/permission-branch")】
-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

背景：页面上有需要控制跳转链接的权限，有权限则可以跳转，没有权限则不能跳转。 ![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f07410670fe94313a5c0c6b3f569c538~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.image)

**a.公共model添加新的state：codeAuthorityObject**  
  
![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/097e301265494c8fbafd8efed7024cdb~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.image)

通过redux-devtool，查看到codeAuthorityObject的状态值为：key:code值，value的值为true/false。 true代表，有权限，false代表无权限。主要用于开发人员自己做相关处理。  
  
![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/d26733fe29134fe7b5d499635f544709~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.image)

**b.需要控制的按钮code，通过其他方式扩展进行code计算，发送请求获取权限**  
  
![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/832d4e43e8294794bfa52a2b5b527338~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.image)

**c.获取数据进行数据控制**  
  
![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/0697bae8cde244859960f2ec87aefc47~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.image)

4.4 按钮数据权限
----------

* demo分支：[github.com/rodchen-kin…](https://link.juejin.cn/?target=https%3A%2F%2Fgithub.com%2Frodchen-king%2Fant-design-pro-v2%2Ftree%2Fpermission-branch "https://github.com/rodchen-king/ant-design-pro-v2/tree/permission-branch")
* demo代码：[github.com/rodchen-kin…](https://link.juejin.cn/?target=https%3A%2F%2Fgithub.com%2Frodchen-king%2Fant-design-pro-v2%2Fcommit%2F463514b0964c4c0187a503d315aa9f088e963f71 "https://github.com/rodchen-king/ant-design-pro-v2/commit/463514b0964c4c0187a503d315aa9f088e963f71")

### 背景

数据权限是对于业务组件内部表格组件的数据进行的数据操作权限。列表数据可能归属于不同的数据类型，所以具有不同的数据操作权限。对于批量操作则需要判断选择的数据是否都具有操作权限，然后显示是否可以批量操作，如果有一个没有操作权限，都不能进行操作。  
  
![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b8a7f4cae6564a58a9bafc0c89170fd5~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.image)  
  
### 总体思路

场景：  
比如在商品列表中，每条商品记录后面的“操作”一栏下用三个按钮：【编辑】、【上架/下架】、【删除】，而对于某一个用户，他可以查看所有的商品，但对于某些品牌他可以【上架/下架】但不能【编辑】，则前端需要控制到每一个商品后面的按钮的可用状态。  
  
比如用户A对于某一条业务数据（id=1999）有编辑权限，则这条记录上的【编辑】按钮对他来说是可见的（前提是他首先要有【编辑】这个按钮的资源权限），但对于另一条记录（id=1899）是没有【编辑】权限，则这条记录上的【编辑】按钮对他来说是不可见的。  
  
### 按钮【actType】属性定义

每个数据操作的按钮上加一个属性 “actType”代表这个按钮的动作类型（如：编辑、删除、审核等），这个属性是资权限的接口返回的，前端在调这个接口时将这个属性记录下来，或者保存到对应的控件中。所以前端可以不用关于这个属性的每个枚举值代表的是什么含义，只需根据接口的返回值赋值就好。 用兴趣的同学也可以参考一下actType取值如下：1 可读，2 编辑，3 可读+可写, 4 可收货，8 可发货，16 可配货， 32 可审核，64 可完结  
  
### 业务接口返回权限类型字段【permissionType】

对于有权限控制的业务数据，列表接口或者详情接口都会返回一个“permissionType”的字段，这个字段代表当前用户对于这条业务数据的权限类型，如当 permissionType=2 代表这个用户对于这条数据有【编辑权限】，permisionType=4 代表这个用户对于这条业务数据有收货的权限，permisionType=6表示这个用户对于这条记录用编辑和发货的权限（6=2+4）  
  
### 怎么控制按钮的可用状态？

现在列表上有三个按钮，【编辑】、【收货】、【完结】，它们对应的“actType”分别为2、4、64，某一条数据的permissionType=3，这时这三个按钮的状态怎么判断呢，permissionType=3 我们可以分解为 1+2，表示这个用户对于这条记录有“可读”+“编辑”权限，则这三个按钮中，只有【编辑】按钮是可用的。那么判断的公式为：

```js
((data[i].permissionType & obj.actType)==obj.actType)
```
  
### 前端的js数据进行&判断

需要进行数据转换

* data.toString(2): 将数据进行2进制转换成二进制字符串。
* parseInt(permissionType,2) : 二进制字符串转换成二进制数据。  

### 代码修改

**接口mock返回数据**

```
response = [{
      "type": 3,
      "name": "创建活动-10001",
      "actType": 0,
      "code": "10001"
    }, {
      "type": 3,
      "name": "编辑-10002",
      "actType": 2,
      "code": "10002"
    }, {
      "type": 3,
      "name": "配置-10005",
      "actType": 4,
      "code": "10005"
    }, {
      "type": 3,
      "name": "订阅警报-10006",
      "actType": 8,
      "code": "10006"
    }, {
      "type": 3,
      "name": "查询详情-20001",
      "actType": 16,
      "code": "20001"
    }, {
      "type": 3,
      "name": "批量操作-10007",
      "actType": 32,
      "code": "10007"
    }, {
      "type": 3,
      "name": "更多操作-10008",
      "actType": 64,
      "code": "10008"
    }]

```

每一个返回的接口权限会将对应的actType一起返回。

**getAuthorityForPage代码修改** 简单修改一下，因为之前返回的是code数组，现在返回的是对象

```
   /**
     * 获取当前页面的权限控制
     */
    *getAuthorityForPage({ payload }, { put, call, select }) {
      // 这里的资源code都是自己加载的
      const pageCodeArray = yield select(state => state.globalAuthority.pageCodeArray);
      const response = yield call(getAuthority, pageCodeArray);
      const hasAuthorityCodeArray = response || [];
      const codeAuthorityObject = {};

      pageCodeArray.forEach((value, index, array) => {
        codeAuthorityObject[value] = hasAuthorityCodeArray.map(item => item.code).indexOf(value) >= 0;
      });

      // debugger
      yield put({
        type: 'save',
        payload: {
          hasAuthorityCodeArray,
          codeAuthorityObject,
        },
      });
    },

```

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f0eef8fd709446f69e0ddb06a470110d~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.image)

**修改AuthorizedButton代码** 增加数据权限判断

```
/* eslint-disable eqeqeq */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';

@connect(({ globalAuthority }) => ({
  globalAuthority,
}))
class AuthorizedButton extends Component {
  static contextTypes = {
    isMobile: PropTypes.bool,
  };

  componentWillMount() {
    // extendcode 扩展表格中的code还没有出现的情况
    const {
      dispatch,
      code,
      extendCode = [],
      globalAuthority: { pageCodeArray },
    } = this.props;

    let codeArray = [];

    if (code) {
      codeArray.push(code);
    }

    if (extendCode && extendCode.length) {
      codeArray = codeArray.concat(extendCode);
    }

    // code已经存在，证明是页面数据渲染之后或者弹出框的按钮资源，不需要走dva了
    if (pageCodeArray.indexOf(code) >= 0) {
      return;
    }

    dispatch({
      type: 'globalAuthority/plusCode',
      payload: {
        codeArray,
      },
    });
  }

  checkAuthority = code => {
    const {
      globalAuthority: { hasAuthorityCodeArray },
    } = this.props;

    return hasAuthorityCodeArray.map(item => item.code).indexOf(code) >= 0 && this.checkDataAuthority(); // 资源权限
  };


  /**
   * 检测数据权限
   */
  checkDataAuthority = () => {
    const {
      globalAuthority: { hasAuthorityCodeArray },
      code,                                         // 当前按钮的code
      actType,                                      // 当前按钮的actType的值通过传递传入
      recordPermissionType,                         // 单条数据的数据操作权限总和
      actTypeArray
    } = this.props;

    if (recordPermissionType || actTypeArray) {     // 单条数据权限校验
      const tempCode = hasAuthorityCodeArray.filter(item => item.code === code)
      let tempActType = ''

      if (actType) {
        tempActType = actType
      } else if (tempCode.length) {
        tempActType = tempCode[0].actType
      } else {
        return true;                                // 默认返回true
      }

      if (actTypeArray) {                           // 批量操作
        return !actTypeArray.some(item => !this.checkPermissionType(item.toString(2), tempActType.toString(2)))
      }

      // 单条数据操作
      return this.checkPermissionType(recordPermissionType.toString(2), tempActType.toString(2))
    } 

    return true;                                    // 如果字段没有值的情况下，证明不需要进行数据权限
  }

  /**
   * 二进制检查当前当前数据是否具有当前权限
   * @param {*} permissionType 
   * @param {*} actType
   */
  checkPermissionType = (permissionType, actType) => 
     (parseInt(permissionType,2) & parseInt(actType,2)).toString(2) == actType
  

  render() {
    const { children, code } = this.props;

    return (
      <span style={{ display: this.checkAuthority(code) ? 'inline' : 'none' }}>{children}</span>
    );
  }
}

export default AuthorizedButton;


```
  
**调用方式**  
  
单条数据操作

```
<AuthoriedButton code="10005" recordPermissionType={record.permissionType}>
  <a onClick={() => this.handleUpdateModalVisible(true, record)}>配置</a>
</AuthoriedButton>

```

批量操作

```
 <AuthoriedButton code="10007" actTypeArray={getNotDuplicateArrayById(selectedRows, 'permissionType')}>
     <Button>批量操作</Button>
 </AuthoriedButton>

```
