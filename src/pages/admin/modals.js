import { useEffect, useState } from 'react';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import createUserAdmin from '../../services/adminServices';
import { uploadAvatar } from '../../services/userServices';
import { uid } from 'uid'
function ModalInput({ reReqData, listRole, ...obj }) {
    let access_token = localStorage.getItem('access_token')
    let [stateInput, setStateInput] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        avatar: '',
        adress: '',
        roleid: '',
    });
    let [stateFile, setStateFile] = useState()

    let setInput = async (label, e) => {
        let input = e.target.value;
        if (label == 'roleid') {
            if (input == 'admin') input = '1'
            else if (input == 'manager') input = '2'
            else if (input == 'user') input = '3'
            else input = '-1'
        }
        stateInput[label] = input
        if (label == 'avatar') {
            let fileName = e.target.files[0].name
            let fileExtension = fileName.split('.')[1]
            let fileNameUid = fileName.split('.')[0] + uid() + '.' + fileExtension
            stateInput[label] = fileNameUid
            stateFile = e.target.files[0];
        }
        // setStateInput({
        //     ...stateInput
        // })
    }
    let addUserAdmin = async () => {
        try {
            await createUserAdmin({ access_token, data: stateInput })
            await uploadAvatar(stateFile, stateInput.avatar)
            obj.close();
            stateInput = {
                name: '',
                email: '',
                password: '',
                confirmPassword: '',
                avatar: '',
                adress: '',
                roleid: '',
            }
            stateFile = ''
            setTimeout(() => {
                reReqData(); //cho 500ms de luu data vao db,neu chay ngay co the db chua kip luu da return ve data
            }, 100)
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
                    avatar: '',
                    adress: '',
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
                            {/* <form action="#" method="post" enctype="multipart/form-data">
                                <input onChange={(e) => setInput('avatar', e)} type="file" name="file" />
                            </form> */}
                            <Form.Control nctype="multipart/form-data" name='avatar' onChange={(e) => setInput('avatar', e)} type="file" />
                            <img Style='width:50px' src={stateInput.avatar} />
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
                            avatar: '',
                            adress: '',
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