<template>
  <v-app style="background-color: #64B5F6;">
    <v-toolbar style="max-height: 64px" color="blue lighten-5">
      <v-toolbar-title>Currency tracker</v-toolbar-title>
      <v-spacer />
      <v-btn to="/" class="mr-6">Home</v-btn>
      <v-btn to="/Favourite" class="mr-3">Favourite</v-btn>
    </v-toolbar>
    <router-view />
    <v-snackbar v-model="snackbar" :color="type.color" timeout="1000">
      <v-icon>{{type.button}}</v-icon>
      {{message}}
    </v-snackbar>
  </v-app>
</template>
<script>

import EventBus from '@/event-bus';

export default {
  data: () => ({
    snackbar: false,
    type: { },
    message: '',
  }),

  mounted() {
    EventBus.$on('showError', this.showError);
    EventBus.$on('showSuccess', this.showSucces);
  },

  methods: {

    showError() {
      this.snackbar = true;
      this.type = { color: 'error', button: 'mdi-error' };
      this.message = 'Error on loading currencies, please try again later';
    },

    showSucces() {
      this.snackbar = true;
      this.type = { color: 'success', button: 'mdi-check-circle-outline' };
      this.message = 'Item added to favourite list';
    },
  },
};
</script>
<style lang="scss">
</style>
