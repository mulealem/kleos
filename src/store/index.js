import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: {},
    isLoading: {}
  },
  getters: {
    user: (state) => {
      return state.user;
    },
  },
  mutations: {
    SET_USER(state, payload) {
      state.user = payload;
    },
  },
  actions: {
    analyse({ commit, dispatch }) {

    }
  },
  modules: {},
});
