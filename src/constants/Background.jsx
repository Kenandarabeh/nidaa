import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Image, Dimensions, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import helalImage from '../assets/images/Helal.png';
import LinearGradient from 'react-native-linear-gradient';

const { width: initialWidth, height: initialHeight } = Dimensions.get('window');

const generateRandomStars = (numStars, startHeight, endHeight, width) => {
  let stars = [];
  for (let i = 0; i < numStars; i++) {
    let starSize = Math.random() * 2 + 0.5; // Random size between 0.5 and 2.5
    let top = Math.random() * (endHeight - startHeight) + startHeight;
    let left = Math.random() * width;

    stars.push({
      top,
      left,
      size: starSize,
    });
  }
  return stars;
};

const Star = React.memo(({ star }) => (
  <View
    style={{
      position: 'absolute',
      top: star.top,
      left: star.left,
      width: star.size,
      height: star.size,
      backgroundColor: 'white',
      borderRadius: star.size / 2,
    }}
  />
));

const Background = ({ children, style }) => {
  const numStars = 50; // تقليل عدد النجوم المولدة في البداية
  const [stars, setStars] = useState([]);
  const [contentHeight, setContentHeight] = useState(initialHeight);
  const [dimensions, setDimensions] = useState({ width: initialWidth, height: initialHeight });

  useEffect(() => {
    const fetchStars = async () => {
      try {
        const storedDimensions = await AsyncStorage.getItem('dimensions');
        const storedStars = await AsyncStorage.getItem('stars');
        if (storedDimensions && storedStars) {
          const parsedDimensions = JSON.parse(storedDimensions);
          const parsedStars = JSON.parse(storedStars);
          if (parsedDimensions.width === dimensions.width && parsedDimensions.height === dimensions.height) {
            setStars(parsedStars);
            return;
          }
        }
        const newStars = generateRandomStars(numStars, 0, contentHeight, dimensions.width);
        setStars(newStars);
        await AsyncStorage.setItem('stars', JSON.stringify(newStars));
        await AsyncStorage.setItem('dimensions', JSON.stringify(dimensions));
      } catch (error) {
        console.error('Failed to load stars from AsyncStorage', error);
      }
    };

    fetchStars();
  }, [dimensions,contentHeight]);

  useEffect(() => {
    if (contentHeight > dimensions.height) {
      const newStars = generateRandomStars(numStars, dimensions.height, contentHeight, dimensions.width);
      setStars((prevStars) => {
        const updatedStars = [...prevStars, ...newStars];
        AsyncStorage.setItem('stars', JSON.stringify(updatedStars));
        return updatedStars;
      });
    }
  }, [contentHeight, dimensions]);

  useEffect(() => {
    const handleDimensionChange = ({ window }) => {
      setDimensions({ width: window.width, height: window.height });
    };

    const subscription = Dimensions.addEventListener('change', handleDimensionChange);

    return () => {
      subscription?.remove();
    };
  }, []);

  const handleContentSizeChange = (w, h) => {
    setContentHeight(h);
  };

  return (
    <LinearGradient
      colors={['rgba(0, 49, 67, 1)', '#0088bb']}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 0.35 }}
      style={styles.overlay}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        onContentSizeChange={handleContentSizeChange}
      >
        <View style={[styles.starsOverlay, { height: contentHeight }]}>
          {stars.map((star, index) => (
            <Star key={index} star={star} />
          ))}
        </View>
        <Image source={helalImage} style={styles.helal} />
        <View style={[styles.content, style]}>
          {children}
        </View>
      </ScrollView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
  },
  starsOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: 'transparent',
    zIndex: 1,
  },
  helal: {
    position: 'absolute',
    top: 68,
    left: 10,
    width: initialWidth * 0.15, // Responsive width
    height: initialWidth * 0.15, // Responsive height
    zIndex: 2,
    transform: [{ rotate: '220deg' }],
  },
  content: {
    flex: 1,
    zIndex: 3,
  },
});

export default Background;