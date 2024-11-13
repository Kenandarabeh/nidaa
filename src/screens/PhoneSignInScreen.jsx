import React, { useState, useRef } from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  Platform,
  KeyboardAvoidingView,
  ScrollView,
  Dimensions,
  Image,
} from 'react-native';
import CustomText from '../constants/CustomText';
import CustomButton from '../constants/CustomButton';
import CustomTextInput from '../constants/CustomTextInput';
import { colors } from '../theme/colors';
import Background from '../constants/Background';

const { width, height } = Dimensions.get('window');

const PhoneSignInScreen = ({ navigation }) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const phoneInputRef = useRef(null);

  const handleSubmit = () => {
    if (phoneInputRef.current?.isValidNumber()) {
      navigation.navigate('OTPVerification', {
        phoneNumber: phoneInputRef.current.getNumber(),
      });
    }
  };

  return (
    <Background>
      <Image
        source={require('../assets/images/city.png')}
        style={styles.cityImage}
        resizeMode="cover"
      />
      
      <SafeAreaView style={styles.container}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.keyboardView}
        >
          <ScrollView 
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
          >
            <View style={styles.logoContainer}>
              <View style={styles.logoWrapper}>
                <Image
                  source={require('../assets/images/logo.png')}
                  style={styles.logo}
                  resizeMode="contain"
                />
              </View>
            </View>

            <View style={styles.contentContainer}>
              <CustomText variant="h1" style={styles.title}>
                Sign in with Phone
              </CustomText>
              
              <CustomText variant="body1" style={styles.subtitle}>
                Please enter your phone number to continue
              </CustomText>

              <View style={styles.inputContainer}>
                <CustomTextInput
                  ref={phoneInputRef}
                  type="phone"
                  value={phoneNumber}
                  onChangeText={setPhoneNumber}
                  placeholder="Enter phone number"
                  allowedCountries={['SA', 'AE', 'BH', 'KW', 'QA', 'OM']}
                  initialCountry="SA"
                />
              </View>

              <CustomButton
                onPress={handleSubmit}
                style={styles.button}
                disabled={!phoneNumber}
              >
                Continue
              </CustomButton>

              <CustomButton
                onPress={() => navigation.goBack()}
                variant="text"
                style={styles.backButton}
              >
                Back
              </CustomButton>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </Background>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingTop: height * 0.1,
  },
  logoContainer: {
    width: '100%',
    alignItems: 'center',
    marginBottom: height * 0.04,
  },
  logoWrapper: {
    width: width * 0.2,
    height: width * 0.2,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  logo: {
    width: '80%',
    height: '80%',
  },
  contentContainer: {
    backgroundColor: 'white',
    borderRadius: 30,
    marginHorizontal: 20,
    padding: height * 0.03,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
      },
      android: {
        elevation: 5,
      },
    }),
  },
  title: {
    textAlign: 'center',
    marginBottom: 8,
    color: colors.text.primary,
  },
  subtitle: {
    textAlign: 'center',
    color: colors.text.secondary,
    marginBottom: 32,
  },
  inputContainer: {
    marginBottom: 24,
  },
  button: {
    marginBottom: 16,
  },
  backButton: {
    marginTop: 8,
  },
  cityImage: {
    position: 'absolute',
    bottom: 0,
    width: width + 1,
    left: -30,
    height: height * 0.3,
    resizeMode: 'cover',
  },
});

export default PhoneSignInScreen;
