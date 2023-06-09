import axios from "axios"
//ref req to controller
async function resLogin(email, password) {
    return await axios.post('http://localhost:3001/api/check-user-login', {
        email: email,
        password: password
    }, {
        withCredentials: true
    })
}
async function resSignup(username, email, password, confirmPassword, address) {
    return await axios.post('http://localhost:3001/api/create-user', {
        name: username,
        email: email,
        password: password,
        confirmPassword: confirmPassword,
        address: address
    })
}
async function detailUser(idUser) {
    return await axios.get('http://localhost:3001/api/detail-user/' + idUser)
}
async function AuthenticationUser(access_token) {
    return await axios.post('http://localhost:3001/api/authentication-user', { access_token: access_token })
}
async function Logout(access_token) {
    return await axios.get('http://localhost:3001/api/logout-user', { withCredentials: true })
}
async function reFreshToken() {
    return await axios.get('http://localhost:3001/api/reFresh-token', {
        withCredentials: true
    })
}
export default resLogin
export { resSignup, detailUser, AuthenticationUser, Logout, reFreshToken }