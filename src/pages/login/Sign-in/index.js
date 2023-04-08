import { useState, useEffect } from 'react';
import objStyle from './index.module.scss'
import classNames from 'classnames/bind'
function SignIn(obj) {
    let cv = classNames.bind(objStyle)
    let [state, setState] = useState({
        userName: '',
        password: ''
    })
    const getValue1 = (e) => {
        // setState(refpreState => ({ ...refpreState, userName: e.target.value }))
        setState({
            userName: e.target.value,
            password: state.password
        })
    }
    const getValue2 = (e) => {
        // setState(refpretate => ({ ...refpreState, password: e.target.value }))
        setState({
            userName: state.userName,
            password: e.target.value
        })
    }
    const submitAction = () => {
        console.log(state)
    }
    console.log(state)
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
                        <input onChange={(e) => getValue1(e)} class="form-control" type="text" placeholder="Tên đăng nhập...." aria-label="default input example" />
                        <input onChange={getValue2} class="form-control" type="text" placeholder="Mật khẩu...." aria-label="default input example" />
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