import { StatusBar } from "expo-status-bar";
import React, { useMemo, useState } from "react";
import {
  View,
  Text,
  TextInput,
  Image,
  StyleSheet,
  Alert,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import Animated, { FadeInUp } from "react-native-reanimated";
import { signup } from "../../Services/Auth/authService";
import Toast from "react-native-toast-message";
import { Ionicons } from "@expo/vector-icons";

type FormValues = {
  name: string;
  email: string;
  phone: string;
  password: string;
  age: string;
};

type FormErrors = {
  name?: string;
  email?: string;
  phone?: string;
  password?: string;
  age?: string;
};

const SignupPage = ({ navigation }) => {
  const formInitialState = {
    name: "",
    email: "",
    phone: "",
    password: "",
    age: "",
  };
  const [values, setValues] = useState<FormValues>(formInitialState);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({
    name: "",
    email: "",
    phone: "",
    password: "",
    age: "",
  });
  const [secureText, setSecureText] = useState(true);

  const validate = (field: string, value: string) => {
    let error = "";
    switch (field) {
      case "name":
        if (value.length < 3) error = "Name must be at least 3 characters long";
        break;
      case "email":
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value))
          error = "Invalid email format";
        break;
      case "phone":
        if (!/^\d{10}$/.test(value))
          error = "Phone must be numeric and 10 digits";
        break;
      case "password":
        if (value.length < 8)
          error = "Password must be at least 8 characters long";
        break;
      case "age":
        if (!/^[0-9]+$/.test(value) || Number(value) < 2 || Number(value) > 120)
          error = "Age must be between 2 and 120";
        break;
      default:
        break;
    }
    setErrors((prevErrors) => ({ ...prevErrors, [field]: error }));
  };

  const handleChange = (field, value) => {
    setValues((prevValues) => ({ ...prevValues, [field]: value }));
    validate(field, value);
  };

  const isFormValid = useMemo(() => {
    return (
      values.name.length >= 3 &&
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email) &&
      /^\d{10}$/.test(values.phone) &&
      values.password.length >= 8 &&
      /^[0-9]+$/.test(values.age) &&
      Number(values.age) >= 2 &&
      Number(values.age) <= 120 &&
      Object.values(errors).every((err) => err === "")
    );
  }, [values.age, values.name, values.email, values.password, values.phone]);

  const handleLogin = async () => {
    setLoading(true)
    if (isFormValid) {
      try {
        const { name, age, email, phone, password } = values;
        const res = await signup(name, age, email, phone, password);
        navigation.navigate("Login");
        Toast.show({
          text1: "Register Successful",
          text2: "Your account has been created successfully.",
          type: "success",
        });
        setValues(formInitialState);
      } catch (error) {
        Toast.show({
          text1: "Signup Error",
          text2: error.message,
          type: "error",
        });
      }
      finally{
        setLoading(false)
      }
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <Image
        source={require("../../assets/loginbg.png")}
        style={styles.backgroundImage}
      />
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={true}
      >
        <View style={styles.innerContainer}>
          <View style={styles.logoContainer}>
            <Animated.Image
              entering={FadeInUp.delay(300).duration(3000).springify()}
              source={require("../../assets/eventx-logo.png")}
              style={styles.logo}
            />
          </View>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>Sign Up</Text>
          </View>
          <View style={styles.formContainer}>
            <View style={styles.inputContainer}>
              <TextInput
                placeholder="Name"
                placeholderTextColor={"gray"}
                onChangeText={(text) => handleChange("name", text)}
                value={values.name}
                style={styles.input}
              />
            </View>
            {errors.name ? (
              <Text style={styles.errorText}>{errors.name}</Text>
            ) : null}
            <View style={styles.inputContainer}>
              <TextInput
                placeholder="Email"
                placeholderTextColor={"gray"}
                onChangeText={(text) => handleChange("email", text)}
                value={values.email}
                style={styles.input}
              />
            </View>
            {errors.email ? (
              <Text style={styles.errorText}>{errors.email}</Text>
            ) : null}
            <View style={styles.inputContainer}>
              <TextInput
                placeholder="Phone No"
                placeholderTextColor={"gray"}
                onChangeText={(number) => handleChange("phone", number)}
                value={values.phone}
                style={styles.input}
                keyboardType="numeric"
              />
            </View>
            {errors.phone ? (
              <Text style={styles.errorText}>{errors.phone}</Text>
            ) : null}
            <View style={styles.inputContainer}>
              <TextInput
                placeholder="Age"
                placeholderTextColor={"gray"}
                onChangeText={(number) => handleChange("age", number)}
                value={values.age}
                style={styles.input}
                keyboardType="numeric"
              />
            </View>
            {errors.age ? (
              <Text style={styles.errorText}>{errors.age}</Text>
            ) : null}
            <View style={styles.passwordContainer}>
              <TextInput
                placeholder="Password"
                placeholderTextColor={"gray"}
                onChangeText={(text) => handleChange("password", text)}
                value={values.password}
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
            {errors.password ? (
              <Text style={styles.errorText}>{errors.password}</Text>
            ) : null}
            <TouchableOpacity
              style={[
                styles.button,
                { backgroundColor: !isFormValid ? "gray" : "#d6001c" },
              ]}
              onPress={handleLogin}
              disabled={!isFormValid}
            >
              {loading ? (
                <ActivityIndicator color="#ffffff" />
              ) : (
                <Text style={styles.buttonText}>Register</Text>
              )}
            </TouchableOpacity>
          </View>
        </View>

        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
          }}
        >
          <Text>Already have an account?</Text>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Login");
            }}
          >
            <Text
              style={{ marginLeft: 5, color: "#d6001c", fontWeight: "600" }}
            >
              Login
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  backgroundImage: {
    position: "absolute",
    width: "100%",
    height: "100%",
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    marginBottom: 40,
  },
  innerContainer: {
    width: "100%",
    padding: 20,
  },
  logoContainer: {
    alignItems: "center",
    marginBottom: 30,
  },
  logo: {
    tintColor: "#fff",
    height: 50,
    width: 150,
  },
  titleContainer: {
    alignItems: "center",
    paddingTop: 20,
    marginBottom: 120,
  },
  title: {
    fontSize: 35,
    color: "#fff",
    fontWeight: "700",
  },
  formContainer: {
    alignItems: "center",
    gap: 5,
  },
  inputContainer: {
    backgroundColor: "rgb(245 245 244)",
    padding: 12,
    borderRadius: 15,
    width: "100%",
    marginBottom: 15,
  },
  input: {
    width: "100%",
  },
  errorText: {
    color: "red",
  },
  button: {
    width: "100%",
    padding: 12,
    borderRadius: 15,
  },
  buttonText: {
    fontWeight: "700",
    color: "#ffffff",
    textAlign: "center",
    fontSize: 18,
  },
  passwordContainer: {
    backgroundColor: "rgb(245 245 244)",
    padding: 12,
    borderRadius: 15,
    width: "100%",
    display: "flex",
    flexDirection: "row",
  },
});

export default SignupPage;
