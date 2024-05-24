import { Outlet } from "react-router-dom";
import Header from "../Header";

import './Layout.scss';
import Footer from "../Footer";
import QuestionBotIcon from "../QuestionBotIcon/QuestionBotIcon";

function Layout() {
    return (
        <>
            <Header />
            <div className="outlet">
                <Outlet />
            </div>
            <Footer/>
            <QuestionBotIcon />
        </>
    );
}
export default Layout;