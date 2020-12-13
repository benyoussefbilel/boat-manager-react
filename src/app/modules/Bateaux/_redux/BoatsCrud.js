import axios from "axios";
import API_PORT from "../../../../apiPort";
export const BOATS_URL = `${API_PORT}/boats`;





export function getboats() {
  return axios.get(BOATS_URL, { });
};
export function getboatById(id){
  return axios.get(`${BOATS_URL}/${id}`, { });
};
