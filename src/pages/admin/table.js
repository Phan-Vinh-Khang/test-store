import { useState } from "react"
import Table from 'react-bootstrap/Table';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { TailSpin } from 'react-loader-spinner'
import { uid } from "uid";
function TableBootstrap({
    thead,
    listData,
    selectData = {},
    className = '',
    ElementTag,
    handleDelete,
    handleUpdate,
    handleRemoveMany,
    hostName,
    defaultImage = 'avatar/default-avatar-profile.jpg'
}) {
    let [state, setState] = useState({
        selectedRow: 0,
        dataInput: {},
        disabledButton: true
    })
    let [stateFile, setStateFile] = useState();
    let [stateChecked, setStateChecked] = useState(new Set([]))
    let [stateLoading, setStateLoading] = useState(false)
    let selectIdx = (idx) => {
        let rowSelected = JSON.parse(JSON.stringify(listData[idx - 1]))
        //sử dụng như trên nếu ko dataInput sẽ ref vào datastatic arr
        //hoặc tao 1 obj và varproperties obj mới tao sẽ ref vào varproperties của obj trong arr
        rowSelected.image = null;
        setState({
            selectedRow: idx,
            dataInput: rowSelected,
            disabledButton: true
        })
    }
    let unSelect = () => {
        setState({})
    }
    console.log(state.dataInput)
    let getDataInput = (label, e) => {
        let input = e.target.value
        state.dataInput[label] = input
        if (label == 'image') {
            let fileName = e.target.files[0].name
            let fileExtension = fileName.split('.')[1]
            let fileNameUid = fileName.split('.')[0] + uid() + '.' + fileExtension
            state.dataInput['fileNameUid'] = fileNameUid
            state.dataInput[label] = URL.createObjectURL(e.target.files[0])
            setStateFile(e.target.files[0])//phai setState o day do var state k ref vao files[0] dc(varproperti thi ref dc nhung vay thi datastaticstatefile nay phai la obj)
        }
        setState({
            ...state,
            disabledButton: false
        })
    }
    console.log(state.dataInput)

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
    let [id, ...propertiesListData] = Object.keys(listData[0]);
    if (propertiesListData.length == 0) {
        propertiesListData = Array(thead.length).fill(0);
    }
    let propertiesListSelect = Object.keys(selectData);
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
                                <Button Style='width:80%' onClick={() => handleRemoveMany(stateChecked, setStateLoading)} variant="outline-secondary">
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
                                propertiesListData.map((propertie) => (
                                    <>
                                        {
                                            (propertie != 'image' &&
                                                <td>{item[propertie] || <Skeleton />}</td>)
                                        }
                                        {
                                            (propertie == 'image') &&
                                            <td>
                                                <img Style='width:3vw;height:7vh' src={item[propertie] ?
                                                    hostName + item[propertie] : defaultImage}
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
                                    item.id ? <i onClick={() => handleDelete(item.id, idx, stateChecked)} className={"fa-solid fa-trash" + ' ' + className} />
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
                                propertiesListData.map((propertie, idx) => {
                                    let Element = ElementTag[idx]
                                    if (Element == '') {
                                        return <td>{item[propertie]}</td>
                                    }
                                    else if (Element == 'select') {
                                        return <td><Element
                                            className='form-select'
                                            onChange={(e) => getDataInput(propertie, e)}
                                            Style='text-transform: capitalize;margin-top:24px' >
                                            <option>-------------------</option>
                                            {
                                                selectData[propertiesListSelect[0]].map((itemSelect, idx) => {
                                                    let selected = false;
                                                    if (item[propertie] == itemSelect) {
                                                        selected = true;
                                                    }
                                                    return <option selected={selected} Style='text-transform: capitalize;' >{itemSelect}</option>
                                                })
                                            }
                                            {
                                                propertiesListSelect.splice(0, 1)
                                            }
                                        </Element></td>
                                    }
                                    else {
                                        let isShowImgTag = false;
                                        if (typeof (Element) == 'function') {
                                            isShowImgTag = true;
                                        }
                                        return (
                                            <td>
                                                <Element
                                                    onChange={(e) => getDataInput(propertie, e)}
                                                    className='form-control'
                                                    defaultValue={!isShowImgTag && item[propertie] || null}
                                                />
                                                {isShowImgTag && (
                                                    <img Style='width:3vw;height:7vh' src={!state.dataInput[propertie] ?
                                                        (item[propertie] ? hostName + item[propertie] : defaultImage) :
                                                        state.dataInput[propertie]}
                                                    />
                                                )
                                                }
                                            </td>
                                        )
                                    }


                                })
                            }
                            <td>
                                <Button
                                    disabled={state.disabledButton}
                                    onClick={() => handleUpdate(item.id, idx, stateFile, state)}
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