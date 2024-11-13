import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { TextInput, Text, Menu } from 'react-native-paper';
import { colors } from '../theme/colors';

const PhoneInput = ({
  value,
  onChangeText,
  error,
  containerStyle,
  inputStyle,
  disabled = false,
  countries = [
    { code: 'DZ', flag: '🇩🇿', callingCode: '213' },
    // المستخدم يمكنه إضافة دول أخرى هنا
  ],
  // props جديدة للتحكم في الألوان
  inputBackgroundColor = '#f5f5f5',
  inputBorderColor = colors.primary,
  inputTextColor = '#000000',
  placeholderColor = '#757575',
  menuBackgroundColor = '#ffffff',
  menuItemTextColor = '#000000',
  menuItemActiveColor = '#f0f0f0',
}) => {
  const [menuVisible, setMenuVisible] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState(countries[0]);

  const formatPhoneNumber = (number) => {
    const cleaned = number.replace(/\D/g, '');
    const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
    if (match) {
      return `${match[1]} ${match[2]} ${match[3]}`;
    }
    return cleaned;
  };

  const handlePhoneChange = (text) => {
    const formattedNumber = formatPhoneNumber(text);
    onChangeText?.(formattedNumber);
  };

  return (
    <Menu
      visible={menuVisible}
      onDismiss={() => setMenuVisible(false)}
      anchor={
        <TextInput
          mode="outlined"
          style={[
            styles.input,
            containerStyle,
            inputStyle,
            { backgroundColor: inputBackgroundColor }
          ]}
          value={value}
          onChangeText={handlePhoneChange}
          keyboardType="phone-pad"
          placeholder="5XX XXX XXXX"
          error={error}
          disabled={disabled}
          left={
            <TextInput.Affix 
              text={`${selectedCountry.flag} +${selectedCountry.callingCode}`}
              textStyle={{ 
                textDecorationLine: countries.length > 1 ? 'underline' : 'none',
                color: inputTextColor
              }}
              onPress={() => !disabled && countries.length > 1 && setMenuVisible(true)}
            />
          }
          outlineStyle={[
            styles.outline,
            { borderColor: inputBorderColor }
          ]}
          contentStyle={[
            styles.inputContent,
            { color: inputTextColor }
          ]}
          theme={{
            colors: {
              primary: inputBorderColor,
              error: colors.error,
              placeholder: placeholderColor,
              text: inputTextColor,
            }
          }}
        />
      }
      contentStyle={{ backgroundColor: menuBackgroundColor }}
    >
      {countries.map((country) => (
        <Menu.Item
          key={country.code}
          onPress={() => {
            setSelectedCountry(country);
            setMenuVisible(false);
          }}
          title={`${country.flag} +${country.callingCode}`}
          titleStyle={{ color: menuItemTextColor }}
          style={{ backgroundColor: menuBackgroundColor }}
          rippleColor={menuItemActiveColor}
        />
      ))}
    </Menu>
  );
};

const styles = StyleSheet.create({
  input: {
    backgroundColor: '#f5f5f5',
  },
  outline: {
    borderRadius: 8,
  },
  inputContent: {
    fontSize: 16,
  },
});

export default PhoneInput;