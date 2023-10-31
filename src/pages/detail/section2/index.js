import { useState, useEffect } from 'react';
import axios from 'axios';
import classNames from 'classnames/bind'
import Slider from "react-slick";
import objStyle from './index.module.scss'
import { useParams } from 'react-router-dom';
import { getShopByProduct } from '../../../services/usershop';
import { useSelector } from 'react-redux';
import lodash from 'lodash'
let cv = classNames.bind(objStyle);
function Section2() {
    let id = useParams().id;
    let listOrder = useSelector((state) => {
        return state.listOrder.listOrder;
    })
    console.log(listOrder)
    return (
        <div div className={cv('section-2')} >
            <div className={cv('block-shop1')}>
                <div className={cv('shop-avatar')}>
                    <a href='/DetailShop'> <img src='/DetailProduct/Section2-img/img1.jpg' /></a>
                </div>
                <div className={cv('block-shop1-info')}>
                    <div>{listOrder[0].shop.name}</div>
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
        </div >
    );
}

export default Section2;