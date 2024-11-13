import React, { useCallback, useRef, useEffect, useState } from "react";
import { JitsiMeeting } from "@jitsi/react-native-sdk";
import { PermissionsAndroid, Platform, StyleSheet, ActivityIndicator, View, Alert } from "react-native";

interface MeetingProps {
  roomId: string;
  onClose?: () => void;
}

const Meeting = ({ roomId = 'defaultRoom', onClose }: MeetingProps) => {
  const jitsiMeeting = useRef(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const requestPermissions = async () => {
      try {
        if (Platform.OS === 'android') {
          const granted = await PermissionsAndroid.requestMultiple([
            PermissionsAndroid.PERMISSIONS.CAMERA,
            PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
          ]);
          
          if (
            granted['android.permission.CAMERA'] !== PermissionsAndroid.RESULTS.GRANTED ||
            granted['android.permission.RECORD_AUDIO'] !== PermissionsAndroid.RESULTS.GRANTED
          ) {
            Alert.alert('Error', 'Permissions required to use video chat');
          }
        }
      } catch (err) {
        console.warn(err);
        Alert.alert('Error', 'Failed to request permissions');
      } finally {
        setIsLoading(false);
      }
    };
    requestPermissions();
  }, []);

  const eventListeners = {
    onConferenceJoined: () => {
      console.log('Joined conference room:', roomId);
      setIsLoading(false);
    },
    onConferenceTerminated: () => {
      console.log('Conference terminated');
      setError(null);
      onClose?.();
    },
    onConferenceError: (error: any) => {
      console.error('Conference error:', error);
      setError(error);
      Alert.alert('Error', 'Failed to connect to meeting. Please try again.');
    }
  };

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <ActivityIndicator size="large" color="red" />
      </View>
    );
  }

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <JitsiMeeting
      config={{
        startWithAudioMuted: false,
        startWithVideoMuted: false,
        subject: `Meeting: ${roomId}`,
        prejoinPageEnabled: false,
        disableDeepLinking: true,
        toolbarButtons: [
          'camera',
          'chat',
          'hangup',
          'microphone',
          'toggle-camera',
          'participants-pane'
        ],
        constraints: {
          video: {
            height: { ideal: 720 },
            width: { ideal: 1280 },
            frameRate: { min: 15, max: 30 }
          },
          audio: {
            echoCancellation: true,
            noiseSuppression: true,
            autoGainControl: true
          }
        }
      }}
      eventListeners={eventListeners}
      ref={jitsiMeeting}
      style={styles.jitsiMeeting}
      room={roomId}
      serverURL="https://meet.jit.si"
      token={null}
      featureFlags={{
        'chat.enabled': true,
        'video-share.enabled': true,
        'pip.enabled': false,
        'calendar.enabled': false,
        'call-integration.enabled': false,
        'recording.enabled': false,
        'live-streaming.enabled': false,
        'meeting-name.enabled': true,
        'add-people.enabled': true,
        'invite.enabled': true
      }}
    />
  );
};

const styles = StyleSheet.create({
  jitsiMeeting: {
    flex: 1,
    height: '100%',
    width: '100%',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  }
});

export default Meeting;
