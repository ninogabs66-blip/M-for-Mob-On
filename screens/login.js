import { useRef, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Animated,
  ImageBackground,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { sendEmailOtp, signInWithGoogle } from '../lib/auth';

export default function LoginScreen({
  onNavigateToRegister,
  onNavigateToDriverRegister,
  onNavigateToDriverLogin,
  onNavigateToOtp,
}) {
  const scale = useRef(new Animated.Value(1)).current;
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  const handleEmailOtp = async () => {
    if (!email.trim()) {
      Alert.alert('Email required', 'Enter your Gmail address first.');
      return;
    }

    setLoading(true);
    try {
      const normalizedEmail = await sendEmailOtp(email);
      Alert.alert('OTP sent', `Check ${normalizedEmail} for your 6-digit verification code.`);
      onNavigateToOtp?.(normalizedEmail);
    } catch (error) {
      Alert.alert('Could not send OTP', error.message || 'Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setGoogleLoading(true);
    try {
      await signInWithGoogle();
      Alert.alert('Welcome!', 'You are now signed in with Google.');
    } catch (error) {
      if (!String(error.message).toLowerCase().includes('cancelled')) {
        Alert.alert('Google login failed', error.message || 'Please try again.');
      }
    } finally {
      setGoogleLoading(false);
    }
  };

  const handleSubmit = () => {
    Animated.sequence([
      Animated.timing(scale, { toValue: 0.85, duration: 100, useNativeDriver: true }),
      Animated.timing(scale, { toValue: 1, duration: 100, useNativeDriver: true }),
    ]).start(handleEmailOtp);
  };

  return (
    <ImageBackground source={require('./angkas ya.jpg')} resizeMode="cover" style={styles.image}>
      <View style={styles.container}>
        <View style={styles.form}>
          <Text style={styles.title}>Passenger Login</Text>

          <Text style={styles.label}>Gmail</Text>
          <TextInput
            style={styles.input}
            placeholder="you@gmail.com"
            placeholderTextColor="#ccc"
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
            onChangeText={setEmail}
            value={email}
          />

          <Animated.View style={{ transform: [{ scale }] }}>
            <TouchableOpacity
              style={[styles.submitBtn, loading && styles.disabled]}
              onPress={handleSubmit}
              activeOpacity={0.8}
              disabled={loading || googleLoading}
            >
              {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.fontColor}>Send Gmail OTP</Text>}
            </TouchableOpacity>
          </Animated.View>

          <View style={styles.dividerRow}>
            <View style={styles.divider} />
            <Text style={styles.orText}>OR</Text>
            <View style={styles.divider} />
          </View>

          <TouchableOpacity
            style={[styles.googleBtn, googleLoading && styles.disabled]}
            onPress={handleGoogleLogin}
            disabled={loading || googleLoading}
          >
            {googleLoading ? (
              <ActivityIndicator color="#111" />
            ) : (
              <Text style={styles.googleText}>G  Continue with Google</Text>
            )}
          </TouchableOpacity>

          {onNavigateToRegister && (
            <TouchableOpacity style={styles.switchBtn} onPress={onNavigateToRegister}>
              <Text style={styles.switchText}>
                Don't have an account? <Text style={styles.linkText}>Register as Passenger</Text>
              </Text>
            </TouchableOpacity>
          )}

          {onNavigateToDriverLogin && (
            <TouchableOpacity style={styles.driverBtn} onPress={onNavigateToDriverLogin}>
              <Text style={styles.driverBtnText}>🏍️ Log in as Driver</Text>
            </TouchableOpacity>
          )}

          {onNavigateToDriverRegister && (
            <TouchableOpacity style={styles.switchBtn} onPress={onNavigateToDriverRegister}>
              <Text style={styles.switchText}>
                Want to earn with us? <Text style={styles.linkText}>Register as Driver</Text>
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  image: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  form: {
    backgroundColor: 'rgba(128, 128, 128, 0.92)',
    padding: 20,
    borderRadius: 10,
    gap: 10,
    width: 320,
  },
  title: { color: '#fff', fontSize: 22, fontWeight: 'bold', textAlign: 'center', marginBottom: 5 },
  label: { color: '#fff', fontWeight: 'bold' },
  input: { borderWidth: 1, borderColor: '#fff', padding: 10, borderRadius: 5, color: '#fff' },
  submitBtn: { backgroundColor: 'blue', padding: 12, borderRadius: 5, marginTop: 10, alignItems: 'center' },
  disabled: { opacity: 0.65 },
  fontColor: { color: '#fff', textAlign: 'center', fontWeight: 'bold' },
  dividerRow: { flexDirection: 'row', alignItems: 'center', marginVertical: 5 },
  divider: { flex: 1, height: 1, backgroundColor: '#ddd' },
  orText: { color: '#fff', marginHorizontal: 10, fontSize: 12, fontWeight: 'bold' },
  googleBtn: { backgroundColor: '#fff', padding: 12, borderRadius: 5, alignItems: 'center' },
  googleText: { color: '#111', fontWeight: 'bold' },
  switchBtn: { marginTop: 8, alignItems: 'center' },
  switchText: { color: '#fff', fontSize: 13, textAlign: 'center' },
  linkText: { color: '#38bdf8', fontWeight: 'bold', textDecorationLine: 'underline' },
  driverBtn: { marginTop: 8, backgroundColor: '#0284c7', padding: 10, borderRadius: 5, alignItems: 'center' },
  driverBtnText: { color: '#fff', fontWeight: 'bold', fontSize: 13 },
});
