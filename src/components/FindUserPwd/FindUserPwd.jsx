import { useState, useEffect } from 'react';
import { useRecoilState } from 'recoil';

import { findUserPwd, sendEmail } from '../../apis/user';
import './FindUserPwd.scss';
import toast from 'react-hot-toast';
import { isModalActive } from '../../recoil/IsModalActive';

function FindUserPwd() {

    const [sendCode, setSendCode] = useState('');
    const [isModalOpen, setIsModalOpen] = useRecoilState(isModalActive);

    const [returnInfo, setReturnInfo] = useState({
        userPwd: ''
    });

    const [inputAccount, setInputAccount] = useState({
        userId: ''
    })

    const onChangeId = (e) => {
        setInputAccount({
            ...inputAccount,
            [e.target.name]: e.target.value
        })
    }

    const sendCertNum = async() => {
        console.log(inputAccount);
        setSendCode('');
        if(inputAccount.userId === '') {
            toast.error('아이디 입력이 필요합니다.')
        } else {
            const result = await sendEmail({
                userId: inputAccount.userId
            })
            console.log(result);
    
            if(result !== undefined) {
                toast.success('인증번호가 전송되었습니다.');    
            } else {
                toast.error('인증번호 전송에 실패했습니다.')
            }
            setSendCode(result);
        }
    }
    // 아이디 중복이 있는지 확인을 받고 메일을 보낼 수 있게 해야함

    const clickVerifyBtn = async () => {
        console.log(inputAccount);
        const result = await findUserPwd({
            userId: inputAccount.userId
        })
        console.log(result);

        if (result) {
            setIsModalOpen(true);
            setReturnInfo(result['data']);
        } else {
            toast.error('없는 계정 이메일입니다.')
        }
        console.log(returnInfo);
    }
    // 인증번호 관련 색상 분류로 인증 받고 넘어갈 수 있게

    const [isCertNum, setIsCertNum] = useState('');
    const [certNum, setCertNum] = useState('');

    const confirmCertNum = (certNum) => {
        if (certNum === '') {
            setIsCertNum('');
            return;
        }
        setIsCertNum(certNum === sendCode ? 'good' : 'bad');
        console.log(isCertNum);
    }

    const onCertNum = (e) => {
        setCertNum(e.target.value);
    }
    const onBlurCertNum = () => {
        confirmCertNum(certNum);
    }

    useEffect(() => {
        console.log(returnInfo);
    }, [returnInfo])

    return (
        <div className="find__box">
            <h2>Find Your PassWord</h2>
            <div className="find__inputId">
                <div className="inputArea">
                    <input type="text" className="inputId" id="userId" name="userId"
                        value={inputAccount.userId} placeholder="가입된 아이디(이메일)을 입력하세요"
                        onChange={(e) => onChangeId(e)} />
                    <br />
                    <div className="btn-sendEmail" onClick={() => sendCertNum()}>인증번호 발송</div>
                </div>
                <div className="certArea">
                    <input type="text" className={`certNum ${isCertNum === '' ? '' : (isCertNum)}`} id="certNum"
                        name="certNum" value={certNum} placeholder="인증번호를 입력하세요"
                        onChange={onCertNum} onBlur={onBlurCertNum} />
                    <div className="btn-verifyId" onClick={() => clickVerifyBtn()}>인증 확인</div>
                </div>
            </div>
            {isModalOpen && <FindPwdModal />}
        </div>
    )

}

export default FindUserPwd;