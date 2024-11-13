import { EventEmitter } from "../utils/eventemitter";
import { base_url } from "../config/base_url";
class ApiError {
  constructor(message, errorCode = 0) {
    this.message = message;
    this.errorCode = errorCode;
    this.errors = {};
  }
}

class MoodleApiClient {
  constructor() {
    this.onError = new EventEmitter();
  }

  async sendRequest(relativeUrl, params = {}, wstoken, method = "POST") {
    let url = `${base_url}/webservice/rest/server.php?wstoken=${wstoken}&wsfunction=${relativeUrl}&moodlewsrestformat=json`;

    let queryString = Object.keys(params)
      .filter((key) => key !== "data")
      .map((key) => {
        if (Array.isArray(params[key])) {
          // if the value is an array, format it as courseids[0], courseids[1], etc.
          return params[key]
            .map(
              (val, index) =>
                `${encodeURIComponent(key)}[${index}]=${encodeURIComponent(
                  val
                )}`
            )
            .join("&");
        } else {
          return `${encodeURIComponent(key)}=${encodeURIComponent(
            params[key]
          )}`;
        }
      })
      .join("&");
    if (params.data && Array.isArray(params.data)) {
      const dataString = params.data
        .map((val, index) =>
          Object.keys(val)
            .map(
              (nestedKey) =>
                `data[${index}][${encodeURIComponent(
                  nestedKey
                )}]=${encodeURIComponent(val[nestedKey])}`
            )
            .join("&")
        )
        .join("&");

      queryString += `&${dataString}`;
    }

    url += `&${queryString}`;

    console.log("url", url);

    const options = {
      method: method,
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-cache",
      },
    };

    // if (method === "POST") {
    //   options.body = JSON.stringify(params);
    // }

    try {
      const response = await fetch(url, options);

      if (!response.ok) {
        let err = new ApiError(response.statusText, response.status);
        if (response.status === 422) {
          try {
            const validationErrors = await response.json();
            err.errors = validationErrors;
          } catch {}
        }
        this.onError.fire(err);
        throw err;
      }
      console.log("Response Status:", response.status);
      return await response.json();
    } catch (e) {
      const err = new ApiError("Network error");
      this.onError.fire(err);
      throw err;
    }
  }
  // TO DO  move login to separate api file [login , signup] in User.js
}

export const moodleClient = new MoodleApiClient();
