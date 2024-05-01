import logo_white from '../../assets/logo/logo_white.png';

import './SignUpForm3.scss';

function SignUpForm3() {
    
    return (
        <>
            <div className="signUpForm__box">
                <div className="signUpcheck">
                    <img src={logo_white} alt="x" />
                    <h2>회원가입</h2>
                </div>
                <div className="signUpForm__steps">
                    <div className="steps" id="step1">
                        <div className="eclipse">1</div><br/>
                        <h3>회원정보<br/>조회</h3>
                    </div>
                    <div className="steps" id="step2">
                        <div className="eclipse">2</div><br/>
                        <h3>추가정보<br/>입력</h3>
                    </div>
                    <div className="steps" id="step3">
                        <div className="eclipse">3</div><br/>
                        <h3>회원가입<br/>완료</h3>
                    </div>
                </div>
                <div className="signUpForm__items">
                    <h3>INDIE:안 의 일원이 되어주셔서 감사합니다!</h3>
                </div>
                <br/>
                <button type="submit">마이페이지</button>
                <button type="submit">정보수정</button>
            </div>
        </>
    )
}

export default SignUpForm3;