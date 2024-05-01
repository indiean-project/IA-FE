import {useState} from 'react';

import Header from '../../components/Header';
import SignUpForm1 from '../../components/SignUpForm1';
import SignUpForm2 from '../../components/SignUpForm2';
import SignUpForm3 from '../../components/SignUpForm3';
import SocialSignUpForm from '../../components/SocialSignUpForm';

import './SignUp.scss';

function SignUp(){
    const [signUpPage, setSignUpPage] = useState('form1');

    const signUpPageLoad = () => {
        switch (signUpPage) {
            case 'form1':
                <SignUpForm1 />
                break;
            case 'form2':
                <SignUpForm2 />
                break;
            case 'form3':
                <SignUpForm3 />
        }
    }

    return(
        <>
            <Header />
            <div className="signUpForm__container">
                {signUpPageLoad}
            </div>
        </>
    );
}
export default SignUp;