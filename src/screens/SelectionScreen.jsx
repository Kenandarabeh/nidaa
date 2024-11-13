import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import CustomCard from '../components/CustomCard';
import Background from '../constants/Background';

const SelectionScreen = ({ navigation }) => {
  // Card data with images and navigation destinations
  const cards = [
    {
      imageSource: require('../assets/images/doctor.png'), // Update with your image
      destination: 'Service1',
      size: 120
    },
    {
      imageSource: require('../assets/images/doctor.png'), // Update with your image
      destination: 'Service2',
      size: 120
    },
    {
      imageSource: require('../assets/images/doctor.png'), // Update with your image
      destination: 'Service3',
      size: 120
    },
    {
      imageSource: require('../assets/images/doctor.png'), // Update with your image
      destination: 'Service4',
      size: 120
    }
  ];

  return (
    <Background  showHeader allowDrawer >
      <View style={styles.container}>
        <View style={styles.cardsContainer}>
          <View style={styles.row}>
            <CustomCard
              imageSource={cards[0].imageSource}
              size={cards[0].size}
              borderRadius={20}
              style={styles.card}
              onPress={() => navigation.navigate(cards[0].destination)}
            />
            <CustomCard
              imageSource={cards[1].imageSource}
              size={cards[1].size}
              borderRadius={20}
              style={styles.card}
              onPress={() => navigation.navigate(cards[1].destination)}
            />
          </View>
          <View style={styles.row}>
            <CustomCard
              imageSource={cards[2].imageSource}
              size={cards[2].size}
              borderRadius={20}
              style={styles.card}
              onPress={() => navigation.navigate(cards[2].destination)}
            />
            <CustomCard
              imageSource={cards[3].imageSource}
              size={cards[3].size}
              borderRadius={20}
              style={styles.card}
              onPress={() => navigation.navigate(cards[3].destination)}
            />
          </View>
        </View>
      </View>
    </Background>
  );
};

const { width } = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardsContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
    gap: 20,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
});

export default SelectionScreen;