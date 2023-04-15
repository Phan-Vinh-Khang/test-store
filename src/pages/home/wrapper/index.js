import { useState, useEffect } from 'react';
import axios from 'axios';
import classNames from 'classnames/bind'
import Home from '../home';
import Banner from '../banner'
function WrapperHome() {
    return (
        <div>
            <Home />
            <Banner></Banner>
        </div>
    );
}

export default WrapperHome;