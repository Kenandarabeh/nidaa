import React from 'react';
import { View, StyleSheet, Platform, StatusBar } from 'react-native';

const CustomSafeAreaView = ({ children, style }) => {
  return (
    <View style={[styles.safeArea, style]}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
});

export default CustomSafeAreaView;