import Vuex from 'vuex'

const state = () => ({
  hasRegistered: false,
  user: '',
  users: [],
  privateChatHistory: [],
  publicChatHistory: []
  
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
  },
  getPrivateChatHistory: state => {
    return state.privateChatHistory
  },
  getPublicChatHistory: state => {
    return state.publicChatHistory
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
  setPrivateChatHistory: function (state, data) {
    state.privateChatHistory = data
  },
  setPublicChatHistory: function (state, data) {
    state.publicChatHistory = data
  },
  setPublicChatHistorySingle: function (state, data) {
    state.publicChatHistory.unshift(data)
  },
  setPrivateChatHistorySingle: function (state, data) {
    state.privateChatHistory.unshift(data)
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
