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
import { signInWithEmail } from '../lib/auth';

export default function LoginScreen({
  onNavigateToRegister,
  onNavigateToDriverRegister,
  onNavigateToDriverLogin,
  onNavigateToForgotPassword,
}) {
  const scale = useRef(new Animated.Value(1)).current;
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email.trim() || !password) {
      Alert.alert('Missing fields', 'Enter your email and password.');
      return;
    }

    setLoading(true);
    try {
      await signInWithEmail(email, password);
      Alert.alert('Welcome!', 'You are now signed in.');
    } catch (error) {
      Alert.alert('Login failed', error.message || 'Please check your email and password.');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = () => {
    Animated.sequence([
      Animated.timing(scale, { toValue: 0.85, duration: 100, useNativeDriver: true }),
      Animated.timing(scale, { toValue: 1, duration: 100, useNativeDriver: true }),
    ]).start(handleLogin);
  };

  return (
    <ImageBackground source={require('./angkas ya.jpg')} resizeMode="cover" style={styles.image}>
      <View style={styles.container}>
        <View style={styles.form}>
          <Text style={styles.title}>Passenger Login</Text>

          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            placeholder="you@example.com"
            placeholderTextColor="#ccc"
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
            onChangeText={setEmail}
            value={email}
          />

          <Text style={styles.label}>Password</Text>
          <View style={styles.passwordContainer}>
            <TextInput
              style={styles.passwordInput}
              placeholder="Password"
              placeholderTextColor="#ccc"
              onChangeText={setPassword}
              value={password}
              secureTextEntry={!showPassword}
            />
            <TouchableOpacity style={styles.eyeButton} onPress={() => setShowPassword(!showPassword)}>
              <Text style={styles.eyeText}>{showPassword ? '🕵🏼‍♀️' : '👁️‍🗨️'}</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.forgotBtn} onPress={onNavigateToForgotPassword}>
            <Text style={styles.forgotText}>Forgot Password?</Text>
          </TouchableOpacity>

          <Animated.View style={{ transform: [{ scale }] }}>
            <TouchableOpacity
              style={[styles.submitBtn, loading && styles.disabled]}
              onPress={handleSubmit}
              activeOpacity={0.8}
              disabled={loading}
            >
              {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.fontColor}>Log In</Text>}
            </TouchableOpacity>
          </Animated.View>

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
  passwordContainer: { flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderColor: '#fff', borderRadius: 5 },
  passwordInput: { flex: 1, padding: 10, color: '#fff' },
  eyeButton: { paddingHorizontal: 10 },
  eyeText: { fontSize: 20 },
  forgotBtn: { alignItems: 'flex-end', marginTop: -2 },
  forgotText: { color: '#38bdf8', fontWeight: 'bold', textDecorationLine: 'underline' },
  submitBtn: { backgroundColor: 'blue', padding: 12, borderRadius: 5, marginTop: 5, alignItems: 'center' },
  disabled: { opacity: 0.65 },
  fontColor: { color: '#fff', textAlign: 'center', fontWeight: 'bold' },
  switchBtn: { marginTop: 8, alignItems: 'center' },
  switchText: { color: '#fff', fontSize: 13, textAlign: 'center' },
  linkText: { color: '#38bdf8', fontWeight: 'bold', textDecorationLine: 'underline' },
  driverBtn: { marginTop: 8, backgroundColor: '#0284c7', padding: 10, borderRadius: 5, alignItems: 'center' },
  driverBtnText: { color: '#fff', fontWeight: 'bold', fontSize: 13 },
});
