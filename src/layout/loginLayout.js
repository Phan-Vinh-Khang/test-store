import HeaderLogin from "./HeaderLogin/headerLogin";
import Content from "./Content/Content";
import Footer from "./Footer/Footer";

function LoginLayout({ children }) {
    //children
    //element content
    return (
        <div>
            <HeaderLogin></HeaderLogin>
            <Content>{children}</Content>
            <Footer></Footer>
        </div>
    );
}

export default LoginLayout;