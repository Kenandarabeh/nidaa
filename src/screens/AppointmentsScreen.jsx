import { StyleSheet, Text, View, Modal, TouchableOpacity, SectionList } from 'react-native';
import React, { useEffect, useState } from 'react';
import { cancelBooking, createBooking, getSchedulesByCourse } from '../api/Booking';
import CustomButton from '../constants/CustomButton';
import Background from '../constants/Background';
import { useTranslation } from 'react-i18next';
import UIConfirmation from '../components/commun/UIConfirmation';
import useAuthStore from '../store/authStore';
import sectionListFormat from '../utils/helpers/sectionListFormatter';

const AppointmentsScreen = ({ courseid = 4 }) => {
  const { t } = useTranslation();
  const [timeSlots, setTimeSlots] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalConfirmationType, setModalConfirmationType] = useState('success');
  const [confirmationMessage, setConfirmationMessage] = useState('Your booking has been successfully confirmed!');
  const wstoken = useAuthStore.getState().wstoken;

  useEffect(() => {
    const fetchBookingSlots = async () => {
      try {
        const slots = await getSchedulesByCourse(courseid, wstoken);
        console.log("slots", slots.length);
        
        // Transform the slots into a SectionList format
        const groupedSlots = sectionListFormat(slots);

        setTimeSlots(Object.values(groupedSlots));
      } catch (error) {
        console.error('Error fetching token or booking slots:', error);
      }
    };

    fetchBookingSlots();
  }, [courseid, wstoken]);

  const bookSlot = async (id) => {
    if (!id) {
      setConfirmationMessage('Fail to book Appointment');
      setModalConfirmationType('fail');
      setModalVisible(true);
      return;
    }

    setLoading(true);
    try {
      // to test cancel booking
      if (timeSlots.length === 1) {
        await cancelBooking(id, wstoken);
      } else {
        const bookingStatus = await createBooking(id, wstoken);
        if (bookingStatus) {
          setModalVisible(true);
        }
      }
    } catch (error) {
      setModalConfirmationType('fail');
      setModalVisible(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Background>
      <View style={styles.container}>
        <View style={styles.list}>
          <SectionList
            sections={timeSlots}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => bookSlot(item.id)}
                style={styles.item}
              >
                <Text style={styles.title}>
                  {`${item.start_time} - ${item.end_time}`}
                </Text>
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

        <View style={styles.footer}>
          <CustomButton onPress={bookSlot} style={styles.btn} loading={loading}>
            {t('Book')}
          </CustomButton>
        </View>
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(!modalVisible)}
      >
        <UIConfirmation
          type={modalConfirmationType}
          message={t(confirmationMessage)}
          buttonText={t('back to main menu')}
          navigationRoute={'Login'}
        />
      </Modal>
    </Background>
  );
};

export default AppointmentsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "transparent", 
    flexDirection: 'column',
  },
  headerContainer: {
    backgroundColor: '#016143', 
    padding: 5,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    color: "white",
  },
  list: {
    flex: 1, 
    margin: 5,
    marginTop: 40,
  },
  item: {
    padding: 16,
    backgroundColor: '#FFFFFF', 
    borderRadius: 10,
    marginVertical: 4,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 1,
  },
  title: {
    fontSize: 18,
    color: '#333', 
    textAlign: "center"
  },
  footer: {
    backgroundColor: '#003143', 
    padding: 10,
  },
  btn: {
    backgroundColor: '#3498db', 
    borderRadius: 10,
    padding: 16,
  },
});
