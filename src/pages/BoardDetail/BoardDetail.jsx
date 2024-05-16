import { useEffect, useState } from 'react';
import CommonReply from '../../components/CommonReply/CommonReply';
import './BoardDetail.scss';
import { MdThumbUp } from "react-icons/md";
import { useLocation } from 'react-router-dom';
import FreeBoardItem from '../../components/FreeBoardItem';

function BoardDetail() {
    const location = useLocation();
    const [list, setList] = useState();
    const [item, setItem] = useState();
    const [pageInfo, setPageInfo] = useState();

    useEffect(()=>{
        setList(location.state.list);
        setItem(location.state.item);
        setPageInfo(location.state.pageInfo)
    }, [location.state])

    if (!item) {
        return <div></div>
    }
    return (
        <div className='boardDetail__container'>
            <div className='boardDetail__box'>
                <div>{item.nickname}</div>
                <div>{item.enrollDate}</div>
                <div className='boardDetail__item'>
                    <div>조회 : {item.viewCount}</div>
                    <div>추천 : {item.replies}</div>
                </div>
            </div>
            <hr />
            <div className='boardDetail__box'>
                <div>자유게시판</div>
                <div className='boardDetail__item'>
                    <div>수정</div>
                    <div>삭제</div>
                    <div>목록</div>
                    <div>신고</div>
                </div>
            </div>
            <div className='boardDetaill__title'>
                <label>{item.boardTitle}</label>
                <p dangerouslySetInnerHTML={{ __html: item.boardContent }}></p>
            </div>
            <div className='boardDetail__like__area'>
                <div className="boardDetail__like">
                    <div><MdThumbUp /></div>
                    <div>{item.likeCount}</div>
                </div>
            </div>
            <CommonReply/>
            {/* <FreeBoardItem boardList={list}/> */}
        </div>
    )
} export default BoardDetail;