import axios from 'axios';
import { VITE_API_BASE_URL } from '@/config/env';

export const apiClient = axios.create({
  baseURL: VITE_API_BASE_URL,
  headers: { 'Content-Type': 'application/json' },
});