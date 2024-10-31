import { StyleSheet, Text, View, ActivityIndicator, Button } from 'react-native';
import React, { useEffect, useState } from 'react';
import useAuthStore from '../store/authStore';
//custom components
import Background from '../constants/Background';
import LessonPageScreen from './LessonPageScreen';
// Fetching apis
import { getLessonsByCourses, getLessonPageData, getLessonPages, startLessonAttempt, finishLessonAttempt } from '../api/Lesson';
// helper
import extractScore from '../utils/helpers/extractScore';
import { fetchCourseByField, fetchCourseContent } from '../api/Courses';




const OnBoardingScreen = ({navigation}) => {
  const wstoken = useAuthStore.getState().wstoken;
  const [lessons, setLessons] = useState([]);
  const [lessonPages, setLessonPages] = useState([]);
  const [nextPageId, setNextPageId] = useState(55); //first page id 
  const [isLoading, setIsLoading] = useState(true);

  useEffect( () => {
    const loadData = async () => {
      try {
        const course  = await fetchCourseByField(wstoken)



        const fetchedLessons = await  fetchCourseContent(course.id, wstoken)
   
        // const fetchedLessons = await getLessonsByCourses([course.id], wstoken); // asuming course id:2
        setLessons(fetchedLessons);
        navigation.navigate('LessonPageScreen', {
          lessonid:fetchedLessons[0].id,
          pageid:2,
        });
        const fetchedLessonPages = await getLessonPages(fetchedLessons[0]?.id, wstoken);
        setLessonPages(fetchedLessonPages);

      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };
 
    loadData();
  }, [wstoken,nextPageId],);

  useEffect(()=>{

    const startNewAttempt=async ()=>{
      await startLessonAttempt(1,wstoken)
    };
  startNewAttempt();
  },[])

  return (
    <Background>
 <ActivityIndicator size="large" color="white" />
    </Background>
   
  );
};
const styles = StyleSheet.create({
  container:{
    flex:1,
    justifyContent:"center",
  }
});
export default OnBoardingScreen;


  // const next = async (nextPageId) => {
  //   //pageid = -9 means the onboarding ends
  //   if(nextPageId===-9){
  //     const attempt_data = await finishLessonAttempt(1,wstoken)
  //     const score  = extractScore(attempt_data)
  //     console.log("score before navigation ",score);
  //     navigation.navigate('OnBoardingSummary', {
  //       score: score, // pass score as pram
  //     });
  //   }
  //    else {
  //     setNextPageId(nextPageId);
  //    }
  // };

 