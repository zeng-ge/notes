# 前端工程

### 环境搭建

1. 安装Nodejs
2. clone代码
3. 切换到src目录 `cd frontend-src`
4. 安装依赖 `npm install`
5. 安装E2E依赖 `cd e2e` 然后`npm install`

### 分支管理

#### 主要包含如下几个分支：

1. Dev                                  `开发分支，新功能一般在它上面开发`
2. release                            `产品分支，用于发布`  
3. without-validate-code  `该分支不包含验证码登录，其它同release一样`

#### 开发流程

1. 线上bug请在release分支修复并合并到Dev与without-validate-code分支
2. 新功能一般在Dev分支开发，如果功能太庞大可以单独拉分支开发，然后合并到Dev
3. 下一个迭代的功能最好新拉分支开发，以防止突发性发包时Dev分支包含了不需要的功能

### 前端工程

#### 技术栈

1. 构建相关： `nodejs webpack babel eslint`
2. 界面相关：`vuejs vuex vue-router jquery echarts axios stylus`

#### 目录结构

``` javascript
e2e //端到端测试根目录
  cypress           //测试根目录
    components      //对公用组件的封装
    fixtures        //存放静态资源文件，如图片、数据文件
    integration     //e2e测试文件目录，具体的功能测试都位于它下面
    pages           //根据页面封装其元素引用，供测试文件调用
    plugins         //插件，可以在其内部调用nodejs的相关功能，如查询数据库
    servers         //分其服务或方法
    support          //自定义命令，如通过ajax实现登录
  cypress.env.json  //环境配置，如baseUrl，登录用户信息
  cypress.json      //cypress基本配置信息
src //源文件目录
  main.js           //项目入口
  App.vue           // Vue主文件
  common            // 静态资源，如字体、样式、视频、icon等
  components        // 公共的UI组件
  libs              // 分共的库方法
    axios.js        // ajax请求的封闭，里面会拦截请求并处理各种错误
    api.request.js  // 根据环境变量实例化请求对象
  router            // 整个工程的路由配置
  store             // vuex store的配置
  services          // 公共服务与方法
  view              // 页面都放在这里
webpack             // webpack配置目录
  base.config.js         //基本配置
  development.config.js  //开发环境的配置文件
  production.config.js   //产品打包的配置文件
.babelrc            //babel配置文件
package.json        //包依赖描述文件
```

#### 启动本地工程

1. 配置代理

> 本地开发需要代理到不同的服务器，修改webpack/development.config.js里面的proxy.target到对应的服务器host及端口，默认为`http://localhost:8090`

2. 命令

> frontend-src/package.json的scripts里面定义了一些命令，npm start启动本地开发, npm run build打包产品包，npm run build:dev打包开发包

```javascript
// frontend-src/package.json
"start": "webpack-dev-server --config ./webpack/development.config.js",
"build": "npm run build:prod",
"build:dev": "webpack --config ./webpack/development.config.js",
"build:prod": "webpack --config ./webpack/production.config.js",
```

3. 服务器部署前端

> 前端工程是独产的，需要将打包后的文件复制到后端工程COM_WEB目录下