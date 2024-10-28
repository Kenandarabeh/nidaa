import { StyleSheet, Text, View, SectionList, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const ScheduleSlotsList = ({ timeSlots, onSlotSelected }) => {
  const [selectedId, setSelectedId] = useState(null);

  const handleSlotPress = (id) => {
    setSelectedId(id);
    onSlotSelected(id);
  };

  return (
    <View style={styles.list}>
      <SectionList
        sections={timeSlots}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => handleSlotPress(item.id)}
            style={styles.item}
          >
              <View style={styles.itemContent}>
              <Text style={styles.title}>
                {`${item.start_time.slice(0, 5)} - ${item.end_time.slice(0, 5)}`}
              </Text>
              {selectedId === item.id && (
                <MaterialCommunityIcons
                  name="clock-check"
                  size={24}
                  color="#003143"
                  style={styles.icon}
                />
              )}
            </View>
          </TouchableOpacity>
        )}
        renderSectionHeader={({ section: { title } }) => (
          <View style={styles.headerContainer}>
            <Text style={styles.header}>{title}</Text>
          </View>
        )}
        stickySectionHeadersEnabled={false}
      />
    </View>
  );
};

export default ScheduleSlotsList;

const styles = StyleSheet.create({
  headerContainer: {
    padding: 5,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  header: {
    textAlign:"right",
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
  list: {
    flex: 1,
    margin: 5,
    marginTop: 40,
  },
  item: {
    flexDirection: 'row', 
    alignItems: 'center', 
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    marginVertical: 4,
  },
  itemContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between', 
  },
  title: {
    fontSize: 18,
    color: '#333',
    textAlign: 'center',
    flex: 1, 
  },
  icon: {
    position: 'absolute', 
    right: 16, 
    top: '50%', 
    transform: [{ translateY: -12 }], 
  },
});
