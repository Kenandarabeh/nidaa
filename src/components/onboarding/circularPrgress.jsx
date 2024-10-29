import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { AnimatedCircularProgress } from 'react-native-circular-progress';

const CircularProgressbar = ({ progress = 0 }) => {
  return (
    <View style={styles.container}>
      <AnimatedCircularProgress
        childrenContainerStyle={styles.test}
        rotation={-360}
        lineCap="round"
        delay={500}
        duration={2000}
        size={200}
        width={15}
        fill={progress}
        tintColor="#FF474D"
        tintColorSecondary="#5ce600"
        backgroundColor="#3d5875"
      >
        {(fill) => (
           <Text style={styles.progressText}>
           {progress}
           <Text style={styles.totalText}>/100</Text>
         </Text>
        )}
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
  progressText: {
    fontSize: 50,
    color: 'white',
    fontFamily:"Tajawal-Bold"
  },
  totalText:{
    fontSize: 20,
    color: 'white',
    fontFamily:"Tajawal-Bold"
  }
});

export default CircularProgressbar;
