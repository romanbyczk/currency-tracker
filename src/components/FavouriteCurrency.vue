<template>
  <v-data-table
    :model="selectedCurrencies"
    :headers="headers"
    :items="this.$store.state.favouriteCurrencies"
    show-select
    :single-select="false"
    item-key="code">
    <template v-slot:top>
      <v-container>
        <v-row>
          <v-icon  color="red" @click="removeFavouriteCurrencies()">mdi-delete</v-icon>
          <v-toolbar-title style="text-align: center;">Favourite currencies</v-toolbar-title>
        </v-row>
      </v-container>
    </template>
  </v-data-table>
</template>

<script>
import { mapState } from 'vuex';

export default {
  data: () => ({
    selectedCurrencies: [],
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

  methods: {
    removeFavouriteCurrencies() {
      console.log(this.selectedCurrencies);
      if (this.selectedCurrencies.lenght > 0) {
        this.$store.commit('removeFavouriteCurrency', this.selectedCurrencies);
      }
    },
  },
  computed: mapState([
    'favouriteCurrencies',
  ]),
};
</script>

<style scoped lang="scss">
</style>
