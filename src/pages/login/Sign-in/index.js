import { useState, useEffect } from 'react';
import axios from 'axios';
import objStyle from './index.module.scss'
import classNames from 'classnames/bind'
import resLogin from '../../../services/userServices';
function SignIn(obj) {
    let cv = classNames.bind(objStyle)
    let [state, setState] = useState({
        email: '',
        password: ''
    })
    const getValue1 = (e) => {
        // setState(refpreState => ({ ...refpreState, userName: e.target.value }))
        setState({
            email: e.target.value,
            password: state.password
        })
    }
    const getValue2 = (e) => {
        // setState(refpretate => ({ ...refpreState, password: e.target.value }))
        setState({
            email: state.email,
            password: e.target.value
        })
    }
    const submitAction = async () => {
        let data = {};
        // data = await axios({
        //     method: 'post',
        //     url: 'http://localhost:3001/api/check-user-login',
        //     data: {
        //         email: state.email,
        //         password: state.password
        //     }
        // });
        data = await resLogin(state.email, state.password)
        //return về 1 obj
        //{data: Array(10), status: 200, statusText: '', headers: AxiosHeaders, config: {…}, …}config: {transitional: {…}, adapter: Array(2), transformRequest: Array(1), transformResponse: Array(1), timeout: 0, …}data: Array(10)0: {id: 1, name: 'Leanne Graham', username: 'Bret', email: 'Sincere@april.biz', address: {…}, …}1: {id: 2, name: 'Ervin Howell', username: 'Antonette', email: 'Shanna@melissa.tv', address: {…}, …}2: {id: 3, name: 'Clementine Bauch', username: 'Samantha', email: 'Nathan@yesenia.net', address: {…}, …}3: {id: 4, name: 'Patricia Lebsack', username: 'Karianne', email: 'Julianne.OConner@kory.org', address: {…}, …}4: {id: 5, name: 'Chelsey Dietrich', username: 'Kamren', email: 'Lucio_Hettinger@annie.ca', address: {…}, …}5: {id: 6, name: 'Mrs. Dennis Schulist', username: 'Leopoldo_Corkery', email: 'Karley_Dach@jasper.info', address: {…}, …}6: {id: 7, name: 'Kurtis Weissnat', username: 'Elwyn.Skiles', email: 'Telly.Hoeger@billy.biz', address: {…}, …}7: {id: 8, name: 'Nicholas Runolfsdottir V', username: 'Maxime_Nienow', email: 'Sherwood@rosamond.me', address: {…}, …}8: {id: 9, name: 'Glenna Reichert', username: 'Delphine', email: 'Chaim_McDermott@dana.io', address: {…}, …}9: {id: 10, name: 'Clementina DuBuque', username: 'Moriah.Stanton', email: 'Rey.Padberg@karina.biz', address: {…}, …}length: 10[[Prototype]]: Array(0)headers: AxiosHeaders {cache-control: 'max-age=43200', content-type: 'application/json; charset=utf-8', expires: '-1', pragma: 'no-cache'}request: XMLHttpRequest {onreadystatechange: null, readyState: 4, timeout: 0, withCredentials: false, upload: XMLHttpRequestUpload, …}status: 200statusText: ""[[Prototype]]: Object
        //properties ref to static data(propertie data ref to arr,status ref to 200, config ref to obj)
        //respon của devtool sẽ hien thị obj.data
        console.log('test: ', data.data)
    }
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
                        <input name='email' onChange={(e) => getValue1(e)} class="form-control" type="text" placeholder="Email đăng nhập...." aria-label="default input example" />
                        <input name='password' onChange={getValue2} class="form-control" type="text" placeholder="Mật khẩu...." aria-label="default input example" />
                        <div className="d-grid gap-2">
                            <button onClick={submitAction} class="btn" type="button">Đăng nhập</button>
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
        </div>
    );
}

export default SignIn;