
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import TestMeetingScreen from './TestMeetingScreen'; // تأكد من تعديل المسار حسب موقع ملف TestMeetingScreen

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <Stack.Navigator>
      {/* ...existing routes... */}
      <Stack.Screen 
        name="TestMeeting" 
        component={TestMeetingScreen}
        options={{ title: 'Test Meeting' }}
      />
    </Stack.Navigator>
  );
};

export default AppNavigator; 