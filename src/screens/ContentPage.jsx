// ContentPage.jsx
import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ActivityIndicator, ScrollView } from 'react-native';

import { useTranslation } from 'react-i18next';
import Background from '../constants/Background';
import useAuthStore from '../store/authStore';
import { getEnroledUserCourses } from '../api/Courses';
import { base_url } from '../config/base_url';
import Text from '../constants/CustomText';
import { GetCoursePages, postDisplayedPage } from '../api/Pages';

// Utility function to strip HTML tags
const stripHtmlTags = (html) => {
  return html.replace(/<\/?[^>]+(>|$)/g, "");
};

const ContentPage = ({navigation}) => {
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState(null);
  const wstoken = useAuthStore.getState().wstoken;
  const userid = useAuthStore.getState().userid;

  useEffect(() => {
    const fetchData = async () => {
        try {
          setIsLoading(true);
          console.log(`the user id is : ${userid}`);
  
          const courseidResponse = await getEnroledUserCourses(userid, wstoken);
  
          if (Array.isArray(courseidResponse)) {
            const courseIds = courseidResponse.map(course => course.id);
            console.log('Course IDs:', courseIds[0].toString());
            console.log(`${base_url}/webservice/rest/server.php?wstoken=${wstoken}&wsfunction=mod_page_get_pages_by_courses&moodlewsrestformat=json&courseids[0]=${courseIds.toString()}`);
            const responseGetPage = await GetCoursePages(wstoken, courseIds[0].toString());
            console.log(`the response is : `);
            console.log(responseGetPage);

            if (responseGetPage && responseGetPage.pages && responseGetPage.pages.length > 0) {
              const pageContent = responseGetPage.pages[0].content;
              const pageid = responseGetPage.pages[0].id;
              const responseViewPage = await postDisplayedPage(wstoken, pageid.toString());
                console.log(`the response is : ${responseViewPage}`);

              const plainTextContent = stripHtmlTags(pageContent);
              setData(plainTextContent);
            }
          } else {
            console.log('courseidResponse is not a valid array');
          }

        } catch (error) {
          console.error('Error fetching data:', error);
        } finally {
          setIsLoading(false);
        }
      };
    fetchData();
  }, [userid, wstoken]); // إضافة userid و wstoken إلى مصفوفة التبعيات

  return (
    <Background>
 
      <View style={styles.layoutPage}>
        {isLoading ? (
          <ActivityIndicator size="large" color="#FFFFFF" />
        ) : (
          <ScrollView contentContainerStyle={styles.contentContainer}>
            {data && <Text style={styles.text}>{data}</Text>}
          </ScrollView>
        )}
      </View>
    </Background>
  );
};

const styles = StyleSheet.create({
  layoutPage: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  progressBarContainer: {
    alignItems: 'center',
    marginTop: 40,
  },
  activityIndicator: {
    color: 'white',
  },
  contentContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  text: {
    textAlign: 'center',
    color: 'white',
    fontSize: 20,
  },
});

export default ContentPage;