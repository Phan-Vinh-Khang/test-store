import axios from "axios"
import axiosToken from "./interceptor"
//ref req to controller
async function resLogin(email, password) {
    return await axios.post('https://shopserver-iv0u.onrender.com/api/check-user-login', {
        email: email,
        password: password
    }, {
        withCredentials: true
    })
}
async function resSignup(username, email, password, confirmPassword, address) {
    return await axios.post('https://shopserver-iv0u.onrender.com/api/create-user', {
        name: username,
        email: email,
        password: password,
        confirmPassword: confirmPassword,
        address: address
    })
}
async function detailUser(idUser) {
    return await axios.get('https://shopserver-iv0u.onrender.com/api/detail-user/' + idUser)
}
async function AuthenticationUser() {
    return await axiosToken.get('/authentication-user')
}
async function Logout() {
    return await axios.get('https://shopserver-iv0u.onrender.com/api/logout-user', { withCredentials: true })
}
async function allUser() {
    return await axios.get('https://shopserver-iv0u.onrender.com/api/all-user')
}
async function updateUser(id, data) {
    return await axiosToken.put(`/update-user/ ${id}`, { data })
}
async function uploadAvatar(file, filename) {
    let formData = new FormData();
    formData.append('image', file, filename)
    return await axios.post('https://shopserver-iv0u.onrender.com/api/uploadAvatar/', formData)
}
async function reFreshToken() {
    return await axios.get('https://shopserver-iv0u.onrender.com/api/reFresh-token', {
        withCredentials: true
    })
}
export default resLogin
export {
    resSignup,
    detailUser,
    AuthenticationUser,
    Logout,
    allUser,
    updateUser,
    reFreshToken,
    uploadAvatar
}