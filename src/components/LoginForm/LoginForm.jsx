import React, {useState} from 'react';
import loginicon from '../../assets/loginicon.png';
import passwordIcon from '../../assets/passwordLock.png';

import './LoginForm.scss';
// import axios from 'axios';

function LoginForm() {

    const [inputAccount, setInputAccount] = useState({
        userId : '',
        userPwd : ''
    })

    // const loginInputForm = async() => {
        
    //     const response = await axios.post("/", )
    // }

    return(
        <>
            <div className="loginForm__box">
                <h2>LOGIN</h2>
                <div className="loginForm__items">
                    <img className="idIcon" src={loginicon} alt="x" />
                    <input type="text" className="inputId" id="userId" 
                        name="userId" placeholder="아이디를 입력해주세요" />
                    <br/><br/>
                    <img className="pwdIcon" src={passwordIcon} alt="x" />
                    <input type="password" className="inputPwd" id="userPwd" 
                        name="userPwd" placeholder="비밀번호를 입력해주세요" />            
                </div>
                <br/><br/>
                <div className="loginForm__link">
                    <button className="btn-login" type="submit">로그인</button>
                    <button className="btn-signup" type="submit">회원가입</button>
                </div>
                <br/>
                <a href="">아이디/비밀번호 찾기</a>
            </div>
        </>

    )
}
export default LoginForm;