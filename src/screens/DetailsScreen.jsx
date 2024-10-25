import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import CustomText from '../constants/CustomText'; // Adjust the path as necessary

const DetailsScreen = () => {
  return (
    <View style={styles.container}>
      <Icon name="info-circle" size={30} color="#000" />
      <CustomText text="Details Screen" style={styles.title} />
      <Text style={styles.description}>
        This is a simple details screen with a custom font and an icon.
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  title: {
    fontSize: 24,
    marginVertical: 16,
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
  },
});

export default DetailsScreen;