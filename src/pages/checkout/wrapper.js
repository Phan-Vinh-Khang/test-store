import { useState, useEffect } from 'react';
import axios from 'axios';
import classNames from 'classnames/bind'
import objStyle from './index.module.scss'
import { useDispatch, useSelector } from 'react-redux';
import { setlistOrder } from '../../redux/reduxOrder';
import _ from 'lodash'
import { useNavigate } from 'react-router-dom';
import { checkout } from '../../services/orders';
import Button from 'react-bootstrap/Button';

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
    useEffect(() => {
        if (listOrder.length == 0)
            navigate('/')
    }, [])
    const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'VND',
    });
    let totalPrice = 0;
    let totalProduct = 0;
    let order = async () => {
        try {
            await checkout(listOrder)
        } catch (e) {
            alert(e.response.data.message)
        }
    }
    let listorder2 = () => {
        let totalPrice = 0;
        return <>{
            listOrder?.map((item, i) => {
                return <div Style={i == 0 && `margin-top: 0;border-top: 0;
            border-top-left-radius: 0;
            border-top-right-radius: 0;`}
                    className={cv('distance')}>
                    <div className={cv('flex-block')}>
                        <div className={cv('flex-block1')}>
                            <div className={cv('flex-block1')}>
                                <span className={cv('shopname')}>Yêu thích+</span>
                                <span className={cv('')}>{item.shop.name}</span>

                            </div>
                            {
                                item.listproduct.map((itemShop) => {
                                    return <div className={cv('flex-block1', 'distance-b-10')}>
                                        <img className={cv('distance-r-10')} src='/' />
                                        <div className={cv('distance-r-10', 'product-block')}>{itemShop.name}</div>
                                        <div className={cv('distance-r-10', 'product-block')}>select type</div>
                                    </div>
                                })
                            }
                        </div>
                        <div className={cv('flex-block2')}>
                            <div Style='width:100%;height:16px'></div>
                            {
                                item.listproduct.map((itemShop) => {
                                    totalPrice += (itemShop.price - (itemShop.price / 100 * itemShop.discount)) * itemShop.selectQuantity
                                    return <>
                                        <div className={cv('product-block')}>
                                            <span>{`${formatter.format(itemShop.price)}(-${itemShop.discount}%)`}</span>
                                        </div>
                                        <div>
                                            <span>{itemShop.selectQuantity}</span>
                                        </div>
                                        <div Style='text-align:right' className={cv('product-block')}>
                                            <span>{formatter.format(itemShop.price - (itemShop.price / 100 * itemShop.discount))}</span>
                                        </div>
                                    </>
                                })//
                            }
                            {/* <div className={cv('product-block')}>
                                <span>₫60.000</span>
                            </div>
                            <div>
                                <span>1</span>
                            </div>
                            <div Style='text-align:right' className={cv('product-block')}>
                                <span>₫60.000</span>
                            </div>
                            <div className={cv('product-block')}>
                                <span>₫60.000</span>
                            </div>
                            <div>
                                <span>1</span>
                            </div>
                            <div Style='text-align:right' className={cv('product-block')}>
                                <span>₫60.000</span>
                            </div>
                            <div className={cv('product-block')}>
                                <span>₫60.000</span>
                            </div>
                            <div>
                                <span>1</span>
                            </div>
                            <div Style='text-align:right' className={cv('product-block')}>
                                <span>₫60.000</span>
                            </div> */}
                        </div>
                    </div>
                    <div className={cv('block1')}></div>
                    <div className={cv('flex-block3')}>
                        <div>Lời nhắn:
                            <input></input>
                        </div>
                        <div>
                            <span className={cv('distance-r-10')}>{`Tổng số tiền (${listOrder[i].listproduct.length} sản phẩm):`}</span>
                            <span>{formatter.format(totalPrice)}</span>
                        </div>
                    </div>
                </div>
            })

        }
            {/* <div Style='margin-top: 0;border-top: 0;
            border-top-left-radius: 0;
            border-top-right-radius: 0;'
                className={cv('distance')}>
                <div className={cv('flex-block')}>
                    <div className={cv('flex-block1')}>
                        <div className={cv('flex-block1')}>
                            <span className={cv('shopname')}>Yêu thích+</span>
                            <span className={cv('')}>shop</span>

                        </div>
                        <div className={cv('flex-block1', 'distance-b-10')}>
                            <img className={cv('distance-r-10')} src='/' />
                            <div className={cv('distance-r-10', 'product-block')}>product</div>
                            <div className={cv('distance-r-10', 'product-block')}>select type</div>
                        </div>
                        <div className={cv('flex-block1', 'distance-b-10')}>
                            <img className={cv('distance-r-10')} src='/' />
                            <div className={cv('distance-r-10', 'product-block')}>product</div>
                            <div className={cv('distance-r-10', 'product-block')}>select type</div>
                        </div>
                        <div className={cv('flex-block1', 'distance-b-10')}>
                            <img className={cv('distance-r-10')} src='/' />
                            <div className={cv('distance-r-10', 'product-block')}>product</div>
                            <div className={cv('distance-r-10', 'product-block')}>select type</div>
                        </div>
                    </div>
                    <div className={cv('flex-block2')}>
                        <div Style='width:100%;height:16px'></div>
                        <div className={cv('product-block')}>
                            <span>₫60.000</span>
                        </div>
                        <div>
                            <span>1</span>
                        </div>
                        <div Style='text-align:right' className={cv('product-block')}>
                            <span>₫60.000</span>
                        </div>
                        <div className={cv('product-block')}>
                            <span>₫60.000</span>
                        </div>
                        <div>
                            <span>1</span>
                        </div>
                        <div Style='text-align:right' className={cv('product-block')}>
                            <span>₫60.000</span>
                        </div>
                        <div className={cv('product-block')}>
                            <span>₫60.000</span>
                        </div>
                        <div>
                            <span>1</span>
                        </div>
                        <div Style='text-align:right' className={cv('product-block')}>
                            <span>₫60.000</span>
                        </div>
                    </div>
                </div>
                <div className={cv('block1')}></div>
                <div className={cv('flex-block3')}>
                    <div>Lời nhắn:
                        <input></input>
                    </div>
                    <div>
                        <span className={cv('distance-r-10')}>Tổng số tiền (2 sản phẩm):</span>
                        <span>₫230.100</span>
                    </div>
                </div>
            </div> */}
        </>
    }
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
            <div Style='margin-bottom: 0;border-bottom: 0;border-bottom-left-radius: 0;border-bottom-right-radius: 0;'
                className={cv('distance')}>
                <div className={cv('flex-block')}>
                    <div className={cv('flex-block1')}>Sản phẩm</div>
                    <div className={cv('flex-block2')}>
                        <div Style='color:#bbb'>Đơn giá</div>
                        <div Style='color:#bbb'>Số lượng</div>
                        <div Style='color:#bbb'>Thành tiền</div>
                    </div>
                </div>
            </div>
            {listorder2()}
            <div className={cv('wrapper-payment')}>
                <Button onClick={order}
                    Style='margin-left:12px'
                    className={cv('btn-order')}
                    variant="warning">Đặt hàng</Button>{' '}

            </div>
        </div>
    );
}

export default WrapperCheckout;