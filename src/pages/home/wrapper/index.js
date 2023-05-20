import classNames from 'classnames/bind'
import { useSelector, useDispatch } from 'react-redux';

import Banner from '../banner'
import Section from '../section';

import objStyle from './index.module.scss'
import { StickyHeader } from '../../../redux/reducer2';
let w = 1;
function WrapperHome() {
    let dispatch = useDispatch();
    console.log('home: ', useSelector((state) => {
        return state;
    }))
    if (w == 1) {
        dispatch(StickyHeader())
        w++;
    }
    let cv = classNames.bind(objStyle)
    return (
        <div>
            <Banner></Banner>
            <div className={cv('wrapper')}>
                <div className={cv('wrapper-center')}>
                    <Section></Section>
                </div>
            </div>
        </div>
    );
}
export default WrapperHome;