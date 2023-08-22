import { useEffect, useState } from 'react';
import classNames from 'classnames/bind'
import objStyle from './index.module.scss'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { uid } from 'uid';
import TableBootstrap from '../table';
import allProduct, { allTypeProd, createProd, uploadImgProd } from '../../../services/productServices';
let cv = classNames.bind(objStyle);
function AdminProduct() {
    let [stateIdx, setStateIdx] = useState(0)
    let [stateClassName, setStateClassName] = useState('')
    let [stateProducts, setStateProducts] = useState({
        listProduct: Array(20).fill(0),
        listType: []
    })
    let [stateReLoad, setStateReLoad] = useState(false)
    let reloadData = () => {
        setStateReLoad(!stateReLoad)
        setStateIdx(0)
        setStateClassName('wrapForm2')
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
    // let handleDeleteProduct = async (id, selectedRow, stateChecked, avatarFile) => {
    //     if (window.confirm('Bạn muốn gỡ người dùng ' + stateProducts.listProduct[selectedRow].email + '?\n\n')) {
    //         try {
    //             await deleteUser({ id, access_token: access_token, avatarFile })
    //             stateChecked.delete(id)//thay doi o datastatic la dc ko can reload
    //             reloadData()
    //         } catch (e) {
    //             alert(e.response.data.message)
    //         }
    //     }
    // }
    // let handleUpdateProduct = async (id, selectedRow, stateFile, state) => {
    //     if (window.confirm('Bạn muốn sửa người dùng ' + stateProducts.listProduct[selectedRow].email + '?\n\n')) {
    //         try {//su dụng try catch khi return ve client obj err (status 400,403,409) se su dung dc obj err ở catch (var e sẽ ref vào obj err)
    //             //su dung e.response.data de ref vao data server return ve (thong thuong neu ko co loi se su dung obj.data nhung neu co loi obj server return ve se dc var propertoes response ref vao)
    //             await updateUser(id, access_token, state.dataInput)
    //             if (state.dataInput.imgName != null) {
    //                 await uploadAvatar(stateFile, state.dataInput.imgName)
    //             }
    //             state.selectedRow = 0
    //             setTimeout(() => {
    //                 reloadData()
    //             }, 500);
    //         }
    //         catch (e) {//var e sẽ ref vào data return err
    //             if (e.response.status == 422)
    //                 alert(e.response.data.message);
    //         }
    //     }
    // }
    // let handleRemoveMany = async (stateChecked, setStateLoading) => {
    //     const listId = Array.from(stateChecked);
    //     if (window.confirm('bạn có muốn gỡ ' + stateChecked.size + ' user?')) {
    //         setStateLoading(true)
    //         setTimeout(async () => {
    //             try {
    //                 setStateLoading(false)
    //                 await deleteUserMany({ access_token, listId });
    //                 stateChecked.clear();
    //                 reloadData();
    //             }
    //             catch (e) {
    //                 alert(e.response.data.message);//can xu li wait o try catch (khi dang await o try{} se load effect, sau 500ms se dung load effect va gui req, neu req return ve loi se van catch dc o catch{})
    //             }
    //         }, 1000);
    //     }
    // }
    let listPage = [<TableBootstrap
        thead={['Name',
            'Price',
            'Discount',
            'Description',
            'Img',
            'Quantity',
            'Star',
            'Sold',
            'TypeProd',
            'createdAt',
            'updatedAt',]}
        listData={stateProducts.listProduct}
        listData2={stateProducts.listType}
        hostName='http://localhost:3001/img/products/'
        ElementTag={['input', 'input', 'input', 'input', 'input', 'input', 'input', 'input', 'select', '', '']}
        propertieTag={['', '', 'file', '', '']}
        className={cv('modify-user')}
    // handleDelete={handleDeleteProduct}
    // handleUpdate={handleUpdateProduct}
    // handleRemoveMany={handleRemoveMany}
    />, <AddProductModal
        className={cv(stateClassName)}
        reloadData={reloadData}
        reloadInput={stateIdx}
        listType={stateProducts.listType}
    />]
    return (
        <div className={cv('wrapperForm')} Style='height:200vh'>
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
                listPage[0]
            }
            {


                listPage[1]//reloadInpout khi bat tat modal
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
function AddProductModal({ className, reloadData, listType }) {
    let [stateInput, setStateInput] = useState({
        name: '',
        price: '',
        des: '',
        discount: '',
        quantity: '',
        img: '',
        imgName: '',
        typeprodid: ''
    });
    let [stateFile, setStateFile] = useState({})
    let setInput = async (label, e, type = false) => {
        let input = e.target.value;
        if (type) {
            input = input[0]
        }
        stateInput[label] = input
        if (label == 'img') {
            let fileName = e.target.files[0].name
            let fileExtension = fileName.split('.')[1]
            let fileNameUid = fileName.split('.')[0] + uid() + '.' + fileExtension
            stateInput['imgName'] = fileNameUid
            stateInput[label] = URL.createObjectURL(e.target.files[0])
            setStateFile(e.target.files[0])//phai setState o day do var state k ref vao files[0] dc(varproperti thi ref dc nhung vay thi datastaticstatefile nay phai la obj)
        }
        setStateInput({
            ...stateInput
        })
    }
    let addProdAdmin = async () => {
        try {
            let access_token = localStorage.getItem('access_token')
            let imgName = stateInput.imgName
            await createProd({ access_token, data: stateInput })
            setStateInput({
                name: '',
                price: '',
                des: '',
                discount: '',
                quantity: '',
                img: '',
                imgName: '',
                typeprod: ''
            })
            setTimeout(() => {
                reloadData(); //cho 500ms de luu data vao db,neu chay ngay co the db chua kip luu da return ve data
            }, 100)
            await uploadImgProd(stateFile, imgName) //co the req loi se dung o day(req loi co the do ko co data file dc chon)
            setStateFile({})
        } catch (e) {
            alert(e.response.data.message)
        }
    }
    console.log(stateInput, stateFile)
    return (
        <div className={className == '' ? cv('wrapFormTest') : className}>
            <Form >
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Col>
                        <Form.Label>Tên sản phẩm</Form.Label>
                        <Form.Control onChange={(e) => { setInput('name', e) }} type="text" placeholder="Tên sản phẩm" />
                    </Col>
                    <Col>
                        <Form.Label>Giá  </Form.Label>
                        <Form.Control onChange={(e) => { setInput('price', e) }} type="text" placeholder="Giá" />
                    </Col>
                    <Col>
                        <Form.Label>Mô tả  </Form.Label>
                        <Form.Control onChange={(e) => { setInput('des', e) }} as="textarea" rows="4" placeholder="Mô tả" />
                    </Col>
                    <Col sm="6" >
                        <Form.Label>Giảm giá</Form.Label>
                        <Form.Control onChange={(e) => { setInput('discount', e) }} type="number" min="0" max="100" placeholder="Giảm giá" />
                    </Col>
                    <Col sm="6" >
                        <Form.Label>Số lượng</Form.Label>
                        <Form.Control onChange={(e) => { setInput('quantity', e) }} type="number" min='0' max='9999' placeholder="Số lượng" />
                    </Col>
                    <Form.Label>Chọn img</Form.Label>
                    <Form.Control onChange={(e) => { setInput('img', e) }} nctype="multipart/form-data" name='img' type="file" />
                    <img Style='width:50px' />
                    <Form.Select onChange={(e) => { setInput('typeprodid', e, true) }} Style='margin-top:24px'>
                        <option>-----------------</option>
                        {
                            listType.map((item) => {
                                return <option>{item.id + "." + item.typeprodname}</option>
                            })
                        }
                    </Form.Select>
                </Form.Group>
                <Button onClick={() => { addProdAdmin() }} variant="primary">
                    Thêm người dùng
                </Button>
            </Form>
        </div>
    );
}
export default AdminProduct;