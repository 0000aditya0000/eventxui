import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from "react-native";
import { Avatar } from "react-native-elements";
import * as ImagePicker from "expo-image-picker";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useAuth } from "../../Context/AuthContext";
import { getUser, updateUser } from "../../Services/User/userService";
import { useUserProfile } from "../../Context/UserContext";
import Toast from "react-native-toast-message";
import Loader from "../Loader/Loader";

const UserProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profilePicture, setProfilePicture] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [age, setAge] = useState("");
  const [isFormValid, setIsFormValid] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const { user, token } = useAuth();
  const { profileImage, updateProfileImage } = useUserProfile();

  useEffect(() => {
    const fetchUserDetails = async () => {
      setIsLoading(true);
      try {
        const userDetails = await getUser(user.id, token);
        setName(userDetails.name);
        setEmail(userDetails.email);
        setPhone(userDetails.phone);
        setAge(userDetails.age.toString());
        setProfilePicture(userDetails.image);
      } catch (error) {
        Toast.show({
          text1: "Error",
          text2: error.message,
          type: "error",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserDetails();
  }, [user.id]);

  useEffect(() => {
    validateForm();
  }, [name, email, phone, age]);

  const validateForm = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isEmailValid = emailRegex.test(email);
    const isPhoneValid = phone.length === 10 && /^\d+$/.test(phone);
    const isAgeValid = age.length === 2 && /^\d+$/.test(age);
    const isFormComplete =
      name !== "" && email !== "" && phone !== "" && age !== "";

    setIsFormValid(
      isEmailValid && isPhoneValid && isAgeValid && isFormComplete
    );
  };

  const handleEdit = async () => {
    if (isEditing) {
      try {
        await updateUser(
          user.id,
          {
            name,
            email,
            phone,
            age,
            image: profilePicture,
          },
          token
        );
        updateProfileImage(profilePicture);
        Toast.show({
          text1: "Success",
          text2: "Profile updated successfully",
          type: "success",
        });
      } catch (error) {
        Toast.show({
          text1: "Error",
          text2: error.message,
          type: "error",
        });
      }
    }
    setIsEditing(!isEditing);
  };

  const handleImagePicker = async () => {
    const result = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!result.granted) {
      alert("Permission to access camera roll is required!");
      return;
    }

    const pickerResult = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    });

    if (!pickerResult.canceled) {
      const reader = new FileReader();
      reader.readAsDataURL(
        await fetch(pickerResult.assets[0].uri).then((res) => res.blob())
      );
      reader.onloadend = () => {
        const base64data = (reader.result as string).split(",")[1];
        setProfilePicture(base64data);
      };
    }
  };

  const defaultAvatar = require("../../assets/profile.png");

  return (
    <ScrollView showsVerticalScrollIndicator={true}>
      {(isLoading || isEditing) && <Loader />}
      <View style={styles.container}>
        <View style={styles.avatarWrapper}>
          <TouchableOpacity onPress={handleImagePicker}>
            <Avatar
              rounded
              size="xlarge"
              source={
                profilePicture
                  ? { uri: `data:image/jpeg;base64,${profilePicture}` }
                  : defaultAvatar
              }
            />
            <Ionicons
              name="add-circle"
              size={23}
              color="#d6001c"
              style={styles.iconContainer}
            />
          </TouchableOpacity>
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.labelText}>Name</Text>
          <TextInput
            style={[styles.input, !isEditing && styles.nonEditableInput]}
            placeholder="Enter name"
            value={name}
            onChangeText={setName}
            editable={isEditing}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.labelText}>Email Id</Text>
          <TextInput
            style={[styles.input, !isEditing && styles.nonEditableInput]}
            placeholder="Enter email"
            value={email}
            onChangeText={setEmail}
            editable={isEditing}
            keyboardType="email-address"
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.labelText}>Age</Text>
          <TextInput
            style={[styles.input, !isEditing && styles.nonEditableInput]}
            placeholder="Enter age"
            value={age}
            onChangeText={setAge}
            editable={isEditing}
            keyboardType="numeric"
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.labelText}>Phone No</Text>
          <TextInput
            style={[styles.input, !isEditing && styles.nonEditableInput]}
            placeholder="Enter phone number"
            value={phone}
            onChangeText={setPhone}
            editable={isEditing}
            keyboardType="phone-pad"
          />
        </View>

        <View style={styles.btnBox}>
          <TouchableOpacity
            style={[
              styles.btnContainer,
              !isFormValid && styles.disabledBtnContainer,
            ]}
            onPress={handleEdit}
            disabled={!isFormValid}
          >
            <Text style={styles.btnText}>{isEditing ? "Save" : "Edit"}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: "center",
    backgroundColor: "#fff",
  },
  avatarWrapper: {
    alignItems: "center",
    marginBottom: 20,
    position: "relative",
  },
  iconContainer: {
    position: "absolute",
    bottom: 0,
    right: 13,
    paddingLeft: 3,
    backgroundColor: "#f5f5f5",
    borderRadius: 50,
    borderWidth: 1,
    borderColor: "#f5f5f5",
  },
  inputContainer: {
    width: "100%",
    marginBottom: 15,
  },
  labelText: {
    marginBottom: 5,
    fontWeight: "600",
    fontSize: 16,
  },
  input: {
    borderRadius: 15,
    backgroundColor: "rgb(245 245 244)",
    padding: 10,
    width: "100%",
  },
  nonEditableInput: {
    color: "#666",
  },
  btnBox: {
    width: "100%",
    marginBottom: 10,
    marginTop: 20,
  },
  btnContainer: {
    width: "100%",
    padding: 12,
    borderRadius: 15,
    backgroundColor: "#d6001c",
  },
  disabledBtnContainer: {
    backgroundColor: "#aaa",
  },
  btnText: {
    fontWeight: "700",
    color: "#ffffff",
    textAlign: "center",
    fontSize: 18,
  },
});

export default UserProfile;
