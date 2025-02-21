import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Pressable, Image, TouchableOpacity, Alert, Linking, ScrollView, Dimensions } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import EvilIcons from "react-native-vector-icons/EvilIcons";
import { registerUserEvent, getSingleEvent } from "../../Services/Events/eventService";
import { useAuth } from '../../Context/AuthContext';
import Toast from "react-native-toast-message";

const ViewEvent = ({ navigation, route }) => {
  const { token } = useAuth();
  const { eventData } = route.params;
  const [isRegistered, setIsRegistered] = useState(eventData.is_registered);

  useEffect(() => {
    const getEvents = async () => {
      try {
        const data = await getSingleEvent(eventData.id,eventData.userId, token);
        const registerEvent = data.map((event)=>{setIsRegistered(event.is_register)})
      }
      catch(error){
        Toast.show({
          text1:"Error",
          text2: error.message,
          type: 'error',
        });      
      }
    };

    getEvents();
  }, [eventData]);

  const handleRegisterEvent = async () => {
    try {
      const response = await registerUserEvent({
        event_id: eventData.id,
        user_id: eventData.userId,
      }, token);
      
      setIsRegistered(true);
      Toast.show({
        text1:"Success",
        text2: "You have successfully registered for the event.",
        type: 'success',
      });
    } catch (error) {
      Toast.show({
        text1:"Error",
        text2: error.message,
        type: 'error',
      });
    }
  };

  const openMaps = () => {
    const query = `${eventData.location}`;
    const url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
    Linking.openURL(url).catch(err => {
      Alert.alert('Error', 'Failed to open Google Maps');
    });
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <Image source={eventData.image} style={styles.image} resizeMode="cover" />
        <View style={styles.insideContainer}>
          <Text style={styles.eventName}>{eventData.event_name} | {eventData.location}</Text>

          <View style={styles.infoContainer}>
            <Ionicons name="bookmark-outline" size={22} color="#45474D" />
            <Text style={styles.text}>{eventData.event_type}</Text>
          </View>

          <View style={styles.infoContainer}>
            <Ionicons name="calendar-outline" size={22} color="#45474D" />
            <Text style={styles.text}>{eventData.schedule}</Text>
          </View>

          <TouchableOpacity onPress={openMaps}>
            <View style={styles.infoContainer}>
              <Ionicons name="location-outline" size={22} color="#45474D" />
              <Text style={styles.text}>{eventData.location}</Text>
              <EvilIcons name="external-link" size={28} color="#000" />
            </View>
          </TouchableOpacity>

          <Text style={styles.aboutEvent}>About the Event</Text>
          <Text style={styles.text}>{eventData.description}</Text>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        {isRegistered ?
        <View style={styles.footerRegisterDisabled}>
          <Pressable style={[styles.footerButton, styles.disabledButton]} >
            <Text style={[styles.footerButtonText, styles.disabledButton]}>Registered </Text>
          </Pressable>
        </View>
        :
        <View style={styles.footerRegister}>
          <View style={styles.registerText}>
            <Ionicons name="wallet-outline" size={22} color="#45474D" />
            <Text style={styles.footerText}>₹ {eventData.registration_fee}</Text>
          </View>
          <Pressable style={styles.footerButton} onPress={handleRegisterEvent}>
            <Text style={styles.footerButtonText}>Register Now</Text>
          </Pressable>
        </View>}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "flex-start",
    justifyContent: "flex-start",
  },
  image: {
    width: Dimensions.get('window').width,
    height: 200,
  },
  insideContainer: {
    flex: 1,
    alignItems: "flex-start",
    justifyContent: "flex-start",
    marginLeft: 10,
    paddingVertical: 20,
    marginBottom: 100,
  },
  eventName: {
    fontSize: 24,
    fontWeight: "bold",
    marginHorizontal: 2,
    marginBottom: 16,
  },
  aboutEvent: {
    fontSize: 20,
    fontWeight: "bold",
    marginHorizontal: 2,
    marginVertical: 16,
  },
  venueDate: {
    fontSize: 18,
    marginTop: 8,
  },
  infoContainer: {
    flexDirection: "row",
    paddingHorizontal: 4,
    marginVertical: 10,
    gap: 15,
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    letterSpacing: 0.25,
  },
  footer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "white",
    paddingVertical: 20,
    elevation: 10,
  },
  footerRegister: {
    flexDirection: "row",
    gap: 15,
    alignItems: "center",
    marginHorizontal: 20,
    justifyContent: 'space-between'
  },
  footerRegisterDisabled:{
    flexDirection:'row',
    marginLeft:'auto',
    marginHorizontal: 20,
  },
  footerText: {
    fontWeight: "bold",
    fontSize: 20,
  },
  registerText: {
    width: '30%',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15
  },
  footerButton: {
    backgroundColor: "#d6001c",
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 10,
    elevation: 3,
  },
  footerButtonText: {
    fontWeight: "bold",
    fontSize: 20,
    color: "#fff",
  },
  disabledButton: {
    backgroundColor: "#cccccc",
  },
  disabledButtonText: {
    color: "#666666",
  },
});

export default ViewEvent;
