// Production API service for Athena web application
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

// API configuration
const apiConfig = {
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
};

// Helper function to get auth headers
const getAuthHeaders = (): Record<string, string> => {
  const token = localStorage.getItem('access_token');
  return token ? { Authorization: `Bearer ${token}` } : {};
};

// Generic API request function
const apiRequest = async (endpoint: string, options: RequestInit = {}) => {
  const url = `${API_BASE_URL}${endpoint}`;
  const config: RequestInit = {
    ...options,
    headers: {
      ...apiConfig.headers,
      ...getAuthHeaders(),
      ...options.headers,
    },
  };

  try {
    const response = await fetch(url, config);
    
    if (!response.ok) {
      if (response.status === 401) {
        // Token expired or invalid
        localStorage.removeItem('access_token');
        localStorage.removeItem('user_data');
        window.location.href = '/login';
        throw new Error('Authentication required');
      }
      
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.detail || `HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('API request failed:', error);
    throw error;
  }
};

// Authentication API
export const loginUser = async (email: string, password: string) => {
  return apiRequest('/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  });
};

export const registerUser = async (email: string, password: string) => {
  return apiRequest('/auth/register', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  });
};

// Chat API
export const getChatHistory = async () => {
  return apiRequest('/api/v1/chat/history');
};

export const sendChatMessage = async (content: string) => {
  return apiRequest('/api/v1/chat', {
    method: 'POST',
    body: JSON.stringify({ role: 'user', content }),
  });
};

// User API
export const getCurrentUser = async () => {
  return apiRequest('/auth/me');
};

export const updateUserProfile = async (userData: any) => {
  return apiRequest('/auth/profile', {
    method: 'PUT',
    body: JSON.stringify(userData),
  });
};

export const changePassword = async (currentPassword: string, newPassword: string) => {
  return apiRequest('/auth/change-password', {
    method: 'POST',
    body: JSON.stringify({ 
      current_password: currentPassword, 
      new_password: newPassword 
    }),
  });
};

// Health check API
export const healthCheck = async () => {
  return apiRequest('/health');
};

// Digital footprint analysis (placeholder for future implementation)
export const analyzeDigitalFootprint = async (email: string) => {
  // This would connect to your backend analysis service
  throw new Error('Digital footprint analysis not yet implemented in backend');
};

// Phishing game API (placeholder for future implementation) 
export const getPhishingScenarios = async () => {
  // This would connect to your backend phishing game service
  throw new Error('Phishing game not yet implemented in backend');
};

export const submitPhishingAnswer = async (scenarioId: string, answer: boolean) => {
  // This would connect to your backend phishing game service
  throw new Error('Phishing game not yet implemented in backend');
};
