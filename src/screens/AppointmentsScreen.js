import { StyleSheet, Text, View ,Modal } from 'react-native'
import React, { useEffect ,useState} from 'react'
import { createBooking, cancelBooking, getSchedulesByCourse } from '../api/Booking'
import CustomButton from '../constants/CustomButton'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { api_token } from '../config/api_token'
import DropDownPicker from 'react-native-dropdown-picker';
import Backgound from '../constants/Backgound'
import {useTranslation} from 'react-i18next';
import { useNavigation } from '@react-navigation/native'
import UIConfirmation from '../components/commun/UIConfirmation'
const getBookingSlots = async (cid, wstoken) => {
  try {
    const slots = await getSchedulesByCourse(cid, wstoken)
    return slots;
  } catch (error) {
    console.error('Error fetching booking slots:', error)
  }
}


const AppointmentsScreen = ({ courseid = 4 }) => {  
      // navigation provider should be used  instead of importing it everytime on all components 
    const navigation = useNavigation();
    const {t} =useTranslation();
    const [appointment,setAppointmentStatue]=useState({"status":null})
    const [openDate, setOpenDate] = useState(false);
    const [openTime, setOpenTime] = useState(false);
    const [value, setValue] = useState(null);
    const [timeSlots, setTimeSlots] = useState([]);
    const [dateValue, setDateValue] = useState(null);
    const [timeValue, setTimeValue] = useState(null);
    const [wstoken , setWsToken] = useState()
    const [items, setItems] = useState([]);
    const [loading , setLoading ]=useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [modalConfirmationType,setModalConfirmationType]=useState("success")
    const [confirmationMessage,setConfirmationMessage]=useState("Your booking has been successfully confirmed!")

  useEffect(() => {
    DropDownPicker.setLanguage("AR");
    //TO DO check appointement status 
    const fetchBookingSlots = async () => {
      try {
        const wstoken = await AsyncStorage.getItem(api_token)
        if (wstoken) {
            setWsToken(wstoken)
            console.log("wstoken",wstoken);
            const slots = await getBookingSlots(courseid, wstoken)
            setTimeSlots(slots);
            console.log("slots",slots);
        } else {
          console.error('API token not found')
        }
      } catch (error) {
        console.error('Error fetching token or booking slots:', error)
      }
    }

    fetchBookingSlots()
  }, [courseid])

  const bookSlot= async (slotId)=>{
    if (!timeValue) {
        setConfirmationMessage("Fail to book Appointment")
        setModalConfirmationType("fail")
        setModalVisible(true)
        return;
      }
    let bookingStatus
    console.log("item",value); //im using value directly for testing , pass slotId after selection
    setLoading(true)
   try {
  
        bookingStatus =  await createBooking(value,wstoken)
        
    if (bookingStatus){
        setLoading(false)
        setModalVisible(true)
    }
  } catch (error) {
    setModalConfirmationType("fail")
    setModalVisible(true)
    
  }
  }
  return (
    <Backgound>
    
    <View style={styles.container}>
    
    {appointment.status === null ? (
          <View style={styles.dropDownContainer}>
            <Text style={styles.title}>{t('Book')}</Text>
            <DropDownPicker
              schema={{ label: 'date', value: 'id' }}
              zIndex={3000}
              placeholder={t("day")}
              placeholderStyle={{ color: "grey", fontFamily: "Tajawal" }}
              open={openDate}
              value={dateValue}
              items={timeSlots}
              setOpen={setOpenDate}
              setValue={setDateValue}
              setItems={setItems}
            />
            <DropDownPicker
              style={{ marginTop: 10 }}
              schema={{ label: 'start_time', value: 'id' }}
              zIndex={2000}
              placeholder={t("timeslot")}
              placeholderStyle={{ color: "grey", fontFamily: "Tajawal" }}
              open={openTime}
              value={timeValue}
              items={timeSlots}
              setOpen={setOpenTime}
              setValue={setTimeValue}
              setItems={setItems}
            />
        
          </View>
        ) : (
         
          <Text style={styles.title}>{t('Appointment Confirmed')}</Text>
        )}

<View  style={styles.footer}>

<CustomButton
              onPress={bookSlot}
              style={styles.btn}
              loading={loading}
            >
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
        <UIConfirmation type={modalConfirmationType} message={t(confirmationMessage)} buttonText={t("back to main menu") } navigationRoute={"Details"} />
      </Modal>
    </Backgound>
  )
}

export default AppointmentsScreen

const styles = StyleSheet.create({
  container: {flex: 1,justifyContent: 'center',alignItems: 'center',},
  dropDownContainer:{padding:10,flex:0.4,justifyContent:"flex-end"},
  btn:{backgroundColor:"#3498db"},
  title:{fontSize:30 ,fontFamily:"Tajawal-Medium" ,textAlign:'center' ,marginBottom:15,color:"white"},
  footer:{marginTop:"auto" ,width:"100%" ,height:100, backgroundColor: '#003143',padding:10 ,paddingBottom:5}
})
