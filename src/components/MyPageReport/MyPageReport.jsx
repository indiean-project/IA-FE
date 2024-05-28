import React, { useState, useEffect } from 'react';
import { useRecoilValue } from 'recoil';

import { getUserQuestion, getUserReport } from '../../apis/user';
import { loginUserState } from '../../recoil/LoginUser';
import './MyPageReport.scss';


function MyPageReport({ questionList, reportList }) {

    const loginUser = useRecoilValue(loginUserState);
    const [selectQuestion, setSelectQuestion] = useState(null);

    return (
        <>
            <div className='userQuestion__container'>
                <h2>문의사항</h2>
                <table className='userQuestion__table'>
                    <thead>
                        <tr>
                            <th className='userQuestion__thead__content'>내용</th>
                            <th className='userQuestion__thead__enrolldate'>등록일</th>
                            <th className='userQuestion__thead__ansYN'>답변여부</th>
                            <th className='userQuestion__thead__ansdate'>답변일</th>
                        </tr>
                    </thead>
                    <tbody>
                        {questionList.map((item, index) => {
                            <tr key={index} onClick={() => clickItem(item)}>
                                <td className='userQuestion__tbody__title'>{item.questionContent}</td>
                                <td>{item.enrollDate}</td>
                                <td>{item.ansYn}</td>
                                <td>{item.ansDate}</td>
                            </tr>
                            {
                                selectQuestion && selectQuestion.ansyn == "Y" && (
                                    <tr><td colSpan={4}>
                                        <div className='userQuestion__answer'>{item.ansContent}</div>
                                    </td></tr>
                                )
                            }
                        })}
                    </tbody>
                </table>
            </div >
            <br />
            <div className='userReport__container'>
                <h2>신고관련 문의</h2>
                <table className='userReport__table'>
                    <thead>
                        <tr>
                            <th className='userReport__thead__content'>신고내역</th>
                            <th className='userReport__thead__reportdate'>신고일자</th>
                            <th className='userReport__thead__nickname'>신고자</th>
                            <th className='userReport__thead__reportType'>신고종류</th>
                            <th className='userReport__thead__solveYN'>처리상태</th>
                        </tr>
                    </thead>
                    <tbody>
                        {reportList.map((item, index) => (
                            <tr key={index}>
                                <td className='userReport__tbody__content'>{item.contentNo}</td>
                                <td>{item.reportDate}</td>
                                <td>{item.nickname}</td>
                                <td>{item.reportTypeNo}</td>
                                <td>{item.solveYn}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {/* <PaginationBar pageInfo={boardList.pageInfo} list={boardList.list} />
            <div className='userBoard__input__area'>
                <FundInputBar width={"40%"} onChangeValue={(e)=>{setKeyword(e.target.value)}}/>
                <div className='userBoard__btn'><a onClick={()=>{list()}}>검색</a></div>
            </div> */}
            </div>
        </>
    )
}

export default MyPageReport;