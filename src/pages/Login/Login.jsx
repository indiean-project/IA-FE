import Header from '../../components/Header'
import LoginForm from '../../components/LoginForm'
import SocialLoginForm from '../../components/SocialLoginForm'
import './Login.scss';

function Login(){
    return(
        <>
            <Header />
            <div className="loginForm__container">
                <LoginForm />
                <SocialLoginForm />
            </div>
        </>
    );
}
export default Login;