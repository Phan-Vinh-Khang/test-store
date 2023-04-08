import { useState, useEffect } from 'react';
import objStyle from './index.module.scss'
import classNames from 'classnames/bind'
import SlideLogin from '../Slide';
import SignIn from '../Sign-in';
import SignUp from '../Sign-up';
function WrapperLogin() {
    let cv = classNames.bind(objStyle)
    var [state, setState] = useState(true)
    var ElementForm = '';
    if (state)
        ElementForm = SignIn;
    else
        ElementForm = SignUp;
    var switchForm = () => {
        setState(!state)
    }
    //nếu ghi state++ sẽ create 1 static với value state hiện tại sau đó reload và ref vào sau khi ref state mới ++,phải click 1 lần nữa để create static và value lúc này sẽ là 1(chhuyển dc form)
    return (
        <div className={cv('wrapper')}>
            <SlideLogin></SlideLogin>
            <ElementForm switchForm={switchForm}></ElementForm>
        </div>
    );
}

export default WrapperLogin;