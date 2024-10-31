import { StyleSheet, Text, View } from 'react-native'
import Background from '../constants/Background'
import React, { useEffect } from 'react'
import useAuthStore from '../store/authStore'
import { quizStartAttempt ,getQuizQuestions } from '../api/Quizzes'
const QuizPage = ({route, navigation}) => {
    const {id } = route.params
    const wstoken = useAuthStore.getState().wstoken;
    const userid = useAuthStore.getState().userid;
    useEffect(()=>{
       const fetchQuizData =async ()=>{
        const startAttemptData = await quizStartAttempt(id , wstoken)
        console.log("attempt data",startAttemptData);
        const quizData = await getQuizQuestions(startAttemptData.id , wstoken)
        console.log("quizData",quizData);
       };
       fetchQuizData();
    },[id])

  return (
    <Background>
   

    <View style={styles.container} >

<Text >{  id }</Text> 
    </View>

</Background>
  )
}

export default QuizPage

const styles = StyleSheet.create({

    container:{
        flex : 1 , 
        justifyContent:"center",
        alignContent:"center",
       
    }
})