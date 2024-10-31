import React, { useState, useEffect } from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  Platform,
  Dimensions,
  ImageBackground,
  PixelRatio,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import LinearGradient from 'react-native-linear-gradient';
import Text from '../constants/CustomText';
import doctor from '../assets/images/doctor.png';
import sub_doctor from '../assets/images/sub_doctor.jpeg';

const CallScreen = ({ navigation }) => {
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);
  const [callDuration, setCallDuration] = useState(0);
  const [dimensions, setDimensions] = useState(Dimensions.get('window'));

  useEffect(() => {
    const subscription = Dimensions.addEventListener('change', ({ window }) => {
      setDimensions(window);
    });

    return () => subscription?.remove();
  }, []);

  const formatDuration = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const scale = dimensions.width / 390;
  const normalize = (size) => {
    const newSize = size * scale;
    return Math.round(PixelRatio.roundToNearestPixel(newSize));
  };

  const styles = createStyles(dimensions, normalize);

  const statusBarHeight = Platform.select({
    ios: 0,
    android: StatusBar.currentHeight || 0,
  });

  return (
    <View style={styles.container}>
      <StatusBar barStyle='light-content' backgroundColor='rgba(0, 0, 0, 0.5)' translucent />
      <ImageBackground source={doctor} style={styles.backgroundImage} resizeMode='cover'>
        <View style={[styles.header, { marginTop: statusBarHeight }]}>
          <View style={styles.headerBackground}>
            <View style={styles.headerContent}>
              <View style={styles.textContainer}>
                <Text style={styles.callerName}>الشخص الذي تتحدث معه</Text>
                <Text style={styles.callDuration}>{formatDuration(callDuration)}</Text>
              </View>
              <ImageBackground 
                source={sub_doctor} 
                style={styles.selfVideoContainer}
                imageStyle={styles.selfVideoImage}
              >
                <View style={styles.selfVideo}></View>
              </ImageBackground>
            </View>
          </View>
        </View>

        <View style={styles.videoContainer}>
          <View style={styles.mainVideo}>
            <Icon 
              name='person' 
              size={normalize(80)} 
              color='rgba(255,255,255,0.5)' 
            />
          </View>
        </View>

        <LinearGradient
          colors={['transparent', 'rgba(0,0,0,0.8)']}
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 0.35 }}
          style={styles.controlsGradient}
        >
          <View style={styles.controls}>
            <TouchableOpacity 
              style={[styles.controlButton, isVideoOff && styles.controlButtonActive]}
              onPress={() => setIsVideoOff(!isVideoOff)}
            >
              <Icon 
                name={isVideoOff ? 'videocam-off' : 'videocam'} 
                size={normalize(28)} 
                color='#fff' 
              />
            </TouchableOpacity>

            <TouchableOpacity 
              style={[styles.controlButton, styles.endCallButton]}
              onPress={() => navigation.goBack()}
            >
              <Icon 
                name='call-end' 
                size={normalize(28)} 
                color='#fff' 
              />
            </TouchableOpacity>

            <TouchableOpacity 
              style={[styles.controlButton, isMuted && styles.controlButtonActive]}
              onPress={() => setIsMuted(!isMuted)}
            >
              <Icon 
                name={isMuted ? 'mic-off' : 'mic'} 
                size={normalize(28)} 
                color='#fff' 
              />
            </TouchableOpacity>
          </View>
        </LinearGradient>
      </ImageBackground>
    </View>
  );
};

const createStyles = (dimensions, normalize) => {
  const { width, height } = dimensions;
  
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#000',
    },
    backgroundImage: {
      flex: 1,
      width: '100%',
      height: '100%',
    },
    header: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 1,
    },
    headerBackground: {
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    headerContent: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: normalize(20),
      paddingVertical: normalize(15),
    },
    textContainer: {
      flex: 1,
      marginRight: normalize(15),
    },
    callerName: {
      fontSize: normalize(22),
      fontWeight: '600',
      color: '#ffffff',
      marginBottom: normalize(4),
      textAlign: 'left',
    },
    callDuration: {
      fontSize: normalize(16),
      color: 'rgba(255,255,255,0.8)',
    },
    videoContainer: {
      flex: 1,
      position: 'relative',
    },
    mainVideo: {
      flex: 1,
      backgroundColor: 'transparent',
      justifyContent: 'center',
      alignItems: 'center',
    },
    selfVideoContainer: {
      width: normalize(100),
      height: normalize(140),
      borderRadius: normalize(12),
      overflow: 'hidden',
      borderWidth: 2,
      borderColor: 'rgba(255,255,255,0.3)',
    },
    selfVideoImage: {
      borderRadius: normalize(12),
    },
    selfVideo: {
      flex: 1,
      backgroundColor: 'transparent',
    },
    controlsGradient: {
      width: '100%',
      paddingBottom: Platform.OS === 'ios' ? normalize(20) : normalize(10),
    },
    controls: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      alignItems: 'center',
      paddingVertical: normalize(20),
      paddingHorizontal: normalize(30),
      backgroundColor: 'transparent',
    },
    controlButton: {
      alignItems: 'center',
      justifyContent: 'center',
      width: normalize(60),
      height: normalize(60),
      borderRadius: normalize(30),
      backgroundColor: 'rgba(255,255,255,0.2)',
    },
    controlButtonActive: {
      backgroundColor: 'rgba(255,0,0,0.3)',
    },
    endCallButton: {
      backgroundColor: '#ff3b30',
    },
  });
};

export default CallScreen;