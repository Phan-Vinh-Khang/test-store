import { useState, useEffect } from 'react';
import axios from 'axios';
import classNames from 'classnames/bind'
import Home from '../home';
import Banner from '../banner'
import Section from '../section';
function WrapperHome() {
    return (
        <div>
            {/* <Home /> */}
            <Banner></Banner>
            <Section></Section>
        </div>
    );
}

export default WrapperHome;