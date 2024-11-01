import React, {useEffect} from 'react'
import {NavigationContainer, DefaultTheme} from '@react-navigation/native'
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import LoginScreen from '../screens/LoginScreen'
import SignupScreen from '../screens/SignupScreen'
import ResetPassword from '../screens/ResetPassword'
import ForgotPassword from '../screens/ForgotPassword'
import EnterOtp from '../screens/EnterOtp'
import useAuthStore from '../store/authStore'
import OnBoardingScreen from '../screens/OnBoardingScreen.jsx'
import LessonPageScreen from '../screens/LessonPageScreen.jsx'
import WelcomeScreen from '../screens/WelcomScreen'

const Stack = createNativeStackNavigator()

const DeepSleepTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    // primary: 'rgb(255, 45, 85)',
    // background: 'red',
  },
}

export default function AppNavigator() {
  const initializeAuth = useAuthStore(state => state.initializeAuth)
  const isAuth = useAuthStore(state => state.isAuth)
  // TO DO add loading component
  useEffect(() => {
    initializeAuth()
  }, [initializeAuth])
  return (
    <NavigationContainer theme={DeepSleepTheme}>
      <Stack.Navigator
        initialRouteName={isAuth ? 'Login' : 'Login'}
        screenOptions={{
          headerShown: false,
        }}>
        {isAuth ? (
          <>
            <Stack.Screen name='Login' component={LoginScreen} />
            <Stack.Screen
              component={OnBoardingScreen}
              name='OnBoardingScreen'
              options={{
                animation: 'none',
              }}
            />
            <Stack.Screen
              component={LessonPageScreen}
              name='LessonPageScreen'
              options={{animation: 'fade', animationDuration: 1000}}
            />
          </>
        ) : (
          <>
            <Stack.Screen name='Login' component={LoginScreen} />
            <Stack.Screen name='Signup' component={SignupScreen} />
            <Stack.Screen name='ForgotPassword' component={ForgotPassword} />
            <Stack.Screen name='ResetPassword' component={ResetPassword} />
            <Stack.Screen name='WelcomeScreen' component={WelcomeScreen} />
            <Stack.Screen name='EnterOtp' component={EnterOtp} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  )
}
