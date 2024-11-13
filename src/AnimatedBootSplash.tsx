import { useState, useEffect } from "react";
import { Animated, Dimensions, Platform, Text, View, StyleSheet } from "react-native";
import BootSplash from "react-native-bootsplash";
import LinearGradient from 'react-native-linear-gradient';

const useNativeDriver = Platform.OS !== "web";
const { height } = Dimensions.get("window");
const helf = height / 2;
type Props = {
  onAnimationEnd: () => void;
};

const AnimatedBootSplash = ({ onAnimationEnd }: Props) => {
  const [opacity] = useState(() => new Animated.Value(1));
  const [translateY] = useState(() => new Animated.Value(20));
  const [backgroundOpacity] = useState(() => new Animated.Value(0));
  const [cityOpacity] = useState(() => new Animated.Value(0));
  const [welcomeOpacity] = useState(() => new Animated.Value(0));
  const [progress] = useState(() => new Animated.Value(0));
  const [loadingText, setLoadingText] = useState("Loading...");
  const [progressWidth] = useState(() => new Animated.Value(0));
  const [floatingElements] = useState(() => Array(3).fill(0).map(() => ({
    translateY: new Animated.Value(0),
    opacity: new Animated.Value(0),
  })));

  useEffect(() => {
    let count = 0;
    const interval = setInterval(() => {
      count += 50; // Increased increment to reach 100% faster
      setLoadingText(`${count}%`);
      Animated.timing(progressWidth, {
        toValue: count,
        duration: 100, // Reduced from 300
        useNativeDriver: false,
      }).start();
      
      if (count >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          Animated.timing(opacity, {
            toValue: 0,
            duration: 0,
            useNativeDriver: true,
          }).start(() => {
            onAnimationEnd();
          });
        }, 200); // Reduced from 500
      }
    }, 100); // Reduced from 300
    
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    floatingElements.forEach((element, index) => {
      Animated.sequence([
        Animated.delay(index * 300),
        Animated.parallel([
          Animated.loop(
            Animated.sequence([
              Animated.timing(element.translateY, {
                toValue: -10,
                duration: 1500,
                useNativeDriver: true,
              }),
              Animated.timing(element.translateY, {
                toValue: 0,
                duration: 1500,
                useNativeDriver: true,
              }),
            ])
          ),
          Animated.timing(element.opacity, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
          }),
        ]),
      ]).start();
    });
  }, []);

  const { container, logo } = BootSplash.useHideAnimation({
    manifest: require("../assets/bootsplash/manifest.json"),

    logo: require("../assets/bootsplash/logo.png"),
    // darkLogo: require("../assets/bootsplash/dark-logo.png"),
    // brand: require("../assets/bootsplash/brand.png"),
    // darkBrand: require("../assets/bootsplash/dark-brand.png"),

    // statusBarTranslucent: true,
    // navigationBarTranslucent: true,

    animate: () => {
      const { height } = Dimensions.get("window");

      Animated.sequence([
        Animated.stagger(200, [ // Reduced from 500
          Animated.spring(translateY, {
            useNativeDriver,
            toValue: 0,
            duration: 300, // Reduced from 1000
            friction: 8,
          }),
          Animated.sequence([
            Animated.spring(translateY, {
              useNativeDriver,
              toValue: -height * 0.30,
              duration: 300, // Reduced from 1000
            }),
            Animated.parallel([
              Animated.timing(backgroundOpacity, {
                useNativeDriver: true,
                toValue: 1,
                duration: 300, // Reduced from 1000
              }),
              Animated.timing(cityOpacity, {
                useNativeDriver: true,
                toValue: 1,
                duration: 300, // Reduced from 1000
              }),
              Animated.timing(welcomeOpacity, {
                useNativeDriver: true,
                toValue: 1,
                duration: 300, // Reduced from 1000
              }),
              Animated.timing(progress, {
                useNativeDriver: true,
                toValue: 1,
                duration: 300, // Reduced from 1000
              }),
            ]),
          ]),
        ]),
      ]).start();
    },
  });

  const backgroundColor = translateY.interpolate({
    inputRange: [-height * 0.30, 0],
    outputRange: ['#ffffff', 'transparent'],
    extrapolate: 'clamp'
  });

  return (
    <Animated.View {...container} style={[container.style, { opacity }]}>
      <View style={[styles.gradient, { backgroundColor: '#4232ff' }]} />

      <Animated.View style={[styles.logoContainer, { transform: [{ translateY }] }]}>
        <Animated.View style={[styles.logoBackground, { opacity: backgroundOpacity }]} />
        <Animated.Image {...logo} style={[logo.style]} />
      </Animated.View>

      {/* Welcome Text */}
      <Animated.Text style={[styles.welcomeText, { opacity: welcomeOpacity }]}>
        Welcome Back!
      </Animated.Text>

      {/* Progress Bar */}
      <Animated.View style={[styles.progressContainer, { opacity: welcomeOpacity }]}>
        <View style={styles.progressBackground}>
          <Animated.View style={[
            styles.progressFill,
            {
              width: progressWidth.interpolate({
                inputRange: [0, 100],
                outputRange: ['0%', '100%']
              }),
            }
          ]} />
        </View>
        <Animated.Text style={styles.loadingText}>
          {loadingText}
        </Animated.Text>
      </Animated.View>

      {/* Version Text */}
      <Animated.Text style={[styles.versionText, { opacity: cityOpacity }]}>
        Version 1.0.0
      </Animated.Text>

      {/* City Image */}
      <Animated.Image
        source={require("../city.png")}
        style={[
          styles.cityImage,
          { opacity: cityOpacity }
        ]}
      />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  gradient: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  floatingElement: {
    position: 'absolute',
    width: 60,
    height: 60,
    borderRadius: 30,
    top: height * 0.2,
    backgroundColor: '#4232ff',
    opacity: 0.1,
  },
  logoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoBackground: {
    position: 'absolute',
    width: 120,
    height: 120,
    borderRadius: 40,
    backgroundColor: '#ffffff',
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  welcomeText: {
    position: 'absolute',
    top: height * 0.45,
    width: '100%',
    textAlign: 'center',
    fontSize: 28,
    fontWeight: '700',
    color: '#ffffff',
    textShadowColor: 'rgba(0, 0, 0, 0.2)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  progressContainer: {
    position: 'absolute',
    top: height * 0.55,
    width: '80%',
    alignSelf: 'center',
  },
  progressBackground: {
    width: '100%',
    height: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 2,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#ffffff',
    borderRadius: 2,
  },
  loadingText: {
    marginTop: 10,
    textAlign: 'center',
    fontSize: 14,
    color: '#ffffff',
    opacity: 0.9,
  },
  versionText: {
    position: 'absolute',
    bottom: height * 0.15,
    width: '100%',
    textAlign: 'center',
    fontSize: 12,
    color: '#ffffff',
    opacity: 0.7,
  },
  cityImage: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: height * 0.3,
    resizeMode: 'cover',
  },
});

