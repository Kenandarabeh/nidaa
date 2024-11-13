import React, { useState, useRef } from 'react';
import { View, Animated, PanResponder, StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

const CustomSwiper = ({ children, onIndexChange }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const position = useRef(new Animated.Value(0)).current;
  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (_, { dx, dy }) => {
        return Math.abs(dx) > Math.abs(dy);
      },
      onPanResponderMove: (_, { dx }) => {
        position.setValue(dx);
      },
      onPanResponderRelease: (_, { dx }) => {
        if (Math.abs(dx) > width * 0.4) {
          const newIndex = dx > 0 ? currentIndex - 1 : currentIndex + 1;
          if (newIndex >= 0 && newIndex < React.Children.count(children)) {
            Animated.spring(position, {
              toValue: dx > 0 ? width : -width,
              useNativeDriver: true,
            }).start(() => {
              setCurrentIndex(newIndex);
              position.setValue(0);
              onIndexChange?.(newIndex);
            });
          } else {
            Animated.spring(position, {
              toValue: 0,
              useNativeDriver: true,
            }).start();
          }
        } else {
          Animated.spring(position, {
            toValue: 0,
            useNativeDriver: true,
          }).start();
        }
      },
    })
  ).current;

  const animatedStyle = {
    transform: [{ translateX: position }],
  };

  return (
    <View style={styles.container}>
      <Animated.View 
        style={[styles.content, animatedStyle]} 
        {...panResponder.panHandlers}
      >
        {React.Children.map(children, (child, index) => (
          <View style={[styles.page, { display: index === currentIndex ? 'flex' : 'none' }]}>
            {child}
          </View>
        ))}
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    overflow: 'hidden',
  },
  content: {
    flex: 1,
    width: '100%',
  },
  page: {
    width: '100%',
    flex: 1,
  },
});

export default CustomSwiper;
