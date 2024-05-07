import { useState } from 'react';
import { debounce } from 'lodash';

import { checkUserInfo } from '../../apis/user';

import loginicon from '../../assets/loginicon.png';
import passwordIcon from '../../assets/passwordLock.png';

import './SignUpForm1.scss';

function SignUpForm1({ onNextPage }) {

    const [isDuplicateId, setIsDuplicateId] = useState('');
    const [isDuplicatePwd, setIsDuplicatePwd] = useState('');

    const [inputIdAccount, setInputIdAccount] = useState('');
    const [inputPwdAccount, setInputPwdAccount] = useState('')

    const checkUser = async() => {
        if (inputIdAccount === '') {
            setIsDuplicateId('');
            return;
        }

        if (inputPwdAccount === '') {
            setIsDuplicatePwd('');
            return;
        }

        const result = await checkUserInfo({
            userId : inputIdAccount, 
            userPwd : inputPwdAccount
        });

        console.log(result);

        // if(result.userId !== null) {
        if (result.name === "HAS_ID") {
            setIsDuplicateId('bad');
        } else {
            setIsDuplicateId('good');
        }

        const regExp = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{6,}$/g.test(userPwd);

        setIsDuplicatePwd(regExp? 'good' : 'bad');
    };

    const delayInput = debounce(checkUser, 200);

    const onChangeIdAccount = (e) => {
        setInputIdAccount(e.target.value);
        delayInput();
    };

    const onChangePwdAccount = (e) => {
        setInputPwdAccount(e.target.value);
        delayInput();
    };

    return (
        <>
            <div className="signUpForm__items">
                <img className="idIcon" src={loginicon} alt="x" />
                <input type="text" className={`inputId ${isDuplicateId === '' ? '' : (isDuplicateId)}`} id="userId"
                    name="userId" placeholder="아이디를 입력해주세요"
                    value={inputIdAccount} onChange={(e)=>onChangeIdAccount(e)} />
                <br /><br />
                <img className="pwdIcon" src={passwordIcon} alt="x" />
                <input type="password" className={`inputPwd ${isDuplicatePwd === '' ? '' : (isDuplicatePwd)}`} id="userPwd"
                    name="userPwd" placeholder="비밀번호를 입력해주세요"
                    value={inputPwdAccount}
                    onChange={(e)=>onChangePwdAccount(e)}
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
