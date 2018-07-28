const state = () => ({
  hasRegistered: false,
  user: '',
  users: []
})

const getters = {
  getRegistrationStatus: state => {
    return state.hasRegistered
  },
  getuser: state => {
    return state.user
  },
  getUsers: state => {
    return state.users
  }
}

const mutations = {
  setRegistrationStatus: function (state, status) {
    state.hasRegistered = status
  },
  setUser: function (state, user) {
    state.user = user
  },
  setUsers: function (state, users) {
    state.users = users
  }
}

const actions = {
  async register({commit}, payload) {
    commit('setRegistrationStatus', payload.status);
  },
  async fetchUser({commit}, payload) {
    commit('setUser', payload.user);
  },
  async fetchUsers({commit}, payload) {
    commit('setUsers', payload.users);
  },
}

export default {
  state,
  actions,
  mutations,
  getters
  
}
