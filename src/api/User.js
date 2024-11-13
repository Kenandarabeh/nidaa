import { base_url } from "../config/base_url";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { api_token } from "../config/api_token";
import { moodleClient } from "./Client";

export async function user_login(username, password) {
  try {
    const response = await fetch(
      `${base_url}/login/token.php?service=moodle_mobile_app`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: `username=${encodeURIComponent(username)}&password=${encodeURIComponent(password)}`,
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    if (data.token) {
      let moodleToken = data.token;
      await AsyncStorage.setItem(api_token, moodleToken);
      return moodleToken;
    } else {
      alert("Login failed: " + (data.error || "Unknown error"));
    }
  } catch (error) {
    console.error("Error:", error);
    alert("Login error: " + error.message);
  }
}

export async function user_signup(params) {
  const token = "3fa85b672fbf875ed79e24bea392e798";
  const data = await moodleClient.sendRequest(
    "auth_email_signup_user",
    params,
    token,
    "POST"
  );
  return data;
}

export async function getUserProfile(wstoken) {
  const params = {};
  const data = await moodleClient.sendRequest(
    "core_webservice_get_site_info",
    params,
    wstoken,
    "POST"
  );
  return data;
}