import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';

// import PaginationBar from '../PaginationBar';
// import FundInputBar from '../FundInputBar';
import { ViewCount } from '../../apis/board';
import { boardPoint } from '../../recoil/boardPoint';

import './MyPageBoard.scss';

function MyPageBoard({ boardList }) {

    const navigate = useNavigate();
    const [boardCategory, setBoardCategory] = useRecoilState(boardPoint);
    // 카테고리 관련 정리 필요 (전부 자유게시판 양식으로 띄우고 있음)

    if (!boardList) {
        return <></>
    }

    function clickItem(item) {
        const boardNo = item.boardNo;
        ViewCount(boardNo);
        setBoardCategory("free");
        navigate("/board/detail/" + item.boardNo);
    }

    return (
        <>
            <div className='userBoard__container'>
                <table className='userBoard__table'>
                    <thead>
                        <tr>
                            <th className='userBoard__thead__title'>제목</th>
                            <th className='userBoard__thead__writer'>작성자</th>
                            <th className='userBoard__thead__updatedate'>수정일</th>
                            <th className='userBoard__thead__count'>조회</th>
                            <th className='userBoard__thead__like'>추천</th>
                        </tr>
                    </thead>
                    <tbody>
                        {boardList.map((item, index) => {
                            return (
                                <tr key={index} onClick={() => clickItem(item)}>
                                    <td className='userBoard__tbody__title'>{item.boardTitle}<span>[{item.replies}]</span></td>
                                    <td>{item.nickname}</td>
                                    <td>{item.updateDate}</td>
                                    <td>{item.viewCount}</td>
                                    <td>{item.likeCount}</td>
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

export default MyPageBoard;