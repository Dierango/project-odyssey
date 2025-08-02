import axios from 'axios';
import * as SecureStore from 'expo-secure-store';

const API_URL = 'http://192.168.1.8:8000'; // For testing on an Android emulator, use 'http://10.0.2.2:8000'

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(async (config) => {
  const token = await SecureStore.getItemAsync('access_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const getChatHistory = async () => {
  const response = await api.get('/api/v1/chat/history');
  return response.data;
};

export const sendChatMessage = async (content: string) => {
  const response = await api.post('/api/v1/chat', { role: 'user', content });
  return response.data;
};

export default api;
