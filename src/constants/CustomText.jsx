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

const Text = React.forwardRef(({ style, ...props }, ref) => {
  const weight = getStyleProperty(style, 'fontWeight') || 'medium';
  const fontFamily = fontConfig[weight.toLowerCase()] || 'Tajawal-Medium';

  const finalStyle = [
    styles.defaultText,
    { fontFamily },
    // حذف fontWeight من الـ style لمنع التداخل
    Array.isArray(style) 
      ? style.map(s => ({ ...s, fontWeight: undefined }))
      : { ...style, fontWeight: undefined }
  ];

  return <RNText ref={ref} style={finalStyle} {...props} />;
});

const styles = StyleSheet.create({
  defaultText: {
    // الأنماط الافتراضية هنا
  },
});

export default Text;