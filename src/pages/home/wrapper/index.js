import classNames from 'classnames/bind'

import Banner from '../banner'
import Section from '../section';

import objStyle from './index.module.scss'
function WrapperHome() {
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