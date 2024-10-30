import React, {useState} from 'react';
import {View, TouchableOpacity, StyleSheet} from 'react-native';
import {user_login, getUserProfile} from '../api/User';
import emailIcon from '../assets/icons/password.png';
import lockIcon from '../assets/icons/password.png';
import CustomTextInput from '../constants/CustomTextInput';
import {useTranslation} from 'react-i18next';
import CustomText from '../constants/CustomText';
import Backgound from '../constants/Background';
import CustomButton from '../constants/CustomButton';
import useAuthStore from '../store/authStore';
const LoginScreen = ({navigation}) => {
  const {t} = useTranslation();
  const [email, setEmail] = useState('laibout');
  const [password, setPassword] = useState('D33p_Sleep');
  const [emailFocused, setEmailFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const setAuth = useAuthStore(state => state.setAuth);
  const doLogin = async () => {
    setIsLoading(true);
    const moodle_ws_token = await user_login(email, password);
    if (moodle_ws_token) {
      const {userprivateaccesskey} = await getUserProfile(moodle_ws_token);
      
      if (userprivateaccesskey) {
        setAuth(moodle_ws_token, userprivateaccesskey);
        navigation.navigate('Appointments')
      }
      
    }
    setIsLoading(false);
  };

  const register = () => {
    navigation.navigate('Signup');
  };

  const forgetPassword = () => {
    navigation.navigate('ForgotPassword');
  };

  return (
    <Backgound>
      <View style={styles.layoutPage}>
        <View style={styles.form}>
          <CustomText style={styles.title}>{t('Login')}</CustomText>

          <CustomTextInput
            iconSource={emailIcon}
            placeholder={t('Email')}
            value={email}
            onChangeText={setEmail}
            onFocus={() => setEmailFocused(true)}
            onBlur={() => setEmailFocused(false)}
            editable={!isLoading}
          />
          <CustomTextInput
            iconSource={lockIcon}
            placeholder={t('Password')}
            value={password}
            onChangeText={setPassword}
            onFocus={() => setPasswordFocused(true)}
            onBlur={() => setPasswordFocused(false)}
            editable={!isLoading}
            secureTextEntry
          />
          <TouchableOpacity
            onPress={forgetPassword}
            style={styles.forgetPassword}>
            <CustomText style={styles.signUpLabel}>
              {t('Forget your password ?')}
            </CustomText>
          </TouchableOpacity>
          <CustomButton
            onPress={doLogin}
            style={styles.btn}
            textStyle={styles.btnText}
            loading={isLoading}>
            {t('Login')}
          </CustomButton>
          <TouchableOpacity onPress={register}>
            <CustomText style={styles.signUpLabel}>{t('Register')}</CustomText>
          </TouchableOpacity>
        </View>
        <View style={styles.logoContainer}></View>
      </View>
    </Backgound>
  );
};

const styles = StyleSheet.create({
  page: {
    flex: 1,
  },
  forgetPassword: {
    alignSelf: 'flex-start',
    marginRight: 20,
  },
  overlay: {
    flex: 1,
  },
  layoutPage: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  form: {
    padding: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 30,
    marginBottom: 50,
    marginTop: 50,
    color: 'white',
  },
  inputField: {
    color: '#000000',
    backgroundColor: '#ffffffe1',
    borderRadius: 10,
    width: '100%',
    height: 60,
    textAlign: 'center',
    marginVertical: 10,
    fontSize: 16,
    borderWidth: 2,
    borderColor: 'transparent',
    transition: 'border-color 0.3s ease',
  },
  borderActive: {
    borderColor: 'rgba(0, 136, 187, 1)',
  },
  borderInactive: {
    borderColor: 'transparent',
  },
  input: {
    paddingRight: 20,
    width: 340,
  },
  signUpLabel: {
    fontSize: 15,
    padding: 10,
    color: 'white',
  },

  logoContainer: {
    marginTop: 50,
  },
  btn: {
    fontWeight: 'bold',
    borderRadius: 15,
    fontSize: 20,
    backgroundColor: 'rgba(0, 49, 67, 1)',
    height: 62,
    width: 340,
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnText: {
    fontSize: 20,
  },
});

export default LoginScreen;
