import { useState, useEffect } from 'react';
import objStyle from './index.module.scss'
import classNames from 'classnames/bind'
function SignUp(obj) {
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
    return (
        <div className={cv('form-Login')}> {/*40% width block*/}
            <div className={cv('wrapper-Login-center')}>
                <div className={cv('wrapper-Login-label')}>
                    <label>Đăng ký</label>
                    <div>
                        <label>Đăng với QR</label>
                        <a href="/"><label>QR</label></a>
                    </div>
                </div>
                <div className={cv('wrapperForm')}>
                    <form>
                        <input class="form-control" type="text" placeholder="Tên người dùng...." aria-label="default input example" />
                        <input onChange={(e) => getValue1(e)} class="form-control" type="text" placeholder="Tên đăng nhập...." aria-label="default input example" />
                        <input onChange={getValue2} class="form-control" type="text" placeholder="Mật khẩu...." aria-label="default input example" />
                        <input class="form-control" type="text" placeholder="Xác nhận mật khẩu...." aria-label="default input example" />

                        <div className="d-grid gap-2">
                            <button onClick={submitAction} class="btn" type="button">Đăng nhập</button>
                        </div>
                        <div>
                            <button onClick={obj.switchForm} type="button">Đăng nhập</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default SignUp;