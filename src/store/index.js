import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';
import containsElement from '../utils/Utils';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    favouriteCurrencies: [],
  },

  plugins: [createPersistedState()],

  mutations: {
    addFavouriteCurrency(state, currency) {
      if (!containsElement(state.favouriteCurrencies, currency)) {
        state.favouriteCurrencies.push(currency);
      }
    },

    removeFavouriteCurrencies(state, currencies) {
      state.favouriteCurrencies = state.favouriteCurrencies
        .filter((v) => !currencies?.includes(v));
    },

    removeFavouriteCurrency(state, currency) {
      state.favouriteCurrencies = state.favouriteCurrencies
        .filter((v) => currency?.code !== v.code);
    },
  },
  actions: {},
  modules: {},
});
