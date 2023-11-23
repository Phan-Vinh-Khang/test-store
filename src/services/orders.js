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
export {
    checkout,
    addCart,
    getcart
}
