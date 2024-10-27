import {StyleSheet, Text, View, Modal} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  createBooking,
  cancelBooking,
  getSchedulesByCourse,
} from '../api/Booking';
import CustomButton from '../constants/CustomButton';
import DropDownPicker from 'react-native-dropdown-picker';
import Backgound from '../constants/Backgound';
import {useTranslation} from 'react-i18next';
import {useNavigation} from '@react-navigation/native';
import UIConfirmation from '../components/commun/UIConfirmation';
import useAuthStore from '../store/authStore';
import { Dropdown } from 'react-native-element-dropdown';
const getBookingSlots = async (cid, wstoken) => {
  try {
    const slots = await getSchedulesByCourse(cid, wstoken);
    return slots;
  } catch (error) {
    console.error('Error fetching booking slots:', error);
  }
};
const data = [
  { label: 'Item 1', value: '1' },
  { label: 'Item 2', value: '2' },
  { label: 'Item 3', value: '3' },
  { label: 'Item 4', value: '4' },
  { label: 'Item 5', value: '5' },
  { label: 'Item 6', value: '6' },
  { label: 'Item 7', value: '7' },
  { label: 'Item 8', value: '8' },
];

const AppointmentsScreen = ({courseid = 4}) => {
  // navigation provider should be used  instead of importing it everytime on all components
  const navigation = useNavigation();
  const {t} = useTranslation();
  const [appointment, setAppointmentStatue] = useState({status: null});
  const [openDate, setOpenDate] = useState(false);
  const [openTime, setOpenTime] = useState(false);
  const [value, setValue] = useState(null);
  const [timeSlots, setTimeSlots] = useState([]);
  const [dateValue, setDateValue] = useState(null);
  const [timeValue, setTimeValue] = useState(null);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalConfirmationType, setModalConfirmationType] = useState('success');
  const [confirmationMessage, setConfirmationMessage] = useState(
    'Your booking has been successfully confirmed!',
  );
  const wstoken = useAuthStore.getState(state => state.wstoken);
  useEffect(() => {
    DropDownPicker.setLanguage('AR');
    //TO DO check appointement status
    const fetchBookingSlots = async () => {
      try {
        const slots = await getBookingSlots(courseid, wstoken);
        setTimeSlots(slots);
      } catch (error) {
        console.error('Error fetching token or booking slots:', error);
      }
    };

    fetchBookingSlots();
  }, [courseid]);

  const bookSlot = async slotId => {
    if (!timeValue) {
      setConfirmationMessage('Fail to book Appointment');
      setModalConfirmationType('fail');
      setModalVisible(true);
      return;
    }
    let bookingStatus;
    console.log('item', value); //im using value directly for testing , pass slotId after selection
    setLoading(true);
    try {
      bookingStatus = await createBooking(value, wstoken);

      if (bookingStatus) {
        setLoading(false);
        setModalVisible(true);
      }
    } catch (error) {
      setModalConfirmationType('fail');
      setModalVisible(true);
    }
  };
  return (
    <Backgound>
      <View style={styles.container}>
        {appointment.status === null ? (
          <View style={styles.dropDownContainer}>
            <Text style={styles.title}>{t('Book')}</Text>
            <Dropdown
        style={styles.dropdown}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        data={data}
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder={t("date")}
        
        value={value}
        onChange={item => {
          setValue(item.value);
        }}
      />
          </View>
        ) : (
          <Text style={styles.title}>{t('Appointment Confirmed')}</Text>
        )}

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
        onRequestClose={() => setModalVisible(!modalVisible)}>
        <UIConfirmation
          type={modalConfirmationType}
          message={t(confirmationMessage)}
          buttonText={t('back to main menu')}
          navigationRoute={'Login'}
        />
      </Modal>
    </Backgound>
  );
};

export default AppointmentsScreen;

const styles = StyleSheet.create({


  btn: {backgroundColor: '#3498db'},
  title: {
    fontSize: 30,
    fontFamily: 'Tajawal-Medium',
    textAlign: 'center',
    marginBottom: 15,
    color: 'white',
  },
  footer: {
    marginTop: 'auto',
    width: '100%',
    height: 100,
    backgroundColor: '#003143',
    padding: 10,
    paddingBottom: 5,
  },

  
    placeholderStyle: {
      fontSize: 16,
    },
    selectedTextStyle: {
      fontSize: 16,
    },
    iconStyle: {
      width: 20,
      height: 20,
    },
    dropdown: {
      height: 50,
      borderColor: 'gray',
      borderWidth: 0.5,
      borderRadius: 8,
      paddingHorizontal: 8,
    },
    icon: {
      marginRight: 5,
    },
    label: {
      position: 'absolute',
      backgroundColor: 'white',
      left: 22,
      top: 8,
      zIndex: 999,
      paddingHorizontal: 8,
      fontSize: 14,
    },
    placeholderStyle: {
      fontSize: 16,
    },
    selectedTextStyle: {
      fontSize: 16,
    },
    iconStyle: {
      width: 20,
      height: 20,
    },
    inputSearchStyle: {
      height: 40,
      fontSize: 16,
    },
});
