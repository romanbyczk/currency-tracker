import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';
import Utils from '../utils/Utils';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    favouriteCurrencies: [],
  },

  plugins: [createPersistedState()],

  mutations: {
    addFavouriteCurrency(state, currency) {
      if (!Utils.containsCurrency(state.favouriteCurrencies, currency)) {
        state.favouriteCurrencies.push(currency);
      }
    },

    removeFavouriteCurrency(state, currency) {
      if (!currency) {
        return;
      }

      state.favouriteCurrencies.splice(state.favouriteCurrencies.indexOf(currency), 1);
    },

    removeFavouriteCurrencies(state, currencies) {
      if (!currencies) {
        return;
      }

      currencies.forEach((v) => this.commit('removeFavouriteCurrency', v));
    },
  },
});
