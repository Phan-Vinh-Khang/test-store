import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import classNames from 'classnames/bind'
import Slider from "react-slick";
import objStyle from './index.module.scss'
import { LeftArrow, RightArrow } from '../../home/section';
import Star from './star';
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { setlistOrder } from '../../../redux/reduxOrder'
import lodash from 'lodash'
import { addCart } from '../../../services/orders';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { REACT_APP_API_SERVER_URL } from '../../../urlServer';
let cv = classNames.bind(objStyle);
const url = REACT_APP_API_SERVER_URL + 'img/products/'
function Section1({ stateProduct }) {
    let navigate = useNavigate()
    let [stateidxSlide, setStateidxSlide] = useState(0);
    let [stateInput, setStateInput] = useState(1);
    const sliderRef = useRef(0);
    let dispatch = useDispatch()
    const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'VND',
    });
    if (sliderRef.current) {
        sliderRef.current.slickGoTo(stateidxSlide);
    }
    if (stateProduct.product?.quantity < 1) {
        stateInput = 0;
    }
    let increment = () => {
        if (stateInput + 1 <= stateProduct.product.quantity)
            setStateInput(stateInput + 1)
    }
    let decrement = () => {
        if (stateInput > 1)
            setStateInput(stateInput - 1)
    }
    let incrementByAmount = (e) => {
        let number = Number(e.target.value);
        let isNumber = Number.isSafeInteger(number)
        if (isNumber) {
            if (number > 0 && number <= stateProduct.product.quantity)
                setStateInput(number) //neu input a2 sẽ error
            else {
                if (number > stateProduct.product.quantity)
                    setStateInput(stateProduct.product.quantity)
                else
                    setStateInput('')
            }
        }
    }
    let settingsListImage = {
        dots: false,
        infinite: false,
        speed: 600,
        slidesToShow: 5,
        slidesToScroll: 1,
        prevArrow: <LeftArrow className1={cv('slick-arrow') + ' ' + cv('left')} />, //properties ref vào sẽ thêm vào các properties có sẵn vào funcreturnvềelement
        nextArrow: <RightArrow className1={cv('slick-arrow') + ' ' + cv('right')} /> //properties ref vào sẽ thêm vào các properties có sẵn vào funcreturnvềelement

    };
    let settingsImage = {
        dots: false,
        infinite: true,
        speed: 600,
        slidesToShow: 1,
        slidesToScroll: 1,
        prevArrow: <LeftArrow className1={cv('slick-arrow') + ' ' + cv('left')} />, //properties ref vào sẽ thêm vào các properties có sẵn vào funcreturnvềelement
        nextArrow: <RightArrow className1={cv('slick-arrow') + ' ' + cv('right')} /> //properties ref vào sẽ thêm vào các properties có sẵn vào funcreturnvềelement

    };
    let arrImg = [];
    for (let i = 0; i < 20; i++) {
        arrImg.push(stateProduct.product?.image)
    }
    let selectImage = (idx) => {
        setStateidxSlide(idx)
    }
    let navigateCheckout = () => {
        if (stateInput != 0) {
            stateProduct.listproduct = [stateProduct.product]
            stateProduct.listproduct[0].selectQuantity = stateInput
            dispatch(setlistOrder([stateProduct]))
            navigate('/checkout')
        } else {
            toast.error('san pham ko du so luong')
        }
    }
    let listImgSlider = () => {
        return arrImg.map((item, idx) => {
            return (
                <div onClick={() => selectImage(idx)} className={cv('item-img')}>
                    <img src={url + item} />
                </div>
            )
        })
    }
    let addcart = async (id, selectQuantity) => {
        try {
            const { data } = await addCart({ id, selectQuantity })
            toast.success(data.message, {
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
            toast.error(e.response.data.message, {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            })
        }
    }
    return (
        <div className={cv('section-1')}>
            <div className={cv('section-1-image')}>
                <Slider ref={sliderRef} {...settingsImage}>
                    <img src={url + stateProduct.product?.image} />
                    <img src={url + stateProduct.product?.image} />
                    <img src={url + stateProduct.product?.image} />
                    <img src={url + stateProduct.product?.image} />
                </Slider>
                <div className={cv('section-1-image-slider')}>
                    <Slider {...settingsListImage}>
                        {listImgSlider()}
                    </Slider>
                </div>
            </div>
            <div className={cv('section-1-detail-product')}>
                <div className={cv('title')}
                    title={stateProduct.product?.name}
                >
                    {
                        stateProduct.product?.name
                    }
                </div>
                <div className={cv('wrap-flex')}>
                    <div className={cv('wrap-star')}>
                        <span>{stateProduct.product?.star}</span>
                        <Star
                            rating={stateProduct.product?.star}
                        />
                    </div>
                    <div className={cv('wrap-feedback')}>
                        <span>7 đánh giá</span>
                    </div>
                    <div className={cv('wrap-sold')}>
                        <span>{stateProduct.product?.sold}</span>
                    </div>
                </div>
                <div className={cv('wrap-select')}>
                    <div className={cv('wrap-price')}>
                        <div>
                            <span className={cv('price-pre-discount')}>
                                {formatter.format(stateProduct.product?.price)}</span>
                            <span Style='font-weight: 500;'>
                                {formatter.format(stateProduct.product?.price - (stateProduct.product?.price / 100 * stateProduct.product?.discount))}
                            </span>
                            <span className={cv('discount')}> -{stateProduct.product?.discount}%</span>
                        </div>
                    </div>

                    <div className={cv('wrap-flex') + ' ' + cv('flex-gap')}>
                        <div className={cv('gray-color')}>
                            Bảo Hiểm
                        </div>
                        <div>Bảo hiểm Thời trang</div>
                        <div>Tìm hiểu thêm</div>
                    </div>
                    <div className={cv('wrap-flex') + ' ' + cv('flex-gap')}>
                        <div className={cv('gray-color')}>
                            Vận Chuyển
                        </div>
                        <div>Miễn phí vận chuyển</div>
                    </div>
                    <div className={cv('wrap-flex') + ' ' + cv('flex-gap')}>
                        <div className={cv('gray-color')}>
                            Số Lượng
                        </div>
                        <div className={cv('amount')}>
                            <button onClick={decrement} >-</button>
                            <input
                                onChange={(e) => incrementByAmount(e)}
                                value={stateInput}
                            />
                            <button onClick={increment}>+</button>
                        </div>
                        <div>{stateProduct.product?.quantity}</div>
                    </div>
                    <div>
                        <ToastContainer />
                        <button onClick={() => { addcart(stateProduct.product?.id, stateInput) }} className={cv('btn1')}>Thêm vào giỏ hàng</button>
                        <button
                            className={cv('btn2')}
                            onClick={() => { navigateCheckout() }}
                        >Mua ngay</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Section1;