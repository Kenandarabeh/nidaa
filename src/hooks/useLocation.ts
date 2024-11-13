import { useState, useEffect, useRef, useCallback } from 'react';
import { Platform, PermissionsAndroid } from 'react-native';
import Geolocation from '@react-native-community/geolocation';

interface LocationState {
  loading: boolean;
  error: string | null;
  location: {
    latitude: number;
    longitude: number;
  } | null;
}

export const useLocation = () => {
  const [state, setState] = useState<LocationState>({
    loading: true,
    error: null,
    location: null,
  });
  
  const watchId = useRef<number | null>(null);
  const retryTimeoutRef = useRef<NodeJS.Timeout>();
  const maxRetries = 3;
  const [retryCount, setRetryCount] = useState(0);

  const requestPermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: "Location Permission",
            message: "This app needs access to your location",
            buttonNeutral: "Ask Me Later",
            buttonNegative: "Cancel",
            buttonPositive: "OK"
          }
        );
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        return false;
      }
    }
    return true;
  };

  const startLocationWatch = useCallback(async () => {
    if (watchId.current !== null) {
      Geolocation.clearWatch(watchId.current);
    }

    watchId.current = Geolocation.watchPosition(
      (position) => {
        setRetryCount(0);
        setState(prev => ({
          ...prev,
          loading: false,
          error: null,
          location: {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          }
        }));
      },
      (error) => {
        if (retryCount < maxRetries) {
          retryTimeoutRef.current = setTimeout(() => {
            setRetryCount(prev => prev + 1);
            startLocationWatch();
          }, 2000 * (retryCount + 1));
        } else {
          setState(prev => ({
            ...prev,
            loading: false,
            error: 'Location services unavailable'
          }));
        }
      },
      { enableHighAccuracy: true, distanceFilter: 10, timeout: 20000 }
    );
  }, [retryCount]);

  useEffect(() => {
    const startLocationTracking = async () => {
      const hasPermission = await requestPermission();
      
      if (!hasPermission) {
        setState(prev => ({
          ...prev,
          loading: false,
          error: 'Location permission denied'
        }));
        return;
      }

      Geolocation.getCurrentPosition(
        (position) => {
          setState(prev => ({
            ...prev,
            loading: false,
            location: {
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
            }
          }));
        },
        (error) => {
          setState(prev => ({
            ...prev,
            loading: false,
            error: error.message
          }));
        },
        { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
      );

      startLocationWatch();
    };

    startLocationTracking();

    return () => {
      if (retryTimeoutRef.current) {
        clearTimeout(retryTimeoutRef.current);
      }
      if (watchId.current !== null) {
        Geolocation.clearWatch(watchId.current);
      }
    };
  }, [startLocationWatch]);

  return state;
};
