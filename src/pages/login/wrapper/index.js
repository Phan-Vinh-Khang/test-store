import objStyle from './index.module.scss'
import classNames from 'classnames/bind'
import SlideLogin from '../Slide';
import Login from '../Sign-in';
function WrapperLogin() {
    let cv = classNames.bind(objStyle)
    return (
        <div className={cv('wrapper')}>
            <SlideLogin></SlideLogin>
            <Login></Login>
        </div>
    );
}

export default WrapperLogin;