import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import Backgound from '../../constants/Backgound';
import CustomButton from '../../constants/CustomButton';
import LottieView from "lottie-react-native";


const UIConfirmation = ({ message, buttonText, navigationRoute }) => {
  const navigation = useNavigation();

  return (
    <Backgound >
        <View style={styles.container} >
          <LottieView
      source={require("../../assets/animation/success.json")}
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
