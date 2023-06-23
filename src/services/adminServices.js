import axios from "axios"
//ref req to controller
async function createUserAdmin({ name, email, password, confirmPassword, avatar, adress, roleid }, access_token) {
    return await axios.post('http://localhost:3001/api/create-user-admin', {
        name,
        email,
        password,
        confirmPassword,
        avatar,
        adress,
        roleid,
        access_token
    }
    )
}
async function allRole() {
    return await axios.get('http://localhost:3001/api/all-role')
}
export default createUserAdmin
export { allRole }