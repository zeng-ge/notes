module.exports = {
    presets: [
      /**
       * modules的值：
       * 默认是auto, 测试发现这个auto就是commonjs
       * cjs就是commonjs
       * false是禁用模块化，此时import不会被编译
       * 由于现在的webpack有了自己的模块化（即ES6)，所以可以关闭babel的模块化
       * "amd" | "umd" | "systemjs" | "commonjs" | "cjs" | "auto" | false, defaults to "auto"
       * 
       * 
       * useBuiltIns有两个值entry与usage
       * 对于entry, 需要人工import @babel/polyfill，而且只能import一次，多次import会报错
       * 对于usage，不需要人工的import任何辅助API，它会自动判断所需要的api并引入core-js里面对应的文件
       * 比如在User里面用到了Promise,它会自动的添加require("core-js/modules/es6.promise");
       * 选usage时必须安装core-js依赖
       * 
       * loose默认值是false
       * true: 用更简单的方式生成ES5代码
       * false: 生成的代码更复杂
       * 如，对于上面的User类
       * true时：更偏向于ES5的语法
       * User.prototype.say = function(){}
       * false时:
       * _createClass(User, [{
       *  key: 'say',
       *  value: function(){}
       * }])
       * 
       * targets指定代码运行的环境,它的值是一个browserslist-compatible
       * 如果不指定，所有的ES6语法都会转译
       * 如果指定了，比如说chrome: 70，那么chrome70支持的语法不会被转译
       */
      [ 
        '@babel/preset-env', 
        { 
          modules: 'cjs',
          useBuiltIns: 'usage',
          loose: false,
          targets: {
            chrome: "30"
          }
        }
      ]
    ],
    plugins: [
      '@babel/plugin-proposal-class-properties'
    ],
    test: ['*/*.js'],//test与include是一样的，对于匹配的文件使用配置，未匹配的相当于exclude
    exclude: ['*/test.js'],//对于匹配的文件禁用当前的配置，相当于仅仅复制内容，优先级高于test与include
    // ignore: ['*/test.js'],//对于匹配的文件或目录，babel将会忽略它们，不编译，会被exclude覆盖而不起作用
    overrides: [
      /**
       * 正常情况下直接在当前配置下就设置好test, include, exlude了，不可能在这里再搞个overrides
       * 而对于多个babel配置的情况下，子配置继承了上一次的配置，这时用overrides来想覆盖就正常了
       */
      {
        test: ['*/app.js'],
        compact: false
      }
    ],
    // only: [//对于include, test, exclude都没有匹配的文件，在only这里给它一个机会
    //   'src/test.js'
    // ],
    env: {
      sit: {
        presets: [
          ['@babel/env', { 'modules': false }]
        ],
        plugins: [
          '@babel/plugin-proposal-class-properties'
        ],        
      },
      uat: {},
      prod: {
        presets: [
          ['@babel/env', { 'modules': false }]
        ],
        plugins: [
          '@babel/plugin-proposal-class-properties'
        ]
      },
    }
}
  