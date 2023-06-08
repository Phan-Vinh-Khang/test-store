import { useState, useEffect } from 'react';
import axios from 'axios';
import classNames from 'classnames/bind'
import objStyle from './index.module.scss'
import { reFreshToken } from '../../../services/userServices';
let cv = classNames.bind(objStyle);
function Products() {
    let arr = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
    let listProduct = () => {
        return arr.map((item) => {
            return (
                <div onClick={reFreshToken} className={cv('wrap-product')}>
                    <img src='./Section-Products/img1.jpg' />
                    <div className={cv('wrap-info-product')}>
                        <div className={cv('product-name')}>
                            aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
                        </div>
                        <div className={cv('product-more')}>
                            {/* các icon discount,.... neu có */}
                        </div>
                        <div className={cv('flex')}>
                            <div className={cv('price-item')}>đ70.000</div>
                            <div className={cv('sold-amount')}>Đã bán 12,6k</div>
                        </div>
                    </div>


                </div>
            )
        })
    }
    return (
        <div className={cv('wrapper')}>
            <div className={cv('text-title')}>
                Gợi ý hôm nay
            </div>
            <div className={cv('wrap-flex')}>
                {listProduct()}
            </div>
        </div>
    );
}

export default Products;