import { Outlet } from "react-router-dom";
import Header from "../Header";

import './Layout.scss';

function Layout() {
    return (
        <>
            <Header />
            <div className="outlet">
            <Outlet />
            </div>
        </>
    );
}
export default Layout;