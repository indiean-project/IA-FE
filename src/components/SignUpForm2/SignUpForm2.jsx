import {useState} from 'react';

import loginicon from '../../assets/loginicon.png';
import passwordIcon from '../../assets/passwordLock.png';

import './SignUpForm2.scss';
import { signUpUser } from '../../apis/user';

function SignUpForm2({ onNextPage, onPrevPage }) {

    const storageId = sessionStorage.getItem("userId");
    const storagePwd = sessionStorage.getItem("userPwd");
    // sessionStorage.clear();

    console.log(storagePwd);
    const [isConfirmPwd, setIsConfirmPwd] = useState('');
    const [confirmPwd, setConfirmPwd] = useState('');

    const certPwd = (confirmPwd) => {
        if (confirmPwd === '') {
            setIsConfirmPwd('');
            return;
        }
        setIsConfirmPwd(confirmPwd === storagePwd ? 'good' : 'bad');
    }
    const onChangeCertPwd = (e) => {
        setConfirmPwd(e.target.value);
    }
    const onBlurCertPwd = () => {
        certPwd(confirmPwd);
    }

    const [signUpInfo, setSignUpInfo] = useState({
        userId : storageId,
        userPwd : storagePwd,
        userName : '',
        phone : ''
    });

    const onChangeInfo = (e) => {
        setSignUpInfo({
            ...signUpInfo,
            [e.target.name] : e.target.value
        })
    };

    const [isCertNum, setIsCertNum] = useState('');
    const [certNum, setCertNum] = useState('');

    const onCertNum = (e) => {
        setCertNum(e.target.value);
    }
    const onBlurCertNum = () => {
        onCertNum(certNum);
    }

    const nextPage = async() => {

        const result = await signUpUser ({
            userId : storageId,
            userPwd : storagePwd,
            userName : signUpInfo.userName,
            phone : signUpInfo.phone
        })
        console.log(result);
        if(result.response && result.response.data.name==="HAS_PHONE") {
            alert("동일 전화번호 계정이 있습니다! 중복 가입은 불가능합니다.")
        } else {
            // if(isConfirmPwd === 'good' && isCertNum === 'good') {
            if(isConfirmPwd === 'good') {
                onNextPage();
                sessionStorage.clear();
            } else {
                return null;
            }
        }
    }

    return (
        <>
            <div className="signUpForm__items">
                <img className="idIcon" src={loginicon} alt="x" />
                <input type="text" className="inputId" id="userId"
                    name="userId" value={storageId} readOnly />
                <br /><br />
                <img className="pwdIcon" src={passwordIcon} alt="x" />
                <input type="password" className="inputPwd" id="userPwd"
                    name="userPwd" value={storagePwd} readOnly />
                <br /><br />
                <img className="pwdIcon" src={passwordIcon} alt="x" />
                <input type="password" className={`certPwd ${isConfirmPwd === '' ? '' : (isConfirmPwd)}`} id="certPwd"
                    name="certPwd" value={confirmPwd} placeholder="암호를 다시 한번 입력하세요"
                    onChange={onChangeCertPwd} onBlur={onBlurCertPwd} />
                <br /><br />
                <input type="text" className="inputName" id="userName"
                    name="userName" value={signUpInfo.userName} placeholder="이름을 입력하세요"
                    onChange={(e)=>onChangeInfo(e)} />
                <br /><br />
                <input type="text" className="inputPhone" id="phone"
                    name="phone" value={signUpInfo.phone} placeholder="연락처를 입력하세요" 
                    onChange={(e)=>onChangeInfo(e)} />
                <br /><br />
                <input type="number" className={`certNum ${isCertNum === '' ? '' : (isCertNum)}`}id="certNum"
                    name="certNum" value={certNum} placeholder="인증번호를 입력하세요"
                    onChange={onCertNum} onBlur={onBlurCertNum} />
                <button className="btn-cert">인증번호 발송</button>
                {/* 인증번호 발송 관련 함수 필요함 */}
                <br /><br />
                <button className="btn-suf2" onClick={nextPage}>등록완료</button>
                <button className="btn-suf2" onClick={onPrevPage}>뒤로가기</button>
            </div>
            <br />
        </>
    )
}

export default SignUpForm2;