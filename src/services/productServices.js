import axios from "axios"
async function allproduct() {
    return await axios.get('http://localhost:3001/api/all-product')
}
export default allproduct
export { }