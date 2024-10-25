import { base_url } from "../config/base_url";
import { ApplicationSettings } from "@nativescript/core";
import { api_token } from "../config/api_token";
export async function user_login(username, password) {
  try {
    const response = await fetch(
      `${base_url}/login/token.php?service=moodle_mobile_app`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },

        body: `username=${encodeURIComponent(
          username
        )}&password=${encodeURIComponent(password)}`,
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    if (data.token) {
      let moodleToken = data.token;
      ApplicationSettings.setString(api_token, moodleToken);
      alert("Login successful");
    } else {
      alert("Login failed: " + (data.error || "Unknown error"));
    }
  } catch (error) {
    console.error("Error:", error);
    alert("Login error: " + error.message);
  }
}
