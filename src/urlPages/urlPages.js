import Home from "../pages/home/home"
import Search from "../pages/search/seach"
import Following from "../pages/following/following"
import WrapperLogin from "../pages/login/wrapper"//content
import WrapperHome from "../pages/home/wrapper"//content
//Layout website
import MainLayout from "../layout/mainLayout" //layout header and footer
import LoginLayout from "../layout/loginLayout" //layout header and footer
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
]

export default urlPages