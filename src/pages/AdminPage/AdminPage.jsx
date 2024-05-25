import { NavLink } from "react-router-dom";
import Background from "../../components/Background";
import './AdminPage.scss';
import { useEffect, useRef, useState } from "react";
import AdminUserAutority from "../../components/AdminUserAutority/AdminUserAutority";
import AdminFundingApproval from "../../components/AdminFundingApproval/AdminFundingApproval";
import AdminQuestionSection from "../../components/AdminQuestionSeciton/AdminQuestionSection";
import AdminReportManagement from "../../components/AdminReportManagement/AdminReportManagement";

function AdminPage(){

    const [menu, setMenu] = useState(0);
    const menuRef = useRef([]);
    
    useEffect(()=>{
        menuRef.current[menu].style.setProperty('background-color', 'black');
        return ()=> menuRef.current[menu].style.setProperty('background-color', 'rgb(71, 71, 71)');
    }, [menu])

    return(
        <Background>
            <div className="admin__container">
                <div className="admin__menu">
                    <div ref={el=>(menuRef.current[0]=el)} onClick={()=>setMenu(0)}>유저 권한 관리</div>
                    <div ref={el=>(menuRef.current[1]=el)} onClick={()=>setMenu(1)}>펀딩 승인 관리</div>
                    <div ref={el=>(menuRef.current[2]=el)} onClick={()=>setMenu(2)}>문의 관리</div>
                    <div ref={el=>(menuRef.current[3]=el)} onClick={()=>setMenu(3)}>신고 관리</div>
                </div>
                <div className="admin__manage">
                    {
                        menu === 0 ? <AdminUserAutority/> :
                        menu === 1 ? <AdminFundingApproval/> :
                        menu === 2 ? <AdminQuestionSection/> :
                        menu === 3 && <AdminReportManagement/>
                    }
                </div>
            </div>
        </Background>
    );
}
export default AdminPage;