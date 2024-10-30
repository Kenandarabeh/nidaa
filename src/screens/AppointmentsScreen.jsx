import { StyleSheet, View, Modal ,ActivityIndicator} from 'react-native';
import React, { useEffect, useState } from 'react';
import { cancelBooking, createBooking, getSchedulesByCourse } from '../api/Booking';
import CustomButton from '../constants/CustomButton';
import Background from '../constants/Background';
import { useTranslation } from 'react-i18next';
import AnimatedConfirmation from '../components/commun/AnimatedConfirmation';
import useAuthStore from '../store/authStore';
import sectionListFormat from '../utils/helpers/sectionListFormatter';
import ScheduleSlotsList from '../components/schedule/ScheduleSlotsList';
import ScheduleDetails from '../components/schedule/ScheduleDetails';
import { useConfirmation } from '../components/commun/Confirm';

const AppointmentsScreen = ({ courseid = 8 }) => {
  const showConfirmation = useConfirmation();
  const { t } = useTranslation();
  const [timeSlots, setTimeSlots] = useState([]);
  const [slotId,setSlotId]=useState();
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalConfirmationType, setModalConfirmationType] = useState('success');
  const [confirmationMessage, setConfirmationMessage] = useState('Your booking has been successfully confirmed!');
  const wstoken = useAuthStore.getState().wstoken;

  useEffect(() => {
    const fetchBookingSlots = async () => {
      try {
       
        const slots = await getSchedulesByCourse(courseid, wstoken);
        console.log("slots", slots);
        // Transform the slots into a SectionList format
        const groupedSlots = sectionListFormat(slots);
        setTimeSlots(Object.values(groupedSlots));
      } catch (error) {
        console.error('Error fetching token or booking slots:', error);
      }
    };

    fetchBookingSlots();
  }, [courseid, wstoken,timeSlots.length]);

  const bookSlot =  () => {
    if (!slotId) {
      setConfirmationMessage('Fail to book Appointment');
      setModalConfirmationType('fail');
      setModalVisible(true);
      return;
    }
    setLoading(true);
    try {
      showConfirmation('Are you sure you want to book this slot?', async () => {
        const bookingStatus = await createBooking(slotId, wstoken);
        if (bookingStatus) {
          setModalVisible(true);
      }
      });
    } catch (error) {
      setModalConfirmationType('fail');
      setModalVisible(true);
    } finally {
      setLoading(false);
    }
  };
  const cancelSchudule= ()=>{
    let id = timeSlots[0].data[0].id // grab booked slotId 
        console.log("id",id);
        showConfirmation('Are you sure you want to cancel your booking?', async () => {
          await cancelBooking(id, wstoken);
        setTimeSlots([]) // to trigger rerender
        }
      )
  }

  return (
    <Background>
      <View style={styles.container}>
      {timeSlots.length > 1 ? (
        <ScheduleSlotsList timeSlots={timeSlots} onSlotSelected={setSlotId} />
      ) : timeSlots.length === 1 ? (
        <ScheduleDetails bookedSlot={timeSlots} />
      ) : (
        <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="white" />
      </View>
      )}
        <View style={styles.footer}>
          <CustomButton onPress={timeSlots.length === 1 ?cancelSchudule:bookSlot} style={timeSlots.length === 1 ?styles.cancelBtn :styles.bookBtn} loading={loading}>
            {t(timeSlots.length === 1 ?'Cancel Booking':'Book')}
          </CustomButton>
        </View>
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(!modalVisible)}
      >
        <AnimatedConfirmation
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
    justifyContent:"center",
  },
 
  footer: {
    marginTop:"auto",
    backgroundColor: '#003143', 
    padding: 10,
  },
  bookBtn: {
    backgroundColor: '#3498db', 
    borderRadius: 10,
    padding: 16,
  },
  cancelBtn: {
    backgroundColor: '#ff2c2c', 
    borderRadius: 10,
    padding: 16,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center', 
  },
  
});
