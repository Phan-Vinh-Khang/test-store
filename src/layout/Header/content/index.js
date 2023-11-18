import { useState, useEffect } from 'react';
import axios from 'axios';
import objStyle from './index.module.scss'
import objGlobalStyle from '../../../GlobalStyle/index.module.scss'
import classNames from 'classnames/bind'
import Tippy from '@tippyjs/react/headless';
import TippyCart from './tippy-cart/index ';
import { useDispatch } from 'react-redux';
import { setSearch } from '../../../redux/reduxSearch';
import { setPage } from '../../../redux/reduxPages';
function ContentHeader() {
    let cv = classNames.bind(objStyle)
    let cv2 = classNames.bind(objGlobalStyle)
    const [stateVisible, setStateVisible] = useState(false);
    const hide = () => setStateVisible(!stateVisible);
    let [stateSearch, setStateSearch] = useState(sessionStorage.getItem('search'));
    let dispatch = useDispatch();
    let listSearch = JSON.parse(localStorage.getItem('listSearch'))
    if (!listSearch) listSearch = [];
    let setInput = (e) => {
        setStateSearch(e.target.value);
    }
    useEffect(() => {
        let timeout = setTimeout(() => {
            dispatch(setSearch(stateSearch))
            dispatch(setPage(1))
        }, 500)
        return () => clearTimeout(timeout)
    }, [stateSearch])
    let searchBtn = () => {
        if (stateSearch != '') {
            const isExistSearch = listSearch.indexOf(stateSearch)
            if (isExistSearch > -1) {
                listSearch.splice(isExistSearch, 1)
            }
            else {
                if (listSearch.length >= 5) listSearch.shift();
            }
            listSearch.push(stateSearch)
            localStorage.setItem('listSearch', JSON.stringify(listSearch))
        }
    }
    const [stateCart, setStateCart] = useState('')
    return (
        <div className={cv('wrapper-header')}>
            <div className={cv('wrapper-logo')}>
                <a href='/'>
                    {/* <div className={cv('logo-img')}></div> */}
                    <img src='/ShopeeMainLogo.png'></img>
                </a>
            </div>

            <div className={cv('wrapper-searchbar')}>
                <Tippy
                    visible={stateVisible}
                    onClickOutside={hide}
                    interactive
                    render={attrs => (
                        <div className={cv2('showbox') + ' ' + cv('size-search')} tabIndex="-1" {...attrs}>
                            {
                                [...listSearch].reverse().map((item) => {
                                    return (<a href='/'>
                                        {item}
                                    </a>
                                    )
                                })
                            }

                        </div>
                    )}
                >
                    <input onKeyDown={(e) => {
                        if (e.key == 'Enter') {
                            searchBtn()
                            setStateVisible(!stateVisible)
                        }
                    }} value={stateSearch} onChange={(e) => setInput(e)} onClick={hide} type='text' placeholder='Đăng ký và nhận voucher bạn mới đến 70k!' ></input>
                </Tippy>
                <span onClick={searchBtn}>
                    <i class="fa-solid fa-magnifying-glass" Style="color: #eceff3;"></i>
                </span>
            </div >
            <div className={cv('wrapper-cart')}>
                <Tippy
                    interactive
                    placement="bottom-end"
                    delay={[null, 50]}
                    render={attrs => (
                        <div className={cv2('showbox')}>
                            <TippyCart data={stateCart} />
                        </div>
                    )}
                >
                    <a href='/cart'>
                        <img src='/cart.png'></img>
                    </a>
                </Tippy>
            </div>

        </div >
    );
}

export default ContentHeader;