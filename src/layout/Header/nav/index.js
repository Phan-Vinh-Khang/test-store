import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import objStyle from './index.module.scss'
import objGlobalStyle from '../../../GlobalStyle/index.module.scss'
import classNames from 'classnames/bind'
import { Link } from 'react-router-dom';
import Tippy from '@tippyjs/react/headless';
import { useDispatch, useSelector } from 'react-redux';
import { setLoginReducer } from '../../../redux/reducerLogin';
function NavHeader() {
    let cv = classNames.bind(objStyle)
    let cv2 = classNames.bind(objGlobalStyle)
    let dispatch = useDispatch();
    // let [stateLogged, setStateLogged] = useState(JSON.parse(localStorage.getItem("logged")).name)
    let Logged = useSelector((state) => {
        return state.dataLogged.name;
    })
    let Logout = () => {
        dispatch(setLoginReducer());
    }
    sessionStorage.setItem('test', 'aaa')
    // let Logout = () => {
    //     localStorage.setItem("logged", JSON.stringify({
    //         id: undefined,
    //         name: undefined
    //     }))
    //     setStateLogged(undefined)
    // }
    return (
        <div className={cv('wrapper-nav')}>
            <div className={cv('content-nav1')}>
                <span>
                    <a href='/'>Kênh người bán</a>
                </span>
                <span>
                    <a href='/'>Trở thành Người bán Shopee</a>
                </span>
                <span>
                    <a href='/'>Tải ứng dụng</a>
                </span>
                <div>
                    <span>
                        Kết nối
                    </span>
                </div>
            </div>
            <div className={cv('content-nav2')}>
                <span type='button'>
                    Thông báo
                </span>
                <span>
                    <a href='/'>Hỗ trợ</a>
                </span>
                <span type='button'>
                    Tiếng Việt
                </span>
                {
                    (Logged != undefined) ? (
                        <Tippy
                            interactive
                            delay={[null, 50]}
                            render={attrs => (
                                <div className={cv2('showbox') + ' ' + cv('pd-5-10')}>
                                    <div>test</div>
                                    <div>test2</div>
                                    <div onClick={Logout}>Logout
                                        <i class="fa-solid fa-arrow-right-from-bracket"></i>
                                    </div>
                                </div>
                            )}
                        >
                            <div className={cv('user')}>
                                <span>
                                    <i class="fa-regular fa-user"></i>
                                    {Logged}
                                </span>
                            </div>
                        </Tippy>

                    ) : (
                        <>
                            <span>
                                <Link to='/login'>Đăng ký</Link>
                            </span>
                            <span>
                                <Link to='/login'>Đăng nhập</Link>
                            </span>
                        </>
                    )
                }
            </div >
        </div >
    );
}

export default NavHeader;