import React from 'react';
import { View, StyleSheet, Modal, TouchableOpacity, Dimensions } from 'react-native';
import CustomText from './CustomText';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { colors } from '../theme/colors';
import { metrics } from '../theme/metrics';

const { width } = Dimensions.get('window');

const CustomAlert = ({
  visible,
  onClose,
  title,
  message,
  type = 'success', // success, error, warning, info
  buttonText = 'OK',
  onButtonPress,
}) => {
  const getIconName = () => {
    switch (type) {
      case 'success':
        return 'check-circle';
      case 'error':
        return 'error';
      case 'warning':
        return 'warning';
      case 'info':
        return 'info';
      default:
        return 'check-circle';
    }
  };

  const getIconColor = () => {
    switch (type) {
      case 'success':
        return colors.primary;
      case 'error':
        return colors.error;
      case 'warning':
        return colors.warning;
      case 'info':
        return colors.info;
      default:
        return colors.primary;
    }
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.alertContainer}>
          <Icon 
            name={getIconName()} 
            size={50} 
            color={getIconColor()} 
            style={styles.icon}
          />
          
          <CustomText variant="h2" style={styles.title}>
            {title}
          </CustomText>
          
          <CustomText variant="body1" style={styles.message}>
            {message}
          </CustomText>

          <TouchableOpacity
            style={styles.button}
            onPress={onButtonPress || onClose}
          >
            <CustomText style={styles.buttonText}>
              {buttonText}
            </CustomText>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  alertContainer: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 24,
    width: width * 0.85,
    alignItems: 'center',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 10,
      },
      android: {
        elevation: 5,
      },
    }),
  },
  icon: {
    marginBottom: 16,
  },
  title: {
    fontSize: metrics.fontSize.lg,
    fontWeight: '600',
    color: colors.text.primary,
    marginBottom: 8,
    textAlign: 'center',
  },
  message: {
    fontSize: metrics.fontSize.md,
    color: colors.text.secondary,
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 22,
  },
  button: {
    backgroundColor: colors.primary,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 12,
    minWidth: 120,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: metrics.fontSize.md,
    fontWeight: '600',
  },
});

export default CustomAlert;
