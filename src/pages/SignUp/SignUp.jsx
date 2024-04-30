import Header from '../../components/Header';
import SignUpForm from '../../components/SignUpForm';
import SocialSignUpForm from '../../components/SocialSignUpForm';

import './SignUp.scss';

function SignUp(){
    return(
        <>
            <Header />
            <div className="signUpForm__container">
                <SignUpForm />
                <SocialSignUpForm />
            </div>
        </>
    );
}
export default SignUp;