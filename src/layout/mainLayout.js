import WrapperHeader from "./Header/wrapper";
import WrapperContent from "./Content/wrapper";
import Footer from "./Footer/Footer";
import { toString } from "lodash";
function MainLayout({ children }) {
    let AbsoluteWidth = (screen.width / 16) + 'rem'
    console.log(AbsoluteWidth, 'AbsoluteWidth')
    return (
        <div style={{ width: AbsoluteWidth }}>
            <WrapperHeader></WrapperHeader>
            <WrapperContent>
                {children}
            </WrapperContent>
            <Footer></Footer>
        </div>
    );
}

export default MainLayout;