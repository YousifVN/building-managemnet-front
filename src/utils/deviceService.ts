import { database } from '@/utils/firebaseConfig';
import { ref as dbRef, onValue, off } from 'firebase/database';
import axiosConfig from '@/utils/axiosConfig';

let devicesRef: any;

export function setupRealTimeListener(callback: Function) {
  devicesRef = dbRef(database, '/devices');
  onValue(devicesRef, (snapshot) => {
    const data = snapshot.val();
    if (data) {
      const devices = Object.entries(data).map(([id, device]: [string, any]) => ({
        id,
        ...device
      }));
      callback(devices);
    }
  });
}

export function cleanupRealTimeListener() {
  if (devicesRef) {
    off(devicesRef);
  }
}

export async function fetchDeviceStates() {
  try {
    const response = await axiosConfig.get('/devices.json');
    if (response.data) {
      return Object.entries(response.data).map(([id, device]: [string, any]) => ({
        id,
        ...device
      }));
    }
  } catch (error) {
    console.error('Error fetching device states:', error);
    return [];
  }
}

export async function toggleDeviceState(deviceId: string, newState: boolean) {
  try {
    await axiosConfig.put(`devices/${deviceId}/state.json`, JSON.stringify(newState));
    return true;
  } catch (error) {
    console.error('Error toggling device state:', error);
    return false;
  }
}