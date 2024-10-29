import { StyleSheet, Text, View, ActivityIndicator, Button } from 'react-native';
import React, { useEffect, useState } from 'react';
import useAuthStore from '../store/authStore';
//custom components
import Background from '../constants/Background';
import Page from '../components/onboarding/Page';
// Fetching apis
import { getLessonsByCourses, getLessonPageData, getLessonPages, startLessonAttempt, finishLessonAttempt } from '../api/Lesson';
// helper
import extractScore from '../utils/helpers/extractScore';
const OnBoardingScreen = ({navigation}) => {
  const wstoken = useAuthStore.getState().wstoken;
  const [lessons, setLessons] = useState([]);
  const [lessonPages, setLessonPages] = useState([]);
  const [lessonData, setLessonData] = useState(null);
  const [nextPageId, setNextPageId] = useState(2); //first page id 
  const [isLoading, setIsLoading] = useState(true);

  useEffect( () => {
    const loadData = async () => {
      try {
        const fetchedLessons = await getLessonsByCourses([2], wstoken); // asuming course id:2
        setLessons(fetchedLessons);
        const fetchedLessonPages = await getLessonPages(fetchedLessons[0]?.id, wstoken);
        setLessonPages(fetchedLessonPages);
        await loadLessonData(fetchedLessons[0]?.id);

      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };
 
    loadData();
  }, [wstoken,nextPageId],);

  useEffect(()=>{
    console.log("starting an attempt");
    const startNewAttempt=async ()=>{
      await startLessonAttempt(1,wstoken)
    };
  startNewAttempt();
  },[])

  const loadLessonData = async (lessonId) => {
    setIsLoading(true);
    try {
      const data = await getLessonPageData(lessonId, nextPageId, wstoken);
      setLessonData(data);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const next = async (nextPageId) => {
    //pageid = -9 means the onboarding ends
    if(nextPageId===-9){
      const attempt_data = await finishLessonAttempt(1,wstoken)
      const score  = extractScore(attempt_data)
      navigation.navigate('onBoardingSummary', {
        score:score,
      });
    }
     else {
      setNextPageId(nextPageId);
     }
  };
  const lessonProgress = (nextPageId / (lessonPages.length - 1)) * 100;

  return (
    <Background>
    <View style={styles.container}>
      {isLoading ? (
        <ActivityIndicator size="large" color="white" />
      ) : (
        lessonPages.length > 0 && (
          <View>
            <Page lesson={lessonData} onAnswerSubmited={next} /> 
          </View>
        )
      )}
    </View>
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
