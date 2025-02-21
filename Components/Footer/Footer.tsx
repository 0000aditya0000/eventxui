import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const Footer = () => {
  return (
    <View style={styles.container}>
      <Image
        source={require('../../assets/eventx-logo.png')}
        style={styles.image}
        resizeMode='contain'
      />
      <Text style={styles.footerText}>
        EventX is a NashTech event management platform where you can register
        for the exciting upcoming events, find your dream events and many more.
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: '#d6001c',
    boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.10)',
    paddingVertical: 30,
  },
  image: {
    height: 70,
    width: 150,
    tintColor: '#ffffff',
  },
  footerText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
  },
});

export default Footer;
