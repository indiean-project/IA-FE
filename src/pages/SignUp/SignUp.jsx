import {useState} from 'react';

import SignUpForm1 from '../../components/SignUpForm1';
import SignUpForm2 from '../../components/SignUpForm2';
import SignUpForm3 from '../../components/SignUpForm3';
import SocialSignUpForm from '../../components/SocialSignUpForm';
import logo_white from '../../assets/logo/logo_white.png';

import './SignUp.scss';

function signUpcheck(signUpPage) {

    return(
        <div className="signUpForm__steps">
            <div className={`steps ${signUpPage === 'form1' ? 'active' : ''}`}>
                <div className="eclipse">1</div><br/>
                <h3>회원정보<br/>조회</h3>
            </div>
            <div className={`steps ${signUpPage === 'form2' ? 'active' : ''}`}>
                <div className="eclipse">2</div><br/>
                    <h3>추가정보<br/>입력</h3>
            </div>
            <div className={`steps ${signUpPage === 'form3' ? 'active' : ''}`}>
                <div className="eclipse">3</div><br/>
                <h3>회원가입<br/>완료</h3>
            </div>
        </div>
    );
}

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
                        <img src={logo_white} alt="x" />
                        <h2>회원가입</h2>
                    </div>
                    {signUpcheck(signUpPage)}
                    {signUpPage === 'form1' && <SignUpForm1 onNextPage={signUpPageLoad} />}
                    {signUpPage === 'form2' && <SignUpForm2 onNextPage={signUpPageLoad} onPrevPage={prePageLoad} />}
                    {signUpPage === 'form3' && <SignUpForm3 />}
                    <SocialSignUpForm />
                </div>
            </div>
        </>
    );
}
export default SignUp;