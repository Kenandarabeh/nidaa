import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { DrawerContentScrollView } from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/Ionicons';
import { menuItems } from '../data/menu-data';

const CustomDrawerContent = (props) => {
  return (
    <DrawerContentScrollView {...props}>
      <View style={styles.drawerContent}>
        <View style={styles.userSection}>
          <Text style={styles.userName}>User Name</Text>
          <Text style={styles.userEmail}>user@example.com</Text>
        </View>

        <View style={styles.drawerItems}>
          {menuItems.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={styles.drawerItem}
              onPress={() => props.navigation.navigate(item.route)}
            >
              <Icon name={item.icon} size={24} color="#333" />
              <Text style={styles.drawerItemText}>{item.title}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </DrawerContentScrollView>
  );
};

const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
    paddingTop: 20,
  },
  userSection: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    marginBottom: 10,
  },
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  userEmail: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  drawerItems: {
    paddingTop: 10,
  },
  drawerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  drawerItemText: {
    marginLeft: 32,
    fontSize: 16,
    color: '#333',
  },
});

export default CustomDrawerContent;
