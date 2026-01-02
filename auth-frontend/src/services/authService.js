import axios from "axios";

const API_BASE_URL = "http://localhost:8080/auth";

const login = (userId, password) => {
  return axios.post(`${API_BASE_URL}/login`, {
    userId,
    password
  });
};

const register = (data) => {
  return axios.post(`${API_BASE_URL}/register`, data);
};

const forgotPassword = (data) => {
  return axios.post(`${API_BASE_URL}/forgot-password/show`, data);
};

const getForgotPasswordQuestions = (userId) => {
  return axios.get(`${API_BASE_URL}/forgot-password/questions/${userId}`);
};

const changePassword = (data) => {
  return axios.post(`${API_BASE_URL}/change-password`, data);
};

export default {
  login,
  register,
  forgotPassword,
  getForgotPasswordQuestions,
  changePassword
};
