import { useState, useEffect } from 'react';
import axios from 'axios';
import classNames from 'classnames/bind'
import Slider from "react-slick";
import objStyle from './index.module.scss'
let cv = classNames.bind(objStyle);
function Section2() {
    return (
        <div className={cv('section-2')}>
            <div className={cv('block-shop1')}>
                <div className={cv('shop-avatar')}>
                    <a href='/Detail'> <img src='/DetailProduct/Section2-img/img1.jpg' /></a>
                </div>
                <div className={cv('block-shop1-info')}>
                    <div>shopbynnguyen</div>
                    <div>Online 5 Giờ Trước</div>
                    <div className={cv('block-shop1-info-btn')}>
                        <button>Chat Ngay</button>
                        <button>Xem Shop</button>
                    </div>
                </div>
            </div>
            <div className={cv('block-shop2')}>
                a
            </div>
        </div>
    );
}

export default Section2;