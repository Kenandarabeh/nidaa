import React from 'react';
import { StyleSheet, View, Image, ScrollView } from 'react-native';
import Background from '../constants/Background';
import Text from '../constants/CustomText';
import AuthenticationTab from '../components/AuthenticationTab';
import city from '../assets/images/city.png';
import logo from '../assets/images/logo.png';
import Header from '../components/Header';

const AuthScreen = () => {
  return (
    <Background>
      <ScrollView 
        contentContainerStyle={styles.scrollWrapper}
        bounces={false}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.mainContainer}>
          <View style={styles.headerSection}>
            <Header showPrevOnly showPrev/>
            <View style={styles.logoWrapper}>
              <Image style={styles.logo} source={logo} />
            </View>
          </View>

          <View style={styles.formSection}>
            <AuthenticationTab />
          </View>

          <View style={styles.footerSection}>
            <Image style={styles.backgroundImage} source={city} />
          </View>
        </View>
      </ScrollView>
    </Background>
  );
};

const styles = StyleSheet.create({
  scrollWrapper: {
    flexGrow: 1,
    minHeight: '100%',
    minWidth: "100%"
  },
  mainContainer: {
    flex: 1,
    width: '100%',
    minHeight: '100%',
  },
  headerSection: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  logoWrapper: {
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 40,
  },
  logo: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
  },
  formSection: {
    padding: 30,
    justifyContent: 'center',
    gap: 30,
    zIndex: 2,
    overflow: 'visible',
  },
  footerSection: {
    flex: 1.5,
    position: 'relative',
    zIndex: 1,
    overflow:'hidden'
  },
  backgroundImage: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: '90%',
    resizeMode: 'cover',
  },
});

export default AuthScreen;