import { useState, useEffect } from 'react';
import axios from 'axios';
import classNames from 'classnames/bind'
import objStyle from './index.module.scss'
import allproduct from '../../../services/productServices';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Pagination from 'react-bootstrap/Pagination';
import { setPage } from '../../../redux/reduxPages';
let cv = classNames.bind(objStyle);
let count = 0;
function Products() {
    let [stateListProd, setStateListProd] = useState([]);
    let search = useSelector((state) => {
        return state.search.data;
    })
    console.log(search)
    useEffect(() => {
        async function fetchDataProd() {
            let listprod = (await allproduct(search)).data;
            setStateListProd(listprod.listProduct)
        }
        fetchDataProd();
    }, [search])
    let navigate = useNavigate()
    let selectProduct = (id) => {
        //dispatch default data redux page và redux search truoc khi chuyen trang
        //khi ve lai trang se la data default
        navigate(`/DetailProduct/${id}`)
    }
    let listProduct = () => {
        return stateListProd.map((item) => {
            return (
                <div onClick={() => selectProduct(item.id)} className={cv('wrap-product')}>
                    <img src='./Section-Products/img1.jpg' />
                    <div className={cv('wrap-info-product')}>
                        <div className={cv('product-name')}>
                            {item.name}
                        </div>
                        <div className={cv('product-more')}>
                            {/* các icon discount,.... neu có */}
                        </div>
                        <div className={cv('flex')}>
                            <div className={cv('price-item')}>{item.price}</div>
                            <div className={cv('sold-amount')}>{item.quantity}</div>
                        </div>
                    </div>
                </div>
            )
        })
    }
    return (
        <div className={cv('wrapper')}>
            <div className={cv('text-title')}>
                Gợi ý hôm nay
            </div>
            <div className={cv('wrap-flex')}>
                {listProduct()}
            </div>
            <PaginationProduct pageCount={3000} />
        </div>
    );
}
function PaginationProduct({ pageCount }) {
    let dispatch = useDispatch()
    if (pageCount % 30 != 0)
        pageCount += 30;
    pageCount = Math.floor(pageCount / 30);
    let [stateStart, setStateStart] = useState(1);
    let [stateEnd, setStateEnd] = useState(pageCount > 11 ? 11 : pageCount);
    let [statePage, setStatePage] = useState();
    let listPagination = () => {
        let items = [];
        for (let i = stateStart; i <= stateEnd; i++) {
            items.push(<Pagination.Item onClick={() => { selectpage(i) }}>{i}</Pagination.Item>)
        }
        if (stateEnd != pageCount) {
            items.push(<>
                <Pagination.Ellipsis />
                <Pagination.Item>{pageCount}</Pagination.Item>
            </>)
        }
        return items;
    }
    let selectpage = (select) => {
        let mid = (stateEnd + stateStart) / 2;
        if (select > mid) {
            let distance = (select - mid);
            let nextPage = stateEnd + distance;
            if (nextPage > pageCount) {
                distance = pageCount - stateEnd;
            }
            setStateEnd(stateEnd + distance)
            setStateStart(stateStart + distance)
        }
        else {
            let distance = (mid - select);
            let prePage = stateStart - distance;
            if (prePage <= 0) distance = stateStart - 1
            setStateStart(stateStart - distance)
            setStateEnd(stateEnd - distance)
        }
        dispatch(setPage(select))
    }
    let pageStart = () => {
        setStateStart(1)
        setStateEnd(11)
    }
    let pageEnd = () => {
        setStateStart(pageCount - 10)
        setStateEnd(pageCount)
    }
    return (
        <Pagination>
            <Pagination.First onClick={pageStart} />
            <Pagination.Prev />
            {
                listPagination()
            }
            <Pagination.Next />
            <Pagination.Last onClick={pageEnd} />
        </Pagination>
    );
}
export default Products;