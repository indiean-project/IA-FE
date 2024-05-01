import loginicon from '../../assets/loginicon.png';
import passwordIcon from '../../assets/passwordLock.png';

import './SignUpForm2.scss';

function SignUpForm2({ onNextPage, onPrevPage }) {

    return (
        <>
            <div className="signUpForm__items">
                <img className="idIcon" src={loginicon} alt="x" />
                <input type="text" className="inputId" id="userId"
                    name="userId" value="" readonly />
                <br /><br />
                <img className="pwdIcon" src={passwordIcon} alt="x" />
                <input type="password" className="inputPwd" id="userPwd"
                    name="userPwd" value="" readonly />
                <br /><br />
                <img className="pwdIcon" src={passwordIcon} alt="x" />
                <input type="password" className="checkPwd" id="checkPwd"
                    name="checkPwd" value="" />
                <br /><br />
                <input type="text" className="inputName" id="userName"
                    name="userName" value="" />
                <br /><br />
                <input type="password" className="inputPhone" id="phone"
                    name="phone" value="" />
                <br /><br />
                <input type="text" className="certNum" id="certNum"
                    name="certNum" value="" />
                <button className="btn-cert">인증번호 발송</button>
                <br /><br />
                <button className="btn-suf2" onClick={onNextPage}>등록완료</button>
                <button className="btn-suf2" onClick={onPrevPage}>뒤로가기</button>
            </div>
            <br />
        </>
    )
}

export default SignUpForm2;