import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  FlatList,
  StyleSheet,
  Pressable,
  ActivityIndicator,
} from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Ionicons from "react-native-vector-icons/Ionicons";
import Footer from "../Footer/Footer";
import { getBookedEventList } from "../../Services/User/userService";
import { useAuth } from "../../Context/AuthContext";
import Toast from "react-native-toast-message";
import { useFocusEffect } from "@react-navigation/native";

function MyBookings({ navigation, route }) {
  const { user, token } = useAuth();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const defaultImage = require("../../assets/default_event.jpg");

  const getEvents = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getBookedEventList(user.id, token);
      const trendingEvents = data?.event?.map((event) => {
        const startDate = new Date(event.event_start_date);
        const userId = user.id;
        const endDate = new Date(event.event_end_date);
        const schedule = `${startDate.toLocaleString("default", {
          month: "short",
        })} ${startDate.getDate()} | ${startDate.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        })} - ${endDate.toLocaleString("default", {
          month: "short",
        })} ${endDate.getDate()} | ${endDate.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        })}`;
        const image = event.image ? { uri: event.image } : defaultImage;
        return { ...event, schedule, image, userId };
      });
      setEvents(trendingEvents ?? []);
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

  useFocusEffect(
    React.useCallback(() => {
      getEvents();
    }, [token])
  );

  // Displays Event Cards

  const renderBanner = ({ item, index }) => {
    const EventPress = () => {
      navigation.navigate("ViewEvent", { eventData: item });
    };

    return (
      <View style={styles.cardContainer}>
        <View style={styles.card} key={index}>
          <Image
            source={item.image}
            style={styles.cardImage}
            resizeMode="cover"
          />
          <View style={styles.infoContainer}>
            <Text style={styles.eventText}>{item.event_name}</Text>
          </View>
          <View style={styles.infoContainer}>
            <Ionicons name="calendar-outline" size={22} color="#45474D" />
            <Text
              style={styles.infoText}
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              {item.schedule}
            </Text>
          </View>
          <View style={styles.infoContainer}>
            <Ionicons name="location-outline" size={22} color="#45474D" />
            <Text style={styles.infoText}>{item.location}</Text>
          </View>
          <Pressable style={styles.detailBtn} onPress={EventPress}>
            <Text style={styles.btnText}>Booked</Text>
          </Pressable>
        </View>
      </View>
    );
  };

  const NoBookings = () => (
    <View style={styles.noBookingsContainer}>
      <Ionicons
        name="calendar-outline"
        size={80}
        color="#e25822"
        style={styles.noBookingsIcon}
      />
      <Text style={styles.noBookingsTitle}>No Bookings Found</Text>
      <Text style={styles.noBookingsText}>
        You haven't booked any events yet. Explore events and book your first
        one!
      </Text>
    </View>
  );

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#d6001c" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {!events?.length ? (
        <NoBookings />
      ) : (
        <FlatList
          data={events}
          renderItem={renderBanner}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
          ListHeaderComponent={() => (
            <View style={styles.listHeaderContainer}>
              <MaterialCommunityIcons
                name="ticket-confirmation-outline"
                size={25}
                color="#e25822"
                style={{ paddingVertical: 4 }}
              />
              <Text style={styles.listHeader}>{route.name}</Text>
              <Text style={styles.listTotal}>({events?.length || 0})</Text>
            </View>
          )}
        />
      )}
      <View style={styles.footerContainer}>
        <Footer />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  listContent: {
    flexGrow: 1,
    paddingBottom: 180,
  },
  footerContainer: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    backgroundColor: "#ffffff",
  },
  cardContainer: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: "#ffffff",
  },
  card: {
    borderWidth: 1,
    borderColor: "#f0f1f2",
    borderRadius: 12,
    overflow: "hidden",
  },
  cardImage: {
    height: 200,
    width: "auto",
    marginBottom: 10,
  },
  infoContainer: {
    flexDirection: "row",
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  infoText: {
    fontSize: 14,
    color: "#45474D",
    fontWeight: "600",
    paddingLeft: 10,
  },
  eventText: {
    fontSize: 18,
    color: "#000000",
    fontWeight: "700",
  },
  detailBtn: {
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "#d6001c",
    marginHorizontal: 10,
    marginVertical: 15,
    paddingVertical: 8,
    backgroundColor: "#ffffff",
    borderRadius: 10,
  },
  btnText: {
    color: "#d6001c",
    textAlign: "center",
    fontSize: 16,
    fontWeight: "600",
  },
  listHeaderContainer: {
    flexDirection: "row",
    paddingTop: 15,
    paddingBottom: 10,
    paddingHorizontal: 10,
    backgroundColor: "#ffffff",
    borderBottomWidth: 1,
    borderStyle: "solid",
    borderBottomColor: "#f0f1f2",
  },
  listHeader: {
    fontSize: 24,
    fontWeight: "700",
    color: "#e25822",
    paddingHorizontal: 5,
  },
  listTotal: {
    fontSize: 24,
    color: "#45474D",
    fontWeight: "500",
    paddingHorizontal: 5,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  noBookingsContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 20,
    marginBottom: 100,
  },
  noBookingsIcon: {
    marginBottom: 20,
  },
  noBookingsTitle: {
    fontSize: 24,
    fontWeight: "700",
    color: "#e25822",
    marginBottom: 10,
  },
  noBookingsText: {
    fontSize: 16,
    color: "#45474D",
    textAlign: "center",
    lineHeight: 24,
  },
});

export default MyBookings;
