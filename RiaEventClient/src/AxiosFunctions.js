import axios from "axios";

export function sendEmail(emails) {
  return axios.post("http://localhost:5000/send-email", emails);
}
