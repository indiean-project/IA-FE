import { NavLink } from "react-router-dom";
import './NavBar.scss';
import { useState } from "react";

function NavBar() {

    const [checkCommu, setCheckCommu] = useState(false);

    return (
        <div className="nav__container">
            <h1>메뉴</h1>
            <hr />
            <div>
                <NavLink to={"/concert"}>공연 정보</NavLink>
            </div>
            <div>
                <NavLink to={"/artist"}>아티스트 정보</NavLink>
            </div>
            <div>
                <NavLink to={"/funding"}>아티스트 펀딩</NavLink>
            </div>
            <div onClick={()=>{checkCommu?setCheckCommu(false):setCheckCommu(true)}}>
                <a>커뮤니티</a>
            </div>
            {checkCommu? <div className="nav__community">
                <NavLink to={"/board/proud"}>아티스트 자랑하기</NavLink>
                <NavLink to={"/board/free"}>자유게시판</NavLink>
                <NavLink to={"/board/colo"}>콜로세움</NavLink>
            </div>: ''}
            <div>
                <NavLink to={"/notice"}>공지사항</NavLink>
            </div>
        </div>
    );
}
export default NavBar;