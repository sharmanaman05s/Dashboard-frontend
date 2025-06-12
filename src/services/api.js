import axios from 'axios';

const baseURL = process.env.NODE_ENV === 'production'
  ? process.env.REACT_APP_API_URL
  : 'http://localhost:5001/api';

const api = axios.create({
  baseURL,
});
 
export default api; 