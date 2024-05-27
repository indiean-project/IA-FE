import { NavLink, useLocation } from "react-router-dom";
import './NavBar.scss';
import { useEffect, useState } from "react";
import { ArrowLeft } from "react-bootstrap-icons";
import {cPage} from '../../recoil/page'
import { useRecoilValue, useSetRecoilState} from 'recoil';
import { navHandleState } from "../../recoil/NavHandle";

function NavBar(props) {

    const [checkCommu, setCheckCommu] = useState(false);
    const [animaiton, setAnimation] = useState('ulClose');
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

    return (
        <div className={props.navCheck.class + ' nav__container'}>
            <div className="nav__header">
            <h1>메뉴</h1><span><ArrowLeft size={22} onClick={()=>onClickArrow()}/></span>
            </div>
            <hr />
            <ul>
                <li><NavLink to={"/concert"} onClick={()=>{setCpage(1)}}>공연 정보</NavLink></li>
                <li><NavLink to={"/artist"} onClick={()=>{setCpage(1) }}>아티스트 정보</NavLink></li>
                <li><NavLink to={"/funding"} onClick={()=>{setCpage(1)}}>아티스트 펀딩</NavLink></li>
                <li className="nav__item__box" onClick={() => onClickComm()}><div>커뮤니티</div>
                    <ul className={animaiton}>
                        <li><NavLink to={"/board/proud"} onClick={()=>{setCpage(1)}}>아티스트 자랑하기</NavLink></li>
                        <li><NavLink to={"/board/free"} onClick={()=>{setCpage(1)}}>자유게시판</NavLink></li>
                        <li><NavLink to={"/board/colo"} onClick={()=>{setCpage(1)}}>콜로세움</NavLink></li>
                    </ul>
                </li>
                
                <li><NavLink to={"/notice"}>공지사항</NavLink></li>
            </ul>            
            </div>
    );
}
export default NavBar;