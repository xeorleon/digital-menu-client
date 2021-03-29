import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    token: null,
    user: null,
    isUserLoggedIn: false,
    isPersistent: false,
  },
  mutations: {
    setToken(state, token) {
      state.token = token;

      if (token) {
        state.isUserLoggedIn = true;
      } else {
        state.isUserLoggedIn = false;
      }
    },
    setUser(state, user) {
      state.user = user;
    },
    setPersistent(state, value) {
      state.isPersistent = value;
    },
  },
  actions: {
    setToken({ commit }, token) {
      commit("setToken", token);
    },
    setUser({ commit }, user) {
      commit("setUser", user);
    },
    setPersistent({ commit }, value) {
      commit("setPersistent", value);
    },
  },
  plugins: [createPersistedState()],
});
