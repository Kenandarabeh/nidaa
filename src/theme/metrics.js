import { Dimensions, PixelRatio } from 'react-native';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

// اعتماد قياس مرجعي (مثلاً تصميم آيفون 12)
const baseWidth = 390;
const baseHeight = 844;

const scaleWidth = SCREEN_WIDTH / baseWidth;
const scaleHeight = SCREEN_HEIGHT / baseHeight;

// حساب المقياس النسبي
const scale = Math.min(scaleWidth, scaleHeight);

export const normalize = (size) => {
  const newSize = size * scale;
  return Math.round(PixelRatio.roundToNearestPixel(newSize));
};

export const metrics = {
  // الأحجام الأساسية
  screenWidth: SCREEN_WIDTH,
  screenHeight: SCREEN_HEIGHT,

  // الهوامش والمسافات
  spacing: {
    xs: normalize(4),
    sm: normalize(8),
    md: normalize(16),
    lg: normalize(24),
    xl: normalize(32),
    xxl: normalize(40),
  },

  // الأيقونات والشعار
  icon: {
    xs: normalize(16),
    sm: normalize(20),
    md: normalize(24),
    lg: normalize(32),
    xl: normalize(40),
  },

  // النصوص
  fontSize: {
    xs: normalize(12),
    sm: normalize(14),
    md: normalize(16),
    lg: normalize(18),
    xl: normalize(20),
    xxl: normalize(24),
  },

  // الحاويات والبطاقات
  containers: {
    borderRadius: normalize(12),
    padding: normalize(16),
    elevation: normalize(4),
  },

  // الشعار
  logo: {
    size: normalize(80),
    borderRadius: normalize(40),
  },

  // النسب المئوية
  percentage: {
    full: '100%',
    half: '50%',
    quarter: '25%',
    third: '33.33%',
    twoThirds: '66.67%',
  },

  // أحجام محددة
  specific: {
    inputHeight: normalize(56),
    buttonHeight: normalize(48),
    headerHeight: normalize(60),
  }
};
