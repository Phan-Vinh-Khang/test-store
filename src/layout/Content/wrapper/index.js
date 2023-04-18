import { useState, useEffect } from 'react';
import axios from 'axios';
import objStyle from './index.module.scss'
import classNames from 'classnames/bind'
function WrapperContent(obj) {
    let cv = classNames.bind(objStyle)
    return (
        <div className={cv('wrapper')}>
            <div className={cv('wrapper-center')}>
                <obj.Element loginName={obj.loginName} />
            </div>
        </div>
    );
}

export default WrapperContent;