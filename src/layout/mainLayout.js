import Header from "./Header/Header";
import Content from "./Content/Content";
import Footer from "./Footer/Footer";

function MainLayout({ children }) {
    return (
        <div>
            <Header></Header>
            <Content>{children}</Content>
            <Footer></Footer>
        </div>
    );
}

export default MainLayout;