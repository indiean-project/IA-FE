import { Outlet } from "react-router-dom";
import Header from "../Header";

import './Layout.scss';
import Footer from "../Footer";

function Layout() {
    return (
        <>
            <Header />
            <div className="outlet">
                <Outlet />
            </div>
            <Footer/>
        </>
    );
}
export default Layout;