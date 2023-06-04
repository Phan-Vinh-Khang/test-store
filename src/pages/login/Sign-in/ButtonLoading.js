import React from 'react';
import { useState, useContext } from 'react';
import axios from 'axios';
import objStyle from './index.module.scss'
import classNames from 'classnames/bind'
import RingLoader from "react-spinners/RingLoader";
let cv = classNames.bind(objStyle);
function ButtonLoading({ onClick, isLoading }) {
    const CSSProperties = {
        display: "block",
        margin: "0 auto",
        borderColor: "red",
    };
    return (
        <button onClick={onClick} className='btn' type="button">
            <span>Đăng nhập
                <RingLoader
                    color='gray'
                    loading={isLoading}
                    size={20}
                    aria-label="Loading RingLoader"
                    data-testid="loader"
                    speedMultiplier={.9}
                />
            </span>
        </button>
    );
}

export default ButtonLoading;

