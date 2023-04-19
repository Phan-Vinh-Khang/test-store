import { useState, useEffect } from 'react';
import axios from 'axios';
import objStyle from './index.module.scss'
import classNames from 'classnames/bind'
import NavHeader from '../nav';
import ContentHeader from '../content';
function WrapperHeader() {
    let cv = classNames.bind(objStyle)
    return (
        <div className={cv('wrapper')}>
            <div className={cv('wrapper-center')}>
                <NavHeader></NavHeader>
                <ContentHeader></ContentHeader>
            </div>

        </div>
    );
}

export default WrapperHeader;