import './SocialSignUpForm.scss';

function SocialSignUpForm() {
    
    return (
        <>
            <div className="socialSignUpDiv">
                <button className="btn-kakaoLogin" type="submit">kakao로 가입하기</button>
                <button className="btn-googleLogin" type="submit">Google로 가입하기</button>
                {/* <button className="" type="submit"></button> */}
            </div>
        </>
    )
}

export default SocialSignUpForm;