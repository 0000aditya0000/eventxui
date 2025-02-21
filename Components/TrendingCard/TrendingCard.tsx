import React, { useState, useEffect } from 'react';
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
import { fetchEvents } from '../../Services/Events/eventService';
import { useAuth } from '../../Context/AuthContext';
import Toast from 'react-native-toast-message';

function TrendingCard({navigation}) {
  const {user, token} = useAuth();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const defaultImage = require('../../assets/default_event.jpg');
  
  useEffect(() => {
    const getEvents = async () => {
      setLoading(true);
      try {
        const data = await fetchEvents(user.id, token);
        const trendingEvents = data.filter(event => event.trending).map(event => {
          const userId = user.id;
          const startDate = new Date(event.event_start_date);
          const endDate = new Date(event.event_end_date);
          const schedule = `${startDate.toLocaleString('default', { month: 'short' })} ${startDate.getDate()} | ${startDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} - ${endDate.toLocaleString('default', { month: 'short' })} ${endDate.getDate()} | ${endDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
          const image = event.image ? { uri: `data:image/jpeg;base64,${event.image}` } : defaultImage;
          return { ...event, schedule, image, userId };
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
  }, [token]);

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
            resizeMode='cover'
          />
          <View style={styles.trendingLabel}>
            <Text style={styles.trendingLabelText}>TRENDING</Text>
          </View>
          <View style={styles.infoContainer}>
            <Text style={styles.eventText}>{item.event_name}</Text>
          </View>
          <View style={styles.infoContainer}>
            <Ionicons name='calendar-outline' size={22} color='#45474D' />
            <Text style={styles.infoText} numberOfLines={1} ellipsizeMode='tail'>{item.schedule}</Text>
          </View>
          <View style={styles.infoContainer}>
            <Ionicons name='location-outline' size={22} color='#45474D' />
            <Text style={styles.infoText}>{item.location}</Text>
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
      {events.length === 0 ? (
        <View style={styles.noEventsContainer}>
          <Text style={styles.noEventsText}>No events trending</Text>
        </View>
      ) : (
        <FlatList
          data={events}
          renderItem={renderBanner}
          keyExtractor={(item) => item.id}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    paddingHorizontal: 10,
  },
  card: {
    borderWidth: 1,
    borderColor: '#f0f1f2',
    borderRadius: 12,
    overflow: 'hidden',
    maxWidth: 300,
    position: 'relative',
  },
  cardImage: {
    height: 250,
    width: 300,
    marginBottom: 10,
  },
  trendingLabel: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: '#d6001c',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
  },
  trendingLabelText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 12,
  },
  infoContainer: {
    flexDirection: 'row',
    paddingHorizontal: 10,
    paddingVertical: 5,
    alignItems:"center"
  },
  infoText: {
    fontSize: 14,
    color: '#45474D',
    fontWeight: '600',
    paddingLeft: 10,
    paddingRight:10,
    flexShrink:1,
    width:400
  },
  eventText: {
    fontSize: 18,
    color: '#000000',
    fontWeight: 'bold',
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

export default TrendingCard;
