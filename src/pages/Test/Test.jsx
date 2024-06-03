import { useState } from 'react';
import './Test.scss';
import { loginUser } from '../../apis/user';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { loginUserState } from '../../recoil/LoginUser';

function Test(){

    /*
        참고할 파일
        src/apis/user.js => axios로 back-end 서버에 요청을 보낸다.
        src/core/index.js => axios 초기 설정
        src/recoil/LoginUser.js => 로그인 유저 정보를 담을 recoil
    */

    const [account, setAccount] = useState({
        userId: '',
        userPwd: '',
    })
    const setLoginUser = useSetRecoilState(loginUserState);
    const loginUserInfo = useRecoilValue(loginUserState);

    const onChangeAccount = (e)=>{
        setAccount({
            ...account,
            [e.target.name]: e.target.value,
        })
    }

    const onClickLogin = async()=>{
        const result = await loginUser({
            userId: account.userId,
            userPwd: account.userPwd,
        });
        setLoginUser({
            userId: result.userId,
            userName: result.userName,
            phone: result.phone,
            address: result.address,
        })
    }

    return(
        <div className="test__container">
            테스트 페이지
            <div>
                <input type="text" name='userId' value={account.userId} onChange={(e)=>onChangeAccount(e)} />
                <input type="password" name='userPwd' value={account.userPwd} onChange={(e)=>onChangeAccount(e)} />
                <button onClick={()=>onClickLogin()}>로그인테스트</button>
            </div>
            <div>로그인 유저 이름(로그인 시 표시) : {loginUserInfo.userName}</div>
            <div>session storage에 담겨 새로고침해도 지워지지 않는다.</div>
        </div>
    );
}
export default Test;