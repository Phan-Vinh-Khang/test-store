import axios from "axios"
import axiosToken from "./interceptor"
//ref req to controller
async function createUserAdmin(data) {
    return await axiosToken.post('/create-user-admin', { data })
}
async function deleteUser(id) {
    return await axiosToken.get('/delete-user/' + id)
}
async function deleteUserMany(listId) {
    return await axiosToken.post('/delete-user-many/', { listId })
}
async function allRole() {
    return await axios.get('http://localhost:3306/api/all-role')
}
export default createUserAdmin
export { allRole, deleteUser, deleteUserMany }