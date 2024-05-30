import { useState, useEffect } from 'react';
import axios from 'axios';
import classNames from 'classnames/bind';
import objStyle from './index.module.scss';
import allproduct from '../../../services/productServices';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Pagination from 'react-bootstrap/Pagination';
import { setPage } from '../../../redux/reduxPages';
import { REACT_APP_API_SERVER_URL } from '../../../urlServer';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';

let cv = classNames.bind(objStyle);
const url = REACT_APP_API_SERVER_URL;

function AccoutManagment() {
    let user = useSelector((state) => {
        return state.dataLogged;
    });
    let email = maskEmail(user.email)
    console.log(user);
    return (
        <div className={cv('container')}>
            <div className={cv('title-account')}>
                <h5 style={{ marginBottom: 0 }}>Hồ Sơ Của Tôi</h5>
                <div>Quản lý thông tin hồ sơ để bảo mật tài khoản</div>
            </div>
            <div className={cv('form-container')}>
                <Form>
                    <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
                        <Form.Label column sm="2" style={{ textAlign: 'right' }}>
                            Tên đăng nhập
                        </Form.Label>
                        <Form.Control
                            style={{ width: '200px', outline: 'none', textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}
                            plaintext
                            readOnly
                            value={email}
                        />
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3">
                        <Form.Label style={{ textAlign: 'right' }} column sm="2">
                            Tên
                        </Form.Label>
                        <Form.Control style={{ width: '200px' }} type="text" value={user.name} />
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3">
                        <Form.Label style={{ textAlign: 'right' }} column sm="2">
                            Số điện thoại
                        </Form.Label>
                        <Form.Control
                            style={{ width: '200px', outline: 'none', textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}
                            readOnly
                            plaintext
                            type="text"
                            value={user.phone}
                        />
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3">
                        <Form.Label style={{ textAlign: 'right' }} column sm="2">
                            Địa chỉ
                        </Form.Label>
                        <Form.Control
                            style={{ width: '200px', outline: 'none', textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}
                            type="text"
                            placeholder="Normal text"
                            value={user.adress}
                        />
                    </Form.Group>
                </Form>
            </div>
        </div>
    );
}
function maskEmail(email) {
    const emailParts = email.split('@');
    const [emailName, emailDomain] = emailParts;
    const maskedName = emailName.slice(0, 2) + '*'.repeat(emailName.length - 2);
    return `${maskedName}@${emailDomain}`;
}
export default AccoutManagment;
