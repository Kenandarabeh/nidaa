import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import BottomSheet from '@gorhom/bottom-sheet';
import Icon from 'react-native-vector-icons/MaterialIcons';

interface MapLocationSheetProps {
  bottomSheetRef: React.RefObject<BottomSheet>;
  snapPoints: string[];
  address: string;
  error: string;
  onSheetChange: (index: number) => void;
}

export const MapLocationSheet: React.FC<MapLocationSheetProps> = ({
  bottomSheetRef,
  snapPoints,
  address,
  error,
  onSheetChange,
}) => {
  return (
    <BottomSheet
      ref={bottomSheetRef}
      snapPoints={snapPoints}
      onChange={onSheetChange}
      index={0}
      enablePanDownToClose={false}
    >
      <View style={styles.contentContainer}>
        <Text style={styles.title}>موقع النداء</Text>
        {error ? (
          <View style={styles.errorContainer}>
            <Icon name="error-outline" size={24} color="#E74C3C" />
            <Text style={styles.errorText}>{error}</Text>
          </View>
        ) : (
          <View style={styles.locationInfo}>
            <Icon name="location-on" size={24} color="#4A90E2" />
            <Text style={styles.addressText}>{address}</Text>
            <TouchableOpacity style={styles.confirmButton}>
              <Text style={styles.confirmButtonText}>تأكيد الموقع</Text>
            </TouchableOpacity>
          </View>
        )}
        <Text style={styles.hint}>
          يمكنك تحريك الخريطة لتحديد موقع النداء بدقة
        </Text>
      </View>
    </BottomSheet>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 20,
    color: '#2C3E50',
    fontWeight: 'bold',
    marginBottom: 16,
    fontFamily: 'Cairo-Bold',
  },
  errorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  locationInfo: {
    width: '100%',
    alignItems: 'center',
    padding: 10,
  },
  errorText: {
    color: '#E74C3C',
    textAlign: 'center',
    marginLeft: 8,
    fontFamily: 'Cairo-Regular',
  },
  addressText: {
    color: '#2C3E50',
    textAlign: 'center',
    marginTop: 8,
    lineHeight: 24,
    fontSize: 16,
    fontFamily: 'Cairo-Regular',
  },
  hint: {
    color: '#7F8C8D',
    fontSize: 12,
    marginTop: 16,
    textAlign: 'center',
    fontFamily: 'Cairo-Regular',
  },
  confirmButton: {
    backgroundColor: '#4A90E2',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
    marginTop: 16,
  },
  confirmButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: 'Cairo-Bold',
  },
});