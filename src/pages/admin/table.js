import { useState } from "react"
import Table from 'react-bootstrap/Table';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { updateUser } from "../../services/userServices";
import { deleteUser } from "../../services/adminServices";
function TableBootstrap({ reReqData, thead, listData, listData2 = [], className = '' }) {
    let [state, setState] = useState({
        selectedRow: 0,
        dataInput: ''
    })
    const access_token = localStorage.getItem('access_token')
    let selectIdx = (idx) => {
        let rowSelected = JSON.parse(JSON.stringify(listData[idx - 1]))
        //sử dụng như trên nếu ko dataInput sẽ ref vào datastatic arr
        //hoặc tao 1 obj và varproperties obj mới tao sẽ ref vào varproperties của obj trong arr
        setState({
            selectedRow: idx,
            dataInput: rowSelected
        })
    }
    let selectIdx2 = () => {
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
        setState({ ...state })
    }
    let handleDeleteUser = async (id) => {
        try {
            await deleteUser({ id, access_token: access_token })
            reReqData()
        } catch (e) {
            alert(e.response.data.message)
        }
    }
    let handleUpdateUser = async (id) => {
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
                alert(e.response.data.message)
        }
    }
    let [id, ...arrProperties] = Object.keys(listData[0]);
    if (arrProperties.length == 0) {
        arrProperties = Array(thead.length - 2).fill(0)
    }
    return <Table striped bordered hover>
        <thead>
            <tr >
                {
                    thead.map((item) => (
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
                                    item.id ? <i onClick={() => selectIdx(idx + 1)} className={"fa-solid fa-pen" + ' ' + className} />
                                        : <Skeleton />
                                }
                                {
                                    item.id ? <i onClick={() => handleDeleteUser(item.id)} className={"fa-solid fa-trash" + ' ' + className} />
                                        : <Skeleton />
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
                                    onClick={() => handleUpdateUser(item.id)}
                                    variant="outline-success">
                                    Save
                                </Button>
                                <Button onClick={() => selectIdx2()} variant="outline-secondary">Cancel</Button>
                            </td>
                        </tr>
                    )
                ))
            }
        </tbody>
    </Table >
}
export default TableBootstrap