import Constants from 'expo-constants';
import { Platform } from 'react-native';

// Dynamically determine the backend IP address
function getBaseUrl() {
  // If running in development on Expo Go or physical device
  const hostUri = Constants.expoConfig?.hostUri;
  if (hostUri) {
    const host = hostUri.split(':')[0];
    return `http://${host}:5000/api`;
  }

  // Fallbacks for web or simulator
  if (Platform.OS === 'android') {
    return 'http://10.0.2.2:5000/api'; // Android Emulator alias
  }

  return 'http://localhost:5000/api';
}

const BASE_URL = getBaseUrl();
console.log(`[API Service] Base API URL set to: ${BASE_URL}`);

// Generic fetch wrapper with timeout
async function request(endpoint, options = {}) {
  const url = `${BASE_URL}${endpoint}`;

  const config = {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  };

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000); // 10s timeout
    config.signal = controller.signal;

    const response = await fetch(url, config);
    clearTimeout(timeoutId);

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || data.message || `Request failed with status ${response.status}`);
    }

    return data;
  } catch (error) {
    if (error.name === 'AbortError') {
      throw new Error(`Connection timed out. Ensure backend server is running at ${BASE_URL}`);
    }
    throw error;
  }
}

export const api = {
  // Health check
  checkHealth() {
    return request('/health');
  },

  // Passenger registration
  registerUser(name, email, password) {
    return request('/auth/register', {
      method: 'POST',
      body: JSON.stringify({ name, email, password }),
    });
  },

  // Passenger login
  loginUser(email, password) {
    return request('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
  },

  // Driver registration
  driverRegister(driverData) {
    return request('/auth/driver-register', {
      method: 'POST',
      body: JSON.stringify(driverData),
    });
  },

  // Driver login
  driverLogin(emailOrPhone, password) {
    return request('/auth/driver-login', {
      method: 'POST',
      body: JSON.stringify({ emailOrPhone, password }),
    });
  },

  // Google sign-in (passenger or driver)
  googleLogin(googleProfile, role = 'passenger') {
    return request('/auth/google', {
      method: 'POST',
      body: JSON.stringify({
        googleId: googleProfile.id || googleProfile.sub,
        email: googleProfile.email,
        name: googleProfile.name,
        avatar: googleProfile.picture || googleProfile.avatar,
        role,
      }),
    });
  },
};

export default api;
