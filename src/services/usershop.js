import axios from "axios"
import axiosToken from "./interceptor"
async function createUserShop(data) {
    return await axiosToken.post('/create-user-shop', { data })
}
async function updateUserShop(id, data) {
    return await axiosToken.post(`/update-user-shop/${id}`, { data })
}
async function deleteUserShop(id) {
    return await axiosToken.post('/delete-user-shop' + id)
}
async function getShopByProduct(id) {
    return await axios.get(`http://localhost:3001/api/get-shop-by-product/${id}`)
}
export {
    createUserShop,
    updateUserShop,
    deleteUserShop,
    getShopByProduct
}