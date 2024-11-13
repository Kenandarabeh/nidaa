import React from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import Svg, { Defs, RadialGradient, Rect, Stop } from 'react-native-svg';

const Background = ({ 
  children, 
  style,
  centered = true,
  color = '#4332FF',
  useSafeArea = true,
  useGradient = true,
}) => {
  const renderBackground = () => {
    if (useGradient) {
      return (
        <Svg height="100%" width="100%" style={StyleSheet.absoluteFillObject}>
          <Defs>
            <RadialGradient
              id="grad"
              cx="50%"
              cy="50%"
              rx="50%"
              ry="50%"
              fx="50%"
              fy="50%"
              gradientUnits="userSpaceOnUse"
            >
              <Stop offset="87%" stopColor={color} stopOpacity="1" />
            </RadialGradient>
          </Defs>
          <Rect width="100%" height="100%" fill="url(#grad)" />
        </Svg>
      );
    }
    return null;
  };

  return (
    <View style={[
      styles.mainContainer,
      useSafeArea && styles.safeArea,
      { backgroundColor: color }
    ]}>
      <View style={[
        styles.container,
        centered && styles.centered,
        style
      ]}>
        {renderBackground()}
        {children}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  safeArea: {
    marginTop: Platform.OS === 'ios' ? 50 : 0,
    marginBottom: Platform.OS === 'ios' ? 34 : 0,
  },
  container: {
    flex: 1,
  },
  centered: {
    justifyContent: 'center',
    alignItems: 'center',
  }
});

export default Background;
