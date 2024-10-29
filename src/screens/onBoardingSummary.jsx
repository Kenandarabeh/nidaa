import { StyleSheet, View, Text } from 'react-native';
import React from 'react';
import CustomButton from '../constants/CustomButton';
import { useTranslation } from 'react-i18next';
import Background from '../constants/Background';
import CircularProgressbar from '../components/onboarding/circularPrgress';
const onBoardingSummary = ({ navigation ,score }) => {
  const { t } = useTranslation();
  const progress = 70;

  return (
    <Background>
      <View style={styles.container}>
        <Text style={styles.title}>{t('جودة نومك')}</Text>

        <CircularProgressbar progress={progress} />

        <View style={styles.textContainer}>
          <Text style={styles.description}>
            {t('البرنامج العلاجي ')} 
            <Text style={styles.highlight}>{t('النوم العميق')}</Text>
            {t(' يحدد ويعالج الأسباب الجذرية لمشاكل النوم لديك. لذلك هو حل علاجي طويل الأمد وليس مجرد حل سريع.')}
          </Text>
          </View>
      </View>

      <View style={styles.buttonContainer}>
        <View>
           <CustomButton 
              onPress={() => navigation.navigate('Login')} 
              style={{ backgroundColor: '#0088bb' }}  
              textStyle={{ fontSize: 18, color: 'white' }}  
            >
              {t('التسجيل في دورة العلاج السلوكي المعرفي للأرق')}
            </CustomButton>
        </View>
      </View>
    </Background>
  );
};

export default onBoardingSummary;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 34,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  textContainer: {
    marginTop: 20,
    paddingHorizontal: 10,
    alignItems: 'center',
  },
  description: {
    textAlign: 'center',
    fontSize: 24,
    color: '#ffffff',
  },
  highlight: {
    fontWeight: 'bold', 
    color: '#003143',  
    fontSize: 25,  },
  buttonContainer: {
    backgroundColor: "#003143",
    padding: '3%',
    borderRadius: '50%',
    width: '100%',
    height: '500',
  },
});