import { useState, useEffect } from 'react';
import axios from 'axios';
import classNames from 'classnames/bind';
import objStyle from './index.module.scss';
import allproduct from '../../../services/productServices';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Pagination from 'react-bootstrap/Pagination';
import { setPage } from '../../../redux/reduxPages';
import { REACT_APP_API_SERVER_URL } from '../../../urlServer';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

let cv = classNames.bind(objStyle);
const url = REACT_APP_API_SERVER_URL;
function Products() {
    let [stateListProd, setStateListProd] = useState(new Array(30).fill({}));
    let [stateTotalProducts, setStateTotalProducts] = useState(0);
    let search = useSelector((state) => {
        return state.search.data;
    });
    let pageSelected = useSelector((state) => {
        return state.page.page;
    });
    const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'VND',
    });
    let [isLoading, setIsLoading] = useState(false);
    useEffect(() => {
        setStateListProd(new Array(30).fill({}));
        async function fetchDataProd() {
            let listprod = (await allproduct(search, pageSelected)).data;
            setStateListProd(listprod.listProduct);
            setStateTotalProducts(listprod.productCount);
        }
        if (isLoading) {
            setTimeout(() => {
                fetchDataProd();
            }, 1000);
        }
    }, [search, pageSelected]);
    let funcScrollEvent = () => {
        if (window.scrollY >= 250 && !isLoading) {
            let fetchDataProd = async () => {
                let data = await allproduct(search, pageSelected);
                setStateListProd(data.data.listProduct);
                setStateTotalProducts(data.data.productCount);
            };
            setIsLoading(true);
            fetchDataProd();
        } else if (window.scrollY < 250 && isLoading) {
            setIsLoading(false);
        }
    };
    useEffect(() => {
        window.addEventListener('scroll', funcScrollEvent);
        return () => window.removeEventListener('scroll', funcScrollEvent);
    });
    let listProduct = () => {
        return stateListProd.map((item, i) => {
            return (
                <a href={'/DetailProduct/' + item.id} key={i} className={cv('wrap-product')}>
                    {item.id && (
                        <img className={cv('image-product')} src={url + 'img/products/' + item.image} />
                    ) || <Skeleton className={cv('image-product')} />}
                    <div className={cv('wrap-info-product')}>
                        {item.id && (
                            <div className={cv('product-name')} title={item.name}>
                                {item.name}
                            </div>
                        ) || <Skeleton borderRadius='0.5rem' />}
                        <div className={cv('flex')}>
                            {item.id && (
                                <div className={cv('price-item')} title={item.price}>
                                    {formatter.format(item.price - (item.price / 100 * item.discount))}
                                </div>
                            ) || <Skeleton borderRadius='0.5rem' width={60} />}
                            {item.id && (
                                <div className={cv('sold-amount')} title={item.sold}>
                                    Đã bán {item.sold}
                                </div>
                            ) || <Skeleton borderRadius='0.5rem' width={40} />}
                        </div>
                    </div>
                </a>
            );
        });
    };
    return (
        <div className={cv('wrapper')}>
            <div className={cv('text-title')}>Gợi ý hôm nay</div>
            <div className={cv('wrap-flex')}>{listProduct()}</div>
            {stateTotalProducts && (
                <div className={cv('wrap-flex')}>
                    <PaginationProduct totalProducts={stateTotalProducts} selected={pageSelected} />
                </div>
            )}
        </div>
    );
}
function PaginationProduct({ totalProducts, selected }) {
    let dispatch = useDispatch();
    let totalPage = Math.ceil(totalProducts / 30);
    let pageStart = Math.max(selected - 5, 1);
    let pageEnd = Math.min(totalPage, pageStart + 10);
    if (10 + pageStart > totalPage) pageStart = Math.max(1, totalPage - 10);
    let listPage = [];
    for (let i = pageStart; i <= pageEnd; i++) {
        if (i != selected) listPage.push(<Pagination.Item onClick={() => dispatch(setPage(i))}>{i}</Pagination.Item>);
        else listPage.push(<Pagination.Item active>{i}</Pagination.Item>);
    }
    return (
        <Pagination>
            <Pagination.First onClick={() => dispatch(setPage(1))} />
            <Pagination.Prev onClick={() => dispatch(setPage(Math.max(1, selected - 1)))} />
            {pageStart > 1 ? <Pagination.Ellipsis /> : ''}
            {listPage}
            {pageEnd < totalPage ? <Pagination.Ellipsis /> : ''}
            <Pagination.Next onClick={() => dispatch(setPage(Math.min(totalPage, selected + 1)))} />
            <Pagination.Last onClick={() => dispatch(setPage(totalPage))} />
        </Pagination>
    );
}

export default Products;
