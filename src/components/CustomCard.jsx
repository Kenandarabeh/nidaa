import React from 'react';
import {
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  Platform,
  Animated,
} from 'react-native';
import { colors } from '../theme/colors';

const CustomCard = ({
  imageSource,
  size = 120,
  borderRadius = 16,
  onPress,
  style,
  imageStyle,
  elevation = 4,
  activeScale = 0.95,
  disabled = false,
  resizeMode = 'cover',
}) => {
  const scale = React.useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    if (disabled) return;
    Animated.spring(scale, {
      toValue: activeScale,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    if (disabled) return;
    Animated.spring(scale, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      disabled={disabled}
    >
      <Animated.View
        style={[
          styles.container,
          {
            width: size,
            height: size,
            borderRadius: borderRadius,
            transform: [{ scale }],
          },
          Platform.select({
            ios: {
              shadowOffset: { width: 0, height: elevation / 2 },
              shadowOpacity: 0.3,
              shadowRadius: elevation,
            },
            android: {
              elevation: elevation,
            },
          }),
          style,
        ]}
      >
        <Image
          source={typeof imageSource === 'string' ? { uri: imageSource } : imageSource}
          style={[
            styles.image,
            {
              width: size,
              height: size,
              borderRadius: borderRadius,
            },
            imageStyle,
          ]}
          resizeMode={resizeMode}
        />
      </Animated.View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background,
    overflow: 'hidden',
    shadowColor: colors.shadow,
  },
  image: {
    width: '100%',
    height: '100%',
  },
});

export default React.memo(CustomCard);
