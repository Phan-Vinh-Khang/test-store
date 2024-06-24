import { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import objStyle from './index.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { REACT_APP_API_SERVER_URL } from '../../../urlServer';
import 'react-loading-skeleton/dist/skeleton.css';
import { Form, Row, Button } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
let cv = classNames.bind(objStyle);
const url = REACT_APP_API_SERVER_URL;

function AccoutManagment() {
    let user = useSelector((state) => {
        return state.dataLogged;
    });
    let email = maskEmail(user.email);
    let { register, handleSubmit, watch, formState: { errors } } = useForm();
    let imgSrc = "";
    console.log(watch('img'), 'watch')
    if (watch('img')?.length > 0) {
        imgSrc = URL.createObjectURL(watch('img')[0]);
    }
    let submitUserProfile = async (data) => {
        console.log(data, 'data')
    }
    return (
        <div className={cv('container')}>
            <div className={cv('title-account')}>
                <h5 style={{ marginBottom: 0 }}>Hồ Sơ Của Tôi</h5>
                <div>Quản lý thông tin hồ sơ để bảo mật tài khoản</div>
            </div>
            <div className={cv('flex-container')}>
                <div className={cv('form-container')}>
                    <Form>
                        <FormGroupCustom
                            propsLabel={{ children: 'Email:' }}
                            propsControl={{ value: email, plaintext: true, readOnly: true }}
                        />
                        <FormGroupCustom
                            propsGroup={{ controlId: 'formPlaintextName' }}
                            propsLabel={{ children: 'Tên:' }}
                            propsControl={{
                                ...register('name'),
                                value: watch('name') || user.name
                            }}
                        />
                        <FormGroupCustom
                            propsGroup={{ controlId: 'formPlaintextAddress' }}
                            propsLabel={{ children: 'Địa chỉ:' }}
                            propsControl={{
                                ...register('address'),
                                value: watch('address') || user.address
                            }}
                        />
                        <FormGroupCustom
                            propsGroup={{ controlId: 'Datepicker' }}
                            propsLabel={{ children: 'Ngày sinh:' }}
                            propsControl={{
                                type: 'date',
                                ...register('dob'),
                                value: watch('dob') || user.dob
                            }}
                        />
                        <div>
                            <Button style={{ width: '160px', marginRight: '90px' }}
                                variant="warning"
                                className='mt-2'
                                onClick={handleSubmit(submitUserProfile)}
                            >Lưu</Button>{' '}
                        </div>
                    </Form>
                </div>
                <div className={cv('flex-container-img')}>
                    <div style={{ height: '100%', borderLeft: "1px solid gainsboro", paddingLeft: '5px' }}>
                        Ảnh đại diện:
                    </div>
                    <div style={{ marginBottom: '50px' }}>
                        <img className={cv('img')} src={imgSrc || '/defaultImg1.png'} />
                        <Form.Control {...register('img')} type="file" />
                    </div>
                </div>
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
                style={{ width: '300px', outline: 'none', textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}
                {...propsControl}
            />
        </Form.Group>
    )
}
function maskEmail(email) {
    const [emailName, emailDomain] = email.split('@');
    const maskedName = emailName.slice(0, 2) + '*'.repeat(emailName.length - 2);
    return `${maskedName}@${emailDomain}`;
}
export default AccoutManagment;
