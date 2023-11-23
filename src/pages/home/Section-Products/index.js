import { useState, useEffect } from 'react';
import axios from 'axios';
import classNames from 'classnames/bind'
import objStyle from './index.module.scss'
import allproduct from '../../../services/productServices';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Pagination from 'react-bootstrap/Pagination';
import { setSearch } from '../../../redux/reduxSearch';
import { setPage } from '../../../redux/reduxPages';
import { REACT_APP_API_SERVER, REACT_APP_API_SERVER_LOCAL } from '../../../urlServer';
let cv = classNames.bind(objStyle);
function Products() {
    let [stateListProd, setStateListProd] = useState([]);
    let [statePageCount, setStatePageCount] = useState(0);
    let search = useSelector((state) => {
        return state.search.data;
    })
    let page = useSelector((state) => {
        return Number(state.page.page)
    })
    useEffect(() => {
        async function fetchDataProd() {
            let listprod = (await allproduct(search, page)).data;
            setStateListProd(listprod.listProduct)
            setStatePageCount(listprod.productCount)
        }
        fetchDataProd();
    }, [search, page])
    //them sau khi search se quay ve page1
    let navigate = useNavigate()
    let selectProduct = (id) => {
        navigate(`/DetailProduct/${id}`)
    }
    let listProduct = () => {
        return stateListProd.map((item, i) => {
            return (
                <div key={i} onClick={() => selectProduct(item.id)} className={cv('wrap-product')}>
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
                            <div className={cv('sold-amount')}>{item.sold}</div>
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
            {statePageCount &&
                <div className={cv('wrap-flex')}>
                    <PaginationProduct
                        pageCount={statePageCount}
                        select={page}
                    />
                </div>
            }
        </div>
    );
}
function PaginationProduct({ pageCount, select }) {
    /*
    có thể thay đổi lại de tan dung load lại của function paren vi khi dispatch paren sẽ load lại và pagination cũng sẽ load lại
    co thể set Start và End ở function Paren
    hoac select ở function này +5 và -5
    */

    let dispatch = useDispatch()
    if (pageCount % 30 != 0) {
        pageCount = (pageCount + (30 - (pageCount % 30)));
    }
    pageCount /= 30;
    let stateStart = select - 5, stateEnd = select + 5;

    if (stateStart < 1) {
        stateStart = 1
        stateEnd += Math.abs(select - 5) + 1

    }
    if (stateEnd > pageCount) {
        stateStart = pageCount - 10;
        stateEnd = pageCount
    }
    // let [stateStart, setStateStart] = useState(1);
    // let [stateEnd, setStateEnd] = useState(pageCount > 11 ? 11 : pageCount);
    let listPagination = () => {
        let items = [];
        for (let i = stateStart; i <= stateEnd; i++) {
            if (i == select)
                items.push(<Pagination.Item Style='background-color:rgba(225, 153, 153, 1)' onClick={() => { selectpage(i) }}>{i}</Pagination.Item>)
            else {
                items.push(<Pagination.Item onClick={() => { selectpage(i) }}>{i}</Pagination.Item>)
            }
        }
        if (stateEnd != pageCount) {
            items.push(<>
                <Pagination.Ellipsis />
                <Pagination.Item onClick={() => { selectpage(pageCount) }}>{pageCount}</Pagination.Item>
            </>)
        }
        return items;
    }
    let selectpage = (select) => {
        // let mid = Math.floor((stateEnd + stateStart) / 2);
        // if (select > mid) {
        //     let distance = (select - mid);
        //     let nextPage = stateEnd + distance;
        //     if (nextPage > pageCount) {
        //         distance = pageCount - stateEnd;
        //     }
        //     setStateEnd(stateEnd + distance)
        //     setStateStart(stateStart + distance)
        // }
        // else {
        //     let distance = (mid - select);
        //     let prePage = stateStart - distance;
        //     if (prePage <= 0) distance = stateStart - 1
        //     setStateStart(stateStart - distance)
        //     setStateEnd(stateEnd - distance)
        // }
        dispatch(setPage(select))
    }
    let pageStart = () => {
        // if (pageCount > 11) {
        //     setStateStart(1)
        //     setStateEnd(11)
        // }
        dispatch(setPage(1))
    }
    let pageEnd = () => {
        // if (pageCount > 11) {
        //     setStateStart(pageCount - 10)
        //     setStateEnd(pageCount)
        // }
        dispatch(setPage(pageCount))

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