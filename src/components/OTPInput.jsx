import React, { useState, useRef, useEffect, forwardRef, useImperativeHandle } from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  Keyboard,
  Platform,
  Animated,
} from 'react-native';
import { colors } from '../theme/colors';

const OTPInput = forwardRef(({
  length = 4,
  value = '',
  onChangeText,
  direction = 'ltr',
  autoFocus = true,
  disabled = false,
  error = false,
  inputStyle,
  containerStyle,
}, ref) => {
  const [inputValues, setInputValues] = useState(new Array(length).fill(''));
  const inputRefs = useRef(new Array(length).fill(null));
  const shakeAnimation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (value) {
      const valueArray = value.split('');
      setInputValues(new Array(length).fill('').map((_, i) => valueArray[i] || ''));
    }
  }, [value, length]);

  useEffect(() => {
    if (error) {
      startShakeAnimation();
    }
  }, [error]);

  const startShakeAnimation = () => {
    Animated.sequence([
      Animated.timing(shakeAnimation, {
        toValue: 10,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(shakeAnimation, {
        toValue: -10,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(shakeAnimation, {
        toValue: 0,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const handleChange = (text, index) => {
    if (disabled) return;

    const newValue = text.replace(/[^0-9]/g, '');
    const newInputValues = [...inputValues];
    newInputValues[index] = newValue;
    setInputValues(newInputValues);

    const combinedValue = newInputValues.join('');
    onChangeText?.(combinedValue);

    if (newValue !== '') {
      if (index < length - 1) {
        inputRefs.current[index + 1]?.focus();
      } else {
        inputRefs.current[index]?.blur();
        Keyboard.dismiss();
      }
    }
  };

  const handleKeyPress = (event, index) => {
    if (event.nativeEvent.key === 'Backspace' && !inputValues[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
      const newInputValues = [...inputValues];
      newInputValues[index - 1] = '';
      setInputValues(newInputValues);
      onChangeText?.(newInputValues.join(''));
    }
  };

  return (
    <Animated.View 
      style={[
        styles.container,
        { flexDirection: direction === 'rtl' ? 'row-reverse' : 'row' },
        { transform: [{ translateX: shakeAnimation }] },
        containerStyle
      ]}
    >
      {Array(length).fill(0).map((_, index) => (
        <TextInput
          key={index}
          ref={el => inputRefs.current[index] = el}
          style={[
            styles.input,
            error && styles.inputError,
            inputValues[index] && styles.inputFilled,
            disabled && styles.inputDisabled,
            inputStyle
          ]}
          value={inputValues[index]}
          onChangeText={(text) => handleChange(text, index)}
          onKeyPress={(event) => handleKeyPress(event, index)}
          keyboardType="numeric"
          maxLength={1}
          selectTextOnFocus
          autoFocus={autoFocus && index === 0}
          editable={!disabled}
          caretHidden={true}
        />
      ))}
    </Animated.View>
  );
});

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    gap: 8,
  },
  input: {
    flex: 1,
    height: 56,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: colors.border.default,
    backgroundColor: colors.input.background,
    fontSize: 24,
    textAlign: 'center',
    color: colors.text.primary,
    fontWeight: '600',
    ...Platform.select({
      ios: {
        shadowColor: colors.shadow,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  inputError: {
    borderColor: colors.feedback.error,
    backgroundColor: colors.feedback.errorLight,
  },
  inputFilled: {
    borderColor: colors.border.active,
    backgroundColor: colors.background,
  },
  inputDisabled: {
    opacity: 0.6,
    backgroundColor: colors.input.disabled,
  },
});

export default OTPInput;
