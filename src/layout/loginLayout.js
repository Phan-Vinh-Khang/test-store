
import HeaderLogin from "./HeaderLogin/headerLogin";
import Content from "./Content/Content";
import Footer from "./Footer/Footer";
function LoginLayout(obj) {
    //children
    //element content
    return (
        <div>
            <HeaderLogin></HeaderLogin>
            <Content func={obj.func} Element={obj.Element}></Content>
            <Footer></Footer>
        </div>
    );
}

export default LoginLayout;