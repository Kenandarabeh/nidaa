
import React from 'react';
import { View, Text, StyleSheet, Image, useWindowDimensions, TouchableOpacity } from 'react-native';
import Animated, { interpolateColor } from 'react-native-reanimated';
import Swiper from 'react-native-swiper';

const OnboardingSwiper = ({ data, onFinish }) => {
  const { width } = useWindowDimensions();

  const renderItem = (item, index) => {
    return (
      <View style={[styles.slide, { width }]} key={index}>
        <Image 
          source={item.image} 
          style={styles.image}
          resizeMode="contain"
        />
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.description}>{item.description}</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Swiper
        style={styles.wrapper}
        loop={false}
        dotStyle={styles.dot}
        activeDotStyle={styles.activeDot}
        showsButtons={false}
      >
        {data.map((item, index) => renderItem(item, index))}
      </Swiper>
      <TouchableOpacity 
        style={styles.skipButton} 
        onPress={onFinish}
      >
        <Text style={styles.skipText}>تخطي</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  wrapper: {},
  slide: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  image: {
    width: '80%',
    height: '50%',
    marginBottom: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2C3E50',
    textAlign: 'center',
    marginBottom: 10,
    fontFamily: 'Cairo-Bold',
  },
  description: {
    fontSize: 16,
    color: '#7F8C8D',
    textAlign: 'center',
    paddingHorizontal: 20,
    lineHeight: 24,
    fontFamily: 'Cairo-Regular',
  },
  dot: {
    backgroundColor: 'rgba(74, 144, 226, 0.3)',
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 4,
  },
  activeDot: {
    backgroundColor: '#4A90E2',
    width: 20,
    height: 8,
    borderRadius: 4,
  },
  skipButton: {
    position: 'absolute',
    top: 40,
    right: 20,
    padding: 10,
  },
  skipText: {
    color: '#4A90E2',
    fontSize: 16,
    fontFamily: 'Cairo-Bold',
  },
});

export default OnboardingSwiper;