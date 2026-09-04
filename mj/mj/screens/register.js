import { useRef, useState } from "react";
import {
    Alert,
    Animated,
    ImageBackground,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";

export default function RegisterScreen({ onNavigateToLogin, onNavigateToDriverRegister }) {
  // Animation
  const scale = useRef(new Animated.Value(1)).current;

  // Input states
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Password visibility
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Save function
  const handlesave = () => {
    if (password !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match!");
      return;
    }

    console.log({
      name,
      email,
      password,
    });

    Alert.alert(
      "Registered!",
      "Your information has been registered successfully.",
    );
  };

  // Submit animation
  const handleSubmit = () => {
    Animated.sequence([
      Animated.timing(scale, {
        toValue: 0.85,
        duration: 100,
        useNativeDriver: true,
      }),

      Animated.timing(scale, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start(() => {
      handlesave();
    });
  };

  return (
    <ImageBackground
      source={require("./angkas ya.jpg")}
      resizeMode="cover"
      style={styles.image}
    >
      <View style={styles.container}>
        <View style={styles.form}>
          {/* Full Name */}
          <Text style={styles.label}>Full Name</Text>

          <TextInput
            style={styles.input}
            placeholder="Jose Delacruz"
            placeholderTextColor="#ccc"
            onChangeText={setName}
            value={name}
          />

          {/* Email */}
          <Text style={styles.label}>Email</Text>

          <TextInput
            style={styles.input}
            placeholder="Email@example.com"
            placeholderTextColor="#ccc"
            keyboardType="email-address"
            autoCapitalize="none"
            onChangeText={setEmail}
            value={email}
          />

          {/* Password */}
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

            <TouchableOpacity
              style={styles.eyeButton}
              onPress={() => setShowPassword(!showPassword)}
            >
              <Text style={styles.eyeText}>{showPassword ? "🕵🏼‍♀️" : "👁️‍🗨️"}</Text>
            </TouchableOpacity>
          </View>

          {/* Confirm Password */}
          <Text style={styles.label}>Confirm Password</Text>

          <View style={styles.passwordContainer}>
            <TextInput
              style={styles.passwordInput}
              placeholder="Confirm Password"
              placeholderTextColor="#ccc"
              onChangeText={setConfirmPassword}
              value={confirmPassword}
              secureTextEntry={!showConfirmPassword}
            />

            <TouchableOpacity
              style={styles.eyeButton}
              onPress={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              <Text style={styles.eyeText}>
                {showConfirmPassword ? "🕵🏼‍♀️" : "👁️‍🗨️"}
              </Text>
            </TouchableOpacity>
          </View>

          {/* Submit Button */}
          <Animated.View
            style={{
              transform: [{ scale }],
            }}
          >
            <TouchableOpacity
              style={styles.submitBtn}
              onPress={handleSubmit}
              activeOpacity={0.8}
            >
              <Text style={styles.fontColor}>Submit</Text>
            </TouchableOpacity>
          </Animated.View>

          {/* Switch to Login */}
          {onNavigateToLogin && (
            <TouchableOpacity
              style={styles.switchBtn}
              onPress={onNavigateToLogin}
            >
              <Text style={styles.switchText}>
                Already have an account?{' '}
                <Text style={styles.linkText}>Log In</Text>
              </Text>
            </TouchableOpacity>
          )}

          {/* Switch to Driver Registration */}
          {onNavigateToDriverRegister && (
            <TouchableOpacity
              style={styles.switchBtn}
              onPress={onNavigateToDriverRegister}
            >
              <Text style={styles.switchText}>
                Want to earn with us?{' '}
                <Text style={styles.linkText}>Register as Driver</Text>
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  image: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  form: {
    backgroundColor: "rgba(128, 128, 128, 0.9)",
    padding: 20,
    borderRadius: 10,
    gap: 10,
    width: 300,
  },

  label: {
    color: "white",
    fontWeight: "bold",
  },

  input: {
    borderWidth: 1,
    borderColor: "white",
    padding: 10,
    borderRadius: 5,
    color: "white",
  },

  // Password container
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "white",
    borderRadius: 5,
  },

  // Password input
  passwordInput: {
    flex: 1,
    padding: 10,
    color: "white",
  },

  // Eye button
  eyeButton: {
    paddingHorizontal: 10,
    justifyContent: "center",
    alignItems: "center",
  },

  // Eye icon
  eyeText: {
    fontSize: 20,
  },

  // Submit text
  fontColor: {
    color: "white",
    textAlign: "center",
    fontWeight: "bold",
  },

  // Submit button
  submitBtn: {
    backgroundColor: "blue",
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },

  switchBtn: {
    marginTop: 10,
    alignItems: "center",
  },

  switchText: {
    color: "white",
    fontSize: 13,
    textAlign: "center",
  },

  linkText: {
    color: "#38bdf8",
    fontWeight: "bold",
    textDecorationLine: "underline",
  },
});
