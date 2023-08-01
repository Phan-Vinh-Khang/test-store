import axios from "axios"
async function allProduct() {
    return await axios.get('http://localhost:3001/api/all-product')
}
async function allTypeProd() {
    return await axios.get('http://localhost:3001/api/all-type-product')

}
export default allProduct
export { allTypeProd }