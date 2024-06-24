import { useState, useEffect } from 'react';
import { Routes, Route, Navigate, Link } from 'react-router-dom'
import classNames from 'classnames/bind'
import objStyle from './index.module.scss'
import WrapperPurchase from './purchase/wrapper';
import AccoutManagment from './account';
import { REACT_APP_API_SERVER_URL } from '../../urlServer';
import { useSelector } from 'react-redux';
let cv = classNames.bind(objStyle);
const url = REACT_APP_API_SERVER_URL;
function Profile() {
    const user = useSelector((state) => {
        return state.dataLogged;
    })
    return (
        <div className={cv('wrapper')}>
            <div className={cv('profile-bar')}>
                <div Style='display:flex;align-items:center'>
                    <div Style='height:70px;width:35%'>
                        <img src={url + '/avatar/' + user.image}></img>
                    </div>
                    <div Style='padding-left:8px'>
                        <div>{user.name}</div>
                        <Link to="/profile">Chỉnh sửa hồ sơ</Link>
                    </div>
                </div>
            </div>
            <Routes>
                <Route path='/account' element={<AccoutManagment></AccoutManagment>} />
                <Route path='/purchase' element={<WrapperPurchase></WrapperPurchase>} />

                <Route path='*' element={<Navigate to='/profile/account'></Navigate>} />
            </Routes>
        </div>
    );
}

export default Profile;