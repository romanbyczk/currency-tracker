<template>
  <v-container>
    <CurrencyList :items="items" class="ma-5"/>
  </v-container>
</template>

<script>

import CurrencyList from '@/components/CurrencyList.vue';
import NBPService from '@/services/NBPService';

export default {
  components: {
    CurrencyList,
  },

  data: () => ({
    items: [],
  }),

  mounted() {
    this.fetchCurrencies();
  },

  methods: {
    fetchCurrencies() {
      this.items = [];
      Promise.all([
        NBPService.getCurrencies('A'),
        NBPService.getCurrencies('B'),
      ]).then((data) => {
        const [tableA, tableB] = data;
        this.items = [...tableA[0].rates, ...tableB[0].rates];
      });
    },
  },
};
</script>
