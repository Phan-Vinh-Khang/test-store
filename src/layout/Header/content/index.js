import { useState, useEffect } from 'react';
import axios from 'axios';
import objStyle from './index.module.scss'
import classNames from 'classnames/bind'
function ContentHeader() {
    let cv = classNames.bind(objStyle)
    return (
        <div className={cv('wrapper-header')}>
            <div className={cv('wrapper-logo')}>
                <a href='/'>
                    {/* <div className={cv('logo-img')}></div> */}
                    <img src='./ShopeeMainLogo.png'></img>
                </a>
            </div>
            <div className={cv('wrapper-searchbar')}>
                <input type='text' placeholder='Đăng ký và nhận voucher bạn mới đến 70k!' ></input>
                <span>
                    <i class="fa-solid fa-magnifying-glass" Style="color: #eceff3;"></i>
                </span>
            </div>
            <div className={cv('wrapper-cart')}>
                <a href='/'>
                    <img src='./cart.png'></img>
                </a>
            </div>
        </div>
    );
}

export default ContentHeader;