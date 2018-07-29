const state = () => ({
  hasRegistered: false,
  user: '',
  users: [],
  connect: false,
  fuck:''
})

const getters = {
  getRegistrationStatus: state => {
    return state.hasRegistered
  },
  getUser: state => {
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
  },
  SOCKET_CONNECT: function (state,  status) {
    state.connect = true;
    console.log('this.$socket connected')
    console.log('this.$socket connected---------------------')
  },
  SOCKET_USER:function (state ,user) {
    console.log(user)
    state.fuck = user
    console.log('this.user  connected---------------------')
  
  }
}

const actions = {
  socket_connect({commit}, payload){
    console.log('this.$socket connected---------------------')
  },
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
