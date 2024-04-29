import './Header.scss';
import logo_orange from '../../assets/logo/logo_orange.png';
import { List } from 'react-bootstrap-icons';

function Header(){
    return(
        <div className="header__container">
            <div className='header__box'>
                <div className='header__left'>
                    <List size={40}/>
                    <img src={logo_orange}/>
                </div>
                <div className='header__right'>
                    <button type="submit" id="SignUp">Sign Up</button>
                    <button type="submit" id="Login">Login</button>
                </div>
            </div>
        </div>
    );
}
export default Header;