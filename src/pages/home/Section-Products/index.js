import { useState, useEffect } from 'react';
import axios from 'axios';
import classNames from 'classnames/bind'
import objStyle from './index.module.scss'
import allproduct from '../../../services/productServices';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Pagination from 'react-bootstrap/Pagination';
import { setPage } from '../../../redux/reduxPages';
import { REACT_APP_API_SERVER_URL } from '../../../urlServer';
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

let cv = classNames.bind(objStyle);
const url = REACT_APP_API_SERVER_URL;
function Products() {
    let [stateListProd, setStateListProd] = useState(new Array(30).fill({}));
    let [statePageCount, setStatePageCount] = useState(0);
    let search = useSelector((state) => {
        return state.search.data;
    })
    let page = useSelector((state) => {
        return Number(state.page.page)
    })
    let [state, setState] = useState({
        search: '',
        page: 1
    })
    const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'VND',
    });
    useEffect(() => {
        setStateListProd(new Array(30).fill({}))
        async function fetchDataProd() {
            let listprod = (await allproduct(search, page)).data;
            setStateListProd(listprod.listProduct)
            setStatePageCount(listprod.productCount)
        }
        if (search != state.search || page != state.page) {
            setState({ search: search, page: page })
            setTimeout(() => {
                fetchDataProd();
            }, 300)
        }
    }, [search, page])
    let [stateIsLoad, setstateIsLoad] = useState(false)
    let func = () => {
        if (window.pageYOffset > 300 && !stateIsLoad) {
            async function fetchDataProd() {
                let listprod = (await allproduct(search, page)).data;
                setStateListProd(listprod.listProduct)
                setStatePageCount(listprod.productCount)
            }
            stateIsLoad = true
            setTimeout(() => {
                fetchDataProd();
            }, 1500)
        }
    }
    useEffect(() => {
        window.addEventListener('scroll', func)
        return () => window.removeEventListener('scroll', func)
    }, [])
    //them sau khi search se quay ve page1
    let navigate = useNavigate()
    let selectProduct = (id) => {
        navigate(`/DetailProduct/${id}`)
    }
    let listProduct = () => {
        return stateListProd.map((item, i) => {
            return (
                <div key={i} onClick={() => selectProduct(item.id)} className={cv('wrap-product')}>
                    {(item.id && <img
                        className={cv('image-product')}
                        src={url + 'img/products/' + item.image}
                    />) || <Skeleton className={cv('image-product')}></Skeleton>}
                    <div className={cv('wrap-info-product')}>
                        {item.id && <div className={cv('product-name')}
                            title={item.name}
                        >
                            {item.name}
                        </div> || <Skeleton />}
                        <div className={cv('product-more')}>
                            {/* các icon discount,.... neu có */}
                        </div>
                        <div className={cv('flex')}>
                            {(item.id && <div className={cv('price-item')}
                                title={item.price}
                            >{formatter.format(item.price - (item.price / 100 * item.discount))}
                            </div>) ||
                                <Skeleton className={cv('price-item')} />
                            }
                            {(item.id && <div className={cv('sold-amount')}
                                title={item.sold}
                            >Đã bán {item.sold}</div>) ||
                                <Skeleton />
                            }
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