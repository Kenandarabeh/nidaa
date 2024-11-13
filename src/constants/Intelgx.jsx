import React from 'react';
import { View, Image, StyleSheet } from 'react-native';

const Intelgx = () => {
  return (
    <View style={styles.container}>
      <Image 
        source={require('../assets/images/intelgx.png')} 
        style={styles.image} 
        resizeMode="contain" 
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 0,
  },
  image: {
    width: 50,
    height: 50,
  },
});

export default Intelgx;