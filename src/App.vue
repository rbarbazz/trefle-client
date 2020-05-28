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
              <v-container>
                <v-row justify="space-between">
                  <v-col cols="6">
                    <v-card-title class="text-left">
                      {{ result.scientific_name }}
                    </v-card-title>
                    <v-card-subtitle
                      v-if="result.common_name"
                      class="text-left text-capitalize"
                    >
                      {{ result.common_name }}
                    </v-card-subtitle>
                    <v-card-text
                      v-if="result.family_common_name"
                      class="text-left"
                    >
                      {{ result.family_common_name }}
                    </v-card-text>
                  </v-col>
                  <v-col cols="6">
                    <v-img :src="result.thumbnailURL"></v-img>
                  </v-col>
                </v-row>
              </v-container>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-content>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue';

import { fetchWikipediaThumbnail } from './fetchWikipediaThumbnail';
import TreeLogo from './components/TreeLogo.vue';

interface PlantResult {
  common_name: string;
  family_common_name: string;
  scientific_name: string;
  [key: string]: string;
}

const App = Vue.extend({
  components: { TreeLogo },
  data: () => ({
    isLoading: false,
    searchInput: '',
    results: [] as PlantResult[],
  }),
  methods: {
    async onClick() {
      this.isLoading = true;
      const response = await fetch(
        `/.netlify/functions/fetchTrefle?q=${this.searchInput}`,
      );

      const data: PlantResult[] = await response.json();
      const results = await Promise.all(
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        data.map(
          async (plant: PlantResult): Promise<PlantResult> => {
            const thumbnailURL = await fetchWikipediaThumbnail(
              `${plant.scientific_name
                .split(' ')
                .slice(0, 2)
                .join(' ')}`,
            );

            return { ...plant, thumbnailURL };
          },
        ),
      );

      this.isLoading = false;
      this.results = results;
    },
    onChange(value: string) {
      this.searchInput = value;
    },
  },
});

export default App;
</script>
