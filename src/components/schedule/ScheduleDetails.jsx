import { StyleSheet, Text, View ,SectionList,TouchableOpacity} from 'react-native'
import React from 'react'
import { useTranslation } from 'react-i18next';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
const ScheduleDetails = ({bookedSlot}) => {
  const navigation = useNavigation()
    const {t} = useTranslation()
    const room="RandomRoomName"
    const  joinJitsiRoom=()=>{
      navigation.navigate('Meeting', { room })
    }
  return (

   <View style={styles.listContainer}>
   <View style={styles.list}>  
   <Text style={{textAlign:"center",fontFamily:"Tajawal-Bold",fontSize:30,color:"white" }} > {t("you have scheduled consultation at")} </Text>
    <SectionList
      sections={bookedSlot}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <TouchableOpacity
          style={styles.item}
          onPress={joinJitsiRoom}
        >
          <View style={styles.itemContent}>
              <Text style={styles.title}>
                {`${item.start_time.slice(0, 5)} - ${item.end_time.slice(0, 5)}`}
              </Text>
         
                <MaterialIcons
                  name="check-circle"
                  size={20}
                
                  color="white"
                  style={styles.icon }
                />
              
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
  </View>

  )
}

export default ScheduleDetails

const styles = StyleSheet.create({
    headerContainer: {

        marginTop:20,
        padding: 5,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
      },
      header: {
        fontSize: 40,
        textAlign:"center",
        fontWeight: 'bold',
        color: "white",
      },
      listContainer: {
        flex: 1,
  justifyContent:"center"   
      },
     
     
      item: {
        padding: 16,
        borderRadius: 10,
        marginVertical: 4,

  
      },
      itemContent: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent:"center",
   
      },
      title: {
        fontSize: 18,
        color: 'white', 
        textAlign: "center",
      },
      icon:{
        margin:5,
      }
})