import {useState} from 'react';

import SignUpForm1 from '../../components/SignUpForm1';
import SignUpForm2 from '../../components/SignUpForm2';
import SignUpForm3 from '../../components/SignUpForm3';
import SignUpStep from '../../components/SignUpStep';
import SocialSignUpForm from '../../components/SocialSignUpForm';
import logo_white from '../../assets/logo/logo_white.png';

import './SignUp.scss';

function SignUp(){
    const [signUpPage, setSignUpPage] = useState('form1');
    const [prePage, setPrePage] = useState(null);

    const signUpPageLoad = () => {
        switch (signUpPage) {
            case 'form1':
                setPrePage(signUpPage);
                setSignUpPage('form2');
                break;
            case 'form2':
                setPrePage(signUpPage);
                setSignUpPage('form3');
                break;
            case 'form3':
                break;
            default:
                break;
        }
    };

    const prePageLoad = () => {
        setSignUpPage(prePage);
    };

    return(
        <>
            <div className="signUpForm__container">
                <div className="signUpForm__box">
                    <div className="signUpcheck">
                        <img className="logo_white" src={logo_white} alt="x" />
                        <h2>회원가입</h2>
                    </div>
                    <SignUpStep onPage={signUpPage} />
                    {signUpPage === 'form1' && (
                        <>
                            <SignUpForm1 onNextPage={signUpPageLoad} />
                            <SocialSignUpForm />
                        </>
                    )}
                    {signUpPage === 'form2' && <SignUpForm2 onNextPage={signUpPageLoad} onPrevPage={prePageLoad} />}
                    {signUpPage === 'form3' && <SignUpForm3 />}
                </div>
            </div>
        </>
    );
}
export default SignUp;