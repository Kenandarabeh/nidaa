import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, ActivityIndicator, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { user_signup } from '../api/User';
import Backgound from '../constants/Background';
import CustomText from '../constants/CustomText';
import { useTranslation } from 'react-i18next';
import CustomTextInput from '../constants/CustomTextInput';
import emailIcon from '../assets/icons/password.png';
import CustomButton from '../constants/CustomButton';

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
    navigation.navigate('Login');
  };
  const { t } = useTranslation();

  const doRegister = async () => {
    setIsLoading(true);
    const { secPassword, ...rest } = formData;
    const user_data = rest;
    const result = await user_signup(user_data);
    if (result) {
      setIsLoading(false);
      navigation.navigate('Details');
    }
  };

  const fields = [
    { name: 'firstname', hint:'Firstname', type: 'text', secure: false ,icon: emailIcon},
    { name: 'lastname', hint:'Lastname', type: 'text', secure: false ,icon: emailIcon},
    { name: 'email', hint:'Email', type: 'email', autocap: 'none', emailValidation: true, secure: false,icon: emailIcon },
    { name: 'password', hint:'Password', type: 'password', secure: true, passwordField: true ,icon: emailIcon},
    { name: 'secPassword', hint:'Confirm Password', type: 'password', secure: true ,icon: emailIcon},
  ];

  return (

    <Backgound>
      <View style={styles.page}>
        <CustomText style={styles.title}>{t('Register')}</CustomText>
        <View style={styles.register}>
          {fields.map((field, index) => (
              <CustomTextInput
                  key={index}

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
          ))}
          <CustomButton
            onPress={doRegister}
            style={styles.btn}
            textStyle={styles.btnText}
            disabled={!isValidEmail || !passwordsMatch || isLoading}
          >
            {t('Register')}
          </CustomButton>
          <TouchableOpacity onPress={login}>
            <CustomText style={styles.loginLabel}>{t('Already have an account')}</CustomText>
          </TouchableOpacity>
          {isLoading && <ActivityIndicator style={styles.activityIndicator} />}
        </View>
      </View>
    </Backgound>
  );
};

const styles = StyleSheet.create({
  page: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },  
  title: {
    fontSize: 30,
    color: 'white',
  },
  register: {
    width: '90%',
    alignItems: 'center',
  },
  inputField: {
    width: '100%',
    borderRadius: 10,
    padding: 10,
    marginVertical: 10,
    backgroundColor: '#ffffffe1',
  },
  input: {
    fontSize: 16,
    color: '#000',
  },
  validEmail: {
    borderColor: '#18e618',
    borderWidth: 3,
  },
  invalidEmail: {
    borderColor: '#ff6f6f',
    borderWidth: 3,
  },
  validPassword: {
    borderColor: '#18e618',
    borderWidth: 3,
  },
  invalidPassword: {
    borderColor: '#ff6f6f',
    borderWidth: 3,
  },
  loginLabel: {
    fontSize: 15,
    padding: 10,
    color: 'white',
  },
  activityIndicator: {
    marginTop: 20,
  },
});

export default SignupScreen;