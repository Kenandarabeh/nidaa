import {StyleSheet, View, ActivityIndicator} from 'react-native'
import React, {useEffect, useState} from 'react'
import useAuthStore from '../store/authStore'
//custom components
import Background from '../constants/Background'
// Fetching apis
import {startLessonAttempt} from '../api/Lesson'
// helper
import {fetchCourseByField, fetchCourseContent} from '../api/Courses'
const OnBoardingScreen = ({navigation}) => {
  const wstoken = useAuthStore.getState().wstoken
  const [isLoading, setIsLoading] = useState(true)
  useEffect(() => {
    const loadData = async () => {
      const course = await fetchCourseByField(wstoken)
      const fetchedLessons = await fetchCourseContent(course.id, wstoken)
      navigation.navigate('LessonPageScreen', {
        lessonid: fetchedLessons[0].id,
        pageid: 2,
      })
      await startLessonAttempt(1, wstoken)
    }

    loadData()
  }, [wstoken])
  return (
    <Background>
      <View style={{flex: 1, justifyContent: 'center'}}>
        <ActivityIndicator size='large' color='white' />
      </View>
    </Background>
  )
}
export default OnBoardingScreen
