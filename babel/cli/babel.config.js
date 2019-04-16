module.exports = {
    presets: [
      ['@babel/env', { 'modules': false }]
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
        compact: true
      }
    ],
    only: [//对于include, test, exclude都没有匹配的文件，在only这里给它一个机会
      'src/test.js'
    ],
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
  