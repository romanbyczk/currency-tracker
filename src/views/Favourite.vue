<template>
  <v-container>
    <CurrencyList :items="$store.state.favouriteCurrencies" :favourite="true" class="ma-5"/>
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
