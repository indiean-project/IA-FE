import {useState} from 'react';

import loginicon from '../../assets/loginicon.png';
import passwordIcon from '../../assets/passwordLock.png';

import './SignUpForm1.scss';

function SignUpForm1({ onNextPage }) {

    const [inputAccount, setInputAccount] = useState({
        userId : '',
        userPwd : ''
    })

    const onChangeAccount = (e) => {
         setInputAccount({
            ...inputAccount,
            [e.target.name] : e.target.value
         })
    }


    return (
        <>
            <div className="signUpForm__items">
                <img className="idIcon" src={loginicon} alt="x" />
                <input type="text" className="inputId" id="userId"
                    name="userId" placeholder="아이디를 입력해주세요"
                    value={inputAccount.userId} onChange={(e) => onChangeAccount(e)} />
                <br/><br/>
                <img className="pwdIcon" src={passwordIcon} alt="x" />
                <input type="password" className="inputPwd" id="userPwd"
                    name="userPwd" placeholder="비밀번호를 입력해주세요"
                    value={inputAccount.userPwd} onChange={(e) => onChangeAccount(e)} />
            </div>
            <br/>
            <button type="button" onClick={onNextPage}>계속하기</button>
            <br/>
            <h1>또는</h1>
        </>
    )
}

export default SignUpForm1;