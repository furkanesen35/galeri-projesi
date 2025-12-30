import axios from 'axios';

export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api',
  timeout: 10000,
});

// Example placeholder fetchers that can be wired to real endpoints later.
export const fetchVehicles = async () => {
  const { data } = await apiClient.get('/vehicles');
  return data;
};

export const fetchTasks = async () => {
  const { data } = await apiClient.get('/tasks');
  return data;
};
