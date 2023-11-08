import classNames from 'classnames/bind'
import { useSelector, useDispatch } from 'react-redux';

import Banner from '../banner'
import Section from '../section';
import Products from '../Section-Products';

import objStyle from './index.module.scss'
import { StickyHeader } from '../../../redux/reducer2';
import { useEffect } from 'react';
function WrapperHome() {
    let dispatch = useDispatch();
    useEffect(() => {
        dispatch(StickyHeader())
    }, [])
    let cv = classNames.bind(objStyle)
    return (
        <div>
            <Banner></Banner>
            <div className={cv('wrapper')}>
                <div className={cv('wrapper-center')}>
                    <Section></Section>
                    <Products></Products>
                </div>
            </div>
        </div>
    );
}
export default WrapperHome;