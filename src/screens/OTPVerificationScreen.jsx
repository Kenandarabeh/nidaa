import React, { useState } from 'react';
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
import { metrics } from '../theme/metrics';

const { width, height } = Dimensions.get('window');

const OTPVerificationScreen = ({ navigation, route }) => {
  const [otp, setOtp] = useState('');
  const { phoneNumber } = route.params;

  const handleVerify = () => {
    if (otp.length === 4) {
      // Add your verification logic here
      navigation.navigate('Home');
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
                Verification Code
              </CustomText>
              
              <CustomText variant="body1" style={styles.subtitle}>
                Enter the code sent to {phoneNumber}
              </CustomText>

              <View style={styles.inputContainer}>
                <CustomTextInput
                  type="otp"
                  value={otp}
                  onChangeText={setOtp}
                  otpLength={4}
                />
              </View>

              <CustomButton
                onPress={handleVerify}
                style={styles.button}
                disabled={otp.length !== 4}
              >
                Verify
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
    width: width + 60,
    height: '30%',
    right: -30,
    left: -30,
    resizeMode: 'cover',
  },
});

export default OTPVerificationScreen;
