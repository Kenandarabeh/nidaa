import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import Backgound from '../../constants/Backgound';
import CustomButton from '../../constants/CustomButton';
import LottieView from "lottie-react-native";

// ../../assets/animation/Success.json"
// ../../assets/animation/Fail.json"
const UIConfirmation = ({ message, buttonText, navigationRoute ,type}) => {
  const navigation = useNavigation();
  const animationSource = type === "success" 
    ? require("../../assets/animation/Success.json")  
    : require("../../assets/animation/Faild.json")
  return (
    <Backgound >
        <View style={styles.container} >
          <LottieView
      source={animationSource}
      style={{width: "50%", height: "50%"}}
      loop={false}
      autoPlay
    />
      <Text style={styles.message}>{message}</Text>
      <CustomButton
      
        onPress={() => navigation.navigate(navigationRoute)}
      >   {buttonText}</CustomButton>
      </View>
    </Backgound>
    
  );
};

export default UIConfirmation;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding:20,
  },
  message: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: 'center',
    color:"white",
    fontFamily:"Tajawal-Bold"
  },
});
