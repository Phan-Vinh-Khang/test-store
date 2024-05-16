import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import classNames from 'classnames/bind'

import objStyle from './index.module.scss'
import ModalInPut from '../modals';
import TableBootstrap from '../table';
import { allUser } from '../../../services/userServices';
import { allRole } from '../../../services/adminServices';
import { updateUser, uploadAvatar } from "../../../services/userServices";
import { deleteUser, deleteUserMany } from '../../../services/adminServices';
import InputFile from '../../../elements/inputFile';
import { REACT_APP_API_SERVER_URL } from '../../../urlServer';
let cv = classNames.bind(objStyle);
const url = REACT_APP_API_SERVER_URL;
function AdminUser() {
    let [stateDataUsers, setStateDataUsers] = useState({
        listUser: Array(20).fill(0),
        listRole: []
    })
    let [stateReload, setStateReload] = useState(false)
    let [show, setShow] = useState(false);
    let reloadData = () => {
        setStateReload(!stateReload)
    }
    useEffect(() => {
        const fetchData = async () => {
            const dataUser = (await allUser()).data;
            const dataRole = (await allRole()).data;
            const data2 = await allUser();
            setStateDataUsers({
                listUser: dataUser.listUser,
                listRole: dataRole.listRole
            })
        }
        fetchData();
    }, [stateReload])
    let handleDeleteUser = async (id, selectedRow, stateChecked) => {
        if (window.confirm('Bạn muốn gỡ người dùng ' + stateDataUsers.listUser[selectedRow].email + '?\n\n')) {
            try {
                await deleteUser(id)
                stateChecked.delete(id)//thay doi o datastatic la dc ko can reload
                reloadData()
            } catch (e) {
                alert(e.response.data.message)
            }
        }
    }
    let handleUpdateUser = async (id, selectedRow, stateFile, state) => {
        if (window.confirm('Bạn muốn sửa người dùng ' + stateDataUsers.listUser[selectedRow].email + '?\n\n')) {
            try {//su dụng try catch khi return ve client obj err (status 400,403,409) se su dung dc obj err ở catch (var e sẽ ref vào obj err)
                //su dung e.response.data de ref vao data server return ve (thong thuong neu ko co loi se su dung obj.data nhung neu co loi obj server return ve se dc var propertoes response ref vao)
                console.log(state.dataInput)
                await updateUser(id, state.dataInput)
                if (state.dataInput.fileNameUid != null) {
                    await uploadAvatar(stateFile, state.dataInput.fileNameUid)
                }
                state.selectedRow = 0
                setTimeout(() => {
                    reloadData()
                }, 500);
            }
            catch (e) {//var e sẽ ref vào data return err
                if (e.response.status != 200)
                    alert(e.response.data.message);
            }
        }
    }
    let handleRemoveMany = async (stateChecked, setStateLoading) => {
        const listId = Array.from(stateChecked);
        if (window.confirm(`bạn có muốn gỡ ${stateChecked.size} user?`)) {
            setStateLoading(true)
            setTimeout(async () => {
                try {
                    setStateLoading(false)
                    await deleteUserMany(listId);
                    stateChecked.clear();
                    reloadData();
                }
                catch (e) {
                    alert(e.response.data.message);//can xu li wait o try catch (khi dang await o try{} se load effect, sau 500ms se dung load effect va gui req, neu req return ve loi se van catch dc o catch{})
                }
            }, 1000);
        }
    }
    console.log(stateDataUsers.listUser)
    const arrListRole = stateDataUsers.listRole.map((obj) => {
        return obj.name
    })
    return (
        <>
            <TableBootstrap
                thead={['name',
                    'email',
                    'avatar',
                    'adress',
                    'role',
                    'isCollab',
                    'createdAt',
                    'updatedAt',
                ]}
                listData={stateDataUsers.listUser}
                selectData={
                    {
                        rolelist: arrListRole,
                        isCollablist: ['Có', 'Không']
                    }
                }
                ElementTag={['input', '', InputFile, 'input', 'select', 'select', '', '']}
                className={cv('modify-user')}
                handleDelete={handleDeleteUser}
                handleUpdate={handleUpdateUser}
                handleRemoveMany={handleRemoveMany}
                hostName={url + 'avatar/'}
            />
            <Button variant="primary" onClick={() => setShow(true)}>
                <i Style='margin-right:4px' class="fa-sharp fa-solid fa-plus" /> Thêm người dùng
            </Button>
            <ModalInPut //show&&<ModalInPut/> //chi can ko dc call 1 lần datastaticstate ở ở func mocal sẽ bị mat
                open={show}
                close={() => setShow(false)}
                listRole={stateDataUsers.listRole}
                classNames={cv('modify-user')}
                reloadData={reloadData}
            />
        </>

    );
}

export default AdminUser;