import React, { useState, useEffect } from 'react';
import { useRecoilValue } from 'recoil';

import { loginUserState } from '../../recoil/LoginUser';
import './MyPageReport.scss';


function MyPageReport( { reportList }) {

    const loginUser = useRecoilValue(loginUserState);
    const [selectReport, setSelectReport] = useState(null);

    return (
        <>
            <div className='userReport__container question'>
                <h2>문의사항</h2>
                <table className='userReport__table'>
                    <thead>
                        <tr>
                            <th className='userReport__thead__title'>제목</th>
                            <th className='userReport__thead__enrolldate'>등록일</th>
                            <th className='userReport__thead__ansYN'>답변여부</th>
                            <th className='userReport__thead__ansdate'>답변일</th>
                        </tr>
                    </thead>
                    <tbody>
                        {reportList.map((item, index) => (
                            <React.Fragment key ={index}>
                                <tr onClick={() => clickItem(item)}>
                                    <td className='userReport__tbody__title'>{item.questionTitle}</td>
                                    <td>{item.enrollDate}</td>
                                    <td>{item.ansYn}</td>
                                    <td>{item.ansDate}</td>
                                </tr>
                                {/* {selectReport && selectReport.ansyn == "Y" && {
                                    <tr><td colSpan={4}>
                                        <MyPageReportAnswer
                                            userNo={loginUser.userNo}
                                            reportNo={item.fundNo}
                                            selectReport = {selectReport} />
                                    </td></tr>
                                }} */}
                            </React.Fragment> 
                        ))}
                    </tbody>
                </table>
            </div>
            <br/>
            <div className='userReport__container report'>
                <h2>신고관련 문의</h2>
                <table className='userReport__table'>
                    <thead>
                        <tr>
                            <th className='userReport__thead__title'>제목</th>
                            <th className='userReport__thead__writer'>작성자</th>
                            <th className='userReport__thead__updatedate'>수정일</th>
                            <th className='userReport__thead__count'>조회</th>
                            <th className='userReport__thead__like'>추천</th>
                        </tr>
                    </thead>
                    <tbody>
                        {reportList.map((item, index) => (
                            <React.Fragment key ={index}>
                                <tr onClick={() => clickItem(item)}>
                                    <td className='userReport__tbody__title'>{item.boardTitle}<span>[{item.replies}]</span></td>
                                    <td>{item.nickname}</td>
                                    <td>{item.updateDate}</td>
                                    <td>{item.viewCount}</td>
                                    <td>{item.likeCount}</td>
                                </tr>
                                {/* {selectReport && selectReport.ansyn == "Y" && {
                                    <tr><td colSpan={4}>
                                        <MyPageReportAnswer
                                            userNo={loginUser.userNo}
                                            reportNo={item.fundNo}
                                            selectReport = {selectReport} />
                                    </td></tr>
                                }} */}
                            </React.Fragment> 
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