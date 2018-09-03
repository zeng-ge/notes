# vue-class-component的使用

 1. 在.vue文件中的使用很简单，将类的定义放在script中，模板放在template里面
 2. 在.js文件中使用时，在@Component里面定义的template不会被编译，此时需要在vue里面包含asm
···
  vue.config.js里面添加配置：
  resolve: {
    alias: {
      vue$: 'vue/dist/vue.asm.js'//默认的asm里面不带asm
    }
  }
···
