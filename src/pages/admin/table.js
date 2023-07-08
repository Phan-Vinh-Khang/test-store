import { useState } from "react"
import Table from 'react-bootstrap/Table';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { updateUser } from "../../services/userServices";
import { deleteUser, deleteUserMany } from "../../services/adminServices";
import { TailSpin } from 'react-loader-spinner'

function TableBootstrap({ reReqData, thead, listData, listData2 = [], className = '' }) {
    let [state, setState] = useState({
        selectedRow: 0,
        dataInput: '',
        disabledButton: true
    })
    let [stateChecked, setStateChecked] = useState(new Set([]))
    let [stateLoading, setStateLoading] = useState(false)
    const access_token = localStorage.getItem('access_token')
    let selectIdx = (idx) => {
        let rowSelected = JSON.parse(JSON.stringify(listData[idx - 1]))
        //sử dụng như trên nếu ko dataInput sẽ ref vào datastatic arr
        //hoặc tao 1 obj và varproperties obj mới tao sẽ ref vào varproperties của obj trong arr
        setState({
            selectedRow: idx,
            dataInput: rowSelected,
            disabledButton: true
        })
    }
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
        setState({
            ...state,
            disabledButton: false
        })
    }
    let handleDeleteUser = async (id, selectedRow) => {
        if (window.confirm('Bạn muốn gỡ người dùng ' + listData[selectedRow].email + '?\n\n')) {
            try {
                await deleteUser({ id, access_token: access_token })
                stateChecked.delete(id)//thay doi o datastatic la dc ko can reload
                reReqData()
            } catch (e) {
                alert(e.response.data.message)
            }
        }
    }
    let handleUpdateUser = async (id, selectedRow) => {
        if (window.confirm('Bạn muốn sửa người dùng ' + listData[selectedRow].email + '?\n\n')) {
            try {//su dụng try catch khi return ve client obj err (status 400,403,409) se su dung dc obj err ở catch (var e sẽ ref vào obj err)
                //su dung e.response.data de ref vao data server return ve (thong thuong neu ko co loi se su dung obj.data nhung neu co loi obj server return ve se dc var propertoes response ref vao)
                await updateUser(id, access_token, state.dataInput)
                listData[state.selectedRow - 1] = {
                    ...state.dataInput
                }
                setState({})
            }
            catch (e) {//var e sẽ ref vào data return err
                if (e.response.status == 422)
                    alert(e.response.data.message);
            }
        }
    }
    console.log('aaaaaaa', stateChecked);
    let checkedbox = (e, id) => {
        if (e.target.checked) {
            stateChecked.add(id); //khi add vào k cần reload, khi add sẽ add vào datastatic,value o datastatic se có
            setStateChecked(new Set([...stateChecked]));
        } else {
            stateChecked.delete(id);
            setStateChecked(new Set([...stateChecked]));
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
            }, 2000);
        }
    }
    let [id, ...arrProperties] = Object.keys(listData[0]);
    if (arrProperties.length == 0) {
        arrProperties = Array(thead.length - 2).fill(0);
    }
    return <Table striped bordered hover>
        <thead>
            <tr >
                {
                    thead.map((item, idx) => (
                        (stateChecked.size > 0 && idx == thead.length - 1) ?
                            <td>
                                {!stateLoading &&
                                    <Button Style='width:100%' onClick={() => handleRemoveMany()} variant="outline-secondary">
                                        Xoa {stateChecked.size} user
                                    </Button>
                                }

                                {stateLoading &&
                                    <Button Style='width:100%' variant="outline-secondary">
                                        <TailSpin
                                            height="20"
                                            width="80"
                                            color="#4fa94d"
                                            ariaLabel="tail-spin-loading"
                                            radius="1"
                                            wrapperStyle={{}}
                                            wrapperClass=""
                                            visible={true}
                                        />
                                    </Button>
                                }
                            </td> :
                            <td>{item}</td>
                    ))
                }
            </tr>
        </thead>
        <tbody>
            {
                listData.map((item, idx) => (
                    (idx + 1 != state.selectedRow) ? (
                        <tr>
                            <td>{item.id ? idx + 1 : <Skeleton />}</td>
                            {
                                arrProperties.map((propertie) => (
                                    <td>{item[propertie] || <Skeleton />}</td>
                                ))
                            }
                            <td>
                                {
                                    item.id ? <i Style='padding-right:12px' onClick={() => selectIdx(idx + 1)} className={"fa-solid fa-pen" + ' ' + className} />
                                        : <Skeleton />
                                }
                                {
                                    item.id ? <i onClick={() => handleDeleteUser(item.id, idx)} className={"fa-solid fa-trash" + ' ' + className} />
                                        : <Skeleton />
                                }
                                {
                                    <Form.Check
                                        inline
                                        type='checkbox'
                                        onChange={(e) => checkedbox(e, item.id)}
                                        checked={stateChecked.has(item.id)}
                                    />
                                }
                            </td>
                        </tr>) : (
                        <tr>
                            <td>{idx + 1}</td>{
                                arrProperties.map((propertie, idx) => {
                                    if (idx < arrProperties.length - 3) {
                                        return <td><Form.Control
                                            onChange={(e) => getDataInput(propertie, e)}
                                            aria-label="Default"
                                            aria-describedby="inputGroup-sizing-default"
                                            defaultValue={item[propertie]}
                                        /></td>
                                    }
                                })
                            }
                            {
                                listData2 != [] && (
                                    <td><Form.Select onChange={(e) => getDataInput(thead[5].toLowerCase(), e)} Style='text-transform: capitalize;margin-top:24px' >
                                        <option>-------------------</option>
                                        {
                                            listData2.map((item) => {
                                                return <option Style='text-transform: capitalize;' >{item.name}</option>
                                            })
                                        }
                                    </Form.Select>
                                    </td>
                                )
                            }
                            <td>{item.createdAt || <Skeleton />}</td>
                            <td>{item.updatedAt || <Skeleton />}</td>
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