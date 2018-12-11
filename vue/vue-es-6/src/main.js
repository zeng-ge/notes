import Vue from 'vue'
import App from './App.vue'
import store from './store/'

Vue.config.productionTip = false
window.Vue = Vue
window.instance = new Vue({
  store,
  render: h => h(App)
}).$mount('#app')
