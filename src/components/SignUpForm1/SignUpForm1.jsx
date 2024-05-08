import { useState } from 'react';
import { checkUserId, checkUserPwd } from '../../apis/user';

import loginicon from '../../assets/loginicon.png';
import passwordIcon from '../../assets/passwordLock.png';

import './SignUpForm1.scss';

function SignUpForm1({ onNextPage }) {
    // , inputIdAccount, inputPwdAccount
    const [isDuplicateId, setIsDuplicateId] = useState('');
    const [isDuplicatePwd, setIsDuplicatePwd] = useState('');

    const [inputIdAccount, setInputIdAccount] = useState('');
    const [inputPwdAccount, setInputPwdAccount] = useState('')

    const checkId = async(inputIdAccount) => {
        if (inputIdAccount === '') {
            setIsDuplicateId('');
            return;
        }

        const idResult = await checkUserId ({
            userId : inputIdAccount
        });
        console.log(idResult);

        if (idResult.response && idResult.response.status === 400)  {
            setIsDuplicateId('bad');
        } else {
            if(idResult.status === "SUCCESS") 
                setIsDuplicateId('good');
        }
            
    };
    const onChangeIdAccount = (e) => {
        setInputIdAccount(e.target.value);
    }
    const onBlurIdAccount = () => {
        checkId(inputIdAccount);
    }

    const checkPwd = async(inputPwdAccount) => {
        if (inputPwdAccount === '') {
            setIsDuplicatePwd('');
            return;
        }

        const pwdRegExp = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{6,16}$/g.test(inputPwdAccount);

        const pwdResult = await checkUserPwd ({
            userPwd : inputPwdAccount
        });
        console.log(pwdResult);

        setIsDuplicatePwd(pwdRegExp? 'good' : 'bad');
    }
    const onChangePwdAccount = (e) => {
        setInputPwdAccount(e.target.value);
    }
    const onBlurPwdAccount = () => {
        checkPwd(inputPwdAccount);
    }

    const nextPage = () => {
        if(isDuplicateId === 'good' && isDuplicatePwd === 'good') {
            sessionStorage.setItem("userId", inputIdAccount);
            sessionStorage.setItem("userPwd", inputPwdAccount);
            onNextPage();
        } else {
            return null;
        }
    }

    return (
        <>
            <div className="signUpForm__items">
                <img className="idIcon" src={loginicon} alt="x" />
                <input type="text" className={`inputId ${isDuplicateId === '' ? '' : (isDuplicateId)}`} id="userId"
                    name="userId" placeholder="Email형태의 아이디를 입력해주세요"
                    value={inputIdAccount} onChange={onChangeIdAccount} onBlur={onBlurIdAccount} />
                <br /><br />
                <img className="pwdIcon" src={passwordIcon} alt="x" />
                <input type="password" className={`inputPwd ${isDuplicatePwd === '' ? '' : (isDuplicatePwd)}`} id="userPwd"
                    name="userPwd" placeholder="6~16자리의 대소문자,특수문자,숫자 포함 입력"
                    value={inputPwdAccount} onChange={onChangePwdAccount} onBlur={onBlurPwdAccount} />
            </div>
            <br />
            <button type="button" onClick={nextPage} 
            disabled={isDuplicateId !== 'good' || isDuplicatePwd !== 'good'} >계속하기</button>
            <br />
            <h1>또는</h1>
        </>
    )
}

export default SignUpForm1;

// import { debounce } from 'lodash';

    // const onChangeIdAccount = (e) => {
    //     clearTimeout(timeoutId);

    //     const inputValue = e.target.value;
    //     setInputIdAccount(inputValue);

    //     clearTimeout(timeoutId);
    //     timeoutId = setTimeout( checkId(inputValue), 1000 );
    //     timeoutId = setTimeout(() => {
    //         checkId(inputValue); // 입력이 멈춘 후 checkId 호출
    //     }, 1500);
    //     입력이 변경될 때마다 setTimeout 설정
    //     clearTimeout(timeoutId);
    //     setInputIdAccount(inputValue);
    // };

        // const onChangePwdAccount = (e) => {
    //     clearTimeout(timeoutPwd);
    //     const inputValue = e.target.value;
    //     setInputPwdAccount(inputValue);

    //     clearTimeout(timeoutPwd);
    //     timeoutPwd = setTimeout( checkPwd(inputValue), 1000); // 입력이 멈춘 후 checkPwd 호출

    //     timeoutPwd = setTimeout(() => {
    //         checkPwd(inputValue); // 입력이 멈춘 후 checkPwd 호출
    //     }, 1500);
    //     입력이 변경될 때마다 setTimeout 설정
    //     clearTimeout(timeoutPwd);
    //     setInputPwdAccount(inputValue);
    // };

    // const delayIdInput = debounce(checkId, 500);
    // const onChangeIdAccount = (e) => {
    //     setInputIdAccount(e.target.value);
    //     // checkId();
    //     delayIdInput(e.target.value);
    // };
    // const delayPwdInput = debounce(checkPwd, 500);
    // const onChangePwdAccount = (e) => {
    //     setInputPwdAccount(e.target.value);
    //     // checkPwd();
    //     delayPwdInput(e.target.value);
    // };

        // } else if (idResult.response.errors.code === "Email") {
            //     setIsDuplicateId('bad');
            // } else if (idResult.status === "SUCCESS") {
            //     setIsDuplicateId('good');

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
