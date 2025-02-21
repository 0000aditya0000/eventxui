import React from 'react';
import { View, Text, ImageBackground, Image, StyleSheet } from 'react-native';
import {
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';

function CustomDrawer(props) {
  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView
        {...props}
        contentContainerStyle={{ paddingTop: 0 }}
      >
        <ImageBackground
          source={require('../../assets/navBg.jpg')}
          style={{ padding: 20, height: 170 }}
        >
          <Image
            source={require('../../assets/nashTech-logo-red.svg')}
            style={styles.logoImage}
          />
          <Text style={styles.primaryHeading}>EventX</Text>
          <Text style={styles.secondaryHeading}>Live The Event</Text>
        </ImageBackground>
        <View style={styles.drawerViewContainer}>
          <DrawerItemList {...props} />
        </View>
      </DrawerContentScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  logoImage: {
    height: 50,
    width: 50,
    marginBottom: 10,
    marginTop: 20,
  },
  primaryHeading: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '600',
  },
  secondaryHeading: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '600',
  },
  drawerViewContainer: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 10,
  },
});

export default CustomDrawer;
