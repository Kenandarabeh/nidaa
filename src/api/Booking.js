// get slots => https://DeepSleepb.intelgx.com/webservice/rest/server.php?wstoken=346c489a3f79960b550b37bc1ff879c5&wsfunction=local_get_schedules_by_courseid&moodlewsrestformat=json&courseid=4


// book to slot by id => https://DeepSleepb.intelgx.com/webservice/rest/server.php?wstoken=346c489a3f79960b550b37bc1ff879c5&wsfunction=local_scheduler_book_by_slotid&moodlewsrestformat=json&slotid=70


// cancel book slot by slot id =>https://DeepSleepb.intelgx.com/webservice/rest/server.php?wstoken=346c489a3f79960b550b37bc1ff879c5&wsfunction=local_scheduler_cancel_booking&moodlewsrestformat=json&slotid=70





import { moodleClient } from "./Client";
export async function getSchedulesByCourse(courseId, wstoken) {
  const params = { courseid: courseId};
  const data = await moodleClient.sendRequest(
    "local_get_schedules_by_courseid",
    params,
    wstoken,
    "POST"
  );
  return data;
}

export async function createBooking(slotid, wstoken) {
    const params = { slotid: slotid };
    const data = await moodleClient.sendRequest(
      "local_scheduler_book_by_slotid",
      params,
      wstoken,
      "POST"
    );
    return data;
  }
  

  export async function cancelBooking(slotid, wstoken) {
    const params = { slotid: slotid };
    const data = await moodleClient.sendRequest(
      "local_scheduler_cancel_booking",
      params,
      wstoken,
      "POST"
    );
    return data;
  }
  
