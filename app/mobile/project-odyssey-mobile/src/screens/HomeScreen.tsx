import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  ImageBackground,
  SafeAreaView,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { FontAwesome5 } from '@expo/vector-icons';
import { colors } from '../styles/colors';

const HomeScreen = ({ navigation }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const animation = useRef(new Animated.Value(0)).current;

  const toggleMenu = () => {
    const toValue = menuOpen ? 0 : 1;
    Animated.spring(animation, {
      toValue,
      friction: 5,
      useNativeDriver: true,
    }).start();
    setMenuOpen(!menuOpen);
  };

  const phishingButtonStyle = {
    transform: [
      {
        scale: animation,
      },
      {
        translateY: animation.interpolate({
          inputRange: [0, 1],
          outputRange: [0, -80],
        }),
      },
    ],
  };

  const digitalFootprintButtonStyle = {
    transform: [
      {
        scale: animation,
      },
      {
        translateY: animation.interpolate({
          inputRange: [0, 1],
          outputRange: [0, -160],
        }),
      },
    ],
  };

  const navigateToScreen = (screenName) => {
    toggleMenu(); // Close the menu
    navigation.navigate(screenName);
  };

  return (
    <ImageBackground
      source={require('../assets/home-bg.png')}
      style={styles.background}
    >
      <SafeAreaView style={styles.container}>
        <LinearGradient
          colors={['rgba(0,0,0,0.3)', 'rgba(0,0,0,0.5)']}
          style={styles.gradient}
        >
          <View style={styles.header}>
            <Text style={styles.title}>Welcome to Athena</Text>
            <Text style={styles.subtitle}>Your personal AI companion</Text>
          </View>

          <View style={styles.chatContainer}>
            {/* Chat interface will be built here */}
            <Text style={styles.chatPlaceholder}>The chat interface is coming soon!</Text>
          </View>

          <Animated.View style={[styles.menuButton, digitalFootprintButtonStyle]}>
            <TouchableOpacity
              style={styles.menuItem}
              onPress={() => navigateToScreen('Digital Footprint')}
            >
              <FontAwesome5 name="user-secret" size={24} color="#fff" />
            </TouchableOpacity>
          </Animated.View>

          <Animated.View style={[styles.menuButton, phishingButtonStyle]}>
            <TouchableOpacity
              style={styles.menuItem}
              onPress={() => navigateToScreen('Phishing Game')}
            >
              <FontAwesome5 name="fish" size={24} color="#fff" />
            </TouchableOpacity>
          </Animated.View>

          <TouchableOpacity style={styles.fab} onPress={toggleMenu}>
            <FontAwesome5 name={menuOpen ? 'times' : 'bars'} size={24} color="#fff" />
          </TouchableOpacity>
        </LinearGradient>
      </SafeAreaView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
  },
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    alignItems: 'center',
    marginBottom: 40,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 18,
    color: '#d0d0d0',
    marginTop: 10,
  },
  chatContainer: {
    flex: 1,
    width: '90%',
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  chatPlaceholder: {
    color: '#fff',
    fontSize: 16,
  },
  fab: {
    position: 'absolute',
    bottom: 30,
    right: 30,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 8,
  },
  menuButton: {
    position: 'absolute',
    bottom: 30,
    right: 30,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 10,
  },
});

export default HomeScreen;
