import { useState } from "react"
import Table from 'react-bootstrap/Table';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { updateUser, uploadAvatar } from "../../services/userServices";
import { deleteUser, deleteUserMany } from "../../services/adminServices";
import { TailSpin } from 'react-loader-spinner'
import InputType from "./inputType";
import { uid } from "uid";
function TableBootstrap({ reReqData, thead, listData, listData2 = [], className = '', ElementTag, typeBootstrap }) {
    let [state, setState] = useState({
        selectedRow: 0,
        dataInput: {},
        disabledButton: true
    })
    let [stateFile, setStateFile] = useState();
    console.log(state.dataInput)
    let [stateChecked, setStateChecked] = useState(new Set([]))
    let [stateLoading, setStateLoading] = useState(false)
    const access_token = localStorage.getItem('access_token')
    let selectIdx = (idx) => {
        let rowSelected = JSON.parse(JSON.stringify(listData[idx - 1]))
        //sử dụng như trên nếu ko dataInput sẽ ref vào datastatic arr
        //hoặc tao 1 obj và varproperties obj mới tao sẽ ref vào varproperties của obj trong arr
        rowSelected.avatar = null;
        // rowSelected.imgName = null;
        setState({
            selectedRow: idx,
            dataInput: rowSelected,
            disabledButton: true
        })
    }
    console.log(state.dataInput)
    let unSelect = () => {
        setState({})
    }
    let getDataInput = (label, e) => {
        let input = e.target.value
        if (label == 'roleid') {
            if (input == 'admin') input = '1'
            else if (input == 'manager') input = '2'
            else if (input == 'user') input = '3'
            else input = '-1'
        }
        state.dataInput[label] = input
        if (label == 'avatar') {
            let fileName = e.target.files[0].name
            let fileExtension = fileName.split('.')[1]
            let fileNameUid = fileName.split('.')[0] + uid() + '.' + fileExtension
            state.dataInput['imgName'] = fileNameUid
            state.dataInput[label] = URL.createObjectURL(e.target.files[0])
            setStateFile(e.target.files[0])//phai setState o day do var state k ref vao files[0] dc(varproperti thi ref dc nhung vay thi datastaticstatefile nay phai la obj)
        }
        setState({
            ...state,
            disabledButton: false
        })
    }
    let handleDeleteUser = async (id, selectedRow, avatarFile) => {
        if (window.confirm('Bạn muốn gỡ người dùng ' + listData[selectedRow].email + '?\n\n')) {
            try {
                await deleteUser({ id, access_token: access_token, avatarFile })
                stateChecked.delete(id)//thay doi o datastatic la dc ko can reload
                reReqData()
            } catch (e) {
                alert(e.response.data.message)
            }
        }
    }
    console.log(state.selectedRow)
    let handleUpdateUser = async (id, selectedRow) => {
        if (window.confirm('Bạn muốn sửa người dùng ' + listData[selectedRow].email + '?\n\n')) {
            try {//su dụng try catch khi return ve client obj err (status 400,403,409) se su dung dc obj err ở catch (var e sẽ ref vào obj err)
                //su dung e.response.data de ref vao data server return ve (thong thuong neu ko co loi se su dung obj.data nhung neu co loi obj server return ve se dc var propertoes response ref vao)
                await updateUser(id, access_token, state.dataInput)
                if (state.dataInput.imgName != null) {
                    await uploadAvatar(stateFile, state.dataInput.imgName)
                }
                state.selectedRow = 0
                setTimeout(() => {
                    reReqData()
                }, 500);
            }
            catch (e) {//var e sẽ ref vào data return err
                if (e.response.status == 422)
                    alert(e.response.data.message);
            }
        }
    }
    let checkedbox = (e, id) => {
        if (e.target.checked) {
            stateChecked.add(id); //khi add vào k cần reload, khi add sẽ add vào datastatic,value o datastatic se có
            setStateChecked(new Set([...stateChecked]))
        } else {
            stateChecked.delete(id);
            setStateChecked(new Set([...stateChecked]))
        }
    }
    let checkedAllbox = (e) => {
        if (e.target.checked) {
            listData.map((item) => {
                stateChecked.add(item.id)
            })
            setStateChecked(new Set([...stateChecked]))
        }
        else {
            setStateChecked(new Set())
        }
    }
    let handleRemoveMany = async () => {
        const listId = Array.from(stateChecked);
        if (window.confirm('bạn có muốn gỡ ' + stateChecked.size + ' user?')) {
            setStateLoading(true)
            setTimeout(async () => {
                try {
                    setStateLoading(false)
                    await deleteUserMany({ access_token, listId });
                    stateChecked.clear();
                    reReqData();
                }
                catch (e) {
                    alert(e.response.data.message);//can xu li wait o try catch (khi dang await o try{} se load effect, sau 500ms se dung load effect va gui req, neu req return ve loi se van catch dc o catch{})
                }
            }, 1000);
        }
    }
    let [id, ...arrProperties] = Object.keys(listData[0]);
    if (arrProperties.length == 0) {
        arrProperties = Array(thead.length).fill(0);
    }
    const ElementName = ElementTag[0];

    return <Table striped bordered hover>

        <thead>
            <tr >
                <td>#</td>
                {
                    thead.map((item, idx) => (
                        <td>{item}</td>
                    ))
                }
                {
                    stateChecked.size > 0 ?
                        (<td>
                            {!stateLoading &&
                                <Button Style='width:80%' onClick={() => handleRemoveMany()} variant="outline-secondary">
                                    Xoa {stateChecked.size} user
                                </Button>
                            }

                            {stateLoading &&
                                <Button Style='width:80%' variant="outline-secondary">
                                    <TailSpin
                                        height="15"
                                        width="50"
                                        color="#6c757d"
                                        ariaLabel="tail-spin-loading"
                                        radius="1"
                                        visible={true}
                                    />
                                </Button>
                            }
                        </td>) : <td>More</td>
                }
            </tr>
        </thead>
        <tbody>
            {
                listData.map((item, idx) => ( //varfunc item ref vào data func map return sau do truyen goi func la truyen vao
                    (idx + 1 != state.selectedRow) ? (
                        <tr>
                            <td>{item.id ? idx + 1 : <Skeleton />}</td>
                            {
                                arrProperties.map((propertie) => (
                                    <>
                                        {
                                            (propertie != 'avatar' &&
                                                <td>{item[propertie] || <Skeleton />}</td>)
                                        }
                                        {
                                            (propertie == 'avatar' || propertie == 'img') &&
                                            <td>
                                                <img Style='width:3vw;height:7vh' src={item[propertie] ?
                                                    'http://localhost:3001/avatar/' + item[propertie] :
                                                    'avatar/default-avatar-profile.jpg'}
                                                />
                                            </td>
                                        }
                                    </>

                                ))
                            }
                            <td>
                                {
                                    item.id ? <i Style='padding-right:12px' onClick={() => selectIdx(idx + 1)} className={"fa-solid fa-pen" + ' ' + className} />
                                        : <Skeleton />
                                }
                                {
                                    item.id ? <i onClick={() => handleDeleteUser(item.id, idx, item.avatar)} className={"fa-solid fa-trash" + ' ' + className} />
                                        : <Skeleton />
                                }
                                {
                                    item != 0 ? <Form.Check
                                        inline
                                        type='checkbox'
                                        onChange={(e) => checkedbox(e, item.id)}
                                        checked={stateChecked.has(item.id)}
                                    /> : <Skeleton />
                                }
                                {
                                    idx == 0 && (
                                        item != 0 ?
                                            <Form.Check
                                                inline
                                                type='checkbox'
                                                checked={stateChecked.size == listData.length}
                                                onChange={(e) => checkedAllbox(e)}
                                            /> : <Skeleton />
                                    )
                                }
                            </td>
                        </tr>) : (
                        <tr>
                            <td>{idx + 1}</td>
                            {
                                arrProperties.map((propertie, idx) => {
                                    let Element = ElementTag[idx]
                                    if (idx < arrProperties.length - 2) {
                                        if (Element == 'input') {
                                            return (
                                                <td>
                                                    <Element
                                                        onChange={(e) => getDataInput(propertie, e)}
                                                        className='form-control'
                                                        type={typeBootstrap[idx]}
                                                        defaultValue={(!typeBootstrap[idx] && item[propertie]) || ''}
                                                    />
                                                    {typeBootstrap[idx] == 'file' && (
                                                        <img Style='width:3vw;height:7vh' src={!state.dataInput[propertie] ?
                                                            'http://localhost:3001/avatar/' + item[propertie] :
                                                            state.dataInput[propertie]}
                                                        />
                                                    )
                                                    }
                                                </td>
                                            )
                                        }
                                        else {
                                            return <td><Element
                                                className='form-select'
                                                onChange={(e) => getDataInput(thead[4].toLowerCase(), e)}
                                                Style='text-transform: capitalize;margin-top:24px' >
                                                <option>-------------------</option>
                                                {
                                                    listData2.map((item) => {
                                                        return <option Style='text-transform: capitalize;' >{item.name}</option>
                                                    })
                                                }
                                            </Element></td>
                                        }
                                    }
                                })
                            }
                            <td>
                                <Button
                                    disabled={state.disabledButton}
                                    onClick={() => handleUpdateUser(item.id, idx)}
                                    variant="outline-success">
                                    Save
                                </Button>
                                <Button onClick={() => unSelect()} variant="outline-secondary">Cancel</Button>
                            </td>
                        </tr>
                    )
                ))
            }
        </tbody>
    </Table >
}
export default TableBootstrap