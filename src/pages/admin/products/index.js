import { useEffect, useState } from 'react';
import classNames from 'classnames/bind'
import objStyle from './index.module.scss'
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import TableBootstrap from '../table';
import allProduct from '../../../services/productServices';
import { allTypeProd } from '../../../services/productServices';
let cv = classNames.bind(objStyle);
function AdminUser() {
    let [stateIdx, setStateIdx] = useState(0)
    let [stateClassName, setStateClassName] = useState('')
    let [stateProducts, setStateProducts] = useState({
        listProduct: Array(20).fill(0),
        listType: []
    })
    let [stateReLoad, setStateReLoad] = useState(false)
    let reLoadData = () => {
        setStateReLoad(!stateReLoad)
    }
    useEffect(() => {
        let fetchData = async () => {
            let products = (await allProduct()).data;
            let types = (await allTypeProd()).data;
            setStateProducts({
                listProduct: products.listProduct,
                listType: types.listTypeProd
            }
            )
        }
        fetchData();
    }, [stateReLoad])
    let listPage = [<TableBootstrap
        thead={['Name',
            'Price',
            'Img',
            'Description',
            'Discount',
            'Quantity',
            'Star',
            'Sold',
            'TypeProd',
            'createdAt',
            'updatedAt',]}
        ElementTag={['input', 'input', 'input', 'input', 'input', 'input', 'input', 'input', 'select', '', '']}
        propertieTag={['', '', 'file', '', '']}
        listData={stateProducts.listProduct}
        listData2={stateProducts.listType}
        className={cv('modify-user')}
        reReqData={reLoadData}
    />, <Page2 className={cv(stateClassName)} />]
    return (
        <div className={cv('wrapperForm')}>
            <div className={cv('navbar')}>
                {
                    stateIdx > 0 &&
                    <span onClick={() => {
                        setStateIdx(--stateIdx)
                        setStateClassName('wrapForm2')

                    }}>
                        <i class="fa-solid fa-arrow-left fa-xl"></i>
                    </span>
                }
                <span className={cv('title')}> Quản lí sản phẩm</span>
            </div>
            {
                listPage.map((item, idx) => {
                    console.log('aaaaaaa', item)
                    return item
                })
            }
            {stateIdx < 1 &&
                <Button
                    onClick={() => {
                        setStateIdx(++stateIdx)
                        setStateClassName('wrapForm')
                    }
                    } variant="primary">
                    <i Style='margin-right:4px' class="fa-sharp fa-solid fa-plus" /> Thêm sản phẩm
                </Button>
            }
        </div>

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
function Page2(obj) {
    console.log('a', obj.className)
    return (
        <div className={obj.className == '' ? cv('wrapFormTest') : obj.className}>
            <Form >
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