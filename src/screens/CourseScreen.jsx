import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'

import { fetchCourseContent } from '../api/Courses'
import { getEnroledUserCourses } from '../api/Courses'
import useAuthStore from '../store/authStore'
import Background from '../constants/Background'
import CustomButton from '../constants/CustomButton'
const CourseScreen = ({navigation}) => {
    
    const [sectionName , setSectionName]=useState()
    const [courseContent , setCourseContent]=useState([])
    const wstoken = useAuthStore.getState().wstoken;
    const userid = useAuthStore.getState().userid;
useEffect(()=>{

    const getEnroledUser= async () => {
        const course = await getEnroledUserCourses(userid,wstoken)
        if(course[0]){
            let sc = await fetchCourseContent(course[0].id,wstoken)
            console.log("content",sc[0].name); /// we have access to course content 

            setCourseContent(sc)
           
            
        }
    };

    getEnroledUser();
},[]);
const selctedSection =(section)=>{

    navigation.navigate('SessionScreen',{
        section:section,
    })
console.log("section",section);
}
  return (
    <Background>
   

        <View style={styles.container} >


        {
                courseContent.map((sc , idx )=>
                    <CustomButton  key={idx} onPress={()=>selctedSection(sc)}>
                                {sc?.name}
              </CustomButton>
                 )
            }
     
        </View>

    </Background>
  )
}

export default CourseScreen

const styles = StyleSheet.create({
    container:{
        flex : 1 , 
        justifyContent:"center",
        alignContent:"center",
       
    }
})