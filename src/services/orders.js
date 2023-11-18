import axios from "axios"
import axiosToken from "./interceptor"
async function checkout(data) {
    return await axiosToken.post('/checkout', { data })
}
async function addCart(data) {
    return await axiosToken.post('/addcart', { data })
}
async function getcart() {
    return await axiosToken.get('/getcart')
}
export {
    checkout,
    addCart,
    getcart
}
