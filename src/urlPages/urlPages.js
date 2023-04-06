import Home from "../pages/home/home"
import Search from "../pages/search/seach"
import Following from "../pages/following/following"
import Login from "../pages/login/login"
//Layout website
import MainLayout from "../layout/mainLayout"
import LoginLayout from "../layout/loginLayout"
const urlPages = [
    {
        path: '/',
        element: <Home />,
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
        element: <Login />,
        layout: LoginLayout

    },
]

export default urlPages