import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import DetailsScreen from '../screens/DetailsScreen';
import SignupScreen from '../screens/SignupScreen';
import OnBoardingScreen from '../screens/OnBoardingScreen';
import SelectionScreen from '../screens/SelectionScreen';
import ProfileImageInput from '../components/ProfileImageInput';
import { colors } from '../theme/colors';
import OTPVerificationScreen from '../screens/OTPVerificationScreen';
import AuthScreen from '../screens/AuthScreen';
import PhoneSignInScreen from '../screens/PhoneSignInScreen';
import ProfilePage from '../screens/ProfilePage';
import HistoryPage from '../screens/HistoryPage';
import HomeScreen from '../screens/HomeScreen';
import MapScreen from '../screens/MapScreen';
import Meeting from '../components/jetsi/mettings';

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

const CustomDrawerContent = ({ navigation }) => {
  return (
    <View style={styles.drawerContainer}>
      {/* Profile Section */}
      <View style={styles.profileSection}>
        <ProfileImageInput
          size={80}
          isViewOnly={true}
          showCameraButton={false}
          value={{ uri: 'https://via.placeholder.com/80' }} // يمكنك تغيير هذا باستخدام صورة المستخدم الفعلية
          containerStyle={{ marginVertical: 0 }}
          title={null}
          subtitle={null}
        />
        <View style={styles.profileInfo}>
          <Text style={styles.profileName}>User Name</Text>
          <Text style={styles.profileEmail}>user@email.com</Text>
        </View>
      </View>

      {/* Drawer Items */}
      <View style={styles.drawerItemsContainer}>
        <TouchableOpacity 
          style={styles.drawerItem}
          onPress={() => navigation.navigate('MainStack')}
        >
          <Icon name="home" size={24} color="#333" />
          <Text style={styles.drawerItemText}>Home</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.drawerItem}
          onPress={() => navigation.navigate('Profile')}
        >
          <Icon name="person" size={24} color="#333" />
          <Text style={styles.drawerItemText}>Profile</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.drawerItem}>
          <Icon name="settings" size={24} color="#333" />
          <Text style={styles.drawerItemText}>Settings</Text>
        </TouchableOpacity>
      </View>

      {/* Bottom Section */}
      <TouchableOpacity style={styles.logoutButton}>
        <Icon name="logout" size={24} color="#FF3B30" />
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

const MainStack = () => {
  return (
    <Stack.Navigator initialRouteName="Map">
   
   <Stack.Screen
      name="Map"
      component={MapScreen}
      options={{ 
        headerShown: false,
        swipeEnabled: false,
      }}
    />
   
   <Stack.Screen
        name="Auth"
        component={AuthScreen}
        options={{ 
          headerShown: false,
          swipeEnabled: false,
        }}
      />
   <Stack.Screen 
  name="Meeting" 
  component={Meeting}
  options={{ headerShown: false }}
/>
   <Stack.Screen
        name="Profile"
        component={ProfilePage}
        options={{ 
          headerShown: false,
          swipeEnabled: false,
        }}
      />
      <Stack.Screen
        name="History"
        component={HistoryPage}
        options={{ 
          headerShown: false,
          swipeEnabled: false,
        }}
      />


      <Stack.Screen
        name="PhoneSignIn"
        component={PhoneSignInScreen}
        options={{ 
          headerShown: false,
          swipeEnabled: false,
        }}
      />
      <Stack.Screen
        name="Signup"
        component={SignupScreen}
        options={{ 
          headerShown: false,
          swipeEnabled: false,
        }}
      />     

      <Stack.Screen
        name="OTPVerification"
        component={OTPVerificationScreen}
        options={{ 
          headerShown: false,
          swipeEnabled: false,
        }}
      />
      {/* ...other screens... */}
    </Stack.Navigator>
  );
};

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        drawerContent={(props) => <CustomDrawerContent {...props} />}
        screenOptions={({ navigation, route }) => ({
          headerShown: false,
          drawerStyle: {
            backgroundColor: '#FFFFFF',
            width: 280,
          },
          overlayColor: 'rgba(0, 0, 0, 0.6)',
          swipeEnabled: navigation.getState().history.some(h => h.type === 'route' && h.key.includes('prev')) ? false : true,
        })}
      >
        <Drawer.Screen 
          name="MainStack" 
          component={MainStack}
          options={{
            drawerLabel: 'Home'
          }}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  drawerContainer: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  profileSection: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E9E9E9',
    marginTop: 30,
    alignItems: 'center',
    backgroundColor: colors.primary, // إضافة لون خلفية أزرق
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 12,
  },
  profileInfo: {
    alignItems: 'center',
    marginTop: 12,
  },
  profileName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF', // تغيير لون الخط إلى أبيض
    marginBottom: 4,
  },
  profileEmail: {
    fontSize: 14,
    color: '#FFFFFF', // تغيير لون الخط إلى أبيض
  },
  drawerItemsContainer: {
    flex: 1,
    paddingTop: 12,
  },
  drawerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    marginBottom: 4,
  },
  drawerItemText: {
    marginLeft: 16,
    fontSize: 16,
    color: '#333',
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#E9E9E9',
    marginBottom: 20,
  },
  logoutText: {
    marginLeft: 16,
    fontSize: 16,
    color: '#FF3B30',
  },
});

export default AppNavigator;