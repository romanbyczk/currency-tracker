<template>
  <v-card class="mx-auto" width="256" tile>
    <v-navigation-drawer permanent>
      <v-system-bar>Lista walut</v-system-bar>
      <v-list nav dense>
          <v-list-item v-for="(item, i) in items" :key="i">
            <v-list-item-action>
              <v-btn icon>
                <v-icon color="blue" v-on:click="addCurrency(item)">mdi-plus</v-icon>
              </v-btn>
            </v-list-item-action>

            <v-list-item-content>
              <v-list-item-title v-text="item.currency"></v-list-item-title>
            </v-list-item-content>
          </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </v-card>
</template>

<script>
import NBPService from '@/services/NBPService';

export default {
  data: () => ({
    items: [],
  }),
  mounted() {
    this.getTable();
  },
  methods: {
    addCurrency(currency) {
      this.$store.commit('addFavoriteCurrency', currency);
    },
    getTable() {
      NBPService.getCurrencies().then((res) => {
        this.items = res[0].rates;
      });
    },
  },
};
</script>

<style scoped lang="scss">
</style>
