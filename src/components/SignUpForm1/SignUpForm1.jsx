import { useState, useEffect, useCallback } from 'react';
import { debounce } from 'lodash';

import { checkUserInfo } from '../../apis/checkUserInfo';

import loginicon from '../../assets/loginicon.png';
import passwordIcon from '../../assets/passwordLock.png';

import './SignUpForm1.scss';

function SignUpForm1({ onNextPage }) {

    const regExp = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,}$/g;

    const [isDuplicateId, setIsDuplicateId] = useState('');
    const [isDuplicatePwd, setIsDuplicatePwd] = useState('');

    const [inputIdAccount, setInputIdAccount] = useState({});
    const [inputPwdAccount, setInputPwdAccount] = useState({})

    const checkUserValue = async (userInfo) => {
        if (userInfo.userId === '' && userInfo.userPwd === '') {
            setIsDuplicateId('');
            setIsDuplicatePwd('');
        } else {
            const result = await checkUserInfo(userInfo)

            console.log(result);
        
            if (result.userId != null) {
                // 가능
                setIsDuplicateId('bad');
            } else {
                setIsDuplicateId('good');
            }
            console.log(regExp.test(inputPwdAccount.userPwd));
            if (regExp.test(inputPwdAccount.userPwd)===true) {    // 비밀번호가 유효성 검사에 걸려 메세지 반환
                // 불가능
                setIsDuplicatePwd('good');
            } else {
                setIsDuplicatePwd('bad');
            }
    
        }
    }

    const delayInput = useCallback(
        debounce((i) => checkUserValue(i), 500),
        []
    )

    const onChangeIdAccount = (e) => {
        setInputIdAccount(prevState => ({
            ...prevState,
            [e.target.name]: e.target.value
        }));

        delayInput({ ...inputIdAccount, [e.target.name]: e.target.value });
    }

    const onChangePwdAccount = (e) => {
        setInputPwdAccount(prevState => ({
            ...prevState,
            [e.target.name]: e.target.value
        }));

        delayInput({ ...inputPwdAccount, [e.target.name]: e.target.value });
    }

    return (
        <>
            <div className="signUpForm__items">
                <img className="idIcon" src={loginicon} alt="x" />
                <input type="text" className={`inputId ${isDuplicateId === '' ? '' : (isDuplicateId)}`} id="userId"
                    name="userId" placeholder="아이디를 입력해주세요"
                    value={inputIdAccount.userId} onChange={(e) => onChangeIdAccount(e)} />
                <br /><br />
                <img className="pwdIcon" src={passwordIcon} alt="x" />
                <input type="password" className={`inputPwd ${isDuplicatePwd === '' ? '' : (isDuplicatePwd)}`} id="userPwd"
                    name="userPwd" placeholder="비밀번호를 입력해주세요"
                    value={inputPwdAccount.userPwd}
                    onChange={(e) => onChangePwdAccount(e)}
                />
            </div>
            <br />
            <button type="button" onClick={onNextPage}>계속하기</button>
            <br />
            <h1>또는</h1>
        </>
    )
}

export default SignUpForm1;

    // const onChangeAccount = async(e) => {
    //      setInputAccount({
    //         ...inputAccount,
    //         [e.target.name] : e.target.value
    //      })

    //      console.log(inputAccount);
    //      console.log(inputAccount.userId);

    //      const result = await checkUserInfo({
    //         userId: inputAccount.userId,
    //         userPwd: inputAccount.userPwd
    //     });
    //     console.log(result);

    //     if(result.userId === null) {
    //         setIsDuplicate('good');
    //     } else {
    //         setIsDuplicate('bad');
    //     }
    //     if(result.userPwd === null) {
    //         setIsDuplicate('good');
    //     } else {
    //         setIsDuplicate('bad');
    //     }

    // }

    // useEffect(() => {
    //     console.log(inputAccount);
    //     console.log(inputAccount.userId);

    //     const fetchData = async () => {
    //         const result = await checkUserInfo({
    //             userId: inputAccount.userId,
    //             userPwd: inputAccount.userPwd
    //         });
    //         console.log(result);

    //         if (result.userId) {
    //             setIsDuplicate('good');
    //         } else {
    //             setIsDuplicate('bad');
    //         }
    //         if (result.userPwd === null) {
    //             setIsDuplicate('good');
    //         } else {
    //             setIsDuplicate('bad');
    //         }
    //     };

    //     fetchData();

    // }, [inputAccount]);

    // useEffect(() => {
    //     const timer = setTimeout(async () => {
    //         console.log(inputAccount);
    //         const result = await checkUserInfo({
    //             userId: inputAccount.userId,
    //             userPwd: inputAccount.userPwd
    //         });
    //         console.log(result);
    //         // if (result.userId === '') {
    //         //     setIsDuplicate('good');
    //         // } else {
    //         //     setIsDuplicate('bad');
    //         // }
    //         // if (result.userPwd === null) {
    //         //     setIsDuplicate('good');
    //         // } else {
    //         //     setIsDuplicate('bad');
    //         // }
    //     }, 500);

    //     return () => clearTimeout(timer);
    // }, [inputAccount]);    
