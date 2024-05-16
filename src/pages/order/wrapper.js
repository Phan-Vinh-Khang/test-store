import { useState, useEffect, useRef } from 'react';
import classNames from 'classnames/bind'
import objStyle from './index.module.scss'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useDispatch, useSelector } from 'react-redux';
import _, { cloneDeep } from 'lodash'
import { useNavigate } from 'react-router-dom';
import { REACT_APP_API_SERVER_URL } from '../../urlServer';
import WrapperPurchase from './purchase/wrapper';
let cv = classNames.bind(objStyle);
const url = REACT_APP_API_SERVER_URL;
function WrapperOrder() {
    const user = useSelector((state) => {
        return state.dataLogged
    })
    return (
        <div className={cv('wrapper', 'flex-block')}>
            <div Style='width:17%'>
                <div Style='padding:24px 0px' className={cv('flex-block')}>
                    {(user.image && <img
                        className={cv('user-avatar')}
                        src={url + 'avatar/' + user.image}
                    />) || <i className={cv('user-avatar') + " fa-regular fa-circle-user fa-2xl"}
                        Style="color: #c8d8f4;border: none;"
                        />
                    }
                    <div className={cv('user-block')}>
                        <div
                            title={user.name}
                            className={cv('user-name')}
                        >
                            {user.name}
                        </div>
                        <div className={cv('user-option')}>Sửa Hồ Sơ</div>
                    </div>
                </div>
            </div>
            <WrapperPurchase />
        </div>
    );
}
export default WrapperOrder;