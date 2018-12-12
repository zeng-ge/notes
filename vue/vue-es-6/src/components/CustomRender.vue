<script>
import Vue from 'vue'
Vue.component('custom-component', {
  props: ['title'],
  template: `
    <div>
      <h1>{{title}}</h1>
      <slot></slot>
    </div>
  `
})
/***
 * 在单元测试中new Constructor()时通过{propData}来传递props
 * createElement的三个参数：
 * 1) 组件的名字
 * 2) 组件参数，参数如下面的列表，attr表示基本属性，props表示属性
 * 3) 组件的children,父级通过this.$slot.default来获取children
 * {
      // 和`v-bind:class`一样的 API
      // 接收一个字符串、对象或字符串和对象组成的数组
      'class': {
        foo: true,
        bar: false
      },
      // 和`v-bind:style`一样的 API
      // 接收一个字符串、对象或对象组成的数组
      style: {
        color: 'red',
        fontSize: '14px'
      },
      // 普通的 HTML 特性
      attrs: {
        id: 'foo'
      },
      // 组件 props
      props: {
        myProp: 'bar'
      },
      // DOM 属性
      domProps: {
        innerHTML: 'baz'
      },
      // 事件监听器基于 `on`
      // 所以不再支持如 `v-on:keyup.enter` 修饰器
      // 需要手动匹配 keyCode。
      on: {
        click: this.clickHandler
      },
      // 仅用于组件，用于监听原生事件，而不是组件内部使用
      // `vm.$emit` 触发的事件。
      nativeOn: {
        click: this.nativeClickHandler
      },
      // 自定义指令。注意，你无法对 `binding` 中的 `oldValue`
      // 赋值，因为 Vue 已经自动为你进行了同步。
      directives: [
        {
          name: 'my-custom-directive',
          value: '2',
          expression: '1 + 1',
          arg: 'foo',
          modifiers: {
            bar: true
          }
        }
      ],
      // 作用域插槽格式
      // { name: props => VNode | Array<VNode> }
      scopedSlots: {
        default: props => createElement('span', props.text)
      },
      // 如果组件是其他组件的子组件，需为插槽指定名称
      slot: 'name-of-slot',
      // 其他特殊顶层属性
      key: 'myKey',
      ref: 'myRef',
      // 如果你在渲染函数中向多个元素都应用了相同的 ref 名，
      // 那么 `$refs.myRef` 会变成一个数组。
      refInFor: true
    }
 *
 */
export default {
  render(createElement){
    return createElement('custom-component', {
      props: { title: 'abc' }
    }, this.$slots.default)
  }
}
</script>