export default AnimatedBootSplash;




// import { useState, useEffect } from "react";
// import { Animated, Dimensions, Platform, Text, View, StyleSheet } from "react-native";
// import BootSplash from "react-native-bootsplash";
// import LinearGradient from 'react-native-linear-gradient';

// const useNativeDriver = Platform.OS !== "web";
// const { height } = Dimensions.get("window");
// const helf = height / 2;
// type Props = {
//   onAnimationEnd: () => void;
// };

// const AnimatedBootSplash = ({ onAnimationEnd }: Props) => {
//   const [opacity] = useState(() => new Animated.Value(1));
//   const [translateY] = useState(() => new Animated.Value(20));
//   const [backgroundOpacity] = useState(() => new Animated.Value(0));
//   const [cityOpacity] = useState(() => new Animated.Value(0));
//   const [welcomeOpacity] = useState(() => new Animated.Value(0));
//   const [progress] = useState(() => new Animated.Value(0));
//   const [loadingText, setLoadingText] = useState("Loading...");
//   const [progressWidth] = useState(() => new Animated.Value(0));
//   const [floatingElements] = useState(() => Array(3).fill(0).map(() => ({
//     translateY: new Animated.Value(0),
//     opacity: new Animated.Value(0),
//   })));

//   useEffect(() => {
//     let count = 0;
//     const interval = setInterval(() => {
//       count += 10;
//       setLoadingText(`${count}%`);
//       Animated.timing(progressWidth, {
//         toValue: count,
//         duration: 300,
//         useNativeDriver: false,
//       }).start();
      
