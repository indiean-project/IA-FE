import React, {useState} from 'react';

import './SocialLoginForm.scss';

function SocialLoginForm() {

    return (
        <>
            <div className="socialLoginDiv">
                <button className="btn-kakaoLogin" type="submit">kakao로 로그인하기</button>
                <button className="btn-googleLogin" type="submit">Google로 로그인하기</button>
                {/* <button className="" type="submit"></button> */}
            </div>
        </>

    )
}
export default SocialLoginForm;