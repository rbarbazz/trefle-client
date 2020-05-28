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
            style="margin: auto;"
          >
            <TreeLogo style="margin-bottom: 20px;" />
            <v-form @submit.prevent="onClick">
              <v-text-field
                @input="onChange"
                append-icon="mdi-magnify"
                color="#41b913"
                label="Solo"
                placeholder="Search for a plant..."
                solo
                style="max-width: 300px;"
              >
              </v-text-field>
              <v-btn
                type="submit"
                color="#41b913"
                style="color: white;"
                :loading="isLoading"
                >Search</v-btn
              >
            </v-form>
            <v-card
              :key="result.scientific_name"
              max-width="500"
              style="margin: 1rem 0;"
              v-for="result in results"
            >
              <v-card-title>
                {{ result.scientific_name }}
              </v-card-title>
              <v-card-subtitle
                v-if="result.common_name"
                class="text-left text-capitalize"
              >
                {{ result.common_name }}
              </v-card-subtitle>
              <v-card-text v-if="result.family_common_name" class="text-left">
                {{ result.family_common_name }}
              </v-card-text>
            </v-card>
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
  data: () => ({ isLoading: false, searchInput: '', results: null }),
  methods: {
    async onClick() {
      this.isLoading = true;
      const response = await fetch(
        `/.netlify/functions/fetchTrefle?q=${this.searchInput}`,
      );

      const data = await response.json();

      this.isLoading = false;
      this.results = data;
    },
    onChange(value: string) {
      this.searchInput = value;
    },
  },
});

export default App;
</script>
