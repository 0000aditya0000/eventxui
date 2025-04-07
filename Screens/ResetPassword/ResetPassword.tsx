import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import {
  View,
  Text,
  TextInput,
  ActivityIndicator,
  TouchableOpacity,
  StyleSheet,
  Image,
} from "react-native";
import { useRoute, useNavigation, RouteProp } from "@react-navigation/native";
import Animated, { FadeInUp } from "react-native-reanimated";
import Ionicons from "react-native-vector-icons/Ionicons";
import { resetPassword } from "../../Services/Auth/authService";
import Toast from "react-native-toast-message";

type ResetPasswordRouteParams = {
  ResetPassword: { token: string };
};

export default function ResetPasswordScreen() {
  const route =
    useRoute<RouteProp<ResetPasswordRouteParams, "ResetPassword">>();
  const navigation = useNavigation();
  const [token, setToken] = useState(""); // Extract JWT token from deep link

  const [newPassword, setNewPassword] = useState<string>("");
  const [secureText, setSecureText] = useState(true);
  const [loading, setLoading] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");

  const validatePassword = (password: string) => {
    if (!password.trim().length) {
      setPasswordError("Password field cannot be empty");
      return false;
    } else if (password.length < 3) {
      setPasswordError("Password must be at least 3 characters long");
      return false;
    }
    setPasswordError("");
    return true;
  };

  const handleResetPassword = async () => {
    if (!newPassword) {
      Toast.show({
        text1: "Error",
        text2: "Please enter a new password.",
        type: "error",
      });
      return;
    }

    try {
      setLoading(true);
      const response = await resetPassword(token, newPassword);
      Toast.show({
        text1: "Success",
        text2: "Password Reset Successful",
        type: "success",
      });
      if (response) {
        navigation.navigate("Login" as never);
      }
    } catch (error) {
      Toast.show({
        text1: "Error",
        text2: error.message,
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  const isDisabled =
    newPassword.length < 3 ||
    !!passwordError.length ||
    !!confirmPasswordError.length;

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
          <Text style={styles.title}>Reset Password</Text>
        </View>

        <View style={styles.formContainer}>
          <View style={styles.inputContainer}>
            <TextInput
              placeholder="Token"
              placeholderTextColor={"gray"}
              onChangeText={(text) => {
                setToken(text);
              }}
              value={token}
            />
          </View>
          <View style={styles.passwordContainer}>
            <TextInput
              placeholder="Password"
              placeholderTextColor="gray"
              onChangeText={(text) => {
                setNewPassword(text);
                validatePassword(text);
              }}
              value={newPassword}
              secureTextEntry={secureText}
              style={{ flex: 1 }}
            />
            <TouchableOpacity onPress={() => setSecureText(!secureText)}>
              <Ionicons
                name={secureText ? "eye-off" : "eye"}
                size={24}
                color="gray"
              />
            </TouchableOpacity>
          </View>
          {passwordError ? (
            <Text style={styles.errorText}>{passwordError}</Text>
          ) : null}

          <View style={styles.inputContainer}>
            <TextInput
              placeholder="Confirm Password"
              placeholderTextColor={"gray"}
              onChangeText={(text) => {
                setConfirmPassword(text);
                if (text !== newPassword) {
                  setConfirmPasswordError("Confirm password doesn't match");
                } else {
                  setConfirmPasswordError("");
                }
              }}
              value={confirmPassword}
            />
          </View>
          {confirmPasswordError ? (
            <Text style={styles.errorText}>{confirmPasswordError}</Text>
          ) : null}

          <View style={{ width: "100%", marginBottom: 10 }}>
            <TouchableOpacity
              style={[
                styles.button,
                { backgroundColor: isDisabled ? "gray" : "#d6001c" },
              ]}
              onPress={handleResetPassword}
              disabled={isDisabled}
            >
              {loading ? (
                <ActivityIndicator color="#ffffff" />
              ) : (
                <Text style={styles.buttonText}>Reset Password</Text>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}

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
  passwordContainer: {
    backgroundColor: "rgb(245 245 244)",
    padding: 12,
    borderRadius: 15,
    width: "100%",
    display: "flex",
    flexDirection: "row",
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
  forgetPasswordContainer: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  forgetPasswordText: {
    color: "gray",
  },
});
