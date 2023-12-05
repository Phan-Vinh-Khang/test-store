import { useState, useEffect } from 'react';
import axios from 'axios';
import classNames from 'classnames/bind'
import objStyle from './index.module.scss'
import lodash from 'lodash'
let cv = classNames.bind(objStyle);
function Section2({ shop }) {
    return (
        <div div className={cv('section-2')} >
            <div className={cv('block-shop1')}>
                <div className={cv('shop-avatar')}>
                    <a href='/DetailShop'> <img src='/DetailProduct/Section2-img/img1.jpg' /></a>
                </div>
                <div className={cv('block-shop1-info')}>
                    <div>{shop?.name}</div>
                    {/* nếu listOrder[0] ton tai thì sẽ luon có propertie shop và name */}
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