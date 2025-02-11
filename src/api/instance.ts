import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://api-server/3000',
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true,
});

export default instance;
