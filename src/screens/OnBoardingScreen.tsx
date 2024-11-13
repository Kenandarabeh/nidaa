
import React from 'react';
import { StyleSheet } from 'react-native';
import OnboardingSwiper from '../components/onboarding/OnboardingSwiper';

const OnBoardingScreen = ({ navigation }) => {
  const onboardingData = [
    {
      title: 'مرحباً بك في نداء',
      description: 'تطبيق نداء يساعدك في الإبلاغ عن الحالات الطارئة بسهولة وسرعة',
      image: require('../assets/images/onboarding/emergency.png')
    },
    {
      title: 'تحديد الموقع بدقة',
      description: 'يمكنك تحديد موقعك بدقة على الخريطة لضمان وصول المساعدة بسرعة',
      image: require('../assets/images/onboarding/location.png')
    },
    {
      title: 'متابعة مباشرة',
      description: 'تابع حالة نداءك والاستجابة له مباشرة عبر التطبيق',
      image: require('../assets/images/onboarding/tracking.png')
    }
  ];

  const handleFinish = () => {
    navigation.replace('Login');
  };

  return (
    <OnboardingSwiper 
      data={onboardingData}
      onFinish={handleFinish}
    />
  );
};

export default OnBoardingScreen;