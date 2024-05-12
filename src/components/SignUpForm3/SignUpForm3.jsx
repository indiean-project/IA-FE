import { NavLink } from 'react-router-dom';

import './SignUpForm3.scss';

function SignUpForm3() {

    return (
        <>
            <div className="signUpForm__items">
                <h3>INDIE:안 의 일원이 되어주셔서 감사합니다!</h3>
            </div>
            <br />
            {/* <button type="submit">마이페이지</button> */}
            <div>
                <NavLink to={"/login"}>로그인페이지</NavLink>
            </div>
        </>
    )
}

export default SignUpForm3;