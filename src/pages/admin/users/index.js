import { useState } from 'react';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import ModalInPut from '../modals';
function AdminUser() {
    const [show, setShow] = useState(false);
    console.log(show)
    return (
        <>
            <Table striped bordered hover>
                <thead>
                    <tr >
                        <td>Id</td>
                        <td>First Name</td>
                        <td>Last Name</td>
                        <td>Username</td>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>1</td>
                        <td xs={6}>Mark</td>
                        <td>Otto</td>
                        <td>@mdo</td>
                    </tr>
                    <tr>
                        <td>2</td>
                        <td>Jacob</td>
                        <td>Thornton</td>
                        <td>@fat</td>
                    </tr>
                    <tr>
                        <td>3</td>
                        <td>Larry the Bird</td>
                        <td>@twitter</td>
                    </tr>
                </tbody>
            </Table >
            <Button variant="primary" onClick={() => setShow(true)}>
                <i Style='margin-right:4px' class="fa-sharp fa-solid fa-plus" /> Thêm người dùng
            </Button>
            <ModalInPut
                open={show}
                close={() => setShow(false)}
            />
        </>

    );
}

export default AdminUser;