import { NavLink } from "react-router-dom";
import './NavBar.scss';
import { useState } from "react";
import { ArrowLeft } from "react-bootstrap-icons";
import {cPage} from '../../recoil/page'
import { useSetRecoilState} from 'recoil';

function NavBar(props) {

    const [checkCommu, setCheckCommu] = useState(false);
    const [animaiton, setAnimation] = useState('ulClose');
    
    const setCpage = useSetRecoilState(cPage);

    const onClickComm = ()=>{
        checkCommu ? setCheckCommu(false) : setCheckCommu(true);
        checkCommu ? setAnimation('ulClose') : setAnimation('ulOpen');
    }

    const onClickArrow = ()=>{
        props.onClickNavCheck()
        setCheckCommu(false);
        setAnimation('ulClose');
        setCpage(1);

    }

    return (
        <div className={props.navCheck.class + ' nav__container'}>
            <div className="nav__header">
            <h1>메뉴</h1><span><ArrowLeft size={22} onClick={()=>onClickArrow()}/></span>
            </div>
            <hr />
            <ul>
                <li><NavLink to={"/concert"} onClick={()=>onClickArrow()}>공연 정보</NavLink></li>
                <li><NavLink to={"/artist"} onClick={()=>onClickArrow()}>아티스트 정보</NavLink></li>
                <li><NavLink to={"/funding"} onClick={()=>onClickArrow()}>아티스트 펀딩</NavLink></li>
                <li className="nav__item__box" onClick={() => onClickComm()}><div>커뮤니티</div>
                    <ul className={animaiton}>
                        <li><NavLink to={"/board/proud"} onClick={()=>onClickArrow()}>아티스트 자랑하기</NavLink></li>
                        <li><NavLink to={"/board/free"} onClick={()=>onClickArrow()}>자유게시판</NavLink></li>
                        <li><NavLink to={"/board/colo"} onClick={()=>onClickArrow()}>콜로세움</NavLink></li>
                    </ul>
                </li>
                
                <li><NavLink to={"/notice"} onClick={()=>onClickArrow()}>공지사항</NavLink></li>
            </ul>            
            </div>
    );
}
export default NavBar;