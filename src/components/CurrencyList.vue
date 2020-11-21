<template>
<v-container>
  <v-data-table
    v-model="selectedCurrencies"
    :headers="headers"
    :items="items"
    :show-select="favourite"
    :single-select="false"
    item-key="code"
    class="elevation-1">
    <template v-slot:top >
      <v-container>
        <v-row>
          <v-icon v-if="favourite" color="red"  class="ml-4"
            @click="onRemove()">
            mdi-delete
          </v-icon>
          <v-toolbar-title class="ml-4">
            {{tableName}}
          </v-toolbar-title>
        </v-row>
      </v-container>
    </template>
    <template v-slot:item.action="{ item }">
      <v-icon v-if="isFavourite(item)"
      color="yellow" @click="onRemove(item)">mdi-star</v-icon>
      <v-icon v-else color="grey" @click="addToFavourite(item)">mdi-star-outline</v-icon>
    </template>
  </v-data-table>
  <v-dialog v-model="dialogDelete" max-width="500px">
    <v-card>
      <v-card-title class="headline">
        {{baseDeleteMessage}}
      </v-card-title>
      <v-card-subtitle>
        {{itemToRemove || selectedCurrencies}}
      </v-card-subtitle>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" text @click="removeHandler">OK</v-btn>
        <v-btn color="blue darken-1" text @click="closeDeleteDialog">Cancel</v-btn>
        <v-spacer></v-spacer>
      </v-card-actions>
    </v-card>
  </v-dialog>
</v-container>
</template>

<script>

import containsElement from '../utils/Utils';

export default {

  props: ['favourite', 'items'],
  computed: {
    headers() {
      return [
        { text: 'Nazwa waluty', align: 'start', value: 'currency' },
        { text: 'Kod waluty', value: 'code' },
        { text: 'Kurs średni', value: 'mid' },
        !this.favourite && { text: 'Dodaj do ulubionych', value: 'action', sortable: false },
      ];
    },
  },

  data: () => ({
    selectedCurrencies: [],
    dialogDelete: false,
    itemToRemove: {},
    tableName: 'Table Name',
    removeHandler: Function,
    baseDeleteMessage: 'Delete Message',

  }),

  mounted() {
    this.tableName = 'All currencies';
    this.baseDeleteMessage = 'Are you sure you want to delete this item?';
    this.removeHandler = this.removeFromFavourite;

    if (this.favourite) {
      this.tableName = 'Favourite currencies';
      this.baseDeleteMessage = 'Are you sure you want to delete those items?';
      this.removeHandler = this.removeFewFromFavourite;
    }
  },

  methods: {
    onRemove(item) {
      this.dialogDelete = true;
      this.itemToRemove = item;
    },
    closeDeleteDialog() {
      this.dialogDelete = false;
      this.itemToRemove = {};
    },

    removeFewFromFavourite() {
      this.$store.commit('removeFavouriteCurrencies', this.selectedCurrencies);
      this.selectedCurrencies = [];
      this.closeDeleteDialog();
    },

    removeFromFavourite() {
      this.$store.commit('removeFavouriteCurrency', this.itemToRemove);
      this.closeDeleteDialog();
    },
    addToFavourite(currency) {
      this.$store.commit('addFavouriteCurrency', currency);
    },
    isFavourite(currency) {
      return containsElement(this.$store.state.favouriteCurrencies, currency);
    },
  },
};
</script>
