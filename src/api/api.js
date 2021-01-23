import axios from 'axios';

import dotenv from 'dotenv';

dotenv.config();

export const api = axios.create({
    baseURL: `${process.env.PROXY}/api`,
    headers: {
        'Content-Type': 'application/json'
    },
})

export default api;