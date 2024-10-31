import React from 'react';
import {TouchableOpacity, StyleSheet, ActivityIndicator} from 'react-native';
import CustomText from '../constants/CustomText'; // تأكد من تعديل المسار حسب الحاجة

const CustomButton = ({onPress, style, textStyle, children, loading ,disabled}) => {
  return (
    <TouchableOpacity disabled={disabled}  onPress={onPress} style={[styles.button, style ]}>
      {!loading && (
        <CustomText style={[styles.buttonText, textStyle]}>
          {children}
        </CustomText>
      )}
      {loading && <ActivityIndicator style={styles.activityIndicator} />}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    fontWeight: 'bold',
    borderRadius: 15,
    fontSize: 20,
    backgroundColor: 'rgba(0, 49, 67, 1)',
    height: 62,
    width: '100%',
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
    flexShrink: 0, // منع النص من تغيير حجم الزر
  },
  buttonText: {
    fontSize: 20,
    color: 'white',
    textAlign: 'center', // تأكد من أن النص يكون في المنتصف
  },
  activityIndicator: {
    color: 'white',
  },
});

export default CustomButton;
