import axios from "axios"
import axiosToken from "./interceptor"
import { axios2 } from './interceptor'

//ref req to controller
async function resLogin(email, password) {
    return await axios2.post('api/check-user-login', {
        email: email,
        password: password
    }, {
        withCredentials: true
    })
}
async function resSignup(username, email, password, confirmPassword, address) {
    return await axios2.post('api/create-user', {
        name: username,
        email: email,
        password: password,
        confirmPassword: confirmPassword,
        address: address
    })
}
async function detailUser(idUser) {
    return await axios2.get('api/detail-user/' + idUser)
}
async function AuthenticationUser() {
    return await axiosToken.get('api/authentication-user')
}
async function Logout() {
    return await axios2.get('api/logout-user', { withCredentials: true })
}
async function allUser() {
    return await axios2.get('api/all-user')
}
async function updateUser(id, data) {
    return await axiosToken.put(`api/update-user/ ${id}`, { data })
}
async function uploadAvatar(file, filename) {
    let formData = new FormData();
    formData.append('image', file, filename)
    return await axios2.post('api/uploadAvatar/', formData)
}
async function reFreshToken() {
    return await axios2.get('api/reFresh-token', {
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