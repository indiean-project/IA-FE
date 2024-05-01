import logo_white from '../../assets/logo/logo_white.png';
import loginicon from '../../assets/loginicon.png';
import passwordIcon from '../../assets/passwordLock.png';

import './SignUpForm2.scss';

function SignUpForm2() {
    
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
                    <img className="idIcon" src={loginicon} alt="x" />
                    <input type="text" className="inputId" id="userId"
                        name="userId" value="" readonly />
                    <br/><br/>
                    <img className="pwdIcon" src={passwordIcon} alt="x" />
                    <input type="password" className="inputPwd" id="userPwd" 
                        name="userPwd" value="" readonly />    
                    <br/><br/>      
                    <img className="pwdIcon" src={passwordIcon} alt="x" />
                    <input type="password" className="checkPwd" id="checkPwd" 
                        name="checkPwd" value="" />           
                    <br/><br/> 
                    <input type="text" className="inputName" id="userName" 
                        name="userName" value="" />    
                    <br/><br/> 
                    <input type="password" className="inputPhone" id="phone" 
                        name="phone" value="" />
                    <br/><br/> 
                </div>
                <br/>
                <button type="submit">등록완료</button>
                <button type="submit">뒤로가기</button>
            </div>
        </>
    )
}

export default SignUpForm2;