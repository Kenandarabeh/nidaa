import React, { useRef, useState, useEffect } from 'react';
import { 
  View, 
  Animated, 
  StyleSheet, 
  TouchableOpacity,
  ViewStyle,
  TextStyle,
  LayoutChangeEvent,
} from 'react-native';
import PropTypes from 'prop-types';
import CustomText from '../constants/CustomText';

export type TabItem = {
  key: string;
  title: string;
  content: React.ReactNode;
};

export type SwiperTabsProps = {
  tabs: TabItem[];
  activeTab: string;
  onTabChange: (tabKey: string) => void;
  containerStyle?: ViewStyle;
  tabStyle?: ViewStyle;
  activeTabStyle?: ViewStyle;
  tabTextStyle?: TextStyle;
  activeTabTextStyle?: TextStyle;
  sliderStyle?: ViewStyle;
  animationConfig?: {
    tension?: number;
    friction?: number;
    duration?: number;
  };
  renderCustomTab?: (tab: TabItem, isActive: boolean) => React.ReactNode;
};

const defaultAnimationConfig = {
  tension: 70,
  friction: 11,
  duration: 300,
};

const SwiperTabs: React.FC<SwiperTabsProps> = ({
  tabs,
  activeTab,
  onTabChange,
  containerStyle,
  tabStyle,
  activeTabStyle,
  tabTextStyle,
  activeTabTextStyle,
  sliderStyle,
  animationConfig = defaultAnimationConfig,
  renderCustomTab,
}) => {
  const [tabWidth, setTabWidth] = useState(0);
  const [containerWidth, setContainerWidth] = useState(0);
  const slideAnimation = useRef(new Animated.Value(0)).current;
  const fadeAnimation = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    // Update animation when active tab changes
    const currentIndex = tabs.findIndex(tab => tab.key === activeTab);
    if (currentIndex !== -1) {
      animateToIndex(currentIndex);
    }
  }, [activeTab, tabWidth]);

  const animateToIndex = (index: number) => {
    Animated.parallel([
      Animated.spring(slideAnimation, {
        toValue: index,
        ...animationConfig,
        useNativeDriver: true,
      }),
      Animated.sequence([
        Animated.timing(fadeAnimation, {
          toValue: 0.5,
          duration: animationConfig.duration / 2,
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnimation, {
          toValue: 1,
          duration: animationConfig.duration / 2,
          useNativeDriver: true,
        }),
      ]),
    ]).start();
  };

  const onContainerLayout = (event: LayoutChangeEvent) => {
    const { width } = event.nativeEvent.layout;
    setContainerWidth(width);
    setTabWidth(width / tabs.length);
  };

  const translateX = slideAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, tabWidth],
  });

  const renderTab = (tab: TabItem, index: number) => {
    const isActive = tab.key === activeTab;

    if (renderCustomTab) {
      return renderCustomTab(tab, isActive);
    }

    return (
      <TouchableOpacity
        key={tab.key}
        style={[
          styles.tab,
          tabStyle,
          isActive && styles.activeTab,
          isActive && activeTabStyle,
        ]}
        onPress={() => onTabChange(tab.key)}
        accessibilityRole="tab"
        accessibilityState={{ selected: isActive }}
      >
        <CustomText 
          style={[
            styles.tabText,
            tabTextStyle,
            isActive && styles.activeTabText,
            isActive && activeTabTextStyle,
          ]}
        >
          {tab.title}
        </CustomText>
      </TouchableOpacity>
    );
  };

  return (
    <View 
      style={[styles.container, containerStyle]}
      onLayout={onContainerLayout}
    >
      <View style={styles.tabsContainer}>
        {tabs.map(renderTab)}
        <Animated.View 
          style={[
            styles.slider,
            sliderStyle,
            { 
              width: tabWidth,
              transform: [{ translateX }],
            }
          ]} 
        />
      </View>
      <Animated.View 
        style={[
          styles.contentContainer,
          { opacity: fadeAnimation }
        ]}
      >
        {tabs.find(tab => tab.key === activeTab)?.content}
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  tabsContainer: {
    flexDirection: 'row',
    position: 'relative',
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    padding: 3,
    marginBottom: 20,
  },
  tab: {
    flex: 1,
    height: 45,
    justifyContent: 'center',
    alignItems: 'center',
  },
  activeTab: {
    backgroundColor: 'transparent',
  },
  tabText: {
    fontSize: 15,
    color: '#8E8E8E',
    textAlign: 'center',
  },
  activeTabText: {
    color: '#4232FF',
    fontWeight: '600',
  },
  slider: {
    position: 'absolute',
    bottom: 0,
    height: 2,
    backgroundColor: '#4232FF',
    borderRadius: 1,
  },
  contentContainer: {
    width: '100%',
  },
});

SwiperTabs.propTypes = {
  tabs: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      content: PropTypes.node.isRequired,
    })
  ).isRequired,
  activeTab: PropTypes.string.isRequired,
  onTabChange: PropTypes.func.isRequired,
  containerStyle: PropTypes.object,
  tabStyle: PropTypes.object,
  activeTabStyle: PropTypes.object,
  tabTextStyle: PropTypes.object,
  activeTabTextStyle: PropTypes.object,
  sliderStyle: PropTypes.object,
  animationConfig: PropTypes.object,
  renderCustomTab: PropTypes.func,
};

export default SwiperTabs;
