import Vue from 'vue'
import Entry from './containers/entry'
import './app.scss'

new Vue({
  render: createElment => createElment(Entry)
}).$mount(document.getElementById('app'))
