import { useDispatch } from 'react-redux';
import { AuthenticationUser } from '../services/userServices';
import { setLoginReducer } from '../redux/reducerLogin';
async function Authentication() {
    let dispatch = useDispatch();
    try {
        let { data } = await AuthenticationUser()//neu return loi se ngung tai vi tri nay(vi tri loi) va chay catch
        dispatch(setLoginReducer(data.user))
    }
    catch (e) {
        //ko tim thay user hoac logout khi refresh token loi hoac het han
        dispatch(setLoginReducer())
    }
}
export default Authentication;