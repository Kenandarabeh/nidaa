import React, { useCallback, useMemo, useRef, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import BottomSheet from '@gorhom/bottom-sheet';
import Map from '../components/map/Map';
import { useLocation } from '../hooks/useLocation';
import { MapLocationSheet } from '../components/map/MapLocationSheet';
import Header from '../components/Header';

const MapScreen = () => {
  const [address, setAddress] = useState<string>('جاري تحديد الموقع...');
  const [mapError, setMapError] = useState<string>('');
  const { location, error: locationError } = useLocation();
  
  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ['30%', '70%'], []);
 
  const handleSheetChanges = useCallback((index: number) => {
    console.log('handleSheetChanges', index);
  }, []);

  const handleLocationUpdate = (locationData: any) => {
    console.log('Location updated:', locationData);
  };

  const handleError = (error: string) => {
    setMapError(error);
    // Clear error after 5 seconds
    setTimeout(() => setMapError(''), 5000);
  };

  return (
    <GestureHandlerRootView style={styles.root}>
      <View style={styles.container}>
        <Header 
          showPrev 
          headerTitle="تحديد موقع نداء" 
          containerStyle={styles.header}
        />
        <View style={styles.mapWrapper}>
          <Map
            onAddressUpdate={(addressData: { full: string }) => {
              setAddress(addressData.full);
              setMapError(''); // Clear any existing errors when we get a valid address
            }}
            onError={handleError}
            onLocationUpdate={handleLocationUpdate}
            style={styles.mapContainer}
            markerColor='#4A90E2'
            zoomLevel={15}
            initialLocation={location}
            customMapStyles={`
                .custom-marker {
                  border: none;
                  background: none;
                }
              `}
          />
        </View>

        <MapLocationSheet
          bottomSheetRef={bottomSheetRef}
          snapPoints={snapPoints}
          address={address}
          error={locationError || mapError}
          onSheetChange={handleSheetChanges}
        />
      </View>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  container: {
    flex: 2,
    position: 'relative',
  },
  header: {
    flex: 1,
    position: 'relative',
  },
  mapWrapper: {
    flex: 1,
  },
  mapContainer: {
    ...StyleSheet.absoluteFillObject,
  },
});

export default MapScreen;