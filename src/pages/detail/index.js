import { useState, useEffect } from 'react';
import axios from 'axios';
import classNames from 'classnames/bind'
import Slider from "react-slick";
import objStyle from './index.module.scss'
function Detail(obj) {
    let cv = classNames.bind(objStyle);
    return (
        <div className={cv('wrapper')}>
        </div>
    );
}

export default Detail;