<template>
  <v-container fluid >
    <CurrencyList :items="$store.state.favouriteCurrencies" :favourite="true" class="ma-5 mt-0"/>
  </v-container>
</template>

<script>

import CurrencyList from '@/components/CurrencyList.vue';

export default {
  components: {
    CurrencyList,
  },
};
</script>
