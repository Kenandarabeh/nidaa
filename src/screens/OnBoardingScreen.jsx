import { StyleSheet, Text, View, ActivityIndicator, Button } from 'react-native';
import React, { useEffect, useState } from 'react';
import useAuthStore from '../store/authStore';
//custom components
import Background from '../constants/Background';
import Page from '../components/onboarding/Page';
// Fetching apis
import { getLessonsByCourses, getLessonPageData, getLessonPages } from '../api/Lesson';

const OnBoardingScreen = () => {
  const wstoken = useAuthStore.getState().wstoken;
  const [lessons, setLessons] = useState([]);
  const [lessonPages, setLessonPages] = useState([]);
  const [lessonData, setLessonData] = useState(null);
  const [nextPageId, setNextPageId] = useState(2); //first page id 
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
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
    console.log("page id",nextPageId);
    if (nextPageId < lessonPages.length - 1) 
      setNextPageId(nextPageId);
      
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
