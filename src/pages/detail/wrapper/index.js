import { useState, useEffect } from 'react';
import axios from 'axios';
import classNames from 'classnames/bind'
import Slider from "react-slick";
import objStyle from './index.module.scss'
import { useSelector, useDispatch } from 'react-redux';
let w = 1;
function WrapperDetail(obj) {
    let dispatch = useDispatch();
    console.log('detail: ', useSelector((state) => {
        return state;
    }))
    if (w == 1) {
        dispatch({
            type: 'checkStickyHeader',
            data: '/detail'
        })
        w++;
    }
    let cv = classNames.bind(objStyle);
    return (
        <div className={cv('wrapper')}>
            test detail
        </div>
    );
}

export default WrapperDetail;