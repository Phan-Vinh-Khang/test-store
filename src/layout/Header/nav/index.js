import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import objStyle from './index.module.scss'
import classNames from 'classnames/bind'
function NavHeader() {
    let cv = classNames.bind(objStyle)
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
                <span>
                    <a href='/login'>Đăng ký</a>
                </span>
                <span>
                    <a href='/login'>Đăng nhập</a>
                </span>
            </div >
        </div >
    );
}

export default NavHeader;