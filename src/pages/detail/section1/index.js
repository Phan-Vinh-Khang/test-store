import { useState, useEffect } from 'react';
import axios from 'axios';
import classNames from 'classnames/bind'
import Slider from "react-slick";
import objStyle from './index.module.scss'
import { LeftArrow, RightArrow } from '../../home/section';
import Star from './star';
import { useParams } from 'react-router-dom';
import { detailProduct } from '../../../services/productServices';
let cv = classNames.bind(objStyle);
const url = 'http://localhost:3001/img/products/'
function Section1(obj) {
    const { id } = useParams(); //parmas sẽ ref vào :id của url
    let [stateProduct, setStateProduct] = useState({});
    console.log(stateProduct)
    useEffect(() => {
        let fetchData = async () => {
            try {
                const product = (await detailProduct(id)).data.product;
                setStateProduct(product)
            } catch (e) {
                alert(e.response.data)
            }
        }
        fetchData();
    }, [])
    let [stateInput, setStateInput] = useState(1);
    let increment = () => {
        setStateInput(stateInput + 1)
    }
    let decrement = () => {
        if (stateInput > 1)
            setStateInput(stateInput - 1)
    }
    let incrementByAmount = (e) => {
        let isNumber = Number.isSafeInteger(Number(e.target.value))
        console.log(typeof (isNumber))
        if (isNumber) {
            setStateInput(Number(e.target.value)) //neu input a2 sẽ error
        }
    }
    let settings = {
        dots: false,
        infinite: false,
        speed: 600,
        slidesToShow: 5,
        slidesToScroll: 1,
        prevArrow: <LeftArrow className1={cv('slick-arrow') + ' ' + cv('left')} />, //properties ref vào sẽ thêm vào các properties có sẵn vào funcreturnvềelement
        nextArrow: <RightArrow className1={cv('slick-arrow') + ' ' + cv('right')} /> //properties ref vào sẽ thêm vào các properties có sẵn vào funcreturnvềelement

    };
    let arrImg = [];
    arrImg.push(stateProduct.image)
    console.log(arrImg[0])
    let listImgSlider = () => {
        return arrImg.map((item) => {
            return (
                <div className={cv('item-img')}>
                    <img src={url + item} />
                </div>
            )
        })
    }
    return (
        <div className={cv('section-1')}>
            <div className={cv('section-1-image')}>
                <img src='/DetailProduct/Section1-img/img1.jpg' />
                <div className={cv('section-1-image-slider')}>
                    <Slider {...settings}>
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
                        <button className={cv('btn2')}>Mua ngay</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Section1;