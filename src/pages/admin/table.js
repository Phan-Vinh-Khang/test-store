import { useState } from "react"
import Table from 'react-bootstrap/Table';
import Form from 'react-bootstrap/Form';
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
function TableBootstrap({ thead, dataList, className }) {
    let [stateIdxUser, setStateIdxUser] = useState(0)
    let [stateInput, setStateInput] = useState({})
    console.log(stateInput)
    let selectId = (idx) => {
        setStateIdxUser(idx)
        setStateInput(dataList.listUser[idx - 1])
    }
    let getDataInput = (label, e) => {
        stateInput[label] = e.target.value
        setStateInput({ ...stateInput })
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
                dataList.listUser.map((item, idx) => (
                    (idx + 1 != stateIdxUser) ? (
                        <tr>
                            <td>{item.name ? idx + 1 : <Skeleton />}</td>
                            <td>{item.name || <Skeleton />}</td>
                            <td>{item.email || <Skeleton />}</td>
                            <td>{item.avatar || <Skeleton />}</td>
                            <td>{item.adress || <Skeleton />}</td>
                            <td>{item.roleid || <Skeleton />}</td>
                            <td>{item.createdAt || <Skeleton />}</td>
                            <td>{item.updatedAt || <Skeleton />}</td>
                            <td onClick={() => selectId(idx + 1)}><i className={"fa-solid fa-pen" + ' ' + className}></i></td>
                        </tr>) : (
                        <tr>
                            <td>{idx + 1}</td>
                            <td><Form.Control
                                onChange={(e) => getDataInput(thead[1].toLowerCase(), e)}
                                aria-label="Default"
                                aria-describedby="inputGroup-sizing-default"
                                defaultValue={item.name}
                            /></td>
                            <td><Form.Control
                                onChange={(e) => getDataInput(thead[2].toLowerCase(), e)}
                                aria-label="Default"
                                aria-describedby="inputGroup-sizing-default"
                                defaultValue={item.email} /></td>
                            <td><Form.Control
                                onChange={(e) => getDataInput(thead[3].toLowerCase(), e)}
                                aria-label="Default"
                                aria-describedby="inputGroup-sizing-default"
                                defaultValue={item.avatar} /></td>
                            <td><Form.Control
                                onChange={(e) => getDataInput(thead[4].toLowerCase(), e)}
                                aria-label="Default"
                                aria-describedby="inputGroup-sizing-default"
                                defaultValue={item.adress} /></td>
                            <td><Form.Select onChange={(e) => getDataInput(thead[5].toLowerCase(), e, true)} Style='text-transform: capitalize;margin-top:24px' >
                                <option>-------------------</option>
                                {
                                    dataList.listRole.map((item) => {
                                        return <option Style='text-transform: capitalize;' >{item.name}</option>
                                    })
                                }
                            </Form.Select>
                            </td>
                            <td>{item.createdAt || <Skeleton />}</td>
                            <td>{item.updatedAt || <Skeleton />}</td>
                        </tr>
                    )
                ))
            }
        </tbody>
    </Table >
}
export default TableBootstrap