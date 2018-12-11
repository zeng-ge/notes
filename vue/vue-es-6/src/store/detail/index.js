import actions from './actions'
import mutations from './mutations'

export default {
  state: {
    id: 1,
    name: 'sky',
    age: 20,
  },
  getter: {
    desc: state => {
      return state.age > 18 ? '成年人' : '未成年'
    }
  },
  mutations,
  actions,
}
