import { useState } from "react"
import Table from 'react-bootstrap/Table';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { updateUser } from "../../services/userServices";
function TableBootstrap({ thead, listData, listData2 = [], className = '' }) {
    let [stateIdxUser, setStateIdxUser] = useState(0)
    let [stateInput, setStateInput] = useState({})
    const access_token = localStorage.getItem('access_token')
    let selectId = (idx) => {
        setStateIdxUser(idx)
        setStateInput(listData[idx - 1])
    }
    let getDataInput = (label, e) => {
        let input = e.target.value
        if (label == 'roleid') {
            if (input == 'admin') input = '1'
            else if (input == 'manager') input = '2'
            else if (input == 'user') input = '3'
            else input = '-1'
        }
        stateInput[label] = input
        setStateInput({ ...stateInput })
    }
    console.log(stateInput)
    let handleUpdateUser = async (id) => {
        try {//su dụng try catch khi return ve obj err (status 400,403,409) se su dung dc obj err ở catch (var e sẽ ref vào obj err)
            //su dung e.response.data de ref vao data server return ve (thong thuong neu ko co loi se su dung obj.data nhung neu co loi obj server return ve se dc var propertoes response ref vao)
            let status = await updateUser(id, access_token, stateInput)
            listData[stateIdxUser - 1] = {
                ...stateInput
            }
            setStateIdxUser(0)
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
                    (idx + 1 != stateIdxUser) ? (
                        <tr>
                            <td>{item.id ? idx + 1 : <Skeleton />}</td>
                            {
                                arrProperties.map((propertie) => (
                                    <td>{item[propertie] || <Skeleton />}</td>
                                ))
                            }
                            <td onClick={() => selectId(idx + 1)}>
                                {
                                    item.id ? <i className={"fa-solid fa-pen" + ' ' + className} />
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
                                <Button variant="outline-secondary">Cancel</Button>
                            </td>
                        </tr>
                    )
                ))
            }
        </tbody>
    </Table >
}
export default TableBootstrap