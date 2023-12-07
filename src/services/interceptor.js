import axios from "axios"
import { reFreshToken } from "./userServices";
import { REACT_APP_API_SERVER, REACT_APP_API_SERVER_LOCAL } from "../urlServer";
const axiosToken = axios.create({
    baseURL: REACT_APP_API_SERVER
})
const axios2 = axios.create({
    baseURL: REACT_APP_API_SERVER
})
axiosToken.interceptors.request.use(
    async (config) => {
        const access_token = localStorage.getItem('access_token')
        config.headers.Authorization = `Bearer ${access_token}`;
        config.headers['Content-Type'] = 'application/json';
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
export {
    axiosToken,
    axios2
}