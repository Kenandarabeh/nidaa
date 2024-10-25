import { moodleClient } from "./Client";
export async function fetchFeebackQuestions(wstoken) {
  const params = {
    feedbackid: 1,
  };
  const data = await moodleClient.sendRequest(
    "mod_feedback_get_items",
    params,
    wstoken,
    "GET"
  );
  return data.items;
}

//https://DeepSleepb.intelgx.com/webservice/rest/server.php?wstoken=346c489a3f79960b550b37bc1ff879c5&moodlewsrestformat=json&wsfunction=mod_feedback_get_items&feedbackid=1

// https://DeepSleepb.intelgx.com/webservice/rest/server.php?wstoken=346c489a3f79960b550b37bc1ff879c5&moodlewsrestformat=json&wsfunction=mod_feedback_get_items&courseid=2&feedbackid=1

export async function fetchFeebacks(wstoken, courseid) {
  const params = {
    courseid: courseid,
  };
  const data = await moodleClient.sendRequest(
    "mod_feedback_get_feedbacks_by_courses",
    params,
    wstoken,
    "GET"
  );
  return data;
}

//mod_feedback_get_feedbacks_by_courses
///mod_feedback_get_unfinished_responses
//mod_feedback 	mod_feedback_launch_feedback 	3.3 	Starts or continues a feedback submission.
