import React, {useState} from 'react';
import {useRecoilState, useSetRecoilState, useRecoilValue} from 'recoil';
import KakaoLogin from 'react-kakao-login';
import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';

import LoginModal from '../LoginModal';
import { loginUser } from '../../apis/user';
import { loginUserState } from '../../recoil/LoginUser';
import { isModalActive } from '../../recoil/IsModalActive';

import './SocialLoginForm.scss';
import toast from 'react-hot-toast';

function SocialLoginForm() {

    const setLoginUser = useSetRecoilState(loginUserState);
    const loginUserInfo = useRecoilValue(loginUserState);

    const [isModalOpen, setIsModalOpen] = useRecoilState(isModalActive);

    // const [kakaoLogin, setKakaoLogin] = useState(false);
    const kakaoClientId = import.meta.env.VITE_KAKAO_CLIENT_ID;
    const kakaoOnSuccess = async(data) => {
        // const idToken = data.response.access_token // 액세스 토큰
        const tokenEmail = data.profile.kakao_account.email;
        
        const result = await loginUser({
            userId: tokenEmail,
            userPwd: '',
            socialStatus: 'K'
        })


        if(result === undefined) {
            toast.error('로그인 정보가 올바르지 않습니다.');
        } else {
            setLoginUser(result['data']);
            setIsModalOpen(true);
        }


    }
    const kakaoOnFailure = (error) => {
        console.log(error);
    };

    const googleOnSuccess = async(data) => {
        const tokenEmail = jwtDecode(data.credential).email;
        const result = await loginUser({
            userId: tokenEmail,
            userPwd: '',
            socialStatus: 'G'
        })

        if(result === undefined) {
            toast.error('로그인 정보가 올바르지 않습니다.');
        } else {
            setLoginUser(result['data']);
            setIsModalOpen(true);
        }
    }

    return (
        <>
            <div className="socialLoginDiv">
                <KakaoLogin
                    token={kakaoClientId}
                    onSuccess={kakaoOnSuccess}
                    onFail={kakaoOnFailure}
                /><br/>
                <GoogleOAuthProvider clientId = {import.meta.env.VITE_GOOGLE_CLIENT_ID}>
                    <GoogleLogin 
                        onSuccess = {googleOnSuccess}
                        onError={()=> {
                        console.log("Login Failed");
                    }} />
                </GoogleOAuthProvider>
            </div>

            {isModalOpen && <LoginModal/>}
        </>

    )
}
export default SocialLoginForm;

                // {/* <button className="btn-kakaoLogin" onClick={()=>setKakaoLogin(true)}>kakao로 로그인하기</button> */}
                
                // {/* <button className="btn-googleLogin" type="submit">Google로 로그인하기</button> */}
