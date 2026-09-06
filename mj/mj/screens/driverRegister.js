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

export default function DriverRegisterScreen({
  onNavigateToLogin,
  onNavigateToPassengerRegister,
}) {
  const [firstName, setFirstName] = useState("");
  const [middleName, setMiddleName] = useState("");
  const [lastName, setLastName] = useState("");
  const [contactInfo, setContactInfo] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [licenseAttached, setLicenseAttached] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleBirthdateChange = (text) => {
    const digits = text.replace(/\D/g, "").slice(0, 8);
    let formatted = digits;
    if (digits.length > 4) {
      formatted = `${digits.slice(0, 2)}/${digits.slice(2, 4)}/${digits.slice(4)}`;
    } else if (digits.length > 2) {
      formatted = `${digits.slice(0, 2)}/${digits.slice(2)}`;
    }
    setBirthdate(formatted);
  };

  const handleSubmit = () => {
    if (!firstName.trim() || !lastName.trim()) {
      Alert.alert("Missing Name", "Please enter your first and last name.");
      return;
    }
    if (!contactInfo.trim()) {
      Alert.alert("Missing Contact", "Please enter your contact information.");
      return;
    }
    if (birthdate.length !== 10) {
      Alert.alert("Invalid Birthdate", "Use MM/DD/YYYY format.");
      return;
    }
    if (!licenseAttached) {
      Alert.alert("Missing License", "Please attach your driver's license.");
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

    Alert.alert(
      "Driver Registration Submitted",
      `Welcome ${firstName} ${lastName}! Your application has been submitted successfully.`,
    );
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
            <Text style={styles.title}>Driver Registration</Text>
            <Text style={styles.subtitle}>Create your driver account</Text>

            <Text style={styles.label}>First Name</Text>
            <TextInput style={styles.input} placeholder="Juan" placeholderTextColor="#cbd5e1" value={firstName} onChangeText={setFirstName} />

            <Text style={styles.label}>Middle Name</Text>
            <TextInput style={styles.input} placeholder="Santos" placeholderTextColor="#cbd5e1" value={middleName} onChangeText={setMiddleName} />

            <Text style={styles.label}>Last Name</Text>
            <TextInput style={styles.input} placeholder="Dela Cruz" placeholderTextColor="#cbd5e1" value={lastName} onChangeText={setLastName} />

            <Text style={styles.label}>Contact Info</Text>
            <TextInput style={styles.input} placeholder="0917 123 4567" placeholderTextColor="#cbd5e1" keyboardType="phone-pad" value={contactInfo} onChangeText={setContactInfo} />

            <Text style={styles.label}>Birthdate (MM/DD/YYYY)</Text>
            <TextInput style={styles.input} placeholder="MM/DD/YYYY" placeholderTextColor="#cbd5e1" keyboardType="numeric" maxLength={10} value={birthdate} onChangeText={handleBirthdateChange} />

            <Text style={styles.label}>Copy of License</Text>
            <TouchableOpacity
              style={[styles.licenseButton, licenseAttached && styles.licenseButtonActive]}
              onPress={() => setLicenseAttached((value) => !value)}
              activeOpacity={0.8}
            >
              <Text style={styles.licenseText}>
                {licenseAttached ? "✓ License Attached" : "Attach Driver's License"}
              </Text>
            </TouchableOpacity>

            <Text style={styles.label}>Email</Text>
            <TextInput style={styles.input} placeholder="driver@example.com" placeholderTextColor="#cbd5e1" keyboardType="email-address" autoCapitalize="none" autoCorrect={false} value={email} onChangeText={setEmail} />

            <Text style={styles.label}>Password</Text>
            <View style={styles.passwordContainer}>
              <TextInput style={styles.passwordInput} placeholder="Password" placeholderTextColor="#cbd5e1" secureTextEntry={!showPassword} value={password} onChangeText={setPassword} />
              <TouchableOpacity style={styles.eyeButton} onPress={() => setShowPassword((v) => !v)}>
                <Text style={styles.eyeText}>{showPassword ? "Hide" : "Show"}</Text>
              </TouchableOpacity>
            </View>

            <Text style={styles.label}>Confirm Password</Text>
            <View style={styles.passwordContainer}>
              <TextInput style={styles.passwordInput} placeholder="Confirm Password" placeholderTextColor="#cbd5e1" secureTextEntry={!showConfirmPassword} value={confirmPassword} onChangeText={setConfirmPassword} />
              <TouchableOpacity style={styles.eyeButton} onPress={() => setShowConfirmPassword((v) => !v)}>
                <Text style={styles.eyeText}>{showConfirmPassword ? "Hide" : "Show"}</Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity style={styles.primaryButton} onPress={handleSubmit} activeOpacity={0.8}>
              <Text style={styles.buttonText}>Submit Application</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.linkButton} onPress={onNavigateToLogin}>
              <Text style={styles.linkText}>Already a driver? Driver Log In</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.linkButton} onPress={onNavigateToPassengerRegister}>
              <Text style={styles.secondaryText}>Register as Passenger instead</Text>
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
  scrollContent: { flexGrow: 1, alignItems: "center", padding: 24 },
  form: {
    width: "100%",
    maxWidth: 360,
    padding: 22,
    marginVertical: 20,
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
  licenseButton: {
    minHeight: 48,
    borderRadius: 8,
    borderWidth: 1,
    borderStyle: "dashed",
    borderColor: "#38bdf8",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 12,
  },
  licenseButtonActive: { borderStyle: "solid", borderColor: "#4ade80" },
  licenseText: { color: "#fff", fontWeight: "600", textAlign: "center" },
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
