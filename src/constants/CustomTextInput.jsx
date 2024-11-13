import React, { forwardRef, useCallback, memo } from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import { TextInput, HelperText, Menu, TouchableRipple, Text } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { colors } from '../theme/colors';

const CustomTextInput = forwardRef(({
  type = 'text',
  iconName,
  placeholder = '',
  label,
  value,
  onChangeText,
  onFocus,
  onBlur,
  editable = true,
  error,
  helperText,
  direction,
  secureTextEntry,
  showPasswordToggle = true,
  style,
  options = [],
  inputColor = colors.text.primary,
  inputFontFamily = Platform.select({
    ios: 'System',
    android: 'Roboto'
  }),
  inputFontWeight = '400',
  passwordToggleIconSize = 24,
  passwordToggleIconColor = colors.text.secondary,
  passwordVisibleIcon = 'visibility',
  passwordHiddenIcon = 'visibility-off',
  placeholderTextColor = colors.text.secondary, // Add default value
  showEyeIcon = true, // Add new prop for eye icon visibility
  eyeIconSize = 24,   // Add new prop for eye icon size
  borderColor = '#E0E0E0',
  borderWidth = 1,
  borderRadius = 8,
  backgroundColor = 'white',  // Add this prop
  dropdownIconColor = '#666',
  dropdownBackgroundColor = '#ffffff',
  dropdownTextColor = '#333333',
  dropdownActiveBackgroundColor = '#f5f5f5',
  dropdownBorderRadius = 8,
  dropdownElevation = 3,
  dropdownWidth = '100%',
  dropdownMaxHeight = 250,
  dropdownItemHeight = 48,
  dropdownPosition = 'bottom',
  menuStyle,
  ...props
}, ref) => {
  const [isPasswordVisible, setIsPasswordVisible] = React.useState(false);
  const [visible, setVisible] = React.useState(false);
  const [selectedItem, setSelectedItem] = React.useState(null);

  const togglePasswordVisibility = useCallback(() => {
    setIsPasswordVisible(prev => !prev);
  }, []);

  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

  const handleSelect = (option) => {
    setSelectedItem(option);
    onChangeText(option.value);
    closeMenu();
  };

  const baseInputProps = useCallback(() => ({
    mode: "outlined",
    placeholder: placeholder,
    label: null,  // Remove label to prevent floating placeholder
    error: !!error,
    disabled: !editable,
    secureTextEntry: secureTextEntry && !isPasswordVisible,
    right: secureTextEntry && showEyeIcon ? (
      <TextInput.Icon
        icon={isPasswordVisible ? "eye" : "eye-off"}
        onPress={() => setIsPasswordVisible(!isPasswordVisible)}
        forceTextInputFocus={false}
        size={eyeIconSize}
      />
    ) : value ? (
      <TextInput.Icon
        icon="close"
        onPress={() => onChangeText?.('')}
        forceTextInputFocus={false}
      />
    ) : null,
    left: iconName ? (
      <TextInput.Icon
        icon={iconName}
      />
    ) : null,
    contentStyle: [
      styles.contentStyle,
      { color: inputColor },
      direction === 'rtl' && { textAlign: 'right' },
      type === 'select' && {
        paddingHorizontal: 8,
        paddingRight: 40, // إضافة مساحة للأيقونة
        fontSize: 14,
        flex: 1,
        textAlignVertical: 'center',
      }
    ],
    // إضافة خصائص جديدة للـ select
    ...(type === 'select' && {
      numberOfLines: 1,
      multiline: false,
    }),
    outlineStyle: [
      styles.outline,
      {
        borderWidth: borderWidth,
        borderColor: borderColor,
        borderRadius: borderRadius,
        backgroundColor: backgroundColor,
      }
    ],
    theme: {
      colors: {
        primary: borderColor, // This will keep border color constant
        error: colors.feedback.error,
        placeholder: placeholderTextColor,
        text: inputColor,
        onSurfaceVariant: placeholderTextColor,
        background: backgroundColor, // Add this to fix input background
        surface: backgroundColor,
      },
      roundness: borderRadius,
    },
    style: [
      styles.input,
      {
        backgroundColor: backgroundColor || 'white',
        color: inputColor,
      },
      style
    ],
  }), [
    label,
    placeholder,
    error,
    editable,
    secureTextEntry,
    isPasswordVisible,
    value,
    iconName,
    direction,
    placeholderTextColor,
    inputColor,
    style,
    showEyeIcon,
    eyeIconSize,
    borderWidth,
    borderRadius,
    backgroundColor,
  ]);

  const renderInput = useCallback(() => {
    if (type === 'select') {
      return (
        <TouchableRipple onPress={openMenu}>
          <TextInput
            {...baseInputProps()}
            value={selectedItem?.label || ''}
            editable={false}
            right={
              <TextInput.Icon
                icon={visible ? "chevron-up" : "chevron-down"}
                color={dropdownIconColor}
                onPress={openMenu}
              />
            }
            style={[
              styles.input,
              {
                color: inputColor,
                backgroundColor: backgroundColor,
              },
              style
            ]}
          />
        </TouchableRipple>
      );
    }

    return (
      <TextInput
        ref={ref}
        {...baseInputProps()}
        value={value}
        onChangeText={onChangeText}
        {...props}
      />
    );
  }, [type, baseInputProps, selectedItem, visible, value, onChangeText]);

  const renderHelperText = useCallback(() => {
    if (!helperText) return null;
    
    return (
      <HelperText
        type={error ? "error" : "info"}
        style={[
          styles.helperText,
          direction === 'rtl' ? styles.helperTextRTL : styles.helperTextLTR
        ]}
        visible
      >
        {helperText}
      </HelperText>
    );
  }, [helperText, error, direction]);

  const renderSelectInput = useCallback(() => (
    <TouchableRipple 
      onPress={openMenu} 
      style={styles.selectTouchable}
      rippleColor="rgba(0, 0, 0, .1)"
    >
      <TextInput
        {...baseInputProps()}
        value={selectedItem?.label || ''}
        editable={false}
        right={
          <TextInput.Icon
            icon={visible ? "chevron-up" : "chevron-down"}
            color={dropdownIconColor}
            onPress={openMenu}
            style={styles.dropdownIcon}
            size={24}
          />
        }
      />
    </TouchableRipple>
  ), [baseInputProps, selectedItem, visible, dropdownIconColor]);

  const menuStyles = [
    styles.menuContent,
    {
      backgroundColor: dropdownBackgroundColor,
      borderRadius: dropdownBorderRadius,
      elevation: dropdownElevation,
      maxHeight: dropdownMaxHeight,
      width: typeof dropdownWidth === 'number' ? dropdownWidth : '100%',
      zIndex: 9999,  // إضافة zIndex عالي
    },
    menuStyle
  ];

  if (type === 'select') {
    return (
      <View style={[styles.wrapper, { zIndex: 999 }]}>
        <Menu
          visible={visible}
          onDismiss={closeMenu}
          contentStyle={menuStyles}
          anchor={renderSelectInput()}
          statusBarHeight={0}
        >
          {options.map((option) => (
            <Menu.Item
              key={option.value}
              onPress={() => handleSelect(option)}
              title={
                <Text style={[
                  styles.menuItemText,
                  { 
                    color: dropdownTextColor,
                    fontFamily: inputFontFamily,
                  },
                  selectedItem?.value === option.value && styles.selectedMenuItem
                ]}>
                  {option.label}
                </Text>
              }
              style={[
                styles.menuItem,
                { 
                  backgroundColor: dropdownBackgroundColor,
                  height: dropdownItemHeight,
                },
                selectedItem?.value === option.value && {
                  backgroundColor: dropdownActiveBackgroundColor
                }
              ]}
            />
          ))}
        </Menu>
        {renderHelperText()}
      </View>
    );
  }

  return (
    <View style={styles.wrapper}>
      {renderInput()}
      {renderHelperText()}
    </View>
  );
});

