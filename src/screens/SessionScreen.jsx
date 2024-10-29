import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Dimensions, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Video from 'react-native-video';
import { useTranslation } from 'react-i18next';
import Text from '../constants/CustomText';
import CustomButton from '../constants/CustomButton';
import { MaterialIcons } from 'react-native-vector-icons/MaterialIcons';
import Background from '../constants/Background';

const { width, height } = Dimensions.get('window');

const SessionScreen = () => {
  const navigation = useNavigation();
  const { t } = useTranslation();
  const [isVideoDisabled, setIsVideoDisabled] = useState(false);

  const onButtonTap = (action) => {
    console.log(action, 'button pressed');
  };

  const pickdate = () => {
    // Implement showModal functionality
  };

  const Choosetime = () => {
    navigation.navigate('ChooseSession');
  };

  const videoSrc = 'https://cdn.pixabay.com/video/2023/07/31/174033-850286651_large.mp4';
  const thumbnail = 'https://cdn.pixabay.com/photo/2020/12/18/07/24/pillow-5841360_960_720.png';

  return (
    <Background>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.welcomeContainer}>
          <View style={styles.profile}>
            <Text style={styles.greeting}>{t('Hello Salah ')}</Text>
            <Text style={styles.welcome}>{t('Yahaia')}</Text>
          </View>
          <View style={styles.session}>
            <View style={styles.sousContainer}>
              <Text style={styles.sessionTitle}>{t('Session 1')}</Text>
              <CustomButton
                onPress={() => onButtonTap(t('Medical Questionnaire'))}
                style={[styles.button, styles.smallButton]}
                textStyle={{ fontSize: 18 }}
                disabled={true} // تعيين الزر كمعطل
              >
                {t('Medical Questionnaire')}
              </CustomButton>
              <CustomButton
                onPress={() => onButtonTap('سجل النوم')}
                style={[styles.button, styles.smallButton]}
                textStyle={{ fontSize: 18 }}
              >
                {t('Sleep Log')}
              </CustomButton>
              <CustomButton
                onPress={() => onButtonTap('محتوى المعلومات')}
                style={[styles.button, styles.smallButton]}
                textStyle={{ fontSize: 18 }}
              >
                {t('Information Content')}
              </CustomButton>
              <View style={styles.videoSection}>
                {isVideoDisabled ? (
                  <View style={styles.disabledOverlay}>
                    <MaterialIcons name="lock-fill" size={50} color="#666666" />    
                                  </View>
                ) : (
                  <View style={styles.videoContainer}>
                    <Video
                      source={{ uri: videoSrc }}
                      style={styles.videoPlayer}
                      controls
                      poster={thumbnail}
                      resizeMode='cover'
                      onError={(e) => console.log('Video Error:', e)}
                    />
                  </View>
                )}
              </View>
              <CustomButton
                onPress={() => onButtonTap('تقييم الحالة')}
                style={[styles.button, styles.smallButton]}
                textStyle={{ fontSize: 18 }}
              >
                {t('Condition Assessment')}
              </CustomButton>
            </View>
            <View style={styles.footerButtons}>
              <CustomButton
                onPress={() => onButtonTap('أريد أن أنام الآن')}
                style={[styles.button, styles.whiteButton, styles.footerButton]}
                textStyle={styles.buttonText}
              >
                {t('I Want to Sleep Now')}
              </CustomButton>
              <CustomButton
                onPress={Choosetime}
                style={[styles.button, styles.footerButton]}
                textStyle={styles.buttonTextBlue}
              >
                {t('Request an Appointment with a Doctor')}
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
    paddingVertical: 10, // إضافة حشوة عمودية لتوفير مسافة متساوية من الأعلى والأسفل
  },
  welcomeContainer: {
    flex: 1,
    paddingHorizontal: 10, // تقليل الحشوة الأفقية
  },
  profile: {
    marginTop: 20, // تقليل المسافة العلوية
    textAlign: 'right', // تعديل النص ليكون على اليمين
    marginBottom: 10, // إضافة مسافة سفلية
  },
  greeting: {
    backgroundColor: 'transparent',
    fontSize: 30, // تقليل حجم النص
    color: 'white',
    textAlign: 'right', // تعديل النص ليكون على اليمين
    marginTop: 2,
  },
  welcome: {
    backgroundColor: 'transparent',
    fontSize: 30, // تقليل حجم النص
    color: 'white',
    textAlign: 'right', // تعديل النص ليكون على اليمين
    marginTop: 2,
  },
  session: {
    marginTop: 5,
  },
  sousContainer: {
    marginBottom: 10, // تقليل المسافة السفلية
  },
  sessionTitle: {
    backgroundColor: 'transparent',
    fontSize: 30, // تقليل حجم النص
    marginBottom: 10, // تقليل المسافة السفلية
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
  },
  videoSection: {
    borderRadius: 20, // تقليل نصف القطر
    margin: '2% auto',
    height: height * 0.2, // تقليل ارتفاع الفيديو
    marginBottom: 10, // تقليل المسافة السفلية
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent'
  },
  videoContainer: {
    height: '100%',
    width: '100%',
    marginTop: 5,
    borderRadius: 20, // تقليل نصف القطر
    overflow: 'hidden', // تأكد من أن الفيديو يتبع حدود الحاوية
  },
  videoPlayer: {
    height: '100%',
    width: '100%',
  },
  disabledOverlay: {
    height: '100%',
    width: '100%',
    borderRadius: 20, // تقليل نصف القطر
    backgroundColor: '#cccccc',
    justifyContent: 'center',
    alignItems: 'center',
  },
  footerButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10, // تقليل المسافة العلوية
  },
  button: {
    flex: 1,
    marginHorizontal: 5,
    paddingVertical: 8, // تقليل الحشوة العمودية
    alignItems: 'center',
    marginBottom: 150, // إضافة مسافة سفلية
  },
  smallButton: {
    height: 55, // تقليل الارتفاع
  },
  whiteButton: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: 'rgba(0, 49, 67, 1)',
  },
  blueButton: {
    backgroundColor: 'white',
  },
  buttonText: {
    fontSize: 16, // تقليل حجم النص
    color: 'rgba(0, 49, 67, 1)'
  },
  buttonTextBlue: {
    fontSize: 16, // تقليل حجم النص
    color: 'white'
  },
  whiteButtonText: {
    color: 'rgba(0, 49, 67, 1)',
  },
  footerButton: {
    marginBottom: 0, // إزالة المسافة السفلية للأزرار في الفوتر
  },
  logoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10, // إضافة مسافة علوية
  },
});

export default SessionScreen;