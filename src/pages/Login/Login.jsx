import Header from '../../components/Header'
import LoginForm from '../../components/LoginForm'
// import SocialLoginForm from '../../components/SocialLoginForm'

function Login(){
    return(
        <>
            <Header />
            <div className="loginForm__container">
                <LoginForm />
                {/* <SocialLoginForm /> */}
            </div>
        </>
    );
}
export default Login;