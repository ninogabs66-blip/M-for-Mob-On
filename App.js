import React, { useState } from 'react';
import { SafeAreaView, StatusBar, StyleSheet } from 'react-native';
import LoginScreen from './screens/login';
import RegisterScreen from './screens/register';
import DriverLoginScreen from './screens/driverLogin';
import DriverRegisterScreen from './screens/driverRegister';
import EmailOtpScreen from './screens/emailOtp';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState('login');
  const [otpEmail, setOtpEmail] = useState('');

  const openOtp = (email) => {
    setOtpEmail(email);
    setCurrentScreen('email-otp');
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />

      {currentScreen === 'login' && (
        <LoginScreen
          onNavigateToRegister={() => setCurrentScreen('register')}
          onNavigateToDriverRegister={() => setCurrentScreen('driver-register')}
          onNavigateToDriverLogin={() => setCurrentScreen('driver-login')}
          onNavigateToOtp={openOtp}
        />
      )}

      {currentScreen === 'email-otp' && (
        <EmailOtpScreen
          email={otpEmail}
          onBack={() => setCurrentScreen('login')}
          onVerified={() => setCurrentScreen('login')}
        />
      )}

      {currentScreen === 'register' && (
        <RegisterScreen
          onNavigateToLogin={() => setCurrentScreen('login')}
          onNavigateToDriverRegister={() => setCurrentScreen('driver-register')}
        />
      )}

      {currentScreen === 'driver-login' && (
        <DriverLoginScreen
          onNavigateToDriverRegister={() => setCurrentScreen('driver-register')}
          onNavigateToPassengerLogin={() => setCurrentScreen('login')}
        />
      )}

      {currentScreen === 'driver-register' && (
        <DriverRegisterScreen
          onNavigateToLogin={() => setCurrentScreen('driver-login')}
          onNavigateToPassengerRegister={() => setCurrentScreen('register')}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
});
