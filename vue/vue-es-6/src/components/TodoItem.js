import Vue from 'vue'
import Component from 'vue-class-component'
import './welcome.scss'

@Component({
  props: ['item'],
  ...Vue.compile('<div class="todo-item">{{item.message}}</div>')
})
export default class TodoItem extends Vue{
  mounted() {
    console.log('todo item mounted')
  }
}
