import { useState } from 'react';
import { checkUserId, checkUserPwd } from '../../apis/user';

import loginicon from '../../assets/loginicon.png';
import passwordIcon from '../../assets/passwordLock.png';

import toast from 'react-hot-toast';
import './SignUpForm1.scss';

function SignUpForm1({ onNextPage }) {
    // , inputIdAccount, inputPwdAccount
    const [isDuplicateId, setIsDuplicateId] = useState('');
    const [isDuplicatePwd, setIsDuplicatePwd] = useState('');

    const [inputIdAccount, setInputIdAccount] = useState('');
    const [inputPwdAccount, setInputPwdAccount] = useState('')

    const checkId = async(inputIdAccount) => {
        if (inputIdAccount === '') {
            setIsDuplicateId('');
            return;
        }

        const idResult = await checkUserId ({
            userId : inputIdAccount
        });

        if (idResult.response) {
            if (idResult.response.data.code === "account-003") {
                setIsDuplicateId('bad');
                toast.error(idResult.response.data.message);
            } else if (idResult.response.data.errors[0].code === "Pattern") {
                setIsDuplicateId('bad');
                toast.error(idResult.response.data.errors[0].defaultMessage);
            }
        } else {
            if(idResult.status === "SUCCESS") 
                setIsDuplicateId('good');
        }       
    };
    
    const onChangeIdAccount = (e) => {
        setInputIdAccount(e.target.value);
    }
    const onBlurIdAccount = () => {
        checkId(inputIdAccount);
    }

    const checkPwd = async(inputPwdAccount) => {
        if (inputPwdAccount === '') {
            setIsDuplicatePwd('');
            return;
        }

        const pwdRegExp = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{6,16}$/g.test(inputPwdAccount);

        const pwdResult = await checkUserPwd ({
            userPwd : inputPwdAccount
        });

        setIsDuplicatePwd(pwdRegExp? 'good' : 'bad');

        if(pwdResult.response && pwdResult.response.status === 400) {
            toast.error("유효하지 않은 비밀번호 입니다.");
        }
    }
    const onChangePwdAccount = (e) => {
        setInputPwdAccount(e.target.value);
    }
    const onBlurPwdAccount = () => {
        checkPwd(inputPwdAccount);
    }

    const nextPage = () => {
        if(isDuplicateId === 'good' && isDuplicatePwd === 'good') {
            sessionStorage.setItem("userId", inputIdAccount);
            sessionStorage.setItem("userPwd", inputPwdAccount);
            sessionStorage.setItem("socialStatus", "N");
            onNextPage();
        } else {
            return null;
        }
    }

    return (
        <>
            <div className="signUpForm__items">
                <img className="idIcon" src={loginicon} alt="x" />
                <input type="text" className={`inputId ${isDuplicateId === '' ? '' : (isDuplicateId)}`} id="userId"
                    name="userId" placeholder="Email형태의 아이디를 입력해주세요"
                    value={inputIdAccount} onChange={onChangeIdAccount} onBlur={onBlurIdAccount} />
                <br /><br />
                <img className="pwdIcon" src={passwordIcon} alt="x" />
                <input type="password" className={`inputPwd ${isDuplicatePwd === '' ? '' : (isDuplicatePwd)}`} id="userPwd"
                    name="userPwd" placeholder="6~16자리의 대소문자,특수문자,숫자 포함 입력"
                    value={inputPwdAccount} onChange={onChangePwdAccount} onBlur={onBlurPwdAccount} />
            </div>
            <br />
            <button type="button" onClick={nextPage} 
            disabled={isDuplicateId !== 'good' || isDuplicatePwd !== 'good'} >계속하기</button>
            <br />
            <h1>또는</h1>
        </>
    )
}

export default SignUpForm1;

