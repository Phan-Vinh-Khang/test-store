import { useDispatch } from 'react-redux';
import { AuthenticationUser, reFreshToken } from '../services/userServices';
import { setLoginReducer } from '../redux/reducerLogin';
let access_token = localStorage.getItem('access_token')
async function Authentication() {
    let dispatch = useDispatch();
    if (!access_token)
        return;
    while (true) {
        try {
            let { data } = await AuthenticationUser(access_token)//neu return loi se ngung tai vi tri nay(vi tri loi) va chay catch
            dispatch(setLoginReducer(data.user))
            break;
        }
        catch (e) {
            if (e.response.status == 404) //ko tim thay user
            {
                dispatch(setLoginReducer())
                break;
            }
            try {
                access_token = (await reFreshToken()).data
                localStorage.setItem('access_token', access_token)
            }
            catch (e) {//refresh token loi hoac het han
                dispatch(setLoginReducer()) //logout khi refresh token loi hoac het han
                break;
            }

        }
    }
}
export default Authentication;