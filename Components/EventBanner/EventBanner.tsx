import React, { useEffect, useRef, useState } from "react";
import { View, Image, Dimensions, FlatList, StyleSheet } from "react-native";
import { getEventByStatus } from "../../Services/Events/eventService";
import { useAuth } from "../../Context/AuthContext";
import Toast from "react-native-toast-message";

function EventBanner() {
  const { token } = useAuth();
  const bannerRef = useRef<FlatList>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const screenWidth = Dimensions.get("window").width;
  const [bannerData, setBannerData] = useState([
    {
      id: 1,
      image: require("../../assets/ogBanner.png"),
    },
  ]);

  const RandomEvents = (events, max: number = 5) => {
    const shuffled = [...events].sort(() => Math.random() - 0.5);
    // Return up to max events
    return shuffled.slice(0, Math.min(events.length, Math.max(0, max)));
  };

  const getEventsData = async () => {
    try {
      const events = await getEventByStatus("upcoming", token);
      if (!!events.length) {
        const requiredData = events.map(({ id, image }) => ({
          id,
          image: { uri: image },
        }));
        const shuffledEvents = RandomEvents(requiredData);
        setBannerData(shuffledEvents);
      }
    } catch (error) {
      Toast.show({
        text1: "Error",
        text2: error.message,
        type: "error",
      });
    }
  };

  useEffect(() => {
    getEventsData();
  }, []);

  //Auto Scroll

  useEffect(() => {
    let interval = setInterval(() => {
      if (activeIndex === bannerData.length - 1) {
        bannerRef.current.scrollToIndex({
          index: 0,
          animated: true,
        });
      } else {
        bannerRef.current.scrollToIndex({
          index: activeIndex + 1,
          animated: true,
        });
      }
    }, 2000);

    return () => clearInterval(interval);
  });

  //getItemLayout

  const getItemLayout = (data, index) => ({
    length: screenWidth,
    offset: screenWidth * index,
    index: index,
  });

  //handles banner scroll

  const handleScroll = (event) => {
    const scrollPosition = event.nativeEvent.contentOffset.x;
    const index = Math.round(scrollPosition / screenWidth);
    if (index !== activeIndex) {
      setActiveIndex(index);
    }
  };

  //Dispalys Dot Indicators

  const renderDotIndicator = () => {
    return bannerData.map((item, index) => {
      const indicatorBg = activeIndex === index ? "#d6001c" : "#cccccc";
      return (
        <View
          key={index}
          style={[styles.indicator, { backgroundColor: indicatorBg }]}
        ></View>
      );
    });
  };

  // Displays Event Banners

  const renderBanner = ({ item, index }) => {
    return (
      <View>
        <Image
          source={{ uri: item.image.uri }}
          style={{ height: 250, width: screenWidth }}
        />
      </View>
    );
  };

  return (
    <View>
      <FlatList
        data={bannerData}
        ref={bannerRef}
        getItemLayout={getItemLayout}
        renderItem={renderBanner}
        keyExtractor={(item) => item.id}
        horizontal={true}
        pagingEnabled={true}
        onScroll={handleScroll}
        showsHorizontalScrollIndicator={false}
      />
      <View style={styles.indicatorContainer}>{renderDotIndicator()}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  indicatorContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
  },
  indicator: {
    height: 10,
    width: 10,
    borderRadius: 5,
    marginHorizontal: 6,
    marginTop: -30,
  },
});

export default EventBanner;
