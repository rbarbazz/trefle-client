<template>
  <v-app id="app">
    <v-content>
      <v-container fluid>
        <v-row>
          <v-col
            align="center"
            class="ml-auto"
            cols="12"
            justify="start"
            style="max-width: 300px; margin: auto;"
          >
            <TreeLogo style="margin-bottom: 20px;" />
            <v-text-field
              @input="onChange"
              append-icon="mdi-magnify"
              color="#41b913"
              label="Solo"
              placeholder="Search for a plant..."
              solo
            >
            </v-text-field>
            <v-btn @click="onClick" color="#41b913" style="color: white;"
              >Search</v-btn
            >
          </v-col>
        </v-row>
      </v-container>
    </v-content>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue';

import TreeLogo from './components/TreeLogo.vue';

const App = Vue.extend({
  components: { TreeLogo },
  data: () => ({ searchInput: '' }),
  methods: {
    onClick() {
      console.log(this.searchInput);
    },
    onChange(value: string) {
      this.searchInput = value;
    },
  },
});

export default App;
</script>
