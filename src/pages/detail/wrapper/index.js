import { useState, useEffect } from 'react';
import axios from 'axios';
import classNames from 'classnames/bind'
import objStyle from './index.module.scss'
import { useDispatch } from 'react-redux';
import { unStickyHeader } from '../../../redux/reducer2';
import Section1 from '../section1';
import Section2 from '../section2';
import Section3 from '../section3';
import { useParams } from 'react-router-dom';
import { detailProduct } from '../../../services/productServices';
let cv = classNames.bind(objStyle);
function WrapperDetail() {
    const { id } = useParams();
    let dispatch = useDispatch()
    let [stateProduct, setStateProduct] = useState({});
    useEffect(() => {
        let fetchData = async () => {
            try {
                let data = (await detailProduct(id)).data;
                setStateProduct(data)
            } catch (e) {
                alert(e.response.data)
            }
        }
        fetchData();
        dispatch(unStickyHeader())
    }, [])
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
                <Section1 stateProduct={stateProduct} ></Section1>
                <Section2 shop={stateProduct.shop}></Section2>
                <Section3 stateProduct={stateProduct.product}></Section3>
            </div>
        </div>
    );
}

export default WrapperDetail;