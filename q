[33mcommit 15b39cfe3cbe2bb8810d7987060250e65b88604b[m[33m ([m[1;36mHEAD -> [m[1;32mmain[m[33m, [m[1;31morigin/main[m[33m, [m[1;31morigin/HEAD[m[33m)[m
Author: Phan Vĩnh Khang <khangpv.19th@sv.dla.edu.vn>
Date:   Fri May 17 04:03:23 2024 +0700

    feature file,update url request

[1mdiff --git a/src/feature b/src/feature[m
[1mnew file mode 100644[m
[1mindex 0000000..fd686c6[m
[1m--- /dev/null[m
[1m+++ b/src/feature[m
[36m@@ -0,0 +1,4 @@[m
[32m+[m[32mfeature logout sẽ redirect về trang home hoặc login tránh trường hợp đang ở giỏ hàng[m
[32m+[m[32mấn logout vẫn còn hiện những data của giỏ hàng[m
[32m+[m
[32m+[m[32mfeature ấn vào sản phẩm khi redirect đến trang detail sẽ lướt lên trang top[m
\ No newline at end of file[m
[1mdiff --git a/src/layout/Header/content/tippy-cart/index .js b/src/layout/Header/content/tippy-cart/index .js[m
[1mindex 7b53c21..2925fde 100644[m
[1m--- a/src/layout/Header/content/tippy-cart/index .js[m	
[1m+++ b/src/layout/Header/content/tippy-cart/index .js[m	
[36m@@ -3,9 +3,9 @@[m [mimport axios from 'axios';[m
 import classNames from 'classnames/bind'[m
 import objStyle from './index.module.scss'[m
 import { getcart } from '../../../../services/orders';[m
[31m-import { REACT_APP_API_SERVER, REACT_APP_API_SERVER_LOCAL } from '../../../../urlServer'[m
[32m+[m[32mimport { REACT_APP_API_SERVER_URL } from '../../../../urlServer'[m
 let cv = classNames.bind(objStyle)[m
[31m-const url = REACT_APP_API_SERVER;[m
[32m+[m[32mconst url = REACT_APP_API_SERVER_URL;[m
 function TippyCart() {[m
     let [stateCart, setStateCart] = useState([])[m
     useEffect(() => {[m
[1mdiff --git a/src/layout/Header/nav/index.js b/src/layout/Header/nav/index.js[m
[1mindex 90b8eb3..f70b039 100644[m
[1m--- a/src/layout/Header/nav/index.js[m
[1m+++ b/src/layout/Header/nav/index.js[m
[36m@@ -8,8 +8,8 @@[m [mimport Tippy from '@tippyjs/react/headless';[m
 import { useDispatch, useSelector } from 'react-redux';[m
 import { setLoginReducer } from '../../../redux/reducerLogin';[m
 import { Logout as LogoutAuth } from '../../../services/userServices';[m
[31m-import { REACT_APP_API_SERVER, REACT_APP_API_SERVER_LOCAL } from '../../../urlServer';[m
[31m-const url = REACT_APP_API_SERVER;[m
[32m+[m[32mimport { REACT_APP_API_SERVER_URL } from '../../../urlServer';[m
[32m+[m[32mconst url = REACT_APP_API_SERVER_URL;[m
 function NavHeader() {[m
     let cv = classNames.bind(objStyle)[m
     let cv2 = classNames.bind(objGlobalStyle)[m
[1mdiff --git a/src/pages/admin/products/index.js b/src/pages/admin/products/index.js[m
[1mindex 57dce00..97b034c 100644[m
[1m--- a/src/pages/admin/products/index.js[m
[1m+++ b/src/pages/admin/products/index.js[m
[36m@@ -7,7 +7,7 @@[m [mimport Col from 'react-bootstrap/Col';[m
 import { uid } from 'uid';[m
 import TableBootstrap from '../table';[m
 import InputFile from '../../../elements/inputFile';[m
[31m-import { REACT_APP_API_SERVER, REACT_APP_API_SERVER_LOCAL } from '../../../urlServer';[m
[32m+[m[32mimport { REACT_APP_API_SERVER_URL } from '../../../urlServer';[m
 import allProduct,[m
 {[m
     allTypeProd,[m
[36m@@ -18,7 +18,7 @@[m [mimport allProduct,[m
     updateProd[m
 } from '../../../services/productServices';[m
 let cv = classNames.bind(objStyle);[m
[31m-const url = REACT_APP_API_SERVER;[m
[32m+[m[32mconst url = REACT_APP_API_SERVER_URL;[m
 function AdminProduct() {[m
     let [stateIdx, setStateIdx] = useState(0)[m
     let [stateClassName, setStateClassName] = useState('')[m
[1mdiff --git a/src/pages/admin/users/index.js b/src/pages/admin/users/index.js[m
[1mindex 170f820..fc1831c 100644[m
[1m--- a/src/pages/admin/users/index.js[m
[1m+++ b/src/pages/admin/users/index.js[m
[36m@@ -10,9 +10,9 @@[m [mimport { allRole } from '../../../services/adminServices';[m
 import { updateUser, uploadAvatar } from "../../../services/userServices";[m
 import { deleteUser, deleteUserMany } from '../../../services/adminServices';[m
 import InputFile from '../../../elements/inputFile';[m
[31m-import { REACT_APP_API_SERVER, REACT_APP_API_SERVER_LOCAL } from '../../../urlServer';[m
[32m+[m[32mimport { REACT_APP_API_SERVER_URL } from '../../../urlServer';[m
 let cv = classNames.bind(objStyle);[m
[31m-const url = REACT_APP_API_SERVER;[m
[32m+[m[32mconst url = REACT_APP_API_SERVER_URL;[m
 function AdminUser() {[m
     let [stateDataUsers, setStateDataUsers] = useState({[m
         listUser: Array(20).fill(0),[m
[1mdiff --git a/src/pages/cart/wrapper.js b/src/pages/cart/wrapper.js[m
[1mindex 05992da..de2a3c8 100644[m
[1m--- a/src/pages/cart/wrapper.js[m
[1m+++ b/src/pages/cart/wrapper.js[m
[36m@@ -8,9 +8,9 @@[m [mimport { useDispatch, useSelector } from 'react-redux';[m
 import { setlistOrder } from '../../redux/reduxOrder';[m
 import _, { cloneDeep } from 'lodash'[m
 import { useNavigate } from 'react-router-dom';[m
[31m-import { REACT_APP_API_SERVER, REACT_APP_API_SERVER_LOCAL } from '../../urlServer';[m
[32m+[m[32mimport { REACT_APP_API_SERVER_URL } from '../../urlServer';[m
 let cv = classNames.bind(objStyle);[m
[31m-const url = REACT_APP_API_SERVER;[m
[32m+[m[32mconst url = REACT_APP_API_SERVER_URL;[m
 function WrapperCart() {[m
     let [stateCart, setStateCart] = useState([])[m
     let [stateBtn, setStateBtn] = useState(true)[m
[1mdiff --git a/src/pages/checkout/wrapper.js b/src/pages/checkout/wrapper.js[m
[1mindex 1b8a509..638dc83 100644[m
[1m--- a/src/pages/checkout/wrapper.js[m
[1m+++ b/src/pages/checkout/wrapper.js[m
[36m@@ -9,9 +9,9 @@[m [mimport { useNavigate } from 'react-router-dom';[m
 import { checkout } from '../../services/orders';[m
 import Button from 'react-bootstrap/Button';[m
 import { ToastContainer, toast } from 'react-toastify';[m
[31m-import { REACT_APP_API_SERVER, REACT_APP_API_SERVER_LOCAL } from '../../urlServer';[m
[32m+[m[32mimport { REACT_APP_API_SERVER_URL } from '../../urlServer';[m
 let cv = classNames.bind(objStyle);[m
[31m-const url = REACT_APP_API_SERVER;[m
[32m+[m[32mconst url = REACT_APP_API_SERVER_URL;[m
 function WrapperCheckout() {[m
     let navigate = useNavigate();[m
     const user = useSelector((state) => {[m
[1mdiff --git a/src/pages/detail/section1/index.js b/src/pages/detail/section1/index.js[m
[1mindex 7ca05c0..f0e53f0 100644[m
[1m--- a/src/pages/detail/section1/index.js[m
[1m+++ b/src/pages/detail/section1/index.js[m
[36m@@ -12,9 +12,9 @@[m [mimport lodash from 'lodash'[m
 import { addCart } from '../../../services/orders';[m
 import { ToastContainer, toast } from 'react-toastify';[m
 import 'react-toastify/dist/ReactToastify.css';[m
[31m-import { REACT_APP_API_SERVER, REACT_APP_API_SERVER_LOCAL } from '../../../urlServer';[m
[32m+[m[32mimport { REACT_APP_API_SERVER_URL } from '../../../urlServer';[m
 let cv = classNames.bind(objStyle);[m
[31m-const url = REACT_APP_API_SERVER + 'img/products/'[m
[32m+[m[32mconst url = REACT_APP_API_SERVER_URL + 'img/products/'[m
 function Section1({ stateProduct }) {[m
     let navigate = useNavigate()[m
     let [stateidxSlide, setStateidxSlide] = useState(0);[m
[1mdiff --git a/src/pages/detail/section3/index.js b/src/pages/detail/section3/index.js[m
[1mindex fd71b2e..4296e56 100644[m
[1m--- a/src/pages/detail/section3/index.js[m
[1m+++ b/src/pages/detail/section3/index.js[m
[36m@@ -6,9 +6,9 @@[m [mimport { useDispatch } from 'react-redux'[m
 import { useNavigate } from 'react-router-dom';[m
 import { ToastContainer, toast } from 'react-toastify';[m
 import 'react-toastify/dist/ReactToastify.css';[m
[31m-import { REACT_APP_API_SERVER, REACT_APP_API_SERVER_LOCAL } from '../../../urlServer';[m
[32m+[m[32mimport { REACT_APP_API_SERVER_URL } from '../../../urlServer';[m
 let cv = classNames.bind(objStyle);[m
[31m-const url = REACT_APP_API_SERVER + 'img/products/'[m
[32m+[m[32mconst url = REACT_APP_API_SERVER_URL + 'img/products/'[m
 function Section3({ stateProduct }) {[m
     console.log('a', stateProduct)[m
     return ([m
[1mdiff --git a/src/pages/home/Section-Products/index.js b/src/pages/home/Section-Products/index.js[m
[1mindex 6e43f05..29b7d4d 100644[m
[1m--- a/src/pages/home/Section-Products/index.js[m
[1m+++ b/src/pages/home/Section-Products/index.js[m
[36m@@ -7,12 +7,12 @@[m [mimport { useNavigate } from 'react-router-dom';[m
 import { useDispatch, useSelector } from 'react-redux';[m
 import Pagination from 'react-bootstrap/Pagination';[m
 import { setPage } from '../../../redux/reduxPages';[m
[31m-import { REACT_APP_API_SERVER, REACT_APP_API_SERVER_LOCAL } from '../../../urlServer';[m
[32m+[m[32mimport { REACT_APP_API_SERVER_URL } from '../../../urlServer';[m
 import Skeleton from 'react-loading-skeleton'[m
 import 'react-loading-skeleton/dist/skeleton.css'[m
 [m
 let cv = classNames.bind(objStyle);[m
[31m-const url = REACT_APP_API_SERVER;[m
[32m+[m[32mconst url = REACT_APP_API_SERVER_URL;[m
 function Products() {[m
     let [stateListProd, setStateListProd] = useState(new Array(30).fill({}));[m
     let [statePageCount, setStatePageCount] = useState(0);[m
[1mdiff --git a/src/pages/order/purchase/wrapper.js b/src/pages/order/purchase/wrapper.js[m
[1mindex 00aa2e1..cd030af 100644[m
[1m--- a/src/pages/order/purchase/wrapper.js[m
[1m+++ b/src/pages/order/purchase/wrapper.js[m
[36m@@ -6,10 +6,10 @@[m [mimport Button from 'react-bootstrap/Button';[m
 import { useDispatch, useSelector } from 'react-redux';[m
 import _, { cloneDeep } from 'lodash'[m
 import { useNavigate } from 'react-router-dom';[m
[31m-import { REACT_APP_API_SERVER, REACT_APP_API_SERVER_LOCAL } from '../../../urlServer';[m
[32m+[m[32mimport { REACT_APP_API_SERVER_URL } from '../../../urlServer';[m
 import { getorder } from '../../../services/orders';[m
 let cv = classNames.bind(objStyle);[m
[31m-const url = REACT_APP_API_SERVER;[m
[32m+[m[32mconst url = REACT_APP_API_SERVER_URL;[m
 function WrapperPurchase() {[m
     let [stateLocationY, setStateLocationY] = useState(300)[m
     let [stateListOrder, setStateListOrder] = useState();[m
[1mdiff --git a/src/pages/order/wrapper.js b/src/pages/order/wrapper.js[m
[1mindex b1e9a93..2d24698 100644[m
[1m--- a/src/pages/order/wrapper.js[m
[1m+++ b/src/pages/order/wrapper.js[m
[36m@@ -6,10 +6,10 @@[m [mimport Button from 'react-bootstrap/Button';[m
 import { useDispatch, useSelector } from 'react-redux';[m
 import _, { cloneDeep } from 'lodash'[m
 import { useNavigate } from 'react-router-dom';[m
[31m-import { REACT_APP_API_SERVER, REACT_APP_API_SERVER_LOCAL } from '../../urlServer';[m
[32m+[m[32mimport { REACT_APP_API_SERVER_URL } from '../../urlServer';[m
 import WrapperPurchase from './purchase/wrapper';[m
 let cv = classNames.bind(objStyle);[m
[31m-const url = REACT_APP_API_SERVER;[m
[32m+[m[32mconst url = REACT_APP_API_SERVER_URL;[m
 function WrapperOrder() {[m
     const user = useSelector((state) => {[m
         return state.dataLogged[m
[1mdiff --git a/src/services/interceptor.js b/src/services/interceptor.js[m
[1mindex c155a85..a7989ee 100644[m
[1m--- a/src/services/interceptor.js[m
[1m+++ b/src/services/interceptor.js[m
[36m@@ -1,11 +1,11 @@[m
 import axios from "axios"[m
 import { reFreshToken } from "./userServices";[m
[31m-import { REACT_APP_API_SERVER, REACT_APP_API_SERVER_LOCAL } from "../urlServer";[m
[32m+[m[32mimport { REACT_APP_API_SERVER_URL } from "../urlServer";[m
 const axiosToken = axios.create({[m
[31m-    baseURL: REACT_APP_API_SERVER[m
[32m+[m[32m    baseURL: REACT_APP_API_SERVER_URL[m
 })[m
 const axios2 = axios.create({[m
[31m-    baseURL: REACT_APP_API_SERVER[m
[32m+[m[32m    baseURL: REACT_APP_API_SERVER_URL[m
 })[m
 axiosToken.interceptors.request.use([m
     async (config) => {[m
[1mdiff --git a/src/urlServer.js b/src/urlServer.js[m
[1mindex 5935826..652fa92 100644[m
[1m--- a/src/urlServer.js[m
[1m+++ b/src/urlServer.js[m
[36m@@ -1,2 +1 @@[m
[31m-export const REACT_APP_API_SERVER = "https://shopserver-iv0u.onrender.com/"[m
[31m-export const REACT_APP_API_SERVER_LOCAL = "http://localhost:3001/"[m
\ No newline at end of file[m
[32m+[m[32mexport const REACT_APP_API_SERVER_URL = "http://localhost:3001/"[m
\ No newline at end of file[m
