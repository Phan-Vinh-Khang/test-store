import { useState, useEffect, useRef } from 'react';
import classNames from 'classnames/bind'
import objStyle from './index.module.scss'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { getcart } from '../../services/orders';
import { useDispatch, useSelector } from 'react-redux';
import { setlistOrder } from '../../redux/reduxOrder';
import { useNavigate } from 'react-router-dom';
import { REACT_APP_API_SERVER_URL } from '../../urlServer';
import { deleteCartAPI } from '../../services/orders';
let cv = classNames.bind(objStyle);
const url = REACT_APP_API_SERVER_URL;
function WrapperCart() {
    let isLogin = useSelector((state) => {
        return state.dataLogged
    })
    if (JSON.stringify(isLogin) == '{}') {
        window.location.href = '/login'
    }
    let [stateCart, setStateCart] = useState([])
    let [stateRefresh, setStateRefresh] = useState(false)
    let [stateBtn, setStateBtn] = useState(true)
    let [stateChexkbox, setStateChexkbox] = useState([{}])
    let dispatch = useDispatch()
    let listorder = useSelector((state) => {
        return state.listOrder
    })
    let navigate = useNavigate()
    let totalPrice = 0;
    const { format } = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'VND',
    });
    useEffect(() => {
        let fetchData = async () => {
            try {
                let data = await (await getcart()).data.listCart;
                let arr = [];
                for (let i = 0; i < data.length; i++) {
                    arr.push({ shop: false, checkQuantity: 0, listproduct: new Array(data[i].listproduct.length).fill(false) })
                }
                setStateChexkbox(arr);
                setStateCart(data);
            }
            catch (e) {
                console.log(e.response.data)
            }
        }
        fetchData();
    }, [stateRefresh])
    let increment = (i, z) => {
        if (stateCart[i].listproduct[z].cartQuantity + 1 <= stateCart[i].listproduct[z].quantity) {
            stateCart[i].listproduct[z].cartQuantity++
            setStateCart([...stateCart])
        }
    }
    let decrement = (i, z) => {
        if (stateCart[i].listproduct[z].cartQuantity > 1) {
            stateCart[i].listproduct[z].cartQuantity--
            setStateCart([...stateCart])
        }
    }
    for (let i = 0; i < stateChexkbox.length; i++) {
        if (stateChexkbox[i].checkQuantity > 0) {
            stateBtn = false;
            break;
        }
        stateBtn = true
    }
    let selectall = (e) => {
        if (e.target.checked) {
            stateChexkbox.map((item) => {
                item.listproduct = new Array(item.listproduct.length).fill(true)
                item.shop = true;
                item.checkQuantity = item.listproduct.length
            })
        } else {
            stateChexkbox.map((item) => {
                item.listproduct = new Array(item.listproduct.length).fill(false)
                item.shop = false;
                item.checkQuantity = 0
            })
        }
        setStateChexkbox([...stateChexkbox])
    }
    let setInput = (i, z, input) => {
        input = Number(input)
        if (input > -1) {
            if (input <= stateCart[i].listproduct[z].quantity)
                stateCart[i].listproduct[z].cartQuantity = input;
            else
                stateCart[i].listproduct[z].cartQuantity = stateCart[i].listproduct[z].quantity;
            setStateCart([...stateCart])
        }
    }
    let removeCart = async (listProduct) => {
        let arr = listProduct.map((item) => {
            return item.id;
        })
        try {
            if (window.confirm(`Bạn muốn xóa ${arr.length > 1 ? `${arr.length} sản phẩm? ` : `'${listProduct[0].name}'?`}`)) {
                await deleteCartAPI(arr)
                setStateRefresh(!stateRefresh)
            }
        } catch (e) {
            console.log(e)
        }
    }
    let selectshop = (e, i) => {
        if (e.target.checked) {
            stateChexkbox[i].listproduct = new Array(stateChexkbox[i].listproduct.length).fill(true)
            stateChexkbox[i].shop = true;
            stateChexkbox[i].checkQuantity = stateChexkbox[i].listproduct.length
        }
        else {
            stateChexkbox[i].listproduct = new Array(stateChexkbox[i].listproduct.length).fill(false)
            stateChexkbox[i].shop = false;
            stateChexkbox[i].checkQuantity = 0
        }
        setStateChexkbox([...stateChexkbox])
    }
    let selectlistproduct = (e, i, z) => {
        if (e.target.checked) {
            stateChexkbox[i].listproduct[z] = true
            stateChexkbox[i].checkQuantity += 1
            if (stateChexkbox[i].checkQuantity == stateChexkbox[i].listproduct.length) {
                stateChexkbox[i].shop = true
            }
        }
        else {
            stateChexkbox[i].checkQuantity -= 1
            stateChexkbox[i].shop = false;
            stateChexkbox[i].listproduct[z] = false;
        }
        setStateChexkbox([...stateChexkbox])

    }
    let order = () => {
        let data = [];
        for (let i = 0; i < stateChexkbox.length; i++) {
            let arr = []
            for (let z = 0; z < stateChexkbox[i].listproduct.length; z++) {
                if (stateChexkbox[i].listproduct[z]) {
                    stateCart[i].listproduct[z].selectQuantity = stateCart[i].listproduct[z].cartQuantity
                    arr.push(stateCart[i].listproduct[z])
                }
            }
            if (arr.length > 0) {
                data.push({ shop: stateCart[i].shop, listproduct: arr })
            }
        }
        dispatch(setlistOrder(data))
        navigate('/checkout')
    }
    let listCart = () => {
        return stateCart.map((item, i) => {
            return <div className={cv('distance')}>
                <div className={cv('flex-block', 'block1')}>
                    <Form.Check
                        checked={stateChexkbox[i].shop}
                        onClick={(e) => { selectshop(e, i, item.shop.id) }}
                        Style='margin-right:12px' aria-label="option 1" />
                    <span className={cv('shopname')}>Yêu thích+</span>
                    <span Style='width:100%' className={cv('shopname2')}>{item.shop.name}</span>
                    <i onClick={() => removeCart(stateCart[i].listproduct)} class="fa-solid fa-trash"></i>
                </div>
                {
                    item.listproduct.map((itemShop, z) => {
                        if (stateChexkbox[i].listproduct[z]) {
                            totalPrice += itemShop.price * itemShop.cartQuantity
                        }
                        return <div className={cv('flex-block')}>
                            <div className={cv('flex-block1', 'block1')}>
                                <Form.Check
                                    onClick={(e) => { selectlistproduct(e, i, z, item.shop.id) }}
                                    checked={stateChexkbox[i].listproduct[z]}
                                    Style='margin-right:12px'
                                    aria-label="option 1" />
                                <div className={cv('product', 'flex-block')}>
                                    <img
                                        className={cv('product-image')}
                                        src={url + 'img/products/' + itemShop.image} />
                                    <span className={cv('product-name')} Style='margin-right:12px'>
                                        {`${itemShop.name} (-${itemShop.discount}%)`}
                                    </span>
                                </div>
                                <div className={cv('flex-block4')} >
                                    select type
                                </div>
                            </div>
                            <div className={cv('flex-block2')}>
                                <div className={cv('block-text')}>{format(itemShop.price)}</div>
                                <div className={cv('flex-block4', 'amount')}>
                                    <button onClick={() => decrement(i, z)}>-</button>
                                    <input
                                        onChange={({ target }) => setInput(i, z, target.value)}
                                        value={itemShop.cartQuantity}

                                    />
                                    <button onClick={() => increment(i, z)}>+</button>
                                </div>
                                <div className={cv('block-text')}>còn {itemShop.quantity} sản phẩm</div>
                                <div className={cv('block-text')}>{format(itemShop.price * itemShop.cartQuantity)}</div>
                                <i onClick={() => removeCart([stateCart[i].listproduct[z]])} class="fa-solid fa-trash" />
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
                        <Form.Check onClick={(e) => { selectall(e) }} Style='margin-right:12px' aria-label="option 1" />
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
                            Xóa
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
                            ₫0
                        </div>
                    </div>
                </div>
                <div className={cv('flex-block', 'block1')}>
                    <div className={cv('flex-block1')}>
                        <Form.Check onClick={(e) => { selectall(e) }} Style='margin-right:12px' aria-label="option 1" />

                        <div className={cv('flex-block1')}>
                            Chọn Tất Cả
                        </div>
                        <div className={cv('flex-block1')}>
                            lưu vào mục Đã thích
                        </div>
                    </div>
                    <div className={cv('flex-block3')}>
                        <div >Tổng thanh toán (0 Sản phẩm):
                        </div>
                        <div Style='margin-left:12px'>
                            {format(totalPrice)}
                        </div>
                        <Button onClick={order}
                            disabled={stateBtn}
                            className={cv('btn-order')} variant="warning">Mua hàng</Button>{' '}
                    </div>
                </div>
            </div>
        </div>
    );
}
export default WrapperCart;