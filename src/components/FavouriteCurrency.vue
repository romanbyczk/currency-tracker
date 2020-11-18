<template>
  <v-container>
    <v-row>
      <v-col cols="6">
        <v-card
          v-for="i in $store.state.favoriteCurrencies"
          v-bind:key="i.code"
        >
          <v-card-title class="d-flex justify-space-between">{{ i.currency }}
            <v-btn icon>
              <v-icon color="red" v-on:click="removeCurrency(i)">mdi-delete</v-icon>
            </v-btn>
          </v-card-title>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import NBPService from '@/services/NBPService';

export default {
  methods: {
    removeCurrency(currency) {
      this.$store.commit('removeFavoriteCurrency', currency);
    },
    getCurrencies() {
      NBPService.getCurrencies().then((res) => {
        this.items = res[0].rates;
      });
    },
  },
};
</script>

<style scoped lang="scss">
</style>
