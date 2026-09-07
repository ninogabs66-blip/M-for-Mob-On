import { useState } from "react";
import {
  Alert,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function RegisterScreen({ onNavigateToLogin, onNavigateToDriverRegister }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSubmit = () => {
    if (!name.trim()) {
      Alert.alert("Missing Name", "Please enter your full name.");
      return;
    }
    if (!email.trim()) {
      Alert.alert("Missing Email", "Please enter your email address.");
      return;
    }
    if (!password) {
      Alert.alert("Missing Password", "Please enter a password.");
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert("Password Error", "Passwords do not match.");
      return;
    }

    Alert.alert("Registered!", "Your passenger account has been created successfully.");
  };

  return (
    <ImageBackground
      source={require("./angkas ya.jpg")}
      resizeMode="cover"
      style={styles.background}
    >
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.form}>
            <Text style={styles.title}>Passenger Registration</Text>
            <Text style={styles.subtitle}>Create your account</Text>

            <Text style={styles.label}>Full Name</Text>
            <TextInput
              style={styles.input}
              placeholder="Jose Delacruz"
              placeholderTextColor="#cbd5e1"
              autoCapitalize="words"
              value={name}
              onChangeText={setName}
            />

            <Text style={styles.label}>Email</Text>
            <TextInput
              style={styles.input}
              placeholder="Email@example.com"
              placeholderTextColor="#cbd5e1"
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
              value={email}
              onChangeText={setEmail}
            />

            <Text style={styles.label}>Password</Text>
            <View style={styles.passwordContainer}>
              <TextInput
                style={styles.passwordInput}
                placeholder="Password"
                placeholderTextColor="#cbd5e1"
                secureTextEntry={!showPassword}
                autoCapitalize="none"
                value={password}
                onChangeText={setPassword}
              />
              <TouchableOpacity style={styles.eyeButton} onPress={() => setShowPassword((v) => !v)}>
                <Text style={styles.eyeText}>{showPassword ? "Hide" : "Show"}</Text>
              </TouchableOpacity>
            </View>

            <Text style={styles.label}>Confirm Password</Text>
            <View style={styles.passwordContainer}>
              <TextInput
                style={styles.passwordInput}
                placeholder="Confirm Password"
                placeholderTextColor="#cbd5e1"
                secureTextEntry={!showConfirmPassword}
                autoCapitalize="none"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
              />
              <TouchableOpacity
                style={styles.eyeButton}
                onPress={() => setShowConfirmPassword((v) => !v)}
              >
                <Text style={styles.eyeText}>{showConfirmPassword ? "Hide" : "Show"}</Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity style={styles.primaryButton} onPress={handleSubmit} activeOpacity={0.8}>
              <Text style={styles.buttonText}>Register</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.linkButton} onPress={onNavigateToLogin}>
              <Text style={styles.linkText}>Already have an account? Log In</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.linkButton} onPress={onNavigateToDriverRegister}>
              <Text style={styles.linkText}>Register as Driver</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  background: { flex: 1, width: "100%", height: "100%" },
  scrollContent: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },
  form: {
    width: "100%",
    maxWidth: 360,
    padding: 22,
    borderRadius: 16,
    backgroundColor: "rgba(15, 23, 42, 0.94)",
  },
  title: { color: "#fff", fontSize: 23, fontWeight: "700", textAlign: "center" },
  subtitle: { color: "#38bdf8", textAlign: "center", marginTop: 4, marginBottom: 14 },
  label: { color: "#fff", fontWeight: "600", marginTop: 10, marginBottom: 6 },
  input: {
    minHeight: 48,
    borderWidth: 1,
    borderColor: "#94a3b8",
    borderRadius: 8,
    paddingHorizontal: 12,
    color: "#fff",
    backgroundColor: "rgba(0,0,0,0.25)",
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    minHeight: 48,
    borderWidth: 1,
    borderColor: "#94a3b8",
    borderRadius: 8,
    backgroundColor: "rgba(0,0,0,0.25)",
  },
  passwordInput: { flex: 1, minHeight: 46, paddingHorizontal: 12, color: "#fff" },
  eyeButton: { paddingHorizontal: 12, paddingVertical: 12 },
  eyeText: { color: "#38bdf8", fontWeight: "700" },
  primaryButton: {
    marginTop: 20,
    minHeight: 48,
    borderRadius: 8,
    backgroundColor: "#0284c7",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: { color: "#fff", fontWeight: "700", fontSize: 15 },
  linkButton: { marginTop: 14, alignItems: "center" },
  linkText: { color: "#38bdf8", textAlign: "center", textDecorationLine: "underline", fontSize: 13 },
});
