import { useEffect, useState } from 'react';
import CommonReply from '../../components/CommonReply/CommonReply';
import './BoardDetail.scss';
import { MdThumbUp } from "react-icons/md";
import { useLocation, useParams } from 'react-router-dom';
import FreeBoardItem from '../../components/FreeBoardItem';
import { pageMove } from '../../apis/pagination';
import { cPage } from '../../recoil/page';
import { useRecoilState } from 'recoil';
import { LikeCount } from '../../apis/board';
import DOMPurify from 'dompurify';
import ProudItem from '../../components/ProudItem';
import { boardPoint } from '../../recoil/boardPoint';
import { loginUserState } from '../../recoil/LoginUser';

function BoardDetail() {
    const [pageInfo, setPageInfo] = useState();
    const [currentPage, setCurrentPage] = useRecoilState(cPage);
    const [keyword, setKeyword] = useState("");
    const [boardList, setBoardList] = useState();
    const param = useParams().id;
    const [boardItem, setBoardItem] = useState([]);
    const location = useLocation();
    const [category, setCategory] = useState();
    const [boardCategory, setBoardCategory] = useRecoilState(boardPoint);
    const [loginUser, setLoginUser] = useRecoilState(loginUserState);
    let like;


    const list = async () => {
        const url = "board/" + boardCategory + "/boardlist";
        boardCategory === "free" ? setCategory("자유게시판") : setCategory("아티스트 자랑");
        const list = await pageMove({
            url: url,
            page: currentPage,
            sort: 'boardNo',
            keyword: keyword
        }
        )
        list.listDto.forEach((item) => {
            item.boardNo === +param ? setBoardItem(item) : "";
        })
        setPageInfo(list.pageinfo);
        setBoardList(list.listDto);
        
    }
    useEffect(() => {
        list();
        window.scrollTo(0, 0);
    }, [param])

    const likeCount = async () => {
        like = await LikeCount({
            contentNo: boardItem.boardNo,
            brType: "BOARD",
            member: {
                userNo: loginUser.userNo
            }
        })
        list();
    }

    const createMarkUp = (value) => {
        return { __html: DOMPurify.sanitize(value) };
    }

    if (!boardItem) {
        return <></>
    }
    return (
        <div className='boardDetail__container'>
            <div className='boardDetail__box'>
                <div className='boardDetail__item'>
                    <div>No.{boardItem.boardNo}</div>
                    <div>{boardItem.nickname}</div>
                </div>
                <div>{boardItem.enrollDate}</div>
                <div className='boardDetail__item'>
                    <div>조회 : {boardItem.viewCount}</div>
                    <div>추천 : {boardItem.likeCount}</div>
                </div>
            </div>
            <hr className='boardDetail__hr'/>
            <div className='boardDetail__box'>
                <div>{category}</div>
                <div className='boardDetail__item'>
                    <div>수정</div>
                    <div>삭제</div>
                    <div>목록</div>
                    <div>신고</div>
                </div>
            </div>
            <div className='boardDetaill__title'>
                <label>{boardItem.boardTitle}</label>
                <p dangerouslySetInnerHTML={createMarkUp(boardItem.boardContent)}></p>
            </div>
            <div className='boardDetail__like__area'>
                <div className="boardDetail__like" onClick={() => likeCount()}>
                    <div><MdThumbUp /></div>
                    <div>{boardItem.likeCount}</div>
                </div>
            </div>
            <CommonReply />
            <div className='boardDetail__list'>
                {category === "자유게시판" ? 
                    <FreeBoardItem pageInfo={pageInfo} boardList={boardList} list={list} />
                : <ProudItem  pageInfo={pageInfo} boardList={boardList} list={list} />}
            </div>
        </div>
    )
} export default BoardDetail;