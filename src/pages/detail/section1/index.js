import { useState, useEffect } from 'react';
import axios from 'axios';
import classNames from 'classnames/bind'
import Slider from "react-slick";
import objStyle from './index.module.scss'
import { LeftArrow, RightArrow } from '../../home/section';
import Star from './star';
function Section1(obj) {
    let cv = classNames.bind(objStyle);
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
    for (let i = 0; i < 20; i++) {
        arrImg.push(1)
    }
    let listImgSlider = () => {
        return arrImg.map(() => {
            return (
                <div className={cv('item-img')}>
                    <img src='./DetailProduct/Section1-img/img1.jpg' />
                </div>
            )
        })
    }
    return (
        <div className={cv('section-1')}>
            <div className={cv('section-1-image')}>
                <img src='./DetailProduct/Section1-img/img1.jpg' />
                <div className={cv('section-1-image-slider')}>
                    <Slider {...settings}>
                        {listImgSlider()}
                    </Slider>
                </div>
            </div>
            <div className={cv('section-1-detail-product')}>
                <div className={cv('title')}>
                    Bộ Thun polo thích hợp mặc đi chơi, dã ngoại phong cách Ulzzang AO11
                </div>
                <div className={cv('wrap-flex')}>
                    <div className={cv('wrap-star')}>
                        <span>5.0</span>
                        <Star
                            rating={2}
                        />
                    </div>
                    <div className={cv('wrap-feedback')}>
                        <span>7 đánh giá</span>
                    </div>
                    <div className={cv('wrap-sold')}>
                        <span>95 đã bán</span>
                    </div>
                </div>
                <div className={cv('wrap-select')}>
                    <div className={cv('wrap-price')}>
                        <div>đ70.000</div>
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
                        <div>60041 sản phẩm có sẵn</div>
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