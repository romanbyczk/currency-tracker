import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    favouriteCurrencies: [],
  },
  mutations: {
    getFavouriteCurrencies(state) {
      return state.favouriteCurrencies;
    },
    addFavouriteCurrency(state, currency) {
      state.favouriteCurrencies.push(currency);
    },
    removeFavouriteCurrency(state, currencies) {
      if (currencies.length > 1) {
        state.favouriteCurrencies = state.favouriteCurrencies.filter(
          (currency) => currencies.includes(currency),
        );
      } else {
        state.favouriteCurrencies = state.favouriteCurrencies.filter(
          (currency) => currencies.code !== currency.code,
        );
      }
    },
  },
  actions: {},
  modules: {},
});
