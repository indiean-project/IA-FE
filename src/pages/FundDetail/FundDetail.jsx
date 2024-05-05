import './FundDetail.scss';
import { useEffect, useRef, useState } from "react";
import FundItemDetail from "../../components/FundItemDetail";
import FundNav from "../../components/FundNav/FundNav";

function FundDetail(){
    const navRef = useRef([])
    const nav = [
        {
            id : 'fundInfo',
            value : '프로젝트 소개'
        },
        {
            id : 'artistInfo',
            value : '아티스트 소개'
        },
        {
            id : 'budget',
            value : '예산'
        },
        {
            id : 'schedule',
            value : '일정'
        }
    ];
    const onClickNav = (idx)=>{
        navRef.current[idx].scrollIntoView({behavior: "smooth" });
    }

    return(
        <div className="fundDetail__container">
            <FundNav nav={nav} onClickNav={onClickNav}/>
            <FundItemDetail nav={nav} navRef={navRef}/>
        </div>
    );
}
export default FundDetail;