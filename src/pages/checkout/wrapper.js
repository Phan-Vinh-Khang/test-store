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
import { ToastContainer, toast } from 'react-toastify';
import { REACT_APP_API_SERVER, REACT_APP_API_SERVER_LOCAL } from '../../urlServer';
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
    let lastPrice = 0;
    const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'VND',
    });
    let order = async () => {
        try {
            await checkout(listOrder)
            toast.success('đã đặt hàng,ban co thể kiểm tra đơn hàng', {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            })
        } catch (e) {
            alert(e.response.data.message)
        }
    }
    let listorder2 = () => {
        return <>{
            listOrder?.map((item, i) => {
                let totalPriceShop = 0;
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
                                        <img className={cv('distance-r-10', 'product-image')}
                                            src={REACT_APP_API_SERVER_LOCAL + 'img/products/' + itemShop.image} />
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
                                    totalPriceShop += (itemShop.price - (itemShop.price / 100 * itemShop.discount)) * itemShop.selectQuantity
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
                            {
                                lastPrice += totalPriceShop
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
                            <input Style='padding:6px 16px;margin-left:16px;border-radius: 6px;border:1px solid rgba(0, 0, 0, 0.4)'></input>
                        </div>
                        <div>
                            <span className={cv('distance-r-10')}>{`Tổng số tiền (${listOrder[i].listproduct.length} sản phẩm):`}</span>
                            <span>{formatter.format(totalPriceShop)}</span>
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
            <div className={cv('distance')}>
                <div className={cv('flex-block5', 'block1')}>
                    <div>
                        Phương thức thanh toán
                    </div>
                    <div className={cv('flex-block4')}>
                        <div Style='padding-left:120px'>Thay đổi</div>
                        <div>Thanh toán khi nhận hàng</div>
                    </div>
                </div>
                <div className={cv('flex-block4', 'block1')}>
                    <div Style='padding-left:120px'>
                        <div>{formatter.format(lastPrice)}</div>
                        <div>{formatter.format(31000)}</div>
                        <div>{formatter.format(lastPrice + 31000)}</div>
                    </div>
                    <div>
                        <div>
                            Tổng tiền hàng
                        </div>
                        <div>
                            Phí vận chuyển
                        </div>
                        <div>
                            Tổng thanh toán:
                        </div>
                    </div>
                </div>
                <div className={cv('flex-block6')}>
                    <div>
                        Nhấn "Đặt hàng" đồng nghĩa với việc bạn đồng ý tuân theo Điều khoản Shopee
                    </div>
                    <div>
                        <ToastContainer></ToastContainer>
                        <Button onClick={order}
                            className={cv('btn-order')}
                            variant="warning">Đặt hàng
                        </Button>{' '}
                    </div>
                </div>


            </div>

        </div>
    );
}

export default WrapperCheckout;