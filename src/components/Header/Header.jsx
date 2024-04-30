import './Header.scss';
import logo_orange from '../../assets/logo/logo_orange.png';
import { List } from 'react-bootstrap-icons';
import { NavLink } from 'react-router-dom';
import { useState } from 'react';
import NavBar from '../NavBar';

function Header() {

    const [navCheck, setNavCheck] = useState(true);

    return (
        <div className="header__container">
            <NavBar/>
            <div className='header__box'>
                <div className='header__left'>
                    <div className='header__left__menu'>
                        <List size={40} />
                    </div>
                    <img src={logo_orange} />

                </div>
                <div className='header__right'>
                    <div>
                        <NavLink to={"/login"}>Login</NavLink>
                    </div>
                    <div>
                        <NavLink to={"/signUp"}>SignUp</NavLink>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default Header;