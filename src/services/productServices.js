import axios from "axios"
import checkToken from "./checkToken"
async function allProduct() {
    return await axios.get('http://localhost:3001/api/all-product')
}
async function allTypeProd() {
    return await axios.get('http://localhost:3001/api/all-type-product')

}
async function createProd({ data, access_token }) {
    const access_token2 = await checkToken(access_token)
    return await axios.post('http://localhost:3001/api/create-product', {
        data,
        access_token: access_token2
    })

}
async function uploadImgProd(file, filename) {
    let formData = new FormData();
    formData.append('imgProd', file, filename)
    return await axios.post('http://localhost:3001/api/uploadImgProd',
        formData
    )

}
export default allProduct
export { allTypeProd, createProd, uploadImgProd }