import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Pressable,
  Image,
  ScrollView,
} from "react-native";
import { CheckBox } from "react-native-elements";
import Ionicons from "react-native-vector-icons/Ionicons";
import DateTimePicker from "@react-native-community/datetimepicker";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";
import { createEvent, getGenre } from "../../Services/Events/eventService";
import { useAuth } from "../../Context/AuthContext";
import { Picker } from "@react-native-picker/picker";
import Toast from "react-native-toast-message";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Loader from "../Loader/Loader";

function AddEvent({ navigation }) {
  const [isLoading, setIsLoading] = useState(false);
  const [isChecked, setIsChecked] = useState(true);
  const [eventPhoto, setEventPhoto] = useState(null);
  const [title, setTitle] = useState("");
  const [startDate, setStartDate] = useState("");
  const [trending, setTrending] = useState(true);
  const [endDate, setEndDate] = useState("");
  const [eventStartDate, setEventStartDate] = useState(new Date());
  const [eventEndDate, setEventEndDate] = useState(new Date());
  const [fees, setFees] = useState("");
  const [genre, setGenre] = useState("");
  const [genreOptions, setGenreOptions] = useState([]);
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [showStartDatePicker, setShowStartDatePicker] = useState(false);
  const [showEndDatePicker, setShowEndDatePicker] = useState(false);
  const [base64Image, setBase64Image] = useState(null);
  const { token } = useAuth();
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    const getEventType = async () => {
      try {
        const getType = await getGenre(token);
        setGenreOptions(
          getType.map((genre) => ({ label: genre, value: genre }))
        );
      } catch (error) {
        Toast.show({
          text1: "Error",
          text2: error.message,
          type: "error",
        });
      }
    };

    getEventType();
  }, [token]);

  const handleImagePicker = async () => {
    const result = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!result.granted) {
      alert("Permission to access camera roll is required!");
      return;
    }
    const pickerResult = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!pickerResult.canceled) {
      const uri = pickerResult.assets[0].uri;
      setEventPhoto(uri);
      const base64 = await FileSystem.readAsStringAsync(uri, {
        encoding: FileSystem.EncodingType.Base64,
      });
      setBase64Image(base64);
    }
  };

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
    setTrending(false);
  };

  const toggleStartDatePicker = () => {
    setShowStartDatePicker(!showStartDatePicker);
  };

  const toggleEndDatePicker = () => {
    setShowEndDatePicker(!showEndDatePicker);
  };

  const defaultAvatar = require("../../assets/default_addEvent.png");

  const onStartDateChange = (event, selectedDate) => {
    if (event.type === "set") {
      const currentDate = selectedDate || eventStartDate;
      setEventStartDate(currentDate);
      toggleStartDatePicker();
      setStartDate(currentDate.toISOString().slice(0, 10));
    } else {
      toggleStartDatePicker();
    }
  };

  const onEndDateChange = (event, selectedDate) => {
    if (event.type === "set") {
      const currentDate = selectedDate || eventEndDate;
      setEventEndDate(currentDate);
      toggleEndDatePicker();
      setEndDate(currentDate.toISOString().slice(0, 10));
    } else {
      toggleEndDatePicker();
    }
  };

  const uploadImage = async () => {
    try {
      const formData = new FormData();
      formData.append("file", {
        uri: eventPhoto,
        type: "image/jpeg",
        name: "upload.jpg",
      } as any);
      formData.append(
        "upload_preset",
        `${process.env.EXPO_PUBLIC_IMAGE_PRESET}`
      );

      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${process.env.EXPO_PUBLIC_IMAGE_CLOUD}/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();
      setImageUrl(data.secure_url);
    } catch (error) {
      console.error("Upload error:", error);
    }
  };

  const handleSubmit = async () => {
    const loggedInUser = await AsyncStorage.getItem("loggedIn");
    await uploadImage();

    const parsedUser = JSON.parse(loggedInUser);

    const userId = parsedUser?.id;
    const data = {
      user_id: userId,
      event_name: title,
      location: location,
      event_start_date: startDate,
      event_end_date: endDate,
      description: description,
      registration_fee: fees,
      trending: trending,
      event_type: genre,
      image: imageUrl,
    };
    if (
      !title ||
      !location ||
      !description ||
      !startDate ||
      !endDate ||
      !fees ||
      !genre
    ) {
      Toast.show({
        text1: "Error",
        text2: "Please fill in all fields",
        type: "error",
      });
      return;
    } else {
      setIsLoading(true);
      try {
        const response = await createEvent(data, token);

        if (response.statusCode === 200) {
          setTitle("");
          setLocation("");
          setDescription("");
          setStartDate("");
          setEndDate("");
          setFees("");
          setGenre("");
          setEventPhoto(null);
          Toast.show({
            text1: "Success",
            text2: "Event Added Successfully",
            type: "success",
          });
          navigation.navigate("HomePage");
        } else {
          Toast.show({
            text1: "Error",
            text2: "Something went wrong!!!",
            type: "error",
          });
        }
      } catch (error) {
        Toast.show({
          text1: "Error",
          text2: error.message,
          type: "error",
        });
      } finally {
        setIsLoading(false);
      }
    }
  };

  const isDisabled =
    !title ||
    !startDate ||
    !endDate ||
    !location ||
    !description ||
    !fees ||
    !genre;

  return (
    <View style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={styles.container}>
      {(isLoading) && <Loader />}
        <View style={styles.sectionHeadingContainer}>
          <Ionicons
            name="add-circle-outline"
            size={25}
            color="#45474D"
            style={{ marginRight: 5 }}
          />
          <Text style={styles.sectionHeading}>Add Event</Text>
        </View>
        <View style={styles.avatarContainer}>
          <TouchableOpacity
            style={styles.avatarButton}
            onPress={handleImagePicker}
          >
            <Image
              source={eventPhoto ? { uri: eventPhoto } : defaultAvatar}
              style={styles.avatarImage}
            />
            <View style={styles.cameraIconContainer}>
              <Ionicons name="camera-outline" size={23} color="#fff" />
            </View>
          </TouchableOpacity>
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.labelText}>Title</Text>
          <TextInput
            style={[styles.input]}
            placeholder="Enter title"
            placeholderTextColor="black"
            value={title}
            onChangeText={(text) => {
              setTitle(text);
            }}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.labelText}>Start Date</Text>
          <Pressable onPress={toggleStartDatePicker}>
            <TextInput
              style={[styles.input]}
              placeholder="Select start date"
              placeholderTextColor="black"
              value={startDate}
              editable={false}
            />
          </Pressable>
          {showStartDatePicker && (
            <DateTimePicker
              mode="date"
              display="spinner"
              value={eventStartDate}
              onChange={onStartDateChange}
            />
          )}
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.labelText}>End Date</Text>
          <Pressable onPress={toggleEndDatePicker}>
            <TextInput
              style={[styles.input]}
              placeholder="Select end date"
              placeholderTextColor="black"
              value={endDate}
              editable={false}
            />
          </Pressable>
          {showEndDatePicker && (
            <DateTimePicker
              mode="date"
              display="spinner"
              value={eventEndDate}
              onChange={onEndDateChange}
            />
          )}
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.labelText}>Registration Fees</Text>
          <TextInput
            style={[styles.input]}
            placeholder="Enter Fees"
            placeholderTextColor="black"
            value={fees}
            keyboardType="numeric"
            onChangeText={(fees) => {
              setFees(fees);
            }}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.labelText}>Genre</Text>
          <View style={styles.picker}>
            <Picker
              selectedValue={genre}
              mode={"dropdown"}
              onValueChange={(itemValue) => setGenre(itemValue)}
            >
              <Picker.Item
                value=""
                label="Select Genre"
                enabled={false}
                style={styles.pickerItem}
              />
              {genreOptions.map((genreOption) => (
                <Picker.Item
                  key={genreOption.value}
                  label={genreOption.label}
                  value={genreOption.value}
                  style={styles.pickerItem}
                />
              ))}
            </Picker>
          </View>
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.labelText}>Location</Text>
          <TextInput
            style={[styles.input]}
            placeholder="Enter Location"
            placeholderTextColor="black"
            value={location}
            onChangeText={(text) => {
              setLocation(text);
            }}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.labelText}>Description</Text>
          <TextInput
            style={[styles.input]}
            placeholder="Enter description"
            placeholderTextColor="black"
            value={description}
            multiline
            numberOfLines={6}
            onChangeText={(text) => {
              setDescription(text);
            }}
          />
        </View>

        <View style={styles.checkboxContainer}>
          <View style={styles.checkbox}>
            <CheckBox
              checked={isChecked}
              onPress={handleCheckboxChange}
              checkedColor="black"
            />
            <Text style={styles.checkBoxtext}>Mark as trending</Text>
          </View>
        </View>

        <View style={styles.btnBox}>
          <TouchableOpacity
            style={{
              width: "100%",
              padding: 12,
              borderRadius: 15,
              backgroundColor: isDisabled ? "gray" : "#d6001c",
            }}
            onPress={handleSubmit}
            disabled={isDisabled}
          >
            <Text style={styles.btnText}>Add Event</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    alignItems: "flex-start",
    backgroundColor: "#fff",
  },
  avatarContainer: {
    alignItems: "center",
    marginBottom: 20,
    alignSelf: "center",
    borderColor: "grey",
    borderWidth: 0.5,
    borderRadius: 20,
  },
  avatarButton: {
    width: 350,
    height: 200,
    backgroundColor: "#f0f0f0",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
    borderColor: "#000",
  },
  avatarImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  cameraIconContainer: {
    position: "absolute",
    bottom: 10,
    right: 10,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    borderRadius: 20,
    padding: 5,
  },
  sectionHeadingContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    justifyContent: "flex-start",
  },
  sectionHeading: {
    fontSize: 24,
    fontWeight: "bold",
    marginLeft: 10,
  },
  labelText: {
    marginBottom: 5,
    fontWeight: "600",
    fontSize: 16,
    color: "#000",
  },
  inputContainer: {
    width: "100%",
    marginBottom: 15,
  },
  input: {
    borderRadius: 15,
    backgroundColor: "rgb(245 245 244)",
    padding: 10,
    width: "100%",
    color: "#000",
  },
  checkboxContainer: {
    flexDirection: "row",
    marginLeft: -10,
  },
  checkbox: {
    flexDirection: "row",
    alignItems: "center",
  },
  checkBoxtext: {
    fontSize: 16,
    marginLeft: -20,
  },
  btnBox: {
    width: "100%",
    marginBottom: 10,
    marginTop: 20,
  },
  btnText: {
    fontWeight: "700",
    color: "#ffffff",
    textAlign: "center",
    fontSize: 18,
  },
  picker: {
    width: "100%",
    backgroundColor: "#f0f0f0",
    borderRadius: 15,
  },
  pickerItem: {
    fontSize: 14,
  },
});

export default AddEvent;
