import { useState, useEffect } from 'react';
import axios from 'axios';
import classNames from 'classnames/bind'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
function Home() {
    const [stateModal, setStateModal] = useState(false);

    const handleClose = () => {
        setStateModal(false);
    }
    const handleShow = () => {
        setStateModal(true);
    }
    return (
        <>
            <Button variant="primary" onClick={handleShow}>
                Launch demo modal
            </Button>

            <Modal show={stateModal} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Modal heading</Modal.Title>
                </Modal.Header>
                <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleClose}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default Home;