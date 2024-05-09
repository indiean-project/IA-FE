import {useState} from 'react';
import {loginUser} from '../../apis/user';
import {useRecoilState, useRecoilValue, useSetRecoilState} from 'recoil';
import {loginUserState} from '../../recoil/LoginUser';
import { isModalActive } from '../../recoil/IsModalActive';
import { useNavigate } from 'react-router-dom';

import LoginModal from '../LoginModal';
import loginicon from '../../assets/loginicon.png';
import passwordIcon from '../../assets/passwordLock.png';

import './LoginForm.scss';
import toast from 'react-hot-toast';


function LoginForm() {

    const navigate = useNavigate();

    const [inputAccount, setInputAccount] = useState({
        userId : '',
        userPwd : ''
    })

    const setLoginUser = useSetRecoilState(loginUserState);
    const loginUserInfo = useRecoilValue(loginUserState);

    const [isModalOpen, setIsModalOpen] = useRecoilState(isModalActive);

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
            userPwd: inputAccount.userPwd,
        });

        console.log(result);
        // if (result.status === 404 && result.code === "account-001") {
        //     alert(result.message);
        // } else if (result.status === 400 && result.code === "account-002") {
        //     alert(result.message);
        if(result === undefined) {
            toast.error('로그인 정보가 올바르지 않습니다.');
            // alert(result.message);
        // } else if(result !== '') { 
        } else {
            setLoginUser({
                ...result,
                default : {
                    userId: result.userId,
                    userName: result.userName,
                    nickname: result.nickname,
                    phone: result.phone,
                    address: result.address
                }
            })
            setIsModalOpen(true);
        }
        console.log(loginUserInfo);
        console.log(isModalOpen);

        console.log(loginUserState);
    }

    const onSignUp = () => {
        navigate("/signUp");
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
                    <button className="btn-signup" onClick={onSignUp}>회원가입</button>
                </div>
                <br/>
                <a href="">아이디/비밀번호 찾기</a>
            </div>
            {isModalOpen && <LoginModal/>}
        </>    
    )
}
export default LoginForm;


            // setIsModalOpen({
            //     ...isModalActive,
            //     default:true
            // }); => default 항목이 LoginUser처럼 여러값이 아니라면 굳이 spread 연산자 ... 쓸 필요 X
