import { StyleSheet } from 'react-native';
import { metrics, normalize } from './metrics';
import { colors } from './colors';

export const globalStyles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.background,
  },
  
  // المحتوى
  container: {
    flex: 1,
    paddingHorizontal: metrics.spacing.md,
  },
  
  // البطاقات
  card: {
    backgroundColor: colors.surface,
    borderRadius: metrics.containers.borderRadius,
    padding: metrics.containers.padding,
    ...Platform.select({
      ios: {
        shadowColor: colors.shadow,
        shadowOffset: { width: 0, height: normalize(2) },
        shadowOpacity: 0.1,
        shadowRadius: normalize(8),
      },
      android: {
        elevation: metrics.containers.elevation,
      },
    }),
  },
  
  // النصوص
  text: {
    small: {
      fontSize: metrics.fontSize.sm,
      color: colors.text.primary,
    },
    medium: {
      fontSize: metrics.fontSize.md,
      color: colors.text.primary,
    },
    large: {
      fontSize: metrics.fontSize.lg,
      color: colors.text.primary,
    },
  },
  
  // الشعار
  logo: {
    container: {
      width: metrics.logo.size,
      height: metrics.logo.size,
      borderRadius: metrics.logo.borderRadius,
      backgroundColor: colors.surface,
      alignItems: 'center',
      justifyContent: 'center',
      ...Platform.select({
        ios: {
          shadowColor: colors.shadow,
          shadowOffset: { width: 0, height: normalize(2) },
          shadowOpacity: 0.1,
          shadowRadius: normalize(4),
        },
        android: {
          elevation: metrics.containers.elevation,
        },
      }),
    },
    image: {
      width: metrics.percentage.twoThirds,
      height: metrics.percentage.twoThirds,
    },
  },

  // الأزرار
  button: {
    container: {
      height: metrics.specific.buttonHeight,
      borderRadius: metrics.containers.borderRadius,
      alignItems: 'center',
      justifyContent: 'center',
      paddingHorizontal: metrics.spacing.xl,
    },
    text: {
      fontSize: metrics.fontSize.md,
      fontWeight: '600',
    },
  },

  // المدخلات
  input: {
    container: {
      height: metrics.specific.inputHeight,
      borderRadius: metrics.containers.borderRadius,
      borderWidth: normalize(1),
      paddingHorizontal: metrics.spacing.md,
    },
    text: {
      fontSize: metrics.fontSize.md,
    },
  },
});
