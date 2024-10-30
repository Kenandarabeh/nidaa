import React, { useState, useEffect, useCallback, useRef } from 'react';
import { View, StyleSheet, Image, Dimensions, ScrollView, Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import helalImage from '../assets/images/Helal.png';
import LinearGradient from 'react-native-linear-gradient';

// ثوابت التكوين
const CONFIG = {
  INITIAL_STARS: 50,
  MIN_STAR_SIZE: 0.5,
  MAX_STAR_SIZE: 2.5,
  STORAGE_KEYS: {
    STARS: '@stars_data',
    DIMENSIONS: '@screen_dimensions',
  },
  COLORS: {
    GRADIENT_START: 'rgba(0, 49, 67, 1)',
    GRADIENT_END: '#0088bb',
    STAR: '#ffffff',
  },
};

// الحصول على أبعاد الشاشة
const getWindowDimensions = () => {
  const { width, height } = Dimensions.get('window');
  return { width, height };
};

// دالة إنشاء نجمة واحدة
const createStar = (startHeight, endHeight, width) => ({
  top: Math.random() * (endHeight - startHeight) + startHeight,
  left: Math.random() * width,
  size: Math.random() * (CONFIG.MAX_STAR_SIZE - CONFIG.MIN_STAR_SIZE) + CONFIG.MIN_STAR_SIZE,
  opacity: Math.random() * 0.5 + 0.5, // إضافة شفافية عشوائية
  animationDuration: Math.random() * 3000 + 2000, // مدة الوميض
});

// دالة إنشاء مجموعة من النجوم
const generateRandomStars = (numStars, startHeight, endHeight, width) => {
  return Array.from({ length: numStars }, () => createStar(startHeight, endHeight, width));
};

// مكون النجمة مع تحسين الأداء
const Star = React.memo(({ star }) => {
  const animationStyle = useRef({
    animation: Platform.select({
      ios: 'shimmer 2s infinite',
      android: undefined,
    }),
  }).current;

  return (
    <View
      style={[{
        position: 'absolute',
        top: star.top,
        left: star.left,
        width: star.size,
        height: star.size,
        backgroundColor: CONFIG.COLORS.STAR,
        borderRadius: star.size / 2,
        opacity: star.opacity,
      }, animationStyle]}
    />
  );
}, (prevProps, nextProps) => {
  return JSON.stringify(prevProps.star) === JSON.stringify(nextProps.star);
});

const Background = ({ children, style }) => {
  const [stars, setStars] = useState([]);
  const [dimensions, setDimensions] = useState(getWindowDimensions());
  const [contentHeight, setContentHeight] = useState(dimensions.height);
  const previousContentHeight = useRef(dimensions.height);
  
  // التعامل مع تخزين البيانات
  const saveData = useCallback(async (starsData) => {
    try {
      await AsyncStorage.multiSet([
        [CONFIG.STORAGE_KEYS.STARS, JSON.stringify(starsData)],
        [CONFIG.STORAGE_KEYS.DIMENSIONS, JSON.stringify(dimensions)],
      ]);
    } catch (error) {
      console.warn('Failed to save stars data:', error);
    }
  }, [dimensions]);

  // استرجاع البيانات المخزنة
  const loadStoredData = useCallback(async () => {
    try {
      const [[, storedDimensions], [, storedStars]] = await AsyncStorage.multiGet([
        CONFIG.STORAGE_KEYS.DIMENSIONS,
        CONFIG.STORAGE_KEYS.STARS,
      ]);

      if (storedDimensions && storedStars) {
        const parsedDimensions = JSON.parse(storedDimensions);
        if (parsedDimensions.width === dimensions.width && 
            parsedDimensions.height === dimensions.height) {
          setStars(JSON.parse(storedStars));
          return true;
        }
      }
      return false;
    } catch (error) {
      console.warn('Failed to load stored data:', error);
      return false;
    }
  }, [dimensions]);

  // إدارة تغيير أبعاد الشاشة
  useEffect(() => {
    const subscription = Dimensions.addEventListener('change', ({ window }) => {
      setDimensions({ width: window.width, height: window.height });
    });

    return () => subscription?.remove();
  }, []);

  // تحميل النجوم الأولية
  useEffect(() => {
    const initializeStars = async () => {
      const hasStoredData = await loadStoredData();
      if (!hasStoredData) {
        const newStars = generateRandomStars(
          CONFIG.INITIAL_STARS,
          0,
          contentHeight,
          dimensions.width
        );
        setStars(newStars);
        saveData(newStars);
      }
    };

    initializeStars();
  }, [dimensions, contentHeight, loadStoredData, saveData]);

  // إضافة نجوم جديدة عند تمديد المحتوى
  useEffect(() => {
    if (contentHeight > previousContentHeight.current) {
      const additionalStars = generateRandomStars(
        Math.floor(CONFIG.INITIAL_STARS / 2),
        previousContentHeight.current,
        contentHeight,
        dimensions.width
      );
      
      setStars(prevStars => {
        const updatedStars = [...prevStars, ...additionalStars];
        saveData(updatedStars);
        return updatedStars;
      });
    }
    previousContentHeight.current = contentHeight;
  }, [contentHeight, dimensions.width, saveData]);

  const handleContentSizeChange = useCallback((_, height) => {
    setContentHeight(Math.max(height, dimensions.height));
  }, [dimensions.height]);
  const [meteorCount] = useState(2); // عدد قليل للحفاظ على الأداء

  return (
    <LinearGradient
      colors={[CONFIG.COLORS.GRADIENT_START, CONFIG.COLORS.GRADIENT_END]}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 0.35 }}
      style={styles.overlay}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        onContentSizeChange={handleContentSizeChange}
        scrollEventThrottle={16}
      >
        
        <View style={[styles.starsOverlay, { height: contentHeight }]}>
          {stars.map((star, index) => (
            <Star k
            ey={`star-${index}`} star={star} />
          ))}

        </View>
        <Image 
          source={helalImage} 
          style={[styles.helal, { width: dimensions.width * 0.15, height: dimensions.width * 0.15 }]} 
          resizeMode="contain"
        />
        <View style={[styles.content, style]}>
          {children}
        </View>
      </ScrollView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
  },
  starsOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: 'transparent',
    zIndex: 1,
  },
  helal: {
    position: 'absolute',
    top: 68,
    left: 10,
    zIndex: 2,
    transform: [{ rotate: '220deg' }],
  },
  content: {
    flex: 1,
    zIndex: 3,
  },
});

export default Background;
