import objStyle from './index.module.scss'
import classNames from 'classnames/bind'
function SlideLogin() {
    let cv = classNames.bind(objStyle)
    return (
        <div className={cv('slide-Login')}>
            <div className={cv('slide-Img-Wrap')}>
                <div className={cv('slide-Img')}></div>
            </div>
        </div>
    );
}

export default SlideLogin;