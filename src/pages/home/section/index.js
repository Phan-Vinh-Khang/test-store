import { useState, useEffect } from 'react';
import axios from 'axios';
import classNames from 'classnames/bind'
import Slider from "react-slick";
import objStyle from './index.module.scss'
function Section() {
    let cv = classNames.bind(objStyle);
    let arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27];
    let arrDes = ['Thời trang nam', 'Thời trang nữ', 'Điện Thoại & Phụ Kiện', 'Mẹ & Bé', 'Thiết Bị Điện Tử', 'Nhà Cửa & Đời Sống', 'Máy Tính & Laptop', 'Sắc Đẹp', 'Máy Ảnh & Máy Quay Phim', 'Sức Khỏe', 'Đồng Hồ', 'Giày Dép Nữ', 'Giày Dép Nam', 'Thiết Bị Điện Gia Dụng', 'Phụ Kiện & Trang Sức Nữ', 'Thể Thao & Du Lịch', 'Bách Hóa Online', 'Ô Tô & Xe Máy & Xe Đạp', 'Nhà Sách Online', 'Balo & Túi Ví Nam', 'Thời Trang Trẻ Em', 'Đồ Chơi', 'Giặt Giũ & Chăm Sóc Nhà Cửa', 'Chăm Sóc Thú Cưng', 'Voucher & Dịch Vụ', 'Dụng cụ và thiết bị tiện ích']
    var settings = {
        dots: false,
        infinite: false,
        speed: 600,
        slidesToShow: 10,
        slidesToScroll: 4,
        arrows: true
    };
    let ListItem = (arr, arrDes) => {
        return arr.map((item, i, arr) => {
            let nextIdx = (i + 1).toString();
            if (i % 2 == 0) {
                return (
                    <div>
                        <div className={cv('item')}>
                            <img src={'./iconSection1/' + arr[i].toString() + '.png'} />
                            <p>{arrDes[i]}</p>
                        </div>
                        {
                            nextIdx < arr.length ?
                                <div className={cv('item')}>
                                    <img src={'./iconSection1/' + arr[nextIdx] + '.png'} />
                                    <p>{arrDes[nextIdx]}</p>
                                </div> : <div></div>
                        }
                    </div>
                )
            }
        })
    }
    return (
        <div className={cv('wrapper')}>
            <span>Danh mục</span>
            <Slider {...settings}
            >
                {
                    ListItem(arr, arrDes)
                }
            </Slider>
        </div>
    );
}

export default Section;