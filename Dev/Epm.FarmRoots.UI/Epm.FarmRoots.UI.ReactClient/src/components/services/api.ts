import axios from 'axios';

const api = axios.create({
  baseURL: 'https://localhost:7116/api',
});

const API_BASE_URL = 'https://localhost:9002/api';
const PRODUCT_API_URL = 'https://localhost:7189/api';

export { API_BASE_URL, PRODUCT_API_URL };

export default api;