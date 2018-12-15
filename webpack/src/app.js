import Vue from 'vue'
import Entry from './containers/entry'
import './app.scss'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

new Vue({
  render: createElment => createElment(Entry)
}).$mount(document.getElementById('app'))
