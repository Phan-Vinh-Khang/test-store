import { useDispatch } from 'react-redux';
import { AuthenticationUser, reFreshToken } from '../services/userServices';
import { setLoginReducer } from '../redux/reducerLogin';
let access_token = localStorage.getItem('access_token')
async function Authentication() {
    let dispatch = useDispatch();
    while (true) {
        try {
            let { data } = await AuthenticationUser(access_token)//neu return loi se ngung tai vi tri nay(vi tri loi) va chay catch
            dispatch(setLoginReducer(data.user))
            break;
        }
        catch (e) {
            access_token = (await reFreshToken()).data
            if (access_token?.status != 401) {//refresh token loi hoac het han
                localStorage.setItem('access_token', access_token)
            } else {
                dispatch(setLoginReducer()) //logout khi refresh token loi hoac het han
                break;
            }
        }
    }
}
export default Authentication;