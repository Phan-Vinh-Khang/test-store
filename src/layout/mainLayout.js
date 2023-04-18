import WrapperHeader from "./Header/wrapper";
import WrapperContent from "./Content/wrapper";
import Footer from "./Footer/Footer";

function MainLayout(obj) {
    return (
        <div>
            <WrapperHeader loginName={obj.loginName}></WrapperHeader>
            <WrapperContent func={obj.func} Element={obj.Element}></WrapperContent>
            <Footer></Footer>
        </div>
    );
}

export default MainLayout;