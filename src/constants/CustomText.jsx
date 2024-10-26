import React from 'react';
import { Text, StyleSheet } from 'react-native';
import fonts from '../assets/fonts/font'
import font from '../assets/fonts/font';

const CustomText = ({ children, style }) => (
  <Text style={[styles.customFont, style]}>{children}</Text>
);

const styles = StyleSheet.create({
  customFont: {
    fontFamily: font.type.Tajawal,
  },
});

export default CustomText;