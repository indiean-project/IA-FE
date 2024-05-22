import { useState, useEffect } from 'react';
import { useRecoilState } from 'recoil';

import { loginUserState } from '../../recoil/LoginUser';
import { getUserBoard } from '../../apis/user';
import MyPageDiv from '../../components/MyPageDiv';
import MyPageProfile from '../../components/MyPageProfile';
import MyPageBoard from '../../components/MyPageBoard';
import MyPageReply from '../../components/MyPageReply';
import MyPageFund from '../../components/MyPageFund';
import MyPageReport from '../../components/MyPageReport';

import './MyPage.scss'

function MyPage() {
    const [loginUser, setLoginUser] = useRecoilState(loginUserState);
    const [profilePage, setProfilePage] = useState('main');
    const [boardList, setBoardList] = useState([]);

    useEffect(() => {
        const fetchUserBoard = async () => {
            try {
                const board = await getUserBoard(loginUser.userNo);
                console.log(board);
                setBoardList(board.data);
            } catch (error) {
                console.error("Failed to fetch user boards", error);
            } 
        };

        fetchUserBoard();
    }, [loginUser.userNo]);

    return (
        <>
            <div className="myPage__container">
                <div className={`myPage__box ${profilePage}`}>
                    <div className="headh2"><h2>{loginUser.nickname} 님의 페이지입니다.</h2></div>
                    <MyPageDiv onPage={profilePage} setProfilePage={setProfilePage} />
                    {profilePage === 'main' && <MyPageProfile />}
                    {profilePage === 'board' && <MyPageBoard boardList={boardList} />}
                    {profilePage === 'reply' && <MyPageReply />}
                    {profilePage === 'fund' && <MyPageFund />}
                    {profilePage === 'report' && <MyPageReport />}
                </div>
            </div>
        </>
    );


}
export default MyPage;
