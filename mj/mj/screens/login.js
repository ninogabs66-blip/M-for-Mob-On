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

export default function LoginScreen({
  onNavigateToRegister,
  onNavigateToDriverRegister,
  onNavigateToDriverLogin,
}) {
  const scale = useRef(new Animated.Value(1)).current;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handlesave = () => {
    console.log({ email, password });

    Alert.alert("Log in Successfully!", "okay na ya.");
  };

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

          <Text style={styles.label}>Password</Text>

          {/* Password input with eye button */}
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

          {onNavigateToRegister && (
            <TouchableOpacity
              style={styles.switchBtn}
              onPress={onNavigateToRegister}
            >
              <Text style={styles.switchText}>
                Don't have an account?{' '}
                <Text style={styles.linkText}>Register as Passenger</Text>
              </Text>
            </TouchableOpacity>
          )}

          {onNavigateToDriverLogin && (
            <TouchableOpacity
              style={styles.driverBtn}
              onPress={onNavigateToDriverLogin}
            >
              <Text style={styles.driverBtnText}>
                🏍️ Log in as Driver
              </Text>
            </TouchableOpacity>
          )}

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

  // Password box
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "white",
    borderRadius: 5,
  },

  // Password text input
  passwordInput: {
    flex: 1,
    padding: 10,
    color: "white",
  },

  // Eye button
  eyeButton: {
    padding: 10,
  },

  eyeText: {
    fontSize: 20,
  },

  fontColor: {
    color: "white",
    textAlign: "center",
    fontWeight: "bold",
  },

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

  driverBtn: {
    marginTop: 10,
    backgroundColor: "#0284c7",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
  },

  driverBtnText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 13,
  },
});
