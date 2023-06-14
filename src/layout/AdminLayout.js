import HeaderAdmin from "./HeaderAdmin";
function AdminLayout({ children }) {
    const Element = children
    return (
        <div>
            <HeaderAdmin />
            <Element />
        </div>
    );
}

export default AdminLayout;