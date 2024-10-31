import {Text, View, TouchableOpacity, StyleSheet, ActivityIndicator} from 'react-native'
import React, {useEffect, useState} from 'react'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import {getLessonPageData, submitLessonAnswer, finishLessonAttempt} from '../api/Lesson'
import stripHtml from '../utils/helpers/htmlStrip'
import extractScore from '../utils/helpers/extractScore'
import useAuthStore from '../store/authStore'
import {useTranslation} from 'react-i18next'
import Background from '../constants/Background'
import {useNavigation} from '@react-navigation/native'

const LessonPageScreen = ({route}) => {
  const navigation = useNavigation()

  const {pageid} = route?.params
  const {lessonid} = route?.params

  const {t} = useTranslation()
  const [selectedAnswer, setSelectedAnswer] = useState()
  const [lessonPageData, setLessonPageData] = useState(null)
  const wstoken = useAuthStore.getState().wstoken
  const user_sesskey = useAuthStore.getState().sesskey
  useEffect(() => {
    const loadLessonPageData = async () => {
      const data = await getLessonPageData(lessonid, pageid, wstoken)
      setLessonPageData(data)
    }
    loadLessonPageData()
  }, [lessonid])

  const selectAnswer = async option => {
    setSelectedAnswer(option.answerid)
    await submitLessonAnswer(
      user_sesskey, //user session key grabed from authstore
      lessonid, // lesson id
      pageid, // page id
      option.answerid, //answer id
      wstoken, //webservice token
      lessonPageData.qtype,
      option.answerformat,
    )
    //find next page id
    if (option.jumpto === -1) {
      navigation.push('LessonPageScreen', {
        lessonid: lessonid,
        pageid: lessonPageData?.nextpageid,
      })
    } else if (option.jumpto === -9) {
      //pageid = -9 means the onboarding ends
      const attempt_data = await finishLessonAttempt(1, wstoken)
      const score = extractScore(attempt_data)
      navigation.navigate('OnBoardingSummary', {
        score: score, // pass score as pram
      })
    } else {
      navigation.push('LessonPageScreen', {
        pageid: option.jumpto,
        lessonid: lessonid,
      })
    }
  }

  return (
    <Background>
      <View style={styles.container}>
        {lessonPageData && (
          <>
            <Text style={styles.title}>{stripHtml(lessonPageData.contents)}</Text>
            {lessonPageData.answers.map((option, index) => (
              <TouchableOpacity
                key={option.answerid}
                onPress={() => selectAnswer(option)}
                style={[
                  styles.answerButton,
                  selectedAnswer === option.answerid && styles.selectedButton,
                ]}>
                <View style={styles.itemContent}>
                  {selectedAnswer === option.answerid && (
                    <MaterialCommunityIcons
                      name='check-circle'
                      size={24}
                      color='white'
                      style={styles.icon}
                    />
                  )}
                  <Text style={styles.answerText}>{t(option.answer)}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </>
        )}
      </View>
    </Background>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    textAlign: 'center',
    color: 'white',
    marginBottom: 20,
    fontFamily: 'Tajawal',
    lineHeight: 24,
    textAlign: 'right',
    fontWeight: '600',
    marginHorizontal: 10,
  },
  itemContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  answerButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    marginVertical: 8,
    marginHorizontal: 20,
    backgroundColor: '#003143',
    borderRadius: 25,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  selectedButton: {
    borderColor: 'white',
  },
  answerText: {
    fontSize: 18,
    color: 'white',
    textAlign: 'center',
    paddingTop: 3,
    fontFamily: 'Tajawal',
    flex: 1,
  },
  icon: {
    position: 'absolute',
    right: 5,
    top: '50%',
    transform: [{translateY: -12}],
  },
})

export default LessonPageScreen
