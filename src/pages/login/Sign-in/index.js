import { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import objStyle from './index.module.scss'
import classNames from 'classnames/bind'
import jwt_decode from "jwt-decode";
import ButtonLoading from './ButtonLoading';
import resLogin, { AuthenticationUser } from '../../../services/userServices';
import { Navigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { setLoginReducer } from '../../../redux/reducerLogin';
sessionStorage.setItem('sessionEmail', '')
sessionStorage.setItem('sessionPassword', '')
function SignIn(obj) {
    let dispatch = useDispatch();
    let logged = useSelector((state) => {
        return state.dataLogged.name
    })
    let [stateLoading, setStateLoading] = useState({
        loading: false,
        mesage: '',
        className: '',
    })
    let cv = classNames.bind(objStyle);
    let [state, setState] = useState({
        email: sessionStorage.getItem('sessionEmail'),
        password: sessionStorage.getItem('sessionPassword')
    })
    sessionStorage.setItem('sessionEmail', state.email)
    sessionStorage.setItem('sessionPassword', state.password)
    let [stateShowPassword, setStateShowPassword] = useState(true);
    let showPasswordInput;
    let showPasswordIcon1, showPasswordIcon2;
    if (stateShowPassword) {
        showPasswordInput = 'text'
        showPasswordIcon1 = ''
        showPasswordIcon2 = 'display:none'
    }
    else {
        showPasswordInput = 'password'
        showPasswordIcon1 = 'display:none'
        showPasswordIcon2 = ''
    }
    const getValue = (e, label) => {
        state[label] = e.target.value
        setState({ ...state })
    }
    const submitAction = async () => {
        setStateLoading({
            loading: true,
            className: cv('btnload-active'),
            mesage: '',
        })
        setTimeout(async () => {
            try {
                let data = await resLogin(state.email, state.password)// return ve obj user dc ma hoa neu hop le
                const access_token = data.data.access_token
                localStorage.setItem('access_token', access_token)
                let userData = await AuthenticationUser(access_token);
                dispatch(setLoginReducer(userData.data.user))
            }
            catch (e) {
                setStateLoading({
                    loading: false,
                    className: '',
                    mesage: e.response.data.message
                })
                if (e.response.status == 409) {
                    setState({
                        ...state,
                        password: ''
                    })
                }
            }
        }, 1000)
        //return về 1 obj
        //{data: Array(10), status: 200, statusText: '', headers: AxiosHeaders, config: {…}, …}config: {transitional: {…}, adapter: Array(2), transformRequest: Array(1), transformResponse: Array(1), timeout: 0, …}data: Array(10)0: {id: 1, name: 'Leanne Graham', username: 'Bret', email: 'Sincere@april.biz', address: {…}, …}1: {id: 2, name: 'Ervin Howell', username: 'Antonette', email: 'Shanna@melissa.tv', address: {…}, …}2: {id: 3, name: 'Clementine Bauch', username: 'Samantha', email: 'Nathan@yesenia.net', address: {…}, …}3: {id: 4, name: 'Patricia Lebsack', username: 'Karianne', email: 'Julianne.OConner@kory.org', address: {…}, …}4: {id: 5, name: 'Chelsey Dietrich', username: 'Kamren', email: 'Lucio_Hettinger@annie.ca', address: {…}, …}5: {id: 6, name: 'Mrs. Dennis Schulist', username: 'Leopoldo_Corkery', email: 'Karley_Dach@jasper.info', address: {…}, …}6: {id: 7, name: 'Kurtis Weissnat', username: 'Elwyn.Skiles', email: 'Telly.Hoeger@billy.biz', address: {…}, …}7: {id: 8, name: 'Nicholas Runolfsdottir V', username: 'Maxime_Nienow', email: 'Sherwood@rosamond.me', address: {…}, …}8: {id: 9, name: 'Glenna Reichert', username: 'Delphine', email: 'Chaim_McDermott@dana.io', address: {…}, …}9: {id: 10, name: 'Clementina DuBuque', username: 'Moriah.Stanton', email: 'Rey.Padberg@karina.biz', address: {…}, …}length: 10[[Prototype]]: Array(0)headers: AxiosHeaders {cache-control: 'max-age=43200', content-type: 'application/json; charset=utf-8', expires: '-1', pragma: 'no-cache'}request: XMLHttpRequest {onreadystatechange: null, readyState: 4, timeout: 0, withCredentials: false, upload: XMLHttpRequestUpload, …}status: 200statusText: ""[[Prototype]]: Object
        //properties ref to static data(propertie data ref to arr,status ref to 200, config ref to obj)
        //respon của devtool sẽ hien thị obj.data
    }

    const showPassword = () => {
        setStateShowPassword(!stateShowPassword)
    }
    if (logged != undefined) {
        return <Navigate replace to="/" />;
    }
    else {
        return (
            <div className={cv('form-Login')}> {/*40% width block*/}
                <div className={cv('wrapper-Login-center')}>
                    <div className={cv('wrapper-Login-label')}>
                        <label>Đăng nhập</label>
                        <div>
                            <label>Đăng nhập với QR</label>
                            <a href="/"><label>QR</label></a>
                        </div>
                    </div>
                    <div className={cv('wrapperForm')}>
                        <form>
                            <input value={state.email} type='text' name='email' onChange={(e) => getValue(e, 'email')} class="form-control" placeholder="Email đăng nhập...." aria-label="default input example" />
                            <div className={cv('wrap-position-eyesIcon')}>
                                <input value={state.password} type={showPasswordInput} name='password' onChange={(e) => getValue(e, 'password')} class="form-control" placeholder="Mật khẩu...." aria-label="default input example" />
                                <span Style={showPasswordIcon1} onClick={showPassword} className={cv('eyesIcon')}>
                                    <i class="fa-solid fa-eye"></i>
                                </span>
                                <span Style={showPasswordIcon2} onClick={showPassword} className={cv('eyesIcon')}>
                                    <i class="fa-solid fa-eye-slash"></i>
                                </span>
                            </div>
                            <span>{stateLoading.mesage}</span>
                            <div className="d-grid gap-2">
                                {/* <button onClick={submitAction} className={cv('btn')} type="button">Đăng nhập</button> */}
                                <ButtonLoading isLoading={stateLoading.loading} onClick={submitAction} ></ButtonLoading>
                            </div>
                            <div className={cv('block-login2')}>
                                <a href='/'>Quên mật khẩu?</a>
                                <a href='/'>Dăng nhập với SMS</a>
                            </div>
                            <div className={cv('block-border')}>
                                <div className={cv('block-border-2')}></div>
                                <div className={cv('block-border-label')}>HOẶC</div>
                                <div className={cv('block-border-2')}></div>
                            </div>
                            <div className={cv('wrap-icon-login')}>
                                <span>
                                    <a href='/'>
                                        <i class="fa-brands fa-facebook"></i>
                                        <span>Facebook</span>
                                    </a>
                                </span>
                                <span>
                                    <a href='/'>

                                        <i class="fa-brands fa-google"></i>
                                        <span> Google</span>
                                    </a>
                                </span>
                                <span>
                                    <a href='/'>
                                        <i class="fa-brands fa-apple"></i>
                                        <span>Apple</span>
                                    </a>
                                </span>
                            </div>
                            <div className={cv('block-signup')}>
                                bạn mới biết đến Shopee?
                                <a onClick={obj.switchForm} type="button"> Đăng ký</a>
                            </div>
                        </form>
                    </div>
                </div>
            </div >
        )
    }
}

export default SignIn;