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
            <div Style='width:70%;
            border-left:1px solid rgba(224, 168, 0, .4);'>
                <div className={cv('shop2')}>
                    <div className={cv('pd')}>
                        <span>
                            Đánh Giá
                        </span>
                        <span>235</span>
                    </div>
                    <div className={cv('pd')}>
                        <soan>
                            Tỉ Lệ Phản Hồi
                        </soan>
                        <span>
                            95%
                        </span>
                    </div>
                    <div className={cv('pd')}>
                        <soan>
                            Tham gia
                        </soan>
                        <span>
                            15 ngày trước
                        </span>
                    </div>
                </div>
                <div className={cv('shop2')}>
                    <div className={cv('pd')}>
                        <span>Sản Phẩm</span>
                        <span>40</span>
                    </div>
                    <div className={cv('pd')}>
                        <span>hời Gian Phản Hồi</span>
                        <span>trong vài phút</span>
                    </div>
                    <div className={cv('pd')}>
                        <span>Người Theo Dõi</span>
                        <span>2,6k</span>
                    </div>
                </div>
            </div>
        </div >
    );
}

export default Section2;