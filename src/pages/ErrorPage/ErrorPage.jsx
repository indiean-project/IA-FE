import './ErrorPage.scss';
import logo_orange from '../../assets/logo/logo_orange.png';
import logo_white from '../../assets/logo/logo_white.png';
import { NavLink } from 'react-router-dom';

function ErrorPage(){
    return(
        <div className='error__container'>
            <img src={logo_orange}/>
            <h1>페이지를 찾을 수 없습니다.</h1>
            <div className='error__toHome__btn'>
                <NavLink to={"/"}>홈으로</NavLink>
            </div>
        </div>
    );
}

export default ErrorPage;