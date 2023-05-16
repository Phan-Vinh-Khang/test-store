import HeaderLogin from "./HeaderLogin/headerLogin";
import Footer from "./Footer/Footer";
import WrapperContent from "./Content/wrapper";
function LoginLayout({ children }) {
    //children
    //element content
    return (
        <div>
            <HeaderLogin></HeaderLogin>
            <WrapperContent>{children}</WrapperContent>
            <Footer></Footer>
        </div>
    );
}

export default LoginLayout;