import { useState, useEffect } from 'react';
import axios from 'axios';
import objStyle from './index.module.scss'
import classNames from 'classnames/bind'
import Carousel from 'react-bootstrap/Carousel';
import './index.scss'
function Banner() {
    let cv = classNames.bind(objStyle)
    return (
        <div className={cv('wrapper')}>
            <div className={cv('wrapper-center')}>
                <div className={cv('wrap-banner1')}>
                    <Carousel
                        fade
                        touch
                        interval={3000}
                        nextIcon={<span className='wrapIcon'>
                            <span aria-hidden="true" className="carousel-control-next-icon" />

                        </span>}
                        prevIcon={<span className='wrapIcon'>
                            <span aria-hidden="true" className="carousel-control-prev-icon" />

                        </span>}
                    >
                        <Carousel.Item>
                            <a href='/'>
                                <img
                                    className={cv('d-block w-100')}
                                    src="/bannerSection/slide-banner1.png"
                                />
                            </a>
                        </Carousel.Item>
                        <Carousel.Item>
                            <a href='/'>
                                <img
                                    className={cv('d-block w-100')}
                                    src="/bannerSection/slide-banner2.jpg"
                                />
                            </a>
                        </Carousel.Item>
                        <Carousel.Item>
                            <a href='/'>
                                <img
                                    className={cv('d-block w-100')}
                                    src="/bannerSection/slide-banner3.png"
                                />
                            </a>
                        </Carousel.Item>
                    </Carousel>
                </div>
                <div className={cv('wrap-banner2')}>
                    <div className={cv('wrap-img')}>
                        <a href='/'>
                            <img src="/bannerSection/banner1.jpg" />
                        </a>
                    </div>
                    <div className={cv('wrap-img')}>
                        <a href='/'>
                            <img src="/bannerSection/banner2.jpg" />
                        </a>
                    </div>
                </div>
                <div className={cv('wrap-list')}>
                    <div className={cv('list-item')}>
                        <a href='/'><img src='/bannerSection/icon1.png' /></a>
                        <div className={cv('text-item')}>
                            Gì Cũng Rẻ - Mua Là
                            <p> Freeship </p>
                        </div>
                    </div>
                    <div className={cv('list-item')}>
                        <a href='/'><img src='/bannerSection/icon2.png' /></a>
                        <div className={cv('text-item')}>
                            Mã Giảm Giá
                        </div>
                    </div>
                    <div className={cv('list-item')}>
                        <a href='/'><img src='/bannerSection/icon3.png' /></a>
                        <div className={cv('text-item')}>
                            Thứ 4 Freeship - x4 Ưu
                            <p> Đãi </p>
                        </div>
                    </div>
                    <div className={cv('list-item')}>
                        <a href='/'><img src='/bannerSection/icon4.png' /></a>
                        <div className={cv('text-item')}>
                            Bắt Trend - Giá Sốc
                        </div>
                    </div>
                    <div className={cv('list-item')}>
                        <a href='/'><img src='/bannerSection/icon5.png' /></a>
                        <div className={cv('text-item')}>
                            Voucher Giảm Đến
                            <p> 200.000Đ </p>
                        </div>
                    </div>
                    <div className={cv('list-item')}>
                        <a href='/'><img src='/bannerSection/icon6.png' /></a>
                        <div className={cv('text-item')}>
                            Hàng Hiệu Giá Tốt
                        </div>
                    </div>
                    <div className={cv('list-item')}>
                        <a href='/'><img src='/bannerSection/icon7.png' /></a>
                        <div className={cv('text-item')}>
                            Hàng Quốc Tế
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

}
export default Banner