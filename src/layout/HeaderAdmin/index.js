import classNames from 'classnames/bind'
import objStyle from './index.module.scss'
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
let cv = classNames.bind(objStyle);
function HeaderAdmin() {
    return (
        // <div className={cv('wrapper')}>
        //     <div className={cv('wrap1')}>Admin</div>
        //     <div className={cv('wrap2')}>Thong tin</div>
        // </div>
        <>
            <Navbar bg="dark" variant="dark">
                <Container>
                    <Navbar.Brand href="#home">
                        <img
                            alt=""
                            src="./ShopeeMainLogo.png"
                            width="100"
                            height="30"
                            className="d-inline-block align-top"
                        />{' '}
                        Admin
                    </Navbar.Brand>
                </Container>
            </Navbar>
        </>
    );
}

export default HeaderAdmin;