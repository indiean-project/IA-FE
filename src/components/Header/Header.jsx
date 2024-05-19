import './Header.scss';
import logo_orange from '../../assets/logo/logo_orange.png';
import { List } from 'react-bootstrap-icons';
import { NavLink, useNavigate } from 'react-router-dom';
import { useRef, useState } from 'react';
import NavBar from '../NavBar';
import { useRecoilValue, useResetRecoilState } from 'recoil';
import { loginUserState } from '../../recoil/LoginUser';
import { BiLogOut } from 'react-icons/bi';
import { LuLogOut } from 'react-icons/lu';
import { GrLogout } from 'react-icons/gr';

function Header() {
    const loginUser = useRecoilValue(loginUserState);
    const resetUserInfo = useResetRecoilState(loginUserState);
    const navigate = useNavigate();
    const [navCheck, setNavCheck] = useState({
        check: false,
        class: 'close',
        style: {
            opacity: 1,
        },
    });

    const onClickNavCheck = () => {
        navCheck.check ? setNavCheck({ check: false, class: 'close', style: { opacity: 1 } })
            : setNavCheck({ check: true, class: 'open', style: { opacity: 0 } });
    }
    const logout = ()=>{
        resetUserInfo();
        navigate("/");
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
                        <List size={40} style={navCheck.style} onClick={() => onClickNavCheck()} />
                    </div>
                    <img src={logo_orange} onClick={() => location.href = '/'} />

                </div>
                {loginUser.userId == '' ?
                    <div className='header__right'>
                        <div className='header__right__item'>
                            <NavLink to={"/login"}>로그인</NavLink>
                        </div>
                        <div className='header__right__item'>
                            <NavLink to={"/signUp"}>회원가입</NavLink>
                        </div>
                    </div>
                    :
                    <div className='header__right'>
                        <div className='header__right__myPage'>
                            <NavLink to={"/myPage"}>{loginUser.nickname}</NavLink>
                            <div className='header__right__icon' onClick={logout}>
                                <GrLogout size={25}/>
                            </div>
                        </div>
                    </div>
                }

            </div>
        </div>
    );
}
export default Header;