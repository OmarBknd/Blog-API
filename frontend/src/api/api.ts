import axios from 'axios'
const apiUrL = import.meta.env.VITE_API_URL;
const api = axios.create({
    baseURL: apiUrL,
    headers: {
        'Content-Type': 'application/json'
    }
});

export default api