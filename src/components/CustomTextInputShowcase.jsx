import React, { useState, useRef, useCallback } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import CustomTextInput from '../constants/CustomTextInput';
import { colors } from '../theme/colors'; // Add this import
import ProfileImageInput from './ProfileImageInput';
import CustomCard from './CustomCard';

const CustomTextInputShowcase = () => {
  const [values, setValues] = useState({
    basic: '',
    withIcon: '',
    withError: '',
    withHelper: '',
    disabled: 'Disabled input',
    rtlInput: '',
    password: '',
    number: '',
    select: null,
    selectError: '',
    noClear: '',
    phone: '',
    formattedPhone: '',
    otp4: '',
    otp6: '',
    otpRTL: '',
    otpError: '',
    phoneLTR: '',
    phoneRTL: '',
  });
  const [profileImage, setProfileImage] = useState(null);

  const inputRef = useRef(null);
  const phoneInputRef = useRef(null);

  const handleChange = (field) => (text) => {
    setValues(prev => ({ ...prev, [field]: text }));
  };

  // Options for select input
  const selectOptions = [
    { label: 'Option 1', value: '1' },
    { label: 'Option 2', value: '2' },
    { label: 'Option 3', value: '3' },
    { label: 'Option 4', value: '4' },
  ];

  // Add handleProfileImageChange as a useCallback
  const handleProfileImageChange = useCallback((image) => {
    setProfileImage(image);
    console.log('Selected image:', image);
  }, []);

  // Add these sample images
  const sampleImages = {
    local: require('../assets/images/logo.png'), // Update path as needed
    remote: 'https://picsum.photos/500',
    highRes: 'https://picsum.photos/1000',
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        {/* Basic Input with clear button */}
        <CustomTextInput
          placeholder="Basic Input"
          value={values.basic}
          onChangeText={handleChange('basic')}
          showClear={true}
        />

        {/* Input with Icon */}
        <CustomTextInput
          iconName="person"
          placeholder="Input with Icon"
          value={values.withIcon}
          onChangeText={handleChange('withIcon')}
        />

        {/* Input with Error */}
        <CustomTextInput
          iconName="email"
          placeholder="Input with Error"
          value={values.withError}
          onChangeText={handleChange('withError')}
          error={true}
          helperText="This is an error message"
        />

        {/* Input with Helper Text */}
        <CustomTextInput
          iconName="info"
          placeholder="Input with Helper"
          value={values.withHelper}
          onChangeText={handleChange('withHelper')}
          helperText="This is a helper message"
        />

        {/* Disabled Input */}
        <CustomTextInput
          iconName="lock"
          placeholder="Disabled Input"
          value={values.disabled}
          onChangeText={handleChange('disabled')}
          editable={false}
        />

        {/* RTL Input */}
        <CustomTextInput
          iconName="text-format"
          placeholder="RTL Input نص عربي"
          value={values.rtlInput}
          onChangeText={handleChange('rtlInput')}
          direction="rtl"
        />

        {/* Password Input with visibility toggle */}
        <CustomTextInput
          iconName="lock"
          placeholder="Password Input"
          secureTextEntry
          value={values.password}
          onChangeText={handleChange('password')}
          showClear={true}
          showPasswordToggle={true}
        />

        {/* Number Input */}
        <CustomTextInput
          iconName="dialpad"
          placeholder="Number Input"
          keyboardType="numeric"
          value={values.number}
          onChangeText={handleChange('number')}
        />

        {/* Select Input */}
        <CustomTextInput
          type="select"
          placeholder="Select an option"
          value={values.select}
          onChangeText={(value) => setValues(prev => ({ ...prev, select: value }))}
          options={selectOptions}
          style={styles.selectInput}
          dropDownContainerStyle={styles.dropDownContainer}
          labelStyle={styles.selectLabel}
          error={false}
          helperText="Please select an option"
        />

        {/* Select with Error */}
        <CustomTextInput
          type="select"
          iconName="arrow-drop-down"
          placeholder="Select with error"
          value={values.selectError}
          options={selectOptions}
          error={true}
          helperText="Please select an option"
          onSelect={(option) => setValues(prev => ({ ...prev, selectError: option.label }))}
        />

        {/* Disabled Select */}
        <CustomTextInput
          type="select"
          iconName="arrow-drop-down"
          placeholder="Disabled select"
          value="Disabled option"
          options={selectOptions}
          editable={false}
        />

        {/* Input without clear button */}
        <CustomTextInput
          placeholder="No Clear Button"
          value={values.noClear}
          onChangeText={handleChange('noClear')}
          showClear={false}
        />

        {/* Phone Input with Custom Styling and Limited Countries */}
        <CustomTextInput
          ref={phoneInputRef}
          type="phone"
          placeholder="رقم الهاتف"
          value={values.phone}
          onChangeText={handleChange('phone')}
          direction="rtl"
          allowedCountries={['SA', 'AE', 'KW', 'BH', 'OM', 'QA']} // دول الخليج فقط
          initialCountry="SA"
          flagSize={30}
          filterInputMode={true}
          phoneInputStyle={{
            containerStyle: {
              backgroundColor: '#fff',
            },
            textInputStyle: {
              fontSize: 18,
            },
            codeTextStyle: {
              fontWeight: 'bold',
            },
          }}
          phoneProps={{
            onChangeFormattedText: (text) => {
              setValues(prev => ({ ...prev, formattedPhone: text }));
            },
            withShadow: true,
            autoFocus: false,
            countryPickerProps: {
              preferredCountries: ['SA', 'AE'],
              modalProps: {
                statusBarTranslucent: true,
              },
            },
          }}
          onCountryChange={(country) => {
            console.log('Selected country:', country);
          }}
          helperText={values.formattedPhone ? `Formatted: ${values.formattedPhone}` : null}
        />

        {/* LTR Phone Input Example */}
        <CustomTextInput
          type="phone"
          placeholder="Phone Number"
          value={values.phoneLTR}
          onChangeText={handleChange('phoneLTR')}
          direction="ltr"
          allowedCountries={['SA', 'AE', 'KW', 'BH', 'OM', 'QA']}
          initialCountry="SA"
          helperText="Enter your phone number"
          phoneInputStyle={{
            containerStyle: styles.phoneContainer,
            textInputStyle: styles.phoneTextInput,
          }}
        />

        {/* RTL Phone Input Example */}
        <CustomTextInput
          type="phone"
          placeholder="رقم الهاتف"
          value={values.phoneRTL}
          onChangeText={handleChange('phoneRTL')}
          direction="rtl"
          allowedCountries={['SA', 'AE', 'KW', 'BH', 'OM', 'QA']}
          initialCountry="SA"
          helperText="أدخل رقم هاتفك"
          phoneInputStyle={{
            containerStyle: styles.phoneContainer,
            textInputStyle: styles.phoneTextInput,
          }}
        />

        {/* Basic 4-digit OTP Input */}
        <CustomTextInput
          type="otp"
          placeholder="Enter 4-digit OTP"
          value={values.otp4}
          onChangeText={handleChange('otp4')}
          otpLength={4}
        />

        {/* 6-digit OTP Input */}
        <CustomTextInput
          type="otp"
          placeholder="Enter 6-digit OTP"
          value={values.otp6}
          onChangeText={handleChange('otp6')}
          otpLength={6}
          helperText="Enter the 6-digit code sent to your phone"
        />

        {/* RTL OTP Input */}
        <CustomTextInput
          type="otp"
          placeholder="أدخل رمز التحقق"
          value={values.otpRTL}
          onChangeText={handleChange('otpRTL')}
          otpLength={5}
          direction="rtl"
          helperText="تم إرسال رمز التحقق إلى هاتفك"
        />

        {/* OTP Input with Error */}
        <CustomTextInput
          type="otp"
          placeholder="OTP with Error"
          value={values.otpError}
          onChangeText={handleChange('otpError')}
          otpLength={4}
          error={true}
          helperText="Invalid verification code"
        />
      </View>

<ProfileImageInput
  size={150}
  value={profileImage}
  onChange={handleProfileImageChange}
  quality={0.9}
  maxWidth={2048}
  maxHeight={2048}
  title="Profile Picture"
  subtitle="Tap to upload your photo"
/>

<ProfileImageInput
  size={120}
  value={profileImage}
  onChange={handleProfileImageChange}
  error={true}
  title="With Error"
  subtitle="Something went wrong"
/>

<ProfileImageInput
  size={120}
  value={profileImage}
  onChange={handleProfileImageChange}
  disabled={true}
  title="Disabled"
  subtitle="Cannot change photo"
/>

<ProfileImageInput
  size={120}
  value={profileImage}
  onChange={handleProfileImageChange}
  loading={true}
  title="Loading"
  subtitle="Please wait..."
/>

        {/* Floating Camera Button (Default) */}
        <ProfileImageInput
          size={120}
          value={profileImage}
          onChange={handleProfileImageChange}
          title="Floating Camera"
          cameraButtonVariant="floating"
          cameraButtonColor="#2196F3"
        />

        {/* Overlapping Camera Button */}
        <ProfileImageInput
          size={120}
          value={profileImage}
          onChange={handleProfileImageChange}
          title="Overlapping Camera"
          cameraButtonVariant="overlapping"
          cameraButtonColor="#4CAF50"
        />

        {/* Pill-shaped Camera Button */}
        <ProfileImageInput
          size={120}
          value={profileImage}
          onChange={handleProfileImageChange}
          title="Pill Camera"
          cameraButtonVariant="pill"
          cameraButtonColor="#FF9800"
        />

        {/* Outline Camera Button */}
        <ProfileImageInput
          size={120}
          value={profileImage}
          onChange={handleProfileImageChange}
          title="Outline Camera"
          cameraButtonVariant="outline"
          cameraButtonColor="#9C27B0"
          cameraIconColor="#9C27B0"
        />

        {/* Gradient-style Camera Button */}
        <ProfileImageInput
          size={120}
          value={profileImage}
          onChange={handleProfileImageChange}
          title="Gradient Camera"
          cameraButtonVariant="gradient"
          cameraButtonColor="#E91E63"
          cameraIconSize={26}
        />

        {/* Custom Camera Button */}
        <ProfileImageInput
          size={120}
          value={profileImage}
          onChange={handleProfileImageChange}
          title="Custom Camera"
          cameraButtonVariant="floating"
          cameraButtonColor="#FF5722"
          cameraButtonStyle={{
            right: -20,
            bottom: -10,
            width: 56,
            height: 56,
            borderRadius: 28,
            borderWidth: 4,
          }}
          cameraIconSize={28}
        />

        {/* View-only Profile Image (No Camera) */}
        <ProfileImageInput
          size={120}
          value={profileImage}
          onChange={handleProfileImageChange}
          title="View Only Image"
          subtitle="No camera button"
          isViewOnly={true}
        />

        {/* Hidden Camera Button */}
        <ProfileImageInput
          size={120}
          value={profileImage}
          onChange={handleProfileImageChange}
          title="Hidden Camera"
          subtitle="Image with hidden camera"
          showCameraButton={false}
        />

        {/* Example with only image display */}
        <ProfileImageInput
          size={120}
          value={profileImage}
          title="Display Only"
          isViewOnly={true}
          showCameraButton={false}
          subtitle=""
        />

        {/* Cards Showcase Section */}
        <View style={styles.cardsSection}>
          {/* Basic Card */}
          <CustomCard
            imageSource={sampleImages.remote}
            size={120}
            borderRadius={16}
            onPress={() => console.log('Card pressed')}
          />

          {/* High Resolution Card */}
          <CustomCard
            imageSource={sampleImages.highRes}
            size={150}
            borderRadius={20}
            elevation={8}
            style={styles.customCard}
          />

          {/* Local Image Card */}
          <CustomCard
            imageSource={sampleImages.local}
            size={100}
            borderRadius={12}
            resizeMode="contain"
          />

          {/* Custom Styled Card */}
          <CustomCard
            imageSource={sampleImages.remote}
            size={130}
            borderRadius={25}
            style={styles.fancyCard}
            elevation={12}
          />
        </View>
    </ScrollView>
  );
};

