import { useEffect, useState } from 'react';
import { loginUser } from '../../apis/user';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { loginUserState } from '../../recoil/LoginUser';
import { isModalActive } from '../../recoil/IsModalActive';
import { NavLink, useNavigate } from 'react-router-dom';

import LoginModal from '../LoginModal';
import loginicon from '../../assets/loginicon.png';
import passwordIcon from '../../assets/passwordLock.png';

import './LoginForm.scss';
import toast from 'react-hot-toast';


function LoginForm() {

    const navigate = useNavigate();

    const [inputAccount, setInputAccount] = useState({
        userId: '',
        userPwd: ''
    })

    const setLoginUser = useSetRecoilState(loginUserState);
    const loginUserInfo = useRecoilValue(loginUserState);


    const [isModalOpen, setIsModalOpen] = useRecoilState(isModalActive);

    const onChangeAccount = (e) => {

        setInputAccount({
            ...inputAccount,
            [e.target.name]: e.target.value,
        })
    }

    const onClickLogin = async () => {
        console.log(inputAccount);
        const result = await loginUser({
            userId: inputAccount.userId,
            userPwd: inputAccount.userPwd,
            socialStatus : "N"
        });

        console.log(result);
        // if (result.status === 404 && result.code === "account-001") {
        //     alert(result.message);
        // } else if (result.status === 400 && result.code === "account-002") {
        //     alert(result.message);
        if(result === undefined || result.data.deleteYn === "Y" 
            || result.data.socialStatus !== "N") {
            toast.error('로그인 정보가 올바르지 않습니다.');
            // alert(result.message);
        // } else if(result !== '') { 
        } else {
            setLoginUser(result['data']);
            setIsModalOpen(true);
        }
        console.log(loginUserInfo);
        console.log(isModalOpen);
    }

    const onSignUp = () => {
        navigate("/signUp");
    }

    return (
        <>
            <div className="loginForm__box">
                <h2>LOGIN</h2>
                <div className="loginForm__items">
                    <img className="idIcon" src={loginicon} alt="x" />
                    <input type="text" className="inputId" id="userId"
                        name="userId" placeholder="아이디를 입력해주세요"
                        value={inputAccount.userId} onChange={(e) => onChangeAccount(e)} />
                    <br /><br />
                    <img className="pwdIcon" src={passwordIcon} alt="x" />
                    <input type="password" className="inputPwd" id="userPwd"
                        name="userPwd" placeholder="비밀번호를 입력해주세요"
                        value={inputAccount.userPwd} onChange={(e) => onChangeAccount(e)} />
                </div>
                <br /><br />
                <div className="loginForm__link">
                    <button className="btn-login" onClick={() => onClickLogin()}>로그인</button>
                    <button className="btn-signup" onClick={onSignUp}>회원가입</button>
                </div>
                <br />
                <NavLink to={"/find"}>
                    <div className="loginForm__find">아이디/비밀번호 찾기</div>    
                </NavLink>
            </div>
            {isModalOpen && <LoginModal/>}
        </>    
    )
}
export default LoginForm;
