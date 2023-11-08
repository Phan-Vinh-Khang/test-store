import { useState, useEffect } from 'react';
import axios from 'axios';
import objStyle from './index.module.scss'
import classNames from 'classnames/bind'
import NavHeader from '../nav';
import ContentHeader from '../content';
import { useSelector, useDispatch } from 'react-redux';
function WrapperHeader() {
    let cv = classNames.bind(objStyle)
    let checkStickyHeader = useSelector((state) => {
        return state.checkStickyHeader.checkStickyHeader
    })
    return (
        <div className={checkStickyHeader ? cv('wrapper') + ' ' + cv('stickyHeader') : cv('wrapper')}>
            <div className={cv('wrapper-center')}>
                <NavHeader></NavHeader>
                <ContentHeader></ContentHeader>
            </div>

        </div>
    );
}

export default WrapperHeader;