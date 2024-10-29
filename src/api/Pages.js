import { moodlePageInstance } from "./Client";

export async function GetCoursePages(wstoken, CourseId) {
    const params = {
    };
    const data = await moodlePageInstance.sendRequest(
      "mod_page_get_pages_by_courses",
      CourseId,
      params,
      wstoken,
      "GET"
    );
    return data;
  }
  export async function postDisplayedPage(wstoken, PageId) {
    const params = {
    };
    const data = await moodlePageInstance.sendRequest(
      "mod_page_view_page",
      PageId,
      params,
      wstoken,
      "POST",
      "pageid"
    );
    return data;
  }