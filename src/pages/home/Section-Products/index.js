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
    let pageSelected = useSelector((state) => {
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
        async function fetchDataProd() {
            let listprod = (await allproduct(search, pageSelected)).data;
            setStateListProd(listprod.listProduct)
            setStatePageCount(listprod.productCount)
        }
        fetchDataProd();
    }, [search, pageSelected])
    // let [stateIsLoad, setstateIsLoad] = useState(false)
    // let func = () => {
    //     if (window.scrollY > 300 && !stateIsLoad) {
    //         async function fetchDataProd() {
    //             let listprod = (await allproduct(search, page)).data;
    //             setStateListProd(listprod.listProduct)
    //             setStatePageCount(listprod.productCount)
    //         }
    //         stateIsLoad = true
    //         setTimeout(() => {
    //             fetchDataProd();
    //         }, 1500)
    //     }
    // }
    // useEffect(() => {
    //     window.addEventListener('scroll', func)
    //     return () => window.removeEventListener('scroll', func)
    // }, [])
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
    console.log('imagePage', pageSelected)
    /*sau khi dispatch sẽ reload function và sẽ hiển thị paganition với selectPage đã chọn và nó sẽ dc đặt vào DOM
    nhưng lúc này vẫn chưa có những products tương ứng với pageSelect dc chọn do useEffect() chưa dc chạy
    sau khi useEffect chạy và reload 1 lần nữa mới có data product tương ứng với pageSelect dc chọn
    */
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
                        totalProducts={statePageCount}
                        selected={pageSelected}
                    />
                </div>
            }
        </div>
    );
}
function PaginationProduct({ totalProducts, selected }) {
    /*
    có thể thay đổi lại de tan dung load lại của function paren vi khi dispatch paren sẽ load lại và pagination cũng sẽ load lại
    co thể set Start và End ở function Paren
    hoac select ở function này +5 và -5
    */
    let dispatch = useDispatch();
    let totalPage = Math.ceil(totalProducts / 30);
    let pageStart = Math.max(selected - 5, 1);
    let pageEnd = Math.min(totalPage, pageStart + 10)
    if (10 + pageStart > totalPage) pageStart = Math.max(1, totalPage - 10)
    let listPage = [];
    for (let i = pageStart; i <= pageEnd; i++) {
        if (i != selected)
            listPage.push(<Pagination.Item onClick={() => dispatch(setPage(i))} >{i}</Pagination.Item>)
        else listPage.push(<Pagination.Item active>{i}</Pagination.Item>)
    }
    return <Pagination>
        <Pagination.First onClick={() => dispatch(setPage(1))} />
        <Pagination.Prev onClick={() => dispatch(setPage(Math.max(1, selected - 1)))} />
        {pageStart > 1 ? <Pagination.Ellipsis /> : ''}
        {listPage}
        {pageEnd < totalPage ? <Pagination.Ellipsis /> : ''}
        <Pagination.Next onClick={() => dispatch(setPage(Math.min(totalPage, selected + 1)))} />
        <Pagination.Last onClick={() => dispatch(setPage(totalPage))} />
    </Pagination>
}
export default Products;