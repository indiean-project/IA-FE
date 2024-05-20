import { useEffect, useState } from 'react';
import CommonReply from '../../components/CommonReply/CommonReply';
import './BoardDetail.scss';
import { MdThumbUp } from "react-icons/md";
import { useLocation } from 'react-router-dom';
import FreeBoardItem from '../../components/FreeBoardItem';
import { pageMove } from '../../apis/pagination';
import { cPage } from '../../recoil/page';
import { useRecoilState } from 'recoil';

function BoardDetail() {
    const location = useLocation();
    const [item, setItem] = useState();
    const [pageInfo, setPageInfo] = useState();
    const url = "board/free/boardlist";
    const [currentPage,setCurrentPage] = useRecoilState(cPage);
    const [keyword, setKeyword] = useState("");
    const [boardList, setBoardList] = useState();

    const list = async()=>{
        const list = await pageMove({
            url: url,
            page: currentPage,
            sort: 'boardNo',
            keyword: keyword
        }
        )
        setBoardList(list.listDto);
    }
    useEffect(()=>{
        setItem(location.state.item);
        setPageInfo(location.state.pageInfo);
        list();
        
    }, [location.state])

    if (!item) {
        return <></>
    }
    return (
        <div className='boardDetail__container'>
            <div className='boardDetail__box'>
                <div className='boardDetail__item'>
                    <div>No.{item.boardNo}</div>
                    <div>{item.nickname}</div>
                </div>
                <div>{item.enrollDate}</div>
                <div className='boardDetail__item'>
                    <div>조회 : {item.viewCount}</div>
                    <div>추천 : {item.likeCount}</div>
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
            <FreeBoardItem pageInfo={pageInfo} boardList={boardList} list={list}/>
        </div>
    )
} export default BoardDetail;