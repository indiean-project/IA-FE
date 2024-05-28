import { useState, useEffect } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';

import { loginUserState } from '../../recoil/LoginUser';
import { getUserBoard, getUserFund } from '../../apis/user';
import MyPageDiv from '../../components/MyPageDiv';
import MyPageProfile from '../../components/MyPageProfile';
import MyPageBoard from '../../components/MyPageBoard';
import MyPageReply from '../../components/MyPageReply';
import MyPageFund from '../../components/MyPageFund';
import MyPageReport from '../../components/MyPageReport';

import './MyPage.scss'

function MyPage() {
    const loginUser = useRecoilValue(loginUserState);
    const [profilePage, setProfilePage] = useState('main');
    const [boardList, setBoardList] = useState([]);
    const [fundList, setFundList] = useState([]);
    const [reportList, setReportList] = useState([]);

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

    useEffect(() => {
        const fetchUserFund = async () => {
            try {
                const fund = await getUserFund(loginUser.userNo);
                console.log(fund);
                setFundList(fund.data);
            } catch (error) {
                console.error("Failed to fetch user boards", error);
            } 
        };

        fetchUserFund();
    }, [loginUser.userNo]);

    useEffect(() => {
        const fetchUserReport = async () => {
            try {
                const report = await getUserReport(loginUser.userNo);
                console.log(report);
                setFundList(report.data);
            } catch (error) {
                console.error("Failed to fetch user boards", error);
            } 
        };

        fetchUserReport();
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
                    {profilePage === 'fund' && <MyPageFund fundList={fundList} />}
                    {profilePage === 'report' && <MyPageReport reportList={reportList} />}
                </div>
            </div>
        </>
    );


}
export default MyPage;
