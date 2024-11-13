import React from 'react';
import { View, StyleSheet, TouchableOpacity, I18nManager } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import Text from '../constants/CustomText';

const Header = ({
  headerTitle,
  showBackButton = false,
  allowDrawer = true,
  showPrev = false,
  showPrevOnly = false
}) => {
  const navigation = useNavigation();
  const isRTL = I18nManager.isRTL;

  React.useEffect(() => {
    if (showPrev || showBackButton) {
      navigation.getParent()?.setOptions({
        swipeEnabled: false
      });
    } else {
      navigation.getParent()?.setOptions({
        swipeEnabled: true
      });
    }
  }, [showPrev, showBackButton]);

  const renderNavigationButton = () => {
    if (showPrev || showBackButton) {
      return (
        <TouchableOpacity 
          style={[
            styles.menuButton,
            isRTL ? styles.menuButtonRTL : styles.menuButtonLTR,
            showPrevOnly && styles.menuButtonOnly
          ]} 
          onPress={() => navigation.goBack()}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <Icon 
            name={isRTL ? "arrow-forward" : "arrow-back"} 
            size={24} 
            color="white" 
          />
        </TouchableOpacity>
      );
    }
    if (allowDrawer) {
      return (
        <TouchableOpacity 
          style={[
            styles.menuButton,
            isRTL ? styles.menuButtonRTL : styles.menuButtonLTR
          ]} 
          onPress={() => navigation.openDrawer()}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <Icon name="menu" size={24} color="white" />
        </TouchableOpacity>
      );
    }
    return null;
  };

  if (showPrevOnly) {
    return renderNavigationButton();
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.navContainer}>
          {renderNavigationButton()}
        </View>
        <View style={styles.titleContainer}>
          {headerTitle && (
            <Text style={styles.headerTitle}>{headerTitle}</Text>
          )}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 110, // Increased height
    zIndex: 1,
  },
  header: {
    width: '100%',
    height: '100%',
    backgroundColor: '#4332FF',
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
  },
  navContainer: {
    width: '100%',
    height: 50,
    position: 'relative',
  },
  titleContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingBottom: 15,
  },
  menuButton: {
    paddingVertical: 5,
    paddingHorizontal: 20,
    position: 'absolute',
    top: 12, // Positioned at top
    zIndex: 2,
  },
  menuButtonLTR: {
    left: 0,
  },
  menuButtonRTL: {
    right: 0,
  },
  headerTitle: {
    color: 'white',
    fontSize: 18,
    width: '100%',
    textAlign: 'center',
  },
  menuButtonOnly: {
    backgroundColor: '#4332FF',
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  }
});

export default Header;
