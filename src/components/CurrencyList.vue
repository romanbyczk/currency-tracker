<template>
  <v-data-table
    :headers="headers"
    :items="items"
  >
    <template v-slot:top>
      <v-toolbar-title style="text-align: center;">Currency table</v-toolbar-title>
    </template>
    <template v-slot:item.action="{ item }">
      <v-icon v-if="isFavourite(item)"
      color="yellow" @click="removeFavouriteCurrency(item)">mdi-star</v-icon>
      <v-icon v-else color="grey" @click="addFavouriteCurrency(item)">mdi-star-outline</v-icon>
    </template>
  </v-data-table>
</template>

<script>
import NBPService from '@/services/NBPService';

export default {
  data: () => ({
    items: [],
    headers: [
      {
        text: 'Nazwa waluty',
        align: 'start',
        value: 'currency',
      },
      { text: 'Kod waluty', value: 'code' },
      { text: 'Kurs średni', value: 'mid' },
      { text: 'Dodaj do ulubionych', value: 'action', sortable: false },
    ],
  }),

  mounted() {
    this.fetchTableData();
  },

  methods: {
    addFavouriteCurrency(favouriteCurrency) {
      if (!this.$store.state.favouriteCurrencies.includes(favouriteCurrency)) {
        this.$store.commit('addFavouriteCurrency', favouriteCurrency);
      }
    },

    removeFavouriteCurrency(favouriteCurrency) {
      if (this.$store.state.favouriteCurrencies.includes(favouriteCurrency)) {
        this.$store.commit('removeFavouriteCurrency', favouriteCurrency);
      }
    },

    isFavourite(currency) {
      if (this.$store.state.favouriteCurrencies) {
        return this.$store.state.favouriteCurrencies.includes(currency);
      }
      return false;
    },

    fetchTableData() {
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

<style scoped lang="scss">
</style>
