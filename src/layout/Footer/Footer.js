import classNames from 'classnames/bind'

import objStyle from './index.module.scss'

let cv = classNames.bind(objStyle);

function Footer() {
    return (
        <div className={cv('wrapper')}>
            <div className={cv('policy')}>
                <div className={cv('policy2')}>CHÍNH SÁCH BẢO MẬT</div>
                <div className={cv('policy2')}>CHÍNH SÁCH BẢO MẬT</div>
                <div className={cv('policy2')}>CHÍNH SÁCH BẢO MẬT</div>
                <div className={cv('policy2')}>CHÍNH SÁCH BẢO MẬT</div>
            </div>
            <div Style='border:none' className={cv('policy2')}>
                <div>Địa chỉ: Tầng 4-5-6, Tòa nhà Capital Place, số 29 đường Liễu Giai, Phường Ngọc Khánh, Quận Ba Đình, Thành phố Hà Nội, Việt Nam. Tổng đài hỗ trợ: 19001221 - Email: cskh@hotro.shopee.vn</div>
                <div>Chịu Trách Nhiệm Quản Lý Nội Dung: Nguyễn Đức Trí - Điện thoại liên hệ: 024 73081221 (ext 4678)</div>

            </div>
        </div>
    );
}

export default Footer;