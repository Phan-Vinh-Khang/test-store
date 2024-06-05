import { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import objStyle from './index.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { REACT_APP_API_SERVER_URL } from '../../../urlServer';
import 'react-loading-skeleton/dist/skeleton.css';
import { Form, Row, Button } from 'react-bootstrap';
let cv = classNames.bind(objStyle);
const url = REACT_APP_API_SERVER_URL;

function AccoutManagment() {
    let user = useSelector((state) => {
        return state.dataLogged;
    });
    let state = useSelector((state) => {
        return state;
    });
    let email = maskEmail(user.email);
    console.log(state, 'state')
    return (
        <div className={cv('container')}>
            <div className={cv('title-account')}>
                <h5 style={{ marginBottom: 0 }}>Hồ Sơ Của Tôi</h5>
                <div>Quản lý thông tin hồ sơ để bảo mật tài khoản</div>
            </div>
            <div className={cv('form-container')}>
                <Form>
                    <FormGroupCustom
                        propsLabel={{ children: 'Email' }}
                        propsControl={{ value: email, plaintext: true, readOnly: true }}
                    />
                    <FormGroupCustom
                        propsGroup={{ controlId: 'formPlaintextName' }}
                        propsLabel={{ children: 'Tên' }}
                        propsControl={{ value: user.name }}
                    />
                    <FormGroupCustom
                        propsGroup={{ controlId: 'formPlaintextAdress' }}
                        propsLabel={{ children: 'Địa chỉ' }}
                        propsControl={{ value: user.adress }}
                    />
                    <FormGroupCustom
                        propsGroup={{ controlId: 'Datepicker' }}
                        propsLabel={{ children: 'Ngày sinh' }}
                        propsControl={{ type: 'date' }}
                    />
                    <div style={{ width: '103%' }}>
                        <Button style={{ width: '160px' }}
                            variant="warning"
                            className='mt-2'
                        >Lưu</Button>{' '}
                    </div>

                </Form>
            </div>
        </div >
    );
}
function FormGroupCustom({ propsGroup, propsLabel, propsControl }) {
    return (
        <Form.Group
            as={Row}
            className="mb-3"
            {...propsGroup}>
            <Form.Label
                column sm="2"
                style={{ textAlign: 'right', width: '100px' }}
                {...propsLabel}
            />
            <Form.Control
                style={{ width: '240px', outline: 'none', textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}
                {...propsControl}
            />
        </Form.Group>
    )
}
function maskEmail(email) {
    const emailParts = email.split('@');
    const [emailName, emailDomain] = emailParts;
    const maskedName = emailName.slice(0, 2) + '*'.repeat(emailName.length - 2);
    return `${maskedName}@${emailDomain}`;
}
export default AccoutManagment;
