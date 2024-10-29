import React from 'react';
import { View, Image, StyleSheet, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import Helal from '../assets/images/Helal.png';
import CustomButton from '../constants/CustomButton';
import Text from '../constants/CustomText';
import Background from '../constants/Background';

const { width, height } = Dimensions.get('window');

const WelcomeScreen = () => {
  const { t } = useTranslation();
  const navigation = useNavigation();

  const goToLogin = () => {
    navigation.navigate('Login');
  };

  const register = () => {
    navigation.navigate('Signup');
  };

  const startQuiz = () => {
    navigation.navigate('OnBoarding');
  };

  return (
    <Background>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.welcomeContainer}>
          <View style={styles.imageContainer}>
            <Image source={Helal} style={styles.hillal} />
          </View>
          <View style={styles.cardContent}>
            <Text style={styles.title}>{t('welcome')}</Text>
            <Text style={styles.description}>
              {t('welcome-description')}
              <Text style={styles.textSecondary}>{t('#deepsleep')}</Text>
            </Text>
            <Text style={styles.subdescription}>
              {t('He who sleeps well, has a good day')}
            </Text>
            <View style={styles.buttonContainer}>
              <CustomButton style={styles.bgSecondary} onPress={startQuiz} textStyle={styles.buttonText}>
                {t('Take sleep quiz')}
              </CustomButton>
              <View style={styles.lineContainer}>
                <View style={styles.line} />
                <TouchableOpacity onPress={register}>
                  <Text style={styles.registerText}>{t('Register')}</Text>
                </TouchableOpacity>
                <View style={styles.line} />
              </View>
              <CustomButton style={styles.bgWhite} onPress={goToLogin} textStyle={styles.loginText}>
                {t('Login')}
              </CustomButton>
            </View>
          </View>
          <View style={styles.logoContainer}></View>
        </View>
      </ScrollView>
    </Background>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
  },
  welcomeContainer: {
    flex: 1,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
  },
  imageContainer: {
    flex: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  hillal: {
    width: width * 9, // 90% of the screen width
    height: height * 0.4, // 50% of the screen height
    resizeMode: 'contain',
    marginVertical: height * 0.05, // 5% margin from top and bottom
    marginHorizontal: width * 0.05, // 5% margin from left and right
    transform: [{ rotate: '-15deg' }, { translateY: 50 }],
  },
  cardContent: {
    flex: 5,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  title: {
    fontSize: 40,
    color: '#ffffff',
    backgroundColor: 'transparent',
    textAlign: 'center',
  },
  description: {
    fontSize: 18,
    color: '#ffffff',
    backgroundColor: 'transparent',
    textAlign: 'center',
  },
  textSecondary: {
    fontSize: 20,
    color: '#ffffff',
  },
  subdescription: {
    fontSize: 16,
    color: '#ffffff',
    textAlign: 'center',
  },
  button: {
    borderWidth: 2,
    borderRadius: 15,
    fontSize: 16,
    padding: 15,
    marginVertical: 10,
    marginHorizontal: '8%',
    alignItems: 'center',
  },
  bgSecondary: {
    backgroundColor: 'rgba(0, 49, 67, 1)',
    borderColor: '#03aed2',
  },
  bgWhite: {
    backgroundColor: '#ffffff',
    borderColor: 'rgba(0, 49, 67, 1)',
    borderWidth: 2,

  },
  buttonText: {
    color: '#ffffff',
    borderColor: 'rgba(0, 49, 67, 1)',
  },
  loginText: {
    color: 'rgba(0, 49, 67, 1)',
  },
  registerText: {
    fontSize: 16,
    paddingBottom: 5,
    paddingTop: 10,
    textAlign: 'center',
    color: '#ffffff',
  },
  logoContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
    margin: 20,
    width: '90%',
    alignItems: 'center',
  },
  lineContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
display: 'flex',

    marginVertical: 10,
  },
  line: {
    
    flex: 1,
    height: 3,
    backgroundColor: 'rgba(0, 49, 67, 1)',
    marginHorizontal: 10,
    marginTop: 5,
},
});

export default WelcomeScreen;