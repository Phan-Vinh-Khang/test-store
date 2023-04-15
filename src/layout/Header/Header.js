import { useState, useEffect } from 'react';
import objStyle from './Header.module.scss'
import classNames from 'classnames/bind'
function Header() {
    var cv = classNames.bind(objStyle)
    return (
        <div className={cv('wrapper')}>
            <div className={cv('wapper-nav')}>
                <div className={cv('content-nav1')}>
                    <span>
                        <a href='/'>Kênh người bán</a>
                    </span>
                    <span>
                        <a href='/'>Trở thành người bán Shopee</a>
                    </span>
                    <span>
                        <a href='/'>Tải ứng dụng</a>
                    </span>
                    <span>
                        kết nối
                    </span>
                </div>
                <div className={cv('content-nav2')}>
                    a
                </div>
            </div>


            <div></div>
        </div>
    );
}

export default Header;