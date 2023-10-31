import axios from "axios"
import axiosToken from "./interceptor"
async function checkout(data) {
    return await axiosToken.post('/checkout', { data })
}
export {
    checkout
}
