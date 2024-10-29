import React from 'react';
import { View, StyleSheet,Text } from 'react-native';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import { Circle } from 'react-native-svg';


const CircularProgressbar = ({ progress=0}) => {

  return (
    <View style={styles.container}>



<AnimatedCircularProgress
  childrenContainerStyle={styles.test}
  rotation={- 360}
  lineCap="round"
  delay={500}
  duration={2000}
  size={200}
  width={15}
  fill={progress}
  tintColor="#bb2124"
  backgroundColor="#3d5875"
  tintColorSecondary="#22bb33"
  >
  {
    (fill) => (
      <Text>
        { progress }/100
      </Text>
    )
  }
</AnimatedCircularProgress>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 20,
  },

  
});

export default CircularProgressbar;