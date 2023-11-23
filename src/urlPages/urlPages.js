import Home from "../pages/home/home"
import Search from "../pages/search/seach"
import Following from "../pages/following/following"
import WrapperLogin from "../pages/login/wrapper"//content
import WrapperHome from "../pages/home/wrapper"//content
import WrapperDetail from "../pages/detail/wrapper"
import NotFound from "../pages/notfound"
import WrapperAdmin from "../pages/admin/wrapper"
import WrapperUserShop from "../pages/userShop/wrapperUserShop"
import WrapperCheckout from "../pages/checkout/wrapper"
import WrapperCart from "../pages/cart/wrapper"
import WrapperOrder from "../pages/order/wrapper"
//Layout website
import MainLayout from "../layout/mainLayout" //layout header and footer
import LoginLayout from "../layout/loginLayout" //layout header and footer
import AdminLayout from "../layout/AdminLayout"
const urlPages = [
    {
        path: '/',
        element: WrapperHome,
        layout: MainLayout
    },
    {
        path: '/Search',
        element: <Search />,
        layout: MainLayout
    },
    {
        path: '/Following',
        element: <Following />,
        layout: MainLayout
    },
    {
        path: '/Login',
        element: WrapperLogin,
        layout: LoginLayout

    },
    {
        path: '/DetailProduct/:id',
        element: WrapperDetail,
        layout: MainLayout

    },
    {
        path: '/Admin',
        element: WrapperAdmin,
        layout: AdminLayout

    },
    {
        path: '/UserShop',
        element: WrapperUserShop,
        layout: MainLayout

    },
    {
        path: '/checkout',
        element: WrapperCheckout,
        layout: MainLayout

    },
    {
        path: '/cart',
        element: WrapperCart,
        layout: MainLayout

    },
    {
        path: '/order',
        element: WrapperOrder,
        layout: MainLayout

    },
    {
        path: '*',
        element: NotFound,
        layout: MainLayout

    },
]

export default urlPages