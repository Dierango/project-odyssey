import axios from 'axios';

const API_URL = 'http://192.168.1.8:8000'; // For testing on an Android emulator, use 'http://10.0.2.2:8000'

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
