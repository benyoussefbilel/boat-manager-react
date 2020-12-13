import axios from 'axios';
import API_PORT from '../../apiPort';
export function getAvatar(id) {
    return axios.get(`${API_PORT}/users/${id}/avatar`)
  }