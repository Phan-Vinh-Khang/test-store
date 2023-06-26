import { useEffect, useState } from 'react';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import createUserAdmin from '../../services/adminServices';
function ModalInput({ listRole, ...obj }) {
    let access_token = localStorage.getItem('access_token')
    let [stateInput, setStateInput] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        avatar: '',
        adress: '',
        roleid: '',
    })
    let setInput = (label, e) => {
        let input = e.target.value;
        if (label == 'roleid') {
            if (input == 'admin') input = '1'
            else if (input == 'manager') input = '2'
            else if (input == 'user') input = '3'
            else input = '-1'
        }
        stateInput[label] = input
        setStateInput({
            ...stateInput
        })
    }
    let addUserAdmin = async () => {
        obj.close();
        try {
            await createUserAdmin({ access_token, data: stateInput })
        } catch (e) {
            alert(e.response.data.message)
        }
    }
    return (
        <>
            <Modal show={obj.open} onHide={obj.close} size='lg'>
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

                            <Form.Label column sm="2">Password</Form.Label>
                            <Col sm="10">
                                <Form.Control onChange={(e) => setInput('password', e)} type="password" placeholder="Password" />
                            </Col>

                            <Form.Label column sm="2"> Confirm Password</Form.Label>
                            <Col sm="10">
                                <Form.Control onChange={(e) => setInput('confirmPassword', e)} type="password" placeholder="Confirm Password" />
                            </Col>
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
                    <Button variant="secondary" onClick={obj.close}>
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