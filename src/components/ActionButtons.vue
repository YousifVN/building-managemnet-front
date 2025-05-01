<script setup lang="ts">
import { defineProps } from 'vue';

const props = defineProps({
  toggleAllDevices: Function,
  toggleAirconAndCurtain: Function
});
</script>

<template>
  <v-row class="d-flex justify-center">
    <v-col
      cols="12"
      class="d-flex flex-column flex-md-row justify-center align-center"
    >
      <v-btn
        color="blue"
        variant="elevated"
        :elevation="2"
        class="mt-4"
        @click="toggleAllDevices"
      >
        Toggle All Devices
      </v-btn>
      <v-btn
        color="purple"
        variant="elevated"
        :elevation="2"
        class="mt-4 ms-md-2"
        @click="toggleAirconAndCurtain"
      >
        Toggle AC and Curtain
      </v-btn>
    </v-col>
  </v-row>
</template>

