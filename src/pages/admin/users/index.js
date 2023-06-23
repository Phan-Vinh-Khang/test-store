import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import classNames from 'classnames/bind'

import objStyle from './index.module.scss'
import ModalInPut from '../modals';
import TableBootstrap from '../table';
import { allUser } from '../../../services/userServices';
import { allRole } from '../../../services/adminServices';
let cv = classNames.bind(objStyle);
function AdminUser() {
    let [stateDataUsers, setStateDataUsers] = useState({
        listUser: Array(20).fill(0),
        listRole: []
    })
    useEffect(() => {
        const fetchData = async () => {
            const dataUser = (await allUser()).data;
            const dataRole = (await allRole()).data;
            setTimeout(() => {
                setStateDataUsers({
                    listUser: dataUser,
                    listRole: dataRole
                })
            }, 500)
        }
        fetchData();
    }, [])
    const [show, setShow] = useState(false);

    return (
        <>
            <TableBootstrap
                thead={['Id',
                    'Name',
                    'Email',
                    'Avatar',
                    'adress',
                    'roleid',
                    'createdAt',
                    'updatedAt',
                    'More']}
                dataList={stateDataUsers}
            />
            <Button variant="primary" onClick={() => setShow(true)}>
                <i Style='margin-right:4px' class="fa-sharp fa-solid fa-plus" /> Thêm người dùng
            </Button>
            <ModalInPut
                open={show}
                close={() => setShow(false)}
                listRole={stateDataUsers.listRole}
                classNames={cv('modify-user')}
            />
        </>

    );
}

export default AdminUser;