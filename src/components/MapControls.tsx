
import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

export const MapControls: React.FC = () => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button}>
        <Icon name="my-location" size={24} color="#000" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.button}>
        <Icon name="layers" size={24} color="#000" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    right: 16,
    bottom: 100,
    backgroundColor: 'transparent',
  },
  button: {
    backgroundColor: 'white',
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 8,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
});