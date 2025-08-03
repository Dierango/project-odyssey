import React, { useState, useRef } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  ScrollView,
  TextInput,
  Alert,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { FontAwesome5 } from '@expo/vector-icons';
import { colors } from '../styles/colors';

const ChangePasswordScreen = ({ navigation }: { navigation: any }) => {
  const insets = useSafeAreaInsets();
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  // Create refs for TextInputs
  const currentPasswordRef = useRef<TextInput>(null);
  const newPasswordRef = useRef<TextInput>(null);
  const confirmPasswordRef = useRef<TextInput>(null);

  const handleChangePassword = async () => {
    if (!currentPassword || !newPassword || !confirmPassword) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    if (newPassword !== confirmPassword) {
      Alert.alert('Error', 'New passwords do not match');
      return;
    }

    if (newPassword.length < 8) {
      Alert.alert('Error', 'Password must be at least 8 characters long');
      return;
    }

    setLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      Alert.alert(
        'Success', 
        'Password changed successfully!',
        [{ text: 'OK', onPress: () => navigation.goBack() }]
      );
    } catch (error) {
      Alert.alert('Error', 'Failed to change password. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const PasswordInput = React.memo(({ 
    placeholder, 
    value, 
    onChangeText, 
    showPassword, 
    onTogglePassword,
    inputRef,
    onSubmitEditing,
    returnKeyType = 'next'
  }: {
    placeholder: string;
    value: string;
    onChangeText: (text: string) => void;
    showPassword: boolean;
    onTogglePassword: () => void;
    inputRef?: React.RefObject<TextInput | null>;
    onSubmitEditing?: () => void;
    returnKeyType?: 'next' | 'done';
  }) => (
    <View style={styles.inputContainer}>
      <TextInput
        ref={inputRef}
        style={styles.input}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={!showPassword}
        placeholderTextColor="#999"
        autoCapitalize="none"
        autoCorrect={false}
        textContentType="password"
        returnKeyType={returnKeyType}
        onSubmitEditing={onSubmitEditing}
        blurOnSubmit={false}
      />
      <TouchableOpacity 
        style={styles.eyeButton} 
        onPress={onTogglePassword}
        activeOpacity={0.7}
      >
        <FontAwesome5 
          name={showPassword ? 'eye' : 'eye-slash'} 
          size={20} 
          color="#666" 
        />
      </TouchableOpacity>
    </View>
  ));

  return (
    <KeyboardAvoidingView 
      style={{ flex: 1 }} 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
    >
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
              activeOpacity={0.7}
            >
              <FontAwesome5 name="arrow-left" size={24} color="#fff" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Change Password</Text>
            <View style={styles.placeholder} />
          </View>

          <ScrollView 
            style={styles.scrollView} 
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
            contentContainerStyle={{ flexGrow: 1 }}
          >
            <View style={styles.formContainer}>
              <Text style={styles.sectionTitle}>Security Requirements</Text>
              <View style={styles.requirementsCard}>
                <Text style={styles.requirementText}>• At least 8 characters long</Text>
                <Text style={styles.requirementText}>• Mix of letters, numbers, and symbols</Text>
                <Text style={styles.requirementText}>• Avoid common words or patterns</Text>
              </View>

              <Text style={styles.sectionTitle}>Current Password</Text>
              <PasswordInput
                placeholder="Enter current password"
                value={currentPassword}
                onChangeText={setCurrentPassword}
                showPassword={showCurrentPassword}
                onTogglePassword={() => setShowCurrentPassword(!showCurrentPassword)}
                inputRef={currentPasswordRef}
                onSubmitEditing={() => newPasswordRef.current?.focus()}
              />

              <Text style={styles.sectionTitle}>New Password</Text>
              <PasswordInput
                placeholder="Enter new password"
                value={newPassword}
                onChangeText={setNewPassword}
                showPassword={showNewPassword}
                onTogglePassword={() => setShowNewPassword(!showNewPassword)}
                inputRef={newPasswordRef}
                onSubmitEditing={() => confirmPasswordRef.current?.focus()}
              />

              <Text style={styles.sectionTitle}>Confirm New Password</Text>
              <PasswordInput
                placeholder="Confirm new password"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                showPassword={showConfirmPassword}
                onTogglePassword={() => setShowConfirmPassword(!showConfirmPassword)}
                inputRef={confirmPasswordRef}
                onSubmitEditing={handleChangePassword}
                returnKeyType="done"
              />

              <TouchableOpacity 
                style={[styles.changeButton, loading && styles.disabledButton]}
                onPress={handleChangePassword}
                disabled={loading}
                activeOpacity={0.8}
              >
                <Text style={styles.changeButtonText}>
                  {loading ? 'Changing Password...' : 'Change Password'}
                </Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </LinearGradient>
      </ImageBackground>
    </KeyboardAvoidingView>
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
  placeholder: {
    width: 40,
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: 20,
  },
  formContainer: {
    flex: 1,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 12,
    marginTop: 20,
  },
  requirementsCard: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 12,
    padding: 16,
    marginBottom: 10,
  },
  requirementText: {
    color: '#fff',
    fontSize: 14,
    marginBottom: 4,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.95)',
    borderRadius: 12,
    marginBottom: 16,
  },
  input: {
    flex: 1,
    paddingVertical: 16,
    paddingHorizontal: 20,
    fontSize: 16,
    color: '#333',
  },
  eyeButton: {
    paddingHorizontal: 20,
  },
  changeButton: {
    backgroundColor: colors.primary,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 40,
  },
  disabledButton: {
    opacity: 0.6,
  },
  changeButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default ChangePasswordScreen;
