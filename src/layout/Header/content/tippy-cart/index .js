import { useState, useEffect } from 'react';
import axios from 'axios';
import classNames from 'classnames/bind'
import objStyle from './index.module.scss'
import { getcart } from '../../../../services/orders';
import { REACT_APP_API_SERVER_URL } from '../../../../urlServer'
let cv = classNames.bind(objStyle)
const url = REACT_APP_API_SERVER_URL;
function TippyCart() {
    let [stateCart, setStateCart] = useState([])
    useEffect(() => {
        let fetchData = async () => {
            try {
                let data = (await getcart()).data.listCart;
                let arr = []
                for (let i = 0; i < data.length; i++) {
                    arr.push({ shop: false, checkQuantity: 0, listproduct: new Array(data[i].listproduct.length).fill(false) })
                }
                setStateCart(data)
            }
            catch (e) {
                console.log(e)
            }
        }
        fetchData();
    }, [])
    const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'VND',
    });
    var listCart = () => {
        return <>
            <div className={cv('name')}>
                Các sản phẩm trong giỏ
            </div>
            {stateCart?.map(item => {
                return item.listproduct.map((itemProduct) => {
                    return <div className={cv('cart')}>
                        <div className={cv('product')}>
                            <img className={cv('product-image')}
                                src={url + 'img/products/' + itemProduct.image} />
                            <span className={cv('product-name')}>
                                {itemProduct.name}
                            </span>
                            <span className={cv('product-price')}>
                                {formatter.format(itemProduct.price - (itemProduct.price / 100 * itemProduct.discount))}
                            </span>
                        </div>
                    </div>
                })
            })}
        </>
    }
    return (
        <div>
            {
                (stateCart.length == 0) ?
                    (<div className={cv('size-NoProducts')}>
                        Chưa Có Sản Phẩm
                    </div>)
                    : (<div className={cv('size-Products')}><div>{stateCart[stateCart.length - 1].type}</div>{listCart()} </div>)
            }

        </div>
    )
}
export default TippyCart