import React, { useState, forwardRef, useEffect } from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  Modal,
  FlatList,
  Text,
  StyleSheet,
  Platform,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { colors } from '../theme/colors';

const COUNTRIES = [
  { code: 'SA', name: 'السعودية', dialCode: '966', flag: '🇸🇦', pattern: '5XXXXXXXX', format: 'XXX XXX XXXX' },
  { code: 'AE', name: 'الإمارات', dialCode: '971', flag: '🇦🇪', pattern: '5XXXXXXXX', format: 'XX XXX XXXX' },
  { code: 'KW', name: 'الكويت', dialCode: '965', flag: '🇰🇼', pattern: '5XXXXXXXX', format: 'XXX XXX XXX' },
  { code: 'BH', name: 'البحرين', dialCode: '973', flag: '🇧🇭', pattern: '3XXXXXXXX', format: 'XXX XXX XXX' },
  { code: 'QA', name: 'قطر', dialCode: '974', flag: '🇶🇦', pattern: '3XXXXXXXX', format: 'XXX XXX XXX' },
  { code: 'OM', name: 'عمان', dialCode: '968', flag: '🇴🇲', pattern: '9XXXXXXXX', format: 'XXX XXX XXX' },
];

const PhoneInputCustom = forwardRef(({
  value = '',
  onChangeText,
  placeholder = 'رقم الهاتف',
  error,
  direction = 'ltr',
  allowedCountries = COUNTRIES,
  initialCountry = 'SA',
  onCountryChange,
  containerStyle,
  inputStyle,
  disabled = false,
  theme = 'light',
  borderRadius = 12,
}, ref) => {
  // تحسين التعامل مع الدول المسموح بها
  const availableCountries = allowedCountries?.length > 0 
    ? COUNTRIES.filter(country => allowedCountries.includes(country.code))
    : COUNTRIES;

  const [selectedCountry, setSelectedCountry] = useState(
    COUNTRIES.find(c => c.code === initialCountry) || COUNTRIES[0]
  );
  const [modalVisible, setModalVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // تحسين آلية البحث
  const filteredCountries = searchQuery.trim() 
    ? availableCountries.filter(country =>
        country.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        country.dialCode.includes(searchQuery) ||
        country.code.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : availableCountries;

  // تحديث القيمة الافتراضية عند تغيير allowedCountries
  useEffect(() => {
    if (allowedCountries?.length > 0) {
      const defaultCountry = COUNTRIES.find(c => c.code === initialCountry);
      if (defaultCountry && allowedCountries.includes(defaultCountry.code)) {
        setSelectedCountry(defaultCountry);
      } else {
        setSelectedCountry(
          COUNTRIES.find(c => allowedCountries.includes(c.code)) || COUNTRIES[0]
        );
      }
    }
  }, [allowedCountries, initialCountry]);

  const formatPhoneNumber = (text) => {
    if (!text) return '';
    const cleaned = text.replace(/\D/g, '');
    const match = cleaned.match(new RegExp(`.{1,${Math.ceil(cleaned.length / 3)}}`, 'g')) || [];
    return match.join(' ');
  };

  const handleSelectCountry = (country) => {
    if (!country) return;
    setSelectedCountry(country);
    setModalVisible(false);
    onCountryChange?.(country);
  };

  const renderCountryItem = ({ item }) => {
    if (!item) return null;
    return (
      <TouchableOpacity
        style={styles.countryItem}
        onPress={() => handleSelectCountry(item)}
      >
        <Text style={styles.flag}>{item.flag}</Text>
        <Text style={styles.countryName}>{item.name}</Text>
        <Text style={styles.dialCode}>+{item.dialCode}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={[styles.container, containerStyle]}>
      <View style={[
        styles.inputContainer,
        error && styles.error,
        { borderRadius },
        { flexDirection: direction === 'rtl' ? 'row-reverse' : 'row' }
      ]}>
        <TouchableOpacity
          style={[
            styles.countryButton,
            { borderRadius },
            direction === 'rtl' ? styles.countryButtonRTL : styles.countryButtonLTR,
          ]}
          onPress={() => !disabled && setModalVisible(true)}
          disabled={disabled}
        >
          <Text style={styles.flag}>{selectedCountry.flag}</Text>
          <Text style={[
            styles.dialCode,
            direction === 'rtl' && styles.dialCodeRTL
          ]}>+{selectedCountry.dialCode}</Text>
          <Icon 
            name={direction === 'rtl' ? 'keyboard-arrow-left' : 'keyboard-arrow-right'} 
            size={24} 
            color={colors.text} 
          />
        </TouchableOpacity>

        <TextInput
          ref={ref}
          style={[
            styles.input,
            inputStyle,
            { textAlign: direction === 'rtl' ? 'right' : 'left' }
          ]}
          value={value}
          onChangeText={(text) => {
            const formatted = formatPhoneNumber(text);
            onChangeText?.(formatted);
          }}
          placeholder={placeholder}
          placeholderTextColor={colors.placeholder}
          keyboardType="number-pad"
          maxLength={15}
          editable={!disabled}
        />
      </View>

      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              {direction === 'rtl' ? (
                <TouchableOpacity
                  style={styles.closeButton}
                  onPress={() => setModalVisible(false)}
                >
                  <Icon name="close" size={24} color={colors.text} />
                </TouchableOpacity>
              ) : null}
              <TextInput
                style={[
                  styles.searchInput,
                  { textAlign: direction === 'rtl' ? 'right' : 'left' }
                ]}
                placeholder={direction === 'rtl' ? "بحث..." : "Search..."}
                value={searchQuery}
                onChangeText={setSearchQuery}
                clearButtonMode="while-editing"
              />
              {direction === 'ltr' ? (
                <TouchableOpacity
                  style={styles.closeButton}
                  onPress={() => setModalVisible(false)}
                >
                  <Icon name="close" size={24} color={colors.text} />
                </TouchableOpacity>
              ) : null}
            </View>
            <FlatList
              data={filteredCountries}
              renderItem={renderCountryItem}
              keyExtractor={item => item.code}
              initialNumToRender={15}
              maxToRenderPerBatch={10}
              windowSize={10}
              contentContainerStyle={styles.listContent}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.background,
    height: 56,
    borderWidth: 1.5,
    borderColor: colors.border.default,
    borderRadius: 12,
    ...Platform.select({
      ios: {
        shadowColor: colors.shadow,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  error: {
    borderColor: colors.error,
  },
  countryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    height: '100%',
    backgroundColor: colors.input.background, // Match input background
    minWidth: 120,
  },
  countryButtonRTL: {
    borderLeftWidth: 1.5,
    borderLeftColor: colors.border.default,
  },
  countryButtonLTR: {
    borderRightWidth: 1.5,
    borderRightColor: colors.border.default,
  },
  flag: {
    fontSize: 22,
    marginRight: 8,
  },
  dialCode: {
    fontSize: 16,
    color: colors.text.primary,
    fontWeight: '500',
  },
  dialCodeRTL: {
    marginRight: 0,
    marginLeft: 8,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: colors.text.primary,
    paddingHorizontal: 16,
    height: '100%',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: colors.background,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: '80%',
    ...Platform.select({
      ios: {
        shadowColor: colors.shadow,
        shadowOffset: { width: 0, height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 6,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.border.default,
  },
  closeButton: {
    padding: 8,
  },
  searchInput: {
    flex: 1,
    height: 44,
    backgroundColor: colors.input.background,
    borderRadius: 12,
    paddingHorizontal: 16,
    fontSize: 16,
    color: colors.text.primary,
    marginHorizontal: 16,
    borderWidth: 1,
    borderColor: colors.border.default,
  },
  listContent: {
    paddingBottom: 20,
  },
  countryItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.border.default,
  },
  countryName: {
    flex: 1,
    fontSize: 16,
    color: colors.text.primary,
    marginHorizontal: 12,
  },
});

export default PhoneInputCustom;
