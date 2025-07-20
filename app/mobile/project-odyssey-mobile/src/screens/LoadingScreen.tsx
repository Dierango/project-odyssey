import React, { useEffect } from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { getAccessToken } from '../services/auth';
import { colors } from '../styles/colors';

import { StackNavigationProp } from '@react-navigation/stack';

// Define the type for the navigation prop
type LoadingScreenNavigationProp = StackNavigationProp<
  Record<string, undefined>,
  'Loading'
>;

// Define the props for the LoadingScreen component
type Props = {
  navigation: LoadingScreenNavigationProp;
};

const LoadingScreen = ({ navigation }: Props) => {
  useEffect(() => {
    const checkToken = async () => {
      const accessToken = await getAccessToken();
      if (accessToken) {
        navigation.navigate('Main');
      } else {
        navigation.navigate('Auth');
      }
    };

    checkToken();
  }, []);

  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color={colors.primary} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background,
  },
});

export default LoadingScreen;
