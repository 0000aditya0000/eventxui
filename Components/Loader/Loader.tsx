import React from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';

type LoaderProps = {
  size?: 'small' | 'large';
  color?: string;
};

const Loader = ({ size = 'large', color = '#007AFF' }: LoaderProps) => (
  <View style={styles.container}>
    <ActivityIndicator size={size} color={color} />
  </View>
);

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.6)', // Optional overlay
    zIndex: 10,
  },
});

export default Loader;
