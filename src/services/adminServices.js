import axios from "axios"
import checkToken from "./checkToken"
//ref req to controller
async function createUserAdmin({ data, access_token }) {
    const access_token2 = await checkToken(access_token)
    access_token = access_token2;
    return await axios.post('http://localhost:3001/api/create-user-admin',
        {
            ...data,
            access_token
        }
    )
}
async function deleteUser({ id, access_token, avatarFile }) {
    const access_token2 = await checkToken(access_token)
    return await axios.post('http://localhost:3001/api/delete-user/' + id, {
        access_token: access_token2
    }, {
        headers: {
            avatarFile: avatarFile
        }
    }
    )
}
async function deleteUserMany({ listId, access_token }) {
    const access_token2 = await checkToken(access_token)
    return await axios.post('http://localhost:3001/api/delete-user-many/', {
        listId,
        access_token: access_token2
    })
}
async function allRole() {
    return await axios.get('http://localhost:3001/api/all-role')
}
export default createUserAdmin
export { allRole, deleteUser, deleteUserMany }