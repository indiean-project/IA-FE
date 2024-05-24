import { useEffect, useState } from 'react';
import CommonReply from '../../components/CommonReply/CommonReply';
import './BoardDetail.scss';
import { MdThumbUp } from "react-icons/md";
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import FreeBoardItem from '../../components/FreeBoardItem';
import { pageMove } from '../../apis/pagination';
import { cPage } from '../../recoil/page';
import { useRecoilState } from 'recoil';
import { BoardDelete, DetailBoard, LikeCount } from '../../apis/board';
import DOMPurify from 'dompurify';
import ProudItem from '../../components/ProudItem';
import { boardPoint } from '../../recoil/boardPoint';
import { loginUserState } from '../../recoil/LoginUser';
import { IoPrism } from "react-icons/io5";
import toast from 'react-hot-toast';
import { isModalActive } from '../../recoil/IsModalActive';
import ModalWindow from '../../components/ModalWindow';

function BoardDetail() {
    const [pageInfo, setPageInfo] = useState();
    const [currentPage, setCurrentPage] = useRecoilState(cPage);
    const [keyword, setKeyword] = useState("");
    const [boardList, setBoardList] = useState();
    let param = useParams().id;
    const [boardItem, setBoardItem] = useState([]);
    const [category, setCategory] = useState();
    const [boardCategory, setBoardCategory] = useRecoilState(boardPoint);
    const [loginUser, setLoginUser] = useRecoilState(loginUserState);
    const navigate = useNavigate();
    const [modal, setModal] = useRecoilState(isModalActive);
    let like;

    useEffect(() => {
        detail();
        list();
        window.scrollTo(0, 0);
    }, [param])

    const list = async () => {
        const url = "board/" + boardCategory + "/boardlist";
        boardCategory === "free" ? setCategory("자유게시판") : setCategory("아티스트 자랑");
        const list = await pageMove({
            url: url,
            page: currentPage,
            sort: 'boardNo',
            keyword: keyword
        })
        setPageInfo(list.pageinfo);
        setBoardList(list.listDto);

    }

    const detail = async () => {
        const detail = await DetailBoard({
            boardNo: param
        })
        setBoardItem(detail.data);
    }

    const likeCount = async () => {
        like = await LikeCount({
            contentNo: boardItem.boardNo,
            brType: "BOARD",
            member: {
                userNo: loginUser.userNo
            }
        })
        detail();
    }

    const boardDelete = async () => {
        const result = await BoardDelete({
            boardNo: boardItem.boardNo
        });
        result.status === "SUCCESS" ? toast.success("게시글이 성공적으로 삭제되었습니다.") : toast.error("게시글 삭제에 실패하였습니다.");
        result.status === "SUCCESS" && category === "자유게시판" ? navigate("/board/free") : result.status === "SUCCESS" && category === "아티스트 자랑" ? navigate("/board/proud") : "";
        setModal(false);
    }

    const createMarkUp = (value) => {
        return { __html: DOMPurify.sanitize(value) };
    }

    function boardUpdate() {
        navigate("/board/enroll", { state: { boardItem: boardItem, boardCategory: boardCategory } })
    }

    if (!boardItem || boardItem.length < 1) {
        return <></>
    }
    return (
        <div className='boardDetail__container'>
            {console.log(boardItem)}
            <div className='boardDetail__box'>
                <div className='boardDetail__item'>
                    <div>No.{boardItem.boardNo}</div>
                    <div>{boardItem.nickname}{boardItem.userRole === '2' ? <IoPrism /> :
                        boardItem.userRole === '3' ? <IoPrism className="boardDetail__user__at" /> :
                            boardItem.userRole === '1' ? <IoPrism className="boardDetail__user__ad" /> : ""}</div>
                </div>
                <div>{boardItem.updateDate === null ? boardItem.enrollDate : boardItem.updateDate + "(수정됨)"}</div>
                <div className='boardDetail__item'>
                    <div>조회 : {boardItem.viewCount}</div>
                    <div>추천 : {boardItem.likeCount}</div>
                </div>
            </div>
            <hr className='boardDetail__hr' />
            <div className='boardDetail__box'>
                <div>{category}</div>
                <div className='boardDetail__item'>
                    {boardItem.userNo === loginUser.userNo ?
                        <>
                            <div onClick={() => { boardUpdate() }}>수정</div>
                            <div onClick={() => { setModal(true) }}>삭제</div>
                        </>
                        :
                        ""
                    }
                    <div><NavLink to={category === "자유게시판" ? "/board/free" : "/board/proud"}>목록</NavLink></div>
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
                    <FreeBoardItem setKeyword={setKeyword} pageInfo={pageInfo} boardList={boardList} list={list} />
                    : category === "아티스트 자랑" ? <ProudItem setKeyword={setKeyword} pageInfo={pageInfo} boardList={boardList} list={list} /> : ""}
            </div>
            {modal ? <ModalWindow>
                <div className='boardDetail__modal'>
                    정말로 삭제 하시겠습니까?
                    <div className='boardDetail__modal__buttom'>
                        <div onClick={() => { boardDelete() }}>예</div>
                        <div onClick={() => { setModal(false) }}>아니요</div>
                    </div>
                </div>
            </ModalWindow> : ""}
        </div>
    )
} export default BoardDetail;