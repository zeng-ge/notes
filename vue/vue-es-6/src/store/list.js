export default {
  state: {
    users: [
      { id: 1, name: 'sky' },
      { id: 2, name: 'tod' },
    ]
  },
  mutations: {
    addUser: (state, user) => {
      state.users.push(user)
    }
  },
  actions: {
    addUser: function(context, user){
      context.commit('addUser', user)
    }
  },
  getter: {
    total: state => state.users.length
  }
}
