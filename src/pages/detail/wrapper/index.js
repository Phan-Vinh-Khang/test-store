import { useState, useEffect } from 'react';
import axios from 'axios';
import classNames from 'classnames/bind'
import objStyle from './index.module.scss'
import { useSelector, useDispatch } from 'react-redux';
import { unStickyHeader } from '../../../redux/reducer2';
import Section1 from '../section1';
let w = 1;
function WrapperDetail(obj) {
    let dispatch = useDispatch();
    console.log('detail: ', useSelector((state) => {
        return state;
    }))
    if (w == 1) {
        dispatch(unStickyHeader())
        w++;
    }
    let cv = classNames.bind(objStyle);
    return (
        <div className={cv('wrapper')}>
            <div className={cv('title-path')}>
                Shopee
                <i class="fa-solid fa-angle-right" />
                Thời Trang Nữ
                <i class="fa-solid fa-angle-right" />
                Quần đùi
                <i class="fa-solid fa-angle-right" />
                quần đùi nữ đũi cạp chun sau ống rộng xòe dáng short váy nhiều màu hàng đẹp
            </div>
            <div className={cv('wrap-content')}>
                <Section1></Section1>
            </div>
        </div>
    );
}

export default WrapperDetail;