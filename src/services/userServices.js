import axios from "axios"
//ref req to controller
async function resLogin(email, password) {
    return await axios.post('http://localhost:3001/api/check-user-login', {
        email: email,
        password: password
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
    console.log(idUser)
    console.log(('http://localhost:3001/api/detail-user/' + idUser).toString())
    return await axios.get('http://localhost:3001/api/detail-user/' + idUser)
}
async function reFreshToken() {
    return await axios.get('http://localhost:3001/api/reFresh-token',
        {
            Cookie: 'cookie1=reAccessToken;'
        })
}
export default resLogin
export { resSignup, detailUser, reFreshToken }