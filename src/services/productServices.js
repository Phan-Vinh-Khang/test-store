import axios from "axios"
import checkToken from "./checkToken"
async function allProduct() {
    return await axios.get('http://localhost:3001/api/all-product')
}
async function allTypeProd() {
    return await axios.get('http://localhost:3001/api/all-type-product')

}
async function createProd({ data, access_token }) {
    access_token = await checkToken(access_token)
    return await axios.post('http://localhost:3001/api/create-product',
        {
            data
        }, {
        headers: {
            Authorization: `Bearer ${access_token}`
        }
    }
    )

}
async function uploadImgProd(file, filename) {
    let formData = new FormData();
    formData.append('image', file, filename)
    return await axios.post('http://localhost:3001/api/uploadImgProd',
        formData
    )

}
async function updateProd(id, access_token, data) {
    access_token = await checkToken(access_token)
    return await axios.put(`http://localhost:3001/api/update-product/${id}`,
        data,
        {
            headers: {
                Authorization: `Bearer ${access_token}`
            }
        }
    )
}
async function deleteProd({ id, access_token }) {
    access_token = await checkToken(access_token)
    return await axios.get('http://localhost:3001/api/delete-product/' + id,
        {
            headers: {
                Authorization: `Bearer ${access_token}`
            }
        }
    )
}
async function deleteProdMany({ listId, access_token }) {
    access_token = await checkToken(access_token)
    return await axios.post('http://localhost:3001/api/delete-product-many/',
        {
            listId
        }, {
        headers: {
            Authorization: `Bearer ${access_token}`
        }
    }
    )
}
export default allProduct
export {
    allTypeProd,
    createProd,
    uploadImgProd,
    updateProd,
    deleteProd,
    deleteProdMany
}