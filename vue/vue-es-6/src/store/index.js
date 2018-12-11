import Vue from 'vue'
import Vuex from 'vuex'
import list from './list'
import detail from './detail/'

Vue.use(Vuex)

//用modules来为store划分层级
/**
 *  {
 *    count: {},
 *    list: {
 *      users: []
 *    },
 *    detail: {
 *      id, name, age
 *    }
 *  }
 */
const store = new Vuex.Store({
  modules: {//this.$store.list.users， $store.detail.id
    list,
    detail
  },
  state: {
    count: 0
  },
  mutations: {
  	increment: state => state.count++,
    decrement: state => state.count--
  }
})

export default store
