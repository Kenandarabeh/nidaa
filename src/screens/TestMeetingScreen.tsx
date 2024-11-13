import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const TestMeetingScreen = () => {
  const [roomId, setRoomId] = useState('test123');
  const navigation = useNavigation();

  const generateRandomName = () => {
    const names = ['User', 'Guest', 'Visitor', 'Anonymous'];
    const randomNum = Math.floor(Math.random() * 1000);
    return `${names[Math.floor(Math.random() * names.length)]}${randomNum}`;
  };

  const handleJoinMeeting = () => {
    if (!roomId.trim()) {
      Alert.alert('Error', 'Please enter a room ID');
      return;
    }
    navigation.navigate('Meeting', {
      room: roomId.trim(),
      displayName: generateRandomName()
    });
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={roomId}
        onChangeText={setRoomId}
        placeholder="Enter room ID"
      />
      <TouchableOpacity 
        style={styles.button}
        onPress={handleJoinMeeting}
      >
        <Text style={styles.buttonText}>Join Meeting</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  // ...existing code...
});

export default TestMeetingScreen;
