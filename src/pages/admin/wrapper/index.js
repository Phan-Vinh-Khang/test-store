import classNames from 'classnames/bind'
import { useState } from 'react';
import objStyle from './index.module.scss'
import AdminUser from '../users';
import AdminProducts from '../products';
let cv = classNames.bind(objStyle);
function WrapperAdmin() {
    let [stateIndex, setStateIndex] = useState({
        id: ['users', 'products', 'orders'],
        idx: 0,
        list: ['Người dùng', 'Sản phẩm', 'Danh sách đơn hàng']
    });
    let idxSelect = (idx) => {
        setStateIndex({ ...stateIndex, idx: idx })
    }
    let pageSelect = (select) => {
        switch (select) {
            case 'users': return <AdminUser />
            case 'products': return <AdminProducts />
            case 'orders': return <div>Admin Orders</div>
            default: return <></>
        }
    }
    return (
        <div className={cv('wrapper')}>
            <div className={cv('wrap-list-item')}>
                <ul>
                    {
                        stateIndex.list.map((item, idx) => (
                            <li className={idx == stateIndex.idx ? cv('active') : ''} onClick={() => idxSelect(idx)}>{item}</li>
                        ))
                    }
                </ul>
            </div>
            <div className={cv('wrap-content')}>
                {pageSelect(stateIndex.id[stateIndex.idx])}
            </div>
        </div>
    );
}

export default WrapperAdmin;