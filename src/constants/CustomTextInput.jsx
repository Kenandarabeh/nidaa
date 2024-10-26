import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Image } from 'react-native';
import SvgIcon from '../assets/images/SvgIcon';

const CustomTextInput = ({ iconSource, placeholder, value, onChangeText, onFocus, onBlur, editable, secureTextEntry }) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View style={[styles.inputContainer, isFocused ? styles.borderActive : styles.borderInactive]}>
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        placeholderTextColor={isFocused ? 'transparent' : 'gray'}
        value={value}
        onChangeText={onChangeText}
        onFocus={() => {
          setIsFocused(true);
          onFocus && onFocus();
        }}
        onBlur={() => {
          setIsFocused(false);
          onBlur && onBlur();
        }}
        editable={editable}
        secureTextEntry={secureTextEntry}
      />
      <SvgIcon icon={'email'} width="24" height="24" marginRight={20} style={styles.icon}  />
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 15,
    width: '100%',
    height: 65,
    marginVertical: 10,
    fontSize: 16,
    borderWidth: 2,
    borderColor: 'transparent',
    transition: 'border-color 0.3s ease',
  },
  input: {
    flex: 1,
    paddingRight: 20,
    color: 'gray',
    textAlign: 'right',
  },
  icon: {
    marginRight: 15,
  },
  borderActive: {
    borderColor: 'blue',
  },
  borderInactive: {
    borderColor: 'transparent',
  },
});

export default CustomTextInput;