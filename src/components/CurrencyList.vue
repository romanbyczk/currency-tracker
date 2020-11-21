<template>
  <v-container fluid>
    <v-data-table
      v-model="selectedCurrencies"
      :headers="headers"
      :items="items"
      :show-select="favourite"
      :single-select="false"
      :search="search"
      item-key="code"
      dense
      class="elevation-1"
    >
      <template v-slot:top>
        <v-container>
          <v-row>
            <v-btn icon class="ml-3" color="red">
              <v-icon v-if="favourite" color="red" @click="onRemove()">
                mdi-delete
              </v-icon>
            </v-btn>
            <v-toolbar-title class="ml-5">
              {{ tableName }}
            </v-toolbar-title>
            <v-spacer></v-spacer>
            <v-text-field
              v-model="search"
              append-icon="mdi-magnify"
              label="Search"
              single-line
              hide-details
            ></v-text-field>
          </v-row>
        </v-container>
      </template>
      <template v-slot:item.currency="{ item }">
        <div style="min-width: 450px; max-width: 200px">
          {{ item.currency.toUpperCase() }}
        </div>
      </template>
      <template v-slot:item.action="{ item }">
        <v-tooltip v-if="isFavourite(item)" right>
          <template v-slot:activator="{ on, attrs }">
            <v-icon
              v-bind="attrs"
              v-on="on"
              color="yellow"
              @click="onRemove(item)"
              >mdi-star</v-icon
            >
          </template>
          <span>Remove from favourite</span>
        </v-tooltip>
        <v-tooltip v-else right>
          <template v-slot:activator="{ on, attrs }">
            <v-icon
              color="grey"
              v-bind="attrs"
              v-on="on"
              @click="addToFavourite(item)"
              >mdi-star-outline</v-icon
            >
          </template>
          <span>Add to favourite</span>
        </v-tooltip>
      </template>
    </v-data-table>
    <v-dialog v-model="dialogDelete" max-width="600px">
      <v-card>
        <v-card-title class="headline">
          {{ baseDeleteMessage }}
        </v-card-title>
        <v-card-subtitle v-if="itemToRemove">
          {{ itemToRemove.currency }}
        </v-card-subtitle>
        <v-card-subtitle v-else>
          {{ selectedCurrencies.map((v) => v.currency) }}
        </v-card-subtitle>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="removeHandler">OK</v-btn>
          <v-btn color="blue darken-1" text @click="closeDeleteDialog"
            >Cancel</v-btn
          >
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import containsElement from '@/utils/Utils';
import EventBus from '@/event-bus';

export default {
  props: ['favourite', 'items'],
  computed: {
    headers() {
      return [
        { text: 'Currency name', align: 'start', value: 'currency' },
        { text: 'Currenccy code', value: 'code' },
        { text: 'Average exchange rate', value: 'mid' },
        !this.favourite && {
          text: 'Favourite',
          value: 'action',
          sortable: false,
        },
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
    search: '',
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
      EventBus.$emit('showSuccess');
    },
    isFavourite(currency) {
      return containsElement(this.$store.state.favouriteCurrencies, currency);
    },
  },
};
</script>
