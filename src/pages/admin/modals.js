import { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
function ModalInput(obj) {
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
                            <Form.Control type="text" placeholder="Tên người dùng" />

                            <Form.Label>Email address</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="name@example.com"
                                autoFocus
                            />

                            <Form.Label column sm="2">
                                Password
                            </Form.Label>
                            <Col sm="10">
                                <Form.Control type="password" placeholder="Password" />
                            </Col>

                            <Form.Label column sm="2">
                                Confirm Password
                            </Form.Label>
                            <Col sm="10">
                                <Form.Control type="password" placeholder="Confirm Password" />
                            </Col>
                            <Form.Select Style='margin-top:24px'>
                                <option>Admin</option>
                                <option>Manager</option>
                                <option>User</option>
                            </Form.Select>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={obj.close}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={obj.close}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModalInput;