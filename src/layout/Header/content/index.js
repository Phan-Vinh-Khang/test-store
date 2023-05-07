import { useState, useEffect } from 'react';
import axios from 'axios';
import objStyle from './index.module.scss'
import classNames from 'classnames/bind'
import Tippy from '@tippyjs/react/headless';
import TippyCart from './tippy-cart/index ';
function ContentHeader() {
    let cv = classNames.bind(objStyle)
    const [stateVisible, setStateVisible] = useState(false);
    const show = () => setStateVisible(true);
    const hide = () => setStateVisible(false);
    let listarr = ['testaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa', 'test2', 'test3', 'test4', 'test5']
    const [stateCart, setStateCart] = useState(
        // [
        //     {
        //         type: 'language',
        //         datalist: [
        //             {
        //                 name: 'tieng viet'
        //             },
        //             {
        //                 name: 'tieng anh'
        //             },
        //             {
        //                 name: 'tieng trung',
        //                 child: {
        //                     type: 'china language',
        //                     datalist: [
        //                         {
        //                             name: 'tieng trung 1'
        //                         },
        //                         {
        //                             name: 'tieng trung 2'
        //                         }
        //                     ]
        //                 }
        //             }
        //         ]
        //     }
        // ]
        ''
    )
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
                        <div className={cv('showbox', 'size-search')} tabIndex="-1" {...attrs}>
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
                <Tippy
                    interactive
                    placement="bottom-end"
                    delay={[null, 100]}
                    render={attrs => (
                        <div className={cv('showbox')}>
                            <TippyCart data={stateCart} />
                        </div>
                    )}
                >
                    <a href='/'>
                        <img src='./cart.png'></img>
                    </a>
                </Tippy>
            </div>

        </div >
    );
}

export default ContentHeader;