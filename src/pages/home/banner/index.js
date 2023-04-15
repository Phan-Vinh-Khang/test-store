import { useState, useEffect } from 'react';
import axios from 'axios';
import objStyle from './index.module.scss'
import classNames from 'classnames/bind'
import Carousel from 'react-bootstrap/Carousel';
function Banner() {
    let cv = classNames.bind(objStyle)
    return (
        <div className={cv('wrapper')}>
            <div className={cv('wrap-banner1')}>
                <Carousel fade touch>
                    <Carousel.Item>
                        <img
                            className={cv('d-block w-100')}
                            src="./slide-banner1.png"
                        />
                    </Carousel.Item>
                    <Carousel.Item>
                        <img
                            className={cv('d-block w-100')}
                            src="./slide-banner2.jpg"
                        />
                    </Carousel.Item>
                    <Carousel.Item>
                        <img
                            className={cv('d-block w-100')}
                            src="./slide-banner3.png"
                        />
                    </Carousel.Item>
                </Carousel>
            </div>
            <div className={cv('wrap-banner2')}>
                <div>
                    <img src="./banner1.png" />
                </div>
                <div>
                    <img src="./banner2.jpg" />
                </div>
            </div>
        </div>
    );

}
export default Banner