// Add these new styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  content: {
    padding: 16,
  },
  // Updated phone styles with colors from theme
  phoneContainer: {
    backgroundColor: colors.input.background,
  },
  phoneTextInput: {
    fontSize: 16,
    color: colors.text.primary,
  },
  cardsSection: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    gap: 16,
    paddingVertical: 20,
  },
  customCard: {
    borderWidth: 2,
    borderColor: colors.primary,
  },
  fancyCard: {
    borderWidth: 3,
    borderColor: colors.primary,
    backgroundColor: colors.background,
    ...Platform.select({
      ios: {
        shadowColor: colors.primary,
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.4,
        shadowRadius: 8,
      },
      android: {
        elevation: 12,
      },
    }),
  },
  selectInput: {
    backgroundColor: colors.input.background,
    borderRadius: 12,
    borderWidth: 0,
    height: 56,
    paddingHorizontal: 16,
    marginBottom: 8,
  },
  dropDownContainer: {
    backgroundColor: colors.background,
    borderRadius: 12,
    borderColor: colors.border.active,
    borderWidth: 1,
    shadowColor: colors.shadow,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 8,
  },
  selectLabel: {
    fontSize: 16,
    color: colors.text.primary,
    fontWeight: '500',
  },
});

export default CustomTextInputShowcase;