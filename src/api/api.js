import axios from 'axios'

export const api = axios.create({
    baseURL: 'http://localhost:3000/api/',
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
    },
})

export default api;