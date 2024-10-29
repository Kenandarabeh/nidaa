import React, { useEffect, useRef, useCallback } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import LottieView from 'lottie-react-native';

const shootingStarAnimation = {
  v: "5.5.7",
  fr: 30,
  ip: 0,
  op: 60,
  w: 200,
  h: 200,
  assets: [],
  layers: [
    {
      ddd: 0,
      ind: 1,
      ty: 4,
      nm: "Shooting Star",
      sr: 1,
      ks: {
        o: {
          a: 1,
          k: [
            { t: 0, s: [0], e: [100] },
            { t: 15, s: [100], e: [100] },
            { t: 45, s: [100], e: [0] },
            { t: 60, s: [0] }
          ]
        },
        p: {
          a: 1,
          k: [
            { t: 0, s: [0, 0], e: [200, 200] },
            { t: 60, s: [200, 200] }
          ]
        },
        s: { a: 0, k: [100, 100] }
      },
      shapes: [
        {
          ty: "gr",
          it: [
            {
              ty: "st",
              c: { a: 0, k: [1, 1, 1] },
              o: { a: 0, k: 100 },
              w: { a: 0, k: 2 }
            },
            {
              ty: "fl",
              c: { a: 0, k: [1, 1, 1] },
              o: { a: 0, k: 100 }
            },
            {
              ty: "el",
              p: { a: 0, k: [0, 0] },
              s: { a: 0, k: [8, 8] }
            }
          ]
        }
      ]
    },
    {
      ddd: 0,
      ind: 2,
      ty: 4,
      nm: "Trail",
      sr: 1,
      ks: {
        o: {
          a: 1,
          k: [
            { t: 0, s: [0], e: [70] },
            { t: 15, s: [70], e: [70] },
            { t: 45, s: [70], e: [0] },
            { t: 60, s: [0] }
          ]
        },
        p: {
          a: 1,
          k: [
            { t: 0, s: [-20, -20], e: [180, 180] },
            { t: 60, s: [180, 180] }
          ]
        },
        s: { a: 0, k: [100, 100] }
      },
      shapes: [
        {
          ty: "gr",
          it: [
            {
              ty: "st",
              c: { a: 0, k: [1, 1, 1] },
              o: { a: 0, k: 70 },
              w: { a: 0, k: 1 }
            },
            {
              ty: "sh",
              ks: {
                a: 0,
                k: {
                  c: false,
                  v: [[0, 0], [40, 40]],
                  i: [[0, 0], [0, 0]],
                  o: [[0, 0], [0, 0]]
                }
              }
            }
          ]
        }
      ]
    }
  ]
};

const ShootingStar = () => {
  const lottieRef = useRef(null);
  const timeoutRef = useRef(null);
  const { width, height } = Dimensions.get('window');

  const startAnimation = useCallback(() => {
    if (lottieRef.current) {
      lottieRef.current.reset();
      lottieRef.current.play();

      // جدولة الشهاب التالي بشكل عشوائي
      timeoutRef.current = setTimeout(() => {
        startAnimation();
      }, Math.random() * 15000 + 10000); // بين 10 و 25 ثانية
    }
  }, []);

  useEffect(() => {
    startAnimation();
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [startAnimation]);

  // إنشاء موقع عشوائي للشهاب
  const getRandomPosition = () => {
    const angle = Math.random() * Math.PI / 4 + Math.PI / 6; // زاوية بين 30 و 75 درجة
    return {
      top: Math.random() * (height * 0.5),
      left: Math.random() * (width * 0.5),
      transform: [
        { rotate: `${angle}rad` }
      ]
    };
  };

  const position = getRandomPosition();

  return (
    <View style={[styles.container, position]}>
      <LottieView
        ref={lottieRef}
        source={shootingStarAnimation}
        autoPlay={false}
        loop={false}
        style={styles.lottie}
        speed={0.5}
        renderMode="HARDWARE"
        cacheStrategy="strong"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    width: 100,
    height: 100,
    zIndex: 2,
  },
  lottie: {
    width: '100%',
    height: '100%',
  },
});

export default React.memo(ShootingStar);