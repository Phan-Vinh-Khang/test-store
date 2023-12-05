import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import objStyle from './index.module.scss'
import objGlobalStyle from '../../../GlobalStyle/index.module.scss'
import classNames from 'classnames/bind'
import { Link, useNavigate } from 'react-router-dom';
import Tippy from '@tippyjs/react/headless';
import { useDispatch, useSelector } from 'react-redux';
import { setLoginReducer } from '../../../redux/reducerLogin';
import { Logout as LogoutAuth } from '../../../services/userServices';
import { REACT_APP_API_SERVER, REACT_APP_API_SERVER_LOCAL } from '../../../urlServer';
function NavHeader() {
    let cv = classNames.bind(objStyle)
    let cv2 = classNames.bind(objGlobalStyle)
    let dispatch = useDispatch();
    let userLogged = useSelector((state) => {
        return state.dataLogged;
    })
    let Logout = async () => {
        await LogoutAuth();
        localStorage.setItem('access_token', '')
        dispatch(setLoginReducer())
    }
    const userExist = Object.keys(userLogged).length;
    let navigate = useNavigate()
    return (
        <div className={cv('wrapper-nav')}>
            <div className={cv('content-nav1')}>
                {userLogged.iscollab &&
                    <span>
                        <a href='/'>Kênh người bán</a>
                    </span>
                }
                {!userLogged.iscollab &&
                    <span>
                        <Link to='/userShop'>Trở thành Người bán Shopee</Link>
                    </span>
                }
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
                    (userExist > 1) ? (
                        <Tippy
                            interactive
                            delay={[null, 50]}
                            render={attrs => (
                                <div className={cv2('showbox') + ' ' + cv('pd-5-10')}>
                                    <div>Tài khoản của tôi</div>
                                    <div onClick={() => { navigate('/order') }}>Đơn mua</div>
                                    <div onClick={Logout}>Đăng xuất
                                        <i class="fa-solid fa-arrow-right-from-bracket"></i>
                                    </div>
                                </div>
                            )}
                        >
                            <div className={cv('user')}>
                                <span>
                                    {
                                        (userLogged.image && <img
                                            src={REACT_APP_API_SERVER_LOCAL + 'avatar/' + userLogged.image}
                                            className={cv('avatar')}
                                        />)
                                    }
                                    <span>
                                        {userLogged.name}
                                    </span>
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