import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  StyleSheet,
  Pressable,
  ActivityIndicator
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Footer from '../Footer/Footer';
import { fetchEvents } from '../../Services/Events/eventService';
import { useAuth } from '../../Context/AuthContext';
import Toast from 'react-native-toast-message';

function EventList({ navigation, route }) {
  const { user, token } = useAuth();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const defaultImage = require("../../assets/default_event.jpg");

  useEffect(()=>{
    const getEvents = async () => {
      setLoading(true);
      try {
        const data = await fetchEvents(user.id, token);
        const trendingEvents =  data.filter(event => route.name=== "Trending Events" ? event.trending : event).map(event => {
          const startDate = new Date(event.event_start_date);
          const endDate = new Date(event.event_end_date);
          const schedule = `${startDate.toLocaleString('default', { month: 'short' })} ${startDate.getDate()} | ${startDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} - ${endDate.toLocaleString('default', { month: 'short' })} ${endDate.getDate()} | ${endDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
          const image = event.image ? { uri: `data:image/jpeg;base64,${event.image}` } : defaultImage
          return { ...event, schedule, image };
        });
        setEvents(trendingEvents)
      }
      catch(error){
        Toast.show({
          text1:"Error",
          text2: error.message,
          type: 'error',
        });
      }
      finally {
        setLoading(false);
      }
    };

    getEvents();
},[token])

  // Displays Event Cards

  const renderBanner = ({ item, index }) => {
    const EventPress = () => {
      navigation.navigate('ViewEvent', { eventData: item });
    };

    return (
      <View style={styles.cardContainer}>
        <View style={styles.card} key={index}>
          <Image
            source={item.image}
            style={styles.cardImage}
            resizeMode='cover'
          />
          <View style={styles.infoContainer}>
            <Text style={styles.eventText}>{item.event_name}</Text>
          </View>
          <View style={styles.infoContainer}>
            <Ionicons name='calendar-outline' size={22} color='#45474D' />
            <Text
              style={styles.infoText}
              numberOfLines={1}
              ellipsizeMode='tail'
            >
              {item.schedule}
            </Text>
          </View>
          <View style={styles.infoContainer}>
            <Ionicons name='location-outline' size={22} color='#45474D' />
            <Text style={styles.infoText}>
             {item.location}
            </Text>
          </View>
          <Pressable style={styles.detailBtn} onPress={EventPress}>
            <Text style={styles.btnText}>View detail</Text>
          </Pressable>
        </View>
      </View>
    );
  };

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#d6001c" />
      </View>
    );
  }

  return (
    <View>
      <FlatList
        data={events}
        renderItem={renderBanner}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={() => (
          <View style={styles.listHeaderContainer}>
            {route.name === 'Upcoming Events' ? (
              <Ionicons
                name='calendar-outline'
                size={25}
                color='#e25822'
                style={{ paddingVertical: 4 }}
              />
            ) : (
              <Ionicons
                name='flame-outline'
                size={25}
                color='#e25822'
                style={{ paddingVertical: 4 }}
              />
            )}
            <Text style={styles.listHeader}>All {route.name}</Text>
            <Text style={styles.listTotal}>({events.length})</Text>
          </View>
        )}
        ListFooterComponent={<Footer />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: '#ffffff',
  },
  card: {
    borderWidth: 1,
    borderColor: '#f0f1f2',
    borderRadius: 12,
    overflow: 'hidden',
  },
  cardImage: {
    height: 200,
    width: 'auto',
    marginBottom: 10,
  },
  infoContainer: {
    flexDirection: 'row',
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  infoText: {
    fontSize: 14,
    color: '#45474D',
    fontWeight: '600',
    paddingLeft: 10,
  },
  eventText: {
    fontSize: 18,
    color: '#000000',
    fontWeight: '700',
  },
  detailBtn: {
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: '#d6001c',
    marginHorizontal: 10,
    marginVertical: 15,
    paddingVertical: 8,
    backgroundColor: '#ffffff',
    borderRadius: 10,
  },
  btnText: {
    color: '#d6001c',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '600',
  },
  listHeaderContainer: {
    flexDirection: 'row',
    paddingTop: 15,
    paddingBottom: 10,
    paddingHorizontal: 10,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderStyle: 'solid',
    borderBottomColor: '#f0f1f2',
  },
  listHeader: {
    fontSize: 24,
    fontWeight: '700',
    color: '#e25822',
    paddingHorizontal: 5,
  },
  listTotal: {
    fontSize: 24,
    color: '#45474D',
    fontWeight: '500',
    paddingHorizontal: 5,
  },
   loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  noEventsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 20,
  },
  noEventsText: {
    fontSize: 16,
    color: '#45474D',
    fontWeight: '600',
  },
});

export default EventList;
