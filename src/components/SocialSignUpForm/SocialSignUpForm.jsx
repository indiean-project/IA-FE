import KakaoLogin from 'react-kakao-login';
import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';

import {checkUserId} from '../../apis/user';

import './SocialSignUpForm.scss';
import toast from 'react-hot-toast';

function SocialSignUpForm({ onNextPage }) {
    
    const kakaoClientId = import.meta.env.VITE_KAKAO_CLIENT_ID;
    const kakaoOnSuccess = async(data) => {
        console.log(data)
        // const idToken = data.response.access_token // 액세스 토큰
        const tokenEmail = data.profile.kakao_account.email;
        console.log(tokenEmail);
        
        const idResult = await checkUserId({
            userId: tokenEmail,
        })

        console.log(idResult);

        if(idResult.response && idResult.response.data.name === "HAS_ID") {
            toast.error('계정 정보가 존재합니다.');
        } else {
            sessionStorage.setItem("userId", tokenEmail);
            sessionStorage.setItem("socialStatus", "K");
            return onNextPage();
        }
        console.log(loginUserInfo);
        console.log(isModalOpen);

        console.log(loginUserState);

    };

    const kakaoOnFailure = (error) => {
        console.log(error);
    };

    const googleOnSuccess = async(data) => {
        const tokenEmail = jwtDecode(data.credential).email;
        console.log(tokenEmail);

        const idResult = await checkUserId({
            userId: tokenEmail,
        })

        console.log(idResult);

        if(idResult.response && idResult.response.data.name === "HAS_ID") {
            toast.error('계정 정보가 존재합니다.');
        } else {
            sessionStorage.setItem("userId", tokenEmail);
            sessionStorage.setItem("socialStatus", "G");
            return onNextPage();
        }
        console.log(loginUserInfo);
        console.log(isModalOpen);

        console.log(loginUserState);

    }

    return (
        <>
            <div className="socialSignUpDiv">
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
        </>
    )
}

export default SocialSignUpForm;