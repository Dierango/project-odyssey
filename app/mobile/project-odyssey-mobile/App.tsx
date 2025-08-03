import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import AppNavigator from './src/navigation/AppNavigator';
import { UserProvider } from './src/contexts/UserContext';

export default function App() {
  return (
    <SafeAreaProvider>
      <UserProvider>
        <AppNavigator />
        <StatusBar style="light" />
      </UserProvider>
    </SafeAreaProvider>
  );
}
