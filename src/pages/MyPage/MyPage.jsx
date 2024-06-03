import { useState, useEffect } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';

import { loginUserState } from '../../recoil/LoginUser';
import { getUserReply, getUserBoard, getUserFund, getUserQuestion, getUserReport } from '../../apis/user';
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
    const [replyList, setReplyList] = useState([]);
    const [fundList, setFundList] = useState([]);
    const [questionList, setQuestionList] = useState([]);
    const [reportList, setReportList] = useState([]);

    useEffect(() => {
        const fetchUserBoard = async () => {
            try {
                const board = await getUserBoard(loginUser.userNo);
                setBoardList(board.data);
            } catch (error) {
                console.error("Failed to fetch user boards", error);
            }
        };

        fetchUserBoard();
    }, [loginUser.userNo, setBoardList]);

    useEffect(() => {
        const fetchUserReply = async () => {
            try {
                const reply = await getUserReply(loginUser.userNo);
                setReplyList(reply.data);
            } catch (error) {
                console.error("Failed to fetch user replies", error);   
            }
        };

        fetchUserReply();
    }, [loginUser.userNo, setReplyList]);

    useEffect(() => {
        const fetchUserFund = async () => {
            try {
                const fund = await getUserFund(loginUser.userNo);
                setFundList(fund.data);
            } catch (error) {
                console.error("Failed to fetch user fund", error);
            }
        };

        fetchUserFund();
    }, [loginUser.userNo, setFundList]);

    useEffect(() => {
        const fetchUserQuestionReportstatus = async () => {
            try {
                const questionLog = await getUserQuestion(loginUser.userNo);
                const reportLog = await getUserReport(loginUser.userNo);
                setQuestionList(questionLog.data);
                setReportList(reportLog.data);
            } catch (error) {
                console.error("Failed to fetch user question & report", error);
            }

        };
        fetchUserQuestionReportstatus();
    }, [loginUser.userNo, setQuestionList, setReportList]);


    return (
        <>
            <div className="myPage__container">
                <div className={`myPage__box ${profilePage}`}>
                    <div className="headh2"><h2>{loginUser.nickname} 님의 페이지입니다.</h2></div>
                    <MyPageDiv onPage={profilePage} setProfilePage={setProfilePage} />
                    {profilePage === 'main' && <MyPageProfile />}
                    {profilePage === 'board' && <MyPageBoard boardList={boardList} />}
                    {profilePage === 'reply' && <MyPageReply replyList={replyList} />}
                    {profilePage === 'fund' && <MyPageFund fundList={fundList} />}
                    {profilePage === 'report' && <MyPageReport questionList={questionList} reportList={reportList} />}
                </div>
            </div>
        </>
    );


}
export default MyPage;
