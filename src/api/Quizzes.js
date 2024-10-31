import {moodleClient} from './Client'

/* Questions */
export async function getQuizzesInCourse(courseId, wstoken) {
  const params = {
    courseids: [courseId],
  }
  const data = await moodleClient.sendRequest(
    'mod_quiz_get_quizzes_by_courses',
    params,
    wstoken,
    'GET',
  )
  return data.quizzes
}

export async function getQuizQuestions(attemptId, wstoken) {
  const params = {
    attemptid: attemptId,
    page: 0,
  }
  const data = await moodleClient.sendRequest('mod_quiz_get_attempt_data', params, wstoken, 'GET')
  return data.questions
}

/* ATTEMPT */
export async function quizStartAttempt(quizId, wstoken) {
  const params = {
    quizid: quizId,
    forcenew: 1,
  }
  console.log('params', params)
  const data = await moodleClient.sendRequest('mod_quiz_start_attempt', params, wstoken, 'POST')
  return data.attempt // get attempt id from here
}

export async function submitQuizAnswers(attemptId, wstoken) {
  const params = {
    attemptid: attemptId,
    data: {},
    finishattempt: 1,
    timeup: 0,
  }
  const data = await moodleClient.sendRequest('mod_quiz_process_attempt', params, wstoken, 'POST')
  console.log('data', data)
}
