import WrapperHeader from "./Header/wrapper";
import WrapperContent from "./Content/wrapper";
import Footer from "./Footer/Footer";

function MainLayout({ children }) {
    return (
        <div>
            <WrapperHeader></WrapperHeader>
            <WrapperContent>{children}</WrapperContent>
            <Footer></Footer>
        </div>
    );
}

export default MainLayout;