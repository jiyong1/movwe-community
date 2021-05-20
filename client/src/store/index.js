import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLogin: false,
    jwtToken: '',
  },
  mutations: {
    TOKEN: function (state, jwtToken) {
      if (jwtToken) {
        state.jwtToken = jwtToken;
        state.isLogin = true;
      } else {
        state.isLogin = false;
      }
    }
  },
  actions: {
    getToken: function (context) {
      const token = localStorage.getItem('jwt-token');
      context.commit('TOKEN', token);
    },
    login: async function (context, data) {
      console.log(context, data)
    },
    signup: async function (context, data) {
      console.log(context, data)
    },
  },
  modules: {
  }
})
