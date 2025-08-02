import api from './api';
import * as SecureStore from 'expo-secure-store';

export const register = async (email: string, password: string) => {
  try {
    const response = await api.post('/auth/register', { email, password });
    return response.data;
  } catch (error: any) {
    throw error.response.data;
  }
};

export const login = async (email: string, password: string) => {
  try {
    const response = await api.post('/auth/login', { email, password });
    const { access_token } = response.data;
    await SecureStore.setItemAsync('access_token', access_token);
    return response.data;
  } catch (error: any) {
    throw error.response.data;
  }
};

export const logout = async () => {
  await SecureStore.deleteItemAsync('access_token');
};

export const getAccessToken = async () => {
  return await SecureStore.getItemAsync('access_token');
};
