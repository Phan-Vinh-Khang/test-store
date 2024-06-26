import { useEffect, useState } from 'react';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import createUserAdmin from '../../services/adminServices';
import { uploadAvatar } from '../../services/userServices';
import { uid } from 'uid'
function ModalInput({ reloadData, listRole, ...obj }) {
    let [stateInput, setStateInput] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        image: '',
        address: '',
        roleid: '',
        fileNameUid: ''
    });
    let [stateFile, setStateFile] = useState({})
    let setInput = async (label, e) => {
        let input = e.target.value;
        if (label == 'roleid') {
            if (input == 'admin') input = '1'
            else if (input == 'manager') input = '2'
            else if (input == 'user') input = '3'
            else input = '-1'
        }
        stateInput[label] = input
        if (label == 'image') {
            let fileName = e.target.files[0].name
            let fileExtension = fileName.split('.')[1]
            let fileNameUid = fileName.split('.')[0] + uid() + '.' + fileExtension
            stateInput['fileNameUid'] = fileNameUid
            stateInput[label] = URL.createObjectURL(e.target.files[0])
            setStateFile(e.target.files[0])//phai setState o day do var state k ref vao files[0] dc(varproperti thi ref dc nhung vay thi datastaticstatefile nay phai la obj)
        }
        setStateInput({
            ...stateInput
        })
    }
    let addUserAdmin = async () => {
        try {
            let fileNameUid = stateInput.fileNameUid
            await createUserAdmin(stateInput)
            obj.close();
            setStateInput({
                name: '',
                email: '',
                password: '',
                confirmPassword: '',
                image: '',
                address: '',
                roleid: '',
                fileNameUid: ''
            }
            )
            setTimeout(() => {
                reloadData(); //cho 500ms de luu data vao db,neu chay ngay co the db chua kip luu da return ve data
            }, 100)
            await uploadAvatar(stateFile, fileNameUid)//co the req loi se dung o day(req loi co the do ko co data file dc chon)
            setStateFile({})
        } catch (e) {
            alert(e.response.data.message)
        }
    }
    return (
        <>
            <Modal show={obj.open} onHide={() => {
                obj.close()
                setStateInput({
                    name: '',
                    email: '',
                    password: '',
                    confirmPassword: '',
                    image: '',
                    address: '',
                    roleid: '',
                })
            }} size='lg'>
                <Modal.Header closeButton>
                    <Modal.Title>Thêm người dùng</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Tên người dùng</Form.Label>
                            <Form.Control onChange={(e) => setInput('name', e)} type="text" placeholder="Tên người dùng" />

                            <Form.Label>Email address</Form.Label>
                            <Form.Control
                                onChange={(e) => setInput('email', e)}
                                type="text"
                                placeholder="name@gmail.com"
                                autoFocus
                            />

                            <Form.Label column sm="3">Password</Form.Label>
                            <Col sm="">
                                <Form.Control onChange={(e) => setInput('password', e)} type="password" placeholder="Password" />
                            </Col>

                            <Form.Label column sm="2"> Confirm Password</Form.Label>
                            <Col sm="">
                                <Form.Control onChange={(e) => setInput('confirmPassword', e)} type="password" placeholder="Confirm Password" />
                            </Col>
                            <Form.Label>Chọn avatar người dùng</Form.Label>
                            <Form.Control nctype="multipart/form-data" name='image' onChange={(e) => setInput('image', e)} type="file" />
                            <img Style='width:50px' src={stateInput.image} />
                            <Form.Select onChange={(e) => setInput('roleid', e)} Style='text-transform: capitalize;margin-top:24px'>
                                <option>-------------------</option>
                                {
                                    listRole.map((item) => {
                                        return <option Style='text-transform: capitalize;'>{item.name}</option>
                                    })
                                }
                            </Form.Select>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => {
                        obj.close()
                        setStateInput({
                            name: '',
                            email: '',
                            password: '',
                            confirmPassword: '',
                            image: '',
                            address: '',
                            roleid: '',
                        })
                    }}>
                        Đóng
                    </Button>
                    <Button onClick={addUserAdmin} variant="primary">
                        Thêm người dùng
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModalInput;