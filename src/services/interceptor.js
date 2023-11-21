import axios from "axios"
import { reFreshToken } from "./userServices";
const axiosToken = axios.create({
    baseURL: 'http://localhost:3306/api'
})
axiosToken.interceptors.request.use(
    async (config) => {
        const access_token = localStorage.getItem('access_token')
        config.headers.Authorization = `Bearer ${access_token}`;
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

axiosToken.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error) => {
        const originalRequest = error.config;
        if (error.response.status === 401) { //access token het han hoac ko hop le
            try {
                const newToken = (await reFreshToken()).data; // Hàm gọi API để lấy access token mới
                localStorage.setItem('access_token', newToken)
                return axiosToken(originalRequest);
            }
            catch (e) {
                return Promise.reject(error);
            }
        }
        return Promise.reject(error);
    }
);
export default axiosToken