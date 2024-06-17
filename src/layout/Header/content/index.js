import { useState, useEffect } from 'react';
import axios from 'axios';
import objStyle from './index.module.scss'
import objGlobalStyle from '../../../GlobalStyle/index.module.scss'
import classNames from 'classnames/bind'
import Tippy from '@tippyjs/react/headless';
import TippyCart from './tippy-cart/index ';
import { useDispatch } from 'react-redux';
import { setSearch } from '../../../redux/reduxSearch';
import Select from 'react-select';
let cv = classNames.bind(objStyle)
let cv2 = classNames.bind(objGlobalStyle)

function ContentHeader() {
    let [stateInput, setStateInput] = useState('');
    let [options, setStateOptions] = useState(storage('getItem', 'search'))
    let dispatch = useDispatch();
    console.log('reload', stateInput)
    return (
        <div className={cv('wrapper-header')}>
            <div className={cv('wrapper-logo')}>
                <a href='/'>
                    {/* <div className={cv('logo-img')}></div> */}
                    <img src='/ShopeeMainLogo.png'></img>
                </a>
            </div>

            <div className={cv('wrapper-searchbar')}>
                <div style={{ width: '100%' }}>
                    <Select
                        inputValue={stateInput}
                        onChange={({ value }) => dispatch(setSearch(value))}
                        onKeyDown={(e) => {
                            if (e.key == 'Enter') {
                                console.log('enter')
                                const isExistIndex = options.findIndex((item) => item.value == stateInput);
                                storage('setItem', 'search', { value: { label: stateInput, value: stateInput } });
                                options.push({ label: stateInput, value: stateInput });
                                console.log(isExistIndex, 'isExistIndex keydown ')
                                if (isExistIndex >= 0) {
                                    storage('D-item', 'search', { idx: isExistIndex });
                                    options.splice(isExistIndex, 1);
                                }
                                if (options.length > 5) {
                                    storage('D-item', 'search', { idx: 0 });
                                    options.shift();
                                }
                                setStateOptions([...options]);
                                dispatch(setSearch(stateInput));
                            }

                        }}
                        //nếu options chưa tồn tại option thì sẽ chỉ call keydown khi event dc thực thi
                        //nếu options có 1 select trước đó thì sẽ call cả keydown và menu-close
                        onInputChange={(data, { action }) => {
                            if (action == 'input-change') setStateInput(data);
                            if (action == 'input-blur' && stateInput != '') {
                                const isExistIndex = options.findIndex((item) => item.value == stateInput)
                                storage('setItem', 'search', { value: { label: stateInput, value: stateInput } })
                                options.push({ label: stateInput, value: stateInput })
                                console.log(isExistIndex, 'isExistIndex not focus')
                                if (isExistIndex >= 0) {
                                    storage('D-item', 'search', { idx: isExistIndex });
                                    options.splice(isExistIndex, 1);
                                }
                                if (options.length > 5) {
                                    storage('D-item', 'search', { idx: 0 });
                                    options.shift();
                                }
                                setStateOptions([...options]);
                            }
                        }}
                        options={[...options].reverse()}
                        noOptionsMessage={() => null} //khi ko có bất kì option nào dc tìm thấy khi search function này sẽ dc call
                        placeholder='Search for products, brands and categories'
                    />
                </div>
                <span>
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
                            <TippyCart
                            // data={stateCart}
                            />
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
function storage(action, key, { value, idx } = {}) {
    /*phải set 1 object {} nếu ko đưa đối số thứ 3 vào
    nếu ko có đối số thứ 3 tham số object này reference vào undefine và undefine thì ko có prop value hoặc idxl
    ko thể sử dụng undefined.value hoặc undefined.idx nên sẽ báo lỗi
    */
    let data;
    switch (action) {
        case 'getItem':
            return (JSON.parse(localStorage[action](key))) || [];
        case 'setItem':
            data = storage('getItem', key); //return arr object
            data.push(value);
            localStorage[action](key, JSON.stringify(data));
            break;
        case 'D-item':
            data = storage('getItem', key);
            data.splice(idx, 1);
            localStorage.setItem(key, JSON.stringify(data));
            break;
    }
}
export default ContentHeader;