import React, { useRef, useEffect, useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import WebView from 'react-native-webview';

const Map = ({
  onAddressUpdate,
  onError,
  onLocationUpdate,
  style,
  initialLocation,
  zoomLevel = 15,
  markerColor = 'red',
  tileServerUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  customMapStyles = {},
}) => {
  const webViewRef = useRef(null);
 
  const mapHtmlContent = `
<!DOCTYPE html>
<html>
<head>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="Content-Security-Policy" content="default-src * 'unsafe-inline' 'unsafe-eval' data: blob:;">
    <link rel="stylesheet" href="https://unpkg.com/leaflet@1.7.1/dist/leaflet.css" />
    <script src="https://unpkg.com/leaflet@1.7.1/dist/leaflet.js"></script>
    <style>
        body { margin: 0; }
        #map { width: 100%; height: 100vh; }
        ${customMapStyles}
    </style>
</head>
<body>
    <div id="map"></div>
    <script>
        let map, marker;
        
        function sendToReactNative(data) {
            window.ReactNativeWebView.postMessage(JSON.stringify(data));
        }

        async function getAddress(lat, lng) {
            const maxRetries = 3;
            let currentTry = 0;

            while (currentTry < maxRetries) {
                try {
                    const controller = new AbortController();
                    const timeoutId = setTimeout(() => controller.abort(), 10000);

                    const response = await fetch(
                        'https://nominatim.openstreetmap.org/reverse?' +
                        'format=json&lat=' + lat + '&lon=' + lng + '&zoom=18&addressdetails=1',
                        {
                            headers: {
                                'Accept': 'application/json',
                                'User-Agent': 'DeepSleepApp/1.0'
                            },
                            signal: controller.signal
                        }
                    );
                    
                    clearTimeout(timeoutId);
                    
                    if (!response.ok) {
                        throw new Error('HTTP error! status: ' + response.status);
                    }
                    
                    const data = await response.json();
                    
                    if (!data || data.error) {
                        throw new Error(data?.error || 'Invalid response data');
                    }

                    const address = {
                        full: data.display_name || 'العنوان غير متوفر',
                        street: data.address?.road || data.address?.pedestrian || '',
                        city: data.address?.city || data.address?.town || data.address?.village || '',
                        state: data.address?.state || '',
                        country: data.address?.country || ''
                    };
                    
                    sendToReactNative({ type: 'address', data: address });
                    return address;
                } catch (error) {
                    currentTry++;
                    if (currentTry === maxRetries) {
                        const errorMessage = error.name === 'AbortError' 
                            ? 'فشل الاتصال: تأكد من اتصالك بالإنترنت'
                            : 'فشل في جلب العنوان: ' + error.message;
                        sendToReactNative({ type: 'error', message: errorMessage });
                    } else {
                        await new Promise(resolve => setTimeout(resolve, 1000));
                    }
                }
            }
            return null;
        }

        function updateMarkerAndMap(lat, lng) {
            if (!map) return;
            
            if (!marker) {
                marker = L.marker([lat, lng], {
                    icon: L.divIcon({
                        html: '<div style="background-color: ${markerColor}; width: 12px; height: 12px; border-radius: 50%; border: 2px solid white;"></div>',
                        className: 'custom-marker'
                    })
                }).addTo(map);
            } else {
                marker.setLatLng([lat, lng]);
            }
            
            map.setView([lat, lng], ${zoomLevel});
            getAddress(lat, lng);
            sendToReactNative({ type: 'location', data: { lat, lng } });
        }

        map = L.map('map');
        L.tileLayer('${tileServerUrl}', {
            attribution: '© OpenStreetMap contributors'
        }).addTo(map);

        window.updateLocation = function(lat, lng) {
            updateMarkerAndMap(lat, lng);
        };

        // Initialize map with initial location if provided
        ${initialLocation ? `updateMarkerAndMap(${initialLocation.latitude}, ${initialLocation.longitude});` : ''}
    </script>
</body>
</html>
`;

  const handleMessage = (event) => {
    try {
      const data = JSON.parse(event.nativeEvent.data);
      switch (data.type) {
        case 'address':
          onAddressUpdate?.(data.data);
          break;
        case 'error':
          onError?.(data.message);
          break;
        case 'location':
          onLocationUpdate?.(data.data);
          break;
      }
    } catch (e) {
      onError?.('Error parsing message: ' + e.message);
    }
  };

  const updateLocation = (latitude, longitude) => {
    webViewRef.current?.injectJavaScript(`
      window.updateLocation(${latitude}, ${longitude});
      true;
    `);
  };

  return (
    <WebView
      ref={webViewRef}
      style={[styles.map, style]}
      source={{ html: mapHtmlContent }}
      originWhitelist={['*']}
      javaScriptEnabled={true}
      domStorageEnabled={true}
      onMessage={handleMessage}
      geolocationEnabled={true}
      androidHardwareAccelerationDisabled={true}
    />
  );
};

const styles = StyleSheet.create({
  map: {
    flex: 1,
    width: '100%',
  },
});

export default Map;