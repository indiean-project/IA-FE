import {useState} from 'react';
import {loginUser} from '../../apis/user';
import {useRecoilValue, useSetRecoilState} from 'recoil';
import {loginUserState} from '../../recoil/LoginUser';

import loginicon from '../../assets/loginicon.png';
import passwordIcon from '../../assets/passwordLock.png';

import './LoginForm.scss';

function LoginForm() {

    const [inputAccount, setInputAccount] = useState({
        userId : '',
        userPwd : ''
    })

    const setLoginUser = useSetRecoilState(loginUserState);
    const loginUserInfo = useRecoilValue(loginUserState);

    const onChangeAccount = (e) => {

        setInputAccount({
            ...inputAccount,
            [e.target.name] : e.target.value,
        })
    }

    const onClickLogin = async() => {
        console.log(inputAccount);
        const result = await loginUser({
            userId: inputAccount.userId,
            userPwd: inputAccount.userPwd
        });

        console.log(result);
        setLoginUser({
            userId: result.userId,
            userName: result.userName,
            phone: result.phone,
            address: result.address
        })
    }


    return(
        <>
            <div className="loginForm__box">
                <h2>LOGIN</h2>
                <div className="loginForm__items">
                    <img className="idIcon" src={loginicon} alt="x" />
                    <input type="text" className="inputId" id="userId"
                        name="userId" placeholder="아이디를 입력해주세요" 
                        value={inputAccount.userId} onChange={(e)=>onChangeAccount(e)} />
                    <br/><br/>
                    <img className="pwdIcon" src={passwordIcon} alt="x" />
                    <input type="password" className="inputPwd" id="userPwd" 
                        name="userPwd" placeholder="비밀번호를 입력해주세요"
                        value={inputAccount.userPwd} onChange={(e)=>onChangeAccount(e)} />            
                </div>
                <br/><br/>
                <div className="loginForm__link">
                    <button className="btn-login" onClick={()=>onClickLogin()}>로그인</button>
                    <button className="btn-signup" type="submit">회원가입</button>
                </div>
                <br/>
                <a href="">아이디/비밀번호 찾기</a>
            </div>
        </>

    )
}
export default LoginForm;