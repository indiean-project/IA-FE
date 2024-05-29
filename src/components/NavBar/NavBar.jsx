import { NavLink, useLocation, useNavigate } from "react-router-dom";
import './NavBar.scss';
import { useEffect, useState } from "react";
import { ArrowLeft } from "react-bootstrap-icons";
import {cPage} from '../../recoil/page'
import { useRecoilValue, useSetRecoilState} from 'recoil';
import { navHandleState } from "../../recoil/NavHandle";

function NavBar(props) {

    const [checkCommu, setCheckCommu] = useState(false);
    const [animaiton, setAnimation] = useState('ulClose');
    const navigate = useNavigate();
    const {pathname} = useLocation();
    
    const setCpage = useSetRecoilState(cPage);

    const onClickComm = ()=>{
        checkCommu ? setCheckCommu(false) : setCheckCommu(true);
        checkCommu ? setAnimation('ulClose') : setAnimation('ulOpen');
    }

    useEffect(()=>{
        if(props.navCheck.check === true){
            onClickArrow();
        }
    },[pathname])

    const onClickArrow = ()=>{
        props.onClickNavCheck()
        setCheckCommu(false);
        setAnimation('ulClose');
    }

    const onClickNavigate = (url)=>{
        setCpage(1);
        navigate(url);
    }

    return (
        <div className={props.navCheck.class + ' nav__container'}>
            <div className="nav__header">
            <h1>메뉴</h1><span><ArrowLeft size={22} onClick={()=>onClickArrow()}/></span>
            </div>
            <hr />
            <ul>
                <li onClick={()=>onClickNavigate("/concert")}><p>공연 정보</p></li>
                <li onClick={()=>onClickNavigate("/artist")}><p>아티스트 정보</p></li>
                <li onClick={()=>onClickNavigate("/funding")}><p>아티스트 펀딩</p></li>
                <li className="nav__item__box" onClick={() => onClickComm()}><div>커뮤니티</div>
                    <ul className={animaiton}>
                        <li onClick={()=>onClickNavigate("/board/proud")}><p>아티스트 자랑하기</p></li>
                        <li onClick={()=>onClickNavigate("/board/free")}><p>자유게시판</p></li>
                        <li onClick={()=>onClickNavigate("/board/colo")}><p>콜로세움</p></li>
                    </ul>
                </li>
                
                <li onClick={()=>onClickNavigate("/notice")}><p>공지사항</p></li>
            </ul>            
            </div>
    );
}
export default NavBar;