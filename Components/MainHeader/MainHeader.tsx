import React, {useState, useEffect} from 'react';
import { View, Image, StyleSheet, StatusBar, Platform, TouchableOpacity, Alert } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Avatar } from 'react-native-elements';
import { useAuth } from '../../Context/AuthContext';
import { getUser } from '../../Services/User/userService';
import { useUserProfile } from '../../Context/UserContext';

const MainHeader = (props) => {
const {user, token} = useAuth();
const defaultImage = require("../../assets/profile.png");
const { profileImage, updateProfileImage } = useUserProfile();

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const userDetails = await getUser(user.id, token);
        updateProfileImage(userDetails.image)
      } catch (error) {
        Alert.alert('Error', 'Failed to fetch user details');
      }
    };

    fetchUserDetails();
  },[profileImage,token]);
  return (
    <View style={styles.container}>
      <Image
        source={require('../../assets/eventx-logo.png')}
        style={styles.image}
        resizeMode='contain'
      />
      {props.isStack ? (
        <Ionicons
          style={styles.icon}
          name='arrow-back-circle'
          size={30}
          color='#ffffff'
          onPress={() => props.navigation.goBack()}
        />
      ) : (
        <TouchableOpacity onPress={() => props.navigation.openDrawer()}>
          <View style={styles.avatarContainer}>
            <Avatar
              rounded
              size={30}
              source={profileImage ?  { uri: `data:image/jpeg;base64,${profileImage}` } : defaultImage}
              containerStyle={styles.avatar}
            />
          </View>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
    backgroundColor: '#d6001c',
    boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.10)',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  image: {
    height: 70,
    width: 150,
    tintColor: '#ffffff',
  },
  icon: {
    color: '#ffffff',
  },
  avatarContainer: {
    borderWidth: 2,
    borderColor: '#ffffff',
    borderRadius: 20,
    padding: 1,
    marginRight:10
  },
  avatar: {
    marginRight: 0,
  },
});

export default MainHeader;
