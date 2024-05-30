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
import { REACT_APP_API_SERVER_URL } from '../../../urlServer';
const url = REACT_APP_API_SERVER_URL;
function NavHeader() {
    let cv = classNames.bind(objStyle)
    let cv2 = classNames.bind(objGlobalStyle)
    let dispatch = useDispatch();
    let navigate = useNavigate()
    let userLogged = useSelector((state) => {
        return state.dataLogged;
    })
    let Logout = async () => {
        try {
            await LogoutAuth();
            localStorage.setItem('access_token', '')
            dispatch(setLoginReducer())
            window.location.href = '/'
        } catch (e) {
            alert(e)
        }
    }

    const userExist = Object.keys(userLogged).length;
    return (
        <div className={cv('wrapper-nav')}>
            <div className={cv('content-nav1')}>
                {userLogged.iscollab == 1 ?
                    <span>
                        <a href='/'>Kênh người bán</a>
                    </span> : null
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
                    (userExist > 0) ? (
                        <Tippy
                            interactive
                            delay={[null, 50]}
                            render={attrs => (
                                <div className={cv2('showbox') + ' ' + cv('pd-5-10')}>
                                    <a href='/profile'>Tài khoản của tôi</a>
                                    <a href='/profile/purchase'>Đơn mua</a>
                                    <a href='javascript:void(0);' onClick={Logout}>Đăng xuất
                                        <i class="fa-solid fa-arrow-right-from-bracket"></i>
                                    </a>
                                </div>
                            )}
                        >
                            <div className={cv('user')}>
                                <span>
                                    {
                                        (userLogged.image && <img
                                            src={url + 'avatar/' + userLogged.image}
                                            className={cv('avatar')}
                                        />) || <i class="fa-regular fa-user"></i>
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