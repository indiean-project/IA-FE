import React, {useState} from 'react';
import {useRecoilState, useSetRecoilState, useRecoilValue} from 'recoil';
import KakaoLogin from 'react-kakao-login';

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
        console.log(data)
        // const idToken = data.response.access_token // 액세스 토큰
        const tokenEmail = data.profile.kakao_account.email;
        console.log(tokenEmail);
        
        const result = await loginUser({
            userId: tokenEmail,
            userPwd: '',
            // socialStatus: 'K'
        })

        console.log(result);

        if(result === undefined) {
            toast.error('로그인 정보가 올바르지 않습니다.');
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
    const kakaoOnFailure = (error) => {
        console.log(error);
    };

    return (
        <>
            <div className="socialLoginDiv">
                <KakaoLogin
                    token={kakaoClientId}
                    onSuccess={kakaoOnSuccess}
                    onFail={kakaoOnFailure}
                />
                {/* <button className="btn-kakaoLogin" onClick={()=>setKakaoLogin(true)}>kakao로 로그인하기</button> */}
                <button className="btn-googleLogin" type="submit">Google로 로그인하기</button>
            </div>
            {/* {kakaoLogin && <KakaoLogin />} */}
            {isModalOpen && <LoginModal/>}
        </>

    )
}
export default SocialLoginForm;