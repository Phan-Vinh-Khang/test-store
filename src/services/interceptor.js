import axios, { AxiosError } from "axios"
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
        if (!access_token) return Promise.reject('token is not exist');
        /*nếu Promise.reject() dc thực thi sẽ nó sẽ ko gửi API nữa và
        interceptor.response sẽ dc call và sẽ nhận dc Promise.reject('token is not exist') trong interceptor.response
        */
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

const processQueue = (error, newToken = null) => {
    requestQueue.forEach(item => {
        if (!error) item.resolve(newToken);
        else item.reject(error);
    });
    requestQueue = [];
};
axiosToken.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error) => {
        if (error.response?.status === 401) {
            if (!isRefreshing) {
                isRefreshing = true;
                try {
                    const newToken = (await reFreshToken()).data; // Call API to refresh the access token
                    localStorage.setItem('access_token', newToken);
                    axiosToken.defaults.headers.common['Authorization'] = 'Bearer ' + newToken;
                    error.config.headers['Authorization'] = 'Bearer ' + newToken;
                    let a = processQueue(null, newToken);
                    //đến khi resolve() hoặc reject() dc call thì function Promise() mới kết thúc quá trình thực thi và return về data và sau đó sẽ thực thi data.then() hoặc data.catch()
                    //lúc resolve() hoặc reject() dc call thì đã có newToken rồi
                    //mỗi lần call function sẽ như new 1 function mới với cùng 1 define chứ ko thực thi trên cùng 1 function
                    return axiosToken(error.config);
                } catch (err) {
                    /*
                    nếu token ở cookie hết hạn hoặc ko chính xác thì vẫn sẽ vào catch và 
                    call processQueue(err, null) function Promise dc return
                    nếu Promise() dc return ko error sẽ vào .then nếu error sẽ vào .catch
                    */
                    processQueue(err, null);
                    return Promise.reject(err);
                } finally {
                    isRefreshing = false;
                }
            } else {
                return new Promise((resolve, reject) => {
                    requestQueue.push({ resolve, reject });
                    //phải call 1 trong 2 function resolve hoặc reject thì function Promise() mới kết thúc quá trình thực thi và return về data
                    //khi call resolve hoặc reject ở bất cứ đâu thì nó function Promise() của nó cũng sẽ dc return
                    /*
                    có thể define function Promise() có 1 obj={} và define function resolve cũng có 1 obj2=obj1={}
                    và cả 2 đều reference vào cùng 1 obj,khi call resolve obj2 sẽ reference thêm hoac thay đổi data thì obj1 ở define function Promise
                    cũng thay đổi
                    */
                }).then((newToken) => {//tham số của callback trong function then() sẽ reference vào đối số resolve() return
                    error.config.headers['Authorization'] = 'Bearer ' + newToken;
                    return axiosToken(error.config);
                }).catch(err => {
                    return Promise.reject(err);
                });
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