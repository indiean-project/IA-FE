import { useState } from 'react';
import { useSetRecoilState } from "recoil";

import ModalWindow from "../ModalWindow";
import { checkUserPwd, updatePwd } from '../../apis/user';
import { isModalActive } from "../../recoil/IsModalActive";
import logo_white from "../../assets/logo/logo_white.png";
import  passwordIcon  from "../../assets/passwordLock.png";
import './FindPwdModal.scss';
import toast from 'react-hot-toast';

function FindPwdModal( { userIdStorage } ) {

    const [isDuplicatePwd, setIsDuplicatePwd] = useState('');
    const [inputPwdAccount, setInputPwdAccount] = useState('')
    const [confirmPwd, setConfirmPwd] = useState('');
    const [isConfirmPwd, setIsConfirmPwd] = useState('');
    const setModal = useSetRecoilState(isModalActive);

    const modalClose = () => {
        setModal(false);
    }

    const checkPwd = async (inputPwdAccount) => {
        if (inputPwdAccount === '') {
            setIsDuplicatePwd('');
            return;
        }

        const pwdRegExp = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{6,16}$/g.test(inputPwdAccount);

        const pwdResult = await checkUserPwd({
            userPwd: inputPwdAccount
        });
        console.log(pwdResult);

        setIsDuplicatePwd(pwdRegExp ? 'good' : 'bad');
    }
    const onChangePwdAccount = (e) => {
        setInputPwdAccount(e.target.value);
    }
    const onBlurPwdAccount = () => {
        checkPwd(inputPwdAccount);
    }

    const certPwd = async (confirmPwd) => {
        if (confirmPwd === '') {
            setIsConfirmPwd('');
            return;
        }
        setIsConfirmPwd(confirmPwd === inputPwdAccount ? 'good' : 'bad');
    }
    const onChangeCertPwd = (e) => {
        setConfirmPwd(e.target.value);
    }
    const onBlurCertPwd = () => {
        certPwd(confirmPwd);
    }

    const pwdUpload = async() => {
        if (isDuplicatePwd === 'good' && isConfirmPwd === 'good') {
            const result = await updatePwd({
                userId: userIdStorage,
                userPwd: inputPwdAccount
            });
            console.log(result);
            if (result.status == "SUCCESS") {
                toast.success("비밀번호 수정이 완료되었습니다.");
                setModal(false);
            } else {
                toast.error("비밀번호 수정에 실패했습니다.")
            }    
        } else {
            toast.error("비밀번호 수정에 실패하였습니다.");
        }
        
    }

    return (
        <ModalWindow>
            <div className="findPwdModal__container">
                <div className="findPwdModal__header">
                    <img className="logo" src={logo_white} />
                    <hr />
                    <h2>비밀번호 변경</h2>
                </div>
                <div className="findPwdModal__inputPwd">
                    <img className="pwdIcon" src={passwordIcon} alt="x" />
                    <input type="password" className={`inputPwd ${isDuplicatePwd === '' ? '' : (isDuplicatePwd)}`} id="userPwd"
                        name="userPwd" placeholder="6~16자리의 대소문자,특수문자,숫자 포함 입력"
                        value={inputPwdAccount} onChange={onChangePwdAccount} onBlur={onBlurPwdAccount} />
                    <br /><br />
                    <img className="pwdIcon" src={passwordIcon} alt="x" />
                    <input type="password" className={`certPwd ${isConfirmPwd === '' ? '' : (isConfirmPwd)}`} id="certPwd"
                        name="certPwd" value={confirmPwd} placeholder="암호를 다시 한번 입력하세요"
                        onChange={onChangeCertPwd} onBlur={onBlurCertPwd} />
                </div>
                <div className="findPwdModal__footer">
                    <div className="btn-findPwdModal apply" onClick={pwdUpload}>등록</div>
                    <div className="btn-findPwdModal cancel" onClick={() => modalClose()}>취소</div>
                </div>
            </div>
        </ModalWindow>
    )
}

export default FindPwdModal;
