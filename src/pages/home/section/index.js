import { useState, useEffect } from 'react';
import axios from 'axios';
import objStyle from './index.module.scss'
import classNames from 'classnames/bind'
import Slider from "react-slick";
function Section() {
    let cv = classNames.bind(objStyle)
    var settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 2,
        slidesToScroll: 1
    };
    return (
        <div className={cv('wrapper')}>
            <Slider {...settings}
            >
                <div>1</div>
                <div>2</div>
                <div>3</div>
                <div>4</div>
            </Slider>
        </div>
    );
}

export default Section;