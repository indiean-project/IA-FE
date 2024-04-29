import React, {useState} from 'react';
// import loginicon from '../../assets/loginicon.png';

import './LoginForm.scss';
// import axios from 'axios';

function LoginForm() {

    // const loginInputForm = async() => {
        
    //     const response = await axios.post("/", )
    // }

    return(
        <>
            <div className="loginForm__box">
                <h2>LOGIN</h2>
                <input type="text" id="userId" 
                       name="userId" placeholder="아이디를 입력해주세요" />
                <input type="password" id="userPwd" 
                       name="userPwd" placeholder="비밀번호를 입력해주세요" />            </div>
        </>

    )
}
export default LoginForm;