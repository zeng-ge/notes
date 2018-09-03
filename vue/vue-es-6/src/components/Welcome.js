import Vue from 'vue'
import Component from 'vue-class-component'
import './welcome.scss'

@Component({
  /**
   * 默认情况下，只有在.vue文件的template才会被编译
   * 这里的template是不会编译的，同时vue文件里面也不会自带asm，会倒致报错
   * 所以要在vue.config.js里面配置resole:{alias: {vue$: 'vue/dist/vue.asm.js'}}
   *
   * 一般写法：
   * 这种template才会被编译，可是这种写法太恶心
   * <template>
   *  <div class="abc">{{message}}</div>
   * </template>
   *
   * <script>js</script>
   *
   *
   * 由于template: '<div class="abc">{{message}}</div>'是在线编译，太慢，
   * 所以这里直接人工编译，这样会更快些
   */
  ...Vue.compile('<div class="abc">{{message}}</div>')
  // template: '<div class="abc">{{message}}</div>'
})
export default class Welcome extends Vue{
  data() {
    return {
      message: 'welcome to xian'
    }
  }
}
