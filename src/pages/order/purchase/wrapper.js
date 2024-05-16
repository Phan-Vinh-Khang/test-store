import { useState, useEffect, useRef } from 'react';
import classNames from 'classnames/bind'
import objStyle from './index.module.scss'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useDispatch, useSelector } from 'react-redux';
import _, { cloneDeep } from 'lodash'
import { useNavigate } from 'react-router-dom';
import { REACT_APP_API_SERVER_URL } from '../../../urlServer';
import { getorder } from '../../../services/orders';
let cv = classNames.bind(objStyle);
const url = REACT_APP_API_SERVER_URL;
function WrapperPurchase() {
    let [stateLocationY, setStateLocationY] = useState(300)
    let [stateListOrder, setStateListOrder] = useState();
    useEffect(() => {
        window.addEventListener('scroll', func1)
        return () => window.removeEventListener('scroll', func1)
        /*nếu k có đoạn trên khi load lai function 
        doi so function của function removeEventListener()
        với state trước đó van ton tai,khi thuc thi nó sẽ thực thi cả 2
        function removeEventListener() trước đó và hiện tại
        */
    }, [stateLocationY])
    useEffect(() => {
        let fetchData = async () => {
            try {
                let data = (await getorder()).data.data;
                setStateListOrder(data)
            }
            catch (e) {
                console.log(e.response.data)
            }
        }
        fetchData();
    }, [])
    let func1 = () => {
        if (window.pageYOffset >= stateLocationY) {
            setStateLocationY(stateLocationY + 300)
        }
    }
    console.log(stateListOrder)
    const listOrder = () => {
        return (
            stateListOrder?.map((itemOrder) => {
                return <div className={cv('distance')}>
                    {itemOrder.listDetailOrder.map((itemDetailOrder, i) => {
                        return <div>
                            <div className={cv('flex-block2', 'block1')}>
                                <div className={cv('flex-block4')}>
                                    <div className={cv('shopname')}>
                                        Yêu thích+
                                    </div>
                                    <div className={cv('shopname2')}>
                                        {itemDetailOrder.shopName.name}
                                    </div>
                                    <div className={cv('shopname3')}>
                                        xem shop
                                    </div>
                                </div>
                                {i == 0 && <div className={cv('flex-block4')}>
                                    <div>Mã đơn:{itemOrder.idOrder}</div>
                                    <div className={cv('text2')}>Đơn hàng đang xử lí</div>
                                    <div>Hoàn thành</div>
                                </div>
                                }
                            </div>
                            {
                                itemDetailOrder.listProduct.map((itemProductDetailOrder) => {
                                    return <div className={cv('flex-block', 'block1')}>
                                        <div Style='flex-grow:1'>
                                            <img className={cv('product-image')}
                                                src={url + 'img/products/' + itemProductDetailOrder.Product.image} />
                                        </div>
                                        <div Style='flex-grow:200;padding-left:10px'>
                                            <div className={cv('product-name')}>
                                                {itemProductDetailOrder.Product.name}
                                            </div>
                                            <div className={cv('product-type')}>
                                                Phân loại hàng: Xám,XXL(68-82kg)
                                            </div>
                                            <div>
                                                x{itemProductDetailOrder.quantity}
                                            </div>
                                        </div>
                                        <div Style='flex-grow:1'>
                                            <div className={cv('product-price')}>
                                                ₫{itemProductDetailOrder.price}
                                            </div>
                                        </div>
                                    </div>
                                })
                            }
                        </div>
                    })
                    }
                    <div Style='padding:12px 0px' className={cv('flex-block3')}>
                        <div Style='padding-right:20px;'>Thành tiền:</div>
                        <div Style='font-size:24px' className={cv('product-price')}>
                            {itemOrder.totalPrice}
                        </div>
                    </div>
                    <div Style='padding:12px 0px' className={cv('flex-block3')}>
                        <div className={cv('btn-1')}>
                            Mua Lại
                        </div>
                        <div className={cv('btn-2')}>
                            Liên Hệ Người Bán
                        </div>
                    </div>
                </div>
            })
        )
    }
    return (
        <div Style='width:75%'>
            <div className={cv('distance')}>
                <div className={cv('flex-block2')}>
                    <div className={cv('text')}>Tất cả</div>
                    <div className={cv('text')}>Chờ thanh toán</div>
                    <div className={cv('text')}>Vận chuyển</div>
                    <div className={cv('text')}>Chờ giao hàng</div>
                    <div className={cv('text')}>Đã giao</div>

                </div>
            </div>
            <div Style='background-color:#eaeaea' className={cv('distance')}>
                <div className={cv('flex-block')}>
                    <i class="fa-solid fa-magnifying-glass fa-lg" Style="color: #9baac5;"></i>
                    <input placeholder='Tìm sản phẩm tại đây' className={cv('search-purchase')}></input>
                </div>
            </div>
            {listOrder()}
        </div>
    );
}
export default WrapperPurchase;