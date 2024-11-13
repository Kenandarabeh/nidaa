import React from 'react';
import { Text as RNText, StyleSheet } from 'react-native';

const fontConfig = {
  thin: 'Tajawal-Light',
  extralight: 'Tajawal-Light',
  light: 'Tajawal-Light',
  normal: 'Tajawal-Regular',
  regular: 'Tajawal-Regular',
  medium: 'Tajawal-Medium',
  semibold: 'Tajawal-Bold',
  bold: 'Tajawal-Bold',
  extrabold: 'Tajawal-Bold',
  black: 'Tajawal-Bold',
  '100': 'Tajawal-Light',
  '200': 'Tajawal-Light',
  '300': 'Tajawal-Light',
  '400': 'Tajawal-Regular',
  '500': 'Tajawal-Medium',
  '600': 'Tajawal-Bold',
  '700': 'Tajawal-Bold',
  '800': 'Tajawal-Bold',
  '900': 'Tajawal-Bold',
};

const getStyleProperty = (style, property) => {
  if (!style) return null;
  if (Array.isArray(style)) {
    for (let i = style.length - 1; i >= 0; i--) {
      const value = getStyleProperty(style[i], property);
      if (value !== null) return value;
    }
    return null;
  }
  return style[property] || null;
};

const Text = React.forwardRef(({ 
  style, 
  variant = 'body',
  color,
  center,
  ...props 
}, ref) => {
  const weight = getStyleProperty(style, 'fontWeight') || 'medium';
  const fontFamily = fontConfig[weight.toLowerCase()] || 'Tajawal-Medium';

  const finalStyle = [
    styles.defaultText,
    styles[variant],
    { fontFamily },
    center && styles.center,
    color && { color },
    style
  ];

  return <RNText ref={ref} style={finalStyle} {...props} />;
});

const styles = StyleSheet.create({
  defaultText: {
    color: 'blue',
    fontSize: 16,
  },
  center: {
    textAlign: 'center',
  },
  h1: {
    fontSize: 32,
    fontWeight: 'bold',
    lineHeight: 40,
  },
  h2: {
    fontSize: 24,
    fontWeight: 'bold',
    lineHeight: 32,
  },
  h3: {
    fontSize: 20,
    fontWeight: 'bold',
    lineHeight: 28,
  },
  body: {
    fontSize: 16,
    lineHeight: 24,
  },
  caption: {
    fontSize: 14,
    lineHeight: 20,
  },
  small: {
    fontSize: 12,
    lineHeight: 16,
  },
});

export default Text;