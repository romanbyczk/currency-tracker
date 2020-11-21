<template>
  <v-app>
    <v-toolbar style="max-height: 64px">
      <v-toolbar-title>Currencies</v-toolbar-title>
      <v-spacer />
      <v-btn to="/" class="mr-6">Home</v-btn>
      <v-btn to="/Favourite" class="mr-3">Favourite</v-btn>
    </v-toolbar>
    <router-view />
  </v-app>
</template>

<style lang="scss">
</style>
