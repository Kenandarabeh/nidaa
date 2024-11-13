import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';

interface LocationSearchProps {
  onSelectAddress?: (coordinates: { lat: number; lng: number }) => void;
}

export const LocationSearch: React.FC<LocationSearchProps> = ({ onSelectAddress }) => {
  const handleSearch = async (text: string) => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(text)}`
      );
      const data = await response.json();
      if (data.length > 0 && onSelectAddress) {
        onSelectAddress({
          lat: parseFloat(data[0].lat),
          lng: parseFloat(data[0].lon)
        });
      }
    } catch (error) {
      console.error('Search error:', error);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Where to?"
        placeholderTextColor="#666"
        onSubmitEditing={(e) => handleSearch(e.nativeEvent.text)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 50,
    left: 20,
    right: 20,
    backgroundColor: 'white',
    borderRadius: 8,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  input: {
    padding: 15,
    fontSize: 16,
  },
});