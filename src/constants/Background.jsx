import React from 'react';
import { View, StyleSheet, ImageBackground } from 'react-native';
import starsImage from '../assets/images/stars_2.png';
import LinearGradient from 'react-native-linear-gradient';

const Background = ({ children, style }) => {
  return (
      <LinearGradient
        colors={['rgba(0, 49, 67, 1)', '#0088bb']}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 0.35 }}
        style={styles.overlay}
      >
        <ImageBackground source={starsImage} style={styles.page}>
          {children}
        </ImageBackground>
      </LinearGradient>
  );
};

const styles = StyleSheet.create({

  overlay: {
    flex: 1,
  },
  page: {
    flex: 1,
  },
});

export default Background;