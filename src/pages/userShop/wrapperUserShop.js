import { useState, useEffect } from 'react';
import CreateShop from './createShop';
import classNames from 'classnames/bind'
import objStyle from './index.module.scss'
let cv = classNames.bind(objStyle);
function WrapperUserShop() {
    return (
        <div className={cv('wrapperForm')}>
            <div className={cv('setWidth')}>
                <CreateShop />
            </div>
        </div>
    );
}
export default WrapperUserShop;