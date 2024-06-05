import { useState, useEffect } from 'react';
import axios from 'axios';
import classNames from 'classnames/bind'
import objStyle from './index.module.scss'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { REACT_APP_API_SERVER_URL } from '../../../urlServer';
let cv = classNames.bind(objStyle);
const url = REACT_APP_API_SERVER_URL + 'img/products/'
function Section3({ stateProduct }) {
    return (
        <div className={cv('section-3')}>
            <div className={cv('des-title')}>
                MÔ TẢ SẢN PHẨM
            </div>
            <div className={cv('des-detail')}>
                {stateProduct?.des}
            </div>
        </div>);
}

export default Section3;