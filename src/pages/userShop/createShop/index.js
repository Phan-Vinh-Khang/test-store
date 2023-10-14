import { useState, useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import classNames from 'classnames/bind'
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import { Form } from 'react-bootstrap'
import objStyle from './index.module.scss'
import { createUserShop } from '../../../services/usershop'
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setLoginReducer } from '../../../redux/reducerLogin';
let cv = classNames.bind(objStyle);
function CreateShop() {
    let getElement = useRef(null);
    const focusInput = () => {
        getElement.current.focus();
    }
    let navigate = useNavigate()
    let data = useSelector((data) => {
        return data.dataLogged
    })
    data = {
        ...data,
        iscollab: 1
    }
    let dispatch = useDispatch();//return ve 1 datastatic function dispatch
    dispatch(setLoginReducer(data))
    console.log('data', data)
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const addUserShop = async (data) => {
        try {
            await createUserShop(data)
            navigate('/')
        } catch (e) {
            alert(e.respose.data)
        }
    }
    return (
        <div className={cv('flex-block')}>
            <div className={cv('flex-block2')}>
                <h2>
                    Shop
                </h2>
            </div>
            <InputGroup className="mb-3">
                <InputGroup.Text>
                    Tên shop
                </InputGroup.Text>
                <Form.Control
                    id='shop-label'
                    aria-label="Default"
                    type="text"
                    {...register("name")}
                />
            </InputGroup>
            <InputGroup className="mb-3">
                <InputGroup.Text>
                    Địa chỉ giao hàng
                </InputGroup.Text>
                <Form.Control
                    id='shop-label'
                    aria-label="Default"
                    type="text"
                    {...register("deliveryAddress")}
                />
            </InputGroup>
            <Button onClick={handleSubmit(addUserShop)} className={cv('btn')} variant="primary">Xác nhận</Button>{' '}
        </div>
    );
}

export default CreateShop;