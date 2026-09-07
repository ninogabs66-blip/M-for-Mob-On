import { useRef, useState } from 'react';
import { ActivityIndicator, Alert, Animated, ImageBackground, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { sendPasswordReset } from '../lib/auth';

export default function ForgotPasswordScreen({ onBack }) {
  const scale = useRef(new Animated.Value(1)).current;
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleReset = async () => {
    if (!email.trim()) {
      Alert.alert('Email required', 'Enter the email address connected to your account.');
      return;
    }

    setLoading(true);
    try {
      await sendPasswordReset(email);
      Alert.alert('Reset email sent', 'Check your email for the password reset instructions.');
    } catch (error) {
      Alert.alert('Could not send reset email', error.message || 'Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = () => {
    Animated.sequence([
      Animated.timing(scale, { toValue: 0.85, duration: 100, useNativeDriver: true }),
      Animated.timing(scale, { toValue: 1, duration: 100, useNativeDriver: true }),
    ]).start(handleReset);
  };

  return (
    <ImageBackground source={require('./angkas ya.jpg')} resizeMode="cover" style={styles.image}>
      <View style={styles.container}>
        <View style={styles.form}>
          <Text style={styles.title}>Forgot Password</Text>
          <Text style={styles.subtitle}>Enter your email and we'll send you a password reset link.</Text>

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

          <Animated.View style={{ transform: [{ scale }] }}>
            <TouchableOpacity style={[styles.submitBtn, loading && styles.disabled]} onPress={handleSubmit} disabled={loading} activeOpacity={0.8}>
              {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.fontColor}>Send Reset Link</Text>}
            </TouchableOpacity>
          </Animated.View>

          <TouchableOpacity style={styles.backBtn} onPress={onBack}>
            <Text style={styles.backText}>Back to Login</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  image: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  form: { backgroundColor: 'rgba(128, 128, 128, 0.92)', padding: 20, borderRadius: 10, gap: 10, width: 320 },
  title: { color: '#fff', fontSize: 22, fontWeight: 'bold', textAlign: 'center' },
  subtitle: { color: '#eee', fontSize: 13, textAlign: 'center', marginBottom: 5 },
  label: { color: '#fff', fontWeight: 'bold' },
  input: { borderWidth: 1, borderColor: '#fff', padding: 10, borderRadius: 5, color: '#fff' },
  submitBtn: { backgroundColor: 'blue', padding: 12, borderRadius: 5, marginTop: 8, alignItems: 'center' },
  disabled: { opacity: 0.65 },
  fontColor: { color: '#fff', textAlign: 'center', fontWeight: 'bold' },
  backBtn: { marginTop: 8, alignItems: 'center' },
  backText: { color: '#38bdf8', fontWeight: 'bold', textDecorationLine: 'underline' },
});
