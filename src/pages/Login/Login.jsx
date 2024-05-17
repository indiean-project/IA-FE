import { useRecoilValue } from 'recoil';
import { useNavigate } from 'react-router-dom';
import { loginUserState } from '../../recoil/LoginUser';

import ModalWindow from '../../components/ModalWindow'
import LoginForm from '../../components/LoginForm'
import SocialLoginForm from '../../components/SocialLoginForm'

import './Login.scss';

function Login() {

    // const navigate = useNavigate(); 
    // const loginUser = useRecoilValue(loginUserState);

    // if (loginUser.data) {
    //     navigate("/");
    //     // toast.error("이미 로그인 되어있습니다.");
    //     <ModalWindow>
    //         <p>이미 로그인 되어있습니다.</p>
    //     </ModalWindow>
    // }

    return(
        <>
            <div className="loginForm__container">
                <LoginForm  />
                <SocialLoginForm />
            </div>
        </>
    );
}
export default Login;