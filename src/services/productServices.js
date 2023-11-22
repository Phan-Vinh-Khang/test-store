import axios from "axios"
import axiosToken from "./interceptor"
async function allProduct(search = '', page = 1) {
    return await axios.get(`https://shopserver-iv0u.onrender.com/api/all-product/?search=${search}&page=${page}`)
}
async function allTypeProd() {
    return await axios.get('https://shopserver-iv0u.onrender.com/api/all-type-product')

}
async function createProd(data) {
    return await axiosToken.post('/create-product', { data })
}
async function uploadImgProd(file, filename) {
    let formData = new FormData();
    formData.append('image', file, filename)
    return await axios.post('https://shopserver-iv0u.onrender.com/api/uploadImgProd',
        formData
    )

}
async function updateProd(id, data) {
    return await axiosToken.put(`/update-product/${id}`, data)
}
async function deleteProd(id) {
    return await axiosToken.get(`/delete-product/${id}`)
}
async function deleteProdMany(listId) {
    return await axiosToken.post('/delete-product-many/', { listId })
}
async function detailProduct(id) {
    return await axios.get(`https://shopserver-iv0u.onrender.com/api/detail-product/${id}`)
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