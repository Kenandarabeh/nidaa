import React, { useEffect, useRef } from 'react';
import { 
  View, 
  StyleSheet, 
  Animated, 
  TouchableOpacity, 
  Text,
  PanResponder,
  Dimensions,
  LogBox
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons'; // Changed to Ionicons
import useMenuStore from '../store/menuStore';
import { menuItems } from '../data/menu-data';
import { colors } from '../theme/colors';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SWIPE_THRESHOLD = 50;

const CustomMenu = () => {
  const navigation = useNavigation();
  const { isOpen, setIsOpen } = useMenuStore();
  const slideAnim = useRef(new Animated.Value(-SCREEN_WIDTH)).current;
  
  console.log('Menu state:', isOpen ? 'OPEN' : 'CLOSED'); // Debug log

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: (_, gestureState) => {
        return Math.abs(gestureState.dx) > Math.abs(gestureState.dy);
      },
      onPanResponderMove: (_, gestureState) => {
        if (!isOpen && gestureState.dx > 0) {
          slideAnim.setValue(Math.min(gestureState.dx - SCREEN_WIDTH, 0));
        } else if (isOpen && gestureState.dx < 0) {
          slideAnim.setValue(Math.max(gestureState.dx, -SCREEN_WIDTH));
        }
      },
      onPanResponderRelease: (_, gestureState) => {
        if (!isOpen && gestureState.dx > SWIPE_THRESHOLD) {
          console.log('Swipe right detected - opening menu');
          setIsOpen(true);
        } else if (isOpen && gestureState.dx < -SWIPE_THRESHOLD) {
          console.log('Swipe left detected - closing menu');
          setIsOpen(false);
        } else {
          // Reset to previous position
          Animated.spring(slideAnim, {
            toValue: isOpen ? 0 : -SCREEN_WIDTH,
            useNativeDriver: true,
          }).start();
        }
      },
    })
  ).current;

  useEffect(() => {
    // Replace console.log with LogBox for debugging
    LogBox.ignoreLogs(['Menu state:', 'Animating menu:']);
    
    Animated.spring(slideAnim, {
      toValue: isOpen ? 0 : -SCREEN_WIDTH,
      useNativeDriver: true,
      friction: 8,
      tension: 65,
    }).start();
  }, [isOpen]);

  const handleMenuItemPress = (route) => {
    LogBox.ignoreLogs(['Menu item pressed:']);
    setIsOpen(false);
    navigation.navigate(route);
  };

  if (!isOpen) return null;

  return (
    <View style={styles.container}>
      <TouchableOpacity 
        style={styles.overlay} 
        activeOpacity={1} 
        onPress={() => setIsOpen(false)}
      />
      <Animated.View 
        {...panResponder.panHandlers}
        style={[
          styles.menu,
          { transform: [{ translateX: slideAnim }] }
        ]}
      >
        <View style={styles.menuHeader}>
          <TouchableOpacity 
            style={styles.closeButton}
            onPress={() => setIsOpen(false)}
          >
            <Icon name="close" size={24} color={colors.text.primary} />
          </TouchableOpacity>
        </View>
        
        <View style={styles.menuItems}>
          {menuItems.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={styles.menuItem}
              onPress={() => handleMenuItemPress(item.route)}
            >
              <Icon name={item.icon} size={24} color={colors.text.primary} />
              <Text style={styles.menuItemText}>{item.title}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 1000,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  menu: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    width: 280,
    backgroundColor: colors.background,
    paddingTop: 50,
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
    shadowColor: colors.shadow,
    shadowOffset: {
      width: 2,
      height: 0,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  menuHeader: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingHorizontal: 16,
    marginBottom: 20,
  },
  closeButton: {
    padding: 8,
  },
  menuItems: {
    paddingHorizontal: 16,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginBottom: 8,
  },
  menuItemText: {
    marginLeft: 16,
    fontSize: 16,
    color: colors.text.primary,
    fontWeight: '500',
  },
});

export default CustomMenu;
