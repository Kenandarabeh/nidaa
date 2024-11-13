import React, { useState, useCallback } from 'react';
import {
  View,
  Image,
  StyleSheet,
  Platform,
  TouchableOpacity,
  Text,
  Pressable,
  Animated,
  ActivityIndicator,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { launchImageLibrary } from 'react-native-image-picker';
import { colors } from '../theme/colors';

// Camera button style variants
const CAMERA_BUTTON_VARIANTS = {
  floating: {
    container: {
      position: 'absolute',
      right: -8,
      bottom: -8,
      width: 44,
      height: 44,
      borderRadius: 22,
      backgroundColor: colors.primary,
      justifyContent: 'center',
      alignItems: 'center',
      borderWidth: 3,
      borderColor: colors.background,
      shadowColor: colors.shadow,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.3,
      shadowRadius: 4,
      elevation: 6,
    },
    icon: {
      size: 20,
      color: colors.background,
    }
  },
  overlapping: {
    container: {
      position: 'absolute',
      right: '10%',
      bottom: -16,
      width: 48,
      height: 48,
      borderRadius: 24,
      backgroundColor: colors.primary,
      justifyContent: 'center',
      alignItems: 'center',
      borderWidth: 3,
      borderColor: colors.background,
      shadowColor: colors.shadow,
      shadowOffset: { width: 0, height: 3 },
      shadowOpacity: 0.3,
      shadowRadius: 5,
      elevation: 8,
    },
    icon: {
      size: 24,
      color: colors.background,
    }
  },
  pill: {
    container: {
      position: 'absolute',
      right: -12,
      bottom: '40%',
      paddingVertical: 8,
      paddingHorizontal: 12,
      borderRadius: 20,
      backgroundColor: colors.primary,
      justifyContent: 'center',
      alignItems: 'center',
      borderWidth: 2,
      borderColor: colors.background,
      shadowColor: colors.shadow,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.25,
      shadowRadius: 3,
      elevation: 5,
      flexDirection: 'row',
    },
    icon: {
      size: 16,
      color: colors.background,
    }
  },
  outline: {
    container: {
      position: 'absolute',
      right: -10,
      bottom: -10,
      width: 40,
      height: 40,
      borderRadius: 20,
      backgroundColor: colors.background,
      justifyContent: 'center',
      alignItems: 'center',
      borderWidth: 2,
      borderColor: colors.primary,
      shadowColor: colors.shadow,
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.2,
      shadowRadius: 2,
      elevation: 3,
    },
    icon: {
      size: 20,
      color: colors.primary,
    }
  },
  gradient: {
    container: {
      position: 'absolute',
      right: -15,
      bottom: '30%',
      width: 52,
      height: 52,
      borderRadius: 26,
      backgroundColor: colors.primary,
      justifyContent: 'center',
      alignItems: 'center',
      borderWidth: 3,
      borderColor: colors.background,
      shadowColor: colors.shadow,
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.35,
      shadowRadius: 6,
      elevation: 10,
    },
    icon: {
      size: 26,
      color: colors.background,
    }
  }
};

const ProfileImageInput = ({
  size = 120,
  value = null,
  onChange,
  defaultImage = null,
  quality = 0.8,
  maxWidth = 1024,
  maxHeight = 1024,
  disabled = false,
  loading = false,
  error = false,
  isNewUser = false,
  title = 'Profile Photo',
  subtitle = 'Tap to change your photo',
  containerStyle,
  imageStyle,
  // New props for camera button customization
  cameraButtonVariant = 'floating', // 'floating', 'overlapping', 'pill', 'outline', 'gradient'
  cameraButtonColor = colors.primary,
  cameraButtonStyle = {},
  cameraIconColor,
  cameraIconSize,
  showCameraButton = true, // Add this prop to control camera button visibility
  isViewOnly = false, // Add this prop to make component view-only
}) => {
  const [scale] = useState(new Animated.Value(1));
  const [isHovered, setIsHovered] = useState(false);

  const buttonVariant = CAMERA_BUTTON_VARIANTS[cameraButtonVariant] || CAMERA_BUTTON_VARIANTS.floating;

  const handlePressIn = () => {
    Animated.spring(scale, {
      toValue: 0.95,
      useNativeDriver: true,
    }).start();
    setIsHovered(true);
  };

  const handlePressOut = () => {
    Animated.spring(scale, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
    setIsHovered(false);
  };

  const handleImagePicker = useCallback(async () => {
    if (disabled || loading || !onChange) return; // تحقق من وجود onChange

    const options = {
      mediaType: 'photo',
      maxWidth,
      maxHeight,
      quality,
      includeBase64: true,
      selectionLimit: 1,
      presentationStyle: 'pageSheet',
    };

    try {
      const result = await launchImageLibrary(options);
      if (!result.didCancel && result.assets?.[0]) {
        onChange(result.assets[0]);
      }
    } catch (error) {
      console.error('Image picking error:', error);
    }
  }, [disabled, loading, maxWidth, maxHeight, quality, onChange]);

  const imageSource = value
    ? { uri: value.uri }
    : defaultImage || require('../assets/images/logo.png');

  const containerSize = {
    width: size,
    height: size,
    borderRadius: size / 2,
  };

  const renderOverlay = () => {
    if (loading) {
      return (
        <View style={[styles.overlay, styles.loadingOverlay]}>
          <ActivityIndicator color={colors.background} size="large" />
        </View>
      );
    }

    if (isHovered) {
      return (
        <View style={[styles.overlay, styles.hoverOverlay]}>
          <Icon
            name={isNewUser ? 'add-a-photo' : 'edit'}
            size={size * 0.25}
            color={colors.background}
          />
          <Text style={styles.overlayText}>
            {isNewUser ? 'Add Photo' : 'Change'}
          </Text>
        </View>
      );
    }

    return null;
  };

  const renderEditButton = () => {
    if (isNewUser && !value) {
      return (
        <View style={styles.addButtonContainer}>
          <TouchableOpacity
            style={styles.addButton}
            onPress={handleImagePicker}
            disabled={disabled || loading}
          >
            <Icon name="add" size={24} color={colors.background} />
          </TouchableOpacity>
        </View>
      );
    }

    if (!isNewUser && !isHovered) {
      return (
        <TouchableOpacity
          style={styles.editButton}
          onPress={handleImagePicker}
          disabled={disabled || loading}
        >
          <Icon
            name="photo-camera"
            size={20}
            color={colors.background}
          />
        </TouchableOpacity>
      );
    }

    return null;
  };

  const renderCameraButton = () => {
    if (!showCameraButton || isNewUser || loading || isViewOnly) return null;

    const buttonStyles = [
      buttonVariant.container,
      { backgroundColor: cameraButtonColor },
      cameraButtonStyle,
    ];

    return (
      <TouchableOpacity
        style={buttonStyles}
        onPress={handleImagePicker}
        disabled={disabled || loading}
      >
        <Icon
          name="photo-camera"
          size={cameraIconSize || buttonVariant.icon.size}
          color={cameraIconColor || buttonVariant.icon.color}
        />
        {cameraButtonVariant === 'pill' && (
          <Text style={[styles.pillButtonText, { color: colors.background }]}>
            Edit
          </Text>
        )}
      </TouchableOpacity>
    );
  };

  return (
    <View style={[styles.wrapper, containerStyle]}>
      {title && <Text style={styles.title}>{title}</Text>}
      
      <View style={styles.imageWrapper}>
        <Pressable
          onPressIn={!isViewOnly ? handlePressIn : null}
          onPressOut={!isViewOnly ? handlePressOut : null}
          onPress={!isViewOnly ? handleImagePicker : null}
          disabled={disabled || loading || isViewOnly}
        >
          <Animated.View 
            style={[
              styles.imageContainer,
              { width: size, height: size, borderRadius: size / 2 },
              { transform: [{ scale: isViewOnly ? 1 : scale }] },
              error && styles.errorContainer
            ]}
          >
            <Image
              source={imageSource}
              style={[
                styles.image,
                { width: size, height: size, borderRadius: size / 2 },
                imageStyle
              ]}
              resizeMode="cover"
            />
            
            {!isViewOnly && renderOverlay()}
          </Animated.View>
        </Pressable>

        {!isViewOnly && renderCameraButton()}
      </View>

      {subtitle && !isViewOnly && (
        <Text style={[
          styles.subtitle,
          error && styles.errorText
        ]}>
          {error ? 'Error uploading photo' : subtitle}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    alignItems: 'center',
    marginVertical: 24,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: colors.text.primary,
    marginBottom: 16,
  },
  imageContainer: {
    position: 'relative',
    overflow: 'hidden',
    backgroundColor: colors.gray[100],
    ...Platform.select({
      ios: {
        shadowColor: colors.shadow,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.15,
        shadowRadius: 8,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  image: {
    width: '100%',
    height: '100%',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  hoverOverlay: {
    backgroundColor: 'rgba(0,0,0,0.6)',
  },
  loadingOverlay: {
    backgroundColor: 'rgba(0,0,0,0.7)',
  },
  overlayText: {
    color: colors.background,
    fontSize: 14,
    fontWeight: '500',
    marginTop: 4,
  },
  editButton: {
    position: 'absolute',
    right: '10%',
    bottom: '10%',
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: colors.background,
    ...Platform.select({
      ios: {
        shadowColor: colors.shadow,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
      },
      android: {
        elevation: 6,
      },
    }),
  },
  addButtonContainer: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    left: 0,
    height: '30%',
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  addButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: colors.background,
    ...Platform.select({
      ios: {
        shadowColor: colors.shadow,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
      },
      android: {
        elevation: 6,
      },
    }),
  },
  errorContainer: {
    borderWidth: 2,
    borderColor: colors.feedback.error,
  },
  errorBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: colors.feedback.error,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: colors.background,
  },
  subtitle: {
    fontSize: 14,
    color: colors.text.secondary,
    marginTop: 8,
  },
  errorText: {
    color: colors.feedback.error,
  },
  imageWrapper: {
    position: 'relative',
    marginVertical: 8,
  },
  pillButtonText: {
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 4,
    color: colors.background,
  }
});

export default ProfileImageInput;
