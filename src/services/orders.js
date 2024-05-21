import axios from "axios"
import axiosToken from "./interceptor"
import { axios2 } from './interceptor'

async function checkout(data) {
    return await axiosToken.post('api/checkout', { data })
}
async function addCart(data) {
    return await axiosToken.post('api/addcart', { data })
}
async function getcart() {
    return await axiosToken.get('api/getcart')
}
async function getorder() {
    return await axiosToken.get('api/getorder')
}
async function deleteCartAPI(listId) {
    return await axiosToken.post('api/deletecart', { listId })
}
export {
    checkout,
    addCart,
    getcart,
    getorder,
    deleteCartAPI
}
