import React from 'react';
import { Text, StyleSheet } from 'react-native';

const CustomText = ({ children, style }) => (
  <Text style={[styles.customFont, style]}>{children}</Text>
);

const styles = StyleSheet.create({
  customFont: {
    fontFamily: 'Tajawal',
  },
});

export default CustomText;