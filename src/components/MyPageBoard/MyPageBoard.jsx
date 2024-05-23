import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';

import PaginationBar from '../PaginationBar';
import FundInputBar from '../FundInputBar';
import { ViewCount } from '../../apis/board';
import { boardPoint } from '../../recoil/boardPoint';

import './MyPageBoard.scss';

function MyPageBoard(props) {
    
    const navigate = useNavigate();
    const [boardCategory, setBoardCategory] = useRecoilState(boardPoint);
    const [boardList, setBoardList] = useState ([]);

    if(!props.boardList) {
        return <></>
    }

    function clickItem(item) {
        const boardNo = item.boardNo;
        ViewCount(boardNo);
        setBoardCategory("free");
        navigate("/board/detail/"+item.boardNo);
    }

    return (
        <>
            <table className='freeboarditem__table'>
                <thead>
                    <tr>
                        <th className='freeboarditem__thead__no'>번호</th>
                        <th className='freeboarditem__thead__title'>제목</th>
                        <th className='freeboarditem__thead__writer'>작성자</th>
                        <th className='freeboarditem__thead__enrolldate'>등록일</th>
                        <th className='freeboarditem__thead__count'>조회</th>
                        <th className='freeboarditem__thead__like'>추천</th>
                    </tr>
                </thead>
                <tbody>
                    {props.boardList.map((item, index) => {
                        return (
                            <tr key={index} onClick={() => clickItem(item)}>
                                <td>{item.boardNo}</td>
                                <td className='freeboarditem__tbody__title'>{item.boardTitle}<span>[{item.replies}]</span></td>
                                <td>{item.nickname}</td>
                                <td>{item.enrollDate}</td>
                                <td>{item.viewCount}</td>
                                <td>{item.likeCount}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
            <PaginationBar pageInfo={props.pageInfo} list={props.list} />
            <div className='freeboarditem__input__area'>
                <FundInputBar width={"40%"} onChangeValue={(e)=>{props.setKeyword(e.target.value)}}/>
                <div className='freeboarditem__btn'><a onClick={()=>{props.list()}}>검색</a></div>
            </div>
        </>
    )
}

export default MyPageBoard;