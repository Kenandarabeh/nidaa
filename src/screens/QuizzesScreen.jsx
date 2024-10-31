import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Background from '../constants/Background';

import CustomButton from '../constants/CustomButton';
const QuizzesScreen = ({navigation,route}) => {
    const {modules} = route.params ;
    console.log("this is section modules",modules );
    const selectedQuiz = quiz =>{
        navigation.navigate("QuizPage",{
            id:quiz.instance
        })
    }
  return (
    <Background>
    <View style={styles.container} >
    {
            modules.map((quiz , idx )=>
             <CustomButton  key={idx} onPress={()=>selectedQuiz(quiz)}>
            {quiz?.name}
</CustomButton>
             )
        }
    </View>

</Background>
  )
}

export default QuizzesScreen

const styles = StyleSheet.create({
    container:{
        flex : 1 , 
        justifyContent:"center",
        alignContent:"center",
       
    }
})