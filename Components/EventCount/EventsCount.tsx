import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  FlatList,
} from 'react-native';
import { Dimensions } from 'react-native';
import { filterEvent } from '../../Services/Admin/adminService';
import Toast from 'react-native-toast-message';

const filterTypes = [
  {
    type: 'all', title: 'All Events', image: {
      uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT7iBmlDWxRBOOd8quASCE6_2x6e-kfV_atEg&s',
    }
  },
  {
    type: 'past', title: 'Past Events',
    image: {
      uri: 'https://img.freepik.com/premium-vector/spotlights-isolated-black-background-vector-light-effect-empty-place-show-white-projectors_185386-1002.jpg',
    }
  },
  {
    type: 'upcoming', title: 'Ongoing Events',
    image: {
      uri: 'https://1001freedownloads.s3.amazonaws.com/vector/thumb/314783/9c0f06b1588f53247088c1242b7b639b-realistic-blue-stage-light-background.jpg',
    }
  },
  {
    type: 'trending', title: 'Trending Events',
    image: {
      uri: 'https://t3.ftcdn.net/jpg/01/03/07/72/240_F_103077204_dmTb2AJvMgTqjwyPlFYft2sIgYR1jLMD.jpg',
    }
  },
];

function EventsCount() {
  const [infoData, setInfoData] = useState([]);

  useEffect(() => {
    const fetchAllEvents = async () => {
      try {
        const allEventsData = await Promise.all(
          filterTypes.map(async (filter) => {
            const data = await filterEvent(filter.type);
            return {
              title: filter.title,
              count: data.count,
              image: filter.image,
            };
          })
        );
        setInfoData(allEventsData);
      } catch (error) {
        Toast.show({
          text1:"Error",
          text2: error.message,
          type: 'error',
        });      
      }
    };

    fetchAllEvents();
  }, []);

  const renderCard = ({ item, index }) => {

    return (
      <View style={styles.cardContainer}>
        <ImageBackground source={item.image} style={styles.imageBgContainer}>
          <View style={styles.card} key={index}>
            <Text style={styles.titleText}>{item.title}</Text>
            <Text style={styles.countText}>{item.count}</Text>
          </View>
        </ImageBackground>
      </View>
    );
  };


  return (
    <FlatList
      data={infoData}
      renderItem={renderCard}
      contentContainerStyle={{ alignItems: 'center' }}
      columnWrapperStyle={{ flexWrap: 'wrap' }}
      numColumns={2}
      scrollEnabled={false}
    />
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
    height: 100,
    width: (Dimensions.get('window').width - 16 * 3) / 2,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
    maxWidth: 330,
  },
  imageBgContainer: {
    borderWidth: 1,
    borderColor: '#f0f1f2',
    borderRadius: 12,
    backgroundColor: '#ff1a1a',
    marginTop: 16,
    height: 100,
    width: (Dimensions.get('window').width - 16 * 3) / 2,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },
  countText: {
    fontSize: 30,
    color: '#ffffff',
    fontWeight: '700',
    paddingTop: 10,
  },
  titleText: {
    fontSize: 20,
    color: '#ffffff',
    fontWeight: '700',
  },
  sectionHeading: {
    fontSize: 24,
    fontWeight: '700',
    marginHorizontal: 15,
    marginTop: 10,
    marginBottom: 10,
  },
  genreChartContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 25,
  },
});

export default EventsCount;