//       if (count >= 100) {
//         clearInterval(interval);
//         // إضافة تأخير قصير قبل إخفاء الشاشة
//         setTimeout(() => {
//           Animated.timing(opacity, {
//             toValue: 0,
//             duration: 0,
//             useNativeDriver: true,
//           }).start(() => {
//             onAnimationEnd();
//           });
//         }, 500); // تأخير 500 مللي ثانية بعد اكتمال الـ progress
//       }
//     }, 300);
    
//     return () => clearInterval(interval);
//   }, []);

//   useEffect(() => {
//     floatingElements.forEach((element, index) => {
//       Animated.sequence([
//         Animated.delay(index * 300),
//         Animated.parallel([
//           Animated.loop(
//             Animated.sequence([
//               Animated.timing(element.translateY, {
//                 toValue: -10,
//                 duration: 1500,
//                 useNativeDriver: true,
//               }),
//               Animated.timing(element.translateY, {
//                 toValue: 0,
//                 duration: 1500,
//                 useNativeDriver: true,
//               }),
//             ])
//           ),
//           Animated.timing(element.opacity, {
//             toValue: 1,
//             duration: 1000,
//             useNativeDriver: true,
//           }),
//         ]),
//       ]).start();
//     });
//   }, []);

//   const { container, logo } = BootSplash.useHideAnimation({
//     manifest: require("../assets/bootsplash/manifest.json"),

//     logo: require("../assets/bootsplash/logo.png"),
//     // darkLogo: require("../assets/bootsplash/dark-logo.png"),
//     // brand: require("../assets/bootsplash/brand.png"),
//     // darkBrand: require("../assets/bootsplash/dark-brand.png"),

//     // statusBarTranslucent: true,
//     // navigationBarTranslucent: true,

//     animate: () => {
//       const { height } = Dimensions.get("window");

//       Animated.sequence([
//         Animated.stagger(500, [ // Reduced from 1500 to 500
//           Animated.spring(translateY, {
//             useNativeDriver,
//             toValue: 0,
//             duration: 1000, // Reduced from 2000
//             friction: 8,
//           }),
//           Animated.sequence([
//             Animated.spring(translateY, {
//               useNativeDriver,
//               toValue: -height * 0.30,
//               duration: 1000, // Reduced from 2000
//             }),
//             Animated.parallel([
//               Animated.timing(backgroundOpacity, {
//                 useNativeDriver: true,
//                 toValue: 1,
//                 duration: 1000, // Reduced from 2000
//               }),
//               Animated.timing(cityOpacity, {
//                 useNativeDriver: true,
//                 toValue: 1,
//                 duration: 1000, // Reduced from 2000
//               }),
//               Animated.timing(welcomeOpacity, {
//                 useNativeDriver: true,
//                 toValue: 1,
//                 duration: 1000, // Reduced from 2000
//               }),
//               Animated.timing(progress, {
//                 useNativeDriver: true,
//                 toValue: 1,
//                 duration: 1000, // Reduced from 3000
//               }),
//             ]),
//           ]),
//         ]),
//       ]).start();
//     },
//   });

