import axios from "axios"
import { reFreshToken } from "./userServices";
import { REACT_APP_API_SERVER_URL } from "../urlServer";
const axiosToken = axios.create({
    baseURL: REACT_APP_API_SERVER_URL
})
const axios2 = axios.create({
    baseURL: REACT_APP_API_SERVER_URL
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

let isRefreshing = false;
let requestQueue = [];

const processQueue = (error) => {
    requestQueue.forEach(item => {
        if (!error) item.resolve();
        else item.reject(error);
    });
    requestQueue = [];
};
axiosToken.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error) => {
        if (error.response.status === 401) {
            if (!isRefreshing) {
                isRefreshing = true;
                try {
                    const newToken = (await reFreshToken()).data; // Call API to refresh the access token
                    localStorage.setItem('access_token', newToken);
                    axiosToken.defaults.headers.common['Authorization'] = 'Bearer ' + newToken;
                    error.config.headers['Authorization'] = 'Bearer ' + newToken;
                    let a = processQueue(null);
                    //đến khi resolve() hoặc reject() dc call thì function Promise() mới kết thúc quá trình thực thi và return về data và sau đó sẽ thực thi data.then() hoặc data.catch()
                    //lúc resolve() hoặc reject() dc call thì đã có newToken rồi
                    //mỗi lần call function sẽ như new 1 function mới với cùng 1 define chứ ko thực thi trên cùng 1 function
                    return axiosToken(error.config);
                } catch (err) {
                    processQueue(err);
                    return Promise.reject(err);
                } finally {
                    isRefreshing = false;
                }
            } else {
                let a;
                return new Promise((resolve, reject) => {
                    requestQueue.push({ resolve, reject });
                    //phải call 1 trong 2 function resolve hoặc reject thì function Promise() mới kết thúc quá trình thực thi và return về data
                }).then(() => {//tham số của callback trong function then() sẽ reference vào đối số resolve() return
                    // error.config.headers['Authorization'] = 'Bearer ' + token;
                    return axiosToken(error.config);
                }).catch(err => {
                    return Promise.reject(err);
                });
            }
        }
        return Promise.reject(error);
    }
);

// let isRefreshing = false;
// axiosToken.interceptors.response.use(
//     (response) => {
//         return response;
//     },
//     async (error) => {
//         const originalRequest = error.config;
//         if (error.response.status === 401) { //access token het han hoac ko hop le
//             try {
//                 const newToken = (await reFreshToken()).data; // Hàm gọi API để lấy access token mới
//                 localStorage.setItem('access_token', newToken)
//                 return axiosToken(originalRequest);
//             }
//             catch (e) {
//                 return Promise.reject(error);
//             }
//         }

//         return Promise.reject(error);
//     }
// );
export default axiosToken
export {
    axiosToken,
    axios2
}