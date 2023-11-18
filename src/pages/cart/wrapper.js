import { useState, useEffect, useRef } from 'react';
import classNames from 'classnames/bind'
import objStyle from './index.module.scss'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { getcart } from '../../services/orders';
let cv = classNames.bind(objStyle);
function WrapperCart() {
    let [stateCart, setStateCart] = useState([])
    useEffect(() => {
        let fetchData = async () => {
            try {
                let data = await (await getcart()).data.listCart;
                setStateCart(data)
            }
            catch (e) {
                console.log(e.response.data)
            }
        }
        fetchData();
    }, [])
    console.log(stateCart)
    let listCart = () => {
        return stateCart.map((item) => {
            return <div className={cv('distance')}>
                <div className={cv('flex-block', 'block1')}>
                    <Form.Check Style='margin-right:12px' aria-label="option 1" />
                    <span className={cv('shopname')}>Yêu thích+</span>
                    <span className={cv('shopname2')}>{item.shop.name}</span>

                </div>
                {
                    item.listproduct.map((itemShop) => {
                        return <div className={cv('flex-block')}>

                            <div className={cv('flex-block1', 'block1')}>
                                <Form.Check Style='margin-right:12px' aria-label="option 1" />
                                <div className={cv('product', 'flex-block')}>
                                    <img src='/' />
                                    <span className={cv('product-name')} Style='margin-right:12px'>
                                        {itemShop.name}
                                    </span>
                                </div>
                                <div>
                                    select type
                                </div>
                            </div>
                            <div className={cv('flex-block2')}>
                                <div>{itemShop.price}</div>
                                <div>{itemShop.cartQuantity}</div>
                                <div>{itemShop.price * itemShop.cartQuantity}</div>
                                <div>option</div>
                            </div>

                        </div>

                    })

                }
                <div>
                    <img Style='width:24px;height:20px;margin-right:4px'
                        src='/cart/1.png' />
                    Giảm ₫15.000 phí vận chuyển đơn tối thiểu ₫50.000; Giảm ₫25.000 phí vận chuyển đơn tối thiểu ₫99.000
                </div>
            </div>
        })
    }
    return (
        <div className={cv('wrapper')}>
            <div className={cv('distance')}>
                <img Style='width:24px;height:20px;margin-right:4px'
                    src='/cart/1.png' />
                <span>
                    Nhấn vào mục Mã giảm giá ở cuối trang để hưởng miễn phí vận chuyển bạn nhé!
                </span>
            </div>
            <div className={cv('distance')}>
                <div className={cv('flex-block')}>
                    <div className={cv('flex-block1')}>
                        <Form.Check Style='margin-right:12px' aria-label="option 1" />
                        Sản Phẩm
                    </div>
                    <div className={cv('flex-block2')}>
                        <div>
                            Đơn Giá
                        </div>
                        <div>
                            Số Lượng
                        </div>
                        <div>
                            Số Tiền
                        </div>
                        <div>
                            Thao Tác

                        </div>
                    </div>
                </div>
            </div>
            {listCart()}

            <div className={cv('distance', 'order')}>
                <div className={cv('flex-block', 'block1')}>
                    <div className={cv('flex-block1')}></div>
                    <div className={cv('flex-block2')}>
                        <div>
                            Shopee Voucher
                        </div>
                        <div>
                            Shopee Voucher
                        </div>
                    </div>
                </div>
                <div className={cv('flex-block', 'block1')}>
                    <div className={cv('flex-block1')}></div>
                    <div className={cv('flex-block2', 'flex-block')}>

                        <Form.Check Style='margin-right:12px' aria-label="option 1" />
                        <div className={cv('flex-block')}>
                            <div className={cv('flex-block1')}>
                                Shopee Xu
                            </div>
                            <div className={cv('flex-block1')}>
                                Bạn chưa có Shopee Xu
                            </div>
                        </div>
                        <div>
                            d
                        </div>
                    </div>
                </div>
                <div className={cv('flex-block', 'block1')}>
                    <div className={cv('flex-block1')}>
                        <Form.Check Style='margin-right:12px' aria-label="option 1" />

                        <div className={cv('flex-block1')}>
                            Chọn Tất Cả
                        </div>
                        <div className={cv('flex-block1')}>
                            Xóa
                        </div>
                        <div className={cv('flex-block1')}>
                            ưu vào mục Đã thích
                        </div>
                    </div>
                    <div className={cv('flex-block3')}>
                        <div >Tổng thanh toán (0 Sản phẩm):
                        </div>
                        <div Style='margin-left:12px'>
                            ₫0
                        </div>
                        <Button Style='margin-left:12px' className={cv('btn-order')} variant="warning">Mua hàng</Button>{' '}
                    </div>

                </div>
            </div>
        </div >
    );
}
export default WrapperCart;