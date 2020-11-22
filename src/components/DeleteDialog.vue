<template>
    <v-dialog v-model="model" max-width="600px">
      <v-card>
        <v-card-title class="headline"> {{ message }}</v-card-title>
        <v-card-subtitle> {{ submessage }}</v-card-subtitle>
        <v-card-actions>
          <v-spacer/>
          <v-btn color="blue darken-1" text @click="onRemove">OK</v-btn>
          <v-btn color="blue darken-1" text @click="onClose">Cancel</v-btn>
          <v-spacer/>
        </v-card-actions>
      </v-card>
    </v-dialog>
</template>

<script>
export default {
  props: ['model', 'message', 'submessage', 'onRemove', 'onClose'],
};
</script>
