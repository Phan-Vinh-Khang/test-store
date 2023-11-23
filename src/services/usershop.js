import axios from "axios"
import axiosToken from "./interceptor"
import { axios2 } from './interceptor'

async function createUserShop(data) {
    return await axiosToken.post('api/create-user-shop', { data })
}
async function updateUserShop(id, data) {
    return await axiosToken.post(`api/update-user-shop/${id}`, { data })
}
async function deleteUserShop(id) {
    return await axiosToken.post('api/delete-user-shop' + id)
}
async function getShopByProduct(id) {
    return await axios2.get(`api/get-shop-by-product/${id}`)
}
export {
    createUserShop,
    updateUserShop,
    deleteUserShop,
    getShopByProduct
}