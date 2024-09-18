import axios from 'axios';

const api = axios.create({
  baseURL: 'https://localhost:7116/api',
});


export const host = "https://localhost:7189/api";



// Define the endpoints
export const CATEGORY_API_URL = `${host}/Category`;
export const SUB_CATEGORY_API_URL = (categoryId) => `${CATEGORY_API_URL}/${categoryId}/subcategories`;
export const PRODUCT_API_URL = (subCategoryId) => `${host}/SubCategory/${subCategoryId}/customer-sub-products`;

export default api;