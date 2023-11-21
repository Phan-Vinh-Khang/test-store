import { useState, useEffect } from 'react';
import axios from 'axios';
import classNames from 'classnames/bind'
import Slider from "react-slick";
import objStyle from './index.module.scss'
import { useParams } from 'react-router-dom';
import { getShopByProduct } from '../../../services/usershop';
import { useSelector } from 'react-redux';
import lodash from 'lodash'
import { detailProduct } from '../../../services/productServices';
let cv = classNames.bind(objStyle);
function Section2() {
    let id = useParams().id;
    let [stateShop, setStateShop] = useState()
    useEffect(() => {
        let fetchData = async () => {
            try {
                let data = (await detailProduct(id)).data;
                setStateShop(data.shop)
            } catch (e) {
                alert(e.response.data)
            }
        }
        fetchData();
    }, [])
    return (
        <div div className={cv('section-2')} >
            <div className={cv('block-shop1')}>
                <div className={cv('shop-avatar')}>
                    <a href='/DetailShop'> <img src='/DetailProduct/Section2-img/img1.jpg' /></a>
                </div>
                <div className={cv('block-shop1-info')}>
                    <div>{stateShop?.name}</div>
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