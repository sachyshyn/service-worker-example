import { API_URL } from '@shared/config';
import axios from 'axios';

export const httpService = axios.create({
  baseURL: API_URL
});
