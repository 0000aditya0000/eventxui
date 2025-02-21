import React, { useEffect, useRef, useState } from 'react';
import { View, Image, Dimensions, FlatList, StyleSheet } from 'react-native';

function EventBanner() {
  const bannerRef = useRef<FlatList>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const screenWidth = Dimensions.get('window').width;
  const bannerData = [
    {
      id: 1,
      image: require('../../assets/ogBanner.png'),
    },
    {
      id: 2,
      image: require('../../assets/event2.jpg'),
    },
    {
      id: 3,
      image: require('../../assets/ogBanner.png'),
    },
    {
      id: 4,
      image: require('../../assets/event1.jpg'),
    },
  ];

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
      const indicatorBg = activeIndex === index ? '#d6001c' : '#cccccc';
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
          source={item.image}
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
    flexDirection: 'row',
    justifyContent: 'center',
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
