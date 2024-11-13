import React, { useState, useEffect } from 'react';
import { View, ActivityIndicator, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { user_signup } from '../api/User';
import Backgound from '../constants/Background';
import CustomText from '../constants/CustomText';
import { useTranslation } from 'react-i18next';
import CustomTextInput from '../constants/CustomTextInput';
import emailIcon from '../assets/icons/password.png';
import CustomButton from '../constants/CustomButton';
import Intelgx from '../constants/Intelgx';
import Header from '../components/Header';

const SignupScreen = () => {
  const navigation = useNavigation();

  const [formData, setFormData] = useState({
    firstname: 'Nom',
    lastname: 'Prenom',
    email: 'exemple@gmail.com',
    password: 'Test1234@',
    secPassword: 'Test1234@',
  });

  const [isValidEmail, setIsValidEmail] = useState(false);
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const [passwordsMatch, setPasswordsMatch] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/;

    setIsValidEmail(emailPattern.test(formData.email));
    setIsPasswordValid(passwordPattern.test(formData.password));
    setPasswordsMatch(formData.password === formData.secPassword);
  }, [formData]);

  const login = () => {
    navigation.navigate('Auth');
  };
  const { t } = useTranslation();

  const doRegister = async () => {
    setIsLoading(true);
    const { secPassword, ...rest } = formData;
    const user_data = rest;
    const result = await user_signup(user_data);
    if (result) {
      setIsLoading(false);
      navigation.navigate('Auth');
    }
  };

  const fields = [
    { name: 'firstname', hint:'Firstname', type: 'text', secure: false ,icon: emailIcon},
    { name: 'lastname', hint:'Lastname', type: 'text', secure: false ,icon: emailIcon},
    { name: 'email', hint:'Email', type: 'email', autocap: 'none', emailValidation: true, secure: false,icon: emailIcon },
    { name: 'password', hint:'Password', type: 'password', secure: true, passwordField: true ,icon: emailIcon},
    { name: 'secPassword', hint:'Confirm Password', type: 'password', secure: true ,icon: emailIcon},
  ];

  const handlePrevPress = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.mainContainer}>
      <View style={styles.headerSection}>
        <Header
          headerTitle={t('Register')}
          showBackButton={true}
          allowDrawer={true}
        />
      </View>

      {/* Main Container */}
      <View style={styles.contentWrapper}>
        <ScrollView style={styles.scrollView}>
          <View style={styles.formSection}>
            <View style={styles.inputsGroup}>
              {fields.map((field, index) => (
                <View key={index} style={styles.inputWrapper}>
                  <CustomTextInput
                    iconSource={field.icon}
                    placeholder={field.hint}
                    value={formData[field.name]}
                    onChangeText={(text) => setFormData({ ...formData, [field.name]: text })}
                    onFocus={() => {
                      if (field.emailValidation) setIsValidEmail(true);
                      if (field.passwordField) setIsPasswordValid(true);
                    }}
                    onBlur={() => {
                      if (field.emailValidation) setIsValidEmail(true); 
                      if (field.passwordField) setIsPasswordValid(true); 
                    }}
                    editable={!isLoading}
                    secureTextEntry={field.secure}
                  />
                </View>
              ))}
            </View>
          </View>
        </ScrollView>

        {/* Footer Section */}
        <View style={styles.footer}>
          <View style={styles.actionButtons}>
            <CustomButton
              onPress={doRegister}
              disabled={!isValidEmail || !passwordsMatch || isLoading}
              style={styles.submitButton}
            >
              {t('Register')}
            </CustomButton>

            <TouchableOpacity 
              onPress={login} 
              style={styles.loginLink}
            >
              <CustomText style={styles.loginLabel}>
                {t('Already have an account')}
              </CustomText>
            </TouchableOpacity>
          </View>

          <Intelgx style={styles.logo} />
        </View>

        {isLoading && (
          <View style={styles.loadingOverlay}>
            <ActivityIndicator color="#4332FF" size="large" />
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#F5F6FA',
  },
  headerSection: {
    flex: 1.5,
    backgroundColor: '#4332FF',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  contentWrapper: {
    flex: 8.5,
    position: 'relative',
  },
  scrollView: {
    flex: 1,
  },
  formSection: {
    paddingHorizontal: 20,
    paddingTop: 24,
    paddingBottom: 20,
  },
  inputsGroup: {
    gap: 16,
  },
  inputWrapper: {
    borderRadius: 12,

  },
  footer: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    paddingVertical: 16, // Reduced from 24
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -3,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4.65,
    elevation: 6,
  },
  actionButtons: {
    gap: 8, // Reduced from 16
    marginBottom: 10, // Reduced from 20
  },
  submitButton: {
    backgroundColor: '#4332FF',
    borderRadius: 12,
    paddingVertical: 16,
  },
  loginLink: {
    alignItems: 'center',
    paddingVertical: 8,
  },
  loginLabel: {
    color: '#4332FF',
    fontSize: 15,
    fontWeight: '600',
  },
  logoWrapper: {
    alignItems: 'center',
    marginTop: 16,
  },
  logo: {
    height: 30, // Add specific height for logo
  },
  loadingOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255,255,255,0.8)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 999,
  },
});

export default SignupScreen;