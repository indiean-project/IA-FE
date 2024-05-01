import LoginForm from '../../components/LoginForm'
import SocialLoginForm from '../../components/SocialLoginForm'
import './Login.scss';

function Login(){
    return(
        <>
            <div className="loginForm__container">
                <LoginForm />
                <SocialLoginForm />
            </div>
        </>
    );
}
export default Login;