import objStyle from './headerLogin.module.scss'
import classNames from 'classnames/bind'
function HeaderLogin() {
    var cv = classNames.bind(objStyle)
    return (
        <div className={cv('wrap')}>
            <div className={cv('wrap-content')}>
                <div>
                    <a href="/">
                        <img src="./Shopee.png" />
                    </a>
                    <span>Đăng nhập</span>
                </div>
                <div className={cv('block-right')}>Bạn cần giúp đỡ?</div>
            </div>
        </div>
    );
}

export default HeaderLogin