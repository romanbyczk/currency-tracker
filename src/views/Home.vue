<template>
  <v-container fluid class="d-flex justify-space-between">
    <FavouriteCurrency class="ma-5 mt-0"/>
    <CurrencyList class="ma-5 mt-0"/>
  </v-container>
</template>

<script>

import CurrencyList from '@/components/CurrencyList.vue';
import FavouriteCurrency from '@/components/FavouriteCurrency.vue';

export default {
  components: {
    CurrencyList,
    FavouriteCurrency,
  },
};
</script>
