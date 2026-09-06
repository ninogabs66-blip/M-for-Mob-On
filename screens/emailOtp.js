import { useEffect, useRef, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  ImageBackground,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { sendEmailOtp, verifyEmailOtp } from '../lib/auth';

export default function EmailOtpScreen({ email, onVerified, onBack }) {
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const [seconds, setSeconds] = useState(60);
  const inputRef = useRef(null);

  useEffect(() => {
    if (seconds <= 0) return undefined;
    const timer = setInterval(() => setSeconds((value) => value - 1), 1000);
    return () => clearInterval(timer);
  }, [seconds]);

  const handleVerify = async () => {
    if (otp.trim().length !== 6) {
      Alert.alert('Invalid OTP', 'Enter the 6-digit code sent to your Gmail.');
      return;
    }

    setLoading(true);
    try {
      const session = await verifyEmailOtp(email, otp);
      if (!session) throw new Error('Verification succeeded but no session was created.');
      onVerified?.(session);
    } catch (error) {
      Alert.alert('Verification failed', error.message || 'The OTP is invalid or expired.');
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    if (seconds > 0 || loading) return;

    setLoading(true);
    try {
      await sendEmailOtp(email);
      setOtp('');
      setSeconds(60);
      Alert.alert('OTP sent', 'A new verification code has been sent to your Gmail.');
    } catch (error) {
      Alert.alert('Could not resend OTP', error.message || 'Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ImageBackground
      source={require('./angkas ya.jpg')}
      resizeMode="cover"
      style={styles.image}
    >
      <View style={styles.container}>
        <View style={styles.form}>
          <Text style={styles.title}>Verify your Gmail</Text>
          <Text style={styles.description}>
            We sent a 6-digit verification code to
          </Text>
          <Text style={styles.email}>{email}</Text>

          <TextInput
            ref={inputRef}
            style={styles.otpInput}
            value={otp}
            onChangeText={(value) => setOtp(value.replace(/\D/g, '').slice(0, 6))}
            keyboardType="number-pad"
            maxLength={6}
            placeholder="000000"
            placeholderTextColor="#aaa"
            textAlign="center"
            autoFocus
          />

          <TouchableOpacity
            style={[styles.button, loading && styles.disabled]}
            onPress={handleVerify}
            disabled={loading}
          >
            {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>Verify OTP</Text>}
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.resend}
            onPress={handleResend}
            disabled={seconds > 0 || loading}
          >
            <Text style={[styles.resendText, seconds > 0 && styles.muted]}>
              {seconds > 0 ? `Resend code in ${seconds}s` : 'Resend OTP'}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={onBack} style={styles.backButton}>
            <Text style={styles.backText}>← Use another email</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  image: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  form: {
    backgroundColor: 'rgba(128, 128, 128, 0.94)',
    padding: 22,
    borderRadius: 12,
    width: 320,
  },
  title: { color: '#fff', fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginBottom: 10 },
  description: { color: '#fff', textAlign: 'center', fontSize: 14 },
  email: { color: '#38bdf8', textAlign: 'center', fontWeight: 'bold', marginTop: 4, marginBottom: 18 },
  otpInput: {
    borderWidth: 1,
    borderColor: '#fff',
    borderRadius: 8,
    padding: 12,
    color: '#fff',
    fontSize: 26,
    letterSpacing: 8,
    marginBottom: 14,
  },
  button: { backgroundColor: 'blue', padding: 13, borderRadius: 7, alignItems: 'center' },
  disabled: { opacity: 0.7 },
  buttonText: { color: '#fff', fontWeight: 'bold' },
  resend: { alignItems: 'center', marginTop: 16 },
  resendText: { color: '#38bdf8', fontWeight: 'bold' },
  muted: { color: '#ddd' },
  backButton: { alignItems: 'center', marginTop: 18 },
  backText: { color: '#fff', textDecorationLine: 'underline' },
});
