import axios from "axios"
import checkToken from "./checkToken"
//ref req to controller
async function createUserAdmin({ data, access_token }) {
    access_token = await checkToken(access_token)
    return await axios.post('http://localhost:3001/api/create-user-admin',
        {
            ...data
        }, {
        headers: {
            Authorization: `Bearer ${access_token}`
        }
    }
    )
}
async function deleteUser({ id, access_token }) {
    access_token = await checkToken(access_token)
    return await axios.get('http://localhost:3001/api/delete-user/' + id,
        {
            headers: {
                Authorization: `Bearer ${access_token}`
            }
        })
}
async function deleteUserMany({ listId, access_token }) {
    access_token = await checkToken(access_token)
    return await axios.post('http://localhost:3001/api/delete-user-many/',
        {
            listId,
        }, {
        headers: {
            Authorization: `Bearer ${access_token}`
        }
    }
    )
}
async function allRole() {
    return await axios.get('http://localhost:3001/api/all-role')
}
export default createUserAdmin
export { allRole, deleteUser, deleteUserMany }