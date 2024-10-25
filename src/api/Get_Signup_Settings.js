import { base_url } from "../config/base_url";

export async function get_signup_settings() {
  try {
    const response = await fetch(
      `${base_url}/webservice/rest/server.php?wsfunction=auth_email_get_signup_settings&moodlewsrestformat=json`,
      {
        method: "GET",
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();

    if (data && data.settings) {
      console.log("Signup settings fetched successfully:", data.settings);
      return data.settings;
    } else {
      console.log("No signup settings available.");
      return null;
    }
  } catch (error) {
    console.error("Error fetching signup settings:", error);
    throw error;
  }
}
