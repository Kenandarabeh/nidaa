import React from 'react';
import { Pressable, StyleSheet, Text as RNText, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { colors } from '../theme/colors';

const CustomButton = ({
  onPress,
  children,
  variant = 'filled',
  disabled = false,
  style,
  textStyle,
  startIcon,
  endIcon,
  color = 'primary',
  size = 'medium',
  ...props
}) => {
  const getButtonStyle = () => {
    const baseStyle = [styles.button, styles[`${size}Button`]];
    
    if (variant === 'filled') {
      baseStyle.push(styles.filledButton);
      disabled && baseStyle.push(styles.filledDisabled);
    } else if (variant === 'outlined') {
      baseStyle.push(styles.outlinedButton);
      disabled && baseStyle.push(styles.outlinedDisabled);
    } else if (variant === 'text') {
      baseStyle.push(styles.textButton);
      disabled && baseStyle.push(styles.textDisabled);
    }

    return baseStyle;
  };

  const getTextStyle = () => {
    const baseStyle = [styles.buttonText, styles[`${size}Text`]];
    
    if (variant === 'filled') {
      baseStyle.push(styles.filledText);
    } else if (variant === 'outlined') {
      baseStyle.push(styles.outlinedText);
    } else if (variant === 'text') {
      baseStyle.push(styles.textOnlyText);
    }

    if (disabled) {
      baseStyle.push(styles.disabledText);
    }

    return baseStyle;
  };

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={({ pressed }) => [
        ...getButtonStyle(),
        pressed && styles.pressed,
        style,
      ]}
      {...props}
    >
      <View style={styles.contentContainer}>
        {startIcon && (
          <Icon 
            name={startIcon} 
            size={24} 
            color={variant === 'filled' ? '#fff' : colors.button.primary}
            style={styles.startIcon}
          />
        )}
        {typeof children === 'string' ? (
          <RNText style={[...getTextStyle(), textStyle]}>
            {children}
          </RNText>
        ) : children}
        {endIcon && (
          <Icon 
            name={endIcon} 
            size={24} 
            color={variant === 'filled' ? '#fff' : colors.button.primary}
            style={styles.endIcon} 
          />
        )}
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  contentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  smallButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  mediumButton: {
    paddingVertical: 12,
    paddingHorizontal: 24,
  },
  largeButton: {
    paddingVertical: 16,
    paddingHorizontal: 32,
  },
  filledButton: {
    backgroundColor: colors.button.primary,
  },
  outlinedButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: colors.primary,
  },
  textButton: {
    backgroundColor: 'transparent',
  },
  pressed: {
    opacity: 0.8,
  },
  filledDisabled: {
    backgroundColor: colors.disabled,
  },
  outlinedDisabled: {
    borderColor: colors.disabled,
  },
  textDisabled: {
    backgroundColor: 'transparent',
  },
  buttonText: {
    fontWeight: '600',
    textAlign: 'center',
  },
  smallText: {
    fontSize: 14,
  },
  mediumText: {
    fontSize: 16,
  },
  largeText: {
    fontSize: 18,
  },
  filledText: {
    color: '#FFFFFF',
  },
  outlinedText: {
    color: colors.primary,
  },
  textOnlyText: {
    color: colors.primary,
  },
  disabledText: {
    color: colors.textDisabled,
  },
  startIcon: {
    marginRight: 8,
  },
  endIcon: {
    marginLeft: 8,
  },
});

export default CustomButton;


