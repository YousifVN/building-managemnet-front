<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import { setupRealTimeListener, cleanupRealTimeListener, fetchDeviceStates, toggleDeviceState } from '@/utils/deviceService';
import { authenticate } from '@/utils/authService';
import DeviceCard from '@/components/DeviceCard.vue';
import ActionButtons from '@/components/ActionButtons.vue';

interface DeviceUsage {
  totalHours: number;
  totalCost: number;
  lastOn: number | null;
  lastOff: number | null;
}

interface Device {
  name: string;
  id: string;
  state: boolean;
  wattage: number;
  pricePerKwh: number;
  usage: DeviceUsage;
}

const devices = ref<Device[]>([]);

async function initializeAuth() {
  try {
    await authenticate();
  } catch (error) {
    console.error('Error during authentication:', error);
  }
}

async function toggleDevice(deviceId: string, index: number) {
  try {
    const newState = !devices.value[index].state;
    const success = await toggleDeviceState(deviceId, newState);
    if (success) {
      devices.value[index].state = newState;
    }
  } catch (error) {
    console.error('Error toggling device:', error);
  }
}

async function toggleAllDevices() {
  try {
    const newState = !devices.value.every((device) => device.state);
    for (const device of devices.value) {
      const success = await toggleDeviceState(device.id, newState);
      if (success) {
        device.state = newState;
      }
    }
  } catch (error) {
    console.error('Error toggling all devices:', error);
  }
}

async function toggleAirconAndCurtain() {
  try {
    const aircon = devices.value.find(device => device.name === 'Air Conditioner');
    const curtain = devices.value.find(device => device.name === 'Smart Curtain');
    const newState = !(aircon?.state && curtain?.state);

    if (aircon) {
      const success = await toggleDeviceState(aircon.id, newState);
      if (success) {
        aircon.state = newState;
      }
    }

    if (curtain) {
      const success = await toggleDeviceState(curtain.id, newState);
      if (success) {
        curtain.state = newState;
      }
    }
  } catch (error) {
    console.error('Error toggling Air Conditioner and Smart Curtain:', error);
  }
}

function getDeviceImage(deviceName: string): string {
  switch (deviceName) {
    case 'Air Conditioner':
      return '/ac.jpg';
    case 'Refrigerator':
      return '/Refrigerator.jpeg';
    case 'Smart Curtain':
      return '/Smart Curtain.jpg';
    default:
      return '';
  }
}

function formatDuration(hours: number): string {
  const h = Math.floor(hours);
  const m = Math.floor((hours - h) * 60);
  return `${h}h ${m}m`;
}

function formatCost(cost: number): string {
  return cost.toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });
}

onMounted(async () => {
  await initializeAuth();
  setupRealTimeListener((updatedDevices: Device[]) => {
    devices.value = updatedDevices;
  });
  const fetchedDevices = await fetchDeviceStates();
  devices.value = fetchedDevices;
});

onUnmounted(() => {
  cleanupRealTimeListener();
});
</script>

<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <h1 class="text-center text-2xl font-bold my-4">
          Building Management Dashboard
        </h1>
      </v-col>
    </v-row>

    <ActionButtons
      :toggle-all-devices="toggleAllDevices"
      :toggle-aircon-and-curtain="toggleAirconAndCurtain"
    />

    <v-row>
      <v-col
        v-for="(device, index) in devices"
        :key="device.id"
        cols="12"
        md="4"
      >
        <DeviceCard
          :device="device"
          :index="index"
          :toggle-device="toggleDevice"
          :get-device-image="getDeviceImage"
          :format-duration="formatDuration"
          :format-cost="formatCost"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>
.text-center {
  text-align: center;
}
</style>