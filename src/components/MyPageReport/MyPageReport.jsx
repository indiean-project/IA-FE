import React, { useState, useEffect } from 'react';

import './MyPageReport.scss';


function MyPageReport({ questionList, reportList }) {

    const [selectQuestion, setSelectQuestion] = useState(null);

    useEffect(() => {
        console.log("Selected Question No:", selectQuestion ? selectQuestion.questionNo : null);
    }, [selectQuestion]); // selectQuestion 값이 변하면 새로 렌더링

    if (!questionList || !reportList) {
        return <></>
    }
    function clickItem(questionNo) {
        setSelectQuestion(selectQuestion === questionNo ? null : questionNo);
        console.log(questionNo);
        console.log(selectQuestion);
    }

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
                        {questionList.map((item, index) => (
                            <React.Fragment key={index}>
                                <tr onClick={() => clickItem(item.questionNo)}>
                                    <td className='userQuestion__tbody__title'>{item.questionContent}</td>
                                    <td>{item.questionDate}</td>
                                    <td>{item.ansYn}</td>
                                    <td>{item.ansDate}</td>
                                </tr>
                                {
                                    selectQuestion !== "null" && selectQuestion === item.questionNo 
                                    && item.ansYn === "Y" && (
                                        <tr><td colSpan={4}>
                                            <h4>문의사항</h4>
                                            <div className='userQuestion__answer'>{item.questionContent}</div>
                                            <h4>답변내역</h4>
                                            <div className='userQuestion__answer'>{item.ansContent}</div>
                                        </td></tr>  
                                    )
                                    || selectQuestion !== "null" && selectQuestion === item.questionNo 
                                    && item.ansYn === "N" && (
                                        <tr><td colSpan={4}>
                                            <h4>문의사항</h4>
                                            <div className='userQuestion__answer'>{item.questionContent}</div>
                                        </td></tr>  
                                    )
                                }
                            </React.Fragment>
                        ))}
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