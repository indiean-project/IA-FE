import { useState, useEffect } from 'react';

import { findUserId } from '../../apis/user';
import './FindUserId.scss';
import toast from 'react-hot-toast';

function FindUserId() {

    const [toggleVerify, setToggleVerify] = useState(false);
    const [returnInfo, setReturnInfo] = useState({
        userId: '',
        socialStatus: '',
    });

    const [inputAccount, setInputAccount] = useState({
        phone: ''
    })

    const onChangePhone = (e) => {
        setInputAccount({
            ...inputAccount,
            [e.target.name]: e.target.value
        })
    }

    const clickVerifyBtn = async () => {
        console.log(inputAccount);
        const result = await findUserId({
            phone: inputAccount.phone
        })
        console.log(result); 
        if(result) {
            setToggleVerify(true);
            setReturnInfo(result['data']);
        } else {
            toast.error('가입 되어있지 않은 사용자 연락처입니다.')
        }
        console.log(returnInfo);
    }

    useEffect(() => {
        console.log(returnInfo);
    }, [returnInfo])

    return (
        <div className="find__box">
            <h2>Find Your ID</h2>
            <div className="find__inputPhone">
                <input type="text" className="inputPhone" id="phone" name="phone"
                    value={inputAccount.phone} placeholder="가입된 연락처를 입력하세요" 
                    onChange={(e)=> onChangePhone(e)} />
                <div className="btn-verifyPhone" onClick={()=>clickVerifyBtn()}>인증 확인</div>
            </div>
            {toggleVerify && (
                <div className="find__notifyId">
                    당신의 아이디는 {returnInfo.userId} 입니다.
                    {returnInfo.socialStatus !=="N" && (" 소셜 가입 계정입니다.")}
                </div>
            )}
        </div>
    )
}

export default FindUserId;