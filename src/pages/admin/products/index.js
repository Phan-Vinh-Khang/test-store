import { useEffect, useState } from 'react';
import classNames from 'classnames/bind'
import objStyle from './index.module.scss'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import { uid } from 'uid';
import TableBootstrap from '../table';
import InputFile from '../../../elements/inputFile';
import allProduct,
{
    allTypeProd,
    createProd,
    uploadImgProd,
    deleteProd,
    deleteProdMany,
    updateProd
} from '../../../services/productServices';
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
    let handleDeleteProduct = async (id, selectedRow, stateChecked) => {
        if (window.confirm('Bạn muốn gỡ sản phẩm ' + stateProducts.listProduct[selectedRow].name + '?\n\n')) {
            try {
                await deleteProd(id)
                stateChecked.delete(id)//thay doi o datastatic la dc ko can reload
                reloadData()
            } catch (e) {
                alert(e.response.data.message)
            }
        }
    }
    let handleUpdateProduct = async (id, selectedRow, stateFile, state) => {
        if (window.confirm('Bạn muốn sửa sản phẩm ' + stateProducts.listProduct[selectedRow].name + '?\n\n')) {
            try {
                await updateProd(id, state.dataInput)
                if (state.dataInput.fileNameUid != undefined) {
                    await uploadImgProd(stateFile, state.dataInput.fileNameUid)
                }
                state.selectedRow = 0
                setTimeout(() => {
                    reloadData()
                }, 500);
            }
            catch (e) {//var e sẽ ref vào data return err
                if (e.response.status != 200)
                    alert(e.response.data.message);
            }
        }
    }
    let handleRemoveMany = async (stateChecked, setStateLoading) => {
        const listId = Array.from(stateChecked);
        if (window.confirm('bạn có muốn gỡ ' + stateChecked.size + ' sản phẩm?')) {
            setStateLoading(true)
            setTimeout(async () => {
                try {
                    setStateLoading(false)
                    await deleteProdMany(listId);
                    stateChecked.clear();
                    reloadData();
                }
                catch (e) {
                    alert(e.response.data.message);//can xu li wait o try catch (khi dang await o try{} se load effect, sau 500ms se dung load effect va gui req, neu req return ve loi se van catch dc o catch{})
                }
            }, 1000);
        }
    }
    const listTypeProd = stateProducts.listType.map(({ typeprodname }) => {
        return typeprodname;
    })
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
            'UserCreateId',
            'UserShopId',
            'createdAt',
            'updatedAt',]}
        listData={stateProducts.listProduct}
        selectData={
            {
                listTypeProd: listTypeProd
            }
        }
        hostName='http://localhost:3001/img/products/'
        ElementTag={['input', 'input', 'input', 'input', InputFile, 'input', '', '', 'select', '', '', '', '']}
        className={cv('modify-user')}
        handleDelete={handleDeleteProduct}
        handleRemoveMany={handleRemoveMany}
        handleUpdate={handleUpdateProduct}
    />, <AddProductModal
        className={cv(stateClassName)}
        reloadData={reloadData}
        reloadInput={stateIdx}
        listType={stateProducts.listType}
    />]
    return (
        <div className={cv('wrapperForm')} Style="height:1000px">
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
                    return item
                })
            }
            {

                stateIdx == 1 && listPage[1]
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
        price: '0',
        des: '',
        discount: '0',
        quantity: '0',
        image: '',
        fileNameUid: '',
        typeprodid: ''
    });
    console.log(stateInput)
    let [stateFile, setStateFile] = useState({})
    let setInput = async (label, e, type = false) => {
        let input = e.target.value;
        if (type) {
            input = input[0]
        }
        if (label == 'price') {
            input = Number(input);
            if (!Number.isSafeInteger(input)) {
                input = stateInput.price;
            }
        }
        else if (label == 'discount') {
            input = Number(input);
            if (Number.isNaN(input)) {
                input = stateInput.discount;
            }
            if (input > 100) {
                input = stateInput.discount
            }

        }
        else if (label == 'quantity') {
            input = Number(input);
            if (!Number.isSafeInteger(input)) {
                input = stateInput.quantity;
            }
        }
        stateInput[label] = input
        if (label == 'image') {
            let fileName = e.target.files[0].name
            let fileExtension = fileName.split('.')[1]
            let fileNameUid = fileName.split('.')[0] + uid() + '.' + fileExtension
            stateInput.fileNameUid = fileNameUid
            stateInput[label] = URL.createObjectURL(e.target.files[0])
            setStateFile(e.target.files[0])//phai setState o day do var state k ref vao files[0] dc(varproperti thi ref dc nhung vay thi datastaticstatefile nay phai la obj)
        }
        setStateInput({
            ...stateInput
        })
    }
    let addProdAdmin = async () => {//add product
        try {
            let fileNameUid = stateInput.fileNameUid
            await createProd(stateInput)
            setTimeout(() => {
                reloadData(); //cho 500ms de luu data vao db,neu chay ngay co the db chua kip luu da return ve data
            }, 100)
            await uploadImgProd(stateFile, fileNameUid) //co the req loi se dung o day(req loi co the do ko co data file dc chon)
            setStateFile({})
        } catch (e) {
            alert(e.response.data.message)
        }
    }
    return (
        <div className={className == '' ? cv('wrapFormTest') : className}>
            <Form >
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Col>
                        <Form.Label>Tên sản phẩm</Form.Label>
                        <Form.Control onChange={(e) => { setInput('name', e) }} type="text" placeholder="Tên sản phẩm" />
                    </Col>
                    <Col>
                        <Form.Label >Giá (VND)  </Form.Label>
                        <Form.Control value={stateInput.price} onChange={(e) => { setInput('price', e) }} type="text" placeholder="Giá" />
                    </Col>
                    <Col>
                        <Form.Label>Mô tả  </Form.Label>
                        <Form.Control onChange={(e) => { setInput('des', e) }} as="textarea" rows="4" placeholder="Mô tả" />
                    </Col>
                    <Col sm="6" >
                        <Form.Label>Giảm giá (%)</Form.Label>
                        <Form.Control value={stateInput.discount} onChange={(e) => { setInput('discount', e) }} placeholder="Giảm giá" />
                    </Col>
                    <Col sm="6" >
                        <Form.Label>Số lượng</Form.Label>
                        <Form.Control value={stateInput.quantity} onChange={(e) => { setInput('quantity', e) }} placeholder="Số lượng" />
                    </Col>
                    <Form.Label>Chọn img</Form.Label>
                    <Form.Control onChange={(e) => { setInput('image', e) }} nctype="multipart/form-data" name='img' type="file" />
                    <img Style='width:50px' src={stateInput.image} />
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
function checkNumber(num) {
    if (Number.isSafeInteger(Number(num))) {
        return num;
    }
}
export default AdminProduct;