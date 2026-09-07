import { useRef, useState } from "react";
import { Alert, Animated, ImageBackground, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { registerWithEmail } from "../lib/auth";

export default function RegisterScreen({ onNavigateToLogin, onNavigateToDriverRegister }) {
  const scale = useRef(new Animated.Value(1)).current;
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    if (!name.trim() || !email.trim() || !password || !confirmPassword) {
      Alert.alert("Missing fields", "Please complete all fields.");
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match!");
      return;
    }

    setLoading(true);
    try {
      const data = await registerWithEmail(email, password);
      if (data.session) {
        Alert.alert("Registered!", "Your account has been created successfully.");
      } else {
        Alert.alert("Registered!", "Your account was created. You can now log in.");
      }
      onNavigateToLogin?.();
    } catch (error) {
      Alert.alert("Registration failed", error.message || "Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = () => {
    Animated.sequence([
      Animated.timing(scale, { toValue: 0.85, duration: 100, useNativeDriver: true }),
      Animated.timing(scale, { toValue: 1, duration: 100, useNativeDriver: true }),
    ]).start(handleSave);
  };

  return (
    <ImageBackground source={require("./angkas ya.jpg")} resizeMode="cover" style={styles.image}>
      <View style={styles.container}>
        <View style={styles.form}>
          <Text style={styles.title}>Passenger Registration</Text>

          <Text style={styles.label}>Full Name</Text>
          <TextInput style={styles.input} placeholder="Jose Delacruz" placeholderTextColor="#ccc" onChangeText={setName} value={name} />

          <Text style={styles.label}>Email</Text>
          <TextInput style={styles.input} placeholder="Email@example.com" placeholderTextColor="#ccc" keyboardType="email-address" autoCapitalize="none" onChangeText={setEmail} value={email} />

          <Text style={styles.label}>Password</Text>
          <View style={styles.passwordContainer}>
            <TextInput style={styles.passwordInput} placeholder="Password" placeholderTextColor="#ccc" onChangeText={setPassword} value={password} secureTextEntry={!showPassword} />
            <TouchableOpacity style={styles.eyeButton} onPress={() => setShowPassword(!showPassword)}><Text style={styles.eyeText}>{showPassword ? "🕵🏼‍♀️" : "👁️‍🗨️"}</Text></TouchableOpacity>
          </View>

          <Text style={styles.label}>Confirm Password</Text>
          <View style={styles.passwordContainer}>
            <TextInput style={styles.passwordInput} placeholder="Confirm Password" placeholderTextColor="#ccc" onChangeText={setConfirmPassword} value={confirmPassword} secureTextEntry={!showConfirmPassword} />
            <TouchableOpacity style={styles.eyeButton} onPress={() => setShowConfirmPassword(!showConfirmPassword)}><Text style={styles.eyeText}>{showConfirmPassword ? "🕵🏼‍♀️" : "👁️‍🗨️"}</Text></TouchableOpacity>
          </View>

          <Animated.View style={{ transform: [{ scale }] }}>
            <TouchableOpacity style={[styles.submitBtn, loading && styles.disabled]} onPress={handleSubmit} disabled={loading} activeOpacity={0.8}>
              <Text style={styles.fontColor}>{loading ? "Creating account..." : "Submit"}</Text>
            </TouchableOpacity>
          </Animated.View>

          {onNavigateToLogin && <TouchableOpacity style={styles.switchBtn} onPress={onNavigateToLogin}><Text style={styles.switchText}>Already have an account? <Text style={styles.linkText}>Log In</Text></Text></TouchableOpacity>}
          {onNavigateToDriverRegister && <TouchableOpacity style={styles.switchBtn} onPress={onNavigateToDriverRegister}><Text style={styles.switchText}>Want to earn with us? <Text style={styles.linkText}>Register as Driver</Text></Text></TouchableOpacity>}
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  image: { flex: 1, justifyContent: "center", alignItems: "center" },
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  form: { backgroundColor: "rgba(128, 128, 128, 0.9)", padding: 20, borderRadius: 10, gap: 10, width: 320 },
  title: { color: "white", fontSize: 21, fontWeight: "bold", textAlign: "center", marginBottom: 5 },
  label: { color: "white", fontWeight: "bold" },
  input: { borderWidth: 1, borderColor: "white", padding: 10, borderRadius: 5, color: "white" },
  passwordContainer: { flexDirection: "row", alignItems: "center", borderWidth: 1, borderColor: "white", borderRadius: 5 },
  passwordInput: { flex: 1, padding: 10, color: "white" },
  eyeButton: { paddingHorizontal: 10 },
  eyeText: { fontSize: 20 },
  submitBtn: { backgroundColor: "blue", padding: 10, borderRadius: 5, marginTop: 10, alignItems: "center" },
  disabled: { opacity: 0.65 },
  fontColor: { color: "white", textAlign: "center", fontWeight: "bold" },
  switchBtn: { marginTop: 10, alignItems: "center" },
  switchText: { color: "white", fontSize: 13, textAlign: "center" },
  linkText: { color: "#38bdf8", fontWeight: "bold", textDecorationLine: "underline" },
});
