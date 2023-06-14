import { useState } from 'react';
import classNames from 'classnames/bind'
import objStyle from './index.module.scss'
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import ModalInPut from '../modals';
import Slider from "react-slick";

let cv = classNames.bind(objStyle);
function AdminUser() {
    let [stateIdx, setStateIdx] = useState(0)

    let listPage = [<Page1 />, <Page2 />]
    console.log(stateIdx)
    var settings = {
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 0,
        autoplay: false,
        initialSlide: 0,
    };
    return (
        <>
            <div className={cv('navbar')}>
                {stateIdx > 0 &&
                    <span onClick={() => setStateIdx(--stateIdx)}>
                        <i class="fa-solid fa-arrow-left fa-xl"></i>                </span>
                }
            </div>
            <Slider {...settings}>
                <Page1 />
                <Page2 />
            </Slider>

            {stateIdx < 1 &&
                <Button onClick={() => setStateIdx(++stateIdx)} variant="primary">
                    <i Style='margin-right:4px' class="fa-sharp fa-solid fa-plus" /> Thêm sản phẩm
                </Button>
            }
        </>

    );
}
function Page1() {
    return (
        <div>
            <Table striped bordered hover>
                <thead>
                    <tr >
                        <td>Id</td>
                        <td>First Nameaa</td>
                        <td>Last Name</td>
                        <td>Username</td>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>1</td>
                        <td>Mark</td>
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
            </Table>
        </div>
    );

}
function Page2() {
    return (
        <div>
            <Form className={cv('wrapForm')}>
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
        </div>
    );
}
export default AdminUser;