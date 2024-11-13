import React from 'react';
import { StyleSheet, Image, Dimensions, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import Swiper from 'react-native-swiper';
import OnBoarding from '../components/OnBoarding';
import Background from '../constants/Background';
import Page1 from '../assets/images/Page1.png';
import Page2 from '../assets/images/Page2.png';
import Page3 from '../assets/images/Page3.png';

const { width: w, height: h } = Dimensions.get('window');

const styles = StyleSheet.create({
  slide: {
    flex: 1,
    paddingTop: 80,
    marginHorizontal: 30,
  },
  img: {
    alignSelf: 'center',
    borderTopRightRadius: 80,
    borderBottomLeftRadius: 80,
    height: h * 0.5,
    width: w * 0.9,
  },
  title: {
    fontFamily: 'YourRegularFont', // استبدل بخطك الخاص
    marginTop: 60,
    marginHorizontal: 10,
    fontSize: 32,
  },
  text: {
    color: '#767676',
    fontFamily: 'YourRegularFont', // استبدل بخطك الخاص
    marginTop: 20,
    fontSize: 16,
    lineHeight: 25,
    marginLeft: 10,
  },
});


const data = [
    {
        _id: '1',
        title: 'Live The Life',
        description: 'In our daily lives, we often rush tasks trying to get them finish.',
        image: (
            <Image
                source={ Page1 }
            />
        ),
    },
    {
        _id: '2',
        title: 'Capture The Moment',
        description: 'You are not alone. You have unique ability to go to another world.',
        image: (
            <Image
                source={Page2}
            />
        ),
    },    {
        _id: '3',
        title: 'Capture The Moment',
        description: 'You are not alone. You have unique ability to go to another world.',
        image: (
            <Image
                source={Page3}
            />
        ),
    },
];
const OnBoardingScreen = ({navigation}) => {

    const handleFinish = () => {
        navigation.replace('Selection');
    }
  return (
    <Background
    showBack={true}
    headerTitle={"OnBoarding"}
    onPrevPress={()=>{}}
    
    // This will now work correctly
>
    <OnBoarding
      data={data}
      buttonBackgroundColor="white"
      buttonIconColor="blue"
      dotBackgroundColor="white"
      onFinish={handleFinish}
    /></Background>
  );
};

export default OnBoardingScreen;