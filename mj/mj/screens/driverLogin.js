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

export default function DriverLoginScreen({
  onNavigateToDriverRegister,
  onNavigateToPassengerLogin,
}) {
  const [emailOrPhone, setEmailOrPhone] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = () => {
    if (!emailOrPhone.trim()) {
      Alert.alert("Missing Login", "Please enter your driver email or phone number.");
      return;
    }
    if (!password) {
      Alert.alert("Missing Password", "Please enter your password.");
      return;
    }

    Alert.alert("Driver Login Successful", "Welcome back, Driver!");
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
            <Text style={styles.title}>Driver Portal</Text>
            <Text style={styles.subtitle}>Log in to start driving</Text>

            <Text style={styles.label}>Driver Email or Phone</Text>
            <TextInput
              style={styles.input}
              placeholder="driver@example.com / 0917..."
              placeholderTextColor="#cbd5e1"
              autoCapitalize="none"
              autoCorrect={false}
              value={emailOrPhone}
              onChangeText={setEmailOrPhone}
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

            <TouchableOpacity style={styles.primaryButton} onPress={handleSubmit} activeOpacity={0.8}>
              <Text style={styles.buttonText}>Driver Log In</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.linkButton} onPress={onNavigateToDriverRegister}>
              <Text style={styles.linkText}>New driver? Register as Driver</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.linkButton} onPress={onNavigateToPassengerLogin}>
              <Text style={styles.secondaryText}>Switch to Passenger Login</Text>
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
  scrollContent: { flexGrow: 1, justifyContent: "center", alignItems: "center", padding: 24 },
  form: {
    width: "100%",
    maxWidth: 360,
    padding: 22,
    borderRadius: 16,
    backgroundColor: "rgba(15, 23, 42, 0.94)",
  },
  title: { color: "#fff", fontSize: 24, fontWeight: "700", textAlign: "center" },
  subtitle: { color: "#38bdf8", textAlign: "center", marginTop: 4, marginBottom: 18 },
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
  secondaryText: { color: "#94a3b8", textAlign: "center", textDecorationLine: "underline", fontSize: 13 },
});
