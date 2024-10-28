import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';
import React, { useState } from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { submitLessonAnswer } from '../../api/Lesson';
import stripHtml from '../../utils/helpers/htmlStrip'; 
import useAuthStore from '../../store/authStore';
import { useTranslation } from 'react-i18next';
const Page = ({ lesson ,onAnswerSubmited}) => {
  const {t} = useTranslation();
  const [selectedAnswer, setSelectedAnswer] = useState();
  const wstoken = useAuthStore.getState().wstoken;
  const user_sesskey = useAuthStore.getState().sesskey;
  const selectAnswer = async (option) => {
      setSelectedAnswer(option.answerid);
    
    const { newpageid } = await submitLessonAnswer(
      user_sesskey,  //user session key grabed from authstore
      lesson.lessonid, // lesson id 
      lesson.id,  // page id 
      option.answerid, //answer id 
      wstoken, //webservice token
    );
    //find next page id 
    if(option.jumpto ===-1){
        onAnswerSubmited(newpageid+1)
    }else {
        onAnswerSubmited(option.jumpto)
    }
    
  };

  return (
    <View style={styles.container}>
 
  {lesson && (
        <>
          <Text style={styles.title}>{stripHtml(lesson.contents)}</Text>
          {lesson.answers.map((option, index) => (
           
                 <TouchableOpacity
                 key={index} 
             onPress={() => selectAnswer(option)}
             style={[
               styles.answerButton,
               selectedAnswer === option.answerid && styles.selectedButton
             ]}
           >
             <View style={styles.itemContent}  >
             {selectedAnswer === option.answerid && (
               <MaterialCommunityIcons
                 name="check-circle"
                 size={24}
                 color="white"
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

  );
};

const styles = StyleSheet.create({

  title: {
    fontSize: 20, 
    textAlign: 'center',
    color: 'white', 
    marginBottom: 20, 
    fontFamily:"Tajawal",
    lineHeight: 24, 

    textAlign: "justify",
    marginHorizontal:10,
    fontWeight:"600",
  },
  itemContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between', 
  },
  answerButton: {
    flexDirection: 'row', 
    alignItems: 'center', 
    padding: 16,
    marginVertical: 8,
    marginHorizontal:20,
    backgroundColor: '#003143',
    borderRadius: 25,
    borderWidth: 2,
    borderColor: 'transparent', 
  
  },
  selectedButton: {
    borderColor: 'white', 
  },
  answerText: {
    fontSize: 18,
    color: 'white',
    textAlign: 'center',
    fontFamily:"Tajawal",
    flex: 1, 
  },
  icon: {
    position: 'absolute', 
    right: 5, 
    top: '50%', 
    transform: [{ translateY: -12 }], 
  },
});

export default Page;
