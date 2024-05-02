import './Header.scss';
import logo_orange from '../../assets/logo/logo_orange.png';
import { ArrowBarDown, List } from 'react-bootstrap-icons';

import { List } from 'react-bootstrap-icons';
import { NavLink } from 'react-router-dom';
import { useRef, useState } from 'react';
import NavBar from '../NavBar';

function Header() {
    const [navCheck, setNavCheck] = useState({
        check: false,
        class: 'close',
        style: {
            opacity: 1,
        },
    });

    const onClickNavCheck = ()=>{
        navCheck.check ? setNavCheck({check: false, class: 'close', style:{opacity: 1}})
         : setNavCheck({check: true, class: 'open', style:{opacity: 0}});
    }

    return (
        <div className="header__container">
            <NavBar navCheck={navCheck} 
                    setNavCheck={setNavCheck}
                    onClickNavCheck={onClickNavCheck}
                    />
            <div className='header__box'>
                <div className='header__left'>
                    <div className='header__left__menu'>
                        <List size={40} style={navCheck.style} onClick={()=>onClickNavCheck()} />
                    </div>
                    <img src={logo_orange} />

                </div>
                <div className='header__right'>
                    <div>
                        <NavLink to={"/login"}>로그인</NavLink>
                    </div>
                    <div>
                        <NavLink to={"/signUp"}>회원가입</NavLink>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default Header;