import React, {useState} from 'react';

import './SocialLoginForm.scss';
// import SocialKakaoLogin from '../SocialKakaoLogin';
import KakaoLogin from 'react-kakao-login';

function SocialLoginForm() {

    // const [kakaoLogin, setKakaoLogin] = useState(false);

    const kakaoClientId = import.meta.env.VITE_KAKAO_CLIENT_ID;
    const kakaoOnSuccess = async(data) => {
        console.log(data)
        // const idToken = data.response.access_token // 액세스 토큰
        const tokenEmail = data.profile.kakao_account.email;
        console.log(tokenEmail);
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
        </>

    )
}
export default SocialLoginForm;