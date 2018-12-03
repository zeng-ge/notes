<template>
  <div class="todo-list">
    <TodoItem
      v-for="item in todos"
      :item="item"
      :key="item.message"
    ></TodoItem>
  </div>
</template>

<script>
import Vue from 'vue'
import Component from 'vue-class-component'
import TodoItem from './TodoItem.js'

/***
 * 在模板中即可使用TodoItem或todo-item作为标签名
 * 这决定于TodoItem的名字怎么定义
 * 如果是camel的形式，那么就可以用TodoItem与todo-item
 * 如果是todo-item，那么就只能用todo-item
 *
 * components里面是局部注册的组件名，如果是{abc: TodoItem}那么在模板中可以用<abc></abc>
 * ES6的写法注定了只能用局部注册，想要实现全局注册就得用nodejs将组件文件内容读出来，
 * 然后用Vue.component(name, config)来做全局注册组件
 */
export default {
  components: {
    TodoItem
  },
  data: () => {
    return {
      todos: [
        {message: 'ab'},
        {message: 'cd'},
      ]
    }
  },
  mounted: function() {
    console.log('todo list mounted')
  },
}
// import Vue from 'vue'
// import Component from 'vue-class-component'
// import TodoItem from './TodoItem'

// @Component({
//   components: { TodoItem },
//无法编译TodoItem, 因为Vue.compile无法找到TodoItem，
//就算用了vue-class-component还是需要依赖Vue cli来编译模板
//   ...Vue.compile('<TodoItem class="todo-item">{{item.message}}</TodoItem>')
// })
// export default class TodoList extends Vue{
//   data(){
//     return {item: {message: 'abc'}}
//   }
// }
</script>

