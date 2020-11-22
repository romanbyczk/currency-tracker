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
            <v-btn v-if="favourite" icon class="ml-3" color="red">
              <v-icon  color="red" @click="onRemove()">
                mdi-delete
              </v-icon>
            </v-btn>
            <v-toolbar-title class="ml-5"> {{ tableName }} </v-toolbar-title>
            <v-spacer/>
            <v-text-field v-model="search" label="Search" class="mr-4"/>
          </v-row>
        </v-container>
      </template>
      <template v-slot:item.currency="{ item }">
        <div style="min-width: 450px">
          {{ item.currency.toUpperCase() }}
        </div>
      </template>
      <template v-slot:item.action="{ item }">
        <v-tooltip v-if="isFavourite(item)" bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-icon
              v-bind="attrs"
              v-on="on"
              color="yellow"
              @click="onRemove(item)"
              >mdi-star
            </v-icon>
          </template>
          <span>Remove from favourite</span>
        </v-tooltip>
        <v-tooltip v-else bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-icon
              v-bind="attrs"
              v-on="on"
              color="grey"
              @click="addToFavourite(item)"
              >mdi-star-outline
            </v-icon>
          </template>
          <span>Add to favourite</span>
        </v-tooltip>
      </template>
    </v-data-table>
    <DeleteDialog :model="dialogDelete"
     :message="deleteDialogMessage"
     :submessage="getDialogSubmessage()"
     :onRemove="removeHandler"
     :onClose="closeDeleteDialog"/>
  </v-container>
</template>

<script>
import Utils from '@/utils/Utils';
import EventBus from '@/event-bus';
import DeleteDialog from '@/components/DeleteDialog.vue';

export default {
  props: ['favourite', 'items'],
  components: {
    DeleteDialog,
  },
  data: () => ({
    search: '',
    headers: [
      { text: 'Currency name', align: 'start', value: 'currency' },
      { text: 'Currenccy code', value: 'code' },
      { text: 'Average exchange rate', value: 'mid' },
      { text: 'Favourite', value: 'action', sortable: false },
    ],
    selectedCurrencies: [],
    dialogDelete: false,
    itemToRemove: {},
    tableName: 'Table Name',
    deleteDialogMessage: 'Delete Message',
    removeHandler: Function,
  }),

  beforeMount() {
    this.loadInitialData();
  },

  methods: {
    loadInitialData() {
      this.tableName = 'All currencies';
      this.deleteDialogMessage = 'Are you sure you want to delete this item?';
      this.removeHandler = this.removeFromFavourite;

      if (this.favourite) {
        this.removeActionHeader();
        this.tableName = 'Favourite currencies';
        this.deleteDialogMessage = 'Are you sure you want to delete those items?';
        this.removeHandler = this.removeFewFromFavourite;
      }
    },

    removeActionHeader() {
      this.headers = this.headers.filter((v) => v.value !== 'action');
    },

    getDialogSubmessage() {
      if (this.itemToRemove && this.itemToRemove.currency) {
        return this.itemToRemove.currency;
      }
      if (this.selectedCurrencies) {
        return this.selectedCurrencies.map((v) => v.currency);
      }
      return 'NO DATA';
    },

    closeDeleteDialog() {
      this.dialogDelete = false;
      this.itemToRemove = {};
    },
    onRemove(item) {
      this.dialogDelete = true;
      this.itemToRemove = item;
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
      return Utils.containsCurrency(this.$store.state.favouriteCurrencies, currency);
    },
  },
};
</script>
