import axios from "axios"
import axiosToken from "./interceptor"
import { axios2 } from './interceptor'

async function allProduct(search = '', page = 1) {
    return await axios2.get(`api/all-product/?search=${search}&page=${page}`)
}
async function allTypeProd() {
    return await axios2.get('api/all-type-product')

}
async function createProd(data) {
    return await axiosToken.post('api/create-product', { data })
}
async function uploadImgProd(file, filename) {
    let formData = new FormData();
    formData.append('image', file, filename)
    return await axios2.post('api/uploadImgProd',
        formData
    )

}
async function updateProd(id, data) {
    return await axiosToken.put(`api/update-product/${id}`, data)
}
async function deleteProd(id) {
    return await axiosToken.get(`api/delete-product/${id}`)
}
async function deleteProdMany(listId) {
    return await axiosToken.post('api/delete-product-many/', { listId })
}
async function detailProduct(id) {
    return await axios2.get(`api/detail-product/${id}`)
}
export default allProduct
export {
    allProduct,
    allTypeProd,
    createProd,
    uploadImgProd,
    updateProd,
    deleteProd,
    deleteProdMany,
    detailProduct
}