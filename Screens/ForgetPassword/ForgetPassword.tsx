import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Image,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import Animated, { FadeInUp } from "react-native-reanimated";
import Toast from "react-native-toast-message";
import { forgotPassword } from "../../Services/Auth/authService";

const ForgetPasswordPage = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [loading, setLoading] = useState(false); // Loading state
  const [secureText, setSecureText] = useState(true);

  const handleLogin = async () => {
    setLoading(true); // Show loader
    const trimmedEmail = email.trim();
    if (!trimmedEmail) {
      setEmailError("Email field cannot be empty");
    } else if (!validateEmail(trimmedEmail)) {
      setEmailError("Please enter a valid email address");
    } else {
      setEmailError("");
    }

    if (trimmedEmail && validateEmail(trimmedEmail)) {
      try {
        const res = await forgotPassword(trimmedEmail);
        console.log(res);

        if (res.message === "Reset password email sent") {
          Toast.show({
            text1: "Success",
            text2: "Email sent successful",
            type: "success",
          });

          setEmail("");
          navigation.navigate("ResetPassword");
        }
      } catch (error) {
        console.error("Error:", error);

        Toast.show({
          text1: "Error",
          text2: error.message || "Something went wrong",
          type: "error",
        });
      }
    }

    setLoading(false); // Hide loader
  };

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim().length) {
      setEmailError("Email field cannot be empty");
      return false;
    } else if (!emailRegex.test(email.trim())) {
      setEmailError("Please enter a valid email address");
      return false;
    }
    setEmailError("");
    return true;
  };

  const isDisabled = !email.trim().length || !!emailError.length;

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <Image
        source={require("../../assets/loginbg.png")}
        style={{ flex: 1, position: "absolute", width: "100%", height: "100%" }}
      />

      <View style={styles.innerContainer}>
        <View style={styles.logoContainer}>
          <Animated.Image
            entering={FadeInUp.delay(300).duration(3000).springify()}
            source={require("../../assets/eventx-logo.png")}
            style={styles.logo}
          />
        </View>

        <View style={styles.titleContainer}>
          <Text style={styles.title}>Forgot Password</Text>
        </View>

        <View style={styles.formContainer}>
          <View style={styles.inputContainer}>
            <TextInput
              placeholder="Registered Email"
              placeholderTextColor={"gray"}
              onChangeText={(text) => {
                setEmail(text);
                validateEmail(text);
              }}
              value={email}
            />
          </View>
          {emailError ? (
            <Text style={styles.errorText}>{emailError}</Text>
          ) : null}

          <View style={{ width: "100%", marginBottom: 10 }}>
            <TouchableOpacity
              style={[
                styles.button,
                { backgroundColor: isDisabled ? "gray" : "#d6001c" },
              ]}
              onPress={handleLogin}
              disabled={isDisabled}
            >
              {loading ? (
                <ActivityIndicator color="#ffffff" />
              ) : (
                <Text style={styles.buttonText}>Send Email</Text>
              )}
            </TouchableOpacity>
          </View>

          <View style={styles.signupContainer}>
            <Text>Don't have an account? </Text>
            <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
              <Text style={styles.signupText}>Sign up</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    backgroundColor: "#fff",
  },
  innerContainer: {
    display: "flex",
    width: "100%",
    height: "100%",
    justifyContent: "space-around",
    paddingTop: 40,
    paddingBottom: 10,
  },
  logoContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    position: "absolute",
  },
  logo: {
    tintColor: "#fff",
    height: 50,
    width: 150,
  },
  titleContainer: {
    display: "flex",
    alignItems: "center",
    paddingTop: 40,
  },
  title: {
    fontSize: 35,
    color: "#fff",
    fontWeight: "700",
  },
  formContainer: {
    display: "flex",
    alignItems: "center",
    marginHorizontal: 10,
    gap: 15,
  },
  inputContainer: {
    backgroundColor: "rgb(245 245 244)",
    padding: 12,
    borderRadius: 15,
    width: "100%",
  },
  errorText: {
    color: "red",
  },
  button: {
    width: "100%",
    padding: 12,
    borderRadius: 15,
    alignItems: "center",
  },
  buttonText: {
    fontWeight: "700",
    color: "#ffffff",
    textAlign: "center",
    fontSize: 18,
  },
  signupContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
  },
  signupText: {
    marginLeft: 5,
    color: "#d6001c",
    fontWeight: "600",
  },
});

export default ForgetPasswordPage;
