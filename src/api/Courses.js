import { moodleClient } from "./Client";
export async function fetchCourses(wstoken) {
  const params = {};
  const data = await moodleClient.sendRequest(
    "core_course_get_courses",
    params,
    wstoken,
    "GET"
  );

  return data;
} 


export async function fetchCourseContent(courseId, wstoken) {
  const params = {
    courseid: courseId,
  };
  const data = await moodleClient.sendRequest(
    "core_course_get_contents",
    params,
    wstoken,
    "GET"
  );

  return data;
}

export async function getEnroledUserCourses(userid, wstoken) {
  const params = {
    userid: userid,
  };
  const data = await moodleClient.sendRequest(
    "core_enrol_get_users_courses",
    params,
    wstoken,
    "GET"
  );
  return data;
}



//https://DeepSleepb.intelgx.com/webservice/rest/server.php?wstoken=eafdb482b43eb0a21d68be36f3cec5de&moodlewsrestformat=json&wsfunction=core_enrol_get_users_courses&userid=6
