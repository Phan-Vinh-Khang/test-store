import { reFreshToken } from "./userServices";
async function reqWithToken(varstaticfunc, access_token, data = '') {
    let resData = '';
    try {
        resData = await varstaticfunc(data, access_token);
    } catch (e) {
        const access_token = (await reFreshToken()).data;
        localStorage.setItem('access_token', access_token)
        resData = await varstaticfunc(data, access_token);
    }
    return resData;
}
export default reqWithToken