import { moodleClient } from "./Client";
export async function getLessonsByCourses(courseIds, wstoken) {
  const params = { courseids: courseIds };
  const data = await moodleClient.sendRequest(
    "mod_lesson_get_lessons_by_courses",
    params,
    wstoken,
    "POST"
  );
  return data.lessons;
}
export async function getLessonDetails(lessonId, wstoken) {
  const params = { lessonid: lessonId };
  const data = await moodleClient.sendRequest(
    "mod_lesson_get_lesson",
    params,
    wstoken,
    "POST"
  );
  return data.lesson;
}

export async function startLessonAttempt(lessonId, wstoken) {
  const params = { lessonid: lessonId };
  const data = await moodleClient.sendRequest(
    "mod_lesson_launch_attempt",
    params,
    wstoken,
    "POST"
  );
  return data;
}

export async function getLessonPageData(lessonId, pageId, wstoken) {
  const params = { lessonid: lessonId, pageid: pageId };
  const data = await moodleClient.sendRequest(
    "local_get_lesson_contents",
    params,
    wstoken,
    "POST"
  );
  return data[0];
}

export async function getLessonQuestions(lessonId, attemptId, wstoken) {
  const params = { lessonid: lessonId, attemptid: attemptId };
  const data = await moodleClient.sendRequest(
    "mod_lesson_get_questions_attempts",
    params,
    wstoken,
    "POST"
  );
  return data;
}

export async function submitLessonAnswer(
  sesskey,
  lessonId,
  pageId,
  answerId,
  wstoken
) {
  const params = {
    lessonid: lessonId,
    pageid: pageId,
    data: [
      {
        name: "sesskey",
        value: sesskey,
      },
      {
        name: "_qf__lesson_display_answer_form_multichoice_singleanswer",
        value: "1",
      },
      {
        name: "answerid",
        value: answerId,
      },
    ],
    // value : id
  };

  //https://deepsleepb.intelgx.com/webservice/rest/server.php?wstoken=eafdb482b43eb0a21d68be36f3cec5de&wsfunction=mod_lesson_process_page&moodlewsrestformat=json&lessonid=1&pageid=2&data[0][name]=sesskey&data[0][value]=Y9DY80ETus&data[1][name]=_qf__lesson_display_answer_form_multichoice_singleanswer&data[1][value]=1&data[2][name]=answerid&data[2][value]=4
  const data = await moodleClient.sendRequest(
    "mod_lesson_process_page",
    params,
    wstoken,
    "POST"
  );
  return data;
}

export async function finishLessonAttempt(lessonId, wstoken) {
  const params = { lessonid: lessonId };
  const data = await moodleClient.sendRequest(
    "mod_lesson_finish_attempt",
    params,
    wstoken,
    "POST"
  );
  return data;
}

export async function getUserLessonGrade(lessonId, wstoken) {
  const params = { lessonid: lessonId };
  const data = await moodleClient.sendRequest(
    "mod_lesson_get_user_grade",
    params,
    wstoken,
    "POST"
  );
  return data;
}

export async function getLessonPages(lessonId, wstoken) {
  const params = { lessonid: lessonId };
  const data = await moodleClient.sendRequest(
    "mod_lesson_get_pages",
    params,
    wstoken,
    "POST"
  );
  return data.pages;
}

export async function getLessonPossibleJumps(lessonId, wstoken) {
  const params = { lessonid: lessonId };

  // Call the Moodle API to retrieve possible jumps
  const data = await moodleClient.sendRequest(
    "mod_lesson_get_pages_possible_jumps",
    params,
    wstoken,
    "POST"
  );
  return data;
}
// get content page =>https://deepsleepb.intelgx.com//webservice/rest/server.php?wstoken=346c489a3f79960b550b37bc1ff879c5&wsfunction=local_get_lesson_contents&moodlewsrestformat=json&lessonid=1&pageid=3

// get slots => https://deepsleepb.intelgx.com/webservice/rest/server.php?wstoken=346c489a3f79960b550b37bc1ff879c5&wsfunction=local_get_schedules_by_courseid&moodlewsrestformat=json&courseid=4


// book to slot by id => https://deepsleepb.intelgx.com/webservice/rest/server.php?wstoken=346c489a3f79960b550b37bc1ff879c5&wsfunction=local_scheduler_book_by_slotid&moodlewsrestformat=json&slotid=70


// cancel book slot by slot id =>https://deepsleepb.intelgx.com/webservice/rest/server.php?wstoken=346c489a3f79960b550b37bc1ff879c5&wsfunction=local_scheduler_cancel_booking&moodlewsrestformat=json&slotid=70