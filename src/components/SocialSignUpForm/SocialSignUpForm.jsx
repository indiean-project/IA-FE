import KakaoLogin from 'react-kakao-login';
import {checkUserId} from '../../apis/user';

import './SocialSignUpForm.scss';

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

        if(idResult.response && idResult.status === "SUCCESS") {
            toast.error('계정 정보가 존재합니다.');
        } else {
            sessionStorage.setItem("userId", tokenEmail);
            sessionStorage.setItem("socialStatus", "K");
            return onNextPage();
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
            <div className="socialSignUpDiv">
                <KakaoLogin
                    token={kakaoClientId}
                    onSuccess={kakaoOnSuccess}
                    onFail={kakaoOnFailure}
                />
                <button className="btn-googleLogin" type="submit">Google로 가입하기</button>
                {/* <button className="" type="submit"></button> */}
            </div>
        </>
    )
}

export default SocialSignUpForm;