import { useState, useEffect } from 'react';
import axios from 'axios';
import classNames from 'classnames/bind'
import objStyle from './index.module.scss'
import allproduct from '../../../services/productServices';
let cv = classNames.bind(objStyle);
let count = 0;
function Products() {
    let [stateListProd, setStateListProd] = useState([]);
    // let fetchData = async () => {
    //     let listprod = await allproduct();
    //     setStateListProd(listprod.data);//sau khi element return dc 5s,func ở đây mới return về staticdata và console.log() ra
    // }// nếu sử dụng setState sẽ reload liên tục,sử dụng useEffect sẽ chỉ reload lại 1 lần
    // fetchData();//call func và tiếp tuc chạy,sẽ return về element trước,sau đó 5s sau mới console.log() ra
    useEffect(() => { //useEffect chỉ chạy 1 lần nếu có [] (có setState() vẫn chỉ chạy setState 1 lần)
        async function fetchDataProd() {
            let listprod = (await allproduct()).data; //call func func dc call sẽ chạy nhưng 5s sau mới return. await chờ func return mới ref var vào staticdata
            setStateListProd(listprod.listProduct)
        }
        fetchDataProd();//sau khi vừa call func sẽ tiep tục chạy
    }, [])
    let listProduct = () => {
        return stateListProd.map((item) => {
            return (
                <div className={cv('wrap-product')}>
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