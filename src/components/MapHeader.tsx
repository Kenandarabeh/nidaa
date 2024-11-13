import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const MapHeader = () => {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { paddingTop: insets.top + 10 }]}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.menuButton}>
          <Icon name="menu" size={24} color="#000" />
        </TouchableOpacity>
        
        <View style={styles.searchContainer}>
          <TouchableOpacity style={styles.searchBar}>
            <Icon name="search" size={20} color="#666" style={styles.searchIcon} />
            <Text style={styles.searchPlaceholder}>اين تريد الذهاب؟</Text>
          </TouchableOpacity>
          
          <View style={styles.quickLinksContainer}>
            <TouchableOpacity style={styles.quickLink}>
              <Icon name="star" size={16} color="#666" />
              <Text style={styles.quickLinkText}>المفضلة</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.quickLink}>
              <Icon name="home" size={16} color="#666" />
              <Text style={styles.quickLinkText}>المنزل</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.quickLink}>
              <Icon name="work" size={16} color="#666" />
              <Text style={styles.quickLinkText}>العمل</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: 'transparent',
    zIndex: 1,
  },
  header: {
    padding: 15,
  },
  menuButton: {
    width: 40,
    height: 40,
    backgroundColor: '#fff',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
    marginBottom: 10,
  },
  searchContainer: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    paddingBottom: 10,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchPlaceholder: {
    color: '#666',
    fontSize: 16,
    fontWeight: '500',
  },
  quickLinksContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 12,
  },
  quickLink: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8f8f8',
    padding: 8,
    borderRadius: 20,
  },
  quickLinkText: {
    marginLeft: 4,
    fontSize: 12,
    color: '#666',
  },
});

export default MapHeader;