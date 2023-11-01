import { useState, useEffect } from 'react';
import axios from 'axios';
import classNames from 'classnames/bind'
import objStyle from './index.module.scss'
import allproduct from '../../../services/productServices';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
let cv = classNames.bind(objStyle);
let count = 0;
function Products() {
    let [stateListProd, setStateListProd] = useState([]);
    let search = useSelector((state) => {
        return state.search.data;
    })
    console.log(search)
    useEffect(() => {
        async function fetchDataProd() {
            let listprod = (await allproduct()).data;
            setStateListProd(listprod.listProduct)
        }
        fetchDataProd();
    }, [])
    let navigate = useNavigate()
    let selectProduct = (id) => {
        navigate(`/DetailProduct/${id}`)
    }
    let listProduct = () => {
        return stateListProd.map((item) => {
            return (
                <div onClick={() => selectProduct(item.id)} className={cv('wrap-product')}>
                    <img src='./Section-Products/img1.jpg' />
                    <div className={cv('wrap-info-product')}>
                        <div className={cv('product-name')}>
                            {item.name}
                        </div>
                        <div className={cv('product-more')}>
                            {/* các icon discount,.... neu có */}
                        </div>
                        <div className={cv('flex')}>
                            <div className={cv('price-item')}>{item.price}</div>
                            <div className={cv('sold-amount')}>{item.quantity}</div>
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