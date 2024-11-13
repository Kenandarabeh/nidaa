import React, { useState, useCallback, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Animated,
  StyleSheet,
  Modal,
  TextInput,
  FlatList,
  Dimensions,
  Platform,
  ViewStyle,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

interface Option {
  label: string;
  value: string | number;
}

interface CustomSelectProps {
  value?: string | number;
  onChange: (value: string | number) => void;
  options: Option[];
  placeholder?: string;
  searchable?: boolean;
  error?: boolean;
  disabled?: boolean;
  width?: number | string;
  height?: number;
  backgroundColor?: string;
  textColor?: string;
  placeholderColor?: string;
  borderColor?: string;
  borderRadius?: number;
  fontSize?: number;
  variant?: 'modal' | 'dropdown';
  dropdownStyle?: ViewStyle;
  dropdownBackgroundColor?: string;
  dropdownItemTextColor?: string;
  dropdownSelectedItemTextColor?: string;
  dropdownSelectedBackgroundColor?: string;
}

const ITEM_HEIGHT = 48;
const { height: SCREEN_HEIGHT } = Dimensions.get('window');

const CustomSelect: React.FC<CustomSelectProps> = ({
  value,
  onChange,
  options,
  placeholder = 'Select an option',
  searchable = false,
  error = false,
  disabled = false,
  width = '100%',
  height = 48,
  backgroundColor = '#fff',
  textColor = '#000',
  placeholderColor = '#757575',
  borderColor = '#E0E0E0',
  borderRadius = 8,
  fontSize = 16,
  variant = 'modal',
  dropdownStyle,
  dropdownBackgroundColor = '#fff',
  dropdownItemTextColor = '#000',
  dropdownSelectedItemTextColor = '#000',
  dropdownSelectedBackgroundColor = 'rgba(67, 50, 255, 0.08)',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLabel, setSelectedLabel] = useState('');
  const animation = useRef(new Animated.Value(0)).current;

  // Animations
  const rotateAnimation = animation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '180deg'],
  });

  const toggleDropdown = useCallback(() => {
    if (disabled) return;
    
    const toValue = isOpen ? 0 : 1;
    setIsOpen(!isOpen);
    
    Animated.spring(animation, {
      toValue,
      useNativeDriver: true,
      friction: 8,
      tension: 40,
    }).start();
  }, [isOpen, disabled]);

  const handleSelect = useCallback((option: Option) => {
    onChange(option.value);
    setSelectedLabel(option.label);
    toggleDropdown();
  }, [onChange]);

  const filteredOptions = options.filter(option =>
    option.label.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderItem = ({ item }: { item: Option }) => (
    <TouchableOpacity
      style={[
        styles.option,
        { backgroundColor: dropdownBackgroundColor },
        item.value === value && { backgroundColor: dropdownSelectedBackgroundColor }
      ]}
      onPress={() => handleSelect(item)}
    >
      <Text style={[
        styles.optionText,
        { color: dropdownItemTextColor },
        item.value === value && { color: dropdownSelectedItemTextColor }
      ]}>
        {item.label}
      </Text>
      {item.value === value && (
        <Icon name="check" size={20} color={dropdownSelectedItemTextColor} />
      )}
    </TouchableOpacity>
  );

  return (
    <View style={{ zIndex: isOpen ? 999 : 1 }}>
      <TouchableOpacity
        activeOpacity={disabled ? 1 : 0.7}
        onPress={toggleDropdown}
        style={[
          styles.container,
          {
            width,
            height,
            backgroundColor,
            borderColor: error ? '#FF4444' : borderColor,
            borderRadius,
            opacity: disabled ? 0.6 : 1,
          },
        ]}
      >
        <Text style={[
          styles.selectedText,
          {
            color: selectedLabel ? textColor : placeholderColor,
            fontSize,
          },
        ]}>
          {selectedLabel || placeholder}
        </Text>
        <Animated.View style={{ transform: [{ rotate: rotateAnimation }] }}>
          <Icon name="keyboard-arrow-down" size={24} color={textColor} />
        </Animated.View>
      </TouchableOpacity>

      {variant === 'modal' ? (
        <Modal
          visible={isOpen}
          transparent
          animationType="fade"
          onRequestClose={toggleDropdown}
        >
          <TouchableOpacity
            style={styles.modalOverlay}
            activeOpacity={1}
            onPress={toggleDropdown}
          >
            <View style={[styles.dropdown, { backgroundColor }]}>
              {searchable && (
                <View style={styles.searchContainer}>
                  <Icon name="search" size={20} color="#757575" />
                  <TextInput
                    style={[styles.searchInput, { color: textColor }]}
                    value={searchQuery}
                    onChangeText={setSearchQuery}
                    placeholder="Search..."
                    placeholderTextColor="#757575"
                  />
                </View>
              )}
              <FlatList
                data={filteredOptions}
                renderItem={renderItem}
                keyExtractor={item => item.value.toString()}
                bounces={false}
                showsVerticalScrollIndicator={false}
                getItemLayout={(_, index) => ({
                  length: ITEM_HEIGHT,
                  offset: ITEM_HEIGHT * index,
                  index,
                })}
                maxHeight={SCREEN_HEIGHT * 0.4}
              />
            </View>
          </TouchableOpacity>
        </Modal>
      ) : (
        isOpen && (
          <View style={[styles.dropdownList, dropdownStyle]}>
            <FlatList
              data={filteredOptions}
              renderItem={renderItem}
              keyExtractor={item => item.value.toString()}
              bounces={false}
              showsVerticalScrollIndicator={false}
              getItemLayout={(_, index) => ({
                length: ITEM_HEIGHT,
                offset: ITEM_HEIGHT * index,
                index,
              })}
              maxHeight={SCREEN_HEIGHT }
              />
          </View>
        )
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    borderWidth: 1,
  },
  selectedText: {
    flex: 1,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dropdown: {
    width: '90%',
    borderRadius: 12,
    padding: 8,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
      },
      android: {
        elevation: 8,
      },
    }),
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  searchInput: {
    flex: 1,
    marginLeft: 8,
    fontSize: 16,
    padding: 4,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  selectedOption: {
    backgroundColor: 'rgba(67, 50, 255, 0.08)',
    display:'flex',
    flex:1,
    flexWrap:'wrap',
    flexShrink:'wrap',
  },
  optionText: {
    fontSize: 16,
  },
  selectedOptionText: {
    color: '#4332FF'},
  dropdownList: {
    position: 'absolute',
    top: '100%',
    left: 0,
    right: 0,
    backgroundColor: 'white',
    borderRadius: 8,display:'flex',
    marginTop: 4,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
      },
      android: {
        elevation: 8,
      },
    }),
  },
});

export default CustomSelect;