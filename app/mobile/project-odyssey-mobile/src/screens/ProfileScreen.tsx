import React, { useState } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  ScrollView,
  Image,
  Alert,
  StatusBar,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { FontAwesome5, MaterialIcons, Ionicons } from '@expo/vector-icons';
import { logout } from '../services/auth';
import { colors } from '../styles/colors';
import { useUser } from '../contexts/UserContext';

const { width } = Dimensions.get('window');

const ProfileScreen = ({ navigation }: { navigation: any }) => {
  const insets = useSafeAreaInsets();
  const { user, updateUser } = useUser();
  
  // Fallback user data if context is not available
  const currentUser = user || {
    name: 'John Doe',
    email: 'john.doe@example.com',
    avatar: null,
    memberSince: '2024',
    securityScore: 85,
  };

  const handleLogout = async () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Logout',
          style: 'destructive',
          onPress: async () => {
            await logout();
            navigation.navigate('Auth');
          },
        },
      ]
    );
  };

  const handleEditProfile = () => {
    Alert.alert(
      'Edit Profile',
      'Choose what you want to edit:',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Change Name', onPress: () => handleChangeName() },
        { text: 'Change Email', onPress: () => handleChangeEmail() },
      ]
    );
  };

  const handleChangeName = () => {
    Alert.prompt(
      'Change Name',
      'Enter your new name:',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Save', 
          onPress: (newName) => {
            if (newName && newName.trim()) {
              updateUser({ name: newName.trim() });
              Alert.alert('Success', 'Name updated successfully!');
            }
          }
        },
      ],
      'plain-text',
      currentUser.name
    );
  };

  const handleChangeEmail = () => {
    Alert.prompt(
      'Change Email',
      'Enter your new email address:',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Save', 
          onPress: (newEmail) => {
            if (newEmail && newEmail.includes('@')) {
              // In a real app, this would require email verification
              Alert.alert('Verification Required', 'A verification email will be sent to your new address.');
            } else {
              Alert.alert('Error', 'Please enter a valid email address.');
            }
          }
        },
      ],
      'plain-text',
      currentUser.email
    );
  };

  const handleChangeAvatar = () => {
    Alert.alert(
      'Change Avatar',
      'Choose an option:',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Take Photo', onPress: () => Alert.alert('Camera', 'Camera functionality would be implemented here') },
        { text: 'Choose from Gallery', onPress: () => Alert.alert('Gallery', 'Gallery functionality would be implemented here') },
        { text: 'Remove Avatar', style: 'destructive', onPress: () => Alert.alert('Success', 'Avatar removed successfully!') },
      ]
    );
  };

  const MenuSection = ({ title, children }: { title: string; children: React.ReactNode }) => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{title}</Text>
      <View style={styles.sectionContent}>
        {children}
      </View>
    </View>
  );

  const MenuItem = ({ 
    icon, 
    iconType = 'FontAwesome5', 
    title, 
    subtitle, 
    onPress, 
    showArrow = true,
    danger = false 
  }: {
    icon: string;
    iconType?: 'FontAwesome5' | 'MaterialIcons' | 'Ionicons';
    title: string;
    subtitle?: string;
    onPress: () => void;
    showArrow?: boolean;
    danger?: boolean;
  }) => {
    const IconComponent = iconType === 'MaterialIcons' ? MaterialIcons : 
                         iconType === 'Ionicons' ? Ionicons : FontAwesome5;
    
    return (
      <TouchableOpacity style={styles.menuItem} onPress={onPress}>
        <View style={styles.menuItemLeft}>
          <View style={[styles.iconContainer, danger && styles.dangerIconContainer]}>
            <IconComponent 
              name={icon as any} 
              size={20} 
              color={danger ? '#ff4757' : colors.primary} 
            />
          </View>
          <View style={styles.menuItemContent}>
            <Text style={[styles.menuItemTitle, danger && styles.dangerText]}>{title}</Text>
            {subtitle && <Text style={styles.menuItemSubtitle}>{subtitle}</Text>}
          </View>
        </View>
        {showArrow && (
          <FontAwesome5 name="chevron-right" size={16} color="#666" />
        )}
      </TouchableOpacity>
    );
  };

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
      <ImageBackground
        source={require('../assets/home-bg.png')}
        style={styles.background}
      >
        <LinearGradient
          colors={['rgba(0,0,0,0.4)', 'rgba(0,0,0,0.7)']}
          style={[styles.gradient, { paddingBottom: insets.bottom }]}
        >
          {/* Header */}
          <View style={[styles.header, { paddingTop: insets.top + 20 }]}>
            <TouchableOpacity 
              style={styles.backButton} 
              onPress={() => navigation.goBack()}
            >
              <FontAwesome5 name="arrow-left" size={24} color="#fff" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Profile</Text>
            <TouchableOpacity style={styles.editButton} onPress={handleEditProfile}>
              <FontAwesome5 name="edit" size={20} color="#fff" />
            </TouchableOpacity>
          </View>

          <ScrollView 
            style={styles.scrollView}
            showsVerticalScrollIndicator={false}
          >
            {/* User Info Card */}
            <View style={styles.userInfoCard}>
              <TouchableOpacity style={styles.avatarContainer} onPress={handleChangeAvatar}>
                <View style={styles.avatar}>
                  {currentUser.avatar ? (
                    <Image source={{ uri: currentUser.avatar }} style={styles.avatarImage} />
                  ) : (
                    <FontAwesome5 name="user" size={40} color="#666" />
                  )}
                  <View style={styles.avatarEditButton}>
                    <FontAwesome5 name="camera" size={12} color="#fff" />
                  </View>
                </View>
              </TouchableOpacity>
              
              <View style={styles.userInfo}>
                <Text style={styles.userName}>{currentUser.name}</Text>
                <Text style={styles.userEmail}>{currentUser.email}</Text>
                <Text style={styles.memberSince}>Member since {currentUser.memberSince}</Text>
              </View>

              <View style={styles.securityScore}>
                <View style={styles.scoreCircle}>
                  <Text style={styles.scoreText}>{currentUser.securityScore}</Text>
                  <Text style={styles.scoreLabel}>Security Score</Text>
                </View>
              </View>
            </View>

            {/* Security Features */}
            <MenuSection title="Security">
              <MenuItem
                icon="user-secret"
                title="Digital Footprint Analysis"
                subtitle="Check your online presence"
                onPress={() => navigation.navigate('Digital Footprint')}
              />
              <MenuItem
                icon="shield-alt"
                title="Security Score"
                subtitle={`Current score: ${currentUser.securityScore}/100`}
                onPress={() => navigation.navigate('Digital Footprint')}
              />
            </MenuSection>

            {/* Account Settings */}
            <MenuSection title="Account">
              <MenuItem
                icon="user-edit"
                title="Edit Profile"
                subtitle="Update your information"
                onPress={handleEditProfile}
              />
              <MenuItem
                icon="key"
                title="Change Password"
                subtitle="Update your password"
                onPress={() => navigation.navigate('ChangePassword')}
              />
            </MenuSection>

            {/* Support & Info */}
            <MenuSection title="Support">
              <MenuItem
                icon="question-circle"
                title="Help & Support"
                subtitle="Get assistance"
                onPress={() => navigation.navigate('Help')}
              />
              <MenuItem
                icon="info-circle"
                title="About Athena"
                subtitle="Version 1.0.0"
                onPress={() => navigation.navigate('About')}
              />
            </MenuSection>

            {/* Logout Button */}
            <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
              <FontAwesome5 name="sign-out-alt" size={20} color="#fff" />
              <Text style={styles.logoutText}>Sign Out</Text>
            </TouchableOpacity>

            <View style={styles.bottomPadding} />
          </ScrollView>
        </LinearGradient>
      </ImageBackground>
    </>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
  },
  gradient: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  editButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: 20,
  },
  userInfoCard: {
    backgroundColor: 'rgba(255,255,255,0.95)',
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarContainer: {
    marginRight: 15,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#f0f0f0',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  avatarImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  avatarEditButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#fff',
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 16,
    color: '#666',
    marginBottom: 4,
  },
  memberSince: {
    fontSize: 14,
    color: '#999',
  },
  securityScore: {
    alignItems: 'center',
  },
  scoreCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scoreText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  scoreLabel: {
    fontSize: 10,
    color: '#fff',
    marginTop: 2,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 12,
    paddingHorizontal: 4,
  },
  sectionContent: {
    backgroundColor: 'rgba(255,255,255,0.95)',
    borderRadius: 16,
    overflow: 'hidden',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: `${colors.primary}15`,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 15,
  },
  dangerIconContainer: {
    backgroundColor: '#ff475715',
  },
  menuItemContent: {
    flex: 1,
  },
  menuItemTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
    marginBottom: 2,
  },
  menuItemSubtitle: {
    fontSize: 14,
    color: '#666',
  },
  dangerText: {
    color: '#ff4757',
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primary,
    paddingVertical: 16,
    paddingHorizontal: 40,
    borderRadius: 16,
    marginTop: 20,
    marginBottom: 10,
  },
  logoutText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  bottomPadding: {
    height: 20,
  },
});

export default ProfileScreen;