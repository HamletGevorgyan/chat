import axios from 'axios';
import Account from './helpers/Account';

const { REACT_APP_REQUEST_URL } = process.env;

const api = axios.create({
  baseURL: REACT_APP_REQUEST_URL,
});

api.interceptors.request.use((config) => {
  const token = Account.getToken();
  if (token) {
    // eslint-disable-next-line no-param-reassign
    config.headers.authorization = `Bearer ${token}`;
  }
  return config;
}, (e) => Promise.reject(e));

api.interceptors.response.use((config) => config, (e) => {
  if (e.response.status === 401) {
    Account.deleteInfo();
    window.location.reload();
  }
  return Promise.reject(e);
});

class Api {
  static register(data) {
    return api.post('/users/register', data);
  }

  static login(data) {
    return api.post('/users/login', data);
  }

  static usersList(params = {}) {
    return api.get('/users/list', {
      params,
    });
  }

  static getProfile(params = {}) {
    return api.get('/users/profile', { params });
  }

  static getSingleUser(userId, params = {}) {
    return api.get(`/users/single/${userId}`, { params });
  }

  static sendMessage(data) {
    return api.post('messages/send', data);
  }

  static getMessagesList(friendId, params = {}) {
    return api.get(`messages/list/${friendId}`, {
      params,
    });
  }
}

export default Api;
