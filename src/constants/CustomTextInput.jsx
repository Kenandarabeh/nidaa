import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Image } from 'react-native';

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
      <Image source={iconSource} style={styles.icon} />
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 10,
    width: '100%',
    height: 60,
    marginVertical: 10,
    fontSize: 16,
    borderWidth: 2,
    borderColor: 'transparent',
    transition: 'border-color 0.3s ease',
  },
  input: {
    flex: 1,
    paddingRight: 20,
    backgroundColor: 'white',
    color: 'gray',
    textAlign: 'right',
  },
  icon: {
    width: 24,
    height: 24,
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