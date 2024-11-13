import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import CustomTextInput from '../constants/CustomTextInput';
import CustomButton from '../constants/CustomButton';
import CustomText from '../constants/CustomText';
import { useTranslation } from 'react-i18next';

const AuthenticationTab = () => {
  const [secretKey, setSecretKey] = useState('');
  const navigation = useNavigation();
  const { t } = useTranslation();

  return (
    <View style={styles.container}>
      {/* Main Form */}
      <View style={styles.form}>
        {/* Phone Sign In Button */}
        <CustomButton 
          onPress={() => navigation.navigate('PhoneSignIn')}
          style={styles.button}
          variant="outlined"
          startIcon="phone"
        >
          {t('SignInWithPhone')}
        </CustomButton>

        {/* Divider */}
        <View style={styles.divider}>
          <View style={styles.line} />
          <CustomText style={styles.orText}>{t('or')}</CustomText>
          <View style={styles.line} />
        </View>

        {/* Secret Key Input */}
        <CustomTextInput
          placeholder="Sofizpay Secret Key"
          value={secretKey}
          onChangeText={setSecretKey}
          secureTextEntry
          showPasswordToggle
        />

        {/* Sign In Button */}
        <CustomButton 
          onPress={() => secretKey && navigation.navigate('Home')}
          style={styles.button}
          variant="filled"
        >
          {t('SignIn')}
        </CustomButton>
      </View>

      {/* Sign Up Link */}
      <View style={styles.footer}>
        <CustomText>{t('DontHaveAccount')}</CustomText>
        <CustomButton 
          onPress={() => navigation.navigate('Signup')}
          variant="text"
        >
          {t('SignUp')}
        </CustomButton>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 20,
  },
  form: {
    gap: 20,
  },
  button: {
    height: 48,
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: '#E0E0E0',
  },
  orText: {
    color: '#757575',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
  }
});

export default AuthenticationTab;