const styles = StyleSheet.create({
  wrapper: {
    marginVertical: 8,
    width: '100%',
    position: 'relative',  // إضافة position relative
  },
  input: {
    minHeight: 48,
    fontSize: 16,
    color: 'inherit',
    width: '100%',  // تأكيد على العرض الكامل
  },
  inputRTL: {
    textAlign: 'right',
  },
  contentStyle: {
    paddingHorizontal: 16,
  },
  selectContentStyle: {
    paddingHorizontal: 8,
    fontSize: 14,
    textAlign: 'left',
    textAlignVertical: 'center',
    flexShrink: 1,  // السماح للنص بالانكماش
  },
  outline: {
    backgroundColor: 'white',
    overflow: 'hidden',
  },
  helperText: {
    fontSize: 13,
    marginTop: 4,
    fontFamily: Platform.select({
      ios: 'System',
      android: 'Roboto'
    }),
  },
  helperTextRTL: {
    textAlign: 'right',
  },
  helperTextLTR: {
    textAlign: 'left',
  },
  menuItem: {
    minHeight: 35,
    maxHeight: 40,
    justifyContent: 'center',
    paddingHorizontal: 12,
  },
  menuItemText: {
    fontSize: 13,
    letterSpacing: 0.1,
  },
  selectedMenuItem: {
    fontWeight: '500',
  },
  menuContent: {
    marginTop: 4,
    borderRadius: 8,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    overflow: 'visible',  // تغيير من hidden إلى visible
    minWidth: 120,
  },
  passwordIconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
  },
  rightIconsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  passwordStatusText: {
    fontSize: 12,
    marginLeft: 4,
  },
  iconsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  selectTouchable: {
    width: '100%',
    borderRadius: 8,
    overflow: 'visible', // تغيير من hidden إلى visible
  },
  dropdownIcon: {
    marginRight: 0,
  },
});

export default memo(CustomTextInput);