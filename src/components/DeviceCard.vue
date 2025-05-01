<script setup lang="ts">
import { defineProps } from 'vue';

const props = defineProps({
  device: Object,
  index: Number,
  toggleDevice: Function,
  getDeviceImage: Function,
  formatDuration: Function,
  formatCost: Function
});
</script>

<template>
  <v-card class="pa-4">
    <v-img
      :src="getDeviceImage(device.name)"
      height="200"
      cover
      class="mb-4 rounded-lg"
    />
    <v-card-title class="text-h6">
      {{ device.name }}
    </v-card-title>
    <v-card-text>
      <div class="mb-2">
        <strong>Power Rating:</strong> {{ device.wattage.toLocaleString() }}W
      </div>
      <div class="mb-2">
        <strong>Total Usage:</strong> {{ formatDuration(device.usage.totalHours) }}
      </div>
      <div class="mb-2">
        <strong>Total Cost:</strong> ${{ formatCost(device.usage.totalCost) }}
      </div>
    </v-card-text>
    <v-card-actions>
      <v-btn
        :color="device.state ? 'green' : 'red'"
        variant="elevated"
        :elevation="2"
        class="px-6"
        block
        @click="toggleDevice(device.id, index)"
      >
        {{ device.state ? 'Turn Off' : 'Turn On' }}
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<style scoped>
.v-card {
  transition: transform 0.2s;
}

.v-card:hover {
  transform: translateY(-5px);
}
</style>