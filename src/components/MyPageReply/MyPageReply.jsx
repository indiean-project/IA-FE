import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';

// import PaginationBar from '../PaginationBar';
// import FundInputBar from '../FundInputBar';
import { ViewCount } from '../../apis/board';
import { boardPoint } from '../../recoil/boardPoint';

import './MyPageReply.scss';

function MyPageReply( {replyList} ) {
    const navigate = useNavigate();
    const [boardCategory, setBoardCategory] = useRecoilState(boardPoint);
    // 카테고리 관련 정리 필요 (전부 자유게시판 양식으로 띄우고 있음)

    if (!replyList) {
        return <></>
    }

    function clickItem(item) {
        const boardNo = item.boardNo;
        ViewCount(boardNo);
        setBoardCategory(item.contentType);
        if(boardCategory === "자유게시판" || boardCategory === "자랑게시판") {
            navigate("/board/detail/" + item.boardNo);    
        } else if(boardCategory === "콜로세움") {
            navigate("/board/colo/");
            // navigate("/board/colo/" + item.boardNo);
        } else if(boardCategory === "전용게시판") {
            navigate("/board/");
        }
        
    }

    return (
        <>
            <div className='userReply__container'>
                <table className='userReply__table'>
                    <thead>
                        <tr>
                            <th className='userReply__thead__content'>댓글 내용</th>
                            <th className='userReply__thead__type'>게시판 유형</th>
                            <th className='userReply__thead__createdate'>작성일</th>
                        </tr>
                    </thead>
                    <tbody>
                        {replyList.map((item, index) => {
                            return (
                                <tr key={index} onClick={() => clickItem(item)}>
                                    <td className='userReply__tbody__title'>{item.replyContent}</td>
                                    <td>{item.contentType}</td>
                                    <td>{item.createDate}</td>
                                </tr>
                            )
                        })}
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


export default MyPageReply;