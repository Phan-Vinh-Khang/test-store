import objStyle from './headerLogin.module.scss'
import classNames from 'classnames/bind'
import { useSelector } from 'react-redux';
import { changeLabelReducer } from '../../redux/reducerChangeLabelLogin';
function HeaderLogin() {
    var cv = classNames.bind(objStyle)
    let dataLabelReducer = useSelector((dataStateReducer) => {
        return dataStateReducer.changeLabelLogin.dataLabel;
    })
    return (
        <div className={cv('wrap')}>
            <div className={cv('wrap-content')}>
                <div>
                    <a href="/">
                        <img src="./Shopee.png" />
                    </a>
                    {
                        dataLabelReducer ?
                            <span>Đăng nhập</span> :
                            <span>Đăng ký</span>
                    }
                </div>
                <div className={cv('block-right')}>Bạn cần giúp đỡ?</div>
            </div>
        </div>
    );
}

export default HeaderLogin