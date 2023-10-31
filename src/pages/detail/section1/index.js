import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import classNames from 'classnames/bind'
import Slider from "react-slick";
import objStyle from './index.module.scss'
import { LeftArrow, RightArrow } from '../../home/section';
import Star from './star';
import { useLocation, useParams } from 'react-router-dom';
import { detailProduct } from '../../../services/productServices';
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { setlistOrder } from '../../../redux/reduxOrder'
import lodash from 'lodash'
let cv = classNames.bind(objStyle);
const url = 'http://localhost:3001/img/products/'
function Section1(obj) {
    const { id } = useParams(); //parmas sẽ ref vào :id của url
    let navigate = useNavigate()
    let [stateProduct, setStateProduct] = useState({});
    let [stateidxSlide, setStateidxSlide] = useState(0);
    const sliderRef = useRef(0);
    let dispatch = useDispatch()
    if (sliderRef.current) {
        sliderRef.current.slickGoTo(stateidxSlide);
    }
    let listorder = useSelector((state) => {
        return state.listOrder.listOrder;
    })
    console.log('listorder', listorder)
    useEffect(() => {
        let fetchData = async () => {
            try {
                let data = (await detailProduct(id)).data;
                setStateProduct(data.product)
                data.listproduct = listorder[0].listproduct
                dispatch(setlistOrder([data]))
            } catch (e) {
                alert(e.response.data)
            }
        }
        fetchData();
    }, [])
    let [stateInput, setStateInput] = useState(1);
    let increment = () => {
        if (stateInput + 1 <= stateProduct.quantity)
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
            if (number > 0 && number <= stateProduct.quantity)
                setStateInput(number) //neu input a2 sẽ error
            else {
                if (number > stateProduct.quantity)
                    setStateInput(stateProduct.quantity)
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
        arrImg.push(stateProduct.image)
    }
    let selectImage = (idx) => {
        setStateidxSlide(idx)
    }
    let navigateCheckout = () => {
        let listorder2 = lodash.cloneDeep(listorder[0])
        listorder2.product.selectQuantity = stateInput;
        listorder2.listproduct = [listorder2.product]
        dispatch(setlistOrder([listorder2]))
        navigate('/checkout')
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
    return (
        <div className={cv('section-1')}>
            <div className={cv('section-1-image')}>
                <Slider ref={sliderRef} {...settingsImage}>
                    <img src={url + stateProduct.image} />
                    <img src={url + stateProduct.image} />
                    <img src={url + stateProduct.image} />
                    <img src={url + stateProduct.image} />
                </Slider>
                <div className={cv('section-1-image-slider')}>
                    <Slider {...settingsListImage}>
                        {listImgSlider()}
                    </Slider>
                </div>
            </div>
            <div className={cv('section-1-detail-product')}>
                <div className={cv('title')}>
                    {
                        stateProduct.name
                    }
                </div>
                <div className={cv('wrap-flex')}>
                    <div className={cv('wrap-star')}>
                        <span>{stateProduct.star}</span>
                        <Star
                            rating={stateProduct.star}
                        />
                    </div>
                    <div className={cv('wrap-feedback')}>
                        <span>7 đánh giá</span>
                    </div>
                    <div className={cv('wrap-sold')}>
                        <span>{stateProduct.sold}</span>
                    </div>
                </div>
                <div className={cv('wrap-select')}>
                    <div className={cv('wrap-price')}>
                        <div>{stateProduct.price}</div>
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
                        <div>{stateProduct.quantity}</div>
                    </div>
                    <div>
                        <button className={cv('btn1')}>Thêm vào giỏ hàng</button>
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