//   const backgroundColor = translateY.interpolate({
//     inputRange: [-height * 0.30, 0],
//     outputRange: ['#ffffff', 'transparent'],
//     extrapolate: 'clamp'
//   });

//   return (
//     <Animated.View {...container} style={[container.style, { opacity }]}>
//       <View style={[styles.gradient, { backgroundColor: '#4232ff' }]} />

//       <Animated.View style={[styles.logoContainer, { transform: [{ translateY }] }]}>
//         <Animated.View style={[styles.logoBackground, { opacity: backgroundOpacity }]} />
//         <Animated.Image {...logo} style={[logo.style]} />
//       </Animated.View>

//       {/* Welcome Text */}
//       <Animated.Text style={[styles.welcomeText, { opacity: welcomeOpacity }]}>
//         Welcome Back!
//       </Animated.Text>

//       {/* Progress Bar */}
//       <Animated.View style={[styles.progressContainer, { opacity: welcomeOpacity }]}>
//         <View style={styles.progressBackground}>
//           <Animated.View style={[
//             styles.progressFill,
//             {
//               width: progressWidth.interpolate({
//                 inputRange: [0, 100],
//                 outputRange: ['0%', '100%']
//               }),
//             }
//           ]} />
//         </View>
//         <Animated.Text style={styles.loadingText}>
//           {loadingText}
//         </Animated.Text>
//       </Animated.View>

//       {/* Version Text */}
//       <Animated.Text style={[styles.versionText, { opacity: cityOpacity }]}>
//         Version 1.0.0
//       </Animated.Text>

//       {/* City Image */}
//       <Animated.Image
//         source={require("../city.png")}
//         style={[
//           styles.cityImage,
//           { opacity: cityOpacity }
//         ]}
//       />
//     </Animated.View>
//   );
// };

// const styles = StyleSheet.create({
//   gradient: {
//     position: 'absolute',
//     width: '100%',
//     height: '100%',
//   },
//   floatingElement: {
//     position: 'absolute',
//     width: 60,
//     height: 60,
//     borderRadius: 30,
//     top: height * 0.2,
//     backgroundColor: '#4232ff',
//     opacity: 0.1,
//   },
//   logoContainer: {
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   logoBackground: {
//     position: 'absolute',
//     width: 120,
//     height: 120,
//     borderRadius: 40,
//     backgroundColor: '#ffffff',
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: 4 },
//     shadowOpacity: 0.3,
//     shadowRadius: 4.65,
//     elevation: 8,
//   },
//   welcomeText: {
//     position: 'absolute',
//     top: height * 0.45,
//     width: '100%',
//     textAlign: 'center',
//     fontSize: 28,
//     fontWeight: '700',
//     color: '#ffffff',
//     textShadowColor: 'rgba(0, 0, 0, 0.2)',
//     textShadowOffset: { width: 1, height: 1 },
//     textShadowRadius: 2,
//   },
//   progressContainer: {
//     position: 'absolute',
//     top: height * 0.55,
//     width: '80%',
//     alignSelf: 'center',
//   },
//   progressBackground: {
//     width: '100%',
//     height: 4,
//     backgroundColor: 'rgba(255, 255, 255, 0.2)',
//     borderRadius: 2,
//   },
//   progressFill: {
//     height: '100%',
//     backgroundColor: '#ffffff',
//     borderRadius: 2,
//   },
//   loadingText: {
//     marginTop: 10,
//     textAlign: 'center',
//     fontSize: 14,
//     color: '#ffffff',
//     opacity: 0.9,
//   },
//   versionText: {
//     position: 'absolute',
//     bottom: height * 0.15,
//     width: '100%',
//     textAlign: 'center',
//     fontSize: 12,
//     color: '#ffffff',
//     opacity: 0.7,
//   },
//   cityImage: {
//     position: 'absolute',
//     bottom: 0,
//     width: '100%',
//     height: height * 0.3,
//     resizeMode: 'cover',
//   },
// });

// export default AnimatedBootSplash;