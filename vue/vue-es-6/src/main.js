import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'
import store from './store/'

Vue.use(VueRouter)
Vue.config.productionTip = false
window.Vue = Vue

const User = {
  beforeCreate: function() {
    console.log('before')
  },
  created: function() {
    console.log('created')
  },
  render: function(createElement) {
    return createElement('div', {}, 'user component')
  }
}

const router = new VueRouter({
  routes: [
    { path: '/', component: User }
  ]
})
window.instance = new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')
