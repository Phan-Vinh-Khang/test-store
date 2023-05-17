import HeaderLogin from "./HeaderLogin/headerLogin";
import Footer from "./Footer/Footer";
import WrapperContent from "./Content/wrapper";
function LoginLayout({ children }) {
    return (
        <div>
            <HeaderLogin></HeaderLogin>
            <WrapperContent>{children}</WrapperContent>
            <Footer></Footer>
        </div>
    );
}

export default LoginLayout;