
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const BottomSheet = () => {
  return (
    <View style={styles.bottomSheet}>
      <View style={styles.handle} />
      <ScrollView>
        <Text style={styles.title}>Choose a ride</Text>
        {['UberX', 'UberXL', 'UberBlack'].map((service, index) => (
          <TouchableOpacity key={index} style={styles.rideOption}>
            <Icon name="directions-car" size={24} color="#000" />
            <View style={styles.rideDetails}>
              <Text style={styles.rideName}>{service}</Text>
              <Text style={styles.rideTime}>5 min away</Text>
            </View>
            <Text style={styles.ridePrice}>$24.00</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  bottomSheet: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingVertical: 20,
    paddingHorizontal: 20,
    minHeight: 300,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  handle: {
    width: 40,
    height: 4,
    backgroundColor: '#DEE2E6',
    borderRadius: 2,
    alignSelf: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  rideOption: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#EEE',
  },
  rideDetails: {
    flex: 1,
    marginLeft: 15,
  },
  rideName: {
    fontSize: 16,
    fontWeight: '600',
  },
  rideTime: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
  ridePrice: {
    fontSize: 16,
    fontWeight: '600',
  },
});

export default BottomSheet;