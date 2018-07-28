const state = () => ({
  hasRegistered: false
})

const getters = {
  getRegistrationStatus: state => {
    return state.hasRegistered
  }
}

const mutations = {
  setRegistrationStatus: function (state, status) {
    state.hasRegistered = status
  }
}

const actions = {
  async register({commit}, payload) {
    commit('setRegistrationStatus', payload.status);
  },
}

export default {
  state,
  actions,
  mutations,
  getters
  
}
