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

export default function LoginScreen({
  onNavigateToRegister,
  onNavigateToDriverRegister,
  onNavigateToDriverLogin,
}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = () => {
    if (!email.trim()) {
      Alert.alert("Missing Email", "Please enter your email address.");
      return;
    }

    if (!password) {
      Alert.alert("Missing Password", "Please enter your password.");
      return;
    }

    Alert.alert("Log in Successfully!", "Welcome back!");
  };

  return (
    <ImageBackground
      source={require("../assets/angkas ya.jpg")}
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
            <Text style={styles.title}>Passenger Login</Text>
            <Text style={styles.subtitle}>Log in to continue</Text>

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
                autoCorrect={false}
                value={password}
                onChangeText={setPassword}
              />
              <TouchableOpacity
                style={styles.eyeButton}
                onPress={() => setShowPassword((value) => !value)}
                accessibilityRole="button"
                accessibilityLabel={showPassword ? "Hide password" : "Show password"}
              >
                <Text style={styles.eyeText}>{showPassword ? "Hide" : "Show"}</Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              style={styles.primaryButton}
              onPress={handleSubmit}
              activeOpacity={0.8}
            >
              <Text style={styles.buttonText}>Log In</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.linkButton} onPress={onNavigateToRegister}>
              <Text style={styles.linkText}>Don't have an account? Register as Passenger</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.driverButton} onPress={onNavigateToDriverLogin}>
              <Text style={styles.buttonText}>Log in as Driver</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.linkButton} onPress={onNavigateToDriverRegister}>
              <Text style={styles.linkText}>Want to earn with us? Register as Driver</Text>
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
  title: {
    color: "#ffffff",
    fontSize: 24,
    fontWeight: "700",
    textAlign: "center",
  },
  subtitle: {
    color: "#38bdf8",
    textAlign: "center",
    marginTop: 4,
    marginBottom: 18,
  },
  label: {
    color: "#ffffff",
    fontWeight: "600",
    marginBottom: 6,
    marginTop: 10,
  },
  input: {
    minHeight: 48,
    borderWidth: 1,
    borderColor: "#94a3b8",
    borderRadius: 8,
    paddingHorizontal: 12,
    color: "#ffffff",
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
  passwordInput: {
    flex: 1,
    minHeight: 46,
    paddingHorizontal: 12,
    color: "#ffffff",
  },
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
  driverButton: {
    marginTop: 12,
    minHeight: 48,
    borderRadius: 8,
    backgroundColor: "#0369a1",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: { color: "#ffffff", fontWeight: "700", fontSize: 15 },
  linkButton: { marginTop: 14, alignItems: "center" },
  linkText: {
    color: "#38bdf8",
    textAlign: "center",
    textDecorationLine: "underline",
    fontSize: 13,
  },
});
