import axios from "axios";
import API_PORT from "../../../../apiPort";
export const LOGIN_URL = `${API_PORT}/users/login`;
export const REGISTER_URL = `${API_PORT}/users`;
export const REQUEST_PASSWORD_URL = "api/auth/forgot-password";
export const EDIT_USER_URL = `${API_PORT}/users/me`;
export const ME_URL = `${API_PORT}/users/me`;
export const LOG_OUT_URL = `${API_PORT}/users/logout`;
export const LOG_OUT_ALL_URL = `${API_PORT}/users/logoutAll`;
export const LOG_OUT_ALLLETME_URL = `${API_PORT}/users/logoutAllLetme`;




export function login(email, password) {
  return axios.post(LOGIN_URL, { email, password });
}

export function register(email, firstname, lastname ,role ,password) {
  return axios.post(REGISTER_URL, { email, firstname, lastname ,role , password });
}

export function requestPassword(email) {
  return axios.post(REQUEST_PASSWORD_URL, { email });
}

export function getUserByToken() {
  // Authorization head should be fulfilled in interceptor.
  return axios.get(ME_URL,{});
}
export function updateUser(updates){
  return axios.patch(EDIT_USER_URL, {updates});
}; 

export function logout(user) {
  return axios.post(LOG_OUT_URL, {});
};
export function logoutAll() {
  return axios.post(LOG_OUT_ALL_URL, { });
};
export function logoutAllletme() {
  return axios.post(LOG_OUT_ALLLETME_URL, { });
};