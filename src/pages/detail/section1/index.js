import { useState, useEffect } from 'react';
import axios from 'axios';
import classNames from 'classnames/bind'
import Slider from "react-slick";
import objStyle from './index.module.scss'
import { LeftArrow, RightArrow } from '../../home/section';
function Section1(obj) {
    let cv = classNames.bind(objStyle);
    let settings = {
        dots: false,
        infinite: false,
        speed: 600,
        slidesToShow: 5,
        slidesToScroll: 1,
        prevArrow: <LeftArrow className1={cv('slick-arrow') + ' ' + cv('left')} />, //properties ref vào sẽ thêm vào các properties có sẵn vào funcreturnvềelement
        nextArrow: <RightArrow className1={cv('slick-arrow') + ' ' + cv('right')} /> //properties ref vào sẽ thêm vào các properties có sẵn vào funcreturnvềelement

    };
    return (
        <div className={cv('section-1')}>
            <div className={cv('section-1-image')}>
                <img src='./DetailProduct/Section1-img/img1.jpg' />
                <div className={cv('section-1-image-slider')}>
                    <Slider {...settings}>
                        <div className={cv('item-img')}>
                            <img src='./DetailProduct/Section1-img/img1.jpg' />
                        </div>
                        <div className={cv('item-img')}>
                            <img src='./DetailProduct/Section1-img/img1.jpg' />
                        </div>
                        <div className={cv('item-img')}>
                            <img src='./DetailProduct/Section1-img/img1.jpg' />
                        </div>
                        <div className={cv('item-img')}>
                            <img src='./DetailProduct/Section1-img/img1.jpg' />
                        </div>
                        <div className={cv('item-img')}>
                            <img src='./DetailProduct/Section1-img/img1.jpg' />
                        </div>
                        <div className={cv('item-img')}>
                            <img src='./DetailProduct/Section1-img/img1.jpg' />
                        </div>
                        <div className={cv('item-img')}>
                            <img src='./DetailProduct/Section1-img/img1.jpg' />
                        </div>
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
                        <svg>
                            <polygon points="7.5 .8 9.7 5.4 14.5 5.9 10.7 9.1 11.8 14.2 7.5 11.6 3.2 14.2 4.3 9.1 .5 5.9 5.3 5.4"
                            />
                        </svg>
                        <svg>
                            <polygon points="7.5 .8 9.7 5.4 14.5 5.9 10.7 9.1 11.8 14.2 7.5 11.6 3.2 14.2 4.3 9.1 .5 5.9 5.3 5.4"
                            />
                        </svg>
                        <svg>
                            <polygon points="7.5 .8 9.7 5.4 14.5 5.9 10.7 9.1 11.8 14.2 7.5 11.6 3.2 14.2 4.3 9.1 .5 5.9 5.3 5.4"
                            />
                        </svg>
                        <svg>
                            <polygon points="7.5 .8 9.7 5.4 14.5 5.9 10.7 9.1 11.8 14.2 7.5 11.6 3.2 14.2 4.3 9.1 .5 5.9 5.3 5.4"
                            />
                        </svg>
                        <svg>
                            <polygon points="7.5 .8 9.7 5.4 14.5 5.9 10.7 9.1 11.8 14.2 7.5 11.6 3.2 14.2 4.3 9.1 .5 5.9 5.3 5.4"
                            />
                        </svg>
                    </div>
                    <div className={cv('wrap-feedback')}>
                        <span>7 đánh giá</span>
                    </div>
                    <div className={cv('wrap-sold')}>
                        <span>95 đã bán</span>
                    </div>
                </div>
                <div className={cv('wrap-price')}>
                    <div>đ70.000</div>
                </div>
                <div className={cv('wrap-select')}>

                </div>
            </div>
        </div>
    );
}

export default Section1;