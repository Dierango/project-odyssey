import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import DigitalFootprintScreen from '../screens/DigitalFootprintScreen';
import PhishingGameScreen from '../screens/PhishingGameScreen';
import ProfileScreen from '../screens/ProfileScreen';
import { colors } from '../styles/colors';
import { FontAwesome5 } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

const MainTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = 'home';
          } else if (route.name === 'Digital Footprint') {
            iconName = 'user-secret';
          } else if (route.name === 'Phishing Game') {
            iconName = 'fish';
          } else if (route.name === 'Profile') {
            iconName = 'user-circle';
          }

          return <FontAwesome5 name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.secondary,
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: colors.background,
          borderTopWidth: 0,
        },
        headerShown: false,
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Digital Footprint" component={DigitalFootprintScreen} />
      <Tab.Screen name="Phishing Game" component={PhishingGameScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
};

export default MainTabNavigator;
