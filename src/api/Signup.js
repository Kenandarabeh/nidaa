// To Do: Send User Info to proxy API
// Workflow
/* 
Send all required fields for core webservice core_user_create_users (username, password, email, firstname, lastname, address, country, etc.)
API handles user account creation using admin or any supervisor API token on the Moodle backend.
API returns private_token
*/

import { base_url } from "../config/base_url";
const wstoken = "2394a6a4e87fde82b7019d53716fec3e"; // for testing
export async function createUser(params) {
  const { username, password, firstname, lastname, email, city, country } =
    params;

  try {
    const response = await fetch(
      `${base_url}/webservice/rest/server.php/?service=auth_email&wsfunction=auth_email_signup_user&moodlewsrestformat=json`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(params),
      }
    );
    const responseText = await response.json();
    if (responseText.success) {
      alert("Success! Confirmation email sent to " + params.email);
    } else {
      alert(
        "Error: " + (responseText.warnings?.[0]?.message || "User not added.")
      );
    }
  } catch (error) {
    console.error("Error during signup:", error);
    alert("An error occurred during signup.");
  }
}
