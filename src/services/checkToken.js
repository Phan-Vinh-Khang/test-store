import axios from "axios"
import { reFreshToken } from "./userServices";
async function checkToken(access_token) {
    try {
        await axios.post('http://localhost:3001/api/check-token', null,
            {
                headers: {
                    Authorization: `Bearer ${access_token}`
                }
            }
        )
    } catch (e) {
        const token = (await reFreshToken()).data
        localStorage.setItem('access_token', token)
        return token
    }
    return access_token
}
export default checkToken