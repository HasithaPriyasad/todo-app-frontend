import axios from 'axios';
import { VITE_REACT_APP_API_BASE_URL } from '../constants/envConstants';

export const api = axios.create({
  baseURL: VITE_REACT_APP_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});
