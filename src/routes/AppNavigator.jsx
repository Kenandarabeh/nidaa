import React, {useEffect} from 'react';
import {NavigationContainer, DefaultTheme} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import DetailsScreen from '../screens/DetailsScreen';
import LoginScreen from '../screens/LoginScreen';
import SignupScreen from '../screens/SignupScreen';
import ResetPassword from '../screens/ResetPassword';
import ForgotPassword from '../screens/ForgotPassword';
import AppointmentsScreen from '../screens/AppointmentsScreen';
import EnterOtp from '../screens/EnterOtp';
import useAuthStore from '../store/authStore';
import OnBoardingScreen from '../screens/OnBoardingScreen';
import ContentPage from '../screens/ContentPage';
import WelcomeScreen from '../screens/WelcomScreen';
import SessionScreen from '../screens/SessionScreen';
import OnBoardingSummary from '../screens/onBoardingSummary';
import CallScreen from '../screens/CallScreen';

const Stack = createNativeStackNavigator();
const DeepSleepTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    // primary: 'rgb(255, 45, 85)',
    // background: 'red',
  },
};

export default function AppNavigator() {
  const initializeAuth = useAuthStore(state => state.initializeAuth);
  const isAuth = useAuthStore(state => state.isAuth);
  // TO DO add loading component
  useEffect(() => {
    initializeAuth();
  }, [initializeAuth]);
  return (
    <NavigationContainer theme={DeepSleepTheme}>
      <Stack.Navigator initialRouteName={isAuth ? 'Login' : 'Login'}>
        {isAuth ? (
          <>
            {/* <Stack.Screen
              name="Appointments"
              component={AppointmentsScreen}
              options={{headerShown: false}}
            /> */}
             <Stack.Screen
              name="Login"
              component={LoginScreen}
              options={{headerShown: false}}
            />
              <Stack.Screen
              name="CallScreen"
              component={CallScreen}
              options={{headerShown: false}}
            />
               <Stack.Screen
                 component={Meeting}
                 name="Meeting"
                 options={{
                   headerShown: false,
                 }}
            />
                <Stack.Screen
              name="SessionScreen"
              component={SessionScreen}
              options={{headerShown: false}}
            />
                <Stack.Screen
              name="CallScreen"
              component={CallScreen}
              options={{headerShown: false}}
            />
          </>
        ) : (
          <>
       
            <Stack.Screen
              name="Login"
              component={LoginScreen}
              options={{headerShown: false}}
            />
                 <Stack.Screen
              name="CallScreen"
              component={CallScreen}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="Signup"
              component={SignupScreen}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="ForgotPassword"
              component={ForgotPassword}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="ResetPassword"
              component={ResetPassword}
              options={{headerShown: false}}
            />
                      <Stack.Screen
              name="ContentPage"
              component={ContentPage}
              options={{headerShown: false}}
            />
                     <Stack.Screen
              name="WelcomeScreen"
              component={WelcomeScreen}
              options={{headerShown: false}}
            />
               
            <Stack.Screen
              name="EnterOtp"
              component={EnterOtp}
              options={{headerShown: false}}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
