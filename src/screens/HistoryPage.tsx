import React, { useState } from 'react';
import { StyleSheet, View, Image, ScrollView, useWindowDimensions, ViewStyle } from 'react-native';
import Background from '../constants/Background';
import logo from '../assets/images/logo.png';
import Header from '../components/Header';
import CustomTextInput from '../constants/CustomTextInput';
import CustomButton from '../constants/CustomButton';
import Text from '../constants/CustomText';
import colors from '../config/colors';
import CustomTextInputShowcase from '../components/CustomTextInputShowcase';
import CustomSelect from '../constants/CustomSelect'; // إضافة هذا الاستيراد
import PhoneInput from '../components/PhoneInput';

const INPUT_FIELDS = [
  { id: 'secretKey', placeholder: 'Sofizpay Secret Key', secure: true },
  { id: 'email', placeholder: 'Email Address', secure: false },
  { id: 'phone', placeholder: 'Phone Number', secure: false },
  { id: 'address', placeholder: 'Address', secure: false },
];

const HistoryPage = () => {
  const { width: screenWidth, height: screenHeight } = useWindowDimensions();
  const isLandscape = screenWidth > screenHeight;
  
  const headerHeight = screenHeight * (isLandscape ? 0.25 : 0.25);
  const logoSize = calculateLogoSize(screenWidth);
  const [phone, setPhone] = useState('');

  const [formData, setFormData] = useState({
    secretKey: '',
    email: '',
    phone: '',
    address: '',
  });
  const [selectedOption, setSelectedOption] = useState(null);

  const selectOptions = [
    { label: 'Toutes les transactions', value: 'all' },
    { label: 'Transactions en attente', value: 'pending' },
    { label: 'Transactions réussies', value: 'success' },
    { label: 'Transactions échouées', value: 'failed' },
  ];

  const handleInputChange = (id: string, value: string) => {
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const selectWrapper: ViewStyle = {
    width: 150, // تقليل العرض
    position: 'relative',
    zIndex: 9999,
  };

  const selectInput: ViewStyle = {
    height: 48,
    minHeight: 35,
    maxHeight: 48,
    borderColor: 'transparent',
    backgroundColor: 'rgba(255,255,255,0.1)',
    width: '100%',
  };

  return (
    <Background color='white'>
      <View style={styles.mainContainer}>
        <View style={[styles.headerSection, { height: headerHeight }]}>
          <View style={styles.header}>
            <Header showPrevOnly showPrev/>
          </View>
          <View style={styles.headerContainer}>
            <View style={styles.headerContent}>
              <Text style={styles.headerText}>Historique</Text>
              <View style={selectWrapper}>
                <CustomSelect
                  value={selectedOption}
                  onChange={setSelectedOption}
                  options={selectOptions}
                  placeholder="Filtrer"
                  searchable={true}
                  width={150}
                  height={35}
                  backgroundColor="transparent"
                  textColor="white"
                  placeholderColor="rgba(255,255,255,0.7)"
                  borderColor="transparent"
                  borderRadius={6}
                  fontSize={14}
                  variant="dropdown"
                />
              </View>
            </View>
          </View>
        </View>

        {/* Form Section */}
        <View style={styles.formSection}>
          <ScrollView 
            contentContainerStyle={styles.scrollWrapper}
            bounces={false}
            showsVerticalScrollIndicator={false}
          >
            <View style={styles.inputContainer}>
              {INPUT_FIELDS.map((field) => (
            <PhoneInput
            value={phone}
            onChangeText={setPhone}
            inputBackgroundColor="#ffffff"
            inputBorderColor="#007AFF"
            inputTextColor="blue"
            placeholderColor="#999999"
            menuBackgroundColor="#ffffff"
            menuItemTextColor="#333333"
            menuItemActiveColor="#e0e0e0"          
            countries={[
              { code: 'DZ', flag: '🇩🇿', callingCode: '213' },
              { code: 'SA', flag: '🇸🇦', callingCode: '966' },
              { code: 'TN', flag: '🇹🇳', callingCode: '216' },
            ]}
            onCountryChange={(country) => {
              console.log('Selected country:', country);
            }}
            error={false}
          />
              ))}
            </View>
          </ScrollView>
        </View>

        {/* Footer Section */}
        <View style={styles.footerSection}>
          <CustomButton 
            onPress={() => console.log('PhoneSignIn')}
            style={styles.button}
          >
            {'save'}
          </CustomButton>
        </View>
      </View>
    </Background>
  );
};

const calculateLogoSize = (screenWidth: number) => {
  const baseSize = 150;
  const scaleFactor = 1 - (screenWidth / 1000);
  const size = baseSize * Math.max(scaleFactor, 0.4);
  return Math.min(Math.max(size, 80), 150);
};

const styles = StyleSheet.create({
  background: {
    backgroundColor: 'white',
    flex: 1,
  },
  scrollWrapper: {
    flexGrow: 1,
    minHeight: '100%',
    minWidth: '100%'
  },
  mainContainer: {
    flex: 1,
    width: '100%',
    minHeight: '100%',
  },
  headerSection: {
    backgroundColor: '#4332FF',
    paddingHorizontal: 20,
    paddingBottom: 20,
    zIndex: 1,  // تقليل zIndex
  },
  headerContainer: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  header: {
    width: '100%',
    height: 40,
    flexDirection: 'row',
    alignItems: 'center',
    position:'relative',
  },
  headerContent: {
    flex: 1,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  selectWrapper: {
    width: 120,
    position: 'relative',
    zIndex: 9999,  // زيادة zIndex
  },
  selectInput: {
    height: 35, // ارتفاع أصغر
    minHeight: 35,
    borderColor: 'transparent',
    backgroundColor: 'rgba(255,255,255,0.1)',
  },
  headerText: {
    color: 'white',
    padding: 0,
    margin: 0,
  },
  formSection: {
    padding: 30,
    gap: 30,
    flex: 2,
    zIndex: 0,  // تقليل zIndex
  },
  inputContainer: {
    width: '100%',
    gap: 15,
    zIndex: 1, // تقليل قيمة zIndex

  },
  footerSection: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    zIndex: 1, // تقليل قيمة zIndex
  },
  button: {
    width: '80%',
    height: 50,
  },
});

export default HistoryPage;