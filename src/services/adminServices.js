import axios from "axios"
import axiosToken from "./interceptor"
import { axios2 } from './interceptor'
//ref req to controller
async function createUserAdmin(data) {
    return await axiosToken.post('api/create-user-admin', { data })
}
async function deleteUser(id) {
    return await axiosToken.get('api/delete-user/' + id)
}
async function deleteUserMany(listId) {
    return await axiosToken.post('api/delete-user-many/', { listId })
}
async function allRole() {
    return await axios2.get('api/all-role')
}
export default createUserAdmin
export { allRole, deleteUser, deleteUserMany }