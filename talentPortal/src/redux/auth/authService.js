import axios from "axios";

const BACKEND_URL = import.meta.env.VITE_APP_BACKEND_URL;
export const API_URL = `${BACKEND_URL}/api/v1/talent/`;

export const validateEmail = (email) => {
  return email.match(
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  );
};

const register = async (userData) => {
  const response = await axios.post(API_URL + "register", userData);
  return response.data;
};

const sendAutomatedEmail = async (emailData) => {
  const response = await axios.post(API_URL + "sendAutomatedEmail", emailData);
  return response.data.message;
};

const authService = {
  register,
  sendAutomatedEmail,
};

export default authService;
