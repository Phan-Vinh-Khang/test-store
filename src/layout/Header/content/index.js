import { useState, useEffect } from 'react';
import axios from 'axios';
import objStyle from './index.module.scss'
import classNames from 'classnames/bind'
import Tippy from '@tippyjs/react/headless';
function ContentHeader() {
    let cv = classNames.bind(objStyle)
    const [stateVisible, setStateVisible] = useState(false);
    const show = () => setStateVisible(true);
    const hide = () => setStateVisible(false);
    let check = true;
    let listarr = ['testaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa', 'test2', 'test3', 'test4', 'test5']
    return (
        <div className={cv('wrapper-header')}>
            <div className={cv('wrapper-logo')}>
                <a href='/'>
                    {/* <div className={cv('logo-img')}></div> */}
                    <img src='./ShopeeMainLogo.png'></img>
                </a>
            </div>

            <div className={cv('wrapper-searchbar')}>

                <Tippy
                    visible={stateVisible}
                    onClickOutside={hide}
                    interactive
                    render={attrs => (
                        <div className={cv('showbox')} tabIndex="-1" {...attrs}>
                            {
                                listarr.map(item => (
                                    <a href='/'>
                                        {item}
                                    </a>
                                ))
                            }

                        </div>
                    )}
                >
                    <input onClick={stateVisible ? hide : show} type='text' placeholder='Đăng ký và nhận voucher bạn mới đến 70k!' ></input>
                </Tippy>
                <span>
                    <i class="fa-solid fa-magnifying-glass" Style="color: #eceff3;"></i>
                </span>
            </div >

            <div className={cv('wrapper-cart')}>
                <a href='/'>
                    <img src='./cart.png'></img>
                </a>
            </div>
        </div >
    );
}

export default ContentHeader;