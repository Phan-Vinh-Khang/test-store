import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import classNames from 'classnames/bind'
import Slider from "react-slick";
import objStyle from './index.module.scss'
import { useDispatch, useSelector } from 'react-redux';
import { setlistOrder } from '../../redux/reduxOrder';
import _ from 'lodash'
import { useNavigate } from 'react-router-dom';
let cv = classNames.bind(objStyle);
const url = 'http://localhost:3001/img/products/'
function WrapperCheckout() {
    let navigate = useNavigate();
    const user = useSelector((state) => {
        return state.dataLogged
    })
    let listOrder = useSelector((state) => {
        return state.listOrder.listOrder;
    })
    console.log('listorder', listOrder)
    const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'VND',
    });
    let totalPrice = 0;
    let totalProduct = 0;
    return (
        <div className={cv('wrapper')}>
            <div className={cv('vtrWey')}>
            </div>
            <div className={cv('wrapper-address')}>
                <div>Địa Chỉ Nhận Hàng</div>
                <div>{user.name}</div>
                <div>{user.adress}</div>
                <div>Option</div>
            </div>
            <div className={cv('wrapper-product')}>
                <div className={cv('block-product1')}>
                    {
                        listOrder.map((item) => {
                            return (<>
                                <div>Sản phẩm</div>
                                <div>{item.shop.name}|chat ngay
                                    {
                                        item.listproduct.map((product) => {
                                            return (
                                                <>
                                                    <div className={cv('detail-product')}>
                                                        <img src={url + product.image} />
                                                        <div>{`${product.name}(-${product.discount}%)`}</div>
                                                    </div>
                                                </>)
                                        })
                                    }
                                </div>
                            </>)
                        })
                    }
                </div>
                <div className={cv('block-product2')}>
                    <div>
                        <div>Số lượng</div>
                        <div>Đơn giá</div>
                        <div>Thành tiền</div>
                    </div>
                    {
                        listOrder.map((item) => {
                            return item.listproduct.map((product) => {
                                totalProduct += product.selectQuantity;
                                const lastPrice = product.price - product.price / 100 * product.discount
                                totalPrice += (lastPrice * product.selectQuantity)
                                return (
                                    <div>
                                        <div>{product.selectQuantity}</div>
                                        <div>{formatter.format(product.price)}</div>
                                        <div>{formatter.format(lastPrice)}đ</div>
                                    </div>
                                )

                            })
                        })
                    }
                </div>
                <div className={cv('total-price')}>
                    <div>
                        {`Thành tiền(${totalProduct} sản phẩm)`}
                    </div>
                    <div>
                        {formatter.format(totalPrice)}
                    </div>
                </div>
            </div>
            <div className={cv('wrapper-payment')}>
                <div>Đặt hàng</div>
            </div>
        </div>
    );
}

export default WrapperCheckout;