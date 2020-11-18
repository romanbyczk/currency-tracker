import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    favoriteCurrencies: [],
  },
  mutations: {
    getFavoriteCurrencies(state) {
      return state.favoriteCurrencies;
    },
    addFavoriteCurrency(state, currency) {
      state.favoriteCurrencies.push(currency);
    },
    removeFavoriteCurrency(state, currencies) {
      if (currencies.length > 1) {
        state.favoriteCurrencies = state.favoriteCurrencies.filter(
          (currency) => currencies.includes(currency),
        );
      } else {
        state.favoriteCurrencies = state.favoriteCurrencies.filter(
          (currency) => currencies.code !== currency.code,
        );
      }
    },
  },
  actions: {},
  modules: {},
});
