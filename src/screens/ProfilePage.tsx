import React, { useState } from 'react';
import { StyleSheet, View, Image, ScrollView, useWindowDimensions } from 'react-native';
import Background from '../constants/Background';
import logo from '../assets/images/logo.png';
import Header from '../components/Header';
import CustomTextInput from '../constants/CustomTextInput';
import CustomButton from '../constants/CustomButton';

// Constants
const INPUT_FIELDS = [
  { id: 'secretKey', placeholder: 'Sofizpay Secret Key', secure: true },
  { id: 'email', placeholder: 'Email Address', secure: false },
  { id: 'phone', placeholder: 'Phone Number', secure: false },
  { id: 'address', placeholder: 'Address', secure: false },
];

const ProfilePage = () => {
  const { width: screenWidth, height: screenHeight } = useWindowDimensions();
  const isLandscape = screenWidth > screenHeight;
  
  // Dynamic calculations
  const headerHeight = screenHeight * (isLandscape ? 0.25 : 0.25);
  const logoSize = calculateLogoSize(screenWidth);

  // State
  const [formData, setFormData] = useState({
    secretKey: '',
    email: '',
    phone: '',
    address: '',
  });

  // Handlers
  const handleInputChange = (id: string, value: string) => {
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  return (
    <Background color='white'>
      <View style={styles.mainContainer}>
        {/* Header Section */}
        <View style={[styles.headerSection, { height: headerHeight }]}>
          <Header showPrevOnly showPrev/>
          <View style={[styles.logoWrapper, { 
            width: logoSize, 
            height: logoSize, 
            borderRadius: logoSize / 2 
          }]}>
            <Image style={styles.logo} source={logo} />
          </View>
        </View>

        {/* Form Section */}
        <View style={styles.formSection}>
          <ScrollView 
            contentContainerStyle={styles.scrollWrapper}
            bounces={false}
            showsVerticalScrollIndicator={false}
          >
            <View style={styles.inputContainer}>
              {INPUT_FIELDS.map((field) => (
                <CustomTextInput
                  key={field.id}
                  placeholder={field.placeholder}
                  value={formData[field.id as keyof typeof formData]}
                  onChangeText={(value) => handleInputChange(field.id, value)}
                  secureTextEntry={field.secure}
                  showPasswordToggle={field.secure}
                />
              ))}
            </View>
          </ScrollView>
        </View>

        {/* Footer Section */}
        <View style={styles.footerSection}>
          <CustomButton 
            onPress={() => console.log('PhoneSignIn')}
            style={styles.button}
          >
            {'SignInWithPhone'}
          </CustomButton>
        </View>
      </View>
    </Background>
  );
};

// Utility functions
const calculateLogoSize = (screenWidth: number) => {
  const baseSize = 150;
  const scaleFactor = 1 - (screenWidth / 1000);
  const size = baseSize * Math.max(scaleFactor, 0.4);
  return Math.min(Math.max(size, 80), 150);
};

const styles = StyleSheet.create({
  background: {
    backgroundColor: 'white',
    flex: 1,
  },
  scrollWrapper: {
    flexGrow: 1,
    minHeight: '100%',
    minWidth: '100%'
  },
  mainContainer: {
    flex: 1,
    width: '100%',
    minHeight: '100%',
    backgroundColor: 'white',
  },
  headerSection: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'blue',
    padding: 20,
    overflow: 'hidden',
  },
  logoWrapper: {
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  logo: {
    width: '90%',
    height: '90%',
    resizeMode: 'contain',
  },
  formSection: {
    padding: 30,
    gap: 30,
    zIndex: 2,
    flex: 2,
  },
  inputContainer: {
    width: '100%',
    gap: 15,
  },
  footerSection: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
    backgroundColor: 'white',
  },
  button: {
    width: '80%',
    height: 50,
  },
});

export default ProfilePage;