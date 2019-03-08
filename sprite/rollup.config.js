import autoprefixer from 'autoprefixer'
import postcss from 'postcss'
import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import typescript from 'rollup-plugin-typescript2'
import scss from 'rollup-plugin-scss'
import copy from 'rollup-plugin-copy-glob'
import fillHtml from 'rollup-plugin-fill-html'
import json from 'rollup-plugin-json' //部分依赖包需要解析package.json，没有它会报错，在本工程中没有它axios会报错
import cssnano from 'cssnano'

const cssPlugins = [
  autoprefixer({//postcss用它为样式加上--webkit--,--ms等前缀
    remove: false,
    browsers: [
      'last 5 versions',//支持最新的5个版本
      'not ie <= 8',//IE8以下不支持
    ],
  })
]
if(process.env.ENV==='production') {
  cssPlugins.push(cssnano)//压缩css文件
}

export default {
  input: 'src/index.ts',
  output: {
    file: 'build/app.js',
    format: 'iife',
  },
  plugins: [
    json(),
    typescript(),
    resolve(),
    commonjs(),
    scss({
      output: 'build/app.css',
      processor: css => postcss(cssPlugins)
        .process(css)
        .then(result => result.css)
    }),
    copy([//将文件复制到build目录
      { files: 'src/assets/*.png', dest: 'build/assets'},
      { files: 'src/libs/*.js', dest: 'build/libs/'}
    ]),
    fillHtml({//将css与js注入html，会自动注，css在header, js在body
      template: 'src/index.html',
      target: 'build/index.html'
    })
  ]
